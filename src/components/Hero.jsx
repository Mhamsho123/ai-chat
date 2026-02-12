import './components.css'

function Hero() {
  return (
    <section className="terminal-hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="board-text">Welcome to Study Helper</span>
        </h1>
        <p className="hero-subtitle">
          <span className="board-text">Ask me about Science 🔬, Math 📐, History 📜, or Religion ⛪</span>
        </p>
        <div className="board-divider">
          <div className="divider-line"></div>
        </div>
        <p className="hero-hint">
          <span className="board-text">Click <span style={{fontWeight: '700'}}>🎨</span> to see what each color represents!</span>
        </p>
      </div>
    </section>
  )
}

export default Hero
