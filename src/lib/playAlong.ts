import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";
import type { NoteName } from "@/lib/music";
import { fretToMidi } from "@/lib/music";
import { midiToNote } from "@/lib/guitarEngine";

export interface ChordSegment {
  chord: string;
  chordIndex: number;
  startSec: number;
  durationSec: number;
  lickNoteStart: number;
  lickNoteEnd: number;
}

export interface LickEvent {
  timeSec: number;
  lickIndex: number;
  segmentIndex: number;
}

export interface PlayAlongSchedule {
  bpm: number;
  loopDurationSec: number;
  segments: ChordSegment[];
  lickEvents: LickEvent[];
}

/** מחלק תווי ליק לפי משך כל אקורד בפרוגרשן */
export function buildPlayAlongSchedule(
  progression: Progression,
  key: NoteName,
  lickPositions: { stringIndex: number; fret: number }[],
  bpm: number
): PlayAlongSchedule {
  const resolved = resolveProgressionInKey(progression, key);
  const beatDur = 60 / bpm;
  let time = 0;

  const segments: ChordSegment[] = resolved.map((item, chordIndex) => {
    const durationSec = item.bars * 4 * beatDur;
    const seg = {
      chord: item.chord,
      chordIndex,
      startSec: time,
      durationSec,
      lickNoteStart: 0,
      lickNoteEnd: 0,
    };
    time += durationSec;
    return seg;
  });

  const loopDurationSec = time;
  const totalNotes = lickPositions.length;
  const totalBars = resolved.reduce((sum, r) => sum + r.bars, 0);

  const counts: number[] = [];
  let assigned = 0;
  segments.forEach((_, i) => {
    const bars = resolved[i].bars;
    if (i === segments.length - 1) {
      counts.push(Math.max(0, totalNotes - assigned));
      return;
    }
    const count = Math.max(1, Math.round((totalNotes * bars) / totalBars));
    counts.push(count);
    assigned += count;
  });

  if (assigned > totalNotes) {
    const diff = assigned - totalNotes;
    counts[counts.length - 2] = Math.max(1, counts[counts.length - 2]! - diff);
  }

  let noteIdx = 0;
  segments.forEach((seg, i) => {
    const count = counts[i] ?? 0;
    seg.lickNoteStart = noteIdx;
    seg.lickNoteEnd = noteIdx + count;
    noteIdx += count;
  });

  const lickEvents: LickEvent[] = [];
  segments.forEach((seg, segmentIndex) => {
    const noteCount = seg.lickNoteEnd - seg.lickNoteStart;
    if (noteCount <= 0) return;
    const playWindow = seg.durationSec * 0.72;
    const gap = seg.durationSec * 0.14;
    const interval = noteCount > 1 ? playWindow / (noteCount - 1) : 0;

    for (let j = 0; j < noteCount; j++) {
      lickEvents.push({
        timeSec: seg.startSec + gap + j * interval,
        lickIndex: seg.lickNoteStart + j,
        segmentIndex,
      });
    }
  });

  return { bpm, loopDurationSec, segments, lickEvents };
}

export interface ScaleLandingEvent {
  timeSec: number;
  segmentIndex: number;
  stringIndex: number;
  fret: number;
  chord: string;
}

/** תווי נחיתה (שורש) על כל אקורד — לדמו "סולם + שיר" */
export function buildScaleLandingSchedule(
  progression: Progression,
  key: NoteName,
  landings: { stringIndex: number; fret: number }[],
  bpm: number
): { loopDurationSec: number; segments: ChordSegment[]; events: ScaleLandingEvent[] } {
  const resolved = resolveProgressionInKey(progression, key);
  const beatDur = 60 / bpm;
  let time = 0;

  const segments: ChordSegment[] = resolved.map((item, chordIndex) => {
    const durationSec = item.bars * 4 * beatDur;
    const seg = {
      chord: item.chord,
      chordIndex,
      startSec: time,
      durationSec,
      lickNoteStart: 0,
      lickNoteEnd: 0,
    };
    time += durationSec;
    return seg;
  });

  const events: ScaleLandingEvent[] = segments.map((seg, segmentIndex) => {
    const landing = landings[segmentIndex % landings.length] ?? landings[0]!;
    return {
      timeSec: seg.startSec + seg.durationSec * 0.35,
      segmentIndex,
      stringIndex: landing.stringIndex,
      fret: landing.fret,
      chord: seg.chord,
    };
  });

  return { loopDurationSec: time, segments, events };
}

export function fretPositionToNote(
  stringIndex: number,
  fret: number
): string {
  return midiToNote(fretToMidi(stringIndex, fret));
}
