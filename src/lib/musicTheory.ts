import type { NoteName } from "@/lib/music";
import {
  getScaleNotes,
  noteAtFret,
  noteIndex,
  STANDARD_TUNING,
  transposeNote,
} from "@/lib/music";
import type { Progression } from "@/data/progressions";
import { getChordSymbolInKey } from "@/data/progressions";
import { scales, type ScaleInfo } from "@/data/scales";

/** המינור היחסי — 3 חצאי טונים מתחת לשורש המז'ור (למשל C → Am) */
export function getRelativeMinor(majorKey: NoteName): NoteName {
  return transposeNote(majorKey, 9);
}

/** המז'ור היחסי (למשל Am → C) */
export function getRelativeMajor(minorKey: NoteName): NoteName {
  return transposeNote(minorKey, 3);
}

export interface ScaleRecommendation {
  scale: ScaleInfo;
  root: NoteName;
  headlineHe: string;
  explanationHe: string;
  whyItWorksHe: string;
  alternateScale?: { scale: ScaleInfo; root: NoteName; labelHe: string };
}

export function getScaleRecommendation(
  progression: Progression,
  key: NoteName
): ScaleRecommendation {
  const relativeMinor = getRelativeMinor(key);
  const viChord = getChordSymbolInKey(key, 5, "minor");

  const byId = (id: string) => scales.find((s) => s.id === id)!;

  switch (progression.id) {
    case "twelve-bar-blues": {
      const pent = byId("pentatonic-minor");
      const blues = byId("blues");
      return {
        scale: blues,
        root: key,
        headlineHe: `${key} Blues Scale — התחל כאן`,
        explanationHe: `על בלוז ב-${key}, נגן סולם בלוז בשורש ${key}. זה פנטטוני מינור + התו הכחול (b5).`,
        whyItWorksHe:
          "בבלוז האקורדים הם דומיננטיים (7) — סולם בלוז נותן את הצליל המתוח הזה. קופסה 1 על מיתר E היא הבית של כל סולו בלוז.",
        alternateScale: {
          scale: pent,
          root: key,
          labelHe: `${key} minor pentatonic — פשוט יותר להתחלה`,
        },
      };
    }
    case "two-five-one": {
      const major = byId("major");
      const dorian = byId("dorian");
      const iiRoot = getChordSymbolInKey(key, 1, "minor").replace("m", "") as NoteName;
      return {
        scale: major,
        root: key,
        headlineHe: `${key} Major — עובד על כל הפרוגרשן`,
        explanationHe: `ב-${key} מז'ור: נגן סולם ${key} מז'ור על Dm7 – G7 – Cmaj7. פשוט ונקי.`,
        whyItWorksHe:
          "כל האקורדים שייכים לטונאליות אחת — אותם 7 תווים עובדים בכל מקום.",
        alternateScale: {
          scale: dorian,
          root: iiRoot,
          labelHe: `${iiRoot} Dorian — צבע ג'אזי על ה-ii`,
        },
      };
    }
    case "one-four-five": {
      const majPent = byId("pentatonic-major");
      return {
        scale: majPent,
        root: key,
        headlineHe: `${key} Major Pentatonic`,
        explanationHe: `פרוגרשן I-IV-V ב-${key} — פנטטוני מז'ור. 5 תווים, קשה לטעות.`,
        whyItWorksHe:
          "שלושה אקורדים מז'וריים = צליל שמח וישיר. הוסף b3 ו-b5 מסולם בלוז לניחוח רוקי.",
        alternateScale: {
          scale: byId("blues"),
          root: key,
          labelHe: `${key} Blues — לרוק ובלוז`,
        },
      };
    }
    case "six-four-one-five": {
      const natMin = byId("natural-minor");
      return {
        scale: natMin,
        root: relativeMinor,
        headlineHe: `${relativeMinor} מינור טבעי`,
        explanationHe: `פרוגרשן שמתחיל ב-${viChord} — הטונאליות הרגשית היא ${relativeMinor} מינור.`,
        whyItWorksHe:
          "כשהפרוגרשן פותח במינור, שחק על b3 ו-b7 — התווים הכי 'עצובים' בסולם.",
        alternateScale: {
          scale: byId("pentatonic-minor"),
          root: relativeMinor,
          labelHe: `${relativeMinor} פנטטוני מינור — קל יותר`,
        },
      };
    }
    case "andalusian-metal": {
      const natMin = byId("natural-minor");
      return {
        scale: natMin,
        root: key,
        headlineHe: `${key} מינור טבעי — סולם המטאל`,
        explanationHe: `על Am → G → F → E ב-${key}, נגן ${key} natural minor. פריטים 5–8 ו-12.`,
        whyItWorksHe:
          "פרוגרשן מינורי לגמרי. נחיתות חזקות על שורשי האקורדים = צליל מטאלי קלאסי.",
        alternateScale: {
          scale: byId("pentatonic-minor"),
          root: key,
          labelHe: `${key} פנטטוני מינור — לסולואים מהירים`,
        },
      };
    }
    case "metal-em-power": {
      const pent = byId("pentatonic-minor");
      const natMin = byId("natural-minor");
      return {
        scale: pent,
        root: key,
        headlineHe: `${key} פנטטוני מינור — מטאל`,
        explanationHe: `על Em → C → G → D, נגן ${key} minor pentatonic. פריט 0 (פתוח) ופריט 12.`,
        whyItWorksHe:
          "מטאל = מינור + מהירות. פנטטוני מינור על E = הבסיס של סולואי Metallica.",
        alternateScale: {
          scale: natMin,
          root: key,
          labelHe: `${key} מינור טבעי — יותר תווים, יותר צבע`,
        },
      };
    }
    case "rock-e-a-b": {
      const majPent = byId("pentatonic-major");
      return {
        scale: majPent,
        root: key,
        headlineHe: `${key} מז'ור פנטטוני — רוק ב-E`,
        explanationHe: `על E → A → B, נגן ${key} major pentatonic. מיתר E פתוח ופריטים 0–3.`,
        whyItWorksHe: "רוק קלאסי ב-E = power chords + pentatonic major. פשוט וחזק.",
        alternateScale: {
          scale: byId("blues"),
          root: key,
          labelHe: `${key} בלוז — לסולו עם attitude`,
        },
      };
    }
    case "pop-d-bm-g-a": {
      const pentMinor = byId("pentatonic-minor");
      const relativeMinor = transposeNote(key, 9); // Bm in D
      return {
        scale: pentMinor,
        root: relativeMinor,
        headlineHe: `${relativeMinor} מינור פנטטוני — פופ ב-D`,
        explanationHe: `על D → Bm → G → A, נגן ${relativeMinor} minor pentatonic (פריטים 7–10).`,
        whyItWorksHe: "Bm הוא האקורד הרגשי — B minor pentatonic עובד על כל הפרוגרשן.",
        alternateScale: {
          scale: byId("pentatonic-major"),
          root: key,
          labelHe: `${key} מז'ור פנטטוני — זווית שמחה יותר`,
        },
      };
    }
    case "metal-thrash-power": {
      const pent = byId("pentatonic-minor");
      return {
        scale: pent,
        root: key,
        headlineHe: `${key} minor pentatonic — 5 תווים לסולו`,
        explanationHe: `השיר הוא Em → G → A. לסולו: סולם ${key} minor pentatonic — התווים E G A B D.`,
        whyItWorksHe:
          "זה אותו סולם שתראה ביוטיוב ובטאבים באינטרנט. מעל Em-G-A תמיד E minor pentatonic.",
      };
    }
  }

  const pentMinor = byId("pentatonic-minor");
  const pentMajor = byId("pentatonic-major");
  return {
    scale: pentMinor,
    root: relativeMinor,
    headlineHe: `${relativeMinor} minor pentatonic — הכלל הזהב`,
    explanationHe: `על פרוגרשן ב-${key} מז'ור (${progression.nameHe}), נגן פנטטוני מינור של ${relativeMinor}. זה אותם תווים כמו ${key} major pentatonic!`,
    whyItWorksHe: `ה-vi (${viChord}) הוא המינור היחסי. 5 תווים בלבד — כמעט כל תו שתבחר יישמע טוב.`,
    alternateScale: {
      scale: pentMajor,
      root: key,
      labelHe: `${key} major pentatonic — אותם תווים, זווית שמחה יותר`,
    },
  };
}

