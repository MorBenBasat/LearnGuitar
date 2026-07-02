import type { NoteName } from "@/lib/music";
import type { Progression } from "@/data/progressions";
import { resolveProgressionInKey } from "@/data/progressions";

export interface GenreGroup {
  id: string;
  nameHe: string;
  emoji: string;
  descriptionHe: string;
  progressionIds: string[];
}

export const genreGroups: GenreGroup[] = [
  {
    id: "pop-rock",
    nameHe: "פופ / רוק",
    emoji: "🎤",
    descriptionHe: "שירי רדיו, רוק, פופ ישראלי — הכי נפוץ",
    progressionIds: [
      "one-five-six-four",
      "one-six-four-five",
      "six-four-one-five",
    ],
  },
  {
    id: "blues",
    nameHe: "בלוז",
    emoji: "🎷",
    descriptionHe: "בלוז קלאסי, רוק בלוזי, improvisation עם feel",
    progressionIds: ["twelve-bar-blues", "one-four-five"],
  },
  {
    id: "folk",
    nameHe: "פולק / קלאסי",
    emoji: "🪕",
    descriptionHe: "שלושה אקורדים פשוטים, שירים עם גיטרה אקוסטית",
    progressionIds: ["one-four-five"],
  },
  {
    id: "jazz",
    nameHe: "ג'אז",
    emoji: "🎹",
    descriptionHe: "מתוחכם יותר — אחרי שמרגיש בנוח בפופ",
    progressionIds: ["two-five-one"],
  },
  {
    id: "mizrahi",
    nameHe: "מזרחי / בלדה",
    emoji: "🌙",
    descriptionHe: "שירים רגשיים, מזרחי, בלדות",
    progressionIds: ["six-four-one-five", "one-six-four-five"],
  },
];

export interface PlayGuide {
  progressionId: string;
  /** שם פשוט בלי רומי */
  simpleNameHe: string;
  /** מה תשמע */
  hearHe: string;
  /** איפה על הצוואר — פריטים */
  fretRangeHe: string;
  /** איזה אזור (קופסה) */
  boxNumber: 1 | 2 | 3;
  /** שורש לנגינה על הצוואר */
  playRoot: NoteName;
  /** מה לעשות — צעדים */
  doSteps: string[];
  /** מה לא לדאוג */
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
      "כשמגיע Am — נסה פריט 5 על מיתר A",
    ],
    skipHe: "אל תדאג מ-I V vi IV — זה רק שמות מוזיקאים. האקורדים: C G Am F.",
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
    skipHe: "שירים כמו Despacito, Africa — אותו רעיון.",
  },
  {
    progressionId: "one-four-five",
    simpleNameHe: "G → C → D",
    hearHe: "שלושה אקורדים שמחים. רוק, פולק, בלוז.",
    fretRangeHe: "פריטים 3–6",
    boxNumber: 1,
    playRoot: "G",
    doSteps: [
      "אזור נמוך יותר — פריט 3 על מיתר E (למטה)",
      "נגן: 3 → 5 → 3 על מיתר E",
      "call & response: משפט קצר, שקט, משפט",
    ],
    skipHe: "La Bamba, Wild Thing — אותו פרוגרשן.",
  },
  {
    progressionId: "twelve-bar-blues",
    simpleNameHe: "בלוז 12 תיבות (A7 → D7 → A7...)",
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
    skipHe: "12 תיבות = האורך של הסיבוב. לא חשוב עכשיו.",
  },
  {
    progressionId: "two-five-one",
    simpleNameHe: "Dm7 → G7 → C",
    hearHe: "ג'אז. מתוחכם — תתרגל אחרי פופ.",
    fretRangeHe: "פריטים 5–12 (כל הצוואר)",
    boxNumber: 2,
    playRoot: "C",
    doSteps: [
      "נגן בפריטים 5–8 על מיתר E ומעלה",
      "פשוט: 3–4 תווים, הרבה שקט",
      "אחר כך תלמד arpeggios — לא עכשיו",
    ],
    skipHe: "ג'אז = שלב מתקדם. תתחיל מפופ.",
  },
  {
    progressionId: "one-six-four-five",
    simpleNameHe: "C → Am → F → G",
    hearHe: "שנות ה-50, דו-וופ, מזרחי. שמח עם רגע עצוב.",
    fretRangeHe: "פריטים 5–8",
    boxNumber: 1,
    playRoot: "A",
    doSteps: [
      "אותו אזור כמו C-G-Am-F",
      "מלודיה פשוטה — כמו שירה",
      "3 תווים → שקט → 3 תווים",
    ],
    skipHe: "Stand By Me — אותו סוג שיר.",
  },
];

export function getPlayGuide(progressionId: string): PlayGuide | undefined {
  return playGuides.find((g) => g.progressionId === progressionId);
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
