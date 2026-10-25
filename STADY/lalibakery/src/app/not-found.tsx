import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl text-ink">העמוד לא נמצא</h1>
      <p className="mt-3 text-sm text-ink/70">
        חזרו לדף הבית או פתחו את ה-Builder.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="btn-gold inline-flex h-11 items-center rounded-full px-6 text-sm font-bold"
        >
          לדף הבית
        </Link>
        <Link
          href="/builder"
          className="inline-flex h-11 items-center rounded-full border-2 border-ink px-6 text-sm font-bold"
        >
          להרכבת עוגה
        </Link>
      </div>
    </div>
  );
}
