import { eventHandler } from "h3";
import wordsData from "../../data/bees.json";
import type { Bee } from "~/entities/bee";

// Define the handler function
const beeHandler = (): Bee[] => {
  return wordsData.map((item, index) => {
    if (typeof item.no === "number" && typeof item.word === "string") {
      return { no: item.no, word: item.word };
    }
    throw new Error(`Invalid item at index ${index}`);
  });
};

// Wrap with eventHandler
export default eventHandler(beeHandler);
