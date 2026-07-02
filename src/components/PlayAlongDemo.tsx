"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { TabDiagram } from "@/components/TabDiagram";
import type { Progression } from "@/data/progressions";
import type { ProgressionImprovLesson } from "@/data/improvLessons";
import type { TabLick } from "@/data/songLab";
import type { ScaleRecommendation } from "@/lib/musicTheory";
import {
  buildPlayAlongSchedule,
  buildScaleLandingSchedule,
  fretPositionToNote,
} from "@/lib/playAlong";
import { resolveChordNotes, noteNameToMidi } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import {
  getGuitarEngine,
  midiToNote,
  playGuitarChord,
  playGuitarNote,
  releaseAllGuitar,
} from "@/lib/guitarEngine";

const SEGMENT_COLORS = [
  "border-blue-500/50 bg-blue-950/30",
  "border-amber-500/50 bg-amber-950/30",
  "border-purple-500/50 bg-purple-950/30",
  "border-emerald-500/50 bg-emerald-950/30",
  "border-rose-500/50 bg-rose-950/30",
  "border-cyan-500/50 bg-cyan-950/30",
];

interface PlayAlongDemoProps {
  progression: Progression;
  songKey: NoteName;
  lick: TabLick;
  lesson?: ProgressionImprovLesson;
  rec: ScaleRecommendation;
}

