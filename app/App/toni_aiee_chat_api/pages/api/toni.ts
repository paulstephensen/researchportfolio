import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end("Method Not Allowed")
  }

  const { message } = req.body

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Toni.AIEE, a calm, thoughtful, empathic AI research assistant. Be concise, respectful, and insightful.",
        },
        { role: "user", content: message }
      ]
    })

    const reply = chat.choices[0].message.content
    res.status(200).json({ reply })
  } catch (error) {
    console.error("OpenAI error:", error)
    res.status(500).json({ reply: "Oops! Toni is recharging. Please try again shortly." })
  }
}
