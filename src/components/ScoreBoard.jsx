import "../styles/ScoreBoard.css";

export default function ScoreBoard({ score, highScore }) {
  return (
    <div className="score-board">
      <div className="score">
        <p className="label">Score: </p>
        <p className="count">{score}</p>
      </div>
      <div className="high-score">
        <p className="label">High Score: </p>
        <p className="count">{highScore}</p>
      </div>
    </div>
  );
}
