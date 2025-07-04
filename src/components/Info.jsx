import "../styles/Info.css";
import { AppState, InfoMode } from "../utils";

export default function Info({
  mode,
  setResponded,
  round,
  score,
  highScore,
  setAppState,
}) {
  return (
    <div className="info-overlay">
      <div className="info-box">
        <div className="info">
          {mode === InfoMode.WON && (
            <>
              <div className="title">Round {round} complete!</div>
              <div className="message">Ready for Round {round + 1}?</div>
              <div className="actions">
                <div className="action-container">
                  <button type="button" onClick={() => setResponded(true)}>
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {mode === InfoMode.LOST && (
            <>
              <div className="title">You Lost!</div>
              <div className="message">
                <p>You received {score} points</p>
              </div>
              <div className="high-score">
                <p>
                  {highScore === score
                    ? "New High Score!"
                    : `High Score: ${highScore}`}
                </p>
              </div>
              <div className="actions">
                <div className="action-container">
                  <button
                    type="button"
                    onClick={() => {
                      setResponded(true);
                      setAppState(AppState.MENU);
                    }}
                  >
                    Return to Main Menu
                  </button>
                </div>
                <div className="action-container">
                  <button type="button" onClick={() => setResponded(true)}>
                    Restart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
