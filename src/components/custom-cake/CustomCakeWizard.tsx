"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  ADDONS,
  BASES,
  CAKE_COLORS,
  CATEGORIES,
  COATINGS,
  CREAMS,
  EXCLUSIONS,
  FILLINGS,
  THEMES,
  WIZARD_STEPS,
  categoryOf,
} from "@/data/custom-cake";
import { useCustomCakeStore } from "@/store/custom-cake";
import {
  buildCustomCakeLines,
  buildWhatsAppMessage,
  estimateCustomCakeIls,
  servingsLabel,
} from "@/lib/custom-cake-summary";
import { encodeOrderPayload, toOrderPayload } from "@/lib/order-payload";
import { absoluteUrl } from "@/lib/site-url";
import { formatIls, whatsappLink, cn } from "@/lib/utils";
import { siteSettings } from "@/data/site";

function Chip({
  active,
  onClick,
  children,
  swatch,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition",
        active
          ? "border-ink bg-ink text-pink-soft"
          : "border-ink/12 bg-white/70 text-ink hover:border-gold-1/50",
      )}
    >
      {swatch && (
        <span
          className="h-3.5 w-3.5 rounded-full border border-ink/10"
          style={{ background: swatch }}
        />
      )}
      {children}
    </button>
  );
}

function OptionCard({
  active,
  title,
  note,
  onClick,
  image,
  priority,
}: {
  active?: boolean;
  title: string;
  note?: string;
  onClick: () => void;
  image?: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[1.35rem] border text-right transition",
        active
          ? "border-gold-1 bg-white shadow-[0_18px_50px_-28px_rgba(13,13,13,0.45)]"
          : "border-ink/8 bg-white/55 hover:border-gold-1/35",
      )}
    >
      {image && (
        <div className="relative aspect-[5/3] overflow-hidden bg-[#f7f2f0]">
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {active && (
            <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-pink-soft">
              <Check size={16} strokeWidth={2.5} />
            </span>
          )}
        </div>
      )}
      <div className="px-4 py-3.5">
        <p className="font-display text-lg font-bold leading-tight text-ink">{title}</p>
        {note && <p className="mt-1 text-[12px] font-medium leading-snug text-ink/55">{note}</p>}
      </div>
    </button>
  );
}

