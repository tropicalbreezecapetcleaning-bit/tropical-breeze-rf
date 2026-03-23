import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = 'You are the RF Booking Assistant for Tropical Breeze RF, a residue-free cleaning company serving 33+ cities across Maryland and Delaware. Services: Carpet $99 first room/$50 additional, Upholstery from $50, Tile $125/room, Windows $13/window. Phone: 443-856-3244. Be friendly and concise.';

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
          parts: [{ text: m.content }],
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