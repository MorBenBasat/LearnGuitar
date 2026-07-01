"use client";

import { useState } from "react";
import { progressions, romanNumeralGuide } from "@/data/progressions";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { PageHeader } from "@/components/PageHeader";

export default function ProgressionsPage() {
  const [selectedId, setSelectedId] = useState(progressions[0].id);
  const selected = progressions.find((p) => p.id === selectedId)!;

  return (
    <div className="space-y-8">
      <PageHeader
        title="פרוגרשנים"
        description="הבנת פרוגרשנים = הבנת מוזיקה. כאן תלמד מה כל ספרה רומית אומרת, למה זה עובד, ואיזה סולם לנגן מעל."
      />

      {/* Roman numerals guide */}
      <section className="glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-stone-100">
          מדריך ספרות רומיות
        </h2>
        <p className="mb-4 text-sm text-stone-400">
          כל ספרה = אקורד בטונאליות. אותיות גדולות = מז&apos;ור, קטנות = מינור.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {romanNumeralGuide.map((item) => (
            <div
              key={item.roman}
              className="rounded-xl border border-stone-800 bg-stone-950/50 p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">
                  {item.roman}
                </span>
                <span className="text-sm text-stone-500">{item.nameHe}</span>
              </div>
              <p className="mt-1 text-sm text-stone-300">{item.role}</p>
              <p className="mt-1 text-xs text-amber-700">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progression selector */}
      <div className="flex flex-wrap gap-2">
        {progressions.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedId === p.id
                ? "bg-amber-600 text-stone-950 font-semibold"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            {p.nickname || p.nameHe}
          </button>
        ))}
      </div>

      {/* Selected progression detail */}
      <section className="glass-card space-y-6 p-6 sm:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-amber-400">
              {selected.nameHe}
            </h2>
            <span className="rounded-full bg-stone-800 px-3 py-0.5 text-xs text-stone-400">
              {selected.genreHe}
            </span>
          </div>
          {selected.nickname && (
            <p className="text-sm text-amber-600">{selected.nickname}</p>
          )}
        </div>

        <p className="text-stone-300">{selected.explanation}</p>

        <div className="rounded-xl border border-amber-800/20 bg-amber-950/10 p-4">
          <h3 className="mb-2 font-semibold text-amber-400">למה זה עובד?</h3>
          <p className="text-sm text-stone-300">{selected.whyItWorks}</p>
        </div>

        <div className="rounded-xl border border-green-800/20 bg-green-950/10 p-4">
          <h3 className="mb-2 font-semibold text-green-400">
            🎸 איזה סולם לסולו?
          </h3>
          <p className="text-sm text-stone-300">{selected.soloScaleHe}</p>
        </div>

        {selected.famousSongs && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-stone-500">
              שירים מפורסמים
            </h3>
            <div className="flex flex-wrap gap-2">
              {selected.famousSongs.map((song) => (
                <span
                  key={song}
                  className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-400"
                >
                  {song}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-3 font-semibold text-stone-300">טיפים לאלתור</h3>
          <ul className="space-y-2">
            {selected.improvTips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-stone-400">
                <span className="text-amber-600">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <ProgressionPlayer progression={selected} />
      </section>
    </div>
  );
}
