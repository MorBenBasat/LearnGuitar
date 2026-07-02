/** מעבדת לימוד — הכל דרך שיר אחד: C → G → Am → F */

import type { NoteName } from "@/lib/music";

export interface SongChord {
  symbol: string;
  nameHe: string;
  mood: "שמח" | "עצוב";
  emoji: string;
  /** הסבר בלי תיאוריה */
  plainHe: string;
}

export const referenceSong = {
  title: "פרוגרשן הפופ",
  subtitle: "השיר שמלמד הכל — C, G, Am, F",
  key: "C" as NoteName,
  /** איפה לנגן סולו על הצוואר (לא אותו אות כמו השיר!) */
  soloArea: "A" as NoteName,
  soloAreaHe: "לה (A)",
  progressionId: "one-five-six-four",
  chords: [
    {
      symbol: "C",
      nameHe: "דו",
      mood: "שמח",
      emoji: "☀️",
      plainHe: "אקורד שמח. מרגיש כמו 'הבית' — הכל בסדר.",
    },
    {
      symbol: "G",
      nameHe: "סול",
      mood: "שמח",
      emoji: "☀️",
      plainHe: "גם שמח. דוחף את השיר קדימה.",
    },
    {
      symbol: "Am",
      nameHe: "לה מינור",
      mood: "עצוב",
      emoji: "🌙",
      plainHe:
        "האות m = מינור = עצוב. Am נשמע רגשי. C נשמע שמח — אותה גיטרה, צליל אחר.",
    },
    {
      symbol: "F",
      nameHe: "פה",
      mood: "שמח",
      emoji: "☀️",
      plainHe: "שמח ופתוח. מכין לחזרה ל-C.",
    },
  ] satisfies SongChord[],
};

export interface TabLick {
  id: string;
  nameHe: string;
  descriptionHe: string;
  /** מתי להשתמש */
  whenHe: string;
  positions: { stringIndex: number; fret: number }[];
}

/** שילובי טאב נפוצים — אזור 1 (פריטים 5–8) מעל שיר ב-C */
export const commonTabLicks: TabLick[] = [
  {
    id: "starter",
    nameHe: "משפט פתיחה — 8 תווים",
    descriptionHe:
      "המשפט הכי בסיסי. תלמד אותו בעל פה — ואז שנה תו אחד בכל פעם. לא 3 תווים!",
    whenHe: "על כל 4 האקורדים. תמיד עובד.",
    positions: [
      { stringIndex: 0, fret: 5 },
      { stringIndex: 0, fret: 8 },
      { stringIndex: 0, fret: 5 },
      { stringIndex: 1, fret: 5 },
      { stringIndex: 1, fret: 7 },
      { stringIndex: 1, fret: 5 },
      { stringIndex: 2, fret: 5 },
      { stringIndex: 2, fret: 7 },
    ],
  },
  {
    id: "short",
    nameHe: "שאלה ותשובה — 8 תווים",
    descriptionHe:
      "4 תווים 'שואלים' → שקט → 4 תווים 'עונים'. זה הבסיס של אלתור אמיתי.",
    whenHe: "אחרי שהרגעת עם המשפט הראשון.",
    positions: [
      { stringIndex: 5, fret: 5 },
      { stringIndex: 5, fret: 8 },
      { stringIndex: 5, fret: 5 },
      { stringIndex: 4, fret: 5 },
      { stringIndex: 4, fret: 8 },
      { stringIndex: 4, fret: 5 },
      { stringIndex: 3, fret: 5 },
      { stringIndex: 3, fret: 7 },
    ],
  },
  {
    id: "descend",
    nameHe: "יורד ונחת — 10 תווים",
    descriptionHe: "יורד מהגבוה לנמוך. נשמע כמו סיום משפט לפני החלפת אקורד.",
    whenHe: "לפני שהאקורד מתחלף — 'נחיתה רכה'.",
    positions: [
      { stringIndex: 5, fret: 8 },
      { stringIndex: 5, fret: 5 },
      { stringIndex: 4, fret: 8 },
      { stringIndex: 4, fret: 5 },
      { stringIndex: 3, fret: 7 },
      { stringIndex: 3, fret: 5 },
      { stringIndex: 2, fret: 7 },
      { stringIndex: 2, fret: 5 },
      { stringIndex: 1, fret: 5 },
      { stringIndex: 0, fret: 5 },
    ],
  },
  {
    id: "high-e",
    nameHe: "נחיתה על Am — 5 תווים",
    descriptionHe:
      "מיועד לרגע ש-Am מגיע — התו האחרון (פריט 5, מיתר E) = נחיתה רגשית.",
    whenHe: "בדיוק כשהאקורד מתחלף ל-Am.",
    positions: [
      { stringIndex: 0, fret: 8 },
      { stringIndex: 0, fret: 5 },
      { stringIndex: 1, fret: 7 },
      { stringIndex: 1, fret: 5 },
      { stringIndex: 0, fret: 5 },
    ],
  },
];

export interface BoxLesson {
  number: 1 | 2 | 3 | 4 | 5;
  fretRange: string;
  plainHe: string;
  forSongsHe: string;
  feelHe: string;
  /** מתאים לשיר C-G-Am-F? */
  fitsPopSong: boolean;
}

export const boxLessons: BoxLesson[] = [
  {
    number: 1,
    fretRange: "5–8",
    plainHe: "אזור נמוך על הצוואר. הכי נוח להתחיל. רוב הסולואים מתחילים פה.",
    forSongsHe: "פופ, רוק, בלוז — כולל C-G-Am-F",
    feelHe: "חם, נוח, קל",
    fitsPopSong: true,
  },
  {
    number: 2,
    fretRange: "7–10",
    plainHe: "קצת יותר גבוה מקופסה 1. אותם תווים, מיקום אחר.",
    forSongsHe: "כשמרגיש בנוח בקופסה 1",
    feelHe: "זורם, מחבר בין אזורים",
    fitsPopSong: true,
  },
  {
    number: 3,
    fretRange: "9–12",
    plainHe: "אמצע הצוואר. נשמע 'יותר גיטרה' — חד וברור.",
    forSongsHe: "סולואים בולטים, רוק, שירים עם פארט גיטרה",
    feelHe: "חד, גבוה, בולט",
    fitsPopSong: true,
  },
  {
    number: 4,
    fretRange: "12–15",
    plainHe: "גבוה. לסולואים ארוכים ומרשימים.",
    forSongsHe: "רוק, מטאל, סולואים גבוהים",
    feelHe: "חד מאוד, דרמטי",
    fitsPopSong: true,
  },
  {
    number: 5,
    fretRange: "14–17",
    plainHe: "הכי גבוה. לסולואים גבוהים ורגשיים.",
    forSongsHe: "רוק קלאסי, בלוז גבוה",
    feelHe: "גבוה, רגשי, Hendrix",
    fitsPopSong: true,
  },
];

export const improvRecipe = {
  title: "מתכון לאלתור על C-G-Am-F",
  steps: [
    "הפעל את השיר ברקע (C → G → Am → F)",
    "בחר קופסה 1 (פריטים 5–8)",
    "נגן 'משפט פתיחה' (8 תווים) — שמע ואז חזור",
    "שקט 2 שניות",
    "נגן 'שאלה ותשובה' — 8 תווים נוספים",
    "כשמגיע Am — נגן 'נחיתה על Am' (5 תווים)",
    "חזור 5 דקות. מחר — שנה תו אחד בכל משפט",
  ],
  goldenRule:
    "השיר ב-C. הנגן בפריטים 5–8 (אזור של A). זה לא אותו אות — אבל זה מה שעובד.",
};
