import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, phone, email, date, time,
      street, city, state, zip, notes,
      services, addons, total, saved
    } = body;

    // Validate required fields
    if (!name || !phone || !date || !time || !street || !city || !state || !zip) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error("Missing SENDGRID_API_KEY");
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
    }

    // Build services summary
    const serviceLines = services
      ? Object.entries(services)
          .filter(([, v]) => v)
          .map(([k, v]) => `• ${k}: ${v}`)
          .join("\n")
      : "Not specified";

    const addonLines = addons
      ? Object.entries(addons)
          .filter(([, v]) => v)
          .map(([k]) => `• ${k}`)
          .join("\n")
      : "None";

    const emailBody = `
NEW BOOKING REQUEST — Tropical Breeze RF™
==========================================

CUSTOMER INFO
Name:    ${name}
Phone:   ${phone}
Email:   ${email || "Not provided"}

APPOINTMENT
Date:    ${date}
Time:    ${time}
Address: ${street}, ${city}, ${state} ${zip}

SERVICES REQUESTED
${serviceLines}

ADD-ONS
${addonLines || "None"}

NOTES
${notes || "None"}

PRICING
Estimated Total: $${total || "TBD"}
${saved ? `Customer Saved: $${saved}` : ""}

==========================================
Reply or call ${phone} to confirm.
    `.trim();

    // Send via SendGrid
    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "tropicalbreezecapetcleaning@gmail.com", name: "Tropical Breeze RF" }],
            subject: `🌴 New Booking — ${name} | ${date} at ${time} | $${total || "TBD"}`,
          },
        ],
        from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF™ Booking" },
        reply_to: { email: email || "tropicalbreezecapetcleaning@gmail.com", name },
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });

    if (!sgResponse.ok) {
      const errText = await sgResponse.text();
      console.error("SendGrid error:", errText);
      return NextResponse.json({ success: false, error: "Failed to send confirmation" }, { status: 500 });
    }

    // Also send customer confirmation if email provided
    if (email) {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email, name }],
              subject: `✅ Booking Received — Tropical Breeze RF™ | ${date} at ${time}`,
            },
          ],
          from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF™" },
          content: [
            {
              type: "text/plain",
              value: `Hi ${name.split(" ")[0]},

We received your booking request! Here's what happens next:

1. We'll call you within 2–4 hours to confirm your appointment
2. Your tech arrives on time with all equipment
3. RF™ clean with zero residue left behind
4. Dry in 4–6 hours — enjoy your clean home!

YOUR APPOINTMENT
Date:    ${date}
Time:    ${time}
Address: ${street}, ${city}, ${state} ${zip}
Total:   $${total || "TBD"}

Questions? Call or text us at 443-856-3244.

— Dalton & the Tropical Breeze RF™ Team
"RESIDUE DOESN'T SURVIVE HERE™"
              `.trim(),
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}