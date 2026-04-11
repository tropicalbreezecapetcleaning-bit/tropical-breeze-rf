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

    if (!name || !phone || !date || !street || !city || !zip) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
    }

    // Build service lines
    let serviceHTML = "";
    if (packageName) {
      serviceHTML = `<tr><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;color:#334155;">Package</td><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;font-weight:700;color:#006978;">${packageName}</td></tr>`;
    } else if (body.services?.counts) {
      const counts = body.services.counts;
      const serviceNames: Record<string, string> = {
        carpet: "🧼 Carpet Cleaning", tile: "⬜ Tile & Grout", bath_tile: "🚿 Bathroom Tile",
        windows: "🪟 Window Cleaning", ezbreeze: "🌴 EZ Breeze", upholstery: "🛋️ Upholstery",
        rug_small: "🪄 Small Rugs", rug_medium: "🪄 Medium Rugs", rug_large: "🪄 Large Rugs",
        rug_oversized: "🪄 Oversized Rugs", storm: "🌨️ Storm Windows"
      };
      serviceHTML = Object.entries(counts)
        .filter(([, v]) => v && Number(v) > 0)
        .map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;color:#334155;">${serviceNames[k] || k}</td><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;font-weight:700;color:#006978;">${v}</td></tr>`)
        .join("");
      if (body.services.hardwood_sqft > 0) {
        serviceHTML += `<tr><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;color:#334155;">🪵 Hardwood</td><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;font-weight:700;color:#006978;">${body.services.hardwood_sqft} sq ft</td></tr>`;
      }
      if (body.services.sectional_ft > 0) {
        serviceHTML += `<tr><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;color:#334155;">🛋️ Sectional</td><td style="padding:8px 0;border-bottom:1px solid #e8f4f5;font-weight:700;color:#006978;">${body.services.sectional_ft} ft</td></tr>`;
      }
    }

    if (!serviceHTML) {
      serviceHTML = `<tr><td colspan="2" style="padding:8px 0;color:#334155;">To be confirmed on-site</td></tr>`;
    }

    // Build addons
    let addonHTML = "";
    if (body.addons) {
      const addonNames: Record<string, string> = {
        scotchgard: "🛡️ Scotchgard Protector", carpetDeod: "🌬️ Carpet Deodorizer",
        grout: "🔒 Grout Sealing", colorSeal: "🎨 Color Seal",
        fabricProt: "🛡️ Fabric Protector", upDeod: "🌬️ Upholstery Deodorizer",
        screens: "🕸️ Screens & Tracks"
      };
      const activeAddons = Object.entries(body.addons).filter(([, v]) => v).map(([k]) => addonNames[k] || k);
      if (activeAddons.length > 0) {
        addonHTML = `
        <tr><td colspan="2" style="padding:12px 0 4px;font-weight:800;color:#006978;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Add-Ons</td></tr>
        ${activeAddons.map(a => `<tr><td colspan="2" style="padding:6px 0;border-bottom:1px solid #e8f4f5;color:#334155;">${a}</td></tr>`).join("")}`;
      }
    }

    const ownerEmailHTML = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        
        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
          <div style="font-size:42px;margin-bottom:8px;">🌴</div>
          <div style="color:white;font-size:22px;font-weight:900;letter-spacing:-0.5px;">NEW BOOKING REQUEST</div>
          <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px;">Tropical Breeze RF™</div>
          <div style="background:rgba(255,255,255,0.15);border-radius:20px;padding:8px 20px;display:inline-block;margin-top:12px;color:white;font-weight:700;font-size:14px;">
            📅 ${date} · ${time}
          </div>
        </td></tr>

        <!-- TOTAL BANNER -->
        <tr><td style="background:#FF6F00;padding:16px 32px;text-align:center;">
          <span style="color:white;font-size:28px;font-weight:900;">$${total}</span>
          <span style="color:rgba(255,255,255,0.85);font-size:14px;margin-left:8px;">Estimated Total</span>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:white;padding:32px;border-radius:0 0 16px 16px;">
          
          <!-- CUSTOMER -->
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #006978;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#006978;margin-bottom:12px;">👤 Customer</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;width:100px;">Name</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Phone</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;"><a href="tel:${phone.replace(/\D/g,'')}" style="color:#006978;">${phone}</a></td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${email || "Not provided"}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">SMS</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${smsOptin ? "✅ Yes" : "No"}</td></tr>
            </table>
          </div>

          <!-- APPOINTMENT -->
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #FF6F00;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#FF6F00;margin-bottom:12px;">📅 Appointment</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;width:100px;">Date</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${date}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Time</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${time}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Address</td><td style="padding:6px 0;font-weight:700;color:#1e293b;font-size:14px;">${street}, ${city}, ${state} ${zip}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Source</td><td style="padding:6px 0;font-size:13px;color:#64748b;">${source}</td></tr>
            </table>
          </div>

          <!-- SERVICES -->
          <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid #006978;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#006978;margin-bottom:12px;">🧼 Services</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${serviceHTML}
              ${addonHTML}
            </table>
          </div>

          ${notes ? `
          <!-- NOTES -->
          <div style="background:#fffbeb;border-radius:12px;padding:16px 20px;margin-bottom:20px;border-left:4px solid #f59e0b;">
            <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#f59e0b;margin-bottom:8px;">📝 Notes</div>
            <div style="color:#334155;font-size:14px;">${notes}</div>
          </div>` : ""}

          <!-- CTA -->
          <div style="text-align:center;padding:16px 0;">
            <a href="tel:${phone.replace(/\D/g,'')}" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;margin-right:12px;">📞 Call ${name.split(" ")[0]}</a>
            <a href="https://go.housecallpro.com" style="display:inline-block;background:#FF6F00;color:white;font-weight:800;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;">📅 Open HCP</a>
          </div>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="text-align:center;padding:20px;color:#94a3b8;font-size:12px;">
          Tropical Breeze RF™ · 443-856-3244 · tropicalbreezerf.com<br>
          <span style="color:#006978;font-weight:700;">RESIDUE DOESN'T SURVIVE HERE™</span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const customerEmailHTML = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        
        <tr><td style="background:linear-gradient(135deg,#004d59,#006978);border-radius:16px 16px 0 0;padding:40px 32px 32px;text-align:center;">
          <div style="font-size:52px;margin-bottom:12px;">✅</div>
          <div style="color:white;font-size:24px;font-weight:900;">Booking Received!</div>
          <div style="color:rgba(255,255,255,0.8);font-size:15px;margin-top:6px;">Hi ${name.split(" ")[0]} — we got your request!</div>
        </td></tr>

        <tr><td style="background:white;padding:32px;border-radius:0 0 16px 16px;">
          
          <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #bbf7d0;">
            <div style="font-size:13px;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">📅 Your Appointment</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;width:80px;">Date</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${date}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Time</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${time}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Address</td><td style="padding:6px 0;font-weight:700;color:#1e293b;">${street}, ${city}, ${state} ${zip}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:14px;">Total</td><td style="padding:6px 0;font-weight:900;color:#006978;font-size:18px;">$${total}</td></tr>
            </table>
          </div>

          <div style="margin-bottom:24px;">
            <div style="font-size:13px;font-weight:800;color:#006978;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">What happens next:</div>
            ${[
              ["📞", "We'll call to confirm within 2-4 hours"],
              ["🚗", "Your tech arrives on time with all equipment"],
              ["🧼", "RF™ clean — zero residue left behind"],
              ["⚡", "Walk-ready in 4-6 hours"]
            ].map(([icon, text]) => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9;">
              <span style="font-size:24px;width:36px;text-align:center;">${icon}</span>
              <span style="color:#334155;font-size:14px;">${text}</span>
            </div>`).join("")}
          </div>

          <div style="text-align:center;background:#f0f9ff;border-radius:12px;padding:20px;">
            <div style="color:#64748b;font-size:13px;margin-bottom:8px;">Questions? We're here.</div>
            <a href="tel:4438563244" style="display:inline-block;background:linear-gradient(135deg,#006978,#0097A7);color:white;font-weight:800;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;">📞 443-856-3244</a>
          </div>

        </td></tr>

        <tr><td style="text-align:center;padding:20px;color:#94a3b8;font-size:12px;">
          Tropical Breeze RF™ · Salisbury, MD · tropicalbreezerf.com<br>
          <span style="color:#006978;font-weight:700;">RESIDUE DOESN'T SURVIVE HERE™</span>
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
          subject: `🌴 New Booking — ${name} | ${date} | $${total}`,
        }],
        from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF™ Booking" },
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
            subject: `✅ Booking Received — Tropical Breeze RF™ | ${date}`,
          }],
          from: { email: "noreply@tropicalbreezerf.com", name: "Tropical Breeze RF™" },
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
