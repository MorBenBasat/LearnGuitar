export interface TheoryTopic {
  id: string;
  title: string;
  emoji: string;
  simple: string;
  analogy: string;
  howToUse: string;
  example: string;
}

export const theoryBasics: TheoryTopic[] = [
  {
    id: "major-minor",
    title: "שמח או עצוב?",
    emoji: "☀️🌙",
    simple:
      "יש שני 'צבעים' במוזיקה: שמח (מז'ור) ועצוב (מינור). זה כמו מזג אוויר — לא צריך לדעת יותר מזה.",
    analogy:
      "נגן אקורד C — נשמע שמח. נגן Am — נשמע עצוב. אותה גיטרה, תחושה אחרת.",
    howToUse:
      "אם השיר נשמע שמח — נגן על התאים המוארים בקופסה 1 של לה (A). אם עצוב — גם לה, אותם תאים.",
    example:
      "C-G-Am-F: שמע את 4 האקורדים, ואז לחץ על תאים בפריטים 5–8.",
  },
  {
    id: "bars",
    title: "מתי מחליפים אקורד?",
    emoji: "📏",
    simple:
      "כל אקורד נמשך כמה פעימות ואז עוברים לבא. ספור: 1-2-3-4 והאקורד מתחלף.",
    analogy:
      "כמו משפט שמסתיים — ואז מתחיל משפט חדש עם אקורד אחר.",
    howToUse:
      "כשהאקורד מתחלף בפרוגרשן — נסה ללחוץ על תא חדש מהמפה. זה 'נחיתה'.",
    example:
      "ב-C-G-Am-F: כל אקורד ≈ 2 שניות בקצב רגיל.",
  },
  {
    id: "boxes",
    title: "מה זה קופסה?",
    emoji: "📦",
    simple:
      "אזור קטן על הצוואר (למשל פריטים 5–8). לא קופסה אמיתית — פשוט מקום שנוח לנגן בו.",
    analogy:
      "הצוואר ארוך. במקום לבלבל את הראש על הכל, מתמקדים באזור אחד קטן.",
    howToUse:
      "קופסה 1 בלה = פריטים 5–8. רק התאים המוארים. שאר הצוואר מעומעם.",
    example:
      "מיתר E (למטה), פריט 5. זה התא הזהב הראשון שלך.",
  },
  {
    id: "improv-start",
    title: "איך מתחילים?",
    emoji: "✨",
    simple: "3 תווים → שקט → 3 תווים. לא צריך יותר.",
    analogy: "שיחה — לא מרצון. משפט קצר, הפסקה, משפט.",
    howToUse:
      "הפעל פרוגרשן, לחץ על 3 תאים מוארים, חכה, עוד 3. 5 דקות ביום.",
    example: "פריט 5 על E, פריט 8 על E, פריט 5 על A — ושקט.",
  },
];

export interface ScaleRunPattern {
  id: string;
  nameHe: string;
  description: string;
  direction: "asc" | "desc" | "both";
}

export const scaleRunPatterns: ScaleRunPattern[] = [
  {
    id: "asc",
    nameHe: "מהנמוך לגבוה",
    description: "עלה על הצוואר — תרגיל בסיסי",
    direction: "asc",
  },
  {
    id: "desc",
    nameHe: "מהגבוה לנמוך",
    description: "ירד — חשוב לא פחות",
    direction: "desc",
  },
  {
    id: "both",
    nameHe: "עלה וירד",
    description: "עולה ויורד חזרה — הקלאסיקה",
    direction: "both",
  },
];
