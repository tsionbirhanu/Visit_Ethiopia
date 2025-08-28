import { google } from "googleapis";
import { NextResponse } from "next/server";

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
      special_interest,
      package_selection,
      language_codes,
      date_time,
      Additional_note,
      Additional_preference,
    } = body;

    // Basic validation
    if (!name || !email || !traveler_number) {
      return NextResponse.json({ error: "Name, email, and traveler number are required" }, { status: 400 });
    }

    const sheets = await getSheetsClient();

    // Append new row to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:L", // Adjust columns to match your headers
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone_number ?? "",
          traveler_number,
          time_available ?? "",
          Additional_preference ?? "",
          package_selection?.join(", ") ?? "",
          language_codes?.join(", ") ?? "",
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
