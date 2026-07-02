"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { TabLickCard } from "@/components/TabDiagram";
import type { Progression } from "@/data/progressions";
import { getChordSequencePlain } from "@/data/progressionPlayGuide";
import type { ProgressionImprovLesson } from "@/data/improvLessons";
import type { ScaleRecommendation } from "@/lib/musicTheory";
import type { NoteName } from "@/lib/music";
import { useAudio } from "@/hooks/useAudio";

interface PracticeDrillProps {
  progression: Progression;
  lesson: ProgressionImprovLesson | undefined;
  rec: ScaleRecommendation;
  songKey: NoteName;
  genreId: string;
  chordSequence: string;
}

export function PracticeDrill({
  progression,
  lesson,
  rec,
  songKey,
  genreId,
  chordSequence,
}: PracticeDrillProps) {
  const mainLick = lesson?.tabLicks[0];
  const [playingLick, setPlayingLick] = useState(false);
  const [lickStep, setLickStep] = useState<number | null>(null);
  const { playFretSequence } = useAudio();

  const isElectric = genreId === "rock" || genreId === "metal";

  const playLick = useCallback(async () => {
    if (!mainLick) return;
    setPlayingLick(true);
    setLickStep(null);
    await playFretSequence(mainLick.positions, 72, setLickStep);
    setTimeout(() => {
      setPlayingLick(false);
      setLickStep(null);
    }, mainLick.positions.length * (60 / 72) * 1000 + 200);
  }, [mainLick, playFretSequence]);

  return (
    <div className="space-y-6">
      {/* What you learned - summary */}
      <div className="rounded-2xl border-2 border-amber-700/40 bg-amber-950/20 p-5">
        <p className="text-xs font-medium text-amber-500">מה למדת בשיעור הזה</p>
        <p className="mt-1 text-xl font-bold text-amber-400">{chordSequence}</p>
        <p className="mt-2 text-sm text-stone-300">
          סולם: <strong>{rec.headlineHe}</strong>
        </p>
        {isElectric && (
          <p className="mt-1 text-sm text-stone-400">
            ליווי: Power chords (E5, A5 וכו&apos;) — לא אקורדים פתוחים
          </p>
        )}
      </div>

      {/* THE LICK TO PRACTICE */}
      {mainLick && (
        <div className="rounded-2xl border border-green-800/40 bg-green-950/15 p-5">
          <p className="mb-3 text-sm font-bold text-green-400">
            זה מה שאתה מתרגל — הליק הזה:
          </p>
          <TabLickCard
            lick={mainLick}
            playing={playingLick}
            activeStep={playingLick ? lickStep : null}
            onPlay={() => void playLick()}
          />
        </div>
      )}

      {/* Concrete 5-minute drill */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5">
        <p className="mb-4 font-bold text-stone-200">תרגיל 5 דקות — עשה בדיוק את זה:</p>
        <ol className="space-y-3">
          <li className="flex gap-3 text-sm text-stone-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-stone-950">
              1
            </span>
            <span>
              לחץ <strong>נגן שיר ברקע</strong> למטה. שמע את האקורדים:{" "}
              <strong className="text-amber-400">{chordSequence}</strong>
            </span>
          </li>
          {mainLick && (
            <li className="flex gap-3 text-sm text-stone-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-stone-950">
                2
              </span>
              <span>
                כשהשיר מתנגן — נגן את <strong>&quot;{mainLick.nameHe}&quot;</strong>{" "}
                מעליו. שמע קודם (למעלה), ואז חזור על הגיטרה.
              </span>
            </li>
          )}
          {lesson && lesson.chordTargets[0] && (
            <li className="flex gap-3 text-sm text-stone-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-stone-950">
                3
              </span>
              <span>
                כשמגיע <strong>{lesson.chordTargets[0].chordSymbol}</strong> —{" "}
                {lesson.chordTargets[0].approachHe ??
                  lesson.chordTargets[0].tipHe}
              </span>
            </li>
          )}
          <li className="flex gap-3 text-sm text-stone-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-stone-950">
              4
            </span>
            <span>
              חזור 3 סיבובים. אחרי זה — שנה תו אחד בליק. זה כבר אלתור.
            </span>
          </li>
        </ol>
      </div>

      {/* Backing track */}
      <div>
        <p className="mb-3 text-sm text-stone-500">השיר ברקע — נגן מעליו:</p>
        <ProgressionPlayer
          progression={progression}
          controlledKey={songKey}
          hideChordDiagrams={isElectric}
          compact
        />
      </div>

      <p className="text-center text-sm text-stone-500">
        רוצה פרוגרשן אחר?{" "}
        <Link href="/progressions" className="text-amber-400 hover:underline">
          ספריית פרוגרשנים ←
        </Link>
      </p>
    </div>
  );
}
