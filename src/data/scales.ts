import type { NoteName } from "@/lib/music";

export interface ScaleInfo {
  id: string;
  name: string;
  nameHe: string;
  intervals: number[];
  degrees: string[];
  description: string;
  whenToUse: string;
  improvTips: string[];
  color: string;
}

export const scales: ScaleInfo[] = [
  {
    id: "major",
    name: "Major (Ionian)",
    nameHe: "מז'ור (איוניאן)",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: ["1", "2", "3", "4", "5", "6", "7"],
    description: "הסולם הבסיסי — שמח, בהיר, יציב.",
    whenToUse: "על פרוגרשנים מז'וריים: I-IV-V, I-V-vi-IV, וכו'.",
    improvTips: [
      "נגן על 2-3 מיתרים בלבד — לא חייב את כל הצוואר",
      "הדגש את התו השלישי והחמישי (3 ו-5) — הם 'מגדירים' את הצליל",
      "הימנע מ-4 על אקורד מז'ורי — לפעמים נשמע מתוח",
    ],
    color: "#f59e0b",
  },
  {
    id: "natural-minor",
    name: "Natural Minor (Aeolian)",
    nameHe: "מינור טבעי (איוליאן)",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: ["1", "b2", "b3", "4", "5", "b6", "b7"],
    description: "צליל עצוב, רגשי, רוקי.",
    whenToUse: "כשהפרוגרשן מתחיל ב-vi, או על שירים מינוריים.",
    improvTips: [
      "ה-b3 וה-b7 הם התווים הכי 'מינוריים' — הדגש אותם",
      "עובד מעולה על vi-IV-I-V",
      "נסה bend מ-b3 ל-3 כשעוברים לאקורד מז'ורי",
    ],
    color: "#8b5cf6",
  },
  {
    id: "pentatonic-minor",
    name: "Minor Pentatonic",
    nameHe: "פנטטוני מינור",
    intervals: [0, 3, 5, 7, 10],
    degrees: ["1", "b3", "4", "5", "b7"],
    description: "5 תווים בלבד — הכי קל להתחיל איתו אלתור. הבסיס של כל סולו רוק/בלוז.",
    whenToUse: "בלוז, רוק, מטאל. על כמעט כל פרוגרשן מז'ורי (relative minor).",
    improvTips: [
      "ב-C major: נגן A minor pentatonic — אותם תווים!",
      "Box 1: פריטים 5-8 על מיתר E — התחל כאן",
      "אין תווים 'רעים' — כל תו בסולם עובד",
      "הוסף bending על b3 ו-b7 לרגש",
      "פחות = יותר. 4 תווים טובים > 20 תווים מהירים",
    ],
    color: "#ef4444",
  },
  {
    id: "pentatonic-major",
    name: "Major Pentatonic",
    nameHe: "פנטטוני מז'ור",
    intervals: [0, 2, 4, 7, 9],
    degrees: ["1", "2", "3", "5", "6"],
    description: "צליל שמח ופשוט — אין 4 ו-7 אז קשה לטעות.",
    whenToUse: "קאנטרי, פופ, מלודיות שמחות.",
    improvTips: [
      "נשמע 'נקי' יותר ממינור פנטטוני",
      "מעולה על I-IV-V",
      "נסה לנגן מלודיות שירה — פשוט וזכורים",
    ],
    color: "#22c55e",
  },
  {
    id: "blues",
    name: "Blues Scale",
    nameHe: "סולם בלוז",
    intervals: [0, 3, 5, 6, 7, 10],
    degrees: ["1", "b3", "4", "b5", "5", "b7"],
    description: "פנטטוני מינור + b5 (ה'תו הכחול'). הצליל האולטימטיבי לבלוז.",
    whenToUse: "בלוז, רוק בלוזי, improvisation עם attitude.",
    improvTips: [
      "ה-b5 (blue note) — נגן אותו ואז slide ל-4 או 5",
      "שלב bending, vibrato, ושקט",
      "על A7: A blues scale = A-C-D-Eb-E-G",
      "ה-b5 יוצר מתח שמתפקד כ-chromatic passing tone",
    ],
    color: "#3b82f6",
  },
  {
    id: "dorian",
    name: "Dorian",
    nameHe: "דוריאן",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degrees: ["1", "2", "b3", "4", "5", "6", "b7"],
    description: "מינור עם 6 מז'ורי — צליל 'פאנקי' וג'אזי.",
    whenToUse: "פאנק, ג'אז, רוק (Smoke on the Water). על ii באקורדים מז'וריים.",
    improvTips: [
      "ה-6 מז'ורי מבדיל אותו ממינור טבעי — הדגש אותו",
      "על Dm7 ב-ii-V-I: D dorian עובד מושלם",
    ],
    color: "#ec4899",
  },
];

export const cagedPositions = [
  {
    name: "Box 1",
    nameHe: "קופסה 1",
    rootString: 6,
    rootFret: 5,
    description: "הכי נפוצה — שורש על מיתר E כבד, פריט 5 (A) או 8 (C)",
  },
  {
    name: "Box 2",
    nameHe: "קופסה 2",
    rootString: 4,
    rootFret: 5,
    description: "שורש על מיתר D — ממשיכה מ-Box 1",
  },
  {
    name: "Box 3",
    nameHe: "קופסה 3",
    rootString: 3,
    rootFret: 5,
    description: "שורש על מיתר G — אזור אמצע הצוואר",
  },
  {
    name: "Box 4",
    nameHe: "קופסה 4",
    rootString: 2,
    rootFret: 5,
    description: "שורש על מיתר B — גבוה יותר",
  },
  {
    name: "Box 5",
    nameHe: "קופסה 5",
    rootString: 1,
    rootFret: 5,
    description: "שורש על מיתר E דק — הכי גבוה",
  },
];

export const defaultScaleRoot: NoteName = "A";
