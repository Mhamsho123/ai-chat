import './components.css'

function Hero() {
  return (
    <section className="terminal-hero">
      <div className="hero-content">
        <div className="terminal-prompt">
          <span className="prompt-user">user@ai-chat:~$</span>
          <span className="prompt-cursor">▊</span>
        </div>
        <h1 className="hero-title">
          <span className="terminal-text">AI_CHAT_TERMINAL</span>
        </h1>
        <p className="hero-subtitle">
          <span className="terminal-text">[SYSTEM] Ready for input...</span>
        </p>
        <div className="terminal-divider">
          <span className="divider-line">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
