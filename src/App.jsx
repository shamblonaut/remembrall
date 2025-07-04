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
  getUniqueBoardKey,
} from "./utils.js";

function App() {
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(Difficulty.NORMAL);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [deltaCharacters, setDeltaCharacters] = useState(() =>
    shuffleArray(characters).slice(0, getDifficultyCardCount(difficulty)),
  );
  const [deckReset, setDeckReset] = useState(false);

  const [appState, setAppState] = useState(AppState.MENU);
  const [infoMode, setInfoMode] = useState(InfoMode.HIDDEN);
  const [infoResponded, setInfoResponded] = useState(false);

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    return newScore;
  };

  const handleRoundVictory = () => {
    setInfoMode(InfoMode.WON);
  };

  const handleGameOver = () => {
    if (highScore < score) {
      setHighScore(score);
    }

    setInfoMode(InfoMode.LOST);
  };

  useEffect(() => {
    if (!infoResponded) return;

    switch (infoMode) {
      case InfoMode.WON:
        setRound((round) => round + 1);
        break;
      case InfoMode.LOST:
        setRound(1);
        setScore(0);
        setDeckReset(true);
        break;
    }

    setInfoResponded(false);
    setInfoMode(InfoMode.HIDDEN);
  }, [infoResponded, infoMode]);

  useEffect(() => {
    const newDeck = shuffleArray(characters).slice(
      0,
      getDifficultyCardCount(difficulty),
    );
    setDeltaCharacters(newDeck);

    if (deckReset) {
      setDeckReset(false);
    }
  }, [difficulty, round, deckReset]);

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
              key={getUniqueBoardKey(deltaCharacters)}
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
          setResponded={setInfoResponded}
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
