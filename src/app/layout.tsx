import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnGuitar — פרוגרשנים, סולמות ואלתור",
  description: "לומדים גיטרה בחינם — פרוגרשנים, סולמות, אלתור ואקורדים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,83,9,0.12)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(120,53,15,0.08)_0%,_transparent_50%)]" />
        </div>
        <Navigation />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-amber-900/20 bg-stone-950/80 py-6 text-center text-sm text-stone-500">
          LearnGuitar — לומדים גיטרה בחינם 🎸
        </footer>
      </body>
    </html>
  );
}
