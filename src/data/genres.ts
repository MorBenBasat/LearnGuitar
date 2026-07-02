export interface GenreGuide {
  id: string;
  name: string;
  nameHe: string;
  emoji: string;
  vibe: string;
  guitarType: string;
  mainScales: { scaleId: string; why: string }[];
  progressions: string[];
  toneTips: string[];
  improvApproach: string;
  listenTo: string[];
}

export const genres: GenreGuide[] = [
  {
    id: "rock-electric",
    name: "Rock / Electric",
    nameHe: "רוק / חשמלית",
    emoji: "⚡",
    vibe: "עוצמה, distortion, סולואים בינוניים-גבוהים",
    guitarType: "חשמלית עם overdrive/distortion — bridge pickup",
    mainScales: [
      { scaleId: "pentatonic-minor", why: "90% מהסולואים — Box 1 ו-3" },
      { scaleId: "blues", why: "לסולואים עם attitude ו-b5" },
      { scaleId: "natural-minor", why: "לשירים מינוריים (Metallica, וכו')" },
    ],
    progressions: ["one-four-five", "one-five-six-four", "one-six-four-five"],
    toneTips: [
      "Gain בינוני — לא מקסימום, שומר על הגדרה",
      "קופסה 1 לפתיחות, קופסה 3 לסולו",
      "bending על b3 ו-b7 = צליל רוק קלאסי",
    ],
    improvApproach:
      "התחל מפנטטוני מינור בקופסה 1. נגן פחות, חזק יותר. נחיתות על שורשי אקורדים בקצוות משפטים.",
    listenTo: ["Led Zeppelin", "AC/DC", "Guns N' Roses", "Arctic Monkeys"],
  },
  {
    id: "blues",
    name: "Blues",
    nameHe: "בלוז",
    emoji: "🎷",
    vibe: "רגש, bending, call & response, 12-bar",
    guitarType: "חשמלית נקייה-מעט dirty, neck pickup לרוב",
    mainScales: [
      { scaleId: "blues", why: "ה-b5 = הנשמה של הבלוז" },
      { scaleId: "pentatonic-minor", why: "הבסיס — לפני שמוסיפים blue note" },
    ],
    progressions: ["twelve-bar-blues", "one-four-five"],
    toneTips: [
      "shuffle feel — נגן 'מרווח' לא שווה",
      "bending, vibrato, slide — לא מהירות",
      "Box 1 + Box 2 = הבית של הבלוז",
    ],
    improvApproach:
      "נגן 2-4 תווים, שקט, תשובה. ה-b5 הוא passing tone — אל תתקע עליו. נחיתה על שורש האקורד ב-dominant (V7).",
    listenTo: ["B.B. King", "Stevie Ray Vaughan", "Albert King"],
  },
  {
    id: "pop",
    name: "Pop",
    nameHe: "פופ",
    emoji: "🎤",
    vibe: "מלודי, נקי, שירתי, פשוט",
    guitarType: "אקוסטית או חשמלית נקייה — פחות gain",
    mainScales: [
      { scaleId: "pentatonic-major", why: "צליל שמח ונקי על מז'ור" },
      { scaleId: "pentatonic-minor", why: "על vi — אותם תווים, צליל רגשי יותר" },
    ],
    progressions: ["one-five-six-four", "six-four-one-five"],
    toneTips: [
      "פחות תווים = יותר שיר",
      "חזור על מלודיה קצרה — hooks עובדים",
      "major pentatonic על I ו-IV",
    ],
    improvApproach:
      "חשוב על שירה — מלודיות פשוטות שאפשר לזמזם. A minor pentatonic על I-V-vi-IV ב-C = בלתי אפשרי לטעות.",
    listenTo: ["Ed Sheeran", "Adele (guitar versions)", "The Beatles"],
  },
  {
    id: "jazz",
    name: "Jazz",
    nameHe: "ג'אז",
    emoji: "🎹",
    vibe: "מתוחכם, עשיר באקורדים, ii-V-I",
    guitarType: "חשמלית נקייה, tone חם, often neck pickup",
    mainScales: [
      { scaleId: "major", why: "על טונאליות מז'ורית — כל 7 התווים" },
      { scaleId: "dorian", why: "על ii (m7) — הצבע הג'אזי" },
    ],
    progressions: ["two-five-one"],
    toneTips: [
      "נגן על שינויי אקורד — לא רק על שורש",
      "arpeggios (אקורד note-by-note) חשובים",
      "פחות distortion, יותר dynamics",
    ],
    improvApproach:
      "על ii-V-I ב-C: D dorian על Dm7, G mixolydian (או major) על G7, C major על C. התחל עם arpeggios לפני סולמות.",
    listenTo: ["Wes Montgomery", "Joe Pass", "Pat Metheny"],
  },
  {
    id: "middle-eastern",
    name: "Middle Eastern / Mizrahi",
    nameHe: "מזרחי / ים-תיכוני",
    emoji: "🪕",
    vibe: "מקאמים, quarter tones, אקורדים מז'וריים עם מינוריות",
    guitarType: "אקוסטית או חשמלית נקייה — often clean with reverb",
    mainScales: [
      { scaleId: "natural-minor", why: "בסיס למקאם נהוונד (דומה למינור)" },
      { scaleId: "dorian", why: "צליל 'מזרחי' — ה-6 מז'ורי משנה הכל" },
      { scaleId: "major", why: "על שירים מז'וריים שמחים" },
    ],
    progressions: ["one-six-four-five", "one-four-five"],
    toneTips: [
      "bends חצי-טון (micro-bends) = צליל מזרחי",
      "phrasing אורגנית — לא רוק מערבי",
      "הדגש על מלודיה, לא על מהירות",
    ],
    improvApproach:
      "המקאמים הם לא בדיוק סולמות מערביים — אבל natural minor + dorian + הדגשת b2/b3 נותנים צליל מזרחי. נגן מלודיות שירה עבריות בראש.",
    listenTo: ["עומר אדם (גיטרה)", "שלמה ארצי", "Zohar Argov classics"],
  },
  {
    id: "metal",
    name: "Metal",
    nameHe: "מטאל",
    emoji: "🤘",
    vibe: "מהיר, אגרסיבי, מינורי, palm muting",
    guitarType: "חשמלית עם high gain, bridge pickup",
    mainScales: [
      { scaleId: "natural-minor", why: "הבסיס למטאל מינורי" },
      { scaleId: "pentatonic-minor", why: "לסולואים קלאסיים" },
    ],
    progressions: ["one-six-four-five", "one-four-five"],
    toneTips: [
      "palm muting על ריף'ים",
      "קופסה 3-4 לסולואים גבוהים",
      "alternate picking לריצות מהירות",
    ],
    improvApproach:
      "natural minor על פרוגרשנים מינוריים. סולואים: pentatonic + מהירות. נחיתות חזקות על שורש.",
    listenTo: ["Metallica", "Iron Maiden", "Megadeth"],
  },
];

