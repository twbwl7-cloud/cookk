import type { Metadata } from "next";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">מדיניות פרטיות</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          אנו אוספים שם, טלפון, אימייל וכתובת למשלוח לצורך ביצוע הזמנות ושירות.
          פניות נשלחות ל־
          <span dir="ltr">{siteSettings.email}</span> ולואטסאפ העסקי.
        </p>
        <p>
          ב-Zustand נשמרים מזהי מוצר וכמויות בלבד — ללא PII רגיש. מחירים ומלאי
          מחושבים בשרת.
        </p>
        <p>
          לא מוכרים מידע לצדדים שלישיים לצורכי פרסום ללא הסכמה. ניתוח שימוש (GA4 /
          Clarity) יחובר עם הסכמת Cookies.
        </p>
      </div>
    </article>
  );
}
