import { useState } from 'react'
import Head from './components/Head'
import Hero from './components/Hero'
import ChatInput from './components/ChatInput'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])

  const handleClose = () => {
    setMessages([])
  }

  return (
    <div className="terminal-app">
      <Head onClose={handleClose} />
      {messages.length === 0 && <Hero />}
      <ChatInput messages={messages} setMessages={setMessages} onClose={handleClose} />
    </div>
  )
}

export default App
