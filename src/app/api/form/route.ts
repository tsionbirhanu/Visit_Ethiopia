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
      special_interest,
      Additional_note,
      packageId,       // single package selected by user
      language_codes,  // array of language codes like ["en", "am"]
    } = body;

    if (!name || !email || !packageId) {
      return NextResponse.json(
        { error: "Name, email, and packageId are required" },
        { status: 400 }
      );
    }

    // Create user form
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
        package: {
          connect: { id: packageId }, 
        },
        language: {
          connect: language_codes?.map((code: string) => ({ code })),
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
