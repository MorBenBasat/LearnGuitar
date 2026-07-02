"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Fretboard } from "@/components/Fretboard";
import { ProgressionPlayer } from "@/components/ProgressionPlayer";
import { useAudio } from "@/hooks/useAudio";
import { progressions } from "@/data/progressions";
import { scales } from "@/data/scales";
import { genres, theoryBasics } from "@/data/genres";
import { KEY_ROOTS, getScaleNotes } from "@/lib/music";
import type { NoteName } from "@/lib/music";
import {
  getMajorMinorComparison,
  getPentatonicBoxes,
  getScaleRecommendation,
  getScaleRunInBox,
} from "@/lib/musicTheory";

type PracticeTab = "basics" | "boxes" | "studio" | "genres";

export function PracticeStudio() {
  const [tab, setTab] = useState<PracticeTab>("basics");
  const [comparisonKey, setComparisonKey] = useState<NoteName>("C");
  const [boxRoot, setBoxRoot] = useState<NoteName>("A");
  const [activeBoxNum, setActiveBoxNum] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [progressionId, setProgressionId] = useState(progressions[0].id);
  const [practiceKey, setPracticeKey] = useState<NoteName>("C");
  const [selectedGenreId, setSelectedGenreId] = useState(genres[0].id);
  const [displayMode, setDisplayMode] = useState<"tab" | "degrees">("tab");
  const [useBoxFilter, setUseBoxFilter] = useState(true);

  const { playScale, playFret, playChord } = useAudio();

  const comparison = useMemo(
    () => getMajorMinorComparison(comparisonKey),
    [comparisonKey]
  );

  const boxes = useMemo(() => getPentatonicBoxes(boxRoot), [boxRoot]);
  const activeBox = boxes.find((b) => b.number === activeBoxNum) ?? boxes[0];
  const pentMinor = scales.find((s) => s.id === "pentatonic-minor")!;

  const selectedProgression = progressions.find((p) => p.id === progressionId)!;
  const recommendation = useMemo(
    () => getScaleRecommendation(selectedProgression, practiceKey),
    [selectedProgression, practiceKey]
  );

  const selectedGenre = genres.find((g) => g.id === selectedGenreId)!;
  const genreScale = scales.find(
    (s) => s.id === selectedGenre.mainScales[0].scaleId
  )!;

  useEffect(() => {
    setPracticeKey(selectedProgression.defaultKey);
  }, [progressionId, selectedProgression.defaultKey]);

  const playBoxRun = useCallback(async () => {
    const positions = getScaleRunInBox(
      boxRoot,
      pentMinor.intervals,
      pentMinor.degrees,
      activeBox
    );
    for (const pos of positions) {
      await playFret(pos.stringIndex, pos.fret);
      await new Promise((r) => setTimeout(r, 280));
    }
  }, [activeBox, boxRoot, pentMinor, playFret]);

  const tabs: { id: PracticeTab; label: string; icon: string }[] = [
    { id: "basics", label: "מז'ור / מינור", icon: "🎵" },
    { id: "boxes", label: "קופסאות", icon: "📦" },
    { id: "studio", label: "סטודיו תרגול", icon: "🎸" },
    { id: "genres", label: "ז'אנרים", icon: "🌍" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition ${
              tab === t.id
                ? "bg-amber-600 font-semibold text-stone-950 shadow-md"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* BASICS TAB */}
      {tab === "basics" && (
        <div className="space-y-6">
          <section className="glass-card space-y-4 p-6">
            <h2 className="text-xl font-bold text-amber-400">
              {theoryBasics.majorVsMinor.title}
            </h2>
            <p className="text-stone-300">{theoryBasics.majorVsMinor.analogy}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-amber-700/30 bg-amber-950/20 p-4">
                <h3 className="font-bold text-amber-400">מז&apos;ור</h3>
                <p className="mt-2 text-sm text-stone-300">
                  {theoryBasics.majorVsMinor.majorDef}
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  {comparison.majorFeel}
                </p>
              </div>
              <div className="rounded-xl border border-violet-700/30 bg-violet-950/20 p-4">
                <h3 className="font-bold text-violet-400">מינור</h3>
                <p className="mt-2 text-sm text-stone-300">
                  {theoryBasics.majorVsMinor.minorDef}
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  {comparison.minorFeel}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="mb-1 block text-xs text-stone-500">
                  בחר טונאליות להשוואה
                </label>
                <select
                  value={comparisonKey}
                  onChange={(e) =>
                    setComparisonKey(e.target.value as NoteName)
                  }
                  className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
                >
                  {KEY_ROOTS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => playChord(comparison.majorChord)}
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 hover:bg-amber-500"
              >
                ▶ שמע {comparison.majorChord} מז&apos;ור
              </button>
              <button
                type="button"
                onClick={() => playChord(comparison.minorChord)}
                className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
              >
                ▶ שמע {comparison.minorChord} מינור
              </button>
            </div>
          </section>

          <section className="glass-card p-6">
            <h3 className="mb-3 font-bold text-stone-200">
              מה ההבדל בפועל? ({comparison.majorKey} מז&apos;ור vs{" "}
              {comparison.minorKey} מינור)
            </h3>
            <p className="mb-4 text-sm text-stone-400">
              {theoryBasics.majorVsMinor.practicalTip}
            </p>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium text-green-400">
                תווים משותפים (זהים בשניהם)
              </h4>
              <div className="flex flex-wrap gap-2">
                {comparison.sharedNotes.map((n) => (
                  <span
                    key={n}
                    className="rounded-lg border border-green-800/40 bg-green-950/30 px-3 py-1 text-sm text-green-300"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-red-400">
                תווים שונים — אלה שיוצרים את ההבדל
              </h4>
              <div className="space-y-2">
                {comparison.differentNotes.map((d) => (
                  <div
                    key={d.role}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <span className="rounded bg-amber-900/40 px-2 py-0.5 text-amber-300">
                      {d.major}
                    </span>
                    <span className="text-stone-600">vs</span>
                    <span className="rounded bg-violet-900/40 px-2 py-0.5 text-violet-300">
                      {d.minor}
                    </span>
                    <span className="text-stone-500">— {d.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-card p-6">
            <h3 className="mb-2 font-bold text-stone-200">
              {theoryBasics.whatAreBars.title}
            </h3>
            <p className="text-sm text-stone-300">
              {theoryBasics.whatAreBars.simple}
            </p>
            <p className="mt-2 text-sm text-amber-600/80">
              {theoryBasics.whatAreBars.practical}
            </p>
          </section>
        </div>
      )}

      {/* BOXES TAB */}
      {tab === "boxes" && (
        <div className="space-y-6">
          <section className="glass-card space-y-4 p-6">
            <h2 className="text-xl font-bold text-amber-400">
              {theoryBasics.whatAreBoxes.title}
            </h2>
            <p className="text-stone-300">{theoryBasics.whatAreBoxes.simple}</p>
            <p className="text-sm text-stone-400">{theoryBasics.whatAreBoxes.why}</p>
            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-4">
              <h3 className="font-semibold text-amber-400">איך מתרגלים?</h3>
              <p className="mt-1 text-sm text-stone-300">
                {theoryBasics.whatAreBoxes.howToPractice}
              </p>
            </div>
          </section>

          <section className="glass-card space-y-6 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="mb-1 block text-xs text-stone-500">
                  שורש הסולם
                </label>
                <select
                  value={boxRoot}
                  onChange={(e) => setBoxRoot(e.target.value as NoteName)}
                  className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
                >
                  {KEY_ROOTS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-400">
                <input
                  type="checkbox"
                  checked={displayMode === "degrees"}
                  onChange={(e) =>
                    setDisplayMode(e.target.checked ? "degrees" : "tab")
                  }
                  className="accent-amber-500"
                />
                הצג מעלות (1, b3, 5...)
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {boxes.map((box) => (
                <button
                  key={box.number}
                  type="button"
                  onClick={() => setActiveBoxNum(box.number)}
                  className={`rounded-xl border px-4 py-3 text-right transition ${
                    activeBoxNum === box.number
                      ? "border-amber-500 bg-amber-600/20"
                      : "border-stone-800 bg-stone-900/40 hover:border-stone-700"
                  }`}
                >
                  <div className="font-bold text-amber-400">{box.nameHe}</div>
                  <div className="text-xs text-stone-500">
                    פריטים {box.minFret}–{box.maxFret}
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
              <p className="text-sm text-stone-300">{activeBox.descriptionHe}</p>
              <p className="mt-2 text-sm text-amber-500">{activeBox.tipHe}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={playBoxRun}
                className="rounded-full bg-amber-600 px-5 py-2 font-medium text-stone-950 hover:bg-amber-500"
              >
                ▶ נגן ריצה בקופסה
              </button>
              <button
                type="button"
                onClick={() =>
                  playScale(getScaleNotes(boxRoot, pentMinor.intervals))
                }
                className="rounded-full border border-amber-700 px-5 py-2 text-amber-400 hover:bg-amber-950/50"
              >
                ▶ נגן סולם מלא
              </button>
            </div>

            <Fretboard
              frets={17}
              scaleRoot={boxRoot}
              scaleIntervals={pentMinor.intervals}
              scaleDegrees={pentMinor.degrees}
              activeBox={activeBox}
              displayMode={displayMode}
            />
          </section>
        </div>
      )}

      {/* STUDIO TAB */}
      {tab === "studio" && (
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/50 to-stone-900 p-6">
            <h2 className="mb-2 text-xl font-bold text-amber-400">
              סטודיו תרגול — הכל במקום אחד
            </h2>
            <p className="text-sm text-stone-300">
              בחר פרוגרשן → האפליקציה תגיד לך איזה סולם לנגן → הפעל backing track →
              אלתר על הקופסה המודגשת.
            </p>
          </section>

          <div className="flex flex-wrap gap-2">
            {progressions.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProgressionId(p.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  progressionId === p.id
                    ? "bg-amber-600 font-semibold text-stone-950"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                }`}
              >
                {p.nickname || p.nameHe}
              </button>
            ))}
          </div>

          <section className="glass-card space-y-6 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="mb-1 block text-xs text-stone-500">
                  טונאליות
                </label>
                <select
                  value={practiceKey}
                  onChange={(e) => setPracticeKey(e.target.value as NoteName)}
                  className="rounded-lg border border-amber-900/40 bg-stone-800 px-3 py-2 text-amber-300"
                >
                  {KEY_ROOTS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-400">
                {selectedProgression.genreHe}
              </span>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: `${recommendation.scale.color}44`,
                backgroundColor: `${recommendation.scale.color}11`,
              }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: recommendation.scale.color }}
              >
                {recommendation.headlineHe}
              </h3>
              <p className="mt-2 text-sm text-stone-300">
                {recommendation.explanationHe}
              </p>
              <p className="mt-2 text-sm text-stone-500">
                {recommendation.whyItWorksHe}
              </p>
              {recommendation.alternateScale && (
                <p className="mt-3 text-xs text-stone-500">
                  חלופה: {recommendation.alternateScale.labelHe}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {boxesForRoot(recommendation.root).map((box) => (
                  <button
                    key={box.number}
                    type="button"
                    onClick={() => setActiveBoxNum(box.number)}
                    className={`rounded-lg px-3 py-1.5 text-xs transition ${
                      activeBoxNum === box.number
                        ? "bg-amber-600 text-stone-950 font-semibold"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {box.nameHe}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-400">
                <input
                  type="checkbox"
                  checked={useBoxFilter}
                  onChange={(e) => setUseBoxFilter(e.target.checked)}
                  className="accent-amber-500"
                />
                הדגש קופסה
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-400">
                <input
                  type="checkbox"
                  checked={displayMode === "degrees"}
                  onChange={(e) =>
                    setDisplayMode(e.target.checked ? "degrees" : "tab")
                  }
                  className="accent-amber-500"
                />
                מעלות סולם
              </label>
            </div>

            <Fretboard
              frets={17}
              scaleRoot={recommendation.root}
              scaleIntervals={recommendation.scale.intervals}
              scaleDegrees={recommendation.scale.degrees}
              activeBox={
                useBoxFilter
                  ? boxesForRoot(recommendation.root).find(
                      (b) => b.number === activeBoxNum
                    ) ?? null
                  : null
              }
              displayMode={displayMode}
            />

            <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
              <h4 className="mb-2 font-semibold text-stone-300">
                תרגיל מומלץ עכשיו
              </h4>
              <ol className="list-inside list-decimal space-y-1 text-sm text-stone-400">
                <li>לחץ &quot;נגן פרוגרשן&quot; למטה</li>
                <li>נגן ריצה בקופסה (למעלה) — הכר את התווים</li>
                <li>עצור את הפרוגרשן, נגן 3 תווים → שקט → 3 תווים</li>
                <li>הפעל שוב ונסה לנחות על שורש האקורד בכל החלפה</li>
              </ol>
            </div>

            <ProgressionPlayer
              progression={selectedProgression}
              controlledKey={practiceKey}
              onKeyChange={setPracticeKey}
            />
          </section>
        </div>
      )}

      {/* GENRES TAB */}
      {tab === "genres" && (
        <div className="space-y-6">
          <section className="glass-card p-6">
            <h2 className="mb-2 text-xl font-bold text-amber-400">
              מה מתאים לכל ז&apos;אנר?
            </h2>
            <p className="text-sm text-stone-400">
              כל סגנון = סולמות שונים, גישה שונה לאלתור. בחר ז&apos;אנר וראה מה
              מומלץ.
            </p>
          </section>

          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGenreId(g.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  selectedGenreId === g.id
                    ? "bg-amber-600 font-semibold text-stone-950"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                }`}
              >
                <span>{g.emoji}</span>
                {g.nameHe}
              </button>
            ))}
          </div>

          <section className="glass-card space-y-6 p-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedGenre.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-stone-100">
                    {selectedGenre.nameHe}
                  </h3>
                  <p className="text-sm text-stone-500">{selectedGenre.vibe}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-amber-600/80">
                {selectedGenre.guitarType}
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-green-400">
                סולמות מומלצים
              </h4>
              <div className="space-y-3">
                {selectedGenre.mainScales.map((rs) => {
                  const scale = scales.find((s) => s.id === rs.scaleId)!;
                  return (
                    <div
                      key={rs.scaleId}
                      className="rounded-xl border border-stone-800 p-4"
                    >
                      <span
                        className="font-bold"
                        style={{ color: scale.color }}
                      >
                        {scale.nameHe}
                      </span>
                      <p className="mt-1 text-sm text-stone-400">{rs.why}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-stone-300">טון וסאונד</h4>
              <ul className="space-y-1">
                {selectedGenre.toneTips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-400">
                    <span className="text-amber-600">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-4">
              <h4 className="font-semibold text-amber-400">איך לאלתר</h4>
              <p className="mt-1 text-sm text-stone-300">
                {selectedGenre.improvApproach}
              </p>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-stone-500">
                האזן ל
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedGenre.listenTo.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-400"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-stone-300">
                דוגמה על הצוואר — {genreScale.nameHe}
              </h4>
              <Fretboard
                frets={12}
                scaleRoot="A"
                scaleIntervals={genreScale.intervals}
                scaleDegrees={genreScale.degrees}
                activeBox={getPentatonicBoxes("A")[0]}
                displayMode="tab"
              />
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-stone-500">
                פרוגרשנים מתאימים
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedGenre.progressions.map((pid) => {
                  const p = progressions.find((pr) => pr.id === pid);
                  return p ? (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => {
                        setProgressionId(pid);
                        setTab("studio");
                      }}
                      className="rounded-full bg-stone-800 px-3 py-1 text-xs text-amber-400 hover:bg-stone-700"
                    >
                      {p.nickname || p.nameHe} → תרגל
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function boxesForRoot(root: NoteName) {
  return getPentatonicBoxes(root);
}
