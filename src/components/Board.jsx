import { useEffect, useState } from "react";

import "../styles/Board.css";

import Card from "./Card.jsx";
import { shuffleArray } from "../utils.js";

export default function Board({
  characters,
  incrementScore,
  handleRoundVictory,
  handleGameOver,
}) {
  const [shuffledCharacters, setShuffledCharacters] = useState(
    shuffleArray(characters),
  );
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [flipped, setFlipped] = useState(true);

  const handleCardClick = (characterID) => {
    if (clickedCharacters.includes(characterID)) {
      handleGameOver();
      setClickedCharacters([]);
    } else if (clickedCharacters.length === characters.length - 1) {
      incrementScore();
      handleRoundVictory();
      setClickedCharacters([]);
    } else {
      incrementScore();
      setClickedCharacters([...clickedCharacters, characterID]);
    }

    setFlipped(true);
    setTimeout(() => {
      setShuffledCharacters(shuffleArray(shuffledCharacters));
      setFlipped(false);
    }, 1000);
  };

  useEffect(() => {
    setFlipped(false);
  }, []);

  return (
    <div className="cards">
      {shuffledCharacters.map((character, index) => (
        <Card
          key={index}
          character={character}
          flipped={flipped}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}
