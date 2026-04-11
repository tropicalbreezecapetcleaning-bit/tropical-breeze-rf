import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name || body.customer?.name || "";
    const phone = body.phone || body.customer?.phone || "";
    const email = body.email || body.customer?.email || "";
    const date = body.date || body.customer?.date || "";
    const time = body.time || body.customer?.time || "Anytime";
    const street = body.street || body.customer?.street || "";
    const city = body.city || body.customer?.city || "";
    const state = body.state || body.customer?.state || "MD";
    const zip = body.zip || body.customer?.zip || "";
    const notes = body.notes || body.customer?.notes || "";
    const total = body.total || body.grand_total || 0;
    const packageName = body.package || "";
    const source = body.source || "booking_page";
    const smsOptin = body.customer?.sms_optin || body.sms_optin || false;
    const lineItems = body.line_items || [];

    if (!name || !phone || !date || !street || !city || !zip) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
    }

    // Build line items HTML for email
    let lineItemsHTML = "";
    if (lineItems.length > 0) {
      lineItemsHTML = lineItems.map((item: { label: string; value: number; cls?: string }) => {
        const isDiscount = item.cls === "disc" || item.value < 0;
        const color = isDiscount ? "#15803d" : "#334155";
        const valueStr = item.value < 0 ? `-$${Math.abs(item.value)}` : `$${item.value}`;
        return `<tr>
          <td style="padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:${color};">${item.label}</td>
          <td style="padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:700;color:${color};text-align:right;">${valueStr}</td>
        </tr>`;
      }).join("");
    } else if (packageName) {
      lineItemsHTML = `<tr>
        <td style="padding:7px 0;font-size:14px;color:#334155;">Package</td>
        <td style="padding:7px 0;font-size:14px;font-weight:700;color:#006978;text-align:right;">${packageName}</td>
      </tr>`;
    } else if (body.services?.counts) {
      const serviceNames: Record<string, string> = {
        carpet: "Carpet Cleaning", tile: "Tile and Grout", bath_tile: "Bathroom Tile",
        windows: "Window Cleaning", ezbreeze: "EZ Breeze", upholstery: "Upholstery",
        rug_small: "Small Rugs", rug_medium: "Medium Rugs", rug_large: "Large Rugs"
      };
      lineItemsHTML = Object.entries(body.services.counts)
        .filter(([, v]) => v && Number(v) > 0)
        .map(([k, v]) => `<tr>
          <td style="padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;">${serviceNames[k] || k}</td>
          <td style="padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:700;color:#006978;text-align:right;">x${v}</td>
        </tr>`).join("");
    }

    const ownerEmailHTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <div style="font-size:42px;margin-bottom:8px;">🌴</div>
          <div style="color:white;font-size:22px;font-weight:900;">NEW BOOKING REQUEST</div>
          <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px;">Tropical Breeze RF</div>
          <div style="background:rgba(255,255,255,0.15);border-radius:20px;padding:8px 20px;display:inline-block;margin-top:12px;color:white;font-weight:700;font-size:14px;">
            📅 ${date} at ${time}
          </div>
        </td></tr>
        <tr><td style="background:#FF6F00;padding:16px 32px;text-align:center;">
          <span style="color:white;font-size:32px;font-weight:900;">$${total}</span>
          <span style="color:rgba(255,255,255,0.85);font-size:14px;margin-left:8px;">Estimated Total</span>
        </td></tr>
        <tr><td style="background:white;padding:32px;border-radius:0 0 16px 16px;">
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #006978;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#006978;margin-bottom:12px;">Customer</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;width:80px;">Name</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">Phone</td><td style="padding:5px 0;font-weight:700;font-size:14px;"><a href="tel:${phone.replace(/\D/g, '')}" style="color:#006978;">${phone}</a></td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${email || "Not provided"}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">SMS</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${smsOptin ? "Yes" : "No"}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">Source</td><td style="padding:5px 0;color:#64748b;font-size:13px;">${source}</td></tr>
            </table>
          </div>
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #FF6F00;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#FF6F00;margin-bottom:12px;">Appointment</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;width:80px;">Date</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${date}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">Time</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${time}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:14px;">Address</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:14px;">${street}, ${city}, ${state} ${zip}</td></tr>
            </table>
          </div>
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #006978;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#006978;margin-bottom:12px;">Services and Pricing</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${lineItemsHTML}
              <tr>
                <td style="padding:12px 0 4px;font-weight:900;color:#1e293b;font-size:15px;border-top:2px solid #006978;margin-top:8px;">Estimated Total</td>
                <td style="padding:12px 0 4px;font-weight:900;color:#006978;font-size:22px;text-align:right;border-top:2px solid #006978;">$${total}</td>
              </tr>
            </table>
          </div>
          ${notes ? `<div style="background:#fffbeb;border-radius:12px;padding:16px 20px;margin-bottom:20px;border-left:4px solid #f59e0b;"><div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#f59e0b;margin-bottom:8px;">Notes</div><div style="color:#334155;font-size:14px;">${notes}</div></div>` : ""}
          <div style="text-align:center;padding:16px 0;">
            <a href="tel:${phone.replace(/\D/g, '')}" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:16px;padding:14px 28px;border-radius:50px;text-decoration:none;margin-right:10px;">📞 Call ${name.split(" ")[0]}</a>
            <a href="https://go.housecallpro.com" style="display:inline-block;background:#FF6F00;color:white;font-weight:800;font-size:16px;padding:14px 28px;border-radius:50px;text-decoration:none;">📅 Open HCP</a>
          </div>
        </td></tr>
        <tr><td style="text-align:center;padding:20px;color:#94a3b8;font-size:12px;">
          Tropical Breeze RF · 443-856-3244 · tropicalbreezerf.com<br>
          <strong style="color:#006978;">RESIDUE DOES NOT SURVIVE HERE</strong>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const customerEmailHTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;">
          <div style="font-size:52px;margin-bottom:12px;">✅</div>
          <div style="color:white;font-size:24px;font-weight:900;">Booking Received!</div>
          <div style="color:rgba(255,255,255,0.8);font-size:15px;margin-top:6px;">Hi ${name.split(" ")[0]} — we got your request and will call to confirm shortly!</div>
        </td></tr>
        <tr><td style="background:white;padding:32px;border-radius:0 0 16px 16px;">
          <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #bbf7d0;">
            <div style="font-size:12px;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Your Appointment</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;width:80px;">Date</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${date}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Time</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${time}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Address</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${street}, ${city}, ${state} ${zip}</td></tr>
            </table>
          </div>
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #006978;">
            <div style="font-size:12px;font-weight:800;color:#006978;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Services Summary</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${lineItemsHTML}
              <tr>
                <td style="padding:12px 0 4px;font-weight:900;color:#1e293b;font-size:15px;border-top:2px solid #006978;">Estimated Total</td>
                <td style="padding:12px 0 4px;font-weight:900;color:#006978;font-size:22px;text-align:right;border-top:2px solid #006978;">$${total}</td>
              </tr>
            </table>
            <div style="font-size:11px;color:#94a3b8;margin-top:8px;">Final price confirmed on-site. All discounts applied.</div>
          </div>
          <div style="margin-bottom:24px;">
            <div style="font-size:12px;font-weight:800;color:#006978;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">What happens next</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;">📞 We call to confirm within 2-4 hours</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;">🚗 Your tech arrives on time with all equipment</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;">🧼 RF clean with zero residue left behind</td></tr>
              <tr><td style="padding:10px 0;font-size:14px;color:#334155;">⚡ Walk-ready in 4-6 hours</td></tr>
            </table>
          </div>
          <div style="text-align:center;background:#f0f9ff;border-radius:12px;padding:20px;">
            <div style="color:#64748b;font-size:13px;margin-bottom:12px;">Questions? We are here.</div>
            <a href="tel:4438563244" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;">📞 443-856-3244</a>
          </div>
        </td></tr>
        <tr><td style="text-align:center;padding:20px;color:#94a3b8;font-size:12px;">
          Tropical Breeze RF · Salisbury, MD · tropicalbreezerf.com<br>
          <strong style="color:#006978;">RESIDUE DOES NOT SURVIVE HERE</strong>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

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
        content: [{ type: "text/html", value: ownerEmailHTML }],
      }),
    });

    if (!sgResponse.ok) {
      const errText = await sgResponse.text();
      console.error("SendGrid error:", errText);
      return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
    }

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
          content: [{ type: "text/html", value: customerEmailHTML }],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
