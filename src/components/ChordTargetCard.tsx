"use client";

import { TabDiagram } from "@/components/TabDiagram";
import type { ChordTarget } from "@/data/improvLessons";

const STRING_NAMES = ["E (למטה)", "A", "D", "G", "B", "e (למעלה)"];

interface ChordTargetCardProps {
  target: ChordTarget;
  index: number;
  onPlayChord?: () => void;
}

export function ChordTargetCard({
  target,
  index,
  onPlayChord,
}: ChordTargetCardProps) {
  const tabPositions = target.landOn.map((l) => ({
    stringIndex: l.stringIndex,
    fret: l.fret,
  }));

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">
      <div className="flex items-center justify-between border-b border-stone-800 bg-stone-950/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600/20 text-sm font-bold text-amber-400">
            {index + 1}
          </span>
          <div>
            <h4 className="text-xl font-bold text-amber-400">
              {target.chordSymbol}
            </h4>
            <p className="text-xs text-stone-500">
              {target.emoji} {target.moodHe}
            </p>
          </div>
        </div>
        {onPlayChord && (
          <button
            type="button"
            onClick={onPlayChord}
            className="rounded-full bg-stone-800 px-4 py-1.5 text-xs text-stone-300 hover:bg-stone-700"
          >
            ▶ שמע אקורד
          </button>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="rounded-xl border border-blue-800/30 bg-blue-950/20 p-4">
          <p className="mb-1 text-xs font-medium text-blue-400">
            מה לעשות כשהאקורד הזה מתנגן?
          </p>
          <p className="text-sm leading-relaxed text-stone-200">
            {target.approachHe ?? target.tipHe}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-stone-500">
            איפה לנחות — סמן בטאב:
          </p>
          <TabDiagram positions={tabPositions} />
        </div>

        <ul className="space-y-2">
          {target.landOn.map((l, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-lg bg-stone-950/50 px-3 py-2 text-sm"
            >
              <span className="rounded bg-amber-600/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-400">
                {l.fret}
              </span>
              <span className="text-stone-400">
                מיתר {STRING_NAMES[l.stringIndex]}
              </span>
              <span className="mr-auto text-stone-200">= {l.noteHe}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
