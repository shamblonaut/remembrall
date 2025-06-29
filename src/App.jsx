import { useState, useEffect } from "react";

import "./App.css";

import Board from "./components/Board.jsx";
import Status from "./components/Status.jsx";
import { GameState, shuffleArray } from "./utils.js";

import characters from "./assets/characters.json";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    return newScore;
  };

  const handleGameOver = (gameState, newScore = undefined) => {
    const finalScore = newScore === undefined ? score : newScore;
    if (highScore < finalScore) {
      setHighScore(finalScore);
    }

    if (gameState === GameState.WON) {
      setTimeout(() => {
        alert("You won!");
      }, 1000);
    } else if (gameState === GameState.LOST) {
      setTimeout(() => {
        alert(`You lost! You got ${finalScore} points`);
      }, 1000);
    }

    setTimeout(() => {
      setScore(0);
    }, 1000);
  };

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
        <Status score={score} highScore={highScore} />
      </aside>
      <main>
        <Board
          characters={shuffleArray(characters).slice(0, 4)}
          incrementScore={incrementScore}
          handleGameOver={handleGameOver}
        />
      </main>
    </>
  );
}

export default App;