export interface MajorMinorComparison {
  majorKey: NoteName;
  minorKey: NoteName;
  majorChord: string;
  minorChord: string;
  majorFeel: string;
  minorFeel: string;
  sharedNotes: NoteName[];
  differentNotes: { major: NoteName; minor: NoteName; role: string }[];
}

export function getMajorMinorComparison(
  majorKey: NoteName = "C"
): MajorMinorComparison {
  const minorKey = getRelativeMinor(majorKey);
  const majorNotes = getScaleNotes(majorKey, [0, 2, 4, 5, 7, 9, 11]);
  const minorNotes = getScaleNotes(minorKey, [0, 2, 3, 5, 7, 8, 10]);
  const minorSet = new Set(minorNotes);

  const differentNotes: MajorMinorComparison["differentNotes"] = [
    {
      major: majorNotes[2],
      minor: minorNotes[2],
      role: "השלישי — מגדיר מז'ור/מינור",
    },
    {
      major: majorNotes[5],
      minor: minorNotes[5],
      role: "השישי — צבע רגשי",
    },
    {
      major: majorNotes[6],
      minor: minorNotes[6],
      role: "השביעי — מתח/פתרון",
    },
  ];

  return {
    majorKey,
    minorKey,
    majorChord: majorKey,
    minorChord: `${minorKey}m`,
    majorFeel: "שמח, בהיר, יציב — 'הכל בסדר'",
    minorFeel: "עצוב, רגשי, אינטימי — 'יש משהו כואב'",
    sharedNotes: majorNotes.filter((n) => minorSet.has(n)),
    differentNotes,
  };
}

