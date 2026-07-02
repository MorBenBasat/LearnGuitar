"use client";

import { useCallback, useMemo, useState } from "react";
import { LessonGuide } from "@/components/LessonGuide";
import { ChordTargetCard } from "@/components/ChordTargetCard";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { TabLickCard } from "@/components/TabDiagram";
import { PracticeDrill } from "@/components/PracticeDrill";
import { PowerChordsSection } from "@/components/PowerChordsSection";
import { progressions } from "@/data/progressions";
import {
  genreGroups,
  getChordSequencePlain,
  getPlayGuide,
} from "@/data/progressionPlayGuide";
import { getImprovLesson } from "@/data/improvLessons";
import { getScaleRecommendation, getPentatonicBoxes } from "@/lib/musicTheory";
import type { NoteName } from "@/lib/music";
import { useAudio } from "@/hooks/useAudio";
import Link from "next/link";

type WizardStep = "genre" | "progression" | "lesson";

interface LearnFlowProps {
  initialGenre?: string;
  initialProgression?: string;
}

export function LearnFlow({
  initialGenre,
  initialProgression,
}: LearnFlowProps) {
  const startGenre = genreGroups.find((g) => g.id === initialGenre) ?? genreGroups[0];
  const startProg =
    initialProgression && startGenre.progressionIds.includes(initialProgression)
      ? initialProgression
      : startGenre.progressionIds[0];

  const [step, setStep] = useState<WizardStep>(
    initialProgression ? "lesson" : initialGenre ? "progression" : "genre"
  );
  const [genreId, setGenreId] = useState(startGenre.id);
  const [progressionId, setProgressionId] = useState(startProg);
  const [playingLick, setPlayingLick] = useState<string | null>(null);
  const [lickStep, setLickStep] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const { playFretSequence, playChord } = useAudio();

  const genre = genreGroups.find((g) => g.id === genreId)!;
  const progression = progressions.find((p) => p.id === progressionId)!;
  const lesson = getImprovLesson(progressionId);
  const guide = getPlayGuide(progressionId);
  const key = progression.defaultKey;

  const rec = useMemo(
    () => getScaleRecommendation(progression, key),
    [progression, key]
  );

  const boxes = useMemo(
    () =>
      rec.scale.id.includes("pentatonic") || rec.scale.id === "blues"
        ? getPentatonicBoxes(rec.root, 17)
        : [],
    [rec.root, rec.scale.id]
  );
  const activeBox =
    boxes.find((b) => b.number === (guide?.boxNumber ?? 1)) ?? boxes[0] ?? null;

  const genreProgressions = genre.progressionIds
    .map((id) => progressions.find((p) => p.id === id)!)
    .filter(Boolean);

  const pickGenre = (id: string) => {
    setGenreId(id);
    const g = genreGroups.find((gr) => gr.id === id)!;
    setProgressionId(g.progressionIds[0]);
    setStep("progression");
  };

  const pickProgression = (id: string) => {
    setProgressionId(id);
    setStep("lesson");
    setShowDetails(false);
  };

  const playLick = useCallback(
    async (
      lickId: string,
      positions: { stringIndex: number; fret: number }[]
    ) => {
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

  const stepLabels: Record<WizardStep, string> = {
    genre: "ז'אנר",
    progression: "פרוגרשן",
    lesson: "שיעור",
  };

  const chordSequence = getChordSequencePlain(progression, key);
  const isElectric = genreId === "rock" || genreId === "metal";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Progress breadcrumb — 3 steps only */}
      <nav className="flex items-center justify-center gap-2 text-sm">
        {(["genre", "progression", "lesson"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && <span className="text-stone-700">←</span>}
            <button
              type="button"
              disabled={s === "lesson" && step === "genre"}
              onClick={() => {
                if (s === "genre") setStep("genre");
                if (s === "progression" && step === "lesson") setStep("progression");
              }}
              className={`rounded-full px-4 py-1.5 transition ${
                step === s
                  ? "bg-amber-600 font-semibold text-stone-950"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {i + 1}. {stepLabels[s]}
            </button>
          </div>
        ))}
      </nav>

      {/* STEP 1: Genre */}
      {step === "genre" && (
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-100">
              איזה סגנון מעניין אותך?
            </h2>
            <p className="mt-2 text-stone-400">
              כל ז&apos;אנר = פרוגרשנים שונים. בחר אחד.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {genreGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => pickGenre(g.id)}
                className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5 text-right transition hover:border-amber-700/50 hover:bg-stone-900"
              >
                <span className="text-3xl">{g.emoji}</span>
                <h3 className="mt-2 text-lg font-bold text-stone-100">
                  {g.nameHe}
                </h3>
                <p className="mt-1 text-sm text-stone-400">{g.descriptionHe}</p>
                <p className="mt-2 text-xs text-amber-600/70">
                  {g.exampleSongsHe}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 2: Progression */}
      {step === "progression" && (
        <section className="space-y-4">
          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep("genre")}
              className="mb-2 text-sm text-stone-500 hover:text-amber-400"
            >
              → חזור לז&apos;אנרים
            </button>
            <h2 className="text-2xl font-bold text-stone-100">
              {genre.emoji} {genre.nameHe} — בחר פרוגרשן
            </h2>
            <p className="mt-2 text-stone-400">{genre.descriptionHe}</p>
          </div>
          <div className="space-y-3">
            {genreProgressions.map((p) => {
              const g = getPlayGuide(p.id);
              const seq = getChordSequencePlain(p, p.defaultKey);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => pickProgression(p.id)}
                  className="w-full rounded-2xl border border-stone-800 bg-stone-900/50 p-5 text-right transition hover:border-amber-600/50"
                >
                  <p className="text-xl font-bold text-amber-400">
                    {g?.simpleNameHe ?? seq}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">{p.nickname}</p>
                  {p.famousSongs && (
                    <p className="mt-2 text-xs text-stone-600">
                      {p.famousSongs.slice(0, 3).join(" · ")}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 3: Lesson — worksheet */}
      {step === "lesson" && (
        <section className="space-y-6">
          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep("progression")}
              className="mb-2 text-sm text-stone-500 hover:text-amber-400"
            >
              → חזור לפרוגרשנים
            </button>
            <p className="text-sm text-amber-600">
              {genre.emoji} {genre.nameHe}
            </p>
            <h2 className="text-2xl font-bold text-amber-400">{chordSequence}</h2>
            <p className="mt-1 text-stone-500">{progression.nickname}</p>
          </div>

          <LessonGuide
            genreId={genreId}
            progression={progression}
            songKey={key as NoteName}
            chordSequence={chordSequence}
            rec={rec}
            playGuide={guide}
          />

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-4">
            <p className="mb-3 text-sm font-bold text-stone-300">
              הסולם על הצוואר — {rec.headlineHe}
            </p>
            <Fretboard
              frets={17}
              scaleRoot={rec.root}
              scaleIntervals={rec.scale.intervals}
              scaleDegrees={rec.scale.degrees}
              activeBox={activeBox}
              displayMode="tab"
            />
            <Link
              href="/scales"
              className="mt-3 inline-block text-xs text-amber-500 hover:text-amber-400"
            >
              עוד על סולמות →
            </Link>
          </div>

          <PracticeDrill
            progression={progression}
            lesson={lesson}
            rec={rec}
            songKey={key as NoteName}
            genreId={genreId}
            chordSequence={chordSequence}
            hideSummary
          />

          {/* Optional details */}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full rounded-xl border border-stone-800 py-3 text-sm text-stone-500 hover:text-stone-300"
          >
            {showDetails ? "▲ הסתר פרטים נוספים" : "▼ רוצה לדעת עוד? (עוד ליקים, נחיתות על אקורדים)"}
          </button>

          {showDetails && (
            <div className="space-y-6 border-t border-stone-800 pt-6">
              {isElectric && (
                <PowerChordsSection
                  progression={progression}
                  songKey={key as NoteName}
                />
              )}
              {lesson && lesson.chordTargets.length > 0 && (
                <div className="space-y-4">
                  <p className="font-bold text-stone-300">על כל אקורד:</p>
                  {lesson.chordTargets.map((ct, i) => (
                    <ChordTargetCard
                      key={ct.chordSymbol}
                      target={ct}
                      index={i}
                      onPlayChord={() => void playChord(ct.chordSymbol)}
                    />
                  ))}
                </div>
              )}
              {lesson && lesson.tabLicks.length > 1 && (
                <div className="space-y-4">
                  <p className="font-bold text-stone-300">עוד ליקים:</p>
                  {lesson.tabLicks.slice(1).map((lick) => (
                    <TabLickCard
                      key={lick.id}
                      lick={lick}
                      playing={playingLick === lick.id}
                      activeStep={playingLick === lick.id ? lickStep : null}
                      onPlay={() => playLick(lick.id, lick.positions)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
