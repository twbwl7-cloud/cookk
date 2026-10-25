const ITEMS = [
  "צילום סטודיו אמיתי",
  "מחיר לפני תשלום",
  "עד 5 עוגות מורכבות ביום",
  "איסוף נתניה",
  "מינימום 3 ימי עסקים",
  "Guest checkout",
  "בסיס מ־₪250",
  "LALI10 · 10%",
  "וואטסאפ אנושי",
] as const;

/** Endless word ribbon under the hero — always moving. */
export function TrustMarquee() {
  const line = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative z-20 overflow-hidden border-y border-white/50 bg-white/35 py-3.5 backdrop-blur-2xl"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-1/50 to-transparent" />
      <div className="trust-marquee flex w-max gap-10 whitespace-nowrap ps-4">
        {line.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="text-xs font-extrabold tracking-[0.12em] text-ink/70"
          >
            {t}
            <span className="ms-10 text-gold-1">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
