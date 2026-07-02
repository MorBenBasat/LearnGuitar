"use client";

import { useCallback, useRef } from "react";
import * as Tone from "tone";
import { resolveChordNotes, noteNameToMidi, fretToMidi } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import {
  getGuitarEngine,
  midiToNote,
  playGuitarChord,
  playGuitarNote,
  playGuitarNotesSequence,
  releaseAllGuitar,
} from "@/lib/guitarEngine";

export function useAudio() {
  const started = useRef(false);

  const ensureStarted = useCallback(async () => {
    if (!started.current) {
      await getGuitarEngine();
      started.current = true;
    }
  }, []);

  const playChord = useCallback(
    async (chordSymbol: string, duration = "2n") => {
      await ensureStarted();
      releaseAllGuitar();
      const notes = resolveChordNotes(chordSymbol);
      const noteNames = notes.map((n) => midiToNote(noteNameToMidi(n, 3)));
      await playGuitarChord(noteNames, duration, undefined, 50);
    },
    [ensureStarted]
  );

  const playNote = useCallback(
    async (note: NoteName, octave = 4, duration = "8n") => {
      await ensureStarted();
      const midi = noteNameToMidi(note, octave);
      await playGuitarNote(midiToNote(midi), duration);
    },
    [ensureStarted]
  );

  const playFret = useCallback(
    async (stringIndex: number, fret: number, duration = "8n") => {
      await ensureStarted();
      const midi = fretToMidi(stringIndex, fret);
      await playGuitarNote(midiToNote(midi), duration);
    },
    [ensureStarted]
  );

  const playScale = useCallback(
    async (notes: NoteName[], bpm = 80) => {
      await ensureStarted();
      const noteNames = notes.map((n) => midiToNote(noteNameToMidi(n, 4)));
      await playGuitarNotesSequence(noteNames, bpm);
    },
    [ensureStarted]
  );

  const playFretSequence = useCallback(
    async (
      positions: { stringIndex: number; fret: number }[],
      bpm = 80,
      onStep?: (index: number) => void
    ) => {
      await ensureStarted();
      const interval = 60 / bpm;
      const t0 = Tone.now();

      positions.forEach((pos, i) => {
        const midi = fretToMidi(pos.stringIndex, pos.fret);
        const note = midiToNote(midi);
        const at = t0 + i * interval;
        setTimeout(() => onStep?.(i), i * interval * 1000);
        void playGuitarNote(note, "8n", at);
      });

      return positions.length * interval * 1000;
    },
    [ensureStarted]
  );

  return { playChord, playNote, playFret, playScale, playFretSequence, ensureStarted };
}
