import type { Metadata } from "next";
import Link from "next/link";
import { AccountPortal } from "@/components/account/AccountPortal";

export const metadata: Metadata = {
  title: "האזור האישי",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-gold-2">אזור אישי</p>
      <h1 className="mt-2 font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
        הזמנות שמורות במכשיר
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
        כרגע בלי התחברות — אחרי השקת Auth (OTP) ההזמנות יעברו לחשבון מאובטח
        בשרת. בינתיים אפשר להזמין מחדש מהעותק המקומי או לפתוח וואטסאפ.
      </p>
      <AccountPortal />
      <p className="mt-10 text-sm text-ink/55">
        עדיף Guest Checkout?{" "}
        <Link href="/checkout" className="font-semibold text-ink underline">
          חזרה לתשלום
        </Link>
      </p>
    </div>
  );
}
