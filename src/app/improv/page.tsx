import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function ImprovPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="אלתור"
        description="המדריך עבר לחדר תרגול אינטראקטיבי — שם תמצא backing track, סולם מומלץ, קופסאות ותרגילים."
      />

      <section className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/50 to-stone-900 p-6 sm:p-8">
        <h2 className="mb-3 text-xl font-bold text-amber-400">הכלל הזהב</h2>
        <p className="text-lg text-stone-200">
          <strong className="text-amber-400">פנטטוני מינור של ה-vi</strong> עובד
          על כמעט כל פרוגרשן מז&apos;ורי.
        </p>
        <p className="mt-2 text-sm text-stone-400">
          בדו מז&apos;ור (C – G – Am – F) → נגן{" "}
          <strong>A minor pentatonic</strong>. כמעט בלתי אפשרי לטעות.
        </p>
      </section>

      <section className="glass-card p-6 text-center space-y-4">
        <p className="text-stone-300">
          בחדר התרגול תוכל לבחור פרוגרשן, לראות בדיוק איזה סולם לנגן,
          להפעיל backing track, ולתרגל עם קופסאות וריצות סולם.
        </p>
        <Link href="/practice" className="btn-primary inline-flex">
          לחדר תרגול והבנה
          <span aria-hidden>←</span>
        </Link>
      </section>
    </div>
  );
}
