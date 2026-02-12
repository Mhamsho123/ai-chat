import { useState } from 'react'
import './components.css'

function ChatInput({ messages, setMessages, onClose }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const userMessage = { text: message, type: 'user' }
      setMessages([...messages, userMessage])
      setMessage('')
      
      // Simulate AI response with a slight delay
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'how can i help you', type: 'ai' }])
      }, 500)
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
            [EXIT]
          </button>
        )}
        <div className={`chat-area ${messages.length > 0 ? 'expanded' : ''}`}>
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <span className="message-prompt">
                  {msg.type === 'user' ? 'user@ai-chat:~$' : 'ai@system:~$'}
                </span>
                <span className="message-text">{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <form className="input-section" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="input-prompt">user@ai-chat:~$</span>
            <input
              type="text"
              className="terminal-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              autoFocus
            />
            <button type="submit" className="terminal-button-submit">
              [ENTER]
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ChatInput
