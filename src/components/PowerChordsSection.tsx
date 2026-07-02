"use client";

import { useMemo } from "react";
import { TabDiagram } from "@/components/TabDiagram";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import type { NoteName } from "@/lib/music";
import {
  getPowerChordsForChords,
  parseChordRoot,
  pickPowerShape,
} from "@/lib/powerChords";

function shapeTitle(root: NoteName, shape: ReturnType<typeof pickPowerShape>) {
  if (!shape) return `${root}5`;
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
  const items = useMemo(() => {
    const resolved = resolveProgressionInKey(progression, songKey);
    const chords = resolved.map((r) => r.chord);
    return getPowerChordsForChords(chords).map((it) => {
      const root = parseChordRoot(it.chord)!;
      const shape = pickPowerShape(root)!;
      return { ...it, root, shape };
    });
  }, [progression, songKey]);

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
