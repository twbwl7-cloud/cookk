"use client";

import { useMemo } from "react";
import { BuilderCakePreview } from "@/components/builder/BuilderCakePreview";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { formatIls, whatsappLink } from "@/lib/utils";
import { siteSettings } from "@/data/site";
import {
  PLAQUE_MAX,
  useCakeBuilderStore,
  type AllergyFlag,
  type CakeDecor,
  type CakeFlavor,
  type CreamTone,
  type PipingStyle,
} from "@/store/cakeBuilder";
import { useCartStore } from "@/store/cart";
import { CREAM_HEX } from "@/lib/cake-pricing";

const tierOptions: { value: 1 | 2 | 3; label: string; hint: string }[] = [
  { value: 1, label: "קומה אחת", hint: "כלול בבסיס" },
  { value: 2, label: "שתי קומות", hint: "+₪180" },
  { value: 3, label: "שלוש קומות", hint: "+₪350" },
];

const flavorOptions: { value: CakeFlavor; label: string; hint: string }[] = [
  { value: "velvet_rose", label: "Velvet Rose", hint: "כלול" },
  { value: "belgian_chocolate", label: "שוקולד בלגי", hint: "+₪30" },
  { value: "vanilla_gold", label: "וניל פולי זהב", hint: "+₪40" },
];

const creamOptions: { value: CreamTone; label: string; hint: string }[] = [
  { value: "pearl_white", label: "פנינה", hint: "כלול" },
  { value: "baby_blush", label: "ורוד בייבי", hint: "כלול" },
  { value: "champagne", label: "שמפניה", hint: "+₪15" },
  { value: "soft_lilac", label: "לילך רך", hint: "+₪20" },
  { value: "pistachio", label: "פיסטוק", hint: "+₪20" },
  { value: "cocoa_dust", label: "קקאו", hint: "+₪25" },
  { value: "midnight_noir", label: "שחור פחם", hint: "+₪30" },
];

const pipingOptions: { value: PipingStyle; label: string; hint: string }[] = [
  { value: "smooth_buttercream", label: "חלק קלאסי", hint: "כלול" },
  { value: "classic_ruffles", label: "ראפלס", hint: "+₪45" },
  { value: "shell_border", label: "צדפות", hint: "+₪35" },
  { value: "rosette_garden", label: "ורדים", hint: "+₪70" },
  { value: "drip_ganache", label: "דריפ גנאש", hint: "+₪55" },
  { value: "vertical_ribbons", label: "סרטים אנכיים", hint: "+₪50" },
  { value: "swiss_dots", label: "נקודות שוויץ", hint: "+₪40" },
  { value: "lambeth_lace", label: "Lambeth תחרה", hint: "+₪95" },
];

const decorOptions: { value: CakeDecor; label: string; hint: string }[] = [
  { value: "sugar_flowers", label: "פרחי סוכר", hint: "+₪50" },
  { value: "sugar_sheet", label: "דף סוכר / תמונה", hint: "+₪65" },
  { value: "gold_leaf", label: "עלי זהב", hint: "+₪80" },
  { value: "macaron_crown", label: "כתר מקרונים", hint: "+₪70" },
  { value: "name_topper", label: "טופר שם זהב", hint: "+₪45" },
  { value: "fresh_berries", label: "פירות יער", hint: "+₪55" },
  { value: "chocolate_shards", label: "שבבי שוקולד", hint: "+₪40" },
];

const allergyOptions: { value: AllergyFlag; label: string }[] = [
  { value: "gluten_free", label: "ללא גלוטן" },
  { value: "vegan", label: "טבעוני" },
  { value: "sugar_free", label: "ללא סוכר" },
];

