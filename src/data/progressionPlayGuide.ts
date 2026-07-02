import type { NoteName } from "@/lib/music";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";

export interface GenreGroup {
  id: string;
  nameHe: string;
  emoji: string;
  descriptionHe: string;
  /** שירים מפורסמים בז'אנר — לזיהוי */
  exampleSongsHe: string;
  progressionIds: string[];
}

/** כל ז'אנר = פרוגרשנים ייחודיים שלו. בלי חפיפות מבלבלות. */
export const genreGroups: GenreGroup[] = [
  {
    id: "pop",
    nameHe: "פופ",
    emoji: "🎤",
    descriptionHe: "שירי רדיו, אדל, ביטלס — מלודיות פשוטות ושירתיות",
    exampleSongsHe: "Let It Be, Someone Like You, שירים ישראליים",
    progressionIds: ["one-five-six-four", "pop-d-bm-g-a", "six-four-one-five"],
  },
  {
    id: "rock",
    nameHe: "רוק",
    emoji: "⚡",
    descriptionHe: "רוק קלאסי, חשמלית — סולואים עם עוצמה",
    exampleSongsHe: "Wild Thing, La Bamba, AC/DC",
    progressionIds: ["rock-e-a-b", "one-four-five"],
  },
  {
    id: "blues",
    nameHe: "בלוז",
    emoji: "🎷",
    descriptionHe: "בלוז 12 תיבות — אקורדי 7, bending, feel",
    exampleSongsHe: "Sweet Home Chicago, Red House, Crossroads",
    progressionIds: ["twelve-bar-blues"],
  },
  {
    id: "folk",
    nameHe: "פולק / אקוסטי",
    emoji: "🪕",
    descriptionHe: "גיטרה אקוסטית, שלושה אקורדים פשוטים",
    exampleSongsHe: "Blowin' in the Wind, מי שמאמין",
    progressionIds: ["one-four-five"],
  },
  {
    id: "jazz",
    nameHe: "ג'אז",
    emoji: "🎹",
    descriptionHe: "מתוחכם — ii-V-I, אקורדי 7 ו-maj7",
    exampleSongsHe: "Autumn Leaves, Fly Me to the Moon",
    progressionIds: ["two-five-one"],
  },
  {
    id: "mizrahi",
    nameHe: "מזרחי / בלדה",
    emoji: "🌙",
    descriptionHe: "שירים רגשיים, מזרחי, בלדות ישראליות",
    exampleSongsHe: "Stand By Me, שירי בלדה ישראליים",
    progressionIds: ["one-six-four-five", "six-four-one-five"],
  },
  {
    id: "metal",
    nameHe: "מטאל",
    emoji: "🤘",
    descriptionHe: "מטאל מינורי — אנדלוסית, power chords, סולואים מהירים",
    exampleSongsHe: "Stairway to Heaven, Metallica, Iron Maiden",
    progressionIds: ["andalusian-metal", "metal-em-power", "metal-thrash-power"],
  },
];

export interface PlayGuide {
  progressionId: string;
  simpleNameHe: string;
  hearHe: string;
  fretRangeHe: string;
  boxNumber: 1 | 2 | 3;
  playRoot: NoteName;
  doSteps: string[];
  skipHe: string;
}

