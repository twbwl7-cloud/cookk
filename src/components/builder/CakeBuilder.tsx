"use client";

import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import {
  ACCENT_LABEL,
  CATEGORY_LABEL,
  FROST_LABEL,
  PIPING_LABEL,
  type AccentSet,
  type FrostTone,
  type PipingStyle,
} from "@/types/cake-builder";
import type { CakeCategory } from "@/types/commerce";
import { useCakeBuilderStore } from "@/store/cake-builder";
import { estimateHybridClient } from "@/lib/cake-pricing-client";
import { quoteAndWhatsAppCake } from "@/actions/quote-cake";
import { formatIls } from "@/lib/utils";

const BuilderCakePreview = dynamic(
  () =>
    import("@/components/builder/BuilderCakePreview").then(
      (m) => m.BuilderCakePreview,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[340px] items-center justify-center rounded-[1.5rem] bg-pink-soft/50 sm:h-[420px]">
        <p className="text-sm font-bold text-ink/50">טוענים תצוגה תלת־ממד…</p>
      </div>
    ),
  },
);

const FROSTS = Object.keys(FROST_LABEL) as FrostTone[];
const PIPINGS = Object.keys(PIPING_LABEL) as PipingStyle[];
const ACCENTS = Object.keys(ACCENT_LABEL) as AccentSet[];
const CATS = Object.keys(CATEGORY_LABEL) as CakeCategory[];

