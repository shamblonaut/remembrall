import "../styles/MainMenu.css";

import DropdownIcon from "../assets/images/dropdown.svg";

import { Difficulty } from "../utils";

export default function MainMenu({
  highScore,
  startGame,
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="main-menu">
      <p className="instructions">Don't click on a card twice!</p>
      <p className="high-score">High Score: {highScore}</p>
      <p className="difficulty">
        <label htmlFor="difficulty">
          <p>Difficulty: </p>
          <div className="action-container">
            <span>
              <select
                name="difficulty"
                value={difficulty}
                onChange={(event) => {
                  setDifficulty(event.target.value);
                }}
              >
                {Object.keys(Difficulty).map((difficulty) => (
                  <option key={difficulty} value={Difficulty[difficulty]}>
                    {Difficulty[difficulty]}
                  </option>
                ))}
              </select>
              <img src={DropdownIcon} alt="Dropdown" />
            </span>
          </div>
        </label>
      </p>
      <div className="logo">
        <img src="/remembrall.png" alt="Remembrall" />
      </div>
      <div className="play-action">
        <div className="action-container">
          <button type="button" onClick={startGame}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
