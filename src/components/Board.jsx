import { useEffect, useState } from "react";

import "../styles/Board.css";

import { shuffleArray } from "../utils/helpers.js";

import Card from "./Card.jsx";

const flipSound = new Audio("/sounds/flip.mp3");
const unflipSound = new Audio("/sounds/unflip.mp3");

export default function Board({
  characters,
  incrementScore,
  handleRoundVictory,
  handleGameOver,
}) {
  /* ============ STATES ============ */
  // Card shuffles of the same character subset in a given round
  const [shuffledCharacters, setShuffledCharacters] = useState(
    shuffleArray(characters),
  );

  // Keeping track of the characters already clicked on in a given round
  const [clickedCharacters, setClickedCharacters] = useState([]);

  // Whether the cards are visually flipped
  const [flipped, setFlipped] = useState(true);

  /* =========== HANDLERS =========== */
  const handleCardClick = (characterID) => {
    // Clicked on a card that was clicked before in the same round
    if (clickedCharacters.includes(characterID)) {
      handleGameOver();
      setClickedCharacters([]);
    }

    // All unique cards in a round completed
    else if (clickedCharacters.length === characters.length - 1) {
      incrementScore();
      handleRoundVictory();
      setClickedCharacters([]);
    }

    // Clicked on a new unique card in a round
    else {
      incrementScore();
      setClickedCharacters([...clickedCharacters, characterID]);

      // Shuffle the character deck in a given round, and unflip the cards
      setTimeout(() => {
        setShuffledCharacters(shuffleArray(shuffledCharacters));
        setFlipped(false);
      }, 1000);
    }

    // Flip the cards to hide the characters
    setFlipped(true);
  };

  /* =========== EFFECTS ============ */
  // Unflip the cards immediately after a new deck is loaded
  useEffect(() => {
    setFlipped(false);
  }, []);

  useEffect(() => {
    if (flipped) {
      flipSound.play();
    } else {
      unflipSound.play();
    }

    return () => {
      flipSound.currentTime = 0;
      unflipSound.currentTime = 0;
    };
  }, [flipped]);

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
