"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LearnThroughSong } from "@/components/LearnThroughSong";
import { ScaleExplorer } from "@/components/ScaleExplorer";
import { ScaleRunExercise } from "@/components/ScaleRunExercise";
import { ImprovWorkshop } from "@/components/ImprovWorkshop";
import { theoryBasics } from "@/data/theory";
import { useAudio } from "@/hooks/useAudio";
import { getMajorMinorComparison } from "@/lib/musicTheory";

const TABS = [
  { id: "scales", label: "סולמות וקופסאות", icon: "🎼" },
  { id: "song", label: "למד דרך שיר", icon: "🎵" },
  { id: "improv", label: "תרגל מעל שיר", icon: "🎸" },
  { id: "runs", label: "שמע וחזור", icon: "🏃" },
  { id: "faq", label: "שאלות", icon: "❓" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PracticePage() {
  const [tab, setTab] = useState<TabId>("scales");
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const { playChord } = useAudio();
  const comparison = getMajorMinorComparison("C");

  return (
    <div className="space-y-8">
      <PageHeader
        title="תרגול"
        description="סולמות, קופסאות לפי C/A/G, שירים, ואלתור — הכל כאן."
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              tab === t.id
                ? "bg-amber-600 font-semibold text-stone-950"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "scales" && (
        <section className="glass-card p-6">
          <ScaleExplorer />
        </section>
      )}

      {tab === "song" && <LearnThroughSong />}

      {tab === "improv" && (
        <section className="glass-card p-6">
          <ImprovWorkshop />
        </section>
      )}

      {tab === "runs" && (
        <section className="glass-card space-y-4 p-6">
          <h2 className="text-xl font-bold text-stone-200">שמע וחזור</h2>
          <ScaleRunExercise />
        </section>
      )}

      {tab === "faq" && (
        <div className="space-y-6">
          <section className="glass-card p-6">
            <h2 className="mb-3 text-xl font-bold text-stone-200">
              שמח או עצוב — שמע
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => playChord(comparison.majorChord)}
                className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-stone-950"
              >
                ▶ C — שמח ☀️
              </button>
              <button
                type="button"
                onClick={() => playChord("Am")}
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
              >
                ▶ Am — עצוב 🌙
              </button>
            </div>
          </section>
          <section className="space-y-3">
            {theoryBasics.map((topic) => (
              <div
                key={topic.id}
                className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/40"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenTopic(openTopic === topic.id ? null : topic.id)
                  }
                  className="flex w-full items-center justify-between p-5 text-right"
                >
                  <span className="text-stone-500">
                    {openTopic === topic.id ? "▲" : "▼"}
                  </span>
                  <span className="font-bold text-stone-200">
                    {topic.emoji} {topic.title}
                  </span>
                </button>
                {openTopic === topic.id && (
                  <div className="space-y-3 border-t border-stone-800 px-5 pb-5">
                    <p className="text-sm text-stone-300">{topic.simple}</p>
                    <p className="text-sm text-amber-400/80">{topic.analogy}</p>
                    <p className="text-sm text-stone-400">
                      <strong>בפועל:</strong> {topic.howToUse}
                    </p>
                    <p className="rounded-lg bg-stone-950/50 p-3 text-xs text-stone-500">
                      {topic.example}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
