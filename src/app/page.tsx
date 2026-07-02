import Link from "next/link";

const genres = [
  { id: "pop", emoji: "🎤", name: "פופ", desc: "C → G → Am → F" },
  { id: "rock", emoji: "⚡", name: "רוק", desc: "G → C → D" },
  { id: "blues", emoji: "🎷", name: "בלוז", desc: "12 תיבות A7-D7-E7" },
  { id: "metal", emoji: "🤘", name: "מטאל", desc: "Am → G → F → E" },
  { id: "jazz", emoji: "🎹", name: "ג'אז", desc: "Dm7 → G7 → C" },
  { id: "mizrahi", emoji: "🌙", name: "מזרחי", desc: "C → Am → F → G" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <section className="text-center">
        <h1 className="page-title">לומדים לאלתור על גיטרה</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-stone-400">
          בוחרים ז&apos;אנר, לומדים פרוגרשן, רואים בדיוק איזה טאב לנגן על כל
          אקורד.
        </p>
        <Link href="/learn" className="btn-primary mt-8">
          התחל ללמוד
          <span aria-hidden>←</span>
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-center text-lg font-bold text-stone-300">
          בחר סגנון והתחל
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {genres.map((g) => (
            <Link
              key={g.id}
              href={`/learn?genre=${g.id}`}
              className="flex items-center gap-4 rounded-2xl border border-stone-800 bg-stone-900/50 p-5 transition hover:border-amber-700/50"
            >
              <span className="text-3xl">{g.emoji}</span>
              <div className="text-right">
                <p className="font-bold text-stone-100">{g.name}</p>
                <p className="text-sm text-amber-600/80">{g.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 text-center">
        <h2 className="font-bold text-stone-200">איך זה עובד?</h2>
        <div className="mt-4 grid gap-4 text-sm text-stone-400 sm:grid-cols-3">
          <div>
            <p className="text-2xl">1</p>
            <p className="mt-1 font-medium text-stone-300">בוחרים ז&apos;אנר</p>
            <p>פופ, בלוז, מטאל — לכל אחד פרוגרשנים שונים</p>
          </div>
          <div>
            <p className="text-2xl">2</p>
            <p className="mt-1 font-medium text-stone-300">לומדים את השיעור</p>
            <p>סולם, טאב, ואיפה לנחות על כל אקורד</p>
          </div>
          <div>
            <p className="text-2xl">3</p>
            <p className="mt-1 font-medium text-stone-300">מתרגלים</p>
            <p>שיר ברקע + נגינה שלך מעל</p>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link href="/progressions" className="text-sm text-stone-500 hover:text-amber-400">
          כל הפרוגרשנים — ספרייה מלאה ←
        </Link>
      </div>
    </div>
  );
}
