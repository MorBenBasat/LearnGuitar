"use client";

import { PageHeader } from "@/components/PageHeader";
import { ScaleExplorer } from "@/components/ScaleExplorer";

export default function ScalesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="סולמות וקופסאות"
        description="כל הסולמות על הצוואר. בחר שורש (C, A, G...) וקופסה 1–5 — הכל מתעדכן."
      />
      <section className="glass-card p-6 sm:p-8">
        <ScaleExplorer />
      </section>
    </div>
  );
}
