import * as Tone from "tone";

const GUITAR_BASE_URL =
  "https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-acoustic/";

/** Sparse sample map — Tone.Sampler repitches between these notes */
const GUITAR_SAMPLES: Record<string, string> = {
  "F#2": "Fs2.mp3",
  "A2": "A2.mp3",
  "C3": "C3.mp3",
  "D#3": "Ds3.mp3",
  "F#3": "Fs3.mp3",
  "A3": "A3.mp3",
  "C4": "C4.mp3",
  "D#4": "Ds4.mp3",
  "F#4": "Fs4.mp3",
  "A4": "A4.mp3",
  "C5": "C5.mp3",
};

const PLUCK_VOICES = 8;

type GuitarEngine = {
  sampler: Tone.Sampler;
  pluckVoices: Tone.PluckSynth[];
  pluckIndex: number;
  output: Tone.Volume;
  samplesReady: boolean;
};

let engine: GuitarEngine | null = null;
let initPromise: Promise<GuitarEngine> | null = null;

function createPluckVoices(destination: Tone.ToneAudioNode): Tone.PluckSynth[] {
  return Array.from({ length: PLUCK_VOICES }, () => {
    const pluck = new Tone.PluckSynth({
      attackNoise: 4,
      dampening: 3200,
      resonance: 0.94,
    });
    pluck.volume.value = -6;
    pluck.connect(destination);
    return pluck;
  });
}

function triggerPluck(
  eng: GuitarEngine,
  note: string,
  duration: Tone.Unit.Time,
  time: number
) {
  const voice = eng.pluckVoices[eng.pluckIndex % PLUCK_VOICES];
  eng.pluckIndex += 1;
  voice.triggerAttackRelease(note, duration, time);
}

async function createEngine(): Promise<GuitarEngine> {
  await Tone.start();

  const reverb = new Tone.Reverb({
    decay: 2.8,
    preDelay: 0.02,
    wet: 0.32,
  });
  await reverb.generate();

  const eq = new Tone.EQ3({ low: 4, mid: -2, high: 3 });
  const output = new Tone.Volume(-4);

  eq.chain(reverb, output, Tone.Destination);

  let samplesReady = false;

  const sampler = new Tone.Sampler({
    urls: GUITAR_SAMPLES,
    baseUrl: GUITAR_BASE_URL,
    release: 1.8,
    attack: 0.002,
    onload: () => {
      samplesReady = true;
    },
    onerror: () => {
      samplesReady = false;
    },
  });
  sampler.connect(eq);

  const pluckVoices = createPluckVoices(eq);

  await Promise.race([
    new Promise<void>((resolve) => {
      if (sampler.loaded) {
        samplesReady = true;
        resolve();
        return;
      }
      const check = setInterval(() => {
        if (sampler.loaded) {
          samplesReady = true;
          clearInterval(check);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(check);
        resolve();
      }, 4000);
    }),
  ]);

  return {
    sampler,
    pluckVoices,
    pluckIndex: 0,
    output,
    samplesReady,
  };
}

export async function getGuitarEngine(): Promise<GuitarEngine> {
  if (engine) return engine;
  if (!initPromise) initPromise = createEngine();
  engine = await initPromise;
  return engine;
}

export function midiToNote(midi: number): string {
  return Tone.Frequency(midi, "midi").toNote();
}

/** Strum chord like real guitar — low string first */
function sortNotesForStrum(notes: string[]): string[] {
  return [...notes].sort(
    (a, b) => Tone.Frequency(a).toMidi() - Tone.Frequency(b).toMidi()
  );
}

export async function playGuitarChord(
  notes: string[],
  duration: Tone.Unit.Time = "2n",
  time?: number,
  strumMs = 45
) {
  const eng = await getGuitarEngine();
  const t = time ?? Tone.now();
  const sorted = sortNotesForStrum(notes);
  const strumSec = strumMs / 1000;

  sorted.forEach((note, i) => {
    const at = t + i * strumSec;
    if (eng.samplesReady) {
      eng.sampler.triggerAttackRelease(note, duration, at);
    } else {
      triggerPluck(eng, note, duration, at);
    }
  });
}

export async function playGuitarNote(
  note: string,
  duration: Tone.Unit.Time = "8n",
  time?: number
) {
  const eng = await getGuitarEngine();
  const t = time ?? Tone.now();
  if (eng.samplesReady) {
    eng.sampler.triggerAttackRelease(note, duration, t);
  } else {
    triggerPluck(eng, note, duration, t);
  }
}

export async function playGuitarNotesSequence(
  notes: string[],
  bpm = 80,
  startTime?: number
) {
  const eng = await getGuitarEngine();
  const t0 = startTime ?? Tone.now();
  const interval = 60 / bpm;

  notes.forEach((note, i) => {
    const at = t0 + i * interval;
    if (eng.samplesReady) {
      eng.sampler.triggerAttackRelease(note, "8n", at);
    } else {
      triggerPluck(eng, note, "8n", at);
    }
  });
}

export function releaseAllGuitar() {
  if (!engine) return;
  engine.sampler.releaseAll();
}
