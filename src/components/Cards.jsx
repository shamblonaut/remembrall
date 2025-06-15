import { useState } from "react";

export default function Cards({
  cards,
  shuffleCards,
  incrementScore,
  handleGameOver,
}) {
  const [clickedCardIDs, setClickedCardIDs] = useState([]);

  return (
    <div className="cards">
      {cards.map((card) => (
        <button
          type="button"
          key={card.id}
          onClick={() => {
            if (clickedCardIDs.includes(card.id)) {
              setClickedCardIDs([]);
              handleGameOver();
            } else {
              setClickedCardIDs([...clickedCardIDs, card.id]);
              incrementScore();
            }
            shuffleCards();
          }}
        >
          <p>{card.name}</p>
        </button>
      ))}
    </div>
  );
}
