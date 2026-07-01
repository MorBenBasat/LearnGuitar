import Link from "next/link";
import { Fretboard } from "@/components/Fretboard";
import { PageHeader } from "@/components/PageHeader";

const steps = [
  {
    title: "שלב 1: זהה את הטונאליות",
    content:
      "שאל את עצמך: מה האקורד הראשון? אם זה C — אתה בדו מז'ור. אם Am — אתה בלה מינור (או דו מז'ור עם התחלה רגשית).",
    action: { label: "למד פרוגרשנים", href: "/progressions" },
  },
  {
    title: "שלב 2: בחר סולם אחד",
    content:
      "כלל אצבע: על מז'ור → פנטטוני מז'ור או מינור של ה-vi. על מינור → פנטטוני מינור. על בלוז → סולם בלוז. אל תנסה הכל בבת אחת!",
    action: { label: "למד סולמות", href: "/scales" },
  },
  {
    title: "שלב 3: נגן פחות תווים",
    content:
      "הטעות הכי נפוצה: לנגן יותר מדי, מהר מדי. 4-5 תווים טובים עם שקט ביניהם > 30 תווים. תחשוב על 'שיחה' — משפט, הפסקה, משפט.",
  },
  {
    title: "שלב 4: נחיתה על שורשי אקורדים",
    content:
      "כשאקורד מתחלף, נסה לנחות על התו השורש שלו (root). על C → נחיתה על C. על G → נחיתה על G. זה נותן תחושה ש'אתה יודע מה אתה עושה'.",
  },
  {
    title: "שלב 5: הוסף expression",
    content:
      "bending (כיפוף מיתר), vibrato (רעידה), slide (החלקה), hammer-on/pull-off. אלה מה שהופכים 'תווים' ל'מוזיקה'.",
  },
];

const exercises = [
  {
    name: "תרגיל 1: Call & Response",
    desc: "נגן 3 תווים → שקט 2 שניות → 3 תווים שונים. כאילו אתה מדבר עם מישהו.",
    duration: "5 דקות",
  },
  {
    name: "תרגיל 2: Root Landing",
    desc: "הפעל backing track של פרוגרשן. על כל החלפת אקורד — נחיתה על השורש.",
    duration: "10 דקות",
  },
  {
    name: "תרגיל 3: One String Solo",
    desc: "נגן סולו על מיתר אחד בלבד (E כבד). זה מאלץ אותך לחשוב מלודית, לא טכנית.",
    duration: "5 דקות",
  },
  {
    name: "תרגיל 4: 3 Notes Only",
    desc: "בחר 3 תווים מהסולם. נגן רק אותם — באינסוף וריאציות. רקדה, קצב, bending.",
    duration: "5 דקות",
  },
  {
    name: "תרגיל 5: Copy a Vocal",
    desc: "שיר שאתה אוהב בראש? נסה 'לנגן' את המילודיה שלו בסולם פנטטוני.",
    duration: "10 דקות",
  },
];

const scaleMap = [
  {
    progression: "I – V – vi – IV (מז'ור)",
    scale: "A minor pentatonic / C major pentatonic",
    why: "ה-vi (Am) הוא המינור היחסי — אותם 5 תווים",
  },
  {
    progression: "12-Bar Blues",
    scale: "A minor pentatonic + blues scale",
    why: "ה-b5 (blue note) נותן את הצליל הבלוזי",
  },
  {
    progression: "ii – V – I (ג'אז)",
    scale: "C major / D dorian על ה-ii",
    why: "סולם מז'ור אחד עובד על הכל, dorian מוסיף צבע על ii",
  },
  {
    progression: "שיר מינורי (מתחיל ב-Am)",
    scale: "A minor pentatonic / A natural minor",
    why: "הטונאליות המינורית ברורה — נגע ב-b3 ו-b7",
  },
];

export default function ImprovPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="אלתור"
        description="איך לדעת מה לנגן? מדריך מעשי — לא תיאוריה יבשה, אלא כלים שתשתמש בהם היום."
      />

      {/* Golden rule */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/50 to-stone-900 p-6 sm:p-8">
        <h2 className="mb-3 text-xl font-bold text-amber-400">
          הכלל הזהב
        </h2>
        <p className="text-lg text-stone-200">
          <strong className="text-amber-400">פנטטוני מינור של ה-vi</strong> עובד
          על כמעט כל פרוגרשן מז&apos;ורי.
        </p>
        <p className="mt-2 text-sm text-stone-400">
          בדו מז&apos;ור (C – G – Am – F) → נגן{" "}
          <strong>A minor pentatonic</strong> (A – C – D – E – G).
          זה אותם תווים כמו C major pentatonic. כמעט בלתי אפשרי לטעות.
        </p>
      </section>

      {/* Interactive fretboard */}
      <section className="glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-stone-200">
          A minor pentatonic — תרגל כאן
        </h2>
        <Fretboard
          frets={12}
          scaleRoot="A"
          scaleIntervals={[0, 3, 5, 7, 10]}
        />
      </section>

      {/* Steps */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-200">
          5 שלבים לאלתור
        </h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5"
            >
              <h3 className="font-bold text-amber-400">{step.title}</h3>
              <p className="mt-2 text-sm text-stone-300">{step.content}</p>
              {step.action && (
                <Link
                  href={step.action.href}
                  className="mt-3 inline-block text-sm text-amber-600 hover:text-amber-400"
                >
                  {step.action.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Scale map */}
      <section className="glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-stone-200">
          מפת סולמות לפי פרוגרשן
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800 text-stone-500">
                <th className="py-2 text-right">פרוגרשן</th>
                <th className="py-2 text-right">סולם</th>
                <th className="py-2 text-right">למה?</th>
              </tr>
            </thead>
            <tbody>
              {scaleMap.map((row, i) => (
                <tr key={i} className="border-b border-stone-800/50">
                  <td className="py-3 text-amber-400">{row.progression}</td>
                  <td className="py-3 text-stone-300">{row.scale}</td>
                  <td className="py-3 text-stone-500">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exercises */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-200">
          תרגילים יומיים
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {exercises.map((ex) => (
            <div
              key={ex.name}
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-200">{ex.name}</h3>
                <span className="rounded-full bg-amber-600/20 px-2 py-0.5 text-xs text-amber-400">
                  {ex.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-400">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Link href="/progressions" className="btn-primary">
          תרגל עם backing track
          <span aria-hidden>←</span>
        </Link>
      </section>
    </div>
  );
}
