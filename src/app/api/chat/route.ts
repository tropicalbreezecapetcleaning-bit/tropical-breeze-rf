import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Aria, the friendly RF™ booking assistant for Tropical Breeze RF™ — Maryland and Delaware's only certified residue-free cleaning company serving 33+ cities on the Eastern Shore.

PRICING (always be specific):
- Carpet Cleaning: RF99™ $99 first room (up to 200 sq ft), $50 each additional room. Prochem truckmount + Rotovac Powerwand 360° at 300-500 PSI. Dry in 4-6 hours.
- Upholstery: Chairs $50, Loveseats $75, Sofas $85, Sectionals $11/linear ft
- Tile & Grout: $125/room, up to 1,200+ PSI rotary extraction
- Hardwood Floors: $1.00/sq ft, low-moisture RF™ process, free inspection first
- Window Cleaning: $13/window — includes inside, outside, screens, tracks, sills
- EZ Breeze Panels: Free assessment, vinyl-safe process only

THE RF™ DIFFERENCE:
- Traditional cleaning leaves soap residue that re-attracts dirt within 2 weeks
- RF™ removes dirt AND residue — stays cleaner 3x longer
- Zero residue = safe for pets and children immediately after drying
- pH verified after every job

SERVICE AREA: 33+ cities across Maryland and Delaware Eastern Shore including Salisbury, Ocean City, Berlin, Ocean Pines, Cambridge, Easton, Rehoboth Beach, Bethany Beach, Lewes, The Peninsula, Bayside, Heritage Shores and more.

EQUIPMENT: Prochem truck-mount hot water extraction system with Rotovac Powerwand 360° — professional grade, not consumer rental equipment.

BOOKING: Always encourage booking at /booking for instant quotes and seasonal savings. Phone: 443-856-3244.

PERSONALITY: Warm, knowledgeable, direct. Like a helpful neighbor who knows cleaning inside out. Keep responses concise — 2-4 sentences max. Never be vague. Always give specific prices when asked.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ message: "Call us at 443-856-3244 for a free quote!", response: "Call us at 443-856-3244 for a free quote!" });
    }

    // Support both single message and conversation history
    const conversation = messages || [{ role: "user", content: message || "" }];

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview:generateContent?key=" + apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: conversation.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Call us at 443-856-3244!";
    return NextResponse.json({ message: text, response: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ message: "Call us at 443-856-3244!", response: "Call us at 443-856-3244!" });
  }
}