function ChipRow<T extends string>({
  options,
  labels,
  value,
  onChange,
}: {
  options: T[];
  labels: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
            value === o
              ? "bg-ink text-pink-soft"
              : "bg-white/70 text-ink border border-ink/10"
          }`}
        >
          {labels[o]}
        </button>
      ))}
    </div>
  );
}

export function CakeBuilder() {
  const hybridMode = useCakeBuilderStore((s) => s.hybridMode);
  const setHybridMode = useCakeBuilderStore((s) => s.setHybridMode);
  const baseStyle = useCakeBuilderStore((s) => s.baseStyle);
  const secondaryStyle = useCakeBuilderStore((s) => s.secondaryStyle);
  const fusionRatio = useCakeBuilderStore((s) => s.fusionRatio);
  const setFusionRatio = useCakeBuilderStore((s) => s.setFusionRatio);
  const patchBase = useCakeBuilderStore((s) => s.patchBase);
  const patchSecondary = useCakeBuilderStore((s) => s.patchSecondary);
  const plaqueText = useCakeBuilderStore((s) => s.plaqueText);
  const setPlaqueText = useCakeBuilderStore((s) => s.setPlaqueText);
  const numbersText = useCakeBuilderStore((s) => s.numbersText);
  const setNumbersText = useCakeBuilderStore((s) => s.setNumbersText);
  const sugarSheet = useCakeBuilderStore((s) => s.sugarSheet);
  const setSugarSheet = useCakeBuilderStore((s) => s.setSugarSheet);
  const sugarNote = useCakeBuilderStore((s) => s.sugarNote);
  const setSugarNote = useCakeBuilderStore((s) => s.setSugarNote);
  const notes = useCakeBuilderStore((s) => s.notes);
  const setNotes = useCakeBuilderStore((s) => s.setNotes);
  const toSpec = useCakeBuilderStore((s) => s.toSpec);

  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[]>([]);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [serverTotal, setServerTotal] = useState<number | null>(null);

  const estimate = estimateHybridClient(toSpec());

  const sendWhatsApp = () => {
    startTransition(async () => {
      const result = await quoteAndWhatsAppCake(toSpec());
      if (!result.ok) {
        setErrors(result.errors);
        setWaUrl(null);
        return;
      }
      setErrors([]);
      setServerTotal(result.totalIls);
      setWaUrl(result.whatsappUrl);
      window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <BuilderCakePreview />
        <p className="mt-3 text-center text-xs font-semibold text-ink/50">
          Hybrid Style Fusion · בסיס גן + קוטור עליון — עוגה אחת
        </p>
      </div>

      <div className="glass-liquid space-y-5 rounded-[1.5rem] p-5 sm:p-6">
        {/* Hybrid toggle */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-2">
              Hybrid Mode
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ink">
              שילוב סגנונות
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={hybridMode}
            onClick={() => setHybridMode(!hybridMode)}
            className={`relative h-9 w-16 rounded-full transition ${
              hybridMode ? "bg-gold-1" : "bg-ink/15"
            }`}
          >
            <span
              className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition ${
                hybridMode ? "right-1" : "right-8"
              }`}
            />
          </button>
        </div>

        {hybridMode && (
          <div>
            <label className="text-xs font-extrabold text-ink" htmlFor="fusion">
              יחס שילוב · fusionRatio{" "}
              <bdi>{Math.round(fusionRatio * 100)}%</bdi> קוטור
            </label>
            <input
              id="fusion"
              type="range"
              min={0.2}
              max={0.85}
              step={0.05}
              value={fusionRatio}
              onChange={(e) => setFusionRatio(Number(e.target.value))}
              className="mt-2 w-full accent-[#D4AF37]"
            />
            <p className="mt-1 text-[11px] text-ink/45">
              שמאל = יותר גן · ימין = יותר מעוצבת/קוטור
            </p>
          </div>
        )}

        {/* Base layer */}
        <section className="rounded-2xl border border-white/60 bg-white/50 p-4">
          <p className="text-xs font-extrabold text-gold-2">שכבת בסיס</p>
          <ChipRow
            options={CATS}
            labels={CATEGORY_LABEL}
            value={baseStyle.category}
            onChange={(category) =>
              patchBase({
                category,
                label: CATEGORY_LABEL[category],
              })
            }
          />
          <p className="mt-3 text-[11px] font-bold text-ink/55">קרם</p>
          <ChipRow
            options={FROSTS}
            labels={FROST_LABEL}
            value={baseStyle.frost}
            onChange={(frost) => patchBase({ frost })}
          />
          <p className="mt-3 text-[11px] font-bold text-ink/55">צנרת</p>
          <ChipRow
            options={PIPINGS}
            labels={PIPING_LABEL}
            value={baseStyle.piping}
            onChange={(piping) => patchBase({ piping })}
          />
          <p className="mt-3 text-[11px] font-bold text-ink/55">קישוטים</p>
          <ChipRow
            options={ACCENTS}
            labels={ACCENT_LABEL}
            value={baseStyle.accents}
            onChange={(accents) => patchBase({ accents })}
          />
        </section>

        {/* Secondary / couture */}
        {hybridMode && (
          <section className="rounded-2xl border border-gold-1/30 bg-pink-soft/30 p-4">
            <p className="text-xs font-extrabold text-gold-2">
              שכבת קוטור עליונה
            </p>
            <ChipRow
              options={CATS}
              labels={CATEGORY_LABEL}
              value={secondaryStyle.category}
              onChange={(category) =>
                patchSecondary({
                  category,
                  label: CATEGORY_LABEL[category],
                })
              }
            />
            <p className="mt-3 text-[11px] font-bold text-ink/55">קרם</p>
            <ChipRow
              options={FROSTS}
              labels={FROST_LABEL}
              value={secondaryStyle.frost}
              onChange={(frost) => patchSecondary({ frost })}
            />
            <p className="mt-3 text-[11px] font-bold text-ink/55">צנרת</p>
            <ChipRow
              options={PIPINGS}
              labels={PIPING_LABEL}
              value={secondaryStyle.piping}
              onChange={(piping) => patchSecondary({ piping })}
            />
            <p className="mt-3 text-[11px] font-bold text-ink/55">קישוטים</p>
            <ChipRow
              options={ACCENTS}
              labels={ACCENT_LABEL}
              value={secondaryStyle.accents}
              onChange={(accents) => patchSecondary({ accents })}
            />
          </section>
        )}

        {/* Text / sugar */}
        <section className="space-y-3">
          <div>
            <label className="text-xs font-extrabold" htmlFor="plaque">
              טקסט על העוגה
            </label>
            <input
              id="plaque"
              value={plaqueText}
              onChange={(e) => setPlaqueText(e.target.value)}
              maxLength={25}
              className="mt-1 h-11 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 text-sm"
              placeholder="מזל טוב…"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold" htmlFor="nums">
              מספרים
            </label>
            <input
              id="nums"
              value={numbersText}
              onChange={(e) => setNumbersText(e.target.value)}
              maxLength={12}
              className="mt-1 h-11 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 text-sm"
              placeholder="13"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSugarSheet(!sugarSheet)}
              className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${
                sugarSheet ? "bg-ink text-pink-soft" : "bg-white/70 text-ink"
              }`}
            >
              {sugarSheet ? "דף סוכר · כן" : "דף סוכר · לא"}
            </button>
          </div>
          {sugarSheet && (
            <textarea
              value={sugarNote}
              onChange={(e) => setSugarNote(e.target.value)}
              rows={2}
              className="w-full rounded-2xl border border-ink/10 bg-white/80 px-3 py-2 text-sm"
              placeholder="תיאור התמונה לדף הסוכר"
            />
          )}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-2xl border border-ink/10 bg-white/80 px-3 py-2 text-sm"
            placeholder="הערות נוספות לשילוב…"
          />
        </section>

        <div className="rounded-2xl bg-ink px-4 py-3 text-pink-soft">
          <div className="flex justify-between text-sm">
            <span>הערכת מחיר</span>
            <bdi className="font-extrabold text-gold-2">
              {formatIls(serverTotal ?? estimate.totalIls)}
            </bdi>
          </div>
          <p className="mt-1 text-[10px] text-pink-soft/60">
            סופי מאומת בשרת · Hybrid craft fee כלול
          </p>
        </div>

        {errors.length > 0 && (
          <ul className="text-xs font-bold text-red-700">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          disabled={pending}
          onClick={sendWhatsApp}
          className="btn-gold contact-shadow inline-flex h-13 w-full items-center justify-center rounded-full text-sm font-extrabold text-ink disabled:opacity-60"
          data-magnetic
          data-cursor-label="וואטסאפ"
        >
          {pending ? "מחשבים…" : "שליחה בוואטסאפ · 050-8739090"}
        </button>
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-bold text-gold-2 underline"
          >
            פתיחה מחדש בוואטסאפ
          </a>
        )}
      </div>
    </div>
  );
}
