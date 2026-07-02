"use client";

import Link from "next/link";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import type { NoteName } from "@/lib/music";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { Fretboard } from "@/components/Fretboard";
import {
  getChordMood,
  getChordSequencePlain,
  getPlayGuide,
} from "@/data/progressionPlayGuide";
import { getPentatonicBoxes } from "@/lib/musicTheory";

const PENT = [0, 3, 5, 7, 10];

interface ProgressionDetailProps {
  progression: Progression;
}

export function ProgressionDetail({ progression }: ProgressionDetailProps) {
  const guide = getPlayGuide(progression.id);
  const key = progression.defaultKey;
  const sequence = getChordSequencePlain(progression, key);
  const resolved = resolveProgressionInKey(progression, key);
  const playRoot = guide?.playRoot ?? "A";
  const boxes = getPentatonicBoxes(playRoot, 17);
  const box = boxes.find((b) => b.number === (guide?.boxNumber ?? 1)) ?? boxes[0];

  return (
    <section className="glass-card space-y-6 p-6 sm:p-8">
      <div>
        <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-400">
          {progression.genreHe}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-amber-400">
          {guide?.simpleNameHe ?? sequence}
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          {progression.nickname}
        </p>
      </div>

      {/* Chords with mood — NO roman */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-stone-400">
          האקורדים (לחץ ▶ למטה לשמוע)
        </h3>
        <div className="flex flex-wrap gap-2">
          {resolved.map((item, i) => {
            const mood = getChordMood(item.chord);
            return (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-950/50 px-4 py-3"
              >
                <span className="text-xl">{mood.emoji}</span>
                <div>
                  <span className="text-lg font-bold text-amber-400">
                    {item.chord}
                  </span>
                  <span className="mr-2 text-xs text-stone-500">
                    {mood.label}
                  </span>
                </div>
                {i < resolved.length - 1 && (
                  <span className="text-stone-600">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {guide && (
        <>
          <div className="rounded-xl border border-blue-800/30 bg-blue-950/20 p-5">
            <h3 className="mb-2 font-bold text-blue-300">מה תשמע?</h3>
            <p className="text-stone-300">{guide.hearHe}</p>
          </div>

          <div className="rounded-xl border-2 border-green-700/40 bg-green-950/25 p-5">
            <h3 className="mb-3 text-lg font-bold text-green-400">
              🎸 מה לנגן על הגיטרה (מעל השיר)
            </h3>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-stone-950/50 p-3">
                <p className="text-xs text-stone-500">איפה על הצוואר</p>
                <p className="text-lg font-bold text-amber-400">
                  {guide.fretRangeHe}
                </p>
                <p className="text-xs text-stone-500">
                  אזור {guide.boxNumber} · מרכז {guide.playRoot}
                </p>
              </div>
              <div className="rounded-lg bg-stone-950/50 p-3">
                <p className="text-xs text-stone-500">השיר ב-{key}</p>
                <p className="text-sm text-stone-300">
                  הנגן בפריטים של <strong className="text-amber-400">{guide.playRoot}</strong>
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  (לא אותו אות — אבל זה מה שעובד)
                </p>
              </div>
            </div>
            <ol className="space-y-2">
              {guide.doSteps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-stone-300">
                  <span className="font-bold text-green-500">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <Fretboard
            frets={17}
            scaleRoot={playRoot}
            scaleIntervals={PENT}
            activeBox={box}
            displayMode="tab"
          />

          <p className="text-xs text-stone-600">{guide.skipHe}</p>
        </>
      )}

      <ProgressionPlayer progression={progression} plainMode />

      <div className="text-center">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-full bg-amber-600/20 px-5 py-2 text-sm text-amber-400 hover:bg-amber-600/30"
        >
          למד דרך שיר מלא ←
        </Link>
      </div>
    </section>
  );
}
