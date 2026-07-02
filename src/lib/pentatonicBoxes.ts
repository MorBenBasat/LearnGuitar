import {
  getFretboardNotes,
  getScaleNotes,
  noteIndex,
  STANDARD_TUNING,
  transposeNote,
} from "@/lib/music";
import type { NoteName } from "@/lib/music";

export interface FretPosition {
  stringIndex: number;
  fret: number;
  note: NoteName;
}

/** Lowest fret where `root` appears on a given string */
export function getRootFretOnString(
  root: NoteName,
  stringIndex: number
): number {
  const open = STANDARD_TUNING[stringIndex];
  return (noteIndex(root) - noteIndex(open) + 12) % 12;
}

/** Classic 5-box fret windows (relative to root on low E) */
const BOX_OFFSETS: [number, number][] = [
  [0, 3],
  [2, 5],
  [4, 7],
  [7, 10],
  [10, 12],
];

export function getBoxFretRange(
  root: NoteName,
  box: number
): { min: number; max: number } {
  const rootFret = getRootFretOnString(root, 0);
  const [start, end] = BOX_OFFSETS[box - 1];
  return { min: rootFret + start, max: rootFret + end };
}

export const BOX_INFO = [
  {
    box: 1,
    nameHe: "קופסה 1",
    summary: "הבסיס — שורש על מיתר E כבד. כאן מתחילים!",
    feel: "רוק קלאסי, בלוז, סולואים בינוניים",
  },
  {
    box: 2,
    nameHe: "קופסה 2",
    summary: "ממשיכה מקופסה 1 — אותם 5 תווים, מיקום אחר",
    feel: "מעברים חלקים, מלודיות זורמות",
  },
  {
    box: 3,
    nameHe: "קופסה 3",
    summary: "מרכז הצוואר — 'אזור הסולו' הקלאסי",
    feel: "סולואים באמצע, קלאסיק רוק",
  },
  {
    box: 4,
    nameHe: "קופסה 4",
    summary: "גבוה יותר — צליל חד ופרונטלי",
    feel: "סולואים גבוהים, מטאל קל",
  },
  {
    box: 5,
    nameHe: "קופסה 5",
    summary: "הכי גבוה — Hendrix / SRV territory",
    feel: "בלוז חשמלי, bending דרמטי",
  },
] as const;

export function getScalePositionsInBox(
  root: NoteName,
  intervals: number[],
  box: number,
  maxFret = 17
): FretPosition[] {
  const scaleSet = new Set(getScaleNotes(root, intervals));
  const { min, max } = getBoxFretRange(root, box);
  const board = getFretboardNotes(maxFret);
  const positions: FretPosition[] = [];

  board.forEach((stringNotes, stringIndex) => {
    stringNotes.forEach((note, fret) => {
      if (fret < 1 || fret > maxFret) return;
      if (fret < min || fret > max) return;
      if (!scaleSet.has(note)) return;
      positions.push({ stringIndex, fret, note });
    });
  });

  return positions.sort(
    (a, b) =>
      a.fret - b.fret ||
      a.stringIndex - b.stringIndex
  );
}

/** Ascending by pitch (low → high) for scale runs */
export function sortPositionsByPitch(
  positions: FretPosition[]
): FretPosition[] {
  const openMidi = [40, 45, 50, 55, 59, 64];
  return [...positions].sort(
    (a, b) =>
      openMidi[a.stringIndex] + a.fret - (openMidi[b.stringIndex] + b.fret)
  );
}

/** vi degree — e.g. C major → A minor */
export function getRelativeMinorRoot(majorKey: NoteName): NoteName {
  return transposeNote(majorKey, 9);
}
