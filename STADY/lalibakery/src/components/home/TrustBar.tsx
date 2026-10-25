import { reviews, siteSettings } from "@/data/site";

/** Cold-start trust: real studio photos + WhatsApp + capacity — no fake stars. */
const items = [
  { title: "צילומים אמיתיים", body: "כל העוגות מהסטודיו — לא סטוק" },
  {
    title: "לקוחות שכתבו",
    body: `${reviews.length} ביקורות אמיתיות מהאתר ווואטסאפ`,
  },
  { title: "וואטסאפ מהיר", body: siteSettings.phone },
  { title: "קיבולת יומית", body: "עד 5 עוגות מורכבות ביום" },
];

export function TrustBar() {
  return (
    <section className="border-y-2 border-ink bg-pink-soft">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="text-center lg:text-right">
            <p className="text-sm font-extrabold text-ink">{item.title}</p>
            <p className="mt-1 text-sm font-medium text-ink/75">
              {item.title === "וואטסאפ מהיר" ? (
                <bdi>{item.body}</bdi>
              ) : (
                item.body
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
