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

type GuitarEngine = {
  sampler: Tone.Sampler;
  pluck: Tone.PolySynth<Tone.PluckSynth>;
  output: Tone.Volume;
  samplesReady: boolean;
};

let engine: GuitarEngine | null = null;
let initPromise: Promise<GuitarEngine> | null = null;

function createPluckVoice(): Tone.PolySynth<Tone.PluckSynth> {
  const pluck = new Tone.PolySynth(Tone.PluckSynth, {
    attackNoise: 4,
    dampening: 3200,
    resonance: 0.94,
  });
  pluck.maxPolyphony = 10;
  pluck.volume.value = -6;
  return pluck;
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

  const pluck = createPluckVoice();
  pluck.connect(eq);

  // Wait briefly for samples; fall back to pluck if CDN is slow
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

  return { sampler, pluck, output, samplesReady };
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
    (a, b) =>
      Tone.Frequency(a).toMidi() - Tone.Frequency(b).toMidi()
  );
}

export async function playGuitarChord(
  notes: string[],
  duration: Tone.Unit.Time = "2n",
  time?: number,
  strumMs = 45
) {
  const { sampler, pluck, samplesReady } = await getGuitarEngine();
  const t = time ?? Tone.now();
  const sorted = sortNotesForStrum(notes);
  const strumSec = strumMs / 1000;
  const voice = samplesReady ? sampler : pluck;

  sorted.forEach((note, i) => {
    const at = t + i * strumSec;
    if (samplesReady) {
      sampler.triggerAttackRelease(note, duration, at);
    } else {
      pluck.triggerAttackRelease(note, duration, at);
    }
  });
}

export async function playGuitarNote(
  note: string,
  duration: Tone.Unit.Time = "8n",
  time?: number
) {
  const { sampler, pluck, samplesReady } = await getGuitarEngine();
  const t = time ?? Tone.now();
  const voice = samplesReady ? sampler : pluck;
  voice.triggerAttackRelease(note, duration, t);
}

export async function playGuitarNotesSequence(
  notes: string[],
  bpm = 80,
  startTime?: number
) {
  const { sampler, pluck, samplesReady } = await getGuitarEngine();
  const voice = samplesReady ? sampler : pluck;
  const t0 = startTime ?? Tone.now();
  const interval = 60 / bpm;

  notes.forEach((note, i) => {
    voice.triggerAttackRelease(note, "8n", t0 + i * interval);
  });
}

export function releaseAllGuitar() {
  engine?.sampler.releaseAll();
  engine?.pluck.releaseAll();
}
