import Link from "next/link";
import { TextRevealMask } from "@/components/motion/TextRevealMask";
import { Reveal } from "@/components/motion/Reveal";

/** Script 2 Module D — Wedge strip (no named competitor attacks). */
const ROWS = [
  {
    them: "מקבלות הצעת מחיר רק אחרי וואטסאפ",
    us: "רואות מחיר לייב תוך כדי הרכבה ב־3D",
  },
  {
    them: "תמונות סטוק או גלריה מטושטשת",
    us: "צילומי סטודיו אמיתיים + הדמיית תלת־ממד מסומנת",
  },
  {
    them: "«נשארה אחת» / ספירה לאחור",
    us: "עד 5 עוגות מורכבות ביום · מינימום 3 ימי עסקים",
  },
] as const;

export function WhyUs() {
  return (
    <section className="border-y border-ink/15 bg-ink text-pink-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <TextRevealMask
            lines={["למה לא סוגרות", "בצ׳אט עיוור"]}
            className="text-3xl text-pink-soft sm:text-4xl"
          />
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-pink-soft/70">
            בשוק העוגות המותאמות רוב הלקוחות מפחדות ממחיר מפתיע ומתמונה שלא
            תואמת. אנחנו הופכות את זה — בונות, רואות, ורק אז משלמות.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {ROWS.map((row, i) => (
            <Reveal key={row.us} delay={i * 0.05}>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-2 md:gap-6 md:p-5">
                <p className="text-sm text-pink-soft/45 line-through decoration-pink-soft/25">
                  {row.them}
                </p>
                <p className="text-sm font-semibold text-gold-1">{row.us}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Link
            href="/builder"
            data-magnetic
            data-cursor-label="BUILD"
            className="btn-gold contact-shadow mt-10 inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold tracking-[-0.02em]"
          >
            לבדוק מחיר ב־3D
          </Link>
          <p className="mt-3 text-xs text-pink-soft/55">
            בלי התחברות · המחיר הסופי מאומת בשרת לפני תשלום
          </p>
        </Reveal>
      </div>
    </section>
  );
}
