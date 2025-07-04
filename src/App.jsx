import { useState, useEffect } from "react";

import "./App.css";

import Board from "./components/Board.jsx";
import Status from "./components/Status.jsx";
import Info from "./components/Info.jsx";
import MainMenu from "./components/MainMenu.jsx";

import characters from "./assets/characters.json";
import {
  Difficulty,
  shuffleArray,
  getDifficultyCardCount,
  InfoMode,
  AppState,
} from "./utils.js";

function App() {
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(Difficulty.NORMAL);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [deltaCharacters, setDeltaCharacters] = useState(() =>
    shuffleArray(characters).slice(0, getDifficultyCardCount(difficulty)),
  );

  const [appState, setAppState] = useState(AppState.MENU);
  const [infoMode, setInfoMode] = useState(InfoMode.HIDDEN);

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    return newScore;
  };

  const handleRoundVictory = () => {
    setTimeout(() => {
      setInfoMode(InfoMode.WON);
      setRound(round + 1);
    }, 1000);
  };

  const handleGameOver = () => {
    if (highScore < score) {
      setHighScore(score);
    }

    setInfoMode(InfoMode.LOST);
    setTimeout(() => {
      setRound(1);
      setScore(0);
    }, 1000);
  };

  useEffect(() => {
    setDeltaCharacters(
      shuffleArray(characters).slice(0, getDifficultyCardCount(difficulty)),
    );
  }, [difficulty, round]);

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
      {appState === AppState.MENU && (
        <MainMenu
          highScore={highScore}
          startGame={() => setAppState(AppState.GAME)}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}
      {appState === AppState.GAME && (
        <>
          <aside>
            <Status score={score} round={round} difficulty={difficulty} />
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
      )}
      {infoMode !== InfoMode.HIDDEN && (
        <Info
          mode={infoMode}
          setMode={setInfoMode}
          round={round}
          score={score}
          highScore={highScore}
          setAppState={setAppState}
        />
      )}
    </>
  );
}

export default App;
