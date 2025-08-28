import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone_number,
      traveler_number,
      role,
      time_available,
      date_time,
      special_interest,
      Additional_note,
      packageId,       // <-- frontend sends package id
      Additional_preference,
      language_codes,  // <-- frontend sends array of language codes like ["en", "am"]
    } = body;

    // Basic validation
    if (!name || !email || !packageId) {
      return NextResponse.json(
        { error: "Name, email, and packageId are required" },
        { status: 400 }
      );
    }

    // Check if package exists by ID
    const existingPackage = await prisma.package.findUnique({
      where: { id: packageId },
    });
    if (!existingPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Fetch existing languages by code
    const existingLanguages = await prisma.language.findMany({
      where: { code: { in: language_codes || [] } },
    });
    if (language_codes?.length && existingLanguages.length !== language_codes.length) {
      return NextResponse.json({ error: "Some language codes not found" }, { status: 404 });
    }

    // Create new Data row
    const newData = await prisma.data.create({
      data: {
        name,
        email,
        phone_number,
        traveler_number,
        role,
        time_available,
        special_interest,
        Additional_note,
        Additional_preference,
        date_time: new Date(date_time),
        package: {
          connect: { id: packageId }, // connect by ID
        },
        language: {
          connect: language_codes?.map((code: string) => ({ code })), // connect by code
        },
      },
      include: {
        package: true,
        language: true,
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

// GET: Fetch all user forms
export async function GET() {
  try {
    const allData = await prisma.data.findMany({
      include: {
        package: true,
        language: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(allData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
