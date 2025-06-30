import "../styles/Card.css";

export default function Card({ character, flipped, handleCardClick }) {
  return (
    <button type="button" className={`card ${flipped ? "flipped" : ""}`}>
      <div className="card-content">
        <div
          className="card-front"
          onClick={() => handleCardClick(character.id)}
        >
          <img
            className="avatar"
            src={character.image}
            alt={`Image of ${character.name}`}
          />
          <p className="name">{character.name}</p>
        </div>
        <div className="card-back">
          <p className="lettermark">R</p>
        </div>
      </div>
    </button>
  );
}
