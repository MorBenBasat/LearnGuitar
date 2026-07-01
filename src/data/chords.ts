export interface ChordInfo {
  id: string;
  name: string;
  nameHe: string;
  image: string;
  category: "major" | "minor" | "dom7" | "maj7";
  difficulty: "open" | "barre";
  tips?: string;
}

export const chords: ChordInfo[] = [
  {
    id: "C",
    name: "C",
    nameHe: "דו מז'ור",
    image: "/chords/C.png",
    category: "major",
    difficulty: "open",
    tips: "המיתר הכבד (E) מושתק — אל תנגן אותו",
  },
  {
    id: "D",
    name: "D",
    nameHe: "רה מז'ור",
    image: "/chords/D.png",
    category: "major",
    difficulty: "open",
  },
  {
    id: "E",
    name: "E",
    nameHe: "מי מז'ור",
    image: "/chords/E.png",
    category: "major",
    difficulty: "open",
  },
  {
    id: "F",
    name: "F",
    nameHe: "פה מז'ור",
    image: "/chords/F.png",
    category: "major",
    difficulty: "barre",
    tips: "Barre בפריט 1 — אחד האקורדים הכי שימושיים",
  },
  {
    id: "G",
    name: "G",
    nameHe: "סול מז'ור",
    image: "/chords/G.png",
    category: "major",
    difficulty: "open",
  },
  {
    id: "A",
    name: "A",
    nameHe: "לה מז'ור",
    image: "/chords/A.png",
    category: "major",
    difficulty: "open",
  },
  {
    id: "B",
    name: "B",
    nameHe: "סי מז'ור",
    image: "/chords/B.png",
    category: "major",
    difficulty: "barre",
  },
  {
    id: "Am",
    name: "Am",
    nameHe: "לה מינור",
    image: "/chords/AM.png",
    category: "minor",
    difficulty: "open",
  },
  {
    id: "Dm",
    name: "Dm",
    nameHe: "רה מינור",
    image: "/chords/DM.png",
    category: "minor",
    difficulty: "open",
  },
  {
    id: "Em",
    name: "Em",
    nameHe: "מי מינור",
    image: "/chords/em.png",
    category: "minor",
    difficulty: "open",
  },
  {
    id: "A7",
    name: "A7",
    nameHe: "לה דומיננט 7",
    image: "/chords/A7.png",
    category: "dom7",
    difficulty: "open",
    tips: "אקורד V7 — יוצר מתח שרוצה לחזור ל-I",
  },
  {
    id: "B7",
    name: "B7",
    nameHe: "סי דומיננט 7",
    image: "/chords/B7.png",
    category: "dom7",
    difficulty: "barre",
  },
  {
    id: "D7",
    name: "D7",
    nameHe: "רה דומיננט 7",
    image: "/chords/d7.png",
    category: "dom7",
    difficulty: "open",
  },
  {
    id: "E7",
    name: "E7",
    nameHe: "מי דומיננט 7",
    image: "/chords/E7.png",
    category: "dom7",
    difficulty: "open",
  },
  {
    id: "Cmaj7",
    name: "Cmaj7",
    nameHe: "דו מז'ור 7",
    image: "/chords/CMAJ7.png",
    category: "maj7",
    difficulty: "open",
    tips: "צליל רך ו'ג'אזי' — נפוץ בפופ מודרני",
  },
  {
    id: "Fm7",
    name: "Fm7",
    nameHe: "פה מינור 7",
    image: "/chords/FM7.png",
    category: "maj7",
    difficulty: "barre",
  },
];

export function getChordById(id: string): ChordInfo | undefined {
  return chords.find((c) => c.id === id);
}