export const theoryBasics = {
  majorVsMinor: {
    title: "מז'ור vs מינור — בפשטות",
    analogy:
      "תחשוב על זה כמו מצב רוח: מז'ור = שמש, מינור = ענן. אותם אקורדים, אבל התו השלישי משנה הכל.",
    majorDef:
      "מז'ור = השלישי 'גבוה' (4 חצאי טונים מהשורש). נשמע שמח, יציב, פתוח.",
    minorDef:
      "מינור = השלישי 'נמוך' (3 חצאי טונים מהשורש). נשמע עצוב, רגשי, אינטימי.",
    practicalTip:
      "ב-C מז'ור: C-E-G (שמח). ב-Am מינור: A-C-E (עצוב). שים לב — E ו-G משותפים! רק השלישי שונה.",
  },
  whatAreBoxes: {
    title: "מה זה קופסאות?",
    simple:
      "הצוואר של הגיטרה ארוך. אותם 5 תווים של הפנטטוניק חוזרים שוב ושוב — בכל מקום אחר. 'קופסה' = אזור קטן על הצוואר שבו נוח לנגן.",
    why: "במקום לנסות לנגן על כל הצוואר, אתה מתמקד באזור אחד (4-5 פריטים). זה הרבה יותר קל לאלתור.",
    howToPractice:
      "1. למד קופסה 1 על בראש. 2. נגן ריצה למעלה ולמטה. 3. אלתר עם 3-4 תווים. 4. עבור לקופסה 2.",
  },
  whatAreBars: {
    title: "מה זה תיבות?",
    simple:
      "תיבה = יחידת זמן במוזיקה. בדרך כלל 4 פעימות (beats) בתיבה. כשאומרים '4 תיבות על I' — האקורד הראשון נמשך 4 פעימות.",
    practical:
      "ב-BPM 90, כל תיבה ≈ 2.7 שניות. ספור: 1-2-3-4, החלף אקורד.",
  },
};
