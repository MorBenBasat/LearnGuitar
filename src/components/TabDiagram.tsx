"use client";

import type { TabLick } from "@/data/songLab";

const DISPLAY = [
  { index: 5, label: "e" },
  { index: 4, label: "B" },
  { index: 3, label: "G" },
  { index: 2, label: "D" },
  { index: 1, label: "A" },
  { index: 0, label: "E" },
] as const;

interface TabDiagramProps {
  positions: { stringIndex: number; fret: number }[];
  title?: string;
  highlight?: Set<string>;
  className?: string;
}

export function TabDiagram({
  positions,
  title,
  highlight,
  className = "",
}: TabDiagramProps) {
  const marks = new Set(
    positions.map((p) => `${p.stringIndex}-${p.fret}`)
  );
  const frets = positions.map((p) => p.fret);
  const hasOpen = frets.some((f) => f === 0);
  const minF = hasOpen ? 0 : Math.max(1, Math.min(...frets) - 1);
  const maxF = Math.max(...frets) + 1;
  const fretCols = Array.from(
    { length: maxF - minF + 1 },
    (_, i) => minF + i
  );

  return (
    <div
      className={`rounded-xl border border-stone-700 bg-stone-950 p-4 font-mono text-sm ${className}`}
      dir="ltr"
    >
      {title && (
        <p className="mb-3 text-center text-xs font-sans text-amber-500">
          {title}
        </p>
      )}
      <div className="space-y-0.5">
        {DISPLAY.map(({ index: si, label }) => (
          <div key={si} className="flex items-center gap-1">
            <span className="w-4 text-right text-amber-600/80">{label}</span>
            <span className="text-stone-600">|</span>
            {fretCols.map((f) => {
              const key = `${si}-${f}`;
              const hit = marks.has(key);
              const hl = highlight?.has(key);
              return (
                <span
                  key={f}
                  className={`inline-flex w-6 justify-center ${
                    hit
                      ? hl
                        ? "font-bold text-green-400"
                        : "font-bold text-amber-400"
                      : "text-stone-700"
                  }`}
                >
                  {hit ? f : "-"}
                </span>
              );
            })}
            <span className="text-stone-600">|</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center font-sans text-[10px] text-stone-600">
        מספר = פריט · שורה = מיתר
      </p>
    </div>
  );
}

export function TabLickCard({
  lick,
  onPlay,
  playing,
  activeStep,
}: {
  lick: TabLick;
  onPlay: () => void;
  playing?: boolean;
  activeStep?: number | null;
}) {
  const highlight =
    activeStep !== null && activeStep !== undefined
      ? new Set([
          `${lick.positions[activeStep]?.stringIndex}-${lick.positions[activeStep]?.fret}`,
        ])
      : undefined;

  return (
    <div className="space-y-3 rounded-xl border border-stone-800 bg-stone-900/50 p-4">
      <div>
        <h4 className="font-bold text-stone-200">{lick.nameHe}</h4>
        <p className="text-sm text-stone-400">{lick.descriptionHe}</p>
        <p className="mt-1 text-xs text-amber-600/80">מתי: {lick.whenHe}</p>
      </div>
      <TabDiagram positions={lick.positions} highlight={highlight} />
      <button
        type="button"
        onClick={onPlay}
        disabled={playing}
        className="w-full rounded-full bg-amber-600 py-2 text-sm font-semibold text-stone-950 hover:bg-amber-500 disabled:opacity-50"
      >
        {playing ? "מנגן..." : "▶ שמע ואז חזור"}
      </button>
    </div>
  );
}
