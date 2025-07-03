import "../styles/Status.css";

import { useMemo } from "react";
import { getDifficultyCardCount } from "../utils";

export default function Status({ score, round, difficulty }) {
  const totalCards = useMemo(
    () => getDifficultyCardCount(difficulty),
    [difficulty],
  );
  return (
    <div className="status">
      <div className="score">
        <p className="count">{score}</p>
      </div>
      <div className="round">
        <p className="label">Round: </p>
        <p className="count">{round}</p>
      </div>
      <div className="difficulty">
        <p className="label">{difficulty} Mode</p>
        <p className="count">[{totalCards} Cards]</p>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((score % totalCards) / totalCards) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
