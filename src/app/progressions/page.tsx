"use client";

import { useMemo, useState } from "react";
import { progressions } from "@/data/progressions";
import {
  genreGroups,
  getChordSequencePlain,
  getPlayGuide,
} from "@/data/progressionPlayGuide";
import { ProgressionDetail } from "@/components/ProgressionDetail";
import { PageHeader } from "@/components/PageHeader";

export default function ProgressionsPage() {
  const [genreId, setGenreId] = useState(genreGroups[0].id);
  const [selectedId, setSelectedId] = useState(
    genreGroups[0].progressionIds[0]
  );

  const genre = genreGroups.find((g) => g.id === genreId)!;

  const genreProgressions = useMemo(
    () =>
      genre.progressionIds
        .map((id) => progressions.find((p) => p.id === id)!)
        .filter(Boolean),
    [genre]
  );

  const selected = progressions.find((p) => p.id === selectedId)!;

  const pickGenre = (id: string) => {
    setGenreId(id);
    const g = genreGroups.find((gr) => gr.id === id)!;
    setSelectedId(g.progressionIds[0]);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="שירים ואקורדים"
        description="בלי I-V-vi-IV ובלי בולשיט. רק אקורדים, שמע, ומה לנגן על הגיטרה."
      />

      {/* Genre picker */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-stone-200">בחר סגנון</h2>
        <div className="flex flex-wrap gap-2">
          {genreGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => pickGenre(g.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition ${
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
        <p className="text-sm text-stone-500">{genre.descriptionHe}</p>
      </section>

      {/* Progression cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {genreProgressions.map((p) => {
          const guide = getPlayGuide(p.id);
          const seq = getChordSequencePlain(p, p.defaultKey);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`rounded-xl border p-4 text-right transition ${
                selectedId === p.id
                  ? "border-amber-500 bg-amber-600/10"
                  : "border-stone-800 bg-stone-900/40 hover:border-stone-700"
              }`}
            >
              <p className="font-bold text-amber-400">
                {guide?.simpleNameHe ?? seq}
              </p>
              <p className="mt-1 text-xs text-stone-500">{p.nickname}</p>
              {guide && (
                <p className="mt-2 text-xs text-green-600/80">
                  נגן: {guide.fretRangeHe}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <ProgressionDetail progression={selected} />
    </div>
  );
}
