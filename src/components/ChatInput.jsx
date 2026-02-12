import { useState } from 'react'
import './components.css'

// Helper function to detect topic and return color class
function getTopicColor(text) {
  const lowerText = text.toLowerCase()
  
  // Science keywords
  const scienceKeywords = ['science', 'biology', 'chemistry', 'physics', 'experiment', 'lab', 'molecule', 'atom', 'element', 'reaction', 'organism', 'cell', 'evolution', 'genetics', 'photosynthesis', 'energy', 'force', 'gravity', 'electricity', 'magnet', 'wave', 'light', 'sound', 'temperature', 'heat', 'matter', 'solid', 'liquid', 'gas', 'scientific', 'hypothesis', 'theory']
  
  // Math keywords
  const mathKeywords = ['math', 'mathematics', 'algebra', 'geometry', 'calculus', 'equation', 'solve', 'formula', 'number', 'add', 'subtract', 'multiply', 'divide', 'fraction', 'decimal', 'percent', 'angle', 'triangle', 'circle', 'square', 'graph', 'function', 'variable', 'integral', 'derivative', 'theorem', 'proof', 'calculate', 'sum', 'difference', 'product', 'quotient', 'arithmetic', 'statistics', 'probability']
  
  // History keywords
  const historyKeywords = ['history', 'historical', 'war', 'battle', 'ancient', 'medieval', 'renaissance', 'revolution', 'empire', 'civilization', 'culture', 'tradition', 'past', 'century', 'decade', 'year', 'timeline', 'event', 'period', 'era', 'dynasty', 'king', 'queen', 'president', 'government', 'politics', 'country', 'nation', 'independence', 'constitution']
  
  // Religion keywords
  const religionKeywords = ['religion', 'religious', 'god', 'prayer', 'faith', 'belief', 'church', 'temple', 'mosque', 'synagogue', 'bible', 'quran', 'torah', 'holy', 'sacred', 'divine', 'spiritual', 'worship', 'baptism', 'christianity', 'islam', 'judaism', 'buddhism', 'hinduism', 'saint', 'prophet', 'angel', 'heaven', 'hell', 'soul', 'spirit']
  
  const hasScience = scienceKeywords.some(keyword => lowerText.includes(keyword))
  const hasMath = mathKeywords.some(keyword => lowerText.includes(keyword))
  const hasHistory = historyKeywords.some(keyword => lowerText.includes(keyword))
  const hasReligion = religionKeywords.some(keyword => lowerText.includes(keyword))
  
  if (hasScience) return 'science'
  if (hasMath) return 'math'
  if (hasHistory) return 'history'
  if (hasReligion) return 'religion'
  return 'default'
}

function ChatInput({ messages, setMessages, onClose }) {
  const [message, setMessage] = useState('')
  const [showLegend, setShowLegend] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = { text: message, type: 'user' }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setMessage('')

    try {
      const apiMessages = nextMessages.map((m) => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json()
      const replyText = data.reply || ''

      setMessages((prev) => [...prev, { text: replyText, type: 'ai' }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: '[ERROR] Unable to reach AI server on http://localhost:3001.', type: 'ai' },
      ])
    }
  }

  const handleClose = () => {
    setMessages([])
    if (onClose) onClose()
  }

  return (
    <section className={`terminal-chat ${messages.length > 0 ? 'expanded' : ''}`}>
      <div className="chat-container">
        {messages.length > 0 && (
          <button className="close-chat-button" onClick={handleClose} title="Close chat">
            ✕ Clear Board
          </button>
        )}
        <div className={`chat-area ${messages.length > 0 ? 'expanded' : ''}`}>
          <div className="messages-list">
            {messages.map((msg, index) => {
              const topicColor = getTopicColor(msg.text)
              return (
                <div key={index} className={`message ${msg.type} ${topicColor}`}>
                  <span className="message-label">
                    {msg.type === 'user' ? 'You:' : 'Teacher:'}
                  </span>
                  <span className={`message-text ${topicColor}`}>{msg.text}</span>
                </div>
              )
            })}
          </div>
        </div>
        
        <form className="input-section" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="input-label">Ask:</span>
            <input
              type="text"
              className="board-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              autoFocus
            />
            <button type="submit" className="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ChatInput
