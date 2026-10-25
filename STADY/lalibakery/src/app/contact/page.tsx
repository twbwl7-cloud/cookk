import type { Metadata } from "next";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { ContactForm } from "@/components/checkout/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
};

export default function ContactPage() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `שלום ${siteSettings.brandName}, אשמח ליצירת קשר`,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">צור קשר</h1>
          <p className="mt-3 text-ink-muted">
            פניות מגיעות למייל, לוואטסאפ, ולגיליון הזמנות מסודר לבעל הבית.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              טלפון:{" "}
              <a className="font-semibold underline" href={`tel:${siteSettings.phone}`}>
                <bdi>{siteSettings.phone}</bdi>
              </a>
            </li>
            <li>
              מייל:{" "}
              <a
                className="font-semibold underline"
                href={`mailto:${siteSettings.email}`}
                dir="ltr"
              >
                {siteSettings.email}
              </a>
            </li>
            <li>
              וואטסאפ:{" "}
              <a className="font-semibold underline" href={wa} target="_blank" rel="noopener noreferrer">
                פתיחת צ׳אט
              </a>
            </li>
            <li>{siteSettings.hours}</li>
            <li>{siteSettings.address}</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
