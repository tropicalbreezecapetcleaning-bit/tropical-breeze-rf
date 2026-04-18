import { NextRequest, NextResponse } from "next/server";

interface LineItem {
  label: string;
  value: number;
  cls?: string;
}

function buildLineItemsHTML(lineItems: LineItem[], total: number, packageName: string, services: Record<string, Record<string, number>> | undefined): string {
  const serviceNames: Record<string, string> = {
    carpet: "Carpet Cleaning", tile: "Tile and Grout", bath_tile: "Bathroom Tile",
    windows: "Window Cleaning", ezbreeze: "EZ Breeze", upholstery: "Upholstery",
    rug_small: "Small Rugs", rug_medium: "Medium Rugs", rug_large: "Large Rugs"
  };

  if (lineItems.length > 0) {
    const rows = lineItems.map((item) => {
      const isDiscount = item.cls === "disc" || item.value < 0;
      const color = isDiscount ? "#15803d" : "#334155";
      const valueColor = isDiscount ? "#15803d" : "#FF6F00";
      const valueStr = item.value < 0 ? `-$${Math.abs(item.value)}` : `$${item.value}`;
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:${color};">${item.label}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:700;color:${valueColor};text-align:right;">${valueStr}</td>
      </tr>`;
    }).join("");
    return rows + `<tr>
      <td style="padding:12px 0 4px;font-weight:900;color:#1e293b;font-size:15px;border-top:2px solid #006978;">Estimated Total</td>
      <td style="padding:12px 0 4px;font-weight:900;color:#FF6F00;font-size:22px;text-align:right;border-top:2px solid #006978;">$${total}</td>
    </tr>`;
  }

  if (packageName) {
    return `<tr>
      <td style="padding:8px 0;font-size:14px;color:#334155;">Package</td>
      <td style="padding:8px 0;font-size:14px;font-weight:700;color:#FF6F00;text-align:right;">${packageName}</td>
    </tr>
    <tr>
      <td style="padding:12px 0 4px;font-weight:900;color:#1e293b;font-size:15px;border-top:2px solid #006978;">Estimated Total</td>
      <td style="padding:12px 0 4px;font-weight:900;color:#FF6F00;font-size:22px;text-align:right;border-top:2px solid #006978;">$${total}</td>
    </tr>`;
  }

  if (services?.counts) {
    const rows = Object.entries(services.counts)
      .filter(([, v]) => v && Number(v) > 0)
      .map(([k, v]) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;">${serviceNames[k] || k}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:700;color:#FF6F00;text-align:right;">x${v}</td>
      </tr>`).join("");
    return rows + `<tr>
      <td style="padding:12px 0 4px;font-weight:900;color:#1e293b;font-size:15px;border-top:2px solid #006978;">Estimated Total</td>
      <td style="padding:12px 0 4px;font-weight:900;color:#FF6F00;font-size:22px;text-align:right;border-top:2px solid #006978;">$${total}</td>
    </tr>`;
  }

  return `<tr>
    <td colspan="2" style="padding:8px 0;font-size:14px;color:#334155;">To be confirmed on-site</td>
  </tr>`;
}

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
    const lineItems: LineItem[] = body.line_items || [];
    const firstName = name.split(" ")[0];
    const phoneClean = phone.replace(/\D/g, "");

    if (!name || !phone || !date || !street || !city || !zip) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
    }

    // SMS alert via AT&T email gateway
    fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: '4438563244@txt.att.net' }] }],
        from: { email: 'no-reply@tropicalbreezerf.com', name: 'Tropical Breeze RF' },
        subject: 'New Booking',
        content: [{ type: 'text/plain', value: 'NEW BOOKING: ' + name + ' | ' + phone + ' | ' + date + ' ' + time + ' | $' + total + ' | ' + street + ', ' + city }]
      })
    }).catch(() => {});

    const lineItemsHTML = buildLineItemsHTML(lineItems, total, packageName, body.services);

    const ownerEmailHTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">&#127796;</div>
          <div style="color:white;font-size:20px;font-weight:900;">NEW BOOKING REQUEST</div>
          <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px;">Tropical Breeze RF</div>
          <div style="background:rgba(255,255,255,0.15);border-radius:20px;padding:8px 20px;display:inline-block;margin-top:12px;color:white;font-weight:700;font-size:14px;">
            &#128197; ${date} at ${time}
          </div>
        </td></tr>

        <tr><td style="background:#FF6F00;padding:14px 32px;text-align:center;">
          <span style="color:white;font-size:30px;font-weight:900;">$${total}</span>
          <span style="color:rgba(255,255,255,0.85);font-size:14px;margin-left:8px;">Estimated Total</span>
        </td></tr>

        <tr><td style="background:white;padding:28px 32px;border-radius:0 0 16px 16px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:10px;">
                <div style="background:#f0f9ff;border-radius:10px;padding:16px;border-left:3px solid #006978;">
                  <div style="font-size:10px;font-weight:800;letter-spacing:2px;color:#006978;text-transform:uppercase;margin-bottom:10px;">Customer</div>
                  <div style="font-size:15px;font-weight:800;color:#1e293b;margin-bottom:3px;">${name}</div>
                  <div style="font-size:13px;margin-bottom:2px;"><a href="tel:${phoneClean}" style="color:#006978;font-weight:700;">${phone}</a></div>
                  <div style="font-size:12px;color:#64748b;">${email || "No email"}</div>
                  <div style="font-size:11px;color:#64748b;margin-top:3px;">SMS: ${smsOptin ? "Yes" : "No"} &nbsp;|&nbsp; ${source}</div>
                </div>
              </td>
              <td style="width:50%;vertical-align:top;padding-left:10px;">
                <div style="background:#f0f9ff;border-radius:10px;padding:16px;border-left:3px solid #FF6F00;">
                  <div style="font-size:10px;font-weight:800;letter-spacing:2px;color:#FF6F00;text-transform:uppercase;margin-bottom:10px;">Appointment</div>
                  <div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:3px;">${date} at ${time}</div>
                  <div style="font-size:13px;color:#334155;">${street}</div>
                  <div style="font-size:13px;color:#334155;">${city}, ${state} ${zip}</div>
                </div>
              </td>
            </tr>
          </table>

          <div style="background:#f0f9ff;border-radius:10px;padding:20px;margin-bottom:20px;border-left:3px solid #006978;">
            <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#006978;margin-bottom:12px;">Services and Pricing</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${lineItemsHTML}
            </table>
          </div>

          ${notes ? `<div style="background:#fffbeb;border-radius:10px;padding:14px 16px;margin-bottom:20px;border-left:3px solid #f59e0b;"><div style="font-size:10px;font-weight:800;letter-spacing:2px;color:#f59e0b;text-transform:uppercase;margin-bottom:6px;">Notes</div><div style="color:#334155;font-size:13px;">${notes}</div></div>` : ""}

          <div style="text-align:center;margin-top:20px;">
            <a href="tel:${phoneClean}" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:15px;padding:12px 24px;border-radius:50px;text-decoration:none;margin-right:8px;">Call ${firstName}</a>
            <a href="https://go.housecallpro.com" style="display:inline-block;background:#FF6F00;color:white;font-weight:800;font-size:15px;padding:12px 24px;border-radius:50px;text-decoration:none;">Open HCP</a>
          </div>

        </td></tr>

        <tr><td style="text-align:center;padding:16px;color:#94a3b8;font-size:11px;">
          Tropical Breeze RF &middot; 443-856-3244 &middot; tropicalbreezerf.com<br>
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

        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:36px 32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:10px;">&#9989;</div>
          <div style="color:white;font-size:22px;font-weight:900;">Booking Received!</div>
          <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:6px;">Hi ${firstName} - we got your request and will call to confirm shortly!</div>
        </td></tr>

        <tr><td style="background:white;padding:28px 32px;border-radius:0 0 16px 16px;">

          <div style="background:#f0fdf4;border-radius:10px;padding:18px;margin-bottom:20px;border:1px solid #bbf7d0;">
            <div style="font-size:10px;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Your Appointment</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:5px 0;color:#64748b;font-size:13px;width:70px;">Date</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:13px;">${date}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:13px;">Time</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:13px;">${time}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;font-size:13px;">Address</td><td style="padding:5px 0;font-weight:700;color:#1e293b;font-size:13px;">${street}, ${city}, ${state} ${zip}</td></tr>
            </table>
          </div>

          <div style="background:#f0f9ff;border-radius:10px;padding:18px;margin-bottom:20px;border-left:3px solid #006978;">
            <div style="font-size:10px;font-weight:800;color:#006978;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Services Summary</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${lineItemsHTML}
            </table>
            <div style="font-size:11px;color:#94a3b8;margin-top:8px;">Final price confirmed on-site. All discounts applied.</div>
          </div>

          <div style="margin-bottom:20px;">
            <div style="font-size:10px;font-weight:800;color:#006978;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">What Happens Next</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155;">&#128222; We call to confirm within 2-4 hours</td></tr>
              <tr><td style="padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155;">&#128663; Your tech arrives on time with all equipment</td></tr>
              <tr><td style="padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155;">&#129528; RF clean with zero residue left behind</td></tr>
              <tr><td style="padding:9px 0;font-size:13px;color:#334155;">&#9889; Walk-ready in 4-6 hours</td></tr>
            </table>
          </div>

          <div style="text-align:center;background:#f0f9ff;border-radius:10px;padding:16px;">
            <div style="color:#64748b;font-size:12px;margin-bottom:10px;">Questions? We are here.</div>
            <a href="tel:4438563244" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;">443-856-3244</a>
          </div>

        </td></tr>

        <tr><td style="text-align:center;padding:16px;color:#94a3b8;font-size:11px;">
          Tropical Breeze RF &middot; Salisbury, MD &middot; tropicalbreezerf.com<br>
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
