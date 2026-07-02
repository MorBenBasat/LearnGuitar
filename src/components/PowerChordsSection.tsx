"use client";

import { useMemo } from "react";
import { TabDiagram } from "@/components/TabDiagram";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import type { NoteName } from "@/lib/music";
import { noteAtFret, STANDARD_TUNING } from "@/lib/music";

function parseChordRoot(chord: string): NoteName | null {
  const m = chord.match(/^([A-G]#?)/);
  return (m?.[1] as NoteName | undefined) ?? null;
}

function findFretForNoteOnString(open: NoteName, target: NoteName, maxFret = 12) {
  for (let fret = 0; fret <= maxFret; fret++) {
    if (noteAtFret(open, fret) === target) return fret;
  }
  return null;
}

type PowerChordShape =
  | { kind: "E5"; rootFret: number }
  | { kind: "A5"; rootFret: number };

function pickShape(root: NoteName): PowerChordShape | null {
  const eOpen = STANDARD_TUNING[0];
  const aOpen = STANDARD_TUNING[1];
  const eFret = findFretForNoteOnString(eOpen, root, 12);
  const aFret = findFretForNoteOnString(aOpen, root, 12);

  if (eFret === null && aFret === null) return null;
  if (eFret !== null && eFret <= 7) return { kind: "E5", rootFret: eFret };
  if (aFret !== null) return { kind: "A5", rootFret: aFret };
  return { kind: "E5", rootFret: eFret ?? 0 };
}

function shapeToPositions(shape: PowerChordShape) {
  // We'll show the clean 2-string shape (root + fifth).
  // Optional: user can add the next string same fret+2 for a "thicker" power chord.
  if (shape.kind === "E5") {
    return [
      { stringIndex: 0, fret: shape.rootFret }, // E string (low)
      { stringIndex: 1, fret: shape.rootFret + 2 }, // A string
    ];
  }
  return [
    { stringIndex: 1, fret: shape.rootFret }, // A string
    { stringIndex: 2, fret: shape.rootFret + 2 }, // D string
  ];
}

function shapeTitle(root: NoteName, shape: PowerChordShape) {
  return shape.kind === "E5"
    ? `${root}5 (שורש על מיתר E)`
    : `${root}5 (שורש על מיתר A)`;
}

export function PowerChordsSection({
  progression,
  songKey,
}: {
  progression: Progression;
  songKey: NoteName;
}) {
  const resolved = useMemo(
    () => resolveProgressionInKey(progression, songKey),
    [progression, songKey]
  );

  const uniqueChords = useMemo(() => {
    const seen = new Set<string>();
    return resolved
      .map((r) => r.chord)
      .filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
  }, [resolved]);

  const items = uniqueChords
    .map((ch) => {
      const root = parseChordRoot(ch);
      if (!root) return null;
      const shape = pickShape(root);
      if (!shape) return null;
      return { chord: ch, root, shape, positions: shapeToPositions(shape) };
    })
    .filter(Boolean) as Array<{
    chord: string;
    root: NoteName;
    shape: PowerChordShape;
    positions: { stringIndex: number; fret: number }[];
  }>;

  if (items.length === 0) return null;

  return (
    <div className="lesson-section">
      <h3 className="lesson-heading">Power Chords (רוק / מטאל)</h3>

      <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5">
        <p className="text-sm text-stone-300">
          Power chord = <strong className="text-amber-400">רק 2 תווים</strong>{" "}
          (שורש + חמישית). זה מה שנותן את הצליל הכבד של רוק/מטאל, ועובד גם על
          אקורדים מז&apos;וריים וגם מינוריים.
        </p>
        <p className="mt-2 text-sm text-stone-400">
          כלל אצבע: אם השורש על מיתר E/A — ה״שותף״ שלך הוא שתי שורות מעל,{" "}
          <strong className="text-stone-200">2 פריטים קדימה</strong>. רוצה יותר
          כבד? הוסף גם את המיתר הבא באותו פריט+2 (3 מיתרים ביחד).
        </p>
        <p className="mt-3 text-xs text-amber-600/80">
          תרגיל: נגן Downstrokes, ואז הוסף palm-muting (להניח את כף היד ליד
          הגשר).
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {items.map((it) => (
          <div
            key={it.chord}
            className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5"
          >
            <p className="text-lg font-bold text-amber-400">
              {shapeTitle(it.root, it.shape)}
              <span className="mr-2 text-xs text-stone-500">
                (במקום {it.chord})
              </span>
            </p>
            <p className="mt-1 text-xs text-stone-500">
              נגן את זה כשהאקורד {it.chord} מתנגן — זה יתאים לליווי חשמלית.
            </p>
            <div className="mt-3">
              <TabDiagram positions={it.positions} />
            </div>
            <p className="mt-3 text-sm text-stone-300">
              דוגמה: 8 חזרות מהירות (1-&-2-&-3-&-4-&) ואז מעבר לאקורד הבא.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

