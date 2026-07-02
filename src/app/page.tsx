import Link from "next/link";

const features = [
  {
    href: "/scales",
    icon: "🎼",
    title: "סולמות וקופסאות",
    desc: "כל הסולמות — בחר C, A, G וקופסה 1–5 על הצוואר",
    color: "from-violet-600/20 to-purple-900/10",
    border: "border-violet-700/30 hover:border-violet-500/50",
  },
  {
    href: "/practice",
    icon: "🎯",
    title: "תרגול",
    desc: "למד דרך שיר, אלתור, ריצות סולם",
    color: "from-rose-600/20 to-red-900/10",
    border: "border-rose-700/30 hover:border-rose-500/50",
  },
  {
    href: "/progressions",
    icon: "🔁",
    title: "שירים",
    desc: "אקורדים בלי רומי — C, G, Am, F ועוד",
    color: "from-amber-600/20 to-orange-900/10",
    border: "border-amber-700/30 hover:border-amber-500/50",
  },
  {
    href: "/chords",
    icon: "🎸",
    title: "אקורדים",
    desc: "איך מנגנים C, Am, G — עם תמונה ושמע",
    color: "from-stone-600/20 to-stone-900/10",
    border: "border-stone-700/30 hover:border-stone-500/50",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-amber-800/30 bg-gradient-to-br from-amber-950/60 via-stone-900/90 to-stone-950 p-8 shadow-2xl sm:p-12">
        <div className="relative z-10 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-amber-700/40 bg-amber-950/50 px-4 py-1 text-xs font-medium text-amber-400">
            לא צריך לדעת תיאוריה
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            <span className="bg-gradient-to-l from-amber-300 to-amber-600 bg-clip-text text-transparent">
              לומדים דרך שיר
            </span>
            <br />
            <span className="text-stone-200">לא דרך מילים מבלבלות</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-stone-400">
            שיר אחד: C → G → Am → F. דרכו תבין מה זה אקורד שמח ועצוב,
            איזה מספרי טאב לנגן, מה זה קופסה, ואיך לאלתר.
          </p>
          <Link href="/practice" className="btn-primary">
            התחל — 6 שלבים מודרכים
            <span aria-hidden>←</span>
          </Link>
        </div>
      </section>

      <section className="glass-card flex gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600/20 text-2xl">
          💡
        </div>
        <div>
          <h2 className="mb-1 text-lg font-bold text-amber-400">
            מה תלמד בשעה הראשונה
          </h2>
          <ul className="space-y-1 text-stone-300">
            <li>• מה זה C, G, Am, F — בלחיצה ושמיעה</li>
            <li>• למה Am עצוב (האות m)</li>
            <li>• 4 שילובי טאב שתמיד עובדים</li>
            <li>• מה זה קופסה ואיזו לבחור</li>
            <li>• איך לנגן מעל השיר בפועל</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-stone-100">מה יש כאן?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className={`rounded-2xl border bg-gradient-to-br p-6 transition hover:-translate-y-1 ${f.color} ${f.border}`}
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-stone-100">{f.title}</h3>
              <p className="mt-2 text-sm text-stone-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
