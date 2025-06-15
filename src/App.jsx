import { useState } from "react";

import "./App.css";

import Cards from "./components/Cards.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";

const characters = [
  { id: crypto.randomUUID(), name: "Harry Potter" },
  { id: crypto.randomUUID(), name: "Ron Weasly" },
  { id: crypto.randomUUID(), name: "Hermione Granger" },
  { id: crypto.randomUUID(), name: "Rubeus Hagrid" },
  { id: crypto.randomUUID(), name: "Albus Dumbledore" },
  { id: crypto.randomUUID(), name: "Severus Snape" },
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [arrangedCharacters, setArrangedCharacters] = useState(
    shuffleArray(characters),
  );
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (newScore === characters.length) {
      setHighScore(newScore);

      setIsGameOver(true);
      alert("You won!");
    }
  };

  const handleGameOver = () => {
    if (highScore < score) {
      setHighScore(score);
    }
    setScore(0);

    setIsGameOver(true);
    alert("Game Over!");
  };

  return (
    <>
      <header>
        <h1>Remembrall</h1>
      </header>
      <ScoreBoard score={score} highScore={highScore} />
      {!isGameOver && (
        <Cards
          cards={arrangedCharacters}
          shuffleCards={() => setArrangedCharacters(shuffleArray(characters))}
          incrementScore={incrementScore}
          handleGameOver={handleGameOver}
        />
      )}
    </>
  );
}

export default App;
