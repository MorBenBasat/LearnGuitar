"use client";

import Link from "next/link";
import { genreGroups, getChordSequencePlain, getPlayGuide } from "@/data/progressionPlayGuide";
import { progressions } from "@/data/progressions";

export function ProgressionLibrary() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="text-center">
        <h1 className="page-title">ספריית פרוגרשנים</h1>
        <p className="mt-2 text-stone-400">
          כל הפרוגרשנים — לא רק C-G-Am-F. בחר אחד ולמד אותו.
        </p>
      </header>

      {genreGroups.map((genre) => {
        const progs = genre.progressionIds
          .map((id) => progressions.find((p) => p.id === id)!)
          .filter(Boolean);

        return (
          <section key={genre.id} className="space-y-3">
            <h2 className="text-lg font-bold text-stone-200">
              {genre.emoji} {genre.nameHe}
            </h2>
            <p className="text-sm text-stone-500">{genre.descriptionHe}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {progs.map((p) => {
                const guide = getPlayGuide(p.id);
                const seq = getChordSequencePlain(p, p.defaultKey);
                return (
                  <Link
                    key={p.id}
                    href={`/learn?genre=${genre.id}&progression=${p.id}`}
                    className="block rounded-2xl border border-stone-800 bg-stone-900/50 p-5 transition hover:border-amber-600/50"
                  >
                    <p className="text-xl font-bold text-amber-400">
                      {guide?.simpleNameHe ?? seq}
                    </p>
                    <p className="mt-1 text-sm text-stone-500">{p.nickname}</p>
                    <p className="mt-2 text-xs text-stone-600">
                      סולם: {p.soloScaleHe}
                    </p>
                    {p.famousSongs && (
                      <p className="mt-1 text-xs text-amber-700/60">
                        {p.famousSongs.slice(0, 2).join(" · ")}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 text-center">
        <p className="text-stone-400">
          רואה שני פרוגרשנים עם אותם אקורדים? זה בגלל טונאליות שונה — אבל יש
          כאן גם פרוגרשנים שונים לגמרי:{" "}
          <strong className="text-amber-400">E→A→B</strong>,{" "}
          <strong className="text-amber-400">D→Bm→G→A</strong>,{" "}
          <strong className="text-amber-400">A7→D7→E7</strong>,{" "}
          <strong className="text-amber-400">Am→G→F→E</strong>
        </p>
      </div>
    </div>
  );
}
