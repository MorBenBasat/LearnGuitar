export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export const STANDARD_TUNING: NoteName[] = ["E", "A", "D", "G", "B", "E"];

export const NOTE_NAMES_HE: Record<NoteName, string> = {
  C: "דו",
  "C#": "דו#",
  D: "רה",
  "D#": "רה#",
  E: "מי",
  F: "פה",
  "F#": "פה#",
  G: "סול",
  "G#": "סול#",
  A: "לה",
  "A#": "לה#",
  B: "סי",
};

export function noteIndex(note: NoteName): number {
  return NOTE_NAMES.indexOf(note);
}

export function noteAtFret(openNote: NoteName, fret: number): NoteName {
  return NOTE_NAMES[(noteIndex(openNote) + fret) % 12];
}

export function getFretboardNotes(
  frets: number,
  tuning: NoteName[] = STANDARD_TUNING
): NoteName[][] {
  return tuning.map((open) =>
    Array.from({ length: frets + 1 }, (_, fret) => noteAtFret(open, fret))
  );
}

export function getScaleNotes(root: NoteName, intervals: number[]): NoteName[] {
  const rootIdx = noteIndex(root);
  return intervals.map((i) => NOTE_NAMES[(rootIdx + i) % 12]);
}

export function transposeNote(note: NoteName, semitones: number): NoteName {
  return NOTE_NAMES[(noteIndex(note) + semitones + 12) % 12];
}

export const KEY_ROOTS: NoteName[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// MIDI note numbers for open strings (approx guitar range)
const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];

export function fretToMidi(stringIndex: number, fret: number): number {
  return OPEN_STRING_MIDI[stringIndex] + fret;
}

export function noteNameToMidi(note: NoteName, octave = 4): number {
  const offsets: Record<NoteName, number> = {
    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11,
  };
  return (octave + 1) * 12 + offsets[note];
}

// Chord note definitions (root position / common voicing notes for playback)
export const CHORD_NOTES: Record<string, NoteName[]> = {
  C: ["C", "E", "G"],
  Dm: ["D", "F", "A"],
  Em: ["E", "G", "B"],
  F: ["F", "A", "C"],
  G: ["G", "B", "D"],
  Am: ["A", "C", "E"],
  Bm: ["B", "D", "F#"],
  A: ["A", "C#", "E"],
  D: ["D", "F#", "A"],
  E: ["E", "G#", "B"],
  B: ["B", "D#", "F#"],
  "Cmaj7": ["C", "E", "G", "B"],
  "Fm7": ["F", "G#", "C", "D#"],
  A7: ["A", "C#", "E", "G"],
  B7: ["B", "D#", "F#", "A"],
  D7: ["D", "F#", "A", "C"],
  E7: ["E", "G#", "B", "D"],
  G7: ["G", "B", "D", "F"],
  Bdim: ["B", "D", "F"],
};

export function resolveChordNotes(chordSymbol: string): NoteName[] {
  const normalized = chordSymbol.replace("maj7", "maj7").replace("M", "m");
  if (CHORD_NOTES[chordSymbol]) return CHORD_NOTES[chordSymbol];
  if (CHORD_NOTES[normalized]) return CHORD_NOTES[normalized];

  // Simple major/minor parse
  const match = chordSymbol.match(/^([A-G]#?)(m|maj7|7|dim)?$/);
  if (!match) return ["C", "E", "G"];
  const [, root, quality] = match;
  const r = root as NoteName;
  if (quality === "m") return [r, transposeNote(r, 3), transposeNote(r, 7)];
  if (quality === "7")
    return [r, transposeNote(r, 4), transposeNote(r, 7), transposeNote(r, 10)];
  if (quality === "maj7")
    return [r, transposeNote(r, 4), transposeNote(r, 7), transposeNote(r, 11)];
  if (quality === "dim")
    return [r, transposeNote(r, 3), transposeNote(r, 6)];
  return [r, transposeNote(r, 4), transposeNote(r, 7)];
}
