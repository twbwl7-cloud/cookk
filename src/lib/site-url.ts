/** Absolute public origin for WhatsApp image links (baker must open on the web). */
export function getSiteUrl(): string {
  // Prefer explicit production URL so WhatsApp links always open for the baker.
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("127.0.0.1") && !fromEnv.includes("localhost")) {
    return fromEnv;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (typeof window !== "undefined" && window.location?.origin) {
    const origin = window.location.origin.replace(/\/$/, "");
    // Local preview: still generate card on local host for testing
    if (origin.includes("127.0.0.1") || origin.includes("localhost")) return origin;
    return origin;
  }
  return fromEnv || "https://cookk.vercel.app";
}

export function absoluteUrl(pathOrUrl: string, base = getSiteUrl()): string {
  if (!pathOrUrl) return base;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}
