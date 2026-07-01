import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import guitarDb from "@tombatossals/chords-db/lib/guitar.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "chords");

const NOTE_NAMES_HE = {
  C: "דו",
  "C#": "דו#",
  D: "רה",
  "D#": "רה#",
  E: "מי",
  F: "פה",
  "F#": "פה#",
  G: "סול",
  "G#": "סול#",
  A: "לה",
  "A#": "לה#",
  B: "סי",
};

const KEY_MAP = {
  C: "C",
  "C#": "Csharp",
  D: "D",
  "D#": "Eb",
  E: "E",
  F: "F",
  "F#": "Fsharp",
  G: "G",
  "G#": "Ab",
  A: "A",
  "A#": "Bb",
  B: "B",
};

const MAJOR_SCALE_DEGREES = [0, 2, 4, 5, 7, 9, 11];
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const QUALITY_SUFFIX = { major: "", minor: "m", dom7: "7", dim: "dim", maj7: "maj7" };

const PROGRESSIONS = [
  [
    { d: 0, q: "major" },
    { d: 4, q: "major" },
    { d: 5, q: "minor" },
    { d: 3, q: "major" },
  ],
  [
    { d: 5, q: "minor" },
    { d: 3, q: "major" },
    { d: 0, q: "major" },
    { d: 4, q: "major" },
  ],
  [
    { d: 0, q: "major" },
    { d: 3, q: "major" },
    { d: 4, q: "major" },
  ],
  [
    { d: 0, q: "dom7" },
    { d: 3, q: "dom7" },
    { d: 0, q: "dom7" },
    { d: 4, q: "dom7" },
    { d: 3, q: "dom7" },
    { d: 0, q: "dom7" },
  ],
  [
    { d: 1, q: "minor" },
    { d: 4, q: "dom7" },
    { d: 0, q: "maj7" },
  ],
  [
    { d: 0, q: "major" },
    { d: 5, q: "minor" },
    { d: 3, q: "major" },
    { d: 4, q: "major" },
  ],
];

function chordInKey(key, degree, quality) {
  const root = NOTE_NAMES[(NOTE_NAMES.indexOf(key) + MAJOR_SCALE_DEGREES[degree]) % 12];
  return `${root}${QUALITY_SUFFIX[quality]}`;
}

function getAllSiteChords() {
  const set = new Set();
  for (const key of NOTE_NAMES) {
    for (const prog of PROGRESSIONS) {
      for (const c of prog) set.add(chordInKey(key, c.d, c.q));
    }
  }
  for (const extra of ["Fm7", "Bdim"]) set.add(extra);
  return [...set].sort((a, b) => a.localeCompare(b));
}

