"use client";

import { useMemo } from "react";
import {
  getFretboardNotes,
  getScaleNotes,
  NOTE_NAMES_HE,
} from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { useAudio } from "@/hooks/useAudio";
import type { PentatonicBox } from "@/lib/musicTheory";
import { isNoteInBox } from "@/lib/musicTheory";

/** סדר תצוגה כמו טאב: e למעלה, E עבה למטה */
const DISPLAY_STRINGS = [
  { index: 5, label: "e", hint: "דק" },
  { index: 4, label: "B", hint: "" },
  { index: 3, label: "G", hint: "" },
  { index: 2, label: "D", hint: "" },
  { index: 1, label: "A", hint: "" },
  { index: 0, label: "E", hint: "עבה" },
] as const;

export type FretboardDisplayMode = "tab" | "notes" | "degrees";

interface FretboardProps {
  frets?: number;
  scaleRoot?: NoteName;
  scaleIntervals?: number[];
  scaleDegrees?: string[];
  highlightRoot?: boolean;
  activeBox?: PentatonicBox | null;
  /** tab = מספר פריט (כמו בטאב), notes = שם תו, degrees = מעלות סולם */
  displayMode?: FretboardDisplayMode;
  activePosition?: { stringIndex: number; fret: number } | null;
  onFretClick?: (stringIndex: number, fret: number, note: NoteName) => void;
  className?: string;
}

