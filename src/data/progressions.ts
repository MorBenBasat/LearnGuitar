import type { NoteName } from "@/lib/music";
import { transposeNote } from "@/lib/music";

export interface ProgressionChord {
  roman: string;
  romanHe: string;
  /** index into MAJOR_SCALE_DEGREES (ignored if semitoneOffset set) */
  degree: number;
  /** semitones from key root — for non-diatonic chords (מטאל, אנדלוסית) */
  semitoneOffset?: number;
  quality: "major" | "minor" | "dom7" | "dim" | "maj7";
  bars: number;
}

export interface Progression {
  id: string;
  name: string;
  nameHe: string;
  nickname?: string;
  chords: ProgressionChord[];
  defaultKey: NoteName;
  bpm: number;
  genre: string;
  genreHe: string;
  explanation: string;
  whyItWorks: string;
  soloScale: string;
  soloScaleHe: string;
  improvTips: string[];
  famousSongs?: string[];
}

const QUALITY_SUFFIX: Record<ProgressionChord["quality"], string> = {
  major: "",
  minor: "m",
  dom7: "7",
  dim: "dim",
  maj7: "maj7",
};

// Diatonic scale degrees in major key (semitones from root)
const MAJOR_SCALE_DEGREES = [0, 2, 4, 5, 7, 9, 11];
const MAJOR_DEGREE_QUALITY: ProgressionChord["quality"][] = [
  "major",
  "minor",
  "minor",
  "major",
  "major",
  "minor",
  "dim",
];

export function getChordSymbolInKey(
  key: NoteName,
  degree: number,
  quality: ProgressionChord["quality"],
  semitoneOffset?: number
): string {
  const offset = semitoneOffset ?? MAJOR_SCALE_DEGREES[degree];
  const root = transposeNote(key, offset);
  return `${root}${QUALITY_SUFFIX[quality]}`;
}

export function resolveProgressionInKey(
  progression: Progression,
  key: NoteName
): { roman: string; chord: string; bars: number }[] {
  return progression.chords.map((c) => ({
    roman: c.roman,
    chord: getChordSymbolInKey(key, c.degree, c.quality, c.semitoneOffset),
    bars: c.bars,
  }));
}

