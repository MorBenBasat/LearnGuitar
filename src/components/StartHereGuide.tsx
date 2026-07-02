"use client";

import { useCallback, useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { beginnerPath, starterExample } from "@/data/lessons";
import { progressions } from "@/data/progressions";
import { useAudio } from "@/hooks/useAudio";
import { getScaleNotes } from "@/lib/music";
import {
  getPentatonicBoxes,
  getScaleRunInBox,
} from "@/lib/musicTheory";

const PENT_INTERVALS = [0, 3, 5, 7, 10];
const PENT_DEGREES = ["1", "b3", "4", "5", "b7"];

export function StartHereGuide() {
  const [stepIndex, setStepIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<"tab" | "notes">("tab");
  const { playFret, playScale } = useAudio();

  const step = beginnerPath[stepIndex];
  const boxes = useMemo(
    () => getPentatonicBoxes(starterExample.root, 17),
    []
  );
  const box1 = boxes[0];
  const starterProgression = progressions.find(
    (p) => p.id === starterExample.progressionId
  )!;

  const playBoxRun = useCallback(async () => {
    const positions = getScaleRunInBox(
      starterExample.root,
      PENT_INTERVALS,
      PENT_DEGREES,
      box1
    );
    for (const pos of positions) {
      await playFret(pos.stringIndex, pos.fret);
      await new Promise((r) => setTimeout(r, 350));
    }
  }, [box1, playFret]);

  const showBox = stepIndex >= 1;
  const showProgression = stepIndex >= 2;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {beginnerPath.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStepIndex(i)}
            className={`h-2 flex-1 rounded-full transition ${
              i <= stepIndex ? "bg-amber-500" : "bg-stone-800"
            }`}
            title={s.title}
          />
        ))}
      </div>

      <section className="glass-card space-y-5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{step.emoji}</span>
          <div>
            <p className="text-xs font-medium text-amber-600">
              שלב {stepIndex + 1} מתוך {beginnerPath.length}
            </p>
            <h2 className="text-2xl font-bold text-stone-100">{step.title}</h2>
          </div>
        </div>

        <div className="space-y-3">
          {step.body.map((line, i) => (
            <p key={i} className="text-stone-300 leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {step.example && (
          <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 px-4 py-3">
            <p className="text-xs font-medium text-amber-500">דוגמה</p>
            <p className="text-sm text-stone-300">{step.example}</p>
          </div>
        )}

        <div className="rounded-xl border border-green-800/30 bg-green-950/20 px-4 py-3">
          <p className="text-xs font-medium text-green-500">עכשיו תעשה</p>
          <p className="text-sm font-medium text-stone-200">{step.action}</p>
        </div>

        {stepIndex === 0 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDisplayMode("tab")}
              className={`rounded-full px-4 py-1.5 text-xs ${
                displayMode === "tab"
                  ? "bg-amber-600 text-stone-950"
                  : "bg-stone-800 text-stone-400"
              }`}
            >
              הצג מספרי פריט (טאב)
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode("notes")}
              className={`rounded-full px-4 py-1.5 text-xs ${
                displayMode === "notes"
                  ? "bg-amber-600 text-stone-950"
                  : "bg-stone-800 text-stone-400"
              }`}
            >
              הצג שמות תווים
            </button>
          </div>
        )}

        {showBox && (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={playBoxRun}
              className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-stone-950 hover:bg-amber-500"
            >
              ▶ נגן ריצה (שמע ואז חזור)
            </button>
            <button
              type="button"
              onClick={() =>
                playScale(getScaleNotes(starterExample.root, PENT_INTERVALS))
              }
              className="rounded-full border border-amber-700 px-5 py-2 text-sm text-amber-400"
            >
              ▶ נגן 5 התווים
            </button>
          </div>
        )}

        <Fretboard
          frets={showBox ? 17 : 12}
          scaleRoot={showBox ? starterExample.root : undefined}
          scaleIntervals={showBox ? PENT_INTERVALS : undefined}
          activeBox={showBox ? box1 : null}
          displayMode={stepIndex === 0 ? displayMode : "tab"}
        />

        {showProgression && (
          <div className="space-y-4 border-t border-stone-800 pt-6">
            <h3 className="font-bold text-stone-200">
              הפרוגרשן שלך להתחלה
            </h3>
            <p className="text-sm text-stone-400">
              {starterExample.plainExplanation}
            </p>
            <div className="flex flex-wrap gap-2">
              {starterExample.chordSequenceHe.map((ch, i) => (
                <span
                  key={i}
                  className="rounded-xl border border-amber-800/40 bg-stone-900 px-4 py-2 text-center"
                >
                  <span className="block text-lg font-bold text-amber-400">
                    {starterExample.chordSequenceEn[i]}
                  </span>
                  <span className="text-xs text-stone-500">{ch}</span>
                </span>
              ))}
            </div>
            <ProgressionPlayer
              progression={starterProgression}
              controlledKey={starterExample.key}
            />
          </div>
        )}

        <div className="flex justify-between pt-2">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => i - 1)}
            className="rounded-full px-5 py-2 text-sm text-stone-400 disabled:opacity-30 hover:text-stone-200"
          >
            → שלב קודם
          </button>
          <button
            type="button"
            disabled={stepIndex === beginnerPath.length - 1}
            onClick={() => setStepIndex((i) => i + 1)}
            className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-stone-950 disabled:opacity-30 hover:bg-amber-500"
          >
            שלב הבא ←
          </button>
        </div>
      </section>
    </div>
  );
}
