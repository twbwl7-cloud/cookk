import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { CakeBuilder } from "@/components/builder/CakeBuilder";

export const metadata: Metadata = {
  title: "הרכבת עוגה בשידור חי",
  description:
    "Cake Builder תלת־ממד של LALIBAKERY — קומות, גווני קצפת, זילופים ודף סוכר עם מחיר בלייב.",
};

export default function BuilderPage() {
  return (
    <div className="text-ink">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-sm font-bold text-gold-2">
          {siteSettings.brandName} · Builder חי
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-ink">
          בונות את העוגה — רואות את המחיר
        </h1>
        <p className="mt-3 max-w-xl text-sm font-medium text-ink/65">
          7 גווני קצפת · 8 סגנונות זילוף · דף סוכר · בסיס <bdi>₪250</bdi> · עד 25
          תווים על הפלאק · מינימום 3 ימי עסקים.
        </p>
        <CakeBuilder />
        <p className="mt-8 text-center text-sm text-ink/55">
          מעדיפות מהקטלוג?{" "}
          <Link href="/shop" className="font-bold text-gold-2 underline">
            לכל העוגות
          </Link>
        </p>
      </div>
    </div>
  );
}
