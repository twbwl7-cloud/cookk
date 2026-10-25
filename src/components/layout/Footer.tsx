import Link from "next/link";
import { siteSettings } from "@/data/site";

/** Soft atelier footer — cream/blush/gold, never a dark scare slab. */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-baby/40 bg-gradient-to-b from-[#fffaf8] to-pink-soft/80 text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ink">{siteSettings.brandName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/65">
            {siteSettings.tagline} — עוגות גן, מספרים ומעוצבות לפי הזמנה.
            וואטסאפ: <bdi>{siteSettings.phone}</bdi>
          </p>
        </div>
        <div>
          <p className="text-sm font-extrabold text-gold-2">ניווט</p>
          <ul className="mt-3 space-y-2 text-sm font-medium text-ink/70">
            <li>
              <Link href="/collections/gan" className="hover:text-gold-2">
                עוגות גן
              </Link>
            </li>
            <li>
              <Link href="/collections/misparim" className="hover:text-gold-2">
                עוגות מספרים
              </Link>
            </li>
            <li>
              <Link href="/collections/meutzavot" className="hover:text-gold-2">
                עוגות מעוצבות
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold-2">
                אודות
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold-2">
                צור קשר
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-extrabold text-gold-2">פרטי עסק</p>
          <ul className="mt-3 space-y-2 text-sm font-medium text-ink/70">
            <li>
              {siteSettings.legalName} · ע.מ{" "}
              <bdi>{siteSettings.businessId}</bdi>
            </li>
            <li>
              <a href={`tel:${siteSettings.phone}`} className="hover:text-gold-2">
                <bdi>{siteSettings.phone}</bdi>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteSettings.email}`}
                className="hover:text-gold-2"
                dir="ltr"
              >
                {siteSettings.email}
              </a>
            </li>
            <li>{siteSettings.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold-1/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs font-semibold text-ink/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-gold-2">
              תקנון
            </Link>
            <Link href="/privacy" className="hover:text-gold-2">
              פרטיות
            </Link>
            <Link href="/accessibility" className="hover:text-gold-2">
              נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
