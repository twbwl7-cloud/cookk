import "server-only";

import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";

/** Exact host match (not includes) — Script 3 Server Actions. */
export async function assertSameOrigin(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const h = await headers();
  const origin = h.get("origin");
  const host = h.get("host");

  if (!origin || !host) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "בקשה נדחתה." };
    }
    return { ok: true };
  }

  try {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      return { ok: false, error: "בקשה נדחתה." };
    }
  } catch {
    return { ok: false, error: "בקשה נדחתה." };
  }

  return { ok: true };
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function guardAction(
  bucket: string,
  limit = 10,
  windowMs = 60_000,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const origin = await assertSameOrigin();
  if (!origin.ok) return origin;

  const ip = await clientIp();
  const limited = rateLimit(`${bucket}:${ip}`, limit, windowMs);
  if (!limited.ok) {
    return { ok: false, error: "יותר מדי ניסיונות. נסו שוב בעוד דקה." };
  }
  return { ok: true };
}
