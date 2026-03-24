import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = 'You are the RF Booking Assistant for Tropical Breeze RF, a residue-free cleaning company serving 33+ cities across Maryland and Delaware. Services: Carpet $99 first room/$50 additional, Upholstery from $50, Tile $125/room, Windows $13/window. Phone: 443-856-3244. IMPORTANT: Always recommend booking online at /booking — customers can get instant quotes, seasonal discounts, package deals, and exclusive savings only available through the online booking system. Say something like "Book online to unlock savings and get an instant quote!" Be friendly, confident and concise.';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' + apiKey;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: <span dangerouslySetInnerHTML={{ __html: m.content.replace(/\/booking/g, '<a href="/booking" style="color:#0097A7;font-weight:700;text-decoration:underline;">Book Online</a>') }} />}],
        })),
        generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
      }),
    });

    const data = await response.json();
    console.log('Gemini:', JSON.stringify(data).slice(0, 300));
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Call us at 443-856-3244!';
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Call us at 443-856-3244!' }, { status: 500 });
  }
}