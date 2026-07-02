"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import { getChordMood } from "@/data/progressionPlayGuide";
import { resolveChordNotes, noteNameToMidi, KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { ChordCard } from "@/components/ChordCard";
import { getChordById } from "@/data/chords";
import {
  getGuitarEngine,
  midiToNote,
  playGuitarChord,
  releaseAllGuitar,
} from "@/lib/guitarEngine";

interface ProgressionPlayerProps {
  progression: Progression;
  controlledKey?: NoteName;
  onKeyChange?: (key: NoteName) => void;
  /** בלי ספרות רומיות — רק אקורדים */
  plainMode?: boolean;
  /** מסתיר דיאגרמות אקורדים פתוחים (רוק/מטאל) */
  hideChordDiagrams?: boolean;
}

export function ProgressionPlayer({
  progression,
  controlledKey,
  onKeyChange,
  plainMode = true,
  hideChordDiagrams = false,
}: ProgressionPlayerProps) {
  const [internalKey, setInternalKey] = useState<NoteName>(progression.defaultKey);
  const key = controlledKey ?? internalKey;

  const setKey = (k: NoteName) => {
    if (onKeyChange) onKeyChange(k);
    else setInternalKey(k);
  };

  useEffect(() => {
    if (controlledKey === undefined) {
      setInternalKey(progression.defaultKey);
    }
  }, [progression.defaultKey, controlledKey]);

  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bpm, setBpm] = useState(progression.bpm);
  const partRef = useRef<Tone.Part | null>(null);
  const startedRef = useRef(false);

  const resolved = resolveProgressionInKey(progression, key);

  const stop = useCallback(() => {
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
      partRef.current = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
    releaseAllGuitar();
    setPlaying(false);
    setCurrentIndex(0);
  }, []);

  const buildPart = useCallback(() => {
    stop();

    const beatDur = 60 / bpm;
    let time = 0;
    const events: { time: number; chord: string; index: number }[] = [];

    resolved.forEach((item, index) => {
      events.push({ time, chord: item.chord, index });
      time += item.bars * 4 * beatDur;
    });

    const totalDuration = time;

    const part = new Tone.Part((t, value) => {
      if (typeof value === "number") return;
      setCurrentIndex(value.index);
      const notes = resolveChordNotes(value.chord);
      const noteNames = notes.map((n) =>
        midiToNote(noteNameToMidi(n, 3))
      );
      const chordDuration = resolved[value.index].bars * 4 * beatDur * 0.9;
      void playGuitarChord(
        noteNames,
        chordDuration,
        t,
        55
      );
    }, events.map((e) => [e.time, { chord: e.chord, index: e.index }]));

    part.loop = true;
    part.loopEnd = totalDuration;
    partRef.current = part;
    return part;
  }, [bpm, resolved, stop]);

  const togglePlay = async () => {
    if (playing) {
      stop();
      return;
    }
    if (!startedRef.current) {
      await getGuitarEngine();
      startedRef.current = true;
    }
    Tone.Transport.bpm.value = bpm;
    const part = buildPart();
    part.start(0);
    Tone.Transport.start();
    setPlaying(true);
  };

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (playing) {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, bpm]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-amber-900/30 bg-stone-900/60 p-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">
            מפתח השיר
          </label>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value as NoteName)}
            className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
          >
            {KEY_ROOTS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-stone-500">
            BPM: {bpm}
          </label>
          <input
            type="range"
            min={60}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-32 accent-amber-500"
          />
        </div>
        <button
          type="button"
          onClick={togglePlay}
          className={`rounded-full px-6 py-2.5 font-semibold transition active:scale-95 ${
            playing
              ? "bg-red-600/80 text-white hover:bg-red-500"
              : "bg-amber-600 text-stone-950 hover:bg-amber-500"
          }`}
        >
          {playing ? "⏹ עצור" : "▶ נגן שיר ברקע"}
        </button>
      </div>

      {/* Chord sequence */}
      <div className="flex flex-wrap justify-center gap-3">
        {resolved.map((item, i) => {
          const mood = getChordMood(item.chord);
          return (
            <div
              key={`${item.chord}-${i}`}
              className={`flex flex-col items-center rounded-xl border px-5 py-4 transition-all ${
                playing && currentIndex === i
                  ? "border-amber-400 bg-amber-600/20 scale-105 shadow-lg shadow-amber-500/20"
                  : "border-amber-900/30 bg-stone-900/40"
              }`}
            >
              <span className="text-lg">{mood.emoji}</span>
              <span className="text-2xl font-bold text-amber-400">
                {item.chord}
              </span>
              {!plainMode && (
                <span className="text-sm text-stone-500">{item.roman}</span>
              )}
              {plainMode && (
                <span className="text-xs text-stone-500">{mood.label}</span>
              )}
              <span className="text-xs text-stone-600">{item.bars} תיבות</span>
            </div>
          );
        })}
      </div>

      {/* Chord diagrams for current key */}
      {!hideChordDiagrams && (
      <div>
        <h4 className="mb-3 text-sm font-medium text-stone-400">
          דיאגרמות אקורדים בטונאליות {key}
        </h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {resolved.map((item, i) => {
            const chordInfo = getChordById(item.chord);
            if (!chordInfo) {
              return (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-xl border border-stone-800 p-4 text-stone-500"
                >
                  <span className="text-xl font-bold">{item.chord}</span>
                  <span className="text-xs">(barre — אין דיאגרמה)</span>
                </div>
              );
            }
            return <ChordCard key={i} chord={chordInfo} compact />;
          })}
        </div>
      </div>
      )}
      {hideChordDiagrams && (
        <p className="rounded-xl border border-stone-800 bg-stone-900/40 p-4 text-center text-sm text-stone-400">
          ברוק/מטאל — נגן <strong className="text-amber-400">Power Chords</strong>{" "}
          (E5, A5...) מהשיעור, לא אקורדים פתוחים.
        </p>
      )}
    </div>
  );
}
