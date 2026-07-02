"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "בית", icon: "🏠" },
  { href: "/learn", label: "למידה", icon: "🎸" },
  { href: "/progressions", label: "פרוגרשנים", icon: "🔁" },
  { href: "/scales", label: "סולמות", icon: "🎼" },
  { href: "/chords", label: "אקורדים", icon: "🎵" },
];

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/30 bg-stone-950/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-lg shadow-lg shadow-amber-900/40">
            🎸
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-amber-400">LearnGuitar</span>
            <span className="hidden text-[10px] text-stone-500 sm:block">
              למידה · אלתור · אקורדים
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-amber-600 font-semibold text-stone-950 shadow-md shadow-amber-900/30"
                    : "text-stone-400 hover:bg-stone-800/80 hover:text-amber-300"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-700 bg-stone-900 text-stone-300 md:hidden"
          aria-label="תפריט"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-stone-800 bg-stone-950 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-amber-600/20 font-semibold text-amber-400"
                      : "text-stone-400 hover:bg-stone-900"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
