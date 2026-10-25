"use client";

import { useEffect, useState } from "react";

type Mode = "default" | "contrast" | "large";

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    const saved = sessionStorage.getItem("lb-a11y") as Mode | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.a11y = mode;
    sessionStorage.setItem("lb-a11y", mode);
  }, [mode]);

  return (
    <div className="fixed bottom-[5.75rem] right-4 z-40 md:bottom-6 md:right-6">
      <button
        type="button"
        className="flex h-12 min-w-12 items-center justify-center rounded-full border-2 border-ink bg-pink-baby px-3 text-xs font-extrabold text-ink shadow-lg"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
      >
        נגישות
      </button>
      {open && (
        <div
          id="a11y-panel"
          className="absolute bottom-14 left-0 w-56 rounded-2xl border-2 border-ink bg-pink-baby p-3 text-ink contact-shadow"
          role="dialog"
          aria-label="הגדרות נגישות"
        >
          <p className="text-xs font-bold">התאמות תצוגה</p>
          <div className="mt-2 flex flex-col gap-2">
            <button
              type="button"
              className="min-h-12 rounded-xl border border-ink/20 px-3 text-start text-sm font-semibold"
              onClick={() => setMode("default")}
            >
              רגיל
            </button>
            <button
              type="button"
              className="min-h-12 rounded-xl border border-ink/20 px-3 text-start text-sm font-semibold"
              onClick={() => setMode("contrast")}
            >
              ניגודיות גבוהה
            </button>
            <button
              type="button"
              className="min-h-12 rounded-xl border border-ink/20 px-3 text-start text-sm font-semibold"
              onClick={() => setMode("large")}
            >
              טקסט מוגדל
            </button>
          </div>
          <a
            href="/accessibility"
            className="mt-3 block text-xs font-bold underline"
          >
            הצהרת נגישות ת״י 5568
          </a>
        </div>
      )}
    </div>
  );
}
