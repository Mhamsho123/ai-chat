import { useState } from "react";
import "./components.css";

function Head({ onClose }) {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <header className="terminal-head">
      <div className="terminal-title-bar">
        <div className="terminal-buttons">
          {/* Legend button */}
          <button
            className="legend-button"
            onClick={() => setShowLegend(!showLegend)}
            title="Show color legend"
            type="button"
          >
            🎨
          </button>

          {/* Optional close button if you want it */}
          {onClose && (
            <button
              className="close-button"
              onClick={onClose}
              title="Close"
              type="button"
            >
              ✖
            </button>
          )}

          {/* Legend popup */}
          {showLegend && (
            <div className="legend-popup">
              <div className="legend-title">Subject Colors</div>

              <div className="legend-item">
                <span className="legend-color science">🔴</span>
                <span>Science</span>
              </div>

              <div className="legend-item">
                <span className="legend-color math">🔵</span>
                <span>Math</span>
              </div>

              <div className="legend-item">
                <span className="legend-color history">🟢</span>
                <span>History</span>
              </div>

              <div className="legend-item">
                <span className="legend-color religion">🟣</span>
                <span>Religion</span>
              </div>

              <div className="legend-item">
                <span className="legend-color default">⚫</span>
                <span>Other</span>
              </div>
            </div>
          )}
        </div>

        <div className="board-title">📚 Study Helper</div>
      </div>
    </header>
  );
}

export default Head;
