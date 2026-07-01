"use client";

import { useMemo } from "react";
import {
  getFretboardNotes,
  getScaleNotes,
  NOTE_NAMES_HE,
} from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { useAudio } from "@/hooks/useAudio";

interface FretboardProps {
  frets?: number;
  scaleRoot?: NoteName;
  scaleIntervals?: number[];
  highlightRoot?: boolean;
  onFretClick?: (stringIndex: number, fret: number, note: NoteName) => void;
  className?: string;
}

export function Fretboard({
  frets = 12,
  scaleRoot,
  scaleIntervals,
  highlightRoot = true,
  onFretClick,
  className = "",
}: FretboardProps) {
  const { playFret } = useAudio();
  const board = useMemo(() => getFretboardNotes(frets), [frets]);

  const scaleNotes = useMemo(() => {
    if (!scaleRoot || !scaleIntervals) return null;
    return new Set(getScaleNotes(scaleRoot, scaleIntervals));
  }, [scaleRoot, scaleIntervals]);

  const stringLabels = ["E", "A", "D", "G", "B", "e"];

  const handleClick = (si: number, fret: number, note: NoteName) => {
    playFret(si, fret);
    onFretClick?.(si, fret, note);
  };

  return (
    <div className={`overflow-x-auto ${className}`} dir="ltr">
      <div className="inline-block min-w-full rounded-2xl border border-amber-800/30 bg-gradient-to-b from-stone-900 via-amber-950/20 to-stone-950 p-5 shadow-xl">
        {/* Nut line */}
        <div
          className="mb-1 grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] gap-0"
          style={{ "--frets": frets } as React.CSSProperties}
        >
          <div />
          <div
            className="col-span-full mr-10 h-1 rounded-full bg-gradient-to-r from-stone-500 to-stone-400"
            style={{ gridColumn: `2 / span ${frets}` }}
          />
        </div>

        {/* Fret numbers */}
        <div
          className="mb-2 grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] gap-0"
          style={{ "--frets": frets } as React.CSSProperties}
        >
          <div />
          {Array.from({ length: frets }, (_, i) => (
            <div key={i} className="text-center text-[10px] font-medium text-amber-600/60">
              {i + 1}
            </div>
          ))}
        </div>

        {board.map((stringNotes, si) => (
          <div
            key={si}
            className="grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] items-center gap-0 border-b border-amber-900/15 py-1.5 last:border-0"
            style={{ "--frets": frets } as React.CSSProperties}
          >
            <div className="text-right pr-2 text-sm font-bold text-amber-500/90">
              {stringLabels[si]}
            </div>
            {stringNotes.slice(1).map((note, fi) => {
              const fret = fi + 1;
              const inScale = scaleNotes?.has(note);
              const isRoot = scaleRoot === note && inScale;
              const visible = !scaleNotes || inScale;

              return (
                <button
                  key={fret}
                  type="button"
                  onClick={() => handleClick(si, fret, note)}
                  className={`relative mx-0.5 flex h-10 items-center justify-center rounded-lg text-[10px] font-medium transition-all duration-150 ${
                    !visible
                      ? "opacity-15 hover:opacity-30"
                      : isRoot && highlightRoot
                        ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-500/40 ring-2 ring-amber-300/50 scale-110 z-10"
                        : inScale
                          ? "bg-amber-800/70 text-amber-100 hover:bg-amber-500 hover:text-stone-950 hover:scale-105"
                          : "bg-stone-800/40 text-stone-600 hover:bg-stone-700 hover:text-stone-300"
                  }`}
                  title={`${note} (${NOTE_NAMES_HE[note]})`}
                >
                  {visible ? (
                    <span className="hidden sm:inline">{note}</span>
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-stone-600" />
                  )}
                </button>
              );
            })}
          </div>
        ))}

        <p className="mt-4 text-center text-xs text-amber-700/50">
          לחץ על פריט לשמיעת התו · שורש הסולם מודגש בזהב
        </p>
      </div>
    </div>
  );
}
