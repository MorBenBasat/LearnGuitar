"use client";

import { useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { scales, type ScaleInfo } from "@/data/scales";
import { defaultScaleRoot } from "@/data/scales";
import { useAudio } from "@/hooks/useAudio";
import { getScaleNotes, KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { getPentatonicBoxes } from "@/lib/musicTheory";

const BOX_SCALE_IDS = new Set([
  "pentatonic-minor",
  "pentatonic-major",
  "blues",
  "natural-minor",
  "major",
  "dorian",
]);

interface ScaleExplorerProps {
  initialScaleId?: string;
  showScalePicker?: boolean;
}

export function ScaleExplorer({
  initialScaleId = "pentatonic-minor",
  showScalePicker = true,
}: ScaleExplorerProps) {
  const [scaleId, setScaleId] = useState(initialScaleId);
  const [root, setRoot] = useState<NoteName>(defaultScaleRoot);
  const [boxNum, setBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showBoxFilter, setShowBoxFilter] = useState(true);
  const [displayMode, setDisplayMode] = useState<"tab" | "notes">("tab");

  const scale = scales.find((s) => s.id === scaleId)!;
  const { playScale } = useAudio();
  const notes = getScaleNotes(root, scale.intervals);

  const boxes = useMemo(() => getPentatonicBoxes(root, 17), [root]);
  const activeBox = boxes.find((b) => b.number === boxNum) ?? boxes[0];
  const useBoxes = BOX_SCALE_IDS.has(scale.id);

  return (
    <div className="space-y-6">
      {showScalePicker && (
        <div className="flex flex-wrap gap-2">
          {scales.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScaleId(s.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                scaleId === s.id
                  ? "font-semibold text-stone-950"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700"
              }`}
              style={
                scaleId === s.id ? { backgroundColor: s.color } : undefined
              }
            >
              {s.nameHe}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-stone-800 bg-stone-950/40 p-4">
        <h3 className="text-xl font-bold" style={{ color: scale.color }}>
          {scale.nameHe}
        </h3>
        <p className="mt-1 text-sm text-stone-400">{scale.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">
            שורש הסולם (C, A, G...)
          </label>
          <select
            value={root}
            onChange={(e) => setRoot(e.target.value as NoteName)}
            className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
          >
            {KEY_ROOTS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => playScale(notes)}
          className="rounded-full bg-amber-600 px-5 py-2 font-medium text-stone-950 hover:bg-amber-500"
        >
          ▶ נגן סולם
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDisplayMode("tab")}
            className={`rounded-full px-3 py-1 text-xs ${
              displayMode === "tab"
                ? "bg-amber-600 text-stone-950"
                : "bg-stone-800 text-stone-400"
            }`}
          >
            מספרי פריט
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode("notes")}
            className={`rounded-full px-3 py-1 text-xs ${
              displayMode === "notes"
                ? "bg-amber-600 text-stone-950"
                : "bg-stone-800 text-stone-400"
            }`}
          >
            שמות תווים
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {notes.map((note, i) => (
          <span
            key={i}
            className="rounded-lg px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: `${scale.color}22`,
              color: scale.color,
              border: `1px solid ${scale.color}44`,
            }}
          >
            {note}
          </span>
        ))}
      </div>

      {useBoxes && (
        <div className="space-y-3 rounded-xl border border-amber-800/30 bg-amber-950/15 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-semibold text-amber-400">
              5 קופסאות — {root}
            </h4>
            <label className="flex items-center gap-2 text-xs text-stone-400">
              <input
                type="checkbox"
                checked={showBoxFilter}
                onChange={(e) => setShowBoxFilter(e.target.checked)}
                className="accent-amber-500"
              />
              הדגש קופסה בלבד
            </label>
          </div>
          <p className="text-xs text-stone-500">
            בחר C, A, G... — הקופסאות זזות אוטומטית לפי השורש
          </p>
          <div className="flex flex-wrap gap-2">
            {boxes.map((box) => (
              <button
                key={box.number}
                type="button"
                onClick={() => setBoxNum(box.number)}
                className={`rounded-xl border px-3 py-2 text-sm transition ${
                  boxNum === box.number
                    ? "border-amber-500 bg-amber-600/20 font-semibold text-amber-300"
                    : "border-stone-800 text-stone-400 hover:border-stone-700"
                }`}
              >
                {box.nameHe}
                <span className="mr-1 text-xs opacity-60">
                  ({box.minFret}–{box.maxFret})
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm text-stone-400">{activeBox.tipHe}</p>
        </div>
      )}

      <Fretboard
        frets={17}
        scaleRoot={root}
        scaleIntervals={scale.intervals}
        scaleDegrees={scale.degrees}
        activeBox={useBoxes && showBoxFilter ? activeBox : null}
        displayMode={displayMode}
      />
    </div>
  );
}
