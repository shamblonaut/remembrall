import "../styles/Status.css";

export default function Status({ round, score, highScore }) {
  return (
    <div className="status">
      <div className="round">
        <p className="label">Round: </p>
        <p className="count">{round}</p>
      </div>
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