export function CustomCakeWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const store = useCustomCakeStore();
  const {
    step,
    setStep,
    category,
    setCategory,
    figure,
    sizeId,
    baseId,
    creamId,
    fillingId,
    coatingId,
    colors,
    themeId,
    addons,
    exclusions,
    allergy,
    message,
    notes,
    date,
    patch,
    canContinue,
  } = store;

  const cat = categoryOf(category);
  const totalIls = useMemo(() => estimateCustomCakeIls(store), [store]);
  const lines = useMemo(() => buildCustomCakeLines(store), [store]);
  const servings = servingsLabel(store);
  const stepMeta = WIZARD_STEPS[step - 1];

  useEffect(() => {
    const raw = Number(params.get("step") || "1");
    if (raw >= 1 && raw <= 5 && raw !== step) setStep(raw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const current = params.get("step");
    if (String(step) !== current) {
      const q = new URLSearchParams(params.toString());
      q.set("step", String(step));
      router.replace(`/custom-cake?${q.toString()}`, { scroll: false });
    }
  }, [step, params, router]);

  const goNext = () => {
    if (!canContinue()) return;
    setStep(step + 1);
  };
  const goBack = () => setStep(Math.max(1, step - 1));

  const orderLinks = useMemo(() => {
    const token = encodeOrderPayload(toOrderPayload(store, totalIls));
    const imageUrl = absoluteUrl(`/api/order-card?p=${token}`);
    const bakerPageUrl = absoluteUrl(`/z?p=${token}`);
    return { imageUrl, bakerPageUrl, token };
  }, [store, totalIls]);

  const wa = whatsappLink(
    siteSettings.whatsapp,
    buildWhatsAppMessage(store, totalIls, {
      imageUrl: orderLinks.imageUrl,
      bakerPageUrl: orderLinks.bakerPageUrl,
    }),
  );

  const bases = BASES.filter((b) => cat?.baseIds.includes(b.id));
  const creams = CREAMS.filter((c) => cat?.creamIds.includes(c.id));
  const fillings = FILLINGS.filter((f) => cat?.fillingIds.includes(f.id));
  const coatings = COATINGS.filter((c) => cat?.coatingIds.includes(c.id));

  return (
    <div className="relative">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-16 h-72 bg-[radial-gradient(700px_280px_at_80%_0%,rgb(242_196_206_/_0.55),transparent_60%),radial-gradient(500px_240px_at_10%_20%,rgb(212_175_55_/_0.18),transparent_55%)]"
      />

      <header className="relative max-w-2xl">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-gold-2">
          הזמנה אישית · צעד אחר צעד
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.85rem,4.5vw,3rem)] font-bold tracking-[-0.03em] text-ink">
          בונים את העוגה שלכם
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ink/65">
          שיטת ההרכבה מהאתר הקלאסי — סוג, גודל, קרם ועיצוב, הסרות — עם הלוקסוס של
          LALIBAKERY. עוגה אחת. סיכום אחד. וואטסאפ אחד.
        </p>
      </header>

      {/* Progress */}
      <nav aria-label="שלבי ההזמנה" className="relative mt-10">
        <div className="md:hidden">
          <div className="flex items-baseline justify-between text-[15px]">
            <span className="font-extrabold text-ink">{stepMeta.title}</span>
            <span className="font-bold text-ink/45">
              {step}/5
            </span>
          </div>
          <div className="mt-3 h-[3px] rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-gradient-to-l from-gold-1 to-pink-deep transition-[width] duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
        <ol className="hidden items-center gap-2 md:flex">
          {WIZARD_STEPS.map((s, i) => {
            const done = step > s.id;
            const current = step === s.id;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2 last:flex-none">
                <button
                  type="button"
                  disabled={s.id > step && !canContinue() && s.id === step + 1}
                  onClick={() => {
                    if (s.id <= step) setStep(s.id);
                  }}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-extrabold transition",
                      current || done
                        ? "border-ink bg-ink text-pink-soft"
                        : "border-ink/20 text-ink/40",
                    )}
                  >
                    {done ? <Check size={14} strokeWidth={2.5} /> : s.id}
                  </span>
                  <span
                    className={cn(
                      "hidden whitespace-nowrap text-[13px] font-bold lg:inline",
                      current || done ? "text-ink" : "text-ink/40",
                    )}
                  >
                    {s.title}
                  </span>
                </button>
                {i < WIZARD_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      "h-px min-w-4 flex-1",
                      done ? "bg-ink/30" : "bg-ink/10",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="relative mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
        <section className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-gold-2">
                שלב {step} מתוך 5
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.45rem,3vw,2rem)] font-bold text-ink">
                {stepMeta.heading}
              </h2>
              <p className="mt-2 max-w-xl text-sm font-medium text-ink/55">
                {stepMeta.sub}
              </p>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="mt-7 space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CATEGORIES.map((c, i) => (
                      <OptionCard
                        key={c.id}
                        active={category === c.id}
                        title={c.title}
                        note={c.blurb}
                        image={c.image}
                        priority={i < 2}
                        onClick={() => setCategory(c.id)}
                      />
                    ))}
                  </div>
                  {category === "number" && (
                    <div>
                      <label className="block text-sm font-extrabold text-ink">
                        ספרה או אות
                      </label>
                      <input
                        value={figure}
                        onChange={(e) =>
                          patch({ figure: e.target.value.slice(0, 3).toUpperCase() })
                        }
                        placeholder="למשל 18 · א · ת"
                        className="mt-2 h-12 w-full max-w-xs rounded-[1rem] border border-ink/12 bg-white px-4 text-right text-lg font-bold outline-none focus:border-gold-1/50"
                      />
                    </div>
                  )}
                  {category === "hybrid" && (
                    <p className="rounded-[1.1rem] border border-gold-1/35 bg-[#fffaf8] px-4 py-3 text-sm font-bold text-ink/70">
                      <Sparkles className="me-1 inline text-gold-2" size={14} />
                      זו עוגה אחת מחוברת — בסיס גן + אלמנט קוטור. לא שתי הזמנות.
                    </p>
                  )}
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && cat && (
                <div className="mt-7 space-y-8">
                  <div>
                    <p className="text-sm font-extrabold text-ink">גודל</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {cat.sizes.map((sz) => (
                        <button
                          key={sz.id}
                          type="button"
                          onClick={() => patch({ sizeId: sz.id })}
                          className={cn(
                            "rounded-[1.2rem] border px-4 py-4 text-right transition",
                            sizeId === sz.id
                              ? "border-gold-1 bg-white"
                              : "border-ink/10 bg-white/60",
                          )}
                        >
                          <p className="font-display text-lg font-bold">{sz.label}</p>
                          {sz.detail && (
                            <p className="mt-1 text-xs font-medium text-ink/50">{sz.detail}</p>
                          )}
                          <p className="mt-2 text-sm font-bold text-ink/70">
                            מ־{formatIls(sz.priceFromIls)}
                            {sz.perFigure ? " לספרה" : ""} ·{" "}
                            {sz.servings[0] === sz.servings[1]
                              ? `${sz.servings[0]} מנות`
                              : `${sz.servings[0]}–${sz.servings[1]} מנות`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">בסיס / טעם עוגה</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bases.map((b) => (
                        <Chip
                          key={b.id}
                          active={baseId === b.id}
                          swatch={b.hex}
                          onClick={() => patch({ baseId: b.id })}
                        >
                          {b.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="mt-7 space-y-8">
                  <div>
                    <p className="text-sm font-extrabold text-ink">קרם חיצוני</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {creams.map((c) => (
                        <Chip
                          key={c.id}
                          active={creamId === c.id}
                          swatch={c.hex}
                          onClick={() => patch({ creamId: c.id })}
                        >
                          {c.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">מילוי בין שכבות</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fillings.map((f) => (
                        <Chip
                          key={f.id}
                          active={fillingId === f.id}
                          swatch={f.hex}
                          onClick={() =>
                            patch({ fillingId: fillingId === f.id ? null : f.id })
                          }
                        >
                          {f.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">ציפוי / גימור</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {coatings.map((c) => (
                        <Chip
                          key={c.id}
                          active={coatingId === c.id}
                          onClick={() => patch({ coatingId: c.id })}
                        >
                          {c.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">צבעים · עד 3</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {CAKE_COLORS.map((c) => {
                        const on = colors.includes(c.id);
                        return (
                          <Chip
                            key={c.id}
                            active={on}
                            swatch={c.hex}
                            onClick={() => {
                              if (on) patch({ colors: colors.filter((x) => x !== c.id) });
                              else if (colors.length < 3)
                                patch({ colors: [...colors, c.id] });
                            }}
                          >
                            {c.label}
                          </Chip>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">נושא עיצובי</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {THEMES.map((t) => (
                        <Chip
                          key={t.id}
                          active={themeId === t.id}
                          onClick={() =>
                            patch({ themeId: themeId === t.id ? null : t.id })
                          }
                        >
                          {t.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">תוספות</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ADDONS.map((a) => {
                        const on = addons.includes(a.id);
                        return (
                          <Chip
                            key={a.id}
                            active={on}
                            onClick={() => {
                              if (on) patch({ addons: addons.filter((x) => x !== a.id) });
                              else if (addons.length < 8)
                                patch({ addons: [...addons, a.id] });
                            }}
                          >
                            {a.label}
                          </Chip>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="mt-7 space-y-5">
                  <div>
                    <label className="block text-[15px] font-extrabold text-ink">
                      מה להוסיף / להוריד / לשנות?
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => patch({ notes: e.target.value.slice(0, 800) })}
                      rows={4}
                      placeholder="לדוגמה: סרטים ורודים במקום ירוקים, להוריד את השם תמר, להוסיף פרחים זהב…"
                      className="mt-2.5 w-full resize-y rounded-[1.1rem] border border-ink/12 bg-white px-4 py-3 text-right text-sm leading-relaxed outline-none focus:border-gold-1/45"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-ink">
                      כיתוב על העוגה
                    </label>
                    <input
                      value={message}
                      onChange={(e) => patch({ message: e.target.value.slice(0, 40) })}
                      maxLength={40}
                      placeholder="מזל טוב יגל"
                      className="mt-2 h-12 w-full rounded-[1rem] border border-ink/12 bg-white px-4 text-right text-sm outline-none focus:border-gold-1/45"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">בקשות הסרה / אלרגיות</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {EXCLUSIONS.map((e) => {
                        const on = exclusions.includes(e.id);
                        return (
                          <Chip
                            key={e.id}
                            active={on}
                            onClick={() => {
                              if (on)
                                patch({
                                  exclusions: exclusions.filter((x) => x !== e.id),
                                });
                              else patch({ exclusions: [...exclusions, e.id] });
                            }}
                          >
                            {e.label}
                          </Chip>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => patch({ allergy: !allergy })}
                      className={cn(
                        "mt-3 rounded-full px-4 py-2 text-xs font-extrabold",
                        allergy ? "bg-ink text-pink-soft" : "bg-[#fff5f7] text-ink",
                      )}
                    >
                      {allergy ? "יש אלרגיה — נפרט בוואטסאפ ✓" : "יש אלרגיה לציין"}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-ink">
                      תאריך האירוע
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => patch({ date: e.target.value })}
                      className="mt-2 h-12 rounded-[1rem] border border-ink/12 bg-white px-4 text-sm outline-none focus:border-gold-1/45"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="mt-7 space-y-5">
                  <div className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white/80">
                    {cat?.image && (
                      <div className="relative aspect-[16/9] bg-[#f7f2f0]">
                        <Image
                          src={cat.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="800px"
                        />
                        {category === "hybrid" && (
                          <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold text-ink">
                            עוגה אחת משולבת · גן × מעוצבת
                          </span>
                        )}
                      </div>
                    )}
                    <ul className="divide-y divide-ink/8 px-5 py-2">
                      {lines.map((l) => (
                        <li
                          key={l.label + l.text}
                          className="flex items-start justify-between gap-4 py-3 text-sm"
                        >
                          <span className="font-bold text-ink/45">{l.label}</span>
                          <span className="max-w-[70%] text-left font-extrabold text-ink">
                            {l.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-ink/8 bg-[#fffaf8] px-4 py-4">
                      <p className="text-right text-xs font-extrabold text-ink">
                        📷 תמונה במצורף לאופה
                      </p>
                      <p className="mt-1 text-right text-[11px] font-medium text-ink/50">
                        הקישור בתקציר הוואטסאפ פותח כרטיס עם תמונת העוגה + כל הבחירות — כדי שבעל הבית יראה בדיוק מה להכין.
                      </p>
                      <a
                        href={orderLinks.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block overflow-hidden rounded-[1rem] border border-ink/10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={orderLinks.imageUrl}
                          alt="כרטיס הזמנה עם תמונת העוגה"
                          className="w-full"
                        />
                      </a>
                      <a
                        href={orderLinks.bakerPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-[11px] font-bold text-gold-2 underline"
                      >
                        פתיחת דף מלא לאופה
                      </a>
                    </div>
                    <div className="flex items-center justify-between border-t border-ink/8 px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-ink/45">מחיר משוער</p>
                        <p className="font-display text-2xl font-bold text-ink">
                          {formatIls(totalIls)}
                        </p>
                        {servings && (
                          <p className="mt-0.5 text-xs font-medium text-ink/50">{servings}</p>
                        )}
                      </div>
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold contact-shadow inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold text-ink"
                        data-magnetic
                        data-cursor-label="וואטסאפ"
                      >
                        לשלוח בוואטסאפ + תמונה
                      </a>
                    </div>
                  </div>
                  <p className="text-center text-[12px] font-medium text-ink/45">
                    הוואטסאפ כולל קישור לתמונת העוגה. לפני האפייה מאשרים יחד. המחיר הסופי אחרי אישור.
                  </p>
                </div>
              )}

              {/* Nav buttons */}
              <div className="mt-10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1}
                  className="inline-flex h-11 items-center gap-1 rounded-full px-4 text-sm font-bold text-ink/55 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                  חזרה
                </button>
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canContinue()}
                    className="btn-gold contact-shadow inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-extrabold text-ink disabled:opacity-40"
                    data-magnetic
                    data-cursor-label="המשך"
                  >
                    המשך
                    <ChevronLeft size={16} />
                  </button>
                ) : (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold contact-shadow inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-extrabold text-ink"
                  >
                    אישור + שליחה עם תמונה
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/75 p-5 shadow-[0_24px_60px_-36px_rgba(13,13,13,0.4)] backdrop-blur-xl">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-gold-2">
              העוגה שלכם
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">
              {cat?.title ?? "עוד לא בחרתם סוג"}
            </h3>
            {cat?.image && (
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[#f7f2f0]">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>
            )}
            <ul className="mt-4 space-y-2">
              {lines.length === 0 && (
                <li className="text-sm font-medium text-ink/40">
                  בחירות יופיעו כאן בזמן אמת
                </li>
              )}
              {lines.slice(0, 8).map((l) => (
                <li key={l.label} className="flex justify-between gap-3 text-[13px]">
                  <span className="font-bold text-ink/40">{l.label}</span>
                  <span className="max-w-[60%] truncate font-extrabold text-ink">
                    {l.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-ink/8 pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-bold text-ink/40">מ־מחיר</p>
                  <p className="font-display text-2xl font-bold text-ink">
                    {totalIls > 0 ? formatIls(totalIls) : "—"}
                  </p>
                </div>
                {servings && (
                  <p className="text-xs font-bold text-ink/50">{servings}</p>
                )}
              </div>
              {step < 5 && (
                <p className="mt-3 text-[11px] font-medium text-ink/40">
                  הבא: {WIZARD_STEPS[Math.min(4, step)]?.title}
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
