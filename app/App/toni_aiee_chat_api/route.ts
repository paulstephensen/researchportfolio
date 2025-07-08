// /app/api/toni_aiee_chat_api/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
  }

  try {
    console.log("Calling OpenAI with message:", message);

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are Toni.AIEE, a helpful AI assistant for Paul’s ePortfolio.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("OpenAI request failed:", err);
    return NextResponse.json({ error: 'OpenAI request failed', details: err }, { status: 500 });
  }
}
