import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both flat and nested payload formats
    const name = body.name || body.customer?.name || "";
    const phone = body.phone || body.customer?.phone || "";
    const email = body.email || body.customer?.email || "";
    const date = body.date || body.customer?.date || "";
    const time = body.time || body.customer?.time || "";
    const street = body.street || body.customer?.street || "";
    const city = body.city || body.customer?.city || "";
    const state = body.state || body.customer?.state || "MD";
    const zip = body.zip || body.customer?.zip || "";
    const notes = body.notes || body.customer?.notes || "";
    const total = body.total || body.grand_total || 0;
    const packageName = body.package || "";
    const source = body.source || "booking_page";

    if (!name || !phone || !date || !street || !city || !zip) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error("Missing SENDGRID_API_KEY");
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
    }

    const serviceLines = body.services
      ? Object.entries(body.services).filter(([,v]) => v).map(([k,v]) => `• ${k}: ${v}`).join("\n")
      : packageName || "Not specified";

    const emailBody = `
NEW BOOKING — Tropical Breeze RF
==========================================
CUSTOMER
Name:    ${name}
Phone:   ${phone}
Email:   ${email || "Not provided"}
SMS:     ${body.customer?.sms_optin ? "Yes" : "No"}

APPOINTMENT
Date:    ${date}
Time:    ${time || "Anytime"}
Address: ${street}, ${city}, ${state} ${zip}

SERVICES
${serviceLines}

NOTES
${notes || "None"}

TOTAL: $${total}
Source: ${source}
==========================================
    `.trim();

    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: "tropicalbreezecapetcleaning@gmail.com", name: "Tropical Breeze RF" }],
          subject: `New Booking - ${name} | ${date} | $${total}`,
        }],
        from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF Booking" },
        reply_to: { email: email || "tropicalbreezecapetcleaning@gmail.com", name },
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });

    if (!sgResponse.ok) {
      const errText = await sgResponse.text();
      console.error("SendGrid error:", errText);
      return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
    }

    // Customer confirmation email
    if (email) {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email, name }],
            subject: `Booking Received - Tropical Breeze RF | ${date}`,
          }],
          from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF" },
          content: [{
            type: "text/plain",
            value: `Hi ${name.split(" ")[0]},

We received your booking request! Here is what happens next:

1. We will call you within 2-4 hours to confirm your appointment
2. Your tech arrives on time with all equipment
3. RF clean with zero residue left behind
4. Dry in 4-6 hours - enjoy your clean home!

YOUR APPOINTMENT
Date:    ${date}
Time:    ${time || "Anytime"}
Address: ${street}, ${city}, ${state} ${zip}
Total:   $${total}

Questions? Call or text us at 443-856-3244.

- Dalton and the Tropical Breeze RF Team
RESIDUE DOES NOT SURVIVE HERE`.trim(),
          }],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
