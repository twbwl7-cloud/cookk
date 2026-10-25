import type { Metadata } from "next";
import { CakeBuilder } from "@/components/builder/CakeBuilder";

export const metadata: Metadata = {
  title: "Hybrid Style Fusion · בונה עוגות",
  description:
    "שילוב עוגת גן עם קוטור מעוצב לעוגה אחת — תצוגה תלת־ממד, מחיר שרת וואטסאפ.",
};

export default function BuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-2">
        3D Cake Builder
      </p>
      <h1 className="mt-2 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.03em] text-ink">
        Hybrid Style Fusion
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-ink/65">
        בוחרים בסיס (עוגת גן / מספרים / מעוצבת) ושכבת קוטור עליונה — רואים עוגה
        אחת חיה, מקבלים מחיר שרת, ושולחים פירוט מסודר לוואטסאפ.
      </p>
      <div className="mt-10">
        <CakeBuilder />
      </div>
    </div>
  );
}