export function PlayAlongDemo({
  progression,
  songKey,
  lick,
  lesson,
  rec,
}: PlayAlongDemoProps) {
  const [bpm, setBpm] = useState(progression.bpm);
  const [mode, setMode] = useState<"idle" | "chords" | "lick" | "scale">("idle");
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [activeLickIndex, setActiveLickIndex] = useState<number | null>(null);
  const partRef = useRef<Tone.Part | null>(null);
  const startedRef = useRef(false);

  const lickSchedule = useMemo(
    () => buildPlayAlongSchedule(progression, songKey, lick.positions, bpm),
    [progression, songKey, lick.positions, bpm]
  );

  const scaleLandings = useMemo(() => {
    const segments = lickSchedule.segments;
    if (lesson && lesson.chordTargets.length > 0) {
      const byChord = new Map(
        lesson.chordTargets.map((ct) => [ct.chordSymbol, ct.landOn[0]!])
      );
      return segments.map(
        (seg) => byChord.get(seg.chord) ?? lesson.chordTargets[0]!.landOn[0]!
      );
    }
    return segments.map((_, i) => ({
      stringIndex: lick.positions[i % lick.positions.length]?.stringIndex ?? 0,
      fret: lick.positions[i % lick.positions.length]?.fret ?? 5,
    }));
  }, [lesson, lick.positions, lickSchedule.segments]);

  const scaleSchedule = useMemo(
    () =>
      buildScaleLandingSchedule(
        progression,
        songKey,
        scaleLandings.map((l) => ({
          stringIndex: l.stringIndex,
          fret: l.fret,
        })),
        bpm
      ),
    [progression, songKey, scaleLandings, bpm]
  );

  const stop = useCallback(() => {
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
      partRef.current = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
    releaseAllGuitar();
    setMode("idle");
    setActiveSegment(null);
    setActiveLickIndex(null);
  }, []);

  const playTogether = useCallback(
    async (kind: "chords" | "lick" | "scale") => {
      if (mode === kind) {
        stop();
        return;
      }
      stop();

      if (!startedRef.current) {
        await getGuitarEngine();
        startedRef.current = true;
      }

      Tone.Transport.bpm.value = bpm;
      const schedule = kind === "lick" ? lickSchedule : null;
      const scaleEv = kind === "scale" ? scaleSchedule : null;
      const loopEnd = lickSchedule.loopDurationSec;

      type PartPayload =
        | { kind: "chord"; segmentIndex: number; chord: string }
        | { kind: "lick"; segmentIndex: number; lickIndex: number }
        | { kind: "scale"; segmentIndex: number; stringIndex: number; fret: number };

      const events: [number, PartPayload][] = [];
      const segments = lickSchedule.segments;

      segments.forEach((seg) => {
        events.push([
          seg.startSec,
          { kind: "chord", segmentIndex: seg.chordIndex, chord: seg.chord },
        ]);
      });

      if (kind === "lick" && schedule) {
        schedule.lickEvents.forEach((ev) => {
          events.push([
            ev.timeSec,
            {
              kind: "lick",
              segmentIndex: ev.segmentIndex,
              lickIndex: ev.lickIndex,
            },
          ]);
        });
      }

      if (kind === "scale" && scaleEv) {
        scaleEv.events.forEach((ev) => {
          events.push([
            ev.timeSec,
            {
              kind: "scale",
              segmentIndex: ev.segmentIndex,
              stringIndex: ev.stringIndex,
              fret: ev.fret,
            },
          ]);
        });
      }

      const part = new Tone.Part((t, payload) => {
        if (payload.kind === "chord") {
          setActiveSegment(payload.segmentIndex);
          const notes = resolveChordNotes(payload.chord);
          const noteNames = notes.map((n) =>
            midiToNote(noteNameToMidi(n, 3))
          );
          const seg = segments[payload.segmentIndex]!;
          void playGuitarChord(
            noteNames,
            seg.durationSec * 0.88,
            t,
            40
          );
        } else if (payload.kind === "lick") {
          setActiveSegment(payload.segmentIndex);
          setActiveLickIndex(payload.lickIndex);
          const pos = lick.positions[payload.lickIndex];
          if (pos) {
            void playGuitarNote(
              fretPositionToNote(pos.stringIndex, pos.fret),
              "4n",
              t
            );
          }
        } else if (payload.kind === "scale") {
          setActiveSegment(payload.segmentIndex);
          void playGuitarNote(
            fretPositionToNote(payload.stringIndex, payload.fret),
            "2n",
            t
          );
        }
      }, events);

      part.loop = true;
      part.loopEnd = loopEnd;
      partRef.current = part;
      part.start(0);
      Tone.Transport.start();
      setMode(kind);
    },
    [bpm, lick.positions, lickSchedule, mode, scaleSchedule, stop]
  );

  useEffect(() => () => stop(), [stop]);

  useEffect(() => {
    if (mode !== "idle") stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm, songKey, progression.id]);

  const highlight =
    activeLickIndex !== null
      ? new Set([
          `${lick.positions[activeLickIndex]?.stringIndex}-${lick.positions[activeLickIndex]?.fret}`,
        ])
      : undefined;

  return (
    <div className="space-y-4 rounded-2xl border-2 border-green-700/40 bg-green-950/15 p-5">
      <div>
        <p className="text-sm font-bold text-green-400">
          שמע איך הליק נכנס לשיר — ביחד
        </p>
        <p className="mt-1 text-xs text-stone-400">
          האתר מנגן את האקורדים ברקע + את הליק בזמן הנכון. כל צבע = אקורד אחר.
        </p>
      </div>

      {/* Chord timeline */}
      <div className="flex flex-wrap justify-center gap-2">
        {lickSchedule.segments.map((seg, i) => {
          const active = mode !== "idle" && activeSegment === i;
          const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
          const noteRange =
            seg.lickNoteEnd > seg.lickNoteStart
              ? `תווים ${seg.lickNoteStart + 1}–${seg.lickNoteEnd}`
              : "";
          return (
            <div
              key={`${seg.chord}-${i}`}
              className={`rounded-xl border px-3 py-2 text-center transition ${
                active
                  ? `scale-105 ${color} shadow-lg`
                  : "border-stone-800 bg-stone-900/40"
              }`}
            >
              <p className="text-sm font-bold text-amber-400">{seg.chord}</p>
              {noteRange && (
                <p className="text-[10px] text-stone-500">ליק: {noteRange}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Tab grouped by chord */}
      <div className="space-y-2">
        {lickSchedule.segments.map((seg, i) => {
          if (seg.lickNoteEnd <= seg.lickNoteStart) return null;
          const notes = lick.positions.slice(seg.lickNoteStart, seg.lickNoteEnd);
          const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
          const active = mode !== "idle" && activeSegment === i;
          return (
            <div
              key={`group-${i}`}
              className={`rounded-xl border p-2 transition ${
                active ? color : "border-stone-800/60 bg-stone-950/30"
              }`}
            >
              <p className="mb-1 text-xs text-stone-500">
                כש<strong className="text-amber-400">{seg.chord}</strong> מתנגן →
                נגן:
              </p>
              <TabDiagram positions={notes} highlight={active ? highlight : undefined} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div>
          <label className="mb-1 block text-xs text-stone-500">BPM: {bpm}</label>
          <input
            type="range"
            min={60}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-28 accent-green-500"
          />
        </div>

        <button
          type="button"
          onClick={() => void playTogether("chords")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-95 ${
            mode === "chords"
              ? "bg-red-600/80 text-white hover:bg-red-500"
              : "border border-stone-600/50 bg-stone-900/40 text-stone-300 hover:bg-stone-800/60"
          }`}
        >
          {mode === "chords" ? "⏹ עצור" : "▶ אקורדים בלבד"}
        </button>

        <button
          type="button"
          onClick={() => void playTogether("lick")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-95 ${
            mode === "lick"
              ? "bg-red-600/80 text-white hover:bg-red-500"
              : "bg-green-600 text-stone-950 hover:bg-green-500"
          }`}
        >
          {mode === "lick" ? "⏹ עצור" : "▶ שמע ליק + שיר ביחד"}
        </button>

        <button
          type="button"
          onClick={() => void playTogether("scale")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-95 ${
            mode === "scale"
              ? "bg-red-600/80 text-white hover:bg-red-500"
              : "border border-green-700/50 bg-green-950/30 text-green-300 hover:bg-green-900/40"
          }`}
        >
          {mode === "scale" ? "⏹ עצור" : "▶ שמע נחיתות סולם + שיר"}
        </button>
      </div>

      <p className="text-xs text-stone-500">
        <strong className="text-stone-400">אקורדים בלבד:</strong> רק השיר ברקע —
        תתרגל לנגן בעצמך.{" "}
        <strong className="text-stone-400">ליק + שיר:</strong> כל קבוצת תווים
        מושמעת כשהאקורד שלה מתנגן.{" "}
        <strong className="text-stone-400">נחיתות סולם:</strong> תו אחד על כל
        אקורד — איפה לנחות (כמו Am → פריט 5).
      </p>
    </div>
  );
}