export const playGuides: PlayGuide[] = [
  {
    progressionId: "one-five-six-four",
    simpleNameHe: "C → G → Am → F",
    hearHe: "שמח → שמח → עצוב (Am) → שמח. הכי מפורסם בעולם.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "הפעל את השיר ברקע",
      "נגן על מיתר E (למטה): פריט 5 → 8 → 5",
      "שקט 2 שניות",
      "עוד 3 פריטים מאותו אזור",
      "כשמגיע Am — נסה פריט 5 על מיתר E",
    ],
    skipHe: "האקורדים: C G Am F.",
  },
  {
    progressionId: "six-four-one-five",
    simpleNameHe: "Am → F → C → G",
    hearHe: "מתחיל עצוב (Am) — ואז נפתח לשמח.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "התחל לנגן כששומע Am — זה החלק הרגשי",
      "פריטים 5–8, 3 תווים בכל פעם",
      "כשמגיע C — פריט 5 על מיתר E",
    ],
    skipHe: "Despacito, Africa — אותו רעיון.",
  },
  {
    progressionId: "one-four-five",
    simpleNameHe: "G → C → D",
    hearHe: "שלושה אקורדים שמחים. רוק, פולק.",
    fretRangeHe: "פריטים 3–6",
    boxNumber: 1,
    playRoot: "G",
    doSteps: [
      "אזור נמוך — פריט 3 על מיתר E (למטה)",
      "נגן: 3 → 5 → 3 על מיתר E",
      "call & response: משפט קצר, שקט, משפט",
    ],
    skipHe: "La Bamba, Wild Thing.",
  },
  {
    progressionId: "twelve-bar-blues",
    simpleNameHe: "A7 → D7 → E7 (12 תיבות)",
    hearHe: "בלוז קלאסי. אקורדים עם 7 = צליל בלוזי.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "פריט 5 על מיתר E = הבית שלך",
      "נגן לאט — bending אם יודע",
      "פחות תווים, יותר feel",
      "עקוב אחרי A7 ו-D7 — נחיתה על פריט 5 או 7",
    ],
    skipHe: "12 תיבות = אורך הסיבוב.",
  },
  {
    progressionId: "two-five-one",
    simpleNameHe: "Dm7 → G7 → Cmaj7",
    hearHe: "ג'אז. מתוחכם — תתרגל אחרי פופ.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 2,
    playRoot: "C",
    doSteps: [
      "נגן בפריטים 5–8",
      "פשוט: 3–4 תווים, הרבה שקט",
      "נחית על שורש האקורד בכל החלפה",
    ],
    skipHe: "ג'אז = שלב מתקדם.",
  },
  {
    progressionId: "one-six-four-five",
    simpleNameHe: "C → Am → F → G",
    hearHe: "שנות ה-50, דו-וופ, מזרחי.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "אותו אזור כמו C-G-Am-F",
      "מלודיה פשוטה — כמו שירה",
      "3 תווים → שקט → 3 תווים",
    ],
    skipHe: "Stand By Me.",
  },
  {
    progressionId: "andalusian-metal",
    simpleNameHe: "Am → G → F → E",
    hearHe: "יורד צלע אחר צלע — דרמטי, מטאלי.",
    fretRangeHe: "פריטים 5–8 ו-12",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "A natural minor — פריטים 5–8",
      "נחיתה חזקה על שורש כל אקורד",
      "Am=5, G=3, F=8, E=12 על מיתר E",
    ],
    skipHe: "Stairway, Iron Maiden — אותו רעיון.",
  },
  {
    progressionId: "metal-em-power",
    simpleNameHe: "Em → C → G → D",
    hearHe: "מטאל מינורי אגרסיבי. מתחיל ב-Em.",
    fretRangeHe: "פריטים 0–3 ו-12",
    boxNumber: 1,
    playRoot: "E",
    doSteps: [
      "E minor pentatonic — מיתר E פתוח (פריט 0)",
      "סולו גבוה: פריט 12 על מיתר E",
      "נחיתה חזקה על E",
    ],
    skipHe: "Metallica, Megadeth.",
  },
  {
    progressionId: "rock-e-a-b",
    simpleNameHe: "E → A → B",
    hearHe: "רוק קלאסי ב-E. חזק, ישיר, בלי C ו-Am.",
    fretRangeHe: "פריטים 0–3 ו-12",
    boxNumber: 1,
    playRoot: "E",
    doSteps: [
      "Power chords: E5 → A5 → B5",
      "palm muting על כל downstroke",
      "סולו: E major pentatonic, מיתר E פתוח",
    ],
    skipHe: "AC/DC, Highway to Hell.",
  },
  {
    progressionId: "pop-d-bm-g-a",
    simpleNameHe: "D → Bm → G → A",
    hearHe: "פופ ב-D — לא אותם אקורדים של C!",
    fretRangeHe: "פריטים 7–10",
    boxNumber: 1,
    playRoot: "B",
    doSteps: [
      "B minor pentatonic — פריטים 7–10",
      "נחיתה על D כשמגיע D",
      "Bm = הרגע הרגשי",
    ],
    skipHe: "שירי פופ ב-D — שונה מ-C-G-Am-F.",
  },
  {
    progressionId: "metal-thrash-power",
    simpleNameHe: "Em → G → A",
    hearHe: "thrash מהיר. E5 G5 A5 בלבד.",
    fretRangeHe: "פריטים 0–5",
    boxNumber: 1,
    playRoot: "E",
    doSteps: [
      "E5 → G5 → A5 — downstrokes מהירים",
      "palm muting חזק",
      "סולו: פריט 12 על מיתר E",
    ],
    skipHe: "Metallica thrash riffs.",
  },
];

export function getPlayGuide(progressionId: string): PlayGuide | undefined {
  return playGuides.find((g) => g.progressionId === progressionId);
}

export function getGenreForProgression(progressionId: string): GenreGroup | undefined {
  return genreGroups.find((g) => g.progressionIds.includes(progressionId));
}

export function getChordSequencePlain(
  progression: Progression,
  key: NoteName
): string {
  return resolveProgressionInKey(progression, key)
    .map((c) => c.chord)
    .join(" → ");
}

export function getChordMood(chord: string): {
  emoji: string;
  label: string;
} {
  if (chord.includes("m") && !chord.includes("maj")) {
    return { emoji: "🌙", label: "עצוב" };
  }
  if (chord.includes("7")) {
    return { emoji: "🔥", label: "בלוזי" };
  }
  return { emoji: "☀️", label: "שמח" };
}

/** הסבר פשוט על "פריטים 5-8" */
export const fretZoneExplainer = {
  title: "מה זה 'פריטים 5–8'?",
  simple:
    "הצוואר של הגיטרה = מיתרים + מספרים (פריטים). פריט 5 = המקום החמישי מהראש. 'פריטים 5–8' = אזור קטן באמצע הצוואר שבו נוח לנגן סולו.",
  notThis:
    "זה לא 5 סולמות שונים! זה אזור אחד על הגיטרה. 5 תווים שחוזרים שם — וכמעט כל מה שצריך לפופ/רוק.",
  howToRead:
    "בטאב: כל שורה = מיתר. המספר = איפה לשים אצבע. למטה = מיתר E עבה, למעלה = מיתר e דק.",
};
