"use client";

import { useState } from "react";
import { scales } from "@/data/scales";
import { ScaleViewer } from "@/components/ScaleViewer";
import { PageHeader } from "@/components/PageHeader";

export default function ScalesPage() {
  const [selectedId, setSelectedId] = useState("pentatonic-minor");
  const selected = scales.find((s) => s.id === selectedId)!;

  return (
    <div className="space-y-8">
      <PageHeader
        title="סולמות"
        description="כל סולם על מפת הפרטים — לחץ על תו לשמיעה. התחל מפנטטוני מינור, זה הבסיס של 90% מהסולואים."
      />

      {/* Scale selector */}
      <div className="flex flex-wrap gap-2">
        {scales.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedId === s.id
                ? "font-semibold text-stone-950"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
            style={
              selectedId === s.id
                ? { backgroundColor: s.color }
                : undefined
            }
          >
            {s.nameHe}
          </button>
        ))}
      </div>

      {/* Scale detail */}
      <section className="glass-card space-y-6 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: selected.color }}>
            {selected.nameHe}
          </h2>
          <p className="mt-1 text-sm text-stone-500">{selected.name}</p>
        </div>

        <p className="text-stone-300">{selected.description}</p>

        <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
          <h3 className="mb-1 text-sm font-semibold text-stone-400">
            מתי להשתמש?
          </h3>
          <p className="text-sm text-stone-300">{selected.whenToUse}</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-stone-300">טיפים לאלתור</h3>
          <ul className="space-y-2">
            {selected.improvTips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-stone-400">
                <span style={{ color: selected.color }}>→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <ScaleViewer scale={selected} />
      </section>

      {/* Pentatonic boxes info */}
      <section className="glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-stone-200">
          5 קופסאות הפנטטוניק
        </h2>
        <p className="mb-4 text-sm text-stone-400">
          הפנטטוני מינור מחולק ל-5 &quot;קופסאות&quot; (positions) על הצוואר.
          התחל מקופסה 1 ואז התקדם.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { box: "קופסה 1", frets: "פריטים 5-8", strings: "מיתר E כבד", note: "הכי חשובה — התחל כאן!" },
            { box: "קופסה 2", frets: "פריטים 7-10", strings: "מיתר E כבד", note: "ממשיכה מקופסה 1" },
            { box: "קופסה 3", frets: "פריטים 9-12", strings: "מרכז הצוואר", note: "אזור קלאסי לסולואים" },
            { box: "קופסה 4", frets: "פריטים 12-15", strings: "גבוה", note: "סולואים גבוהים וחדים" },
            { box: "קופסה 5", frets: "פריטים 15-17", strings: "מיתר E דק", note: "הכי גבוה — Hendrix territory" },
          ].map((b) => (
            <div
              key={b.box}
              className="rounded-xl border border-stone-800 p-4"
            >
              <h3 className="font-bold text-amber-400">{b.box}</h3>
              <p className="text-sm text-stone-400">{b.frets} · {b.strings}</p>
              <p className="mt-1 text-xs text-stone-500">{b.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
