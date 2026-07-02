"use client";

import { useCallback, useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { TabLickCard } from "@/components/TabDiagram";
import { progressions } from "@/data/progressions";
import {
  genreGroups,
  getChordSequencePlain,
  getPlayGuide,
} from "@/data/progressionPlayGuide";
import {
  getImprovLesson,
  goldenRuleTeaching,
  melodyCombiningGuide,
} from "@/data/improvLessons";
import { genres } from "@/data/genres";
import { getScaleRecommendation } from "@/lib/musicTheory";
import { KEY_ROOTS } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import { getPentatonicBoxes } from "@/lib/musicTheory";
import { useAudio } from "@/hooks/useAudio";

const TEACHING_SECTIONS = [
  { id: "scale", label: "1. למה הסולם?", icon: "🎼" },
  { id: "chords", label: "2. על כל אקורד", icon: "🎯" },
  { id: "tabs", label: "3. שילובי טאב", icon: "🎸" },
  { id: "combine", label: "4. מלודיה + שיר", icon: "✨" },
  { id: "practice", label: "5. תרגל", icon: "▶" },
] as const;

type SectionId = (typeof TEACHING_SECTIONS)[number]["id"];

export function ImprovWorkshop() {
  const [genreId, setGenreId] = useState(genreGroups[0].id);
  const [progressionId, setProgressionId] = useState(
    genreGroups[0].progressionIds[0]
  );
  const [key, setKey] = useState<NoteName>("C");
  const [boxNum, setBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showAlternate, setShowAlternate] = useState(false);
  const [section, setSection] = useState<SectionId>("scale");
  const [playingLick, setPlayingLick] = useState<string | null>(null);
  const [lickStep, setLickStep] = useState<number | null>(null);
  const [showGoldenRule, setShowGoldenRule] = useState(false);

  const { playFretSequence } = useAudio();

  const genre = genreGroups.find((g) => g.id === genreId)!;

  const genreProgressions = useMemo(
    () =>
      genre.progressionIds
        .map((id) => progressions.find((p) => p.id === id)!)
        .filter(Boolean),
    [genre]
  );

  const progression = progressions.find((p) => p.id === progressionId)!;
  const lesson = getImprovLesson(progressionId);
  const guide = getPlayGuide(progressionId);
  const rec = useMemo(
    () => getScaleRecommendation(progression, key),
    [progression, key]
  );

  const activeScale =
    showAlternate && rec.alternateScale
      ? rec.alternateScale.scale
      : rec.scale;
  const activeRoot =
    showAlternate && rec.alternateScale
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

  const pickGenre = (id: string) => {
    setGenreId(id);
    const g = genreGroups.find((gr) => gr.id === id)!;
    setProgressionId(g.progressionIds[0]);
    setSection("scale");
  };

  const pickProgression = (id: string) => {
    setProgressionId(id);
    const p = progressions.find((pr) => pr.id === id)!;
    setKey(p.defaultKey);
    setSection("scale");
  };

  const playLick = useCallback(
    async (lickId: string, positions: { stringIndex: number; fret: number }[]) => {
      setPlayingLick(lickId);
      setLickStep(null);
      await playFretSequence(positions, 72, setLickStep);
      setTimeout(() => {
        setPlayingLick(null);
        setLickStep(null);
      }, positions.length * (60 / 72) * 1000 + 200);
    },
    [playFretSequence]
  );

  const matchedGenreGuide = genres.find((g) =>
    g.progressions.includes(progressionId)
  );

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="rounded-xl border border-violet-800/30 bg-violet-950/15 p-5">
        <h2 className="text-lg font-bold text-violet-300">
          לימוד אלתור בטאב — לא רק 3 תווים
        </h2>
        <p className="mt-2 text-sm text-stone-300">
          כאן תלמד: איזה סולם מתאים, איפה לנחות על כל אקורד, שילובי טאב מלאים
          (8–10 תווים), ואיך לשלב מלודיה עם השיר ברקע.
        </p>
        <button
          type="button"
          onClick={() => setShowGoldenRule(!showGoldenRule)}
          className="mt-3 text-sm text-amber-500 hover:text-amber-400"
        >
          {showGoldenRule ? "▲ הסתר" : "▼ למה השיר ב-C ואני נוגן ב-A?"}
        </button>
        {showGoldenRule && (
          <div className="mt-3 space-y-2 rounded-lg bg-stone-950/60 p-4">
            <p className="font-bold text-amber-400">{goldenRuleTeaching.title}</p>
            {goldenRuleTeaching.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-stone-300">
                {p}
              </p>
            ))}
            <p className="text-sm text-green-500/80">
              {goldenRuleTeaching.practical}
            </p>
          </div>
        )}
      </div>

      {/* Genre picker */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-stone-300">בחר ז&apos;אנר</h3>
        <div className="flex flex-wrap gap-2">
          {genreGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => pickGenre(g.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                genreId === g.id
                  ? "bg-amber-600 font-semibold text-stone-950"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700"
              }`}
            >
              <span>{g.emoji}</span>
              {g.nameHe}
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-500">{genre.descriptionHe}</p>
        {matchedGenreGuide && (
          <p className="text-xs text-violet-400/80">
            {matchedGenreGuide.improvApproach}
          </p>
        )}
      </section>

      {/* Progression picker within genre */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-stone-300">בחר פרוגרשן</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {genreProgressions.map((p) => {
            const g = getPlayGuide(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => pickProgression(p.id)}
                className={`rounded-xl border p-3 text-right transition ${
                  progressionId === p.id
                    ? "border-violet-500 bg-violet-600/10"
                    : "border-stone-800 bg-stone-900/40 hover:border-stone-700"
                }`}
              >
                <p className="font-bold text-amber-400">
                  {g?.simpleNameHe ?? getChordSequencePlain(p, p.defaultKey)}
                </p>
                <p className="mt-1 text-xs text-stone-500">{p.nickname}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Teaching section nav */}
      <div className="flex flex-wrap gap-1">
        {TEACHING_SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              section === s.id
                ? "bg-violet-600 font-semibold text-stone-950"
                : "bg-stone-800 text-stone-500 hover:text-stone-300"
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Section 1: Scale */}
      {section === "scale" && (
        <div className="space-y-4">
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
            <h3
              className="text-lg font-bold"
              style={{ color: activeScale.color }}
            >
              {rec.headlineHe}
            </h3>
            <p className="mt-2 text-sm text-stone-300">
              {lesson?.whyScaleHe ?? rec.explanationHe}
            </p>
            <p className="mt-2 text-sm text-stone-400">{rec.whyItWorksHe}</p>
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
          {guide && (
            <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
              <p className="text-xs text-stone-500">איפה על הצוואר</p>
              <p className="text-lg font-bold text-amber-400">
                {guide.fretRangeHe} · קופסה {guide.boxNumber}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSection("chords")}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-stone-950"
          >
            הבנתי — איפה לנחות על כל אקורד ←
          </button>
        </div>
      )}

      {/* Section 2: Chord targets */}
      {section === "chords" && lesson && (
        <div className="space-y-4">
          <p className="text-sm text-stone-300">
            כשהאקורד מתחלף — נסה לנחות על אחד מהפריטים האלה. זה נותן תחושה
            שאתה &quot;מדבר&quot; עם השיר.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {lesson.chordTargets.map((ct) => (
              <div
                key={ct.chordSymbol}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{ct.emoji}</span>
                  <div>
                    <p className="text-lg font-bold text-amber-400">
                      {ct.chordSymbol}
                    </p>
                    <p className="text-xs text-stone-500">{ct.moodHe}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {ct.landOn.map((l, i) => (
                    <p key={i} className="text-sm text-stone-300">
                      פריט <strong className="text-amber-400">{l.fret}</strong>{" "}
                      · מיתר {l.stringIndex === 0 ? "E (למטה)" : l.stringIndex === 5 ? "e (למעלה)" : ["E", "A", "D", "G", "B", "e"][l.stringIndex]}{" "}
                      = {l.noteHe}
                    </p>
                  ))}
                </div>
                <p className="mt-2 text-xs text-green-500/80">{ct.tipHe}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSection("tabs")}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-stone-950"
          >
            עכשיו — שילובי טאב מלאים ←
          </button>
        </div>
      )}

      {/* Section 3: Tab licks */}
      {section === "tabs" && lesson && (
        <div className="space-y-4">
          <p className="text-sm text-stone-300">
            אלה לא 3 תווים — אלה משפטים שלמים. לחץ{" "}
            <strong>שמע ואז חזור</strong>, ואז נסה על הגיטרה.
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {lesson.tabLicks.map((lick) => (
              <TabLickCard
                key={lick.id}
                lick={lick}
                playing={playingLick === lick.id}
                activeStep={playingLick === lick.id ? lickStep : null}
                onPlay={() => playLick(lick.id, lick.positions)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSection("combine")}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-stone-950"
          >
            איך לשלב את זה עם השיר? ←
          </button>
        </div>
      )}

      {/* Section 4: Melody combining */}
      {section === "combine" && (
        <div className="space-y-4">
          <h3 className="font-bold text-amber-400">
            {melodyCombiningGuide.title}
          </h3>
          <div className="space-y-3">
            {melodyCombiningGuide.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-4"
              >
                <p className="font-bold text-stone-200">{step.title}</p>
                <p className="mt-1 text-sm text-stone-400">{step.body}</p>
              </div>
            ))}
          </div>
          {lesson && (
            <div className="rounded-xl border border-green-800/30 bg-green-950/20 p-4">
              <p className="text-xs font-medium text-green-500">
                ספציפי לפרוגרשן הזה
              </p>
              <ul className="mt-2 space-y-1">
                {lesson.melodyOverChordsHe.map((line, i) => (
                  <li key={i} className="text-sm text-stone-300">
                    • {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSection("practice")}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-stone-950"
          >
            מוכן — בוא נתרגל ←
          </button>
        </div>
      )}

      {/* Section 5: Practice */}
      {section === "practice" && (
        <div className="space-y-6">
          {lesson && (
            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-5">
              <h3 className="mb-3 font-bold text-amber-400">תרגיל מונחה</h3>
              <ol className="space-y-2">
                {lesson.guidedExercise.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-300">
                    <span className="font-bold text-amber-500">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="mb-1 block text-xs text-stone-500">
                טונאליות
              </label>
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
        </div>
      )}
    </div>
  );
}
