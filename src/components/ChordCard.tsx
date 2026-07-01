"use client";

import Image from "next/image";
import type { ChordInfo } from "@/data/chords";
import { useAudio } from "@/hooks/useAudio";

interface ChordCardProps {
  chord: ChordInfo;
  compact?: boolean;
}

export function ChordCard({ chord, compact = false }: ChordCardProps) {
  const { playChord } = useAudio();

  return (
    <div
      className={`group flex flex-col items-center rounded-2xl border border-stone-800/80 bg-stone-900/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-700/40 hover:shadow-lg hover:shadow-amber-950/20 ${
        compact ? "p-3" : ""
      }`}
    >
      <div className="relative mb-3 aspect-[3/4] w-full max-w-[140px] overflow-hidden rounded-xl bg-white shadow-inner ring-1 ring-stone-200/10">
        <Image
          src={chord.image}
          alt={`אקורד ${chord.name}`}
          fill
          className="object-contain p-2 transition group-hover:scale-105"
          sizes="140px"
        />
      </div>
      <h3 className="text-lg font-bold text-amber-400">{chord.name}</h3>
      <p className="text-sm text-stone-500">{chord.nameHe}</p>
      {!compact && chord.tips && (
        <p className="mt-2 text-center text-xs leading-relaxed text-stone-500">
          {chord.tips}
        </p>
      )}
      <button
        type="button"
        onClick={() => playChord(chord.id)}
        className="mt-3 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2 text-sm font-semibold text-stone-950 shadow-md shadow-amber-900/30 transition hover:from-amber-500 hover:to-amber-600 active:scale-95"
      >
        <span className="text-xs">▶</span> נגן
      </button>
    </div>
  );
}
