"use client";

import { useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { defaultScaleRoot } from "@/data/scales";
import { KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import {
  getPentatonicBoxes,
  type PentatonicBox,
} from "@/lib/musicTheory";

const PENTATONIC_INTERVALS = [0, 3, 5, 7, 10];
const PENTATONIC_DEGREES = ["1", "b3", "4", "5", "b7"];

interface PentatonicBoxViewerProps {
  root?: NoteName;
  onRootChange?: (root: NoteName) => void;
}

export function PentatonicBoxViewer({
  root: controlledRoot,
  onRootChange,
}: PentatonicBoxViewerProps) {
  const [internalRoot, setInternalRoot] = useState<NoteName>(defaultScaleRoot);
  const [activeBoxNum, setActiveBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);

  const root = controlledRoot ?? internalRoot;
  const setRoot = (r: NoteName) => {
    setInternalRoot(r);
    onRootChange?.(r);
  };

  const boxes = useMemo(() => getPentatonicBoxes(root, 17), [root]);
  const activeBox = boxes.find((b) => b.number === activeBoxNum)!;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-800/20 bg-amber-950/10 p-4">
        <p className="text-sm leading-relaxed text-stone-300">
          <strong className="text-amber-400">אזור על הצוואר</strong> — התאים
          המוארים = איפה לשים אצבעות. המספר על כל תא = מספר הפריט (כמו בטאב).
          e למעלה, E עבה למטה.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">
            תו מרכזי (לה = A)
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
      </div>

      <div className="flex flex-wrap gap-2">
        {boxes.map((box) => (
          <BoxButton
            key={box.number}
            box={box}
            active={activeBoxNum === box.number}
            onClick={() => setActiveBoxNum(box.number)}
          />
        ))}
      </div>

      <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
        <h3 className="font-bold text-amber-400">{activeBox.nameHe}</h3>
        <p className="mt-1 text-sm text-stone-400">{activeBox.descriptionHe}</p>
        <p className="mt-2 text-sm text-stone-300">💡 {activeBox.tipHe}</p>
      </div>

      <Fretboard
        frets={17}
        scaleRoot={root}
        scaleIntervals={PENTATONIC_INTERVALS}
        scaleDegrees={PENTATONIC_DEGREES}
        activeBox={activeBox}
        displayMode="tab"
      />
    </div>
  );
}

function BoxButton({
  box,
  active,
  onClick,
}: {
  box: PentatonicBox;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2 text-sm transition ${
        active
          ? "border-amber-500 bg-amber-600/20 font-semibold text-amber-300"
          : "border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700"
      }`}
    >
      {box.nameHe}
      <span className="mr-2 text-xs opacity-60">
        ({box.minFret}–{box.maxFret})
      </span>
    </button>
  );
}
