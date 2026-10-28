import type { Metadata } from "next";
import { CakeBuilder } from "@/components/builder/CakeBuilder";

export const metadata: Metadata = {
  title: "עוגה אחת משולבת · גן × מעוצבת",
  description:
    "בסיס עוגת גן מחובר לאלמנט קוטור מעוצב — עוגה אחת, מחיר אחד, וואטסאפ מסודר.",
};

export default function BuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-6 rounded-2xl border border-gold-1/30 bg-white/70 px-4 py-3 text-sm font-medium text-ink/75">
        המסלול הראשי לבנייה Sur Mesure נמצא ב־
        <a href="/custom-cake" className="mx-1 font-extrabold text-gold-2 underline">
          בניית עוגה צעד־אחר־צעד
        </a>
        — כאן נשארת אפשרות המשולבת לגן × מעוצבת.
      </p>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-2">
        3D Cake Builder
      </p>
      <h1 className="mt-2 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.03em] text-ink">
        עוגה אחת משולבת · גן × מעוצבת
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-ink/65">
        בסיס עוגת גן מחובר לאלמנט קוטור מעוצב — יצירה אחת, מחיר אחד, הזמנה אחת
        בוואטסאפ. לא שתי עוגות. לא פיצול.
      </p>
      <div className="mt-10">
        <CakeBuilder />
      </div>
    </div>
  );
}
