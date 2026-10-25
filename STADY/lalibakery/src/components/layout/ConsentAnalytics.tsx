"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "lb_analytics_consent";

/**
 * Consent-gated GA4 / Meta Pixel / Clarity.
 * Scripts load only after explicit accept AND when public IDs exist in env.
 * Turnstile is form-scoped (not loaded here).
 */
export function ConsentAnalytics() {
  const [consent, setConsent] = useState<"unknown" | "accepted" | "declined">(
    "unknown",
  );

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === "accepted" || v === "declined") setConsent(v);
    } catch {
      /* private mode */
    }
  }, []);

  const ga4 = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();
  const hasIds = Boolean(ga4 || meta || clarity);

  function choose(next: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      /* ignore */
    }
    setConsent(next);
  }

  return (
    <>
      {consent === "unknown" && hasIds ? (
        <div
          role="dialog"
          aria-label="הסכמה לעוגיות אנליטיקה"
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-[color:var(--black-deep,#0d0d0d)]/95 px-4 py-4 text-pink-soft backdrop-blur-md sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-pink-soft/80">
              משתמשים בעוגיות אנליטיקה (GA4 / Meta / Clarity) רק כדי לשפר את
              החוויה — אחרי הסכמה. פרטים ב{" "}
              <a href="/privacy" className="underline hover:text-gold-1">
                מדיניות הפרטיות
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="min-h-12 rounded-full border border-white/20 px-5 text-sm font-medium hover:border-gold-1/50"
              >
                רק הכרחיות
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="btn-gold min-h-12 rounded-full px-5 text-sm font-semibold"
              >
                מאשרת אנליטיקה
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {consent === "accepted" && ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent === "accepted" && meta ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {consent === "accepted" && clarity ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
