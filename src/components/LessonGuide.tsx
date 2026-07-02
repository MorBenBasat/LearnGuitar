"use client";

import { useMemo } from "react";
import Image from "next/image";
import { TabDiagram } from "@/components/TabDiagram";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import type { PlayGuide } from "@/data/progressionPlayGuide";
import { getChordById } from "@/data/chords";
import type { ScaleRecommendation } from "@/lib/musicTheory";
import { getPowerChordsForChords } from "@/lib/powerChords";
import type { NoteName } from "@/lib/music";
import { getScaleNotes, NOTE_NAMES_HE } from "@/lib/music";
import { useAudio } from "@/hooks/useAudio";

type AccompanimentMode = "power" | "open" | "blues" | "jazz";

function getAccompanimentMode(genreId: string): AccompanimentMode {
  if (genreId === "rock" || genreId === "metal") return "power";
  if (genreId === "blues") return "blues";
  if (genreId === "jazz") return "jazz";
  return "open";
}

const ACCOMP_LABELS: Record<
  AccompanimentMode,
  { step: string; explain: (same: boolean) => string }
> = {
  power: {
    step: "ליווי (power chords)",
    explain: () =>
      "Power chord = אותו אקורד, רק 2 מיתרים (שורש + חמישית). Em בשיר = E5 אצלך.",
  },
  open: {
    step: "ליווי (אקורדים)",
    explain: (same) =>
      same
        ? "אותם אקורדים בדיוק כמו השיר — strumming או fingerpicking."
        : "נגן את האקורדים האלה בזמן שהשיר מתנגן.",
  },
  blues: {
    step: "ליווי (אקורדי 7)",
    explain: () =>
      "בבלוז מנגנים אקורדי דומיננט 7 (A7, D7…) — הצליל הבלוזי עם ה-7.",
  },
  jazz: {
    step: "ליווי (אקורדי ג'אז)",
    explain: () =>
      "בג'אז: m7, dom7, maj7. אותם שמות כמו השיר — צורות מתוחכמות יותר.",
  },
};

interface LessonGuideProps {
  genreId: string;
  progression: Progression;
  songKey: NoteName;
  chordSequence: string;
  rec: ScaleRecommendation;
  playGuide?: PlayGuide;
}

function CompactChordThumb({
  chordId,
  name,
}: {
  chordId: string;
  name: string;
}) {
  const chord = getChordById(chordId);
  const { playChord } = useAudio();
  if (!chord) {
    return (
      <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-3 text-center">
        <p className="font-bold text-amber-400">{name}</p>
        <p className="mt-1 text-xs text-stone-500">אקורד ברה</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-3 text-center">
      <div className="relative mx-auto mb-2 aspect-[3/4] w-full max-w-[90px] overflow-hidden rounded-lg bg-white">
        <Image
          src={chord.image}
          alt={chord.name}
          fill
          className="object-contain p-1"
          sizes="90px"
        />
      </div>
      <p className="font-bold text-amber-400">{chord.name}</p>
      <button
        type="button"
        onClick={() => playChord(chord.id)}
        className="mt-2 rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300 hover:bg-stone-700"
      >
        ▶ שמע
      </button>
    </div>
  );
}

export function LessonGuide({
  genreId,
  progression,
  songKey,
  chordSequence,
  rec,
  playGuide,
}: LessonGuideProps) {
  const mode = getAccompanimentMode(genreId);
  const acc = ACCOMP_LABELS[mode];
  const scaleNotes = getScaleNotes(rec.root, rec.scale.intervals);
  const noteCount = scaleNotes.length;

  const uniqueChords = useMemo(() => {
    const resolved = resolveProgressionInKey(progression, songKey);
    const seen = new Set<string>();
    return resolved
      .map((r) => r.chord)
      .filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
  }, [progression, songKey]);

  const powerItems = useMemo(
    () => (mode === "power" ? getPowerChordsForChords(uniqueChords) : []),
    [mode, uniqueChords]
  );

  const accompSequence =
    mode === "power"
      ? powerItems.map((p) => p.label).join(" → ")
      : uniqueChords.join(" → ");

  const sameAsBacking = mode !== "power";

  return (
    <div className="space-y-4 rounded-2xl border border-stone-700 bg-stone-900/60 p-5">
      <h3 className="text-lg font-bold text-stone-100">
        מה אתה רואה בדף הזה? (במילים פשוטות)
      </h3>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-4">
          <p className="text-xs font-bold text-blue-400">1. השיר ברקע</p>
          <p className="mt-2 text-lg font-bold text-stone-200">{chordSequence}</p>
          <p className="mt-2 text-xs text-stone-400">
            זה מה שאתה <strong>שומע</strong> כשלוחצים &quot;נגן שיר ברקע&quot;.
            {playGuide?.hearHe && <> {playGuide.hearHe}</>}
          </p>
        </div>

        <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-4">
          <p className="text-xs font-bold text-amber-400">
            2. מה אתה מנגן — {acc.step}
          </p>
          <p className="mt-2 text-lg font-bold text-stone-200">{accompSequence}</p>
          <p className="mt-2 text-xs text-stone-400">{acc.explain(sameAsBacking)}</p>
        </div>

        <div className="rounded-xl border border-red-800/40 bg-red-950/20 p-4">
          <p className="text-xs font-bold text-red-400">3. מה אתה מנגן — סולו</p>
          <p className="mt-2 text-sm font-bold text-stone-200">{rec.headlineHe}</p>
          <p className="mt-2 font-mono text-sm font-bold text-amber-300">
            {scaleNotes.join("  ")}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {scaleNotes.map((n) => NOTE_NAMES_HE[n]).join(" · ")}
          </p>
          <p className="mt-2 text-xs text-stone-400">
            {noteCount} תווים לאלתור מעל השיר
            {playGuide?.fretRangeHe ? ` · ${playGuide.fretRangeHe}` : ""}.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
        {mode === "power" ? (
          <>
            <p className="mb-3 text-sm font-bold text-stone-300">
              מיפוי אקורד → power chord (טאב):
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {powerItems.map((item) => (
                <div key={item.chord} className="text-center">
                  <p className="mb-1 text-sm text-stone-500">
                    {item.chord} בשיר →{" "}
                    <strong className="text-amber-400">{item.label}</strong> אצלך
                  </p>
                  <TabDiagram positions={item.positions} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-sm font-bold text-stone-300">
              {mode === "jazz"
                ? "צורות אקורד לליווי:"
                : mode === "blues"
                  ? "אקורדי 7 לליווי:"
                  : "אקורדים לליווי — אותם שמות כמו השיר:"}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {uniqueChords.map((ch) => (
                <CompactChordThumb key={ch} chordId={ch} name={ch} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