export function Fretboard({
  frets = 12,
  scaleRoot,
  scaleIntervals,
  scaleDegrees,
  highlightRoot = true,
  activeBox = null,
  displayMode = "tab",
  activePosition = null,
  onFretClick,
  className = "",
}: FretboardProps) {
  const { playFret } = useAudio();
  const board = useMemo(() => getFretboardNotes(frets), [frets]);
  const fretColumns = frets + 1; // 0 = מיתר פתוח, 1..frets

  const scaleNotes = useMemo(() => {
    if (!scaleRoot || !scaleIntervals) return null;
    return new Set(getScaleNotes(scaleRoot, scaleIntervals));
  }, [scaleRoot, scaleIntervals]);

  const degreeByNote = useMemo(() => {
    if (!scaleRoot || !scaleIntervals || !scaleDegrees) return null;
    const notes = getScaleNotes(scaleRoot, scaleIntervals);
    return new Map(notes.map((n, i) => [n, scaleDegrees[i]]));
  }, [scaleRoot, scaleIntervals, scaleDegrees]);

  const handleClick = (si: number, fret: number, note: NoteName) => {
    playFret(si, fret);
    onFretClick?.(si, fret, note);
  };

  return (
    <div className={`overflow-x-auto ${className}`} dir="ltr">
      <div className="inline-block min-w-full rounded-2xl border border-amber-800/30 bg-gradient-to-b from-stone-900 via-amber-950/20 to-stone-950 p-5 shadow-xl">
        {/* כותרת הסבר */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <span>מלמעלה למטה = כמו טאב (e דק → E עבה)</span>
          <span className="text-amber-600/70">
            {displayMode === "tab" && "המספר = איזה פריט ללחוץ"}
            {displayMode === "notes" && "אות = שם התו"}
            {displayMode === "degrees" && "מספר = מעלת סולם"}
          </span>
        </div>

        {/* Nut line */}
        <div
          className="mb-1 grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] gap-0"
          style={{ "--frets": fretColumns } as React.CSSProperties}
        >
          <div />
          <div
            className="col-span-full mr-10 h-1 rounded-full bg-gradient-to-r from-stone-500 to-stone-400"
            style={{ gridColumn: `2 / span ${fretColumns}` }}
          />
        </div>

        {/* Fret numbers */}
        <div
          className="mb-2 grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] gap-0"
          style={{ "--frets": fretColumns } as React.CSSProperties}
        >
          <div className="text-right pr-2 text-[9px] text-stone-600">פריט</div>
          {Array.from({ length: fretColumns }, (_, i) => {
            const fretNum = i;
            const inBox = activeBox && isNoteInBox(fretNum, activeBox);
            return (
              <div
                key={i}
                className={`text-center text-[10px] font-medium ${
                  inBox ? "text-amber-400 font-bold" : "text-amber-600/60"
                }`}
              >
                {fretNum === 0 ? "פתוח" : fretNum}
              </div>
            );
          })}
        </div>

        {DISPLAY_STRINGS.map(({ index: si, label, hint }) => {
          const stringNotes = board[si];
          return (
            <div
              key={si}
              className="grid grid-cols-[2.5rem_repeat(var(--frets),1fr)] items-center gap-0 border-b border-amber-900/15 py-1.5 last:border-0"
              style={{ "--frets": fretColumns } as React.CSSProperties}
            >
              <div className="text-right pr-2">
                <span className="text-sm font-bold text-amber-500/90">
                  {label}
                </span>
                {hint && (
                  <span className="block text-[8px] text-stone-600">{hint}</span>
                )}
              </div>
              {stringNotes.map((note, fret) => {
                const inScale = scaleNotes?.has(note);
                const isRoot = scaleRoot === note && inScale;
                const inBox = activeBox ? isNoteInBox(fret, activeBox) : true;
                const isActive =
                  activePosition?.stringIndex === si &&
                  activePosition?.fret === fret;
                const visible = !scaleNotes || inScale;
                const dimmed = activeBox && visible && !inBox;
                const degree =
                  displayMode === "degrees" && inScale
                    ? degreeByNote?.get(note)
                    : undefined;

                return (
                  <button
                    key={fret}
                    type="button"
                    onClick={() => handleClick(si, fret, note)}
                    className={`relative mx-0.5 flex h-10 flex-col items-center justify-center rounded-lg text-[10px] font-medium transition-all duration-150 ${
                      !visible
                        ? "opacity-15 hover:opacity-30"
                        : isActive
                          ? "bg-green-400 text-stone-950 font-bold shadow-lg shadow-green-500/50 ring-2 ring-green-300 scale-125 z-20"
                          : dimmed
                            ? "opacity-25 bg-stone-800/30 text-stone-600"
                            : isRoot && highlightRoot
                              ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-500/40 ring-2 ring-amber-300/50 scale-110 z-10"
                              : inScale && inBox
                                ? "bg-amber-800/70 text-amber-100 hover:bg-amber-500 hover:text-stone-950 hover:scale-105 ring-1 ring-amber-500/30"
                                : inScale
                                  ? "bg-amber-800/70 text-amber-100 hover:bg-amber-500 hover:text-stone-950 hover:scale-105"
                                  : "bg-stone-800/40 text-stone-600 hover:bg-stone-700 hover:text-stone-300"
                    }`}
                    title={`מיתר ${label}, פריט ${fret} = ${note} (${NOTE_NAMES_HE[note]})`}
                  >
                    {visible && !dimmed ? (
                      <>
                        {displayMode === "tab" && (
                          <span className="text-sm font-bold">
                            {fret === 0 ? "○" : fret}
                          </span>
                        )}
                        {displayMode === "notes" && (
                          <span className="text-[11px] font-bold">{note}</span>
                        )}
                        {displayMode === "degrees" && degree && (
                          <span className="text-[11px] font-bold">{degree}</span>
                        )}
                        {displayMode === "tab" && isRoot && (
                          <span className="text-[8px] opacity-70">●</span>
                        )}
                      </>
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-stone-600" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}

        {activeBox && (
          <div className="mt-3 rounded-lg border border-amber-700/30 bg-amber-950/30 px-3 py-2 text-center text-xs text-amber-400">
            {activeBox.nameHe}: לחץ על פריטים {activeBox.minFret === 0 ? "פתוח" : activeBox.minFret}–{activeBox.maxFret}{" "}
            (המספרים המוארים) · שאר הצוואר מעומעם
          </div>
        )}

        <p className="mt-4 text-center text-xs text-amber-700/50">
          לחץ על תא לשמיעה · זהב = התו המרכזי · כמו טאב: שורה = מיתר, מספר = פריט
        </p>
      </div>
    </div>
  );
}
