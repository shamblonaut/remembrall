export default function ScoreBoard({ score, highScore }) {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
      <div className="high-score">High Score: {highScore}</div>
    </div>
  );
}
