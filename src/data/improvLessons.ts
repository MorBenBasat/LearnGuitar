/** שיעורי אלתור מלאים — טאב, אקורדים, ואיך לשלב מלודיה עם השיר */

import type { NoteName } from "@/lib/music";
import type { TabLick } from "@/data/songLab";

export interface ChordTarget {
  chordSymbol: string;
  moodHe: string;
  emoji: string;
  landOn: { stringIndex: number; fret: number; noteHe: string }[];
  /** איך לגשת — מה לעשות כשהאקורד הזה מתנגן */
  approachHe?: string;
  tipHe: string;
}

export interface ProgressionImprovLesson {
  progressionId: string;
  /** הסבר פשוט — למה הסולם הזה */
  whyScaleHe: string;
  /** איך לשלב מלודיה עם נגינה מעל השיר */
  melodyOverChordsHe: string[];
  /** על כל אקורד — איפה לנחות */
  chordTargets: ChordTarget[];
  /** שילובי טאב מלאים (לא 3 תווים!) */
  tabLicks: TabLick[];
  /** תרגיל מונחה צעד-אחר-צעד */
  guidedExercise: string[];
}

/** הסבר הכלל הזהב — מורחב */
export const goldenRuleTeaching = {
  title: "למה השיר ב-C ואתה נוגן ב-A?",
  paragraphs: [
    "השיר (האקורדים) אומר לך באיזו טונאליות אתה — C מז'ור, G, Am, F.",
    "הסולו לא חייב להתחיל מאותו אות! רוב הגיטריסטים נוגנים פנטטוני מינור של A מעל שיר ב-C.",
    "למה? כי Am הוא האקורד הרגשי בשיר (vi). 5 התווים של A minor pentatonic = אותם תווים כמו C major pentatonic — אבל נוח יותר על הצוואר.",
    "זה לא 'טעות' — זה מה שכולם עושים. Hendrix, Clapton, כולם.",
  ],
  practical:
    "בפועל: שמע את האקורדים ברקע → נגן בפריטים 5–8 → נחית על תו שמתאים לאקורד הנוכחי.",
};

/** איך לשלב מלודיה עם נגינה — המושג שהמשתמש לא מבין */
export const melodyCombiningGuide = {
  title: "איך לשלב מלודיה עם השיר?",
  steps: [
    {
      title: "שלב 1: שמע את האקורדים",
      body: "הפעל את השיר ברקע. ספור 1-2-3-4. כל 4 פעימות האקורד מתחלף. תזהה מתי מגיע C, מתי G, מתי Am.",
    },
    {
      title: "שלב 2: נגן 'משפטים' קצרים",
      body: "אל תנגן רצף ארוך. נגן 4-8 תווים → שקט 2 שניות → עוד 4-8 תווים. כמו שיחה: מישהו מדבר, מחכים, מישהו עונה.",
    },
    {
      title: "שלב 3: נחית על האקורד",
      body: "כשהאקורד מתחלף — נסה שהתו האחרון שלך יהיה אחד מהפריטים המומלצים (ראה למטה). זה נותן תחושה ש'אתה יודע מה אתה עושה'.",
    },
    {
      title: "שלב 4: חזור על ליק אחד",
      body: "בחר שילוב טאב אחד מהרשימה. שמע אותו 3 פעמים. נסה לחזור. ואז נסה לשנות תו אחד — זה כבר אלתור.",
    },
    {
      title: "שלב 5: מלודיה + שקט = סולו",
      body: "השיר ממשיך לנגן (אקורדים). אתה נכנס רק ב'חלונות' — כשיש שקט או כשאתה רוצה להדגיש. לא צריך למלא הכל.",
    },
  ],
};