/** מוצא את מיקום השורש על מיתר E כבד (לעוגן קופסאות) */
export function findRootAnchorFret(root: NoteName, maxFret = 12): number {
  const open = STANDARD_TUNING[0];
  for (let fret = 0; fret <= maxFret; fret++) {
    if (noteAtFret(open, fret) === root) return fret;
  }
  return 5;
}

export interface PentatonicBox {
  number: 1 | 2 | 3 | 4 | 5;
  nameHe: string;
  minFret: number;
  maxFret: number;
  descriptionHe: string;
  tipHe: string;
}

const BOX_OFFSETS: { start: number; end: number }[] = [
  { start: 0, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 7 },
  { start: 7, end: 10 },
  { start: 9, end: 12 },
];

const BOX_META: { nameHe: string; descriptionHe: string }[] = [
  {
    nameHe: "קופסה 1",
    descriptionHe: "האזור הראשון — מתחילים תמיד פה",
  },
  {
    nameHe: "קופסה 2",
    descriptionHe: "ממשיך מאותו מקום, קצת יותר גבוה על הצוואר",
  },
  {
    nameHe: "קופסה 3",
    descriptionHe: "אמצע הצוואר — סולואים קלאסיים",
  },
  {
    nameHe: "קופסה 4",
    descriptionHe: "גבוה יותר — צליל חד",
  },
  {
    nameHe: "קופסה 5",
    descriptionHe: "הכי גבוה על הצוואר",
  },
];

export function getPentatonicBoxes(
  root: NoteName,
  maxFret = 17
): PentatonicBox[] {
  const anchor = findRootAnchorFret(root);

  return BOX_OFFSETS.map((offset, i) => {
    const minFret = Math.max(0, anchor + offset.start);
    const maxF = Math.min(maxFret, anchor + offset.end);
    const meta = BOX_META[i];
    return {
      number: (i + 1) as 1 | 2 | 3 | 4 | 5,
      nameHe: meta.nameHe,
      minFret,
      maxFret: maxF,
      descriptionHe: meta.descriptionHe,
      tipHe: `לחץ על פריטים ${minFret}–${maxF} במיתר E (למטה) ובשאר המיתרים — אותם תווים של ${root}`,
    };
  });
}

export function isNoteInBox(fret: number, box: PentatonicBox): boolean {
  return fret >= box.minFret && fret <= box.maxFret;
}

export interface FretPosition {
  stringIndex: number;
  fret: number;
  note: NoteName;
  degree: string;
}

/** סדר תווים לריצת סולם בתוך קופסה (מיתר 6 ל-1, מהנמוך לגבוה) */
export function getScaleRunInBox(
  root: NoteName,
  intervals: number[],
  degrees: string[],
  box: PentatonicBox,
  totalFrets = 17
): FretPosition[] {
  const scaleNotes = getScaleNotes(root, intervals);
  const noteToDegree = new Map(scaleNotes.map((n, i) => [n, degrees[i]]));
  const positions: FretPosition[] = [];

  STANDARD_TUNING.forEach((open, stringIndex) => {
    for (let fret = box.minFret; fret <= Math.min(box.maxFret, totalFrets); fret++) {
      const note = noteAtFret(open, fret);
      const degree = noteToDegree.get(note);
      if (degree) {
        positions.push({ stringIndex, fret, note, degree });
      }
    }
  });

  positions.sort((a, b) => {
    const openMidi = [40, 45, 50, 55, 59, 64];
    return (
      openMidi[a.stringIndex] + a.fret - (openMidi[b.stringIndex] + b.fret)
    );
  });

  return positions;
}

/** ממוין לפי גובה צליל (נמוך → גבוה) לריצות סולם */
export function sortByPitch(positions: FretPosition[]): FretPosition[] {
  const openMidi = [40, 45, 50, 55, 59, 64];
  return [...positions].sort(
    (a, b) =>
      openMidi[a.stringIndex] + a.fret - (openMidi[b.stringIndex] + b.fret)
  );
}
