"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-3xl text-ink">משהו השתבש</h1>
      <p className="mt-3 text-sm text-ink/70">
        נסו שוב. אם הבעיה נמשכת — וואטסאפ 050-8739090.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn-gold mt-6 inline-flex h-11 items-center rounded-full px-6 text-sm font-bold"
      >
        נסו שוב
      </button>
    </div>
  );
}
