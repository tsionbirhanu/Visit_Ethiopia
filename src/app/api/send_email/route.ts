import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone_number,
      traveler_number,
      time_available,
      special_interest,
      Additional_note,
      package_selection,
      language_codes,
      date_time,
      Additional_preference,
    } = body;

    // Send email
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // verified domain or default
      to: "21dagmawitnegash@gmail.com", // where you want to receive the form data
      subject: "New Tourist Request",
      html: `
        <h2>New Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Travelers:</strong> ${traveler_number}</p>
        <p><strong>Time Available:</strong> ${time_available}</p>
        <p><string>Date and Time:</strong> ${new Date(date_time).toLocaleString()}</p>
        <p><strong>Additional Preference:</strong> ${Additional_preference}</p>
        <p><strong>Special Interest:</strong> ${special_interest}</p>
        <p><strong>Additional Note:</strong> ${Additional_note}</p>
        <p><strong>Package IDs:</strong> ${package_selection?.join(", ")}</p>
        <p><strong>Languages:</strong> ${language_codes?.join(", ")}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
