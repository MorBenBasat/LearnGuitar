import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "generated-chords.json"), "utf8")
);

const tips = {
  C: "המיתר הכבד (E) מושתק — אל תנגן אותו",
  F: "Barre בפריט 1 — אחד האקורדים הכי שימושיים",
  A7: "אקורד V7 — יוצר מתח שרוצה לחזור ל-I",
  Cmaj7: "צליל רך ו'ג'אזי' — נפוץ בפופ מודרני",
};

const chordEntries = data.chords
  .map((c) => {
    const tipLine = tips[c.id] ? `\n    tips: ${JSON.stringify(tips[c.id])},` : "";
    return `  {
    id: ${JSON.stringify(c.id)},
    name: ${JSON.stringify(c.name)},
    nameHe: ${JSON.stringify(c.nameHe)},
    image: ${JSON.stringify(c.image)},
    category: ${JSON.stringify(c.category)},
    difficulty: ${JSON.stringify(c.difficulty)},${tipLine}
  }`;
  })
  .join(",\n");

const out = `export interface ChordInfo {
  id: string;
  name: string;
  nameHe: string;
  image: string;
  category: "major" | "minor" | "dom7" | "maj7" | "m7" | "dim";
  difficulty: "open" | "barre";
  tips?: string;
}

export const chords: ChordInfo[] = [
${chordEntries}
];

export function getChordById(id: string): ChordInfo | undefined {
  return chords.find((c) => c.id === id);
}
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "data", "chords.ts"), out);
console.log(`Wrote ${data.chords.length} chords to src/data/chords.ts`);
