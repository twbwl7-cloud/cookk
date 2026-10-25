import type { CakeKindId } from "@/data/custom-cake";
import type { CustomCakeState } from "@/store/custom-cake";

/** Compact snapshot embedded in share / WhatsApp image links. */
export type OrderPayload = {
  c: CakeKindId | null;
  f?: string;
  s?: string | null;
  b?: string | null;
  r?: string | null;
  i?: string | null;
  o?: string | null;
  cl?: string[];
  t?: string | null;
  a?: string[];
  e?: string[];
  m?: string;
  n?: string;
  d?: string;
  al?: boolean;
  p?: number;
};

export function toOrderPayload(
  s: Pick<
    CustomCakeState,
    | "category"
    | "figure"
    | "sizeId"
    | "baseId"
    | "creamId"
    | "fillingId"
    | "coatingId"
    | "colors"
    | "themeId"
    | "addons"
    | "exclusions"
    | "allergy"
    | "message"
    | "notes"
    | "date"
  >,
  priceIls: number,
): OrderPayload {
  return {
    c: s.category,
    f: s.figure || undefined,
    s: s.sizeId,
    b: s.baseId,
    r: s.creamId,
    i: s.fillingId,
    o: s.coatingId,
    cl: s.colors.length ? s.colors : undefined,
    t: s.themeId,
    a: s.addons.length ? s.addons : undefined,
    e: s.exclusions.length ? s.exclusions : undefined,
    m: s.message || undefined,
    n: s.notes || undefined,
    d: s.date || undefined,
    al: s.allergy || undefined,
    p: priceIls || undefined,
  };
}

export function fromOrderPayload(p: OrderPayload) {
  return {
    category: p.c,
    figure: p.f ?? "",
    sizeId: p.s ?? null,
    baseId: p.b ?? null,
    creamId: p.r ?? null,
    fillingId: p.i ?? null,
    coatingId: p.o ?? null,
    colors: p.cl ?? [],
    themeId: p.t ?? null,
    addons: p.a ?? [],
    exclusions: p.e ?? [],
    allergy: Boolean(p.al),
    message: p.m ?? "",
    notes: p.n ?? "",
    date: p.d ?? "",
  };
}

export function encodeOrderPayload(p: OrderPayload): string {
  const json = JSON.stringify(p);
  if (typeof window !== "undefined" && typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }
  return Buffer.from(json, "utf8")
    .toString("base64url")
    .replace(/=+$/g, "");
}

export function decodeOrderPayload(raw: string): OrderPayload | null {
  try {
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    const json =
      typeof window !== "undefined" && typeof atob === "function"
        ? decodeURIComponent(escape(atob(b64 + pad)))
        : Buffer.from(b64 + pad, "base64").toString("utf8");
    const parsed = JSON.parse(json) as OrderPayload;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}
