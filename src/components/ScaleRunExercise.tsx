"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { scaleRunPatterns } from "@/data/theory";
import { defaultScaleRoot } from "@/data/scales";
import { useAudio } from "@/hooks/useAudio";
import { KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import {
  getPentatonicBoxes,
  getScaleRunInBox,
  sortByPitch,
  type FretPosition,
} from "@/lib/musicTheory";

const PENTATONIC_INTERVALS = [0, 3, 5, 7, 10];
const PENTATONIC_DEGREES = ["1", "b3", "4", "5", "b7"];

export function ScaleRunExercise() {
  const [root, setRoot] = useState<NoteName>(defaultScaleRoot);
  const [boxNum, setBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [patternId, setPatternId] = useState("both");
  const [bpm, setBpm] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cancelRef = useRef(false);

  const { playFretSequence } = useAudio();

  const boxes = useMemo(() => getPentatonicBoxes(root, 17), [root]);
  const activeBox = boxes.find((b) => b.number === boxNum)!;

  const runSequence = useMemo((): FretPosition[] => {
    const positions = getScaleRunInBox(
      root,
      PENTATONIC_INTERVALS,
      PENTATONIC_DEGREES,
      activeBox,
      17
    );
    const sorted = sortByPitch(positions);
    const pattern = scaleRunPatterns.find((p) => p.id === patternId)!;

    if (pattern.direction === "asc") return sorted;
    if (pattern.direction === "desc") return [...sorted].reverse();
    return [...sorted, ...[...sorted].slice(0, -1).reverse()];
  }, [root, activeBox, patternId]);

  const activePosition =
    activeIndex !== null && runSequence[activeIndex]
      ? {
          stringIndex: runSequence[activeIndex].stringIndex,
          fret: runSequence[activeIndex].fret,
        }
      : null;

  const run = useCallback(async () => {
    if (playing || runSequence.length === 0) return;
    cancelRef.current = false;
    setPlaying(true);
    setActiveIndex(0);

    const durationMs = await playFretSequence(runSequence, bpm, (i) => {
      if (!cancelRef.current) setActiveIndex(i);
    });

    setTimeout(() => {
      setPlaying(false);
      setActiveIndex(null);
    }, durationMs + 100);
  }, [playing, runSequence, bpm, playFretSequence]);

  const stop = () => {
    cancelRef.current = true;
    setPlaying(false);
    setActiveIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-green-800/20 bg-green-950/10 p-4">
        <p className="text-sm text-stone-300">
          <strong className="text-green-400">ריצת סולם</strong> = לנגן את כל
          התווים בקופסה בסדר. זה בונה זיכרון שריר — לפני שמאלתרים, הריצה חייבת
          להיות אוטומטית.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">שורש</label>
          <select
            value={root}
            onChange={(e) => setRoot(e.target.value as NoteName)}
            disabled={playing}
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
          <label className="mb-1 block text-xs text-stone-500">קופסה</label>
          <select
            value={boxNum}
            onChange={(e) => setBoxNum(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
            disabled={playing}
            className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
          >
            {boxes.map((b) => (
              <option key={b.number} value={b.number}>
                {b.nameHe} ({b.minFret}–{b.maxFret})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-stone-500">BPM: {bpm}</label>
          <input
            type="range"
            min={40}
            max={140}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            disabled={playing}
            className="w-32 accent-amber-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {scaleRunPatterns.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPatternId(p.id)}
            disabled={playing}
            className={`rounded-full px-4 py-2 text-sm transition ${
              patternId === p.id
                ? "bg-green-600 font-semibold text-stone-950"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            {p.nameHe}
          </button>
        ))}
      </div>

      <p className="text-xs text-stone-500">
        {scaleRunPatterns.find((p) => p.id === patternId)?.description} ·{" "}
        {runSequence.length} תווים
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={playing ? stop : run}
          disabled={runSequence.length === 0}
          className={`rounded-full px-6 py-2.5 font-semibold transition ${
            playing
              ? "bg-red-600/80 text-white hover:bg-red-500"
              : "bg-green-600 text-stone-950 hover:bg-green-500"
          }`}
        >
          {playing ? "⏹ עצור" : "▶ נגן ריצה"}
        </button>
      </div>

      <Fretboard
        frets={17}
        scaleRoot={root}
        scaleIntervals={PENTATONIC_INTERVALS}
        scaleDegrees={PENTATONIC_DEGREES}
        activeBox={activeBox}
        activePosition={activePosition}
        displayMode="tab"
      />

      {activeIndex !== null && runSequence[activeIndex] && (
        <p className="text-center text-sm text-green-400">
          עכשיו: פריט {runSequence[activeIndex].fret} על מיתר{" "}
          {["E", "A", "D", "G", "B", "e"][runSequence[activeIndex].stringIndex]}
        </p>
      )}
    </div>
  );
}
