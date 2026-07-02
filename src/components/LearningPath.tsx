"use client";

import Link from "next/link";

const STEPS = [
  {
    num: 1,
    title: "התחל כאן",
    desc: "איך קוראים טאב וקופסה 1",
    tab: "start",
    icon: "👋",
  },
  {
    num: 2,
    title: "למד דרך שיר",
    desc: "C → G → Am → F מלא",
    tab: "song",
    icon: "🎵",
  },
  {
    num: 3,
    title: "אלתור בטאב",
    desc: "שילובי טאב + פרוגרשנים",
    tab: "improv",
    icon: "🎸",
  },
  {
    num: 4,
    title: "פרוגרשנים",
    desc: "לפי ז'אנר — בלוז, רוק, ג'אז",
    href: "/progressions",
    icon: "🔁",
  },
] as const;

interface LearningPathProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function LearningPath({ currentTab, onTabChange }: LearningPathProps) {
  return (
    <section className="rounded-2xl border border-amber-800/30 bg-gradient-to-br from-stone-900/80 to-amber-950/20 p-5">
      <h2 className="mb-1 text-sm font-bold text-amber-400">
        המסלול שלך — לפי הסדר
      </h2>
      <p className="mb-4 text-xs text-stone-500">
        לא חייב הכל ביום אחד. שלב 1 → 2 → 3, ואז תרגל על פרוגרשנים שונים.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => {
          const isCurrent =
            "tab" in step && step.tab === currentTab;
          const inner = (
            <>
              <span className="text-lg">{step.icon}</span>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[10px] text-stone-600">שלב {step.num}</p>
                <p className="truncate text-sm font-bold text-stone-200">
                  {step.title}
                </p>
                <p className="truncate text-[11px] text-stone-500">
                  {step.desc}
                </p>
              </div>
            </>
          );

          const cls = `flex items-center gap-3 rounded-xl border p-3 text-right transition ${
            isCurrent
              ? "border-amber-500 bg-amber-600/15"
              : "border-stone-800 bg-stone-950/50 hover:border-stone-700"
          }`;

          if ("href" in step) {
            return (
              <Link key={step.num} href={step.href} className={cls}>
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={step.num}
              type="button"
              onClick={() => onTabChange?.(step.tab)}
              className={cls}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}
