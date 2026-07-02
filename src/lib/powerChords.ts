import type { NoteName } from "@/lib/music";
import { noteAtFret, STANDARD_TUNING } from "@/lib/music";

export function parseChordRoot(chord: string): NoteName | null {
  const m = chord.match(/^([A-G]#?)/);
  return (m?.[1] as NoteName | undefined) ?? null;
}

function findFretForNoteOnString(open: NoteName, target: NoteName, maxFret = 12) {
  for (let fret = 0; fret <= maxFret; fret++) {
    if (noteAtFret(open, fret) === target) return fret;
  }
  return null;
}

export type PowerChordShape =
  | { kind: "E5"; rootFret: number }
  | { kind: "A5"; rootFret: number };

export function pickPowerShape(root: NoteName): PowerChordShape | null {
  const eOpen = STANDARD_TUNING[0];
  const aOpen = STANDARD_TUNING[1];
  const eFret = findFretForNoteOnString(eOpen, root, 12);
  const aFret = findFretForNoteOnString(aOpen, root, 12);

  if (eFret === null && aFret === null) return null;
  if (eFret !== null && eFret <= 7) return { kind: "E5", rootFret: eFret };
  if (aFret !== null) return { kind: "A5", rootFret: aFret };
  return { kind: "E5", rootFret: eFret ?? 0 };
}

export function powerShapeToPositions(shape: PowerChordShape) {
  if (shape.kind === "E5") {
    return [
      { stringIndex: 0, fret: shape.rootFret },
      { stringIndex: 1, fret: shape.rootFret + 2 },
    ];
  }
  return [
    { stringIndex: 1, fret: shape.rootFret },
    { stringIndex: 2, fret: shape.rootFret + 2 },
  ];
}

export function powerChordLabel(root: NoteName) {
  return `${root}5`;
}

export function getPowerChordsForChords(chords: string[]) {
  const seen = new Set<string>();
  return chords
    .filter((c) => (seen.has(c) ? false : (seen.add(c), true)))
    .map((ch) => {
      const root = parseChordRoot(ch);
      if (!root) return null;
      const shape = pickPowerShape(root);
      if (!shape) return null;
      return {
        chord: ch,
        label: powerChordLabel(root),
        positions: powerShapeToPositions(shape),
      };
    })
    .filter(Boolean) as Array<{
    chord: string;
    label: string;
    positions: { stringIndex: number; fret: number }[];
  }>;
}
