"use client";

import { useCallback, useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { TabLickCard } from "@/components/TabDiagram";
import {
  boxLessons,
  commonTabLicks,
  improvRecipe,
  referenceSong,
} from "@/data/songLab";
import { progressions } from "@/data/progressions";
import { useAudio } from "@/hooks/useAudio";
import { getPentatonicBoxes } from "@/lib/musicTheory";

const PENT = [0, 3, 5, 7, 10];
const STEPS = [
  { id: "chords", title: "שמע את 4 האקורדים", emoji: "🎵" },
  { id: "mood", title: "שמח vs עצוב", emoji: "☀️" },
  { id: "song", title: "השיר המלא", emoji: "🔁" },
  { id: "tabs", title: "שילובי טאב נפוצים", emoji: "🎸" },
  { id: "boxes", title: "מה זה קופסאות?", emoji: "📦" },
  { id: "connect", title: "חבר לשיר", emoji: "✨" },
] as const;

export function LearnThroughSong() {
  const [step, setStep] = useState(0);
  const [activeChord, setActiveChord] = useState(0);
  const [boxNum, setBoxNum] = useState<1 | 2 | 3>(1);
  const [playingLick, setPlayingLick] = useState<string | null>(null);
  const [lickStep, setLickStep] = useState<number | null>(null);
  const [compareBox, setCompareBox] = useState<1 | 3>(1);

  const { playChord, playFretSequence } = useAudio();
  const progression = progressions.find(
    (p) => p.id === referenceSong.progressionId
  )!;
  const boxes = useMemo(
    () => getPentatonicBoxes(referenceSong.soloArea, 17),
    []
  );
  const activeBox = boxes.find((b) => b.number === boxNum) ?? boxes[0];

  const playLick = useCallback(
    async (lickId: string) => {
      const lick = commonTabLicks.find((l) => l.id === lickId)!;
      setPlayingLick(lickId);
      setLickStep(null);
      await playFretSequence(lick.positions, 72, setLickStep);
      setTimeout(() => {
        setPlayingLick(null);
        setLickStep(null);
      }, lick.positions.length * (60 / 72) * 1000 + 200);
    },
    [playFretSequence]
  );

  const current = STEPS[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-amber-700/40 bg-gradient-to-br from-amber-950/40 to-stone-900 p-6">
        <p className="text-xs font-medium text-amber-500">לומדים דרך שיר אחד</p>
        <h2 className="mt-1 text-2xl font-bold text-stone-100">
          {referenceSong.title}
        </h2>
        <p className="mt-2 text-stone-400">
          C → G → Am → F · לא צריך לדעת תיאוריה. שמע, ראה טאב, נגן.
        </p>
        <p className="mt-3 rounded-lg bg-stone-950/60 px-3 py-2 text-sm text-amber-400/90">
          {improvRecipe.goldenRule}
        </p>
      </div>

      {/* Step nav */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition ${
              step === i
                ? "bg-amber-600 font-semibold text-stone-950"
                : i < step
                  ? "bg-amber-900/40 text-amber-400"
                  : "bg-stone-800 text-stone-500"
            }`}
          >
            {s.emoji} {s.title}
          </button>
        ))}
      </div>

      <section className="glass-card space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{current.emoji}</span>
          <div>
            <p className="text-xs text-amber-600">
              שלב {step + 1}/{STEPS.length}
            </p>
            <h3 className="text-xl font-bold text-stone-100">{current.title}</h3>
          </div>
        </div>

        {/* STEP 0: Chords */}
        {step === 0 && (
          <div className="space-y-4">
            <p className="text-stone-300">
              לחץ על כל אקורד. שמע איך הוא נשמע. אל תדאג מה השם אומר — רק
              האוזן.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {referenceSong.chords.map((ch, i) => (
                <button
                  key={ch.symbol}
                  type="button"
                  onClick={() => {
                    setActiveChord(i);
                    void playChord(ch.symbol);
                  }}
                  className={`rounded-xl border p-4 text-right transition ${
                    activeChord === i
                      ? "border-amber-500 bg-amber-600/15"
                      : "border-stone-800 bg-stone-950/50 hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{ch.emoji}</span>
                    <span className="text-2xl font-bold text-amber-400">
                      {ch.symbol}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-stone-400">{ch.nameHe}</p>
                  <p className="mt-1 text-xs text-stone-500">{ch.plainHe}</p>
                </button>
              ))}
            </div>
            <p className="text-sm text-stone-500">
              זה הסדר בשיר:{" "}
              <strong className="text-stone-300">
                {referenceSong.chords.map((c) => c.symbol).join(" → ")}
              </strong>
            </p>
          </div>
        )}

        {/* STEP 1: Happy vs sad */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-stone-300">
              <strong className="text-amber-400">C</strong> ו-
              <strong className="text-amber-400">G</strong> ו-
              <strong className="text-amber-400">F</strong> = שמחים ☀️
              <br />
              <strong className="text-violet-400">Am</strong> = עצוב 🌙 — בגלל
              האות <strong>m</strong>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => playChord("C")}
                className="rounded-xl border border-amber-700/40 bg-amber-950/30 p-5 text-center hover:bg-amber-950/50"
              >
                <span className="text-3xl">☀️</span>
                <p className="mt-2 text-lg font-bold text-amber-400">C</p>
                <p className="text-sm text-stone-400">שמח — בלי m</p>
              </button>
              <button
                type="button"
                onClick={() => playChord("Am")}
                className="rounded-xl border border-violet-700/40 bg-violet-950/30 p-5 text-center hover:bg-violet-950/50"
              >
                <span className="text-3xl">🌙</span>
                <p className="mt-2 text-lg font-bold text-violet-400">Am</p>
                <p className="text-sm text-stone-400">עצוב — יש m</p>
              </button>
            </div>
            <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4 text-sm text-stone-400">
              <strong className="text-stone-300">מה זה Am?</strong> A = לה.
              m = מינור = עצוב. בשיר שלנו Am מגיע שלישי — שם השיר נשמע הכי
              רגשי.
            </div>
          </div>
        )}

        {/* STEP 2: Full song */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-stone-300">
              הפעל את השיר. ספור: 1-2-3-4 והאקורד מתחלף. תרגיל: זהה מתי מגיע{" "}
              <strong className="text-violet-400">Am</strong> (העצוב).
            </p>
            <div className="flex flex-wrap gap-2">
              {referenceSong.chords.map((ch, i) => (
                <span
                  key={ch.symbol}
                  className={`rounded-lg px-3 py-2 text-sm font-bold ${
                    ch.mood === "עצוב"
                      ? "bg-violet-900/40 text-violet-300"
                      : "bg-amber-900/30 text-amber-300"
                  }`}
                >
                  {i + 1}. {ch.symbol} {ch.emoji}
                </span>
              ))}
            </div>
            <ProgressionPlayer progression={progression} controlledKey="C" />
          </div>
        )}

        {/* STEP 3: Tab licks */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-stone-300">
              אלה השילובים הכי נפוצים מעל השיר. לחץ{" "}
              <strong>שמע ואז חזור</strong> — ואז נסה על הגיטרה שלך.
            </p>
            <p className="text-xs text-amber-600">
              אזור נגינה: פריטים 5–8 · מיתר E (למטה) = השורה התחתונה בטאב
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {commonTabLicks.map((lick) => (
                <TabLickCard
                  key={lick.id}
                  lick={lick}
                  playing={playingLick === lick.id}
                  activeStep={playingLick === lick.id ? lickStep : null}
                  onPlay={() => playLick(lick.id)}
                />
              ))}
            </div>
            <Fretboard
              frets={12}
              scaleRoot={referenceSong.soloArea}
              scaleIntervals={PENT}
              activeBox={boxes[0]}
              displayMode="tab"
            />
          </div>
        )}

        {/* STEP 4: Boxes */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-stone-300">
              <strong className="text-amber-400">קופסה = אזור על הצוואר.</strong>{" "}
              אותם 5 תווים, 5 מקומות. ההבדל: גבוה יותר = נשמע חד יותר.
            </p>
            <div className="flex flex-wrap gap-2">
              {([1, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCompareBox(n)}
                  className={`rounded-xl border px-4 py-3 text-right text-sm ${
                    compareBox === n
                      ? "border-amber-500 bg-amber-600/15"
                      : "border-stone-800"
                  }`}
                >
                  <span className="font-bold text-amber-400">קופסה {n}</span>
                  <span className="block text-xs text-stone-500">
                    פריטים {boxLessons.find((b) => b.number === n)?.fretRange}
                  </span>
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-stone-800 p-4">
              {boxLessons.find((b) => b.number === compareBox) && (
                <>
                  <p className="text-sm text-stone-300">
                    {boxLessons.find((b) => b.number === compareBox)!.plainHe}
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    מתאים ל:{" "}
                    {
                      boxLessons.find((b) => b.number === compareBox)!
                        .forSongsHe
                    }
                  </p>
                  <p className="mt-1 text-xs text-amber-600">
                    צליל:{" "}
                    {boxLessons.find((b) => b.number === compareBox)!.feelHe}
                  </p>
                </>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs text-stone-500">קופסה 1 — התחל פה</p>
                <Fretboard
                  frets={12}
                  scaleRoot={referenceSong.soloArea}
                  scaleIntervals={PENT}
                  activeBox={boxes[0]}
                  displayMode="tab"
                />
              </div>
              <div>
                <p className="mb-2 text-xs text-stone-500">
                  קופסה 3 — גבוה יותר, חד יותר
                </p>
                <Fretboard
                  frets={17}
                  scaleRoot={referenceSong.soloArea}
                  scaleIntervals={PENT}
                  activeBox={boxes[2]}
                  displayMode="tab"
                />
              </div>
            </div>
            <p className="text-sm text-green-500/80">
              על C-G-Am-F: כל 5 הקופסאות עובדות. התחל מקופסה 1, עבור ל-3 כשמרגיש
              בנוח.
            </p>
          </div>
        )}

        {/* STEP 5: Connect & improv */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-stone-300">{improvRecipe.title}</p>
            <ol className="space-y-2">
              {improvRecipe.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-stone-950">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setBoxNum(n)}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    boxNum === n
                      ? "bg-amber-600 text-stone-950 font-semibold"
                      : "bg-stone-800 text-stone-400"
                  }`}
                >
                  קופסה {n}
                </button>
              ))}
            </div>
            <Fretboard
              frets={17}
              scaleRoot={referenceSong.soloArea}
              scaleIntervals={PENT}
              activeBox={activeBox}
              displayMode="tab"
            />
            <ProgressionPlayer progression={progression} controlledKey="C" />
          </div>
        )}

        <div className="flex justify-between border-t border-stone-800 pt-4">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="text-sm text-stone-500 disabled:opacity-30 hover:text-stone-300"
          >
            → שלב קודם
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-stone-950"
            >
              הבנתי — שלב הבא ←
            </button>
          ) : (
            <p className="text-sm text-green-400">סיימת! תרגל 5 דקות ביום 🎸</p>
          )}
        </div>
      </section>
    </div>
  );
}
