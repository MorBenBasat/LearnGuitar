"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LearnFlow } from "@/components/LearnFlow";

function LearnContent() {
  const searchParams = useSearchParams();
  return (
    <LearnFlow
      initialGenre={searchParams.get("genre") ?? undefined}
      initialProgression={searchParams.get("progression") ?? undefined}
    />
  );
}

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="page-title">למידה</h1>
        <p className="mt-2 text-stone-400">
          ז&apos;אנר → פרוגרשן → שיעור. צעד אחד בכל פעם.
        </p>
      </header>
      <Suspense>
        <LearnContent />
      </Suspense>
    </div>
  );
}