export const progressions: Progression[] = [
  {
    id: "one-five-six-four",
    name: "I – V – vi – IV",
    nameHe: "I – V – vi – IV",
    nickname: "פרוגרשן הפופ",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "major", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "major", bars: 1 },
      { roman: "vi", romanHe: "סאב-מדיאנטה", degree: 5, quality: "minor", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "major", bars: 1 },
    ],
    defaultKey: "C",
    bpm: 90,
    genre: "Pop / Rock",
    genreHe: "פופ / רוק",
    explanation:
      "הפרוגרשן הכי נפוץ בעולם. בדו מז'ור: C – G – Am – F. שומעים אותו בלמעלה ממיליון שירים.",
    whyItWorks:
      "ה-I (טוניקה) הוא 'הבית' — מרגיש יציב. ה-V יוצר מתח שדוחף קדימה. ה-vi (מינור) מוסיף רגש. ה-IV נותן תחושת 'פתיחה' לפני שחוזרים ל-I. יחד זה מסע רגשי: יציב → מתח → עצב → תקווה.",
    soloScale: "Major Pentatonic or Natural Minor (Am pentatonic over C)",
    soloScaleHe: "פנטטוני מז'ור (C) או פנטטוני מינור (A) — שניהם עובדים!",
    improvTips: [
      "נגן פנטטוני מינור של ה-vi (ב-C זה Am pentatonic = אותם תווים כמו C major pentatonic!)",
      "נסה לנחות על תו השורש של כל אקורד כשהוא מתחלף",
      "התחל פשוט — 3-4 תווים בלבד, עם הרבה שקט ביניהם",
      "הדגש את התווים של ה-IV (F) כשמגיע האקורד F",
    ],
    famousSongs: ["Let It Be", "No Woman No Cry", "Someone Like You", "שירים רבים בעברית"],
  },
  {
    id: "six-four-one-five",
    name: "vi – IV – I – V",
    nameHe: "vi – IV – I – V",
    nickname: "הפרוגרשן הרגשי",
    chords: [
      { roman: "vi", romanHe: "סאב-מדיאנטה", degree: 5, quality: "minor", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "major", bars: 1 },
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "major", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "major", bars: 1 },
    ],
    defaultKey: "C",
    bpm: 75,
    genre: "Pop / Ballad",
    genreHe: "פופ / בלדה",
    explanation:
      "מתחיל במינור (vi) — מיד שומעים רגש. Am – F – C – G בדו מז'ור.",
    whyItWorks:
      "כשמתחילים ב-vi במקום ב-I, השיר נשמע יותר 'עצוב' או 'אינטימי' מההתחלה. המעבר מ-IV ל-I מרגיש כמו הקלה, וה-V בסוף שוב דוחף.",
    soloScale: "Natural Minor (Aeolian) — same as vi key",
    soloScaleHe: "מינור טבעי (איוליאן) — ב-C זה סולם Am",
    improvTips: [
      "התחל בסולו כשמתנגן vi — זה 'הבית' הרגשי של הפרוגרשן",
      "השתמש ב-bending על התו השלישי של המינור לרגש",
      "כשמגיע I — נחיתה על דו (C) תרגיש כמו 'פתרון'",
    ],
    famousSongs: ["Despacito", "Africa", "Zombie (The Cranberries)"],
  },
  {
    id: "one-four-five",
    name: "I – IV – V",
    nameHe: "I – IV – V",
    nickname: "הקלאסיקה",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "major", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "major", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "major", bars: 1 },
    ],
    defaultKey: "G",
    bpm: 110,
    genre: "Rock / Blues / Folk",
    genreHe: "רוק / בלוז / פולק",
    explanation:
      "שלושת האקורדים הראשונים שכל גיטריסט לומד. G – C – D בגימל מז'ור.",
    whyItWorks:
      "שלושת האקורדים הדיאטוניים הכי חזקים בטונאליות מז'ורית. I = בית, IV = משנה, V = מתח שחוזר הביתה. זה הבסיס של כמעט כל מוזיקה מערבית.",
    soloScale: "Major Pentatonic + Blues notes",
    soloScaleHe: "פנטטוני מז'ור + תווי בלוז",
    improvTips: [
      "על G: G major pentatonic (G-B-C-D-E)",
      "הוסף b3 ו-b5 לצליל בלוזי (Blues scale)",
      "נגן 'call and response' — משפט קצר, שקט, משפט קצר",
    ],
    famousSongs: ["La Bamba", "Twist and Shout", "Wild Thing"],
  },
  {
    id: "twelve-bar-blues",
    name: "12-Bar Blues",
    nameHe: "בלוז 12 תיבות",
    nickname: "בלוז קלאסי",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "dom7", bars: 4 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "dom7", bars: 2 },
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "dom7", bars: 2 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "dom7", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "dom7", bars: 1 },
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "dom7", bars: 2 },
    ],
    defaultKey: "A",
    bpm: 100,
    genre: "Blues",
    genreHe: "בלוז",
    explanation:
      "המבנה: 4 תיבות I, 2 IV, 2 I, 1 V, 1 IV, 2 I. בלה מז'ור: A7 – D7 – A7 – E7 – D7 – A7.",
    whyItWorks:
      "אקורדי 7 (dominant) יוצרים מתח בלוזי ייחודי. ה-V7 לפני IV7 בסוף (turnaround) הוא ה-'quick change' הקלאסי. כל הבלוז נשען על זה.",
    soloScale: "Minor Pentatonic + Blues scale (b5)",
    soloScaleHe: "פנטטוני מינור + סולם בלוז",
    improvTips: [
      "A blues = A minor pentatonic (A-C-D-E-G) + Eb (b5)",
      "נגן 'בוקס 1' של הפנטטוניק — פריטים 5-8 על מיתר E",
      "השתמש ב-bending מחצי טון מ-C ל-D",
      "שמור על גרוב — פחות תווים, יותר feel",
      "עקוב אחרי שינויי האקורד: D7 = הדגש D-F#-A, E7 = E-G#-B",
    ],
    famousSongs: ["Sweet Home Chicago", "Red House", "Crossroads"],
  },
  {
    id: "two-five-one",
    name: "ii – V – I",
    nameHe: "ii – V – I",
    nickname: "ג'אז בסיסי",
    chords: [
      { roman: "ii", romanHe: "סופר-טוניקה", degree: 1, quality: "minor", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "dom7", bars: 1 },
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "maj7", bars: 2 },
    ],
    defaultKey: "C",
    bpm: 120,
    genre: "Jazz",
    genreHe: "ג'אז",
    explanation:
      "הפרוגרשן הכי חשוב בג'אז. Dm7 – G7 – Cmaj7. ה-V 'פותר' ל-I.",
    whyItWorks:
      "ה-ii (Dm7) מכין את האוזן ל-V. ה-V7 (G7) יוצר מתח חזק עם ה-7 שרוצה לרדת חצי טון ל-3 של I. ה-Imaj7 נותן תחושת סיום מלאה ורכה.",
    soloScale: "C Major (Ionian) or D Dorian over ii",
    soloScaleHe: "סולם דו מז'ור, או דוריאן על ה-ii",
    improvTips: [
      "נגן סולם דו מז'ור על כל הפרוגרשן — זה עובד!",
      "על G7: הדגש B (ה-3 של G7) לפני הנחיתה על C",
      "נסה arpeggios: Dm7 = D-F-A-C, G7 = G-B-D-F",
    ],
    famousSongs: ["Autumn Leaves", "Fly Me to the Moon", "Blue Bossa"],
  },
  {
    id: "one-six-four-five",
    name: "I – vi – IV – V",
    nameHe: "I – vi – IV – V",
    nickname: "פרוגרשן שנות ה-50",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, quality: "major", bars: 1 },
      { roman: "vi", romanHe: "סאב-מדיאנטה", degree: 5, quality: "minor", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, quality: "major", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, quality: "major", bars: 1 },
    ],
    defaultKey: "C",
    bpm: 95,
    genre: "Doo-wop / Classic",
    genreHe: "דו-וופ / קלאסי",
    explanation: "C – Am – F – G. הבסיס של מוזיקת שנות ה-50 ועד היום.",
    whyItWorks:
      "דומה ל-I-V-vi-IV אבל עם סדר אחר — ה-vi מגיע מוקדם יותר ויוצר עומק רגשי לפני ה-IV-V שסוגרים.",
    soloScale: "C Major Pentatonic",
    soloScaleHe: "פנטטוני מז'ור דו",
    improvTips: [
      "פנטטוני מז'ור — 5 תווים בלבד, קשה לטעות",
      "נגן מלודיות פשוטות — חיקוי שירה",
    ],
    famousSongs: ["Stand By Me", "Every Breath You Take", "Beautiful Girls"],
  },
  {
    id: "andalusian-metal",
    name: "i – VII – VI – V",
    nameHe: "i – VII – VI – V",
    nickname: "אנדלוסית / מטאל",
    chords: [
      { roman: "i", romanHe: "טוניקה מינור", degree: 5, semitoneOffset: 0, quality: "minor", bars: 1 },
      { roman: "VII", romanHe: "bVII", degree: 4, semitoneOffset: 10, quality: "major", bars: 1 },
      { roman: "VI", romanHe: "bVI", degree: 3, semitoneOffset: 8, quality: "major", bars: 1 },
      { roman: "V", romanHe: "V מז'ור", degree: 4, semitoneOffset: 7, quality: "major", bars: 1 },
    ],
    defaultKey: "A",
    bpm: 120,
    genre: "Metal / Flamenco",
    genreHe: "מטאל / אנדלוסית",
    explanation:
      "Am – G – F – E. הפרוגרשן הכי מטאלי שיש — Stairway to Heaven, Hit the Road Jack, סולואים של Iron Maiden.",
    whyItWorks:
      "יורד צלע אחר צלע (Am→G→F→E) — כל אקורד 'נופל' חצי טון. ה-E המז'ורי בסוף יוצר מתח דרמטי לפני חזרה ל-Am.",
    soloScale: "A Natural Minor (Aeolian)",
    soloScaleHe: "לה מינור טבעי — פריטים 5–8 ו-12",
    improvTips: [
      "A natural minor על כל הפרוגרשן",
      "נחיתות חזקות על שורשי אקורדים — Am=פריט 5, G=פריט 3, F=פריט 8, E=פריט 12",
      "alternate picking, palm muting על הריף'ים",
    ],
    famousSongs: [
      "Stairway to Heaven (חלק)",
      "Hit the Road Jack",
      "Sultans of Swing (חלקים)",
    ],
  },
  {
    id: "metal-em-power",
    name: "i – VI – III – VII",
    nameHe: "i – VI – III – VII",
    nickname: "מטאל מינורי",
    chords: [
      { roman: "i", romanHe: "טוניקה מינור", degree: 0, semitoneOffset: 0, quality: "minor", bars: 1 },
      { roman: "VI", romanHe: "bVI", degree: 3, semitoneOffset: 8, quality: "major", bars: 1 },
      { roman: "III", romanHe: "bIII", degree: 2, semitoneOffset: 3, quality: "major", bars: 1 },
      { roman: "VII", romanHe: "bVII", degree: 6, semitoneOffset: 10, quality: "major", bars: 1 },
    ],
    defaultKey: "E",
    bpm: 140,
    genre: "Metal",
    genreHe: "מטאל",
    explanation: "Em – C – G – D. פרוגרשן מטאל קלאסי — Metallica, Megadeth, סולואים אגרסיביים.",
    whyItWorks:
      "מתחיל ב-Em (מינור) — הטונאליות כולה מינורית. C ו-G מוסיפים עומק, D דוחף חזרה ל-Em.",
    soloScale: "E Minor Pentatonic + Natural Minor",
    soloScaleHe: "מי מינור פנטטוני — פריטים 0–3 ו-12",
    improvTips: [
      "E minor pentatonic — פריטים 0 ו-12 (פתוח ואוקטבה גבוהה)",
      "סולואים מהירים עם alternate picking",
      "נחיתה חזקה על E (מיתר E פתוח או פריט 12)",
    ],
    famousSongs: ["Nothing Else Matters (חלקים)", "Fade to Black", "שירי מטאל רבים"],
  },
  {
    id: "rock-e-a-b",
    name: "I – IV – V in E",
    nameHe: "I – IV – V ב-E",
    nickname: "רוק קלאסי ב-E",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, semitoneOffset: 0, quality: "major", bars: 2 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, semitoneOffset: 5, quality: "major", bars: 2 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, semitoneOffset: 7, quality: "major", bars: 2 },
    ],
    defaultKey: "E",
    bpm: 130,
    genre: "Rock",
    genreHe: "רוק",
    explanation: "E → A → B. פרוגרשן רוק קלאסי — בלי C, בלי Am. AC/DC, Highway to Hell, שירי רוק ב-E.",
    whyItWorks: "שלושה אקורדים מז'וריים ב-E. עוצמה ישירה — power chords על E, A, B.",
    soloScale: "E Major Pentatonic",
    soloScaleHe: "מי מז'ור פנטטוני — פריטים 0–3 ו-12",
    improvTips: [
      "E major pentatonic — מיתר E פתוח",
      "Power chords: E5, A5, B5",
      "נגן פשוט, חזק, עם palm muting",
    ],
    famousSongs: ["Highway to Hell", "Wild Thing (ב-E)", "Twist and Shout"],
  },
  {
    id: "pop-d-bm-g-a",
    name: "I – vi – IV – V in D",
    nameHe: "I – vi – IV – V ב-D",
    nickname: "פופ ב-D",
    chords: [
      { roman: "I", romanHe: "טוניקה", degree: 0, semitoneOffset: 0, quality: "major", bars: 1 },
      { roman: "vi", romanHe: "סאב-מדיאנטה", degree: 5, semitoneOffset: 9, quality: "minor", bars: 1 },
      { roman: "IV", romanHe: "סאב-דומיננטה", degree: 3, semitoneOffset: 5, quality: "major", bars: 1 },
      { roman: "V", romanHe: "דומיננטה", degree: 4, semitoneOffset: 7, quality: "major", bars: 1 },
    ],
    defaultKey: "D",
    bpm: 100,
    genre: "Pop",
    genreHe: "פופ",
    explanation: "D → Bm → G → A. לא C-G-Am-F! פרוגרשן פופ אחר לגמרי — שירים ב-D.",
    whyItWorks: "Bm נותן רגע עצוב באמצע, G ו-A סוגרים שמח.",
    soloScale: "D Major Pentatonic / B Minor Pentatonic",
    soloScaleHe: "רה מז'ור פנטטוני — פריטים 5–8 (אזור Bm)",
    improvTips: [
      "B minor pentatonic על פריטים 7–10",
      "נחיתה על D כשמגיע D, על Bm כשמגיע Bm",
    ],
    famousSongs: ["שירי פופ רבים ב-D", "Wonderwall (רעיון דומה)"],
  },
  {
    id: "metal-thrash-power",
    name: "i – bIII – IV in E",
    nameHe: "Em – G – A",
    nickname: "מטאל thrash",
    chords: [
      { roman: "i", romanHe: "טוניקה מינור", degree: 0, semitoneOffset: 0, quality: "minor", bars: 2 },
      { roman: "bIII", romanHe: "bIII", degree: 2, semitoneOffset: 3, quality: "major", bars: 2 },
      { roman: "IV", romanHe: "IV", degree: 3, semitoneOffset: 5, quality: "major", bars: 2 },
    ],
    defaultKey: "E",
    bpm: 160,
    genre: "Metal",
    genreHe: "מטאל",
    explanation: "Em → G → A. ריף מטאל מהיר — בלי C, בלי D. Thrash וספיד מטאל.",
    whyItWorks: "שלושה power chords צמודים על הצוואר הנמוך. מהיר, אגרסיבי.",
    soloScale: "E Minor Pentatonic",
    soloScaleHe: "מי מינור פנטטוני",
    improvTips: [
      "E5 → G5 → A5 עם downstrokes",
      "alternate picking",
      "סולו בפריט 12",
    ],
    famousSongs: ["Metallica (סגנון)", "Megadeth riffs"],
  },
];

