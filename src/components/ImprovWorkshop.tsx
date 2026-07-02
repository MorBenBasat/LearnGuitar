"use client";

import { useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { progressions } from "@/data/progressions";
import { getPlayGuide } from "@/data/progressionPlayGuide";
import { getScaleRecommendation } from "@/lib/musicTheory";
import { KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { getPentatonicBoxes } from "@/lib/musicTheory";

export function ImprovWorkshop() {
  const [progressionId, setProgressionId] = useState(progressions[0].id);
  const [key, setKey] = useState<NoteName>("C");
  const [boxNum, setBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showAlternate, setShowAlternate] = useState(false);

  const progression = progressions.find((p) => p.id === progressionId)!;
  const rec = useMemo(
    () => getScaleRecommendation(progression, key),
    [progression, key]
  );

  const activeScale = showAlternate && rec.alternateScale
    ? rec.alternateScale.scale
    : rec.scale;
  const activeRoot = showAlternate && rec.alternateScale
    ? rec.alternateScale.root
    : rec.root;

  const boxes = useMemo(
    () =>
      activeScale.id.includes("pentatonic") || activeScale.id === "blues"
        ? getPentatonicBoxes(activeRoot, 17)
        : [],
    [activeRoot, activeScale.id]
  );
  const activeBox = boxes.find((b) => b.number === boxNum) ?? null;

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-violet-800/20 bg-violet-950/10 p-4">
        <p className="text-sm text-stone-300">
          <strong className="text-violet-400">נגן מעל שיר:</strong> בחר פרוגרשן
          → הפעל אותו → לחץ על התאים המוארים (המספרים = פריטים כמו בטאב).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {progressions.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProgressionId(p.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              progressionId === p.id
                ? "bg-violet-600 font-semibold text-stone-950"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            {getPlayGuide(p.id)?.simpleNameHe ?? p.nickname ?? p.nameHe}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-xs text-stone-500">טונאליות</label>
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
        {boxes.length > 0 && (
          <div>
            <label className="mb-1 block text-xs text-stone-500">
              איזה אזור על הצוואר
            </label>
            <select
              value={boxNum}
              onChange={(e) =>
                setBoxNum(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
              }
              className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
            >
              {boxes.map((b) => (
                <option key={b.number} value={b.number}>
                  {b.nameHe}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{
          borderColor: `${activeScale.color}44`,
          backgroundColor: `${activeScale.color}11`,
        }}
      >
        <p className="mb-2 text-xs font-medium text-stone-500">
          השיר ב-{key} · הנגן בפריטים של {activeRoot}
        </p>
        <h3 className="text-lg font-bold" style={{ color: activeScale.color }}>
          {rec.headlineHe}
        </h3>
        <p className="mt-2 text-sm text-stone-300">{rec.explanationHe}</p>
        <p className="mt-2 text-sm text-stone-400">
          {rec.whyItWorksHe}
        </p>
        {rec.alternateScale && (
          <button
            type="button"
            onClick={() => setShowAlternate(!showAlternate)}
            className="mt-3 text-sm text-amber-500 hover:text-amber-400"
          >
            {showAlternate
              ? "← חזור לסולם המומלץ"
              : `או נסה: ${rec.alternateScale.labelHe} →`}
          </button>
        )}
      </div>

      <div className="glass-card p-6">
        <h3 className="mb-2 font-bold text-stone-200">
          איפה לנגן על הצוואר
        </h3>
        <p className="mb-4 text-xs text-stone-500">
          תאים מוארים = נכון לנגן. זהב = התו המרכזי. מספר = פריט.
        </p>
        <Fretboard
          frets={17}
          scaleRoot={activeRoot}
          scaleIntervals={activeScale.intervals}
          scaleDegrees={activeScale.degrees}
          activeBox={activeBox}
          displayMode="tab"
        />
      </div>

      <div className="glass-card p-6">
        <h3 className="mb-4 font-bold text-stone-200">השיר ברקע</h3>
        <ProgressionPlayer
          progression={progression}
          controlledKey={key}
          onKeyChange={setKey}
        />
      </div>

      <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5">
        <h3 className="mb-3 font-bold text-amber-400">תרגיל (5 דקות)</h3>
        <ol className="space-y-2 text-sm text-stone-300">
          <li>1. הפעל את השיר ברקע</li>
          <li>2. לחץ על 3 תאים מוארים → שקט → עוד 3</li>
          <li>3. כשהאקורד מתחלף — נסה תא עם זהב (התו המרכזי)</li>
        </ol>
      </div>
    </div>
  );
}
