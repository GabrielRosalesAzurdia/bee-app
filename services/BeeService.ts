// import type { Bee } from "../entities/bee";

// export function getBees() {
//   return useFetch<Bee[]>(`/api/bees`);
// }
import type { Bee } from "~/entities/bee";

// Get the word list
export const getBees = async () => {
  return useFetch<Bee[]>(`/api/words`);
};

export const generateGame = (words: Bee[], from: number, to: number) => {
  const rangeWords = words.slice(from - 1, to);

  const shuffled = [...rangeWords];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const saveGameState = (words: Bee[], currentIndex = 0) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "spelling-bee-game",
      JSON.stringify({
        words,
        currentIndex,
      })
    );
  }
};

export const getGameState = (): {
  words: Bee[];
  currentIndex: number;
} | null => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("spelling-bee-game");
    return state ? JSON.parse(state) : null;
  }
  return null;
};

export const clearGameState = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("spelling-bee-game");
  }
};

// Check if a saved game exists
export const hasSavedGame = (): boolean => {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("spelling-bee-game") !== null
  );
};
