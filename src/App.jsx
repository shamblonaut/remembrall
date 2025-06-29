import { useState, useEffect } from "react";

import "./App.css";

import Board from "./components/Board.jsx";
import Status from "./components/Status.jsx";
import { Difficulty, shuffleArray, getDifficultyCardCount } from "./utils.js";

import characters from "./assets/characters.json";

function App() {
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [deltaCharacters, setDeltaCharacters] = useState(() =>
    shuffleArray(characters).slice(0, getDifficultyCardCount(difficulty)),
  );

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    return newScore;
  };

  const handleRoundVictory = () => {
    setTimeout(() => {
      alert(`You won this round. Onto round ${round + 1}!`);
      setRound(round + 1);
    }, 1000);
  };

  const handleGameOver = (gameState) => {
    if (highScore < score) {
      setHighScore(score);
    }

    alert(`You lost! You got ${score} points`);
    setTimeout(() => {
      setRound(1);
      setScore(0);
    }, 1000);
  };

  useEffect(() => {
    setDeltaCharacters(
      shuffleArray(characters).slice(0, getDifficultyCardCount(difficulty)),
    );
  }, [round]);

  return (
    <>
      <header>
        <div className="band top"></div>
        <div className="content">
          <img src="/remembrall.png" alt="Remembrall" />
          <h1>Remembrall</h1>
        </div>
        <div className="band bottom"></div>
      </header>
      <aside>
        <Status round={round} score={score} highScore={highScore} />
      </aside>
      <main>
        <Board
          key={round}
          characters={deltaCharacters}
          incrementScore={incrementScore}
          handleRoundVictory={handleRoundVictory}
          handleGameOver={handleGameOver}
        />
      </main>
    </>
  );
}

export default App;
