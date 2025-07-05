import { useState, useEffect } from "react";

import "./App.css";

import { Difficulty, InfoMode, AppState } from "./utils/constants.js";
import {
  fetchCharacterList,
  getUniqueBoardKey,
  getDifficultyCardCount,
  shuffleArray,
} from "./utils/helpers.js";

import Board from "./components/Board.jsx";
import Status from "./components/Status.jsx";
import Info from "./components/Info.jsx";
import MainMenu from "./components/MainMenu.jsx";

function App() {
  /* ============ STATES ============ */
  // Game data
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(Difficulty.NORMAL);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Character set and subsets
  const [characters, setCharacters] = useState([]);
  const [deltaCharacters, setDeltaCharacters] = useState([]);
  const [deckReset, setDeckReset] = useState(false);

  // Navigation states
  const [appState, setAppState] = useState(AppState.MENU);
  const [infoMode, setInfoMode] = useState(InfoMode.HIDDEN);
  const [infoResponded, setInfoResponded] = useState(false);

  /* =========== HANDLERS =========== */
  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);
  };

  const handleRoundVictory = () => {
    // Open info modal in WON mode
    setInfoMode(InfoMode.WON);
  };

  const handleGameOver = () => {
    // New High Score
    if (highScore < score) {
      setHighScore(score);
    }

    // Open info modal in LOST mode
    setInfoMode(InfoMode.LOST);
  };

  /* =========== EFFECTS ============ */
  // Fetch characters from API
  useEffect(() => {
    (async () => {
      setCharacters(await fetchCharacterList());
    })();
  }, []);

  // Update game data after user responds to info modal
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

  // Get a new random character subset for a round
  useEffect(() => {
    const newDeck = shuffleArray(characters).slice(
      0,
      getDifficultyCardCount(difficulty),
    );
    setDeltaCharacters(newDeck);

    if (deckReset) {
      setDeckReset(false);
    }
  }, [characters, difficulty, round, deckReset]);

  return (
    <>
      <header>
        <div className="band top"></div>
        <div className="content">
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