export const romanNumeralGuide = [
  {
    roman: "I",
    nameHe: "טוניקה (ראש)",
    role: "הבית — הכי יציב, סיום טבעי",
    example: "ב-C: אקורד C",
  },
  {
    roman: "ii",
    nameHe: "סופר-טוניקה",
    role: "מכין ל-V, צליל מינורי רך",
    example: "ב-C: אקורד Dm",
  },
  {
    roman: "iii",
    nameHe: "מדיאנטה",
    role: "צליל מינורי, מעברי",
    example: "ב-C: אקורד Em",
  },
  {
    roman: "IV",
    nameHe: "סאב-דומיננטה",
    role: "פתיחה, תחושת 'עלייה'",
    example: "ב-C: אקורד F",
  },
  {
    roman: "V",
    nameHe: "דומיננטה",
    role: "מתח מקסימלי — רוצה לחזור ל-I",
    example: "ב-C: אקורד G (או G7)",
  },
  {
    roman: "vi",
    nameHe: "סאב-מדיאנטה",
    role: "המינור היחסי — רגש, עצב",
    example: "ב-C: אקורד Am",
  },
  {
    roman: "vii°",
    nameHe: "סאב-טוניקה מוקטנת",
    role: "מתח חזק, נדיר באקורדים פתוחים",
    example: "ב-C: Bdim",
  },
];
