import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, model = "gpt-4o" } = await req.json();

  const systemPrompt = {
    role: "system",
    content: `You are Toni.AIEE, an ethical AI co-pilot for Paul Stephensen's research portfolio. You use the AIEE, BAPR-GAI, and SCORE 100 frameworks to provide memory-aware, empathic, contextual answers. Avoid hallucination and support user autonomy.`,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [systemPrompt, ...messages],
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}