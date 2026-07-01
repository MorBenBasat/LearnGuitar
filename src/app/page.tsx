import Link from "next/link";

const features = [
  {
    href: "/progressions",
    icon: "🎵",
    title: "פרוגרשנים",
    desc: "הבנת I-V-vi-IV, בלוז, ג'אז — עם backing track ותרגול",
    color: "from-amber-600/20 to-orange-900/10",
    border: "border-amber-700/30 hover:border-amber-500/50",
  },
  {
    href: "/scales",
    icon: "🎼",
    title: "סולמות",
    desc: "פנטטוני, בלוז, מז'ור — על מפת הפרטים האינטראקטיבית",
    color: "from-violet-600/20 to-purple-900/10",
    border: "border-violet-700/30 hover:border-violet-500/50",
  },
  {
    href: "/improv",
    icon: "✨",
    title: "אלתור",
    desc: "איך לדעת מה לנגן, על איזה סולם, ומתי",
    color: "from-emerald-600/20 to-green-900/10",
    border: "border-emerald-700/30 hover:border-emerald-500/50",
  },
  {
    href: "/chords",
    icon: "🎸",
    title: "אקורדים",
    desc: "15 אקורדים עם דיאגרמות וניגון",
    color: "from-stone-600/20 to-stone-900/10",
    border: "border-stone-700/30 hover:border-stone-500/50",
  },
];

const steps = [
  "הבן את הספרות הרומיות (I, IV, V, vi) — עמוד פרוגרשנים",
  "תרגל 3 פרוגרשנים עם ה-backing track",
  "למד פנטטוני מינור על מפת הפרטים",
  "נסה לאלתר מעל פרוגרשן — עמוד אלתור",
  "הרחב לסולם בלוז ו-dorian",
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-800/30 bg-gradient-to-br from-amber-950/60 via-stone-900/90 to-stone-950 p-8 shadow-2xl shadow-amber-950/20 sm:p-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-amber-700/40 bg-amber-950/50 px-4 py-1 text-xs font-medium text-amber-400">
            חינמי · בעברית · אינטראקטיבי
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            <span className="bg-gradient-to-l from-amber-300 to-amber-600 bg-clip-text text-transparent">
              לומדים גיטרה
            </span>
            <br />
            <span className="text-stone-200">פרוגרשנים, סולמות ואלתור</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-stone-400">
            אתר שמלמד אותך להבין פרוגרשנים, לנגן סולמות על הצוואר,
            ולאלתר — בצורה מסודרת, עם מוזיקה ותרגול.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/progressions" className="btn-primary">
              התחל עם פרוגרשנים
              <span aria-hidden>←</span>
            </Link>
            <Link href="/improv" className="btn-secondary">
              מדריך אלתור
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-4 hidden text-[8rem] opacity-[0.04] sm:block">
          🎸
        </div>
      </section>

      {/* Quick tip */}
      <section className="glass-card flex gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600/20 text-2xl">
          💡
        </div>
        <div>
          <h2 className="mb-1 text-lg font-bold text-amber-400">טיפ להיום</h2>
          <p className="text-stone-300 leading-relaxed">
            על פרוגרשן{" "}
            <strong className="text-amber-400">I – V – vi – IV</strong> בדו
            מז&apos;ור (C – G – Am – F) — נגן סולם{" "}
            <strong className="text-amber-400">A minor pentatonic</strong>.
            זה אותם תווים כמו C major pentatonic, וכמעט כל תו שתבחר יישמע טוב.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-stone-100">מה יש כאן?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${f.color} ${f.border}`}
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-stone-100 group-hover:text-amber-300 transition">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {f.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-500 opacity-0 transition group-hover:opacity-100">
                כניסה <span>←</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning path */}
      <section className="glass-card p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-stone-100">
          מסלול לימוד מומלץ
        </h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-sm font-bold text-stone-950 shadow-md">
                {i + 1}
              </span>
              <span className="pt-1 text-stone-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
