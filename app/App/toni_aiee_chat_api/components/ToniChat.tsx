'use client'

import { useState } from 'react'

export default function ToniChat() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = input
    setMessages(prev => [...prev, `🧑: ${userMessage}`, `🤖: thinking...`])
    setInput("")

    const response = await fetch("/api/toni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })

    const data = await response.json()
    const reply = data.reply
    setMessages(prev => [...prev.slice(0, -1), `🤖: ${reply}`])
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 w-80 shadow-xl rounded-xl z-50">
      <h2 className="font-bold mb-2 text-gray-800">Chat with Toni.AIEE</h2>
      <div className="h-40 overflow-y-auto text-sm mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Toni..."
        className="border rounded px-2 py-1 w-full mb-2 text-sm"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full text-sm"
      >
        Send
      </button>
    </div>
  )
}
