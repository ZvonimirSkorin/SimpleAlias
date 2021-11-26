import { text } from "./AliasRijeci";

let words = "";

export const fck = new Promise((resolve, reject) => {
  const arrayedWords = text.split("\n");
  resolve(arrayedWords);
});
