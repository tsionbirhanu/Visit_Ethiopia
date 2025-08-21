// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || "visitopiacontact@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone_number,
      traveler_number,
      time_available,
      packageId,
      language_codes,
      special_interest,
      Additional_note,
    } = body;

    if (!name || !email || !packageId) {
      return NextResponse.json(
        { error: "Name, email, and package selection are required." },
        { status: 400 }
      );
    }

    const newData = await prisma.data.create({
      data: {
        name,
        email,
        phone_number,
        traveler_number,
        time_available,
        package: {
          connect: { id: packageId },
        },
        language: {
          connect: language_codes?.map((code: string) => ({ code })),
        },
        special_interest, // This should be a single Enum value, not an array
        Additional_note,
      },
      include: {
        package: true,
        language: true,
      },
    });

    // Send email notification to admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: adminEmail,
      subject: "New Visitopia Booking Request",
      html: `
        <h2>New Visitopia Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Number of Travelers:</strong> ${traveler_number}</p>
        <p><strong>Time Available:</strong> ${time_available}</p>
        <p><strong>Package ID:</strong> ${packageId}</p>
        <p><strong>Special Interests:</strong> ${special_interest}</p>
        <p><strong>Language Preferences:</strong> ${
          language_codes?.join(", ") || "N/A"
        }</p>
        <p><strong>Additional Notes:</strong> ${Additional_note}</p>
      `,
    });

    return NextResponse.json(
      { message: "Form submitted successfully", newData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form." },
      { status: 500 }
    );
  }
}
