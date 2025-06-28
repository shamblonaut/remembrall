import { useEffect, useState } from "react";

import "../styles/Cards.css";

export default function Cards({
  cards,
  shuffleCards,
  incrementScore,
  handleGameOver,
}) {
  const [clickedCardIDs, setClickedCardIDs] = useState([]);
  const [isTimedOut, setIsTimedOut] = useState(true);

  useEffect(() => {
    setIsTimedOut(false);
  }, [cards]);

  return (
    <div className="cards" key={cards}>
      {cards.map((card) => (
        <button
          type="button"
          className={`card ${isTimedOut ? "hide" : ""}`}
          key={card.id}
          onClick={() => {
            if (isTimedOut) return;

            if (clickedCardIDs.includes(card.id)) {
              setClickedCardIDs([]);
              handleGameOver();
            } else {
              setClickedCardIDs([...clickedCardIDs, card.id]);
              incrementScore();
            }
            setIsTimedOut(true);

            setTimeout(() => {
              shuffleCards();
            }, 1000);
          }}
        >
          <div className="flip-container">
            <div className="card-front">
              <img
                className="avatar"
                src={card.image}
                alt={`Image of ${card.name}`}
              />
              <p className="name">{card.name}</p>
            </div>
            <div className="card-back">
              <p className="lettermark">R</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