function ChoiceGrid<T extends string>({
  options,
  value,
  onChange,
  multi,
  selected,
  onToggle,
  swatches,
}: {
  options: { value: T; label: string; hint: string }[];
  value?: T;
  onChange?: (v: T) => void;
  multi?: boolean;
  selected?: T[];
  onToggle?: (v: T) => void;
  swatches?: Partial<Record<T, string>>;
}) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = multi
          ? selected?.includes(o.value)
          : value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() =>
              multi ? onToggle?.(o.value) : onChange?.(o.value)
            }
            className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-start text-sm font-bold transition-[transform,border-color,background-color] duration-200 ${
              active
                ? "border-gold-1 bg-gold-1/15 text-ink"
                : "border-ink/10 bg-white/50 text-ink/80 hover:border-gold-1/40"
            }`}
          >
            {swatches?.[o.value] ? (
              <span
                className="h-7 w-7 shrink-0 rounded-full border border-ink/15 shadow-inner"
                style={{ background: swatches[o.value] }}
                aria-hidden
              />
            ) : null}
            <span className="min-w-0 flex-1">
              {o.label}
              <span className="mt-0.5 block text-[11px] font-semibold text-gold-2">
                {o.hint}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CakeBuilder() {
  const tiers = useCakeBuilderStore((s) => s.tiers);
  const flavor = useCakeBuilderStore((s) => s.flavor);
  const creamTone = useCakeBuilderStore((s) => s.creamTone);
  const piping = useCakeBuilderStore((s) => s.piping);
  const decors = useCakeBuilderStore((s) => s.decors);
  const plaqueText = useCakeBuilderStore((s) => s.plaqueText);
  const allergies = useCakeBuilderStore((s) => s.allergies);
  const notes = useCakeBuilderStore((s) => s.notes);
  const setTiers = useCakeBuilderStore((s) => s.setTiers);
  const setFlavor = useCakeBuilderStore((s) => s.setFlavor);
  const setCreamTone = useCakeBuilderStore((s) => s.setCreamTone);
  const setPiping = useCakeBuilderStore((s) => s.setPiping);
  const toggleDecor = useCakeBuilderStore((s) => s.toggleDecor);
  const setPlaqueText = useCakeBuilderStore((s) => s.setPlaqueText);
  const toggleAllergy = useCakeBuilderStore((s) => s.toggleAllergy);
  const setNotes = useCakeBuilderStore((s) => s.setNotes);
  const priceIls = useCakeBuilderStore((s) => s.priceIls);
  const toCustomSpec = useCakeBuilderStore((s) => s.toCustomSpec);
  const addCustomCake = useCartStore((s) => s.addCustomCake);

  const total = priceIls();

  const waHref = useMemo(() => {
    const spec = toCustomSpec();
    const msg = [
      `היי ${siteSettings.brandName}! רוצה לשריין עוגה מה-Builder:`,
      `קומות: ${spec.tiers}`,
      `טעם: ${spec.flavor}`,
      `גוון קצפת: ${spec.creamTone}`,
      `זילוף: ${spec.piping}`,
      `קישוטים: ${spec.decors.join(", ") || "ללא"}`,
      `פלאק: ${spec.plaqueText || "—"}`,
      `אלרגיות: ${spec.allergies.join(", ") || "אין"}`,
      `הערות: ${spec.notes || "—"}`,
      `סה״כ משוער: ₪${total}`,
    ].join("\n");
    return whatsappLink(siteSettings.whatsapp, msg);
  }, [toCustomSpec, total]);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <BuilderCakePreview />
        <p className="mt-3 text-center font-display text-3xl tracking-[-0.02em] text-ink">
          {formatIls(total)}
          <span className="ms-2 text-sm font-sans font-semibold text-ink/55">
            כולל מע״מ · מתעדכן בלייב
          </span>
        </p>
      </div>

      <div className="space-y-6 rounded-[1.4rem] panel-blush p-5 sm:p-6">
        <section>
          <h2 className="font-display text-xl text-ink">1 · קומות</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {tierOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setTiers(o.value)}
                className={`rounded-2xl border px-3 py-3 text-sm font-bold ${
                  tiers === o.value
                    ? "border-gold-1 bg-gold-1/15 text-ink"
                    : "border-ink/10 bg-white/50 text-ink/80"
                }`}
              >
                {o.label}
                <span className="mt-1 block text-[11px] text-gold-2">
                  {o.hint}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">2 · טעם הבסיס</h2>
          <ChoiceGrid
            options={flavorOptions}
            value={flavor}
            onChange={setFlavor}
          />
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">3 · גוון הקצפת</h2>
          <p className="mt-1 text-xs font-medium text-ink/55">
            שבעה גוונים — נראים בשידור חי על העוגה
          </p>
          <ChoiceGrid
            options={creamOptions}
            value={creamTone}
            onChange={setCreamTone}
            swatches={CREAM_HEX}
          />
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">4 · סגנון זילוף</h2>
          <p className="mt-1 text-xs font-medium text-ink/55">
            מראפלס קלאסי עד Lambeth תחרה — כמו בסרטים
          </p>
          <ChoiceGrid
            options={pipingOptions}
            value={piping}
            onChange={setPiping}
          />
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">5 · קישוטים + דף סוכר</h2>
          <ChoiceGrid
            options={decorOptions}
            multi
            selected={decors}
            onToggle={toggleDecor}
          />
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">6 · פלאק ואלרגיות</h2>
          <label className="mt-3 block text-xs font-bold text-ink/70">
            טקסט על העוגה (עד {PLAQUE_MAX} תווים)
            <Input
              value={plaqueText}
              onChange={(e) => setPlaqueText(e.target.value)}
              maxLength={PLAQUE_MAX}
              className="mt-1 bg-white/80"
              placeholder="מזל טוב…"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {allergyOptions.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => toggleAllergy(a.value)}
                className={`rounded-full border px-3 py-2 text-xs font-bold ${
                  allergies.includes(a.value)
                    ? "border-gold-1 bg-gold-1/20 text-ink"
                    : "border-ink/15 text-ink/70"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-3 bg-white/80"
            placeholder="הערות לסטודיו — גיל, דמות, צבעים מדויקים…"
            rows={3}
          />
        </section>

        <div className="sticky bottom-20 z-10 space-y-2 border-t border-ink/10 pt-4 md:static md:bottom-auto">
          <Button
            type="button"
            className="btn-gold h-13 w-full rounded-full text-base font-bold"
            onClick={() => {
              addCustomCake(toCustomSpec());
            }}
          >
            להוסיף לעגלה · {formatIls(total)}
          </Button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center rounded-full border border-ink/20 text-sm font-bold text-ink hover:border-gold-1"
          >
            או לשלוח בוואטסאפ לשריון
          </a>
          <p className="text-center text-[11px] font-medium text-ink/50">
            המחיר סופי באישור הסטודיו · מינימום 3 ימי עסקים · עד 5 עוגות מורכבות ביום
          </p>
        </div>
      </div>
    </div>
  );
}
