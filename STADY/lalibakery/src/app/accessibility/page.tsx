import type { Metadata } from "next";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = { title: "הצהרת נגישות" };

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">הצהרת נגישות</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          {siteSettings.brandName} פועלת להנגשת האתר בהתאם לתקן ישראלי ת״י 5568
          ולהנחיות WCAG 2.1 ברמת AA ככל הניתן.
        </p>
        <p>
          האתר תומך בניווט מקלדת, טקסט חלופי לתמונות מוצר, ניגודיות גבוהה בין
          שחור לורוד, וכיבוד `prefers-reduced-motion`.
        </p>
        <p>
          רכז/ת נגישות: מנהל/ת המותג ·{" "}
          <a className="underline" href={`mailto:${siteSettings.email}`} dir="ltr">
            {siteSettings.email}
          </a>{" "}
          · <bdi>{siteSettings.phone}</bdi>
        </p>
        <p>תאריך עדכון אחרון: אוקטובר 2026.</p>
      </div>
    </article>
  );
}
