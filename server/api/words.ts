import wordsData from "../../data/bees.json"; // Ensure resolveJsonModule is enabled
import { Bee } from "~/entities/bee";

export default function defineEventHandler(): Bee[] {
  return wordsData.map((item, index) => {
    if (typeof item.no === "number" && typeof item.word === "string") {
      return { no: item.no, word: item.word };
    }
    throw new Error(`Invalid item at index ${index}`);
  });
}
