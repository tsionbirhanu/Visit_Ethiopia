import { google } from "googleapis";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SHEET_ID = process.env.SHEET_ID!;
const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!);

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone_number,
      traveler_number,
      time_available,
      package_selection, // array of package IDs as strings
      language_codes,    // array of language codes
      date_time,
      Additional_note,
      Additional_preference,
    } = body;

    if (!name || !email || !traveler_number || !package_selection?.length) {
      return NextResponse.json(
        { error: "Name, email, traveler number, and package selection are required" },
        { status: 400 }
      );
    }

    // Convert package ID to integer
    const packageId = parseInt(package_selection[0], 10);
    if (isNaN(packageId)) {
      return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
    }

    // Convert traveler_number to integer
    const travelers = parseInt(traveler_number, 10) || 1;

    // Fetch package name from database
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Fetch language names from database
    const languageData = await prisma.language.findMany({
      where: { code: { in: language_codes || [] } },
    });

    // Store row in Google Sheets
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:L",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          new Date().toISOString(),       // Timestamp
          name,
          email,
          phone_number ?? "",
          travelers,
          time_available ?? "",
          Additional_preference ?? "",
          packageData.name,              
          languageData.map((l) => l.name).join(", "), 
          date_time ? new Date(date_time).toLocaleString() : "",
          Additional_note ?? ""
        ]],
      },
    });

    return NextResponse.json({ success: true, message: "Request stored successfully" });
  } catch (error) {
    console.error("Error storing request in Google Sheet:", error);
    return NextResponse.json({ error: "Failed to store request" }, { status: 500 });
  }
}
