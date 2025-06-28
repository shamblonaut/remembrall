import { useState } from "react";

import "./App.css";

import characters from "./assets/characters.json";

import Cards from "./components/Cards.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import { useEffect } from "react";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [arrangedCharacters, setArrangedCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const charactersWithImages = characters.filter(
      (character) => character.image,
    );
    setArrangedCharacters(shuffleArray(charactersWithImages));
  }, []);

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
        <div className="band top"></div>
        <div className="content">
          <img src="/remembrall.png" alt="Remembrall" />
          <h1>Remembrall</h1>
        </div>
        <div className="band bottom"></div>
      </header>
      <aside>
        <ScoreBoard score={score} highScore={highScore} />
      </aside>
      <main>
        <Cards
          cards={arrangedCharacters}
          shuffleCards={() =>
            setArrangedCharacters(shuffleArray(arrangedCharacters))
          }
          incrementScore={incrementScore}
          handleGameOver={handleGameOver}
        />
      </main>
    </>
  );
}

export default App;
