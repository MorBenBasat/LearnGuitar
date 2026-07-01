"use client";

import { useState } from "react";
import { chords } from "@/data/chords";
import { ChordCard } from "@/components/ChordCard";
import { PageHeader } from "@/components/PageHeader";

const categories = [
  { id: "all", label: "הכל" },
  { id: "major", label: "מז'ור" },
  { id: "minor", label: "מינור" },
  { id: "dom7", label: "דומיננט 7" },
  { id: "maj7", label: "מז'ור 7" },
  { id: "m7", label: "מינור 7" },
  { id: "dim", label: "מוקטן" },
] as const;

export default function ChordsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? chords : chords.filter((c) => c.category === filter);

  return (
    <div className="space-y-8">
      <PageHeader
        title="אקורדים"
        description={`${chords.length} אקורדים עם דיאגרמות וניגון. לחץ "נגן" לשמיעה.`}
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter(cat.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === cat.id
                ? "bg-amber-600 text-stone-950 font-semibold"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((chord) => (
          <ChordCard key={chord.id} chord={chord} />
        ))}
      </div>
    </div>
  );
}
