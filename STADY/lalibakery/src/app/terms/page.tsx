import type { Metadata } from "next";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = { title: "תקנון" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose-headings:font-display sm:px-6">
      <h1 className="font-display text-4xl">תקנון אתר ומדיניות ביטול</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          האתר מופעל על ידי {siteSettings.legalName}, ע.מ{" "}
          <bdi>{siteSettings.businessId}</bdi>.
        </p>
        <p>
          ביטול עסקה יתבצע בהתאם לחוק הגנת הצרכן, התשמ״א-1981 ותקנותיו. מוצרים
          סגורים באריזה מקורית ניתנים להחזרה/החלפה בכפוף לתנאים המפורטים בעת
          הרכישה.
        </p>
        <p>
          זמן הכנה ואריזה: 1–2 ימי עסקים. משלוח אקספרס לכל הארץ בעלות{" "}
          <bdi>₪{siteSettings.shippingFlatIls}</bdi>, חינם בהזמנות מעל{" "}
          <bdi>₪{siteSettings.freeShippingFromIls}</bdi>.
        </p>
        <p>
          מסמך זה הוא תבנית מקצועית להתאמה משפטית לפני עלייה לאוויר — יש לאשר עם
          יועץ משפטי.
        </p>
      </div>
    </article>
  );
}
