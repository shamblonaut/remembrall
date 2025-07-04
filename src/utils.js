export const Difficulty = Object.freeze({
  EASY: "Easy",
  NORMAL: "Normal",
  HARD: "Hard",
});

export const AppState = Object.freeze({
  MENU: 0,
  GAME: 1,
});

export const InfoMode = Object.freeze({
  HIDDEN: 0,
  WON: 1,
  LOST: 2,
});

export async function fetchCharacterList() {
  const requestURL = "https://hp-api.onrender.com/api/characters";

  const characters = [];

  await fetch(requestURL, { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      characters.push(...response);
    });

  return characters.filter((character) => character.image);
}

export function getDifficultyCardCount(difficulty) {
  switch (difficulty) {
    case Difficulty.EASY:
      return 4;
    case Difficulty.NORMAL:
      return 8;
    case Difficulty.HARD:
      return 16;
  }
}

export function getUniqueBoardKey(characters) {
  let key = "";
  for (const character of characters) {
    key += character.id;
  }
  return key;
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
