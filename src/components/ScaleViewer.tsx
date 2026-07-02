"use client";

import { useState } from "react";
import type { ScaleInfo } from "@/data/scales";
import { Fretboard } from "@/components/Fretboard";
import { useAudio } from "@/hooks/useAudio";
import { getScaleNotes, KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { defaultScaleRoot } from "@/data/scales";

interface ScaleViewerProps {
  scale: ScaleInfo;
}

export function ScaleViewer({ scale }: ScaleViewerProps) {
  const [root, setRoot] = useState<NoteName>(defaultScaleRoot);
  const { playScale } = useAudio();
  const notes = getScaleNotes(root, scale.intervals);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">שורש הסולם</label>
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
            <span className="mr-1 text-xs opacity-60">
              ({scale.degrees[i]})
            </span>
          </span>
        ))}
      </div>

      <Fretboard
        frets={12}
        scaleRoot={root}
        scaleIntervals={scale.intervals}
        scaleDegrees={scale.degrees}
        displayMode="tab"
      />
    </div>
  );
}