function parseChordSymbol(symbol) {
  const match = symbol.match(/^([A-G]#?)(maj7|m7|dim|m|7)?$/);
  if (!match) return null;
  const [, root, quality = ""] = match;
  let suffix = "major";
  if (quality === "m") suffix = "minor";
  else if (quality === "m7") suffix = "m7";
  else if (quality === "7") suffix = "7";
  else if (quality === "maj7") suffix = "maj7";
  else if (quality === "dim") suffix = "dim";
  return { root, suffix, symbol };
}

function lookupChord(symbol) {
  const parsed = parseChordSymbol(symbol);
  if (!parsed) return null;
  const dbKey = KEY_MAP[parsed.root];
  const list = guitarDb.chords[dbKey];
  if (!list) return null;
  const chord = list.find((c) => c.suffix === parsed.suffix);
  if (!chord?.positions?.length) return null;
  const position = chord.positions.find((p) => p.baseFret === 1) ?? chord.positions[0];
  return { ...parsed, position };
}

function chordImageFilename(symbol) {
  return `${symbol.replace("#", "sharp").toLowerCase()}.png`;
}

function chordCategory(symbol) {
  if (symbol.endsWith("maj7")) return "maj7";
  if (symbol.endsWith("m7")) return "m7";
  if (symbol.endsWith("7")) return "dom7";
  if (symbol.endsWith("m")) return "minor";
  if (symbol.endsWith("dim")) return "dim";
  return "major";
}

function chordNameHe(symbol) {
  const parsed = parseChordSymbol(symbol);
  if (!parsed) return symbol;
  const rootHe = NOTE_NAMES_HE[parsed.root];
  if (parsed.suffix === "major") return `${rootHe} מז'ור`;
  if (parsed.suffix === "minor") return `${rootHe} מינור`;
  if (parsed.suffix === "m7") return `${rootHe} מינור 7`;
  if (parsed.suffix === "7") return `${rootHe} דומיננט 7`;
  if (parsed.suffix === "maj7") return `${rootHe} מז'ור 7`;
  if (parsed.suffix === "dim") return `${rootHe} מוקטן`;
  return symbol;
}

function difficultyFromPosition(position) {
  return position.barres?.length || position.frets.some((f) => f > 5) ? "barre" : "open";
}

function renderSvg(symbol, position) {
  const width = 220;
  const height = 280;
  const left = 48;
  const top = 58;
  const stringGap = 26;
  const fretGap = 34;
  const strings = 6;
  const fretsOnChord = 4;
  const { frets, fingers = [], baseFret = 1, barres = [] } = position;

  const gridRight = left + stringGap * (strings - 1);
  const gridBottom = top + fretGap * fretsOnChord;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="white"/>
  <text x="${width / 2}" y="34" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#111">${symbol}</text>`;

  if (baseFret > 1) {
    svg += `<text x="18" y="${top + fretGap / 2 + 5}" font-family="Arial, sans-serif" font-size="16" fill="#111">${baseFret}fr</text>`;
  }

  for (let s = 0; s < strings; s++) {
    const x = left + s * stringGap;
    svg += `<line x1="${x}" y1="${top}" x2="${x}" y2="${gridBottom}" stroke="#111" stroke-width="1.5"/>`;
  }

  for (let f = 0; f <= fretsOnChord; f++) {
    const y = top + f * fretGap;
    const strokeWidth = f === 0 && baseFret === 1 ? 5 : 1.5;
    svg += `<line x1="${left}" y1="${y}" x2="${gridRight}" y2="${y}" stroke="#111" stroke-width="${strokeWidth}"/>`;
  }

  for (const barreFret of barres) {
    const relative = barreFret - baseFret + 0.5;
    const y = top + relative * fretGap;
    const fromString = frets.findIndex((f) => f >= barreFret);
    const toString = strings - 1 - [...frets].reverse().findIndex((f) => f >= barreFret);
    const x1 = left + fromString * stringGap;
    const x2 = left + toString * stringGap;
    svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#111" stroke-width="10" stroke-linecap="round"/>`;
  }

  for (let s = 0; s < strings; s++) {
    const fret = frets[s];
    const x = left + s * stringGap;
    if (fret === -1) {
      svg += `<text x="${x}" y="${top - 10}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#111">×</text>`;
    } else if (fret === 0) {
      svg += `<circle cx="${x}" cy="${top - 12}" r="7" fill="none" stroke="#111" stroke-width="1.8"/>`;
    } else if (!barres.includes(fret) || fingers[s] !== barres.find((b) => b === fret)) {
      const relative = fret - baseFret + 0.5;
      const y = top + relative * fretGap;
      svg += `<circle cx="${x}" cy="${y}" r="9" fill="#111"/>`;
      const finger = fingers[s];
      if (finger > 0) {
        svg += `<text x="${x}" y="${gridBottom + 22}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#111">${finger}</text>`;
      }
    } else if (fingers[s] > 0) {
      svg += `<text x="${x}" y="${gridBottom + 22}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#111">${fingers[s]}</text>`;
    }
  }

  svg += "</svg>";
  return svg;
}

async function generatePng(symbol, position, outPath) {
  const svg = renderSvg(symbol, position);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const chords = getAllSiteChords();
  const generated = [];
  const missing = [];

  for (const symbol of chords) {
    const chord = lookupChord(symbol);
    const outPath = path.join(OUT_DIR, chordImageFilename(symbol));
    if (!chord) {
      missing.push(symbol);
      continue;
    }
    await generatePng(symbol, chord.position, outPath);
    generated.push(symbol);
    console.log(`✓ ${symbol} -> ${path.basename(outPath)}`);
  }

  const metadata = chords.map((symbol) => {
    const chord = lookupChord(symbol);
    return {
      id: symbol,
      name: symbol,
      nameHe: chordNameHe(symbol),
      image: `/chords/${chordImageFilename(symbol)}`,
      category: chordCategory(symbol),
      difficulty: chord ? difficultyFromPosition(chord.position) : "open",
    };
  });

  const metaPath = path.join(__dirname, "generated-chords.json");
  fs.writeFileSync(metaPath, JSON.stringify({ chords: metadata, missing, generated }, null, 2));

  console.log(`\nGenerated ${generated.length}/${chords.length} chord images`);
  if (missing.length) console.warn("Missing from chords-db:", missing.join(", "));

  await import("./write-chords-ts.mjs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
