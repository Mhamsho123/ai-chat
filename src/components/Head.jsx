import './components.css'

function Head({ onClose }) {
  return (
    <header className="terminal-head">
      <div className="terminal-title-bar">
        <div className="terminal-buttons">
          <button 
            className="terminal-button close" 
            onClick={onClose}
            title="Close chat"
          ></button>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="board-title">📚 Study Helper</div>
      </div>
    </header>
  )
}

export default Head