export const progressionImprovLessons: ProgressionImprovLesson[] = [
  {
    progressionId: "one-five-six-four",
    whyScaleHe:
      "השיר ב-C מז'ור. נגן A minor pentatonic (פריטים 5–8). Am הוא האקורד הרגשי — ו-A הוא השורש שלו. 5 תווים, כמעט בלתי אפשרי לטעות.",
    melodyOverChordsHe: [
      "השיר = 4 אקורדים שחוזרים. אתה = משפטים קצרים מעליהם.",
      "כש-C נוגן: נגן חופשי, נחית על פריט 5 (מיתר A) או 8 (מיתר E למטה).",
      "כש-Am מגיע: זה הרגע הרגשי — נחית על פריט 5 (מיתר E) או 7 (מיתר D).",
      "אל תמלא הכל — 50% שקט, 50% נגינה. זה נשמע כמו סולו אמיתי.",
    ],
    chordTargets: [
      {
        chordSymbol: "C",
        moodHe: "שמח — הבית",
        emoji: "☀️",
        landOn: [
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
          { stringIndex: 0, fret: 8, noteHe: "דו (C)" },
          { stringIndex: 2, fret: 7, noteHe: "מי (E)" },
        ],
        approachHe:
          "שומע C? זה 'הבית'. נגן 4-8 תווים חופשיים בפריטים 5-8. סיים על פריט 5 מיתר A (= דו) — נשמע כאילו אתה יודע מה אתה עושה.",
        tipHe: "C = הבית. פריט 5 על מיתר A — הכי בטוח.",
      },
      {
        chordSymbol: "G",
        moodHe: "שמח — דוחף קדימה",
        emoji: "☀️",
        landOn: [
          { stringIndex: 3, fret: 5, noteHe: "סול (G)" },
          { stringIndex: 1, fret: 7, noteHe: "רה (D)" },
        ],
        approachHe:
          "שומע G? האקורד 'דוחף'. נגן משפט קצר, סיים על פריט 5 מיתר G (= סול).",
        tipHe: "G = מתח. פריט 5 על מיתר G נשמע 'נפתר'.",
      },
      {
        chordSymbol: "Am",
        moodHe: "עצוב — הרגע הרגשי",
        emoji: "🌙",
        landOn: [
          { stringIndex: 0, fret: 5, noteHe: "לה (A)" },
          { stringIndex: 2, fret: 7, noteHe: "מי (E)" },
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
        ],
        approachHe:
          "שומע Am? זה הרגע הרגשי בשיר! נגן לאט. סיים על פריט 5 מיתר E למטה (= לה) — הכי מרגיש 'עצוב'.",
        tipHe: "Am = הלב של השיר. פריט 5 על מיתר E למטה — נשמע הכי רגשי.",
      },
      {
        chordSymbol: "F",
        moodHe: "שמח — פתיחה",
        emoji: "☀️",
        landOn: [
          { stringIndex: 2, fret: 8, noteHe: "פה (F)" },
          { stringIndex: 0, fret: 8, noteHe: "דו (C)" },
        ],
        approachHe:
          "שומע F? לפני חזרה ל-C. סיים על פריט 8 מיתר D (= פה) או פריט 8 מיתר E (= דו).",
        tipHe: "F = לפני חזרה ל-C. פריט 8 על מיתר D.",
      },
    ],
    tabLicks: [
      {
        id: "pop-starter-8",
        nameHe: "משפט פתיחה — 8 תווים",
        descriptionHe:
          "המשפט הכי בסיסי שקיים. תלמד אותו בעל פה — ואז שנה תו אחד בכל פעם.",
        whenHe: "על כל 4 האקורדים. התחל מכאן.",
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
        id: "pop-call-response",
        nameHe: "שאלה ותשובה",
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
        id: "pop-am-landing",
        nameHe: "נחיתה על Am",
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
      {
        id: "pop-descend-full",
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
    ],
    guidedExercise: [
      "הפעל את C → G → Am → F ברקע",
      "שמע 2 סיבובים בלי לנגן — רק ספור את האקורדים",
      "נגן 'משפט פתיחה' פעם אחת על C",
      "שקט עד ש-Am מגיע → נגן 'נחיתה על Am'",
      "שקט 4 פעימות",
      "נגן 'שאלה ותשובה' — חצי על G, חצי על F",
      "חזור 5 דקות. מחר — שנה תו אחד בכל משפט.",
    ],
  },
  {
    progressionId: "six-four-one-five",
    whyScaleHe:
      "מתחיל ב-Am — הטונאליות הרגשית היא A מינור. נגן A natural minor או A minor pentatonic. אותו אזור (פריטים 5–8).",
    melodyOverChordsHe: [
      "השיר פותח עצוב (Am) — זה הזמן שלך להיכנס ראשון.",
      "כש-F מגיע — נפתח קצת. נחית על פריט 8 (מיתר D) = פה.",
      "C = הקלה. G = דחף לסיום. נגן פחות על Am, יותר על C-G.",
    ],
    chordTargets: [
      {
        chordSymbol: "Am",
        moodHe: "עצוב — פותח",
        emoji: "🌙",
        landOn: [
          { stringIndex: 0, fret: 5, noteHe: "לה (A)" },
          { stringIndex: 2, fret: 7, noteHe: "מי (E)" },
        ],
        tipHe: "Am פותח — נכנס פה עם פריט 5 על מיתר E.",
      },
      {
        chordSymbol: "F",
        moodHe: "נפתח",
        emoji: "☀️",
        landOn: [
          { stringIndex: 2, fret: 8, noteHe: "פה (F)" },
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
        ],
        tipHe: "F = מעבר. פריט 8 על מיתר D.",
      },
      {
        chordSymbol: "C",
        moodHe: "שמח — הקלה",
        emoji: "☀️",
        landOn: [
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
          { stringIndex: 0, fret: 8, noteHe: "דו (C)" },
        ],
        tipHe: "C = נשימה. נגן מלודיה שירתית.",
      },
      {
        chordSymbol: "G",
        moodHe: "דוחף",
        emoji: "☀️",
        landOn: [
          { stringIndex: 3, fret: 5, noteHe: "סול (G)" },
          { stringIndex: 1, fret: 7, noteHe: "רה (D)" },
        ],
        tipHe: "G לפני חזרה ל-Am — פריט 5 על מיתר G.",
      },
    ],
    tabLicks: [
      {
        id: "emotional-open",
        nameHe: "פתיחה רגשית",
        descriptionHe: "מתאים ל-Am בפתיחה. איטי, רגשי.",
        whenHe: "כשהשיר מתחיל ב-Am.",
        positions: [
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 1, fret: 7 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 2, fret: 5 },
          { stringIndex: 2, fret: 7 },
        ],
      },
      {
        id: "emotional-lift",
        nameHe: "עלייה ל-C",
        descriptionHe: "עולה מעצוב לשמח — מ-Am ל-C.",
        whenHe: "במעבר מ-Am/F ל-C.",
        positions: [
          { stringIndex: 2, fret: 5 },
          { stringIndex: 2, fret: 7 },
          { stringIndex: 2, fret: 8 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 5 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל Am → F → C → G",
      "סיבוב 1: רק 'פתיחה רגשית' על Am",
      "סיבוב 2: שקט על F, נגן על C",
      "סיבוב 3: 'עלייה ל-C' על המעבר",
      "נסה לזהות מתי Am חוזר — נחית על פריט 5",
    ],
  },
  {
    progressionId: "one-four-five",
    whyScaleHe:
      "שלושה אקורדים מז'וריים ב-G. נגן G major pentatonic (פריטים 3–6). צליל שמח, רוקי, פשוט.",
    melodyOverChordsHe: [
      "G → C → D = הכי פשוט. נגן באזור נמוך (פריטים 3–6).",
      "על G: פריט 3 על מיתר E = הבית.",
      "על C: פריט 5 על מיתר A.",
      "על D: פריט 5 על מיתר D או 7 על מיתר A.",
    ],
    chordTargets: [
      {
        chordSymbol: "G",
        moodHe: "בית",
        emoji: "☀️",
        landOn: [
          { stringIndex: 0, fret: 3, noteHe: "סול (G)" },
          { stringIndex: 3, fret: 0, noteHe: "סול (G)" },
        ],
        tipHe: "פריט 3 על מיתר E = הבית שלך.",
      },
      {
        chordSymbol: "C",
        moodHe: "פתיחה",
        emoji: "☀️",
        landOn: [
          { stringIndex: 1, fret: 3, noteHe: "דו (C)" },
          { stringIndex: 2, fret: 5, noteHe: "דו (C)" },
        ],
        tipHe: "פריט 3 על מיתר A.",
      },
      {
        chordSymbol: "D",
        moodHe: "מתח",
        emoji: "🔥",
        landOn: [
          { stringIndex: 2, fret: 5, noteHe: "רה (D)" },
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
        ],
        tipHe: "D = פריט 5 על מיתר D.",
      },
    ],
    tabLicks: [
      {
        id: "rock-g-riff",
        nameHe: "ריף G קלאסי",
        descriptionHe: "3-5-3 על מיתר E — הבסיס של רוק ופולק.",
        whenHe: "על G. גם עובד על C ו-D.",
        positions: [
          { stringIndex: 0, fret: 3 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 3 },
          { stringIndex: 1, fret: 3 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 1, fret: 3 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 3 },
        ],
      },
      {
        id: "rock-turnaround",
        nameHe: "סיום סיבוב",
        descriptionHe: "לפני חזרה ל-G. נשמע כמו 'סיימתי משפט'.",
        whenHe: "על D, לפני חזרה ל-G.",
        positions: [
          { stringIndex: 2, fret: 5 },
          { stringIndex: 2, fret: 7 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 1, fret: 3 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 3 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל G → C → D",
      "נגן 'ריף G' על כל אקורד — שים לב שזה עובד!",
      "על D בלבד: נגן 'סיום סיבוב'",
      "call & response: משפט → שקט → משפט",
    ],
  },
  {
    progressionId: "twelve-bar-blues",
    whyScaleHe:
      "בלוז ב-A. נגן A blues scale (פנטטוני + b5). פריטים 5–8. פחות תווים, יותר feel. bending אם יודע.",
    melodyOverChordsHe: [
      "A7 = 4 תיבות — יש לך זמן. נגן 2-4 תווים, שקט.",
      "D7 = 2 תיבות — נחית על D (פריט 5 על מיתר A או 7 על מיתר E).",
      "E7 = תיבה אחת לפני חזרה — הדגש חזק!",
    ],
    chordTargets: [
      {
        chordSymbol: "A7",
        moodHe: "בלוזי — בית",
        emoji: "🔥",
        landOn: [
          { stringIndex: 0, fret: 5, noteHe: "לה (A)" },
          { stringIndex: 0, fret: 8, noteHe: "דו (C)" },
        ],
        tipHe: "פריט 5 על מיתר E = הבית של הבלוז.",
      },
      {
        chordSymbol: "D7",
        moodHe: "בלוזי — משנה",
        emoji: "🔥",
        landOn: [
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
          { stringIndex: 0, fret: 10, noteHe: "רה (D)" },
        ],
        tipHe: "עובר ל-D7 — פריט 5 על מיתר A.",
      },
      {
        chordSymbol: "E7",
        moodHe: "מתח — turnaround",
        emoji: "🔥",
        landOn: [
          { stringIndex: 0, fret: 12, noteHe: "מי (E)" },
          { stringIndex: 2, fret: 9, noteHe: "מי (E)" },
        ],
        tipHe: "E7 קצר — נגן חזק ונחת.",
      },
    ],
    tabLicks: [
      {
        id: "blues-lick-1",
        nameHe: "ליק בלוז קלאסי",
        descriptionHe: "הליק הראשון שכל בלוזמן לומד. איטי!",
        whenHe: "על A7. גם על D7.",
        positions: [
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 1, fret: 7 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 0, fret: 7 },
          { stringIndex: 0, fret: 5 },
        ],
      },
      {
        id: "blues-lick-2",
        nameHe: "עם b5 (התו הכחול)",
        descriptionHe: "פריט 6 על מיתר G = הצליל הכחול של הבלוז.",
        whenHe: "על A7, לפני מעבר ל-D7.",
        positions: [
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 3, fret: 6 },
          { stringIndex: 3, fret: 5 },
          { stringIndex: 2, fret: 7 },
          { stringIndex: 2, fret: 5 },
          { stringIndex: 0, fret: 5 },
        ],
      },
      {
        id: "blues-turn",
        nameHe: "turnaround",
        descriptionHe: "בסוף 12 התיבות — לפני חזרה ל-A7.",
        whenHe: "על E7 → A7.",
        positions: [
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 7 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 1, fret: 7 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 0, fret: 5 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל בלוז 12 תיבות — איטי (BPM 80)",
      "4 תיבות A7: ליק בלוז קלאסי, פעם אחת",
      "2 תיבות D7: שקט או תו אחד",
      "2 תיבות A7: ליק עם b5",
      "E7: turnaround",
      "חזור. הוסף bending על פריט 8→7 אם יודע.",
    ],
  },
  {
    progressionId: "two-five-one",
    whyScaleHe:
      "ג'אז ב-C. נגן C major (7 תווים) או D dorian על Dm7. פריטים 5–12. פחות תווים, הרבה שקט.",
    melodyOverChordsHe: [
      "Dm7 → G7 → Cmaj7. כל אקורד = צבע אחר.",
      "על Dm7: נגן בפריטים 5–8 (D dorian).",
      "על G7: נחית על B (פריט 4 על מיתר G).",
      "על Cmaj7: נחית על C (פריט 5 על מיתר A) — סיום רך.",
    ],
    chordTargets: [
      {
        chordSymbol: "Dm7",
        moodHe: "ג'אזי — מכין",
        emoji: "🎹",
        landOn: [
          { stringIndex: 2, fret: 5, noteHe: "רה (D)" },
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
        ],
        approachHe:
          "שומע Dm7? נגן 3–4 תווים חופשיים בפריטים 5–8. אל תמלא — רק משפט קצר. סיים על פריט 5 מיתר D (= רה, שורש של Dm7).",
        tipHe: "Dm7 = ההתחלה. פשוט ואיטי.",
      },
      {
        chordSymbol: "G7",
        moodHe: "מתח — רוצה לרדת ל-C",
        emoji: "🎹",
        landOn: [
          { stringIndex: 3, fret: 4, noteHe: "סי (B)" },
          { stringIndex: 3, fret: 5, noteHe: "סול (G)" },
        ],
        approachHe:
          "שומע G7? זה האקורד ש'דוחף' ל-C. נגן פחות תווים — 2-3 בלבד. סיים על פריט 4 מיתר G (= סי/B). זה התו שמוביל לדו.",
        tipHe: "B על G7 = הצליל שאומר 'עכשיו C'.",
      },
      {
        chordSymbol: "Cmaj7",
        moodHe: "פתרון — רך",
        emoji: "🎹",
        landOn: [
          { stringIndex: 1, fret: 5, noteHe: "דו (C)" },
          { stringIndex: 0, fret: 8, noteHe: "דו (C)" },
        ],
        approachHe:
          "שומע Cmaj7? הגעת 'הביתה'. נחיתה רכה על דו — פריט 5 מיתר A. אפשר לשקט ולתת לאקורד לנגן.",
        tipHe: "Cmaj7 = סיום. נשימה.",
      },
    ],
    tabLicks: [
      {
        id: "jazz-simple",
        nameHe: "ג'אז פשוט",
        descriptionHe: "4 תווים, הרבה ריווח. לא ממהר.",
        whenHe: "על Dm7 או Cmaj7.",
        positions: [
          { stringIndex: 2, fret: 5 },
          { stringIndex: 2, fret: 7 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 1, fret: 8 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 5 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל Dm7 → G7 → Cmaj7 לאט",
      "Dm7: 4 תווים מ'ג'אז פשוט'",
      "שקט על G7",
      "Cmaj7: נחית על פריט 5 (מיתר A)",
      "זה שלב מתקדם — אל תדאג אם קשה. חזור לפופ קודם.",
    ],
  },
  {
    progressionId: "one-six-four-five",
    whyScaleHe:
      "C → Am → F → G. כמו פופ אבל Am מוקדם יותר. A minor pentatonic (פריטים 5–8) — אותו אזור כמו C-G-Am-F.",
    melodyOverChordsHe: [
      "C שמח → Am עצוב מהר → F פתיחה → G דחף.",
      "הדגש את Am — הוא מגיע שני, מוקדם.",
      "נגן מלודיות שירתיות — חשוב על שירה.",
    ],
    chordTargets: [
      {
        chordSymbol: "C",
        moodHe: "שמח",
        emoji: "☀️",
        landOn: [{ stringIndex: 1, fret: 5, noteHe: "דו (C)" }],
        tipHe: "פתיחה שמחה.",
      },
      {
        chordSymbol: "Am",
        moodHe: "עצוב — מוקדם",
        emoji: "🌙",
        landOn: [{ stringIndex: 0, fret: 5, noteHe: "לה (A)" }],
        tipHe: "Am שני — נכנס מיד.",
      },
      {
        chordSymbol: "F",
        moodHe: "פתיחה",
        emoji: "☀️",
        landOn: [{ stringIndex: 2, fret: 8, noteHe: "פה (F)" }],
        tipHe: "F לפני G.",
      },
      {
        chordSymbol: "G",
        moodHe: "דוחף",
        emoji: "☀️",
        landOn: [{ stringIndex: 3, fret: 5, noteHe: "סול (G)" }],
        tipHe: "G לפני חזרה.",
      },
    ],
    tabLicks: [
      {
        id: "doo-wop",
        nameHe: "מלודיה דו-וופ",
        descriptionHe: "כמו שירת שנות ה-50. פשוט ושירתי.",
        whenHe: "על C ו-Am.",
        positions: [
          { stringIndex: 1, fret: 5 },
          { stringIndex: 1, fret: 8 },
          { stringIndex: 1, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 1, fret: 5 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל C → Am → F → G",
      "זהה מתי Am מגיע (שני!)",
      "נגן 'מלודיה דו-וופ' על C-Am",
      "שקט על F, נגן על G",
    ],
  },
  {
    progressionId: "andalusian-metal",
    whyScaleHe:
      "Am → G → F → E = מינור לגמרי. נגן A natural minor (פריטים 5–8). נחיתות חזקות על שורש כל אקורד.",
    melodyOverChordsHe: [
      "כל אקורד יורד חצי טון — Am→G→F→E.",
      "נגן אגרסיבי, נחיתות חזקות.",
      "E בסוף = הכי דרמטי — פריט 12 על מיתר E.",
    ],
    chordTargets: [
      {
        chordSymbol: "Am",
        moodHe: "מטאל — בית מינור",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 5, noteHe: "לה (A)" }],
        approachHe: "Am מתנגן? התחל כאן. פריט 5 מיתר E = לה. נגן חזק.",
        tipHe: "שורש Am.",
      },
      {
        chordSymbol: "G",
        moodHe: "יורד",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 3, noteHe: "סול (G)" }],
        approachHe: "G מגיע? ירידה מ-Am. סיים על פריט 3 מיתר E.",
        tipHe: "שורש G.",
      },
      {
        chordSymbol: "F",
        moodHe: "ממשיך לרדת",
        emoji: "🤘",
        landOn: [{ stringIndex: 2, fret: 8, noteHe: "פה (F)" }],
        approachHe: "F? עוד ירידה. פריט 8 מיתר D = פה.",
        tipHe: "שורש F.",
      },
      {
        chordSymbol: "E",
        moodHe: "דרמטי — לפני חזרה",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 12, noteHe: "מי (E)" }],
        approachHe: "E = הכי חזק! פריט 12 מיתר E. bending אם יודע.",
        tipHe: "שורש E — turnaround.",
      },
    ],
    tabLicks: [
      {
        id: "metal-andalusian",
        nameHe: "ריף אנדלוסי",
        descriptionHe: "יורד צלע אחר צלע — Stairway style.",
        whenHe: "על Am → G → F → E.",
        positions: [
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 8 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 3 },
          { stringIndex: 2, fret: 8 },
          { stringIndex: 2, fret: 5 },
          { stringIndex: 0, fret: 12 },
          { stringIndex: 0, fret: 5 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל Am → G → F → E",
      "על כל אקורד: נחית על השורש שלו",
      "E: נגן חזק על פריט 12",
      "חזור 5 דקות",
    ],
  },
  {
    progressionId: "metal-em-power",
    whyScaleHe:
      "Em → C → G → D. E minor pentatonic — מיתר E פתוח (פריט 0) ופריט 12. מטאל קלאסי.",
    melodyOverChordsHe: [
      "Em = הבית. מיתר E פתוח = הכי מטאלי.",
      "סולואים מהירים בפריט 12.",
      "נחיתה תמיד על מי (E).",
    ],
    chordTargets: [
      {
        chordSymbol: "Em",
        moodHe: "מטאל — בית",
        emoji: "🤘",
        landOn: [
          { stringIndex: 0, fret: 0, noteHe: "מי (E) פתוח" },
          { stringIndex: 0, fret: 12, noteHe: "מי (E)" },
        ],
        approachHe: "Em? מיתר E פתוח (בלי ללחוץ פריט) = מי. או פריט 12 לסולו גבוה.",
        tipHe: "הבית של המטאל.",
      },
      {
        chordSymbol: "C",
        moodHe: "עומק",
        emoji: "🤘",
        landOn: [{ stringIndex: 1, fret: 3, noteHe: "דו (C)" }],
        approachHe: "C מגיע? פריט 3 מיתר A = דו. נגן מהר, נחית חזק.",
        tipHe: "שורש C.",
      },
      {
        chordSymbol: "G",
        moodHe: "עלייה",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 3, noteHe: "סול (G)" }],
        approachHe: "G? פריט 3 מיתר E.",
        tipHe: "שורש G.",
      },
      {
        chordSymbol: "D",
        moodHe: "דוחף חזרה",
        emoji: "🤘",
        landOn: [{ stringIndex: 2, fret: 5, noteHe: "רה (D)" }],
        approachHe: "D לפני חזרה ל-Em. פריט 5 מיתר D.",
        tipHe: "שורש D.",
      },
    ],
    tabLicks: [
      {
        id: "metal-e-riff",
        nameHe: "סולו Em קלאסי",
        descriptionHe: "מיתר E פתוח + פריט 12. Metallica style.",
        whenHe: "על Em.",
        positions: [
          { stringIndex: 0, fret: 0 },
          { stringIndex: 0, fret: 3 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 12 },
          { stringIndex: 0, fret: 15 },
          { stringIndex: 0, fret: 12 },
          { stringIndex: 0, fret: 0 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל Em → C → G → D",
      "Em: מיתר E פתוח, 3 פעמים",
      "D: פריט 5 מיתר D, ואז חזרה ל-Em",
      "נסה 'סולו Em קלאסי'",
    ],
  },
  {
    progressionId: "rock-e-a-b",
    whyScaleHe: "E → A → B = רוק קלאסי. E major pentatonic. מיתר E פתוח.",
    melodyOverChordsHe: [
      "Power chords: E5 על E, A5 על A, B5 על B.",
      "palm muting על כל downstroke.",
      "סולו: E major pentatonic, פריטים 0–3.",
    ],
    chordTargets: [
      {
        chordSymbol: "E",
        moodHe: "בית",
        emoji: "⚡",
        landOn: [{ stringIndex: 0, fret: 0, noteHe: "מי (E) פתוח" }],
        approachHe: "E? מיתר E פתוח או E5. downstrokes חזקים.",
        tipHe: "הבית.",
      },
      {
        chordSymbol: "A",
        moodHe: "פתיחה",
        emoji: "⚡",
        landOn: [{ stringIndex: 0, fret: 5, noteHe: "לה (A)" }],
        approachHe: "A? פריט 5 מיתר E או A5.",
        tipHe: "שורש A.",
      },
      {
        chordSymbol: "B",
        moodHe: "מתח",
        emoji: "⚡",
        landOn: [{ stringIndex: 0, fret: 7, noteHe: "סי (B)" }],
        approachHe: "B לפני חזרה ל-E. פריט 7 מיתר E.",
        tipHe: "שורש B.",
      },
    ],
    tabLicks: [
      {
        id: "rock-e-riff",
        nameHe: "ריף E קלאסי",
        descriptionHe: "E5 riff — AC/DC style.",
        whenHe: "על E → A → B.",
        positions: [
          { stringIndex: 0, fret: 0 },
          { stringIndex: 0, fret: 2 },
          { stringIndex: 0, fret: 0 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 7 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 0 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל E → A → B",
      "נגן power chords: E5 → A5 → B5",
      "סולו: 'ריף E קלאסי' על E",
    ],
  },
  {
    progressionId: "pop-d-bm-g-a",
    whyScaleHe: "D → Bm → G → A. לא C-G-Am-F! B minor pentatonic בפריטים 7–10.",
    melodyOverChordsHe: [
      "Bm = הרגע הרגשי — נכנס שם.",
      "נחית על D כשמגיע D.",
      "מלודיה שירתית, פשוטה.",
    ],
    chordTargets: [
      {
        chordSymbol: "D",
        moodHe: "שמח",
        emoji: "☀️",
        landOn: [{ stringIndex: 1, fret: 10, noteHe: "רה (D)" }],
        approachHe: "D? פריט 10 מיתר A.",
        tipHe: "הבית.",
      },
      {
        chordSymbol: "Bm",
        moodHe: "עצוב",
        emoji: "🌙",
        landOn: [{ stringIndex: 0, fret: 7, noteHe: "סי (B)" }],
        approachHe: "Bm = רגשי. פריט 7 מיתר E.",
        tipHe: "שורש Bm.",
      },
      {
        chordSymbol: "G",
        moodHe: "פתיחה",
        emoji: "☀️",
        landOn: [{ stringIndex: 1, fret: 5, noteHe: "סול (G)" }],
        approachHe: "G? פריט 5 מיתר A.",
        tipHe: "שורש G.",
      },
      {
        chordSymbol: "A",
        moodHe: "דוחף",
        emoji: "☀️",
        landOn: [{ stringIndex: 1, fret: 7, noteHe: "לה (A)" }],
        approachHe: "A לפני חזרה. פריט 7 מיתר A.",
        tipHe: "שורש A.",
      },
    ],
    tabLicks: [
      {
        id: "pop-d-lick",
        nameHe: "מלודיה ב-D",
        descriptionHe: "ליק פופ ב-D — שונה מ-C.",
        whenHe: "על D ו-Bm.",
        positions: [
          { stringIndex: 1, fret: 10 },
          { stringIndex: 1, fret: 12 },
          { stringIndex: 1, fret: 10 },
          { stringIndex: 0, fret: 7 },
          { stringIndex: 0, fret: 10 },
          { stringIndex: 0, fret: 7 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל D → Bm → G → A",
      "זהה מתי Bm מגיע",
      "נגן 'מלודיה ב-D'",
    ],
  },
  {
    progressionId: "metal-thrash-power",
    whyScaleHe: "Em → G → A. thrash מהיר. E minor pentatonic.",
    melodyOverChordsHe: [
      "E5 → G5 → A5 — downstrokes מהירים.",
      "palm muting חזק.",
      "סולו בפריט 12.",
    ],
    chordTargets: [
      {
        chordSymbol: "Em",
        moodHe: "מטאל",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 0, noteHe: "מי (E)" }],
        approachHe: "Em? E5 עם palm muting.",
        tipHe: "הבית.",
      },
      {
        chordSymbol: "G",
        moodHe: "עלייה",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 3, noteHe: "סול (G)" }],
        approachHe: "G? G5 — פריט 3 מיתר E.",
        tipHe: "G5.",
      },
      {
        chordSymbol: "A",
        moodHe: "שיא",
        emoji: "🤘",
        landOn: [{ stringIndex: 0, fret: 5, noteHe: "לה (A)" }],
        approachHe: "A? A5 — פריט 5 מיתר E. הכי חזק.",
        tipHe: "A5.",
      },
    ],
    tabLicks: [
      {
        id: "thrash-riff",
        nameHe: "ריף thrash",
        descriptionHe: "Em-G-A מהיר. downstrokes.",
        whenHe: "על כל הפרוגרשן.",
        positions: [
          { stringIndex: 0, fret: 0 },
          { stringIndex: 0, fret: 0 },
          { stringIndex: 0, fret: 3 },
          { stringIndex: 0, fret: 3 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 5 },
          { stringIndex: 0, fret: 0 },
        ],
      },
    ],
    guidedExercise: [
      "הפעל Em → G → A",
      "E5 → G5 → A5 עם palm muting",
      "נסה 'ריף thrash'",
    ],
  },
];

export function getImprovLesson(
  progressionId: string
): ProgressionImprovLesson | undefined {
  return progressionImprovLessons.find((l) => l.progressionId === progressionId);
}
