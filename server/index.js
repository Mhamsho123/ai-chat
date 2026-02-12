import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  const system = {
    role: 'system',
    content: [
      "You are a helpful assistant for Mohamad's local chatbot.",
      'Rules:',
      '- Be concise (max 6 lines).',
      '- Use bullet points when helpful.',
      '- If missing info, ask exactly ONE question.',
      '- No fluff.',
    ].join('\n'),
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'Missing OPENROUTER_API_KEY in server/.env' })
  }

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'local-ai-chat',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [system, ...messages],
        temperature: 0.7,
      }),
    })

    const data = await r.json()

    if (!r.ok) {
      return res.status(r.status).json({
        error: 'OpenRouter error',
        details: data,
      })
    }

    const reply = data?.choices?.[0]?.message?.content ?? ''
    return res.json({ reply })
  } catch (err) {
    return res.status(500).json({ error: 'Server failed to reach OpenRouter' })
  }
})

app.listen(3001, () => {
  console.log('AI server running on http://localhost:3001')
})

