import { NextResponse, type NextRequest } from "next/server";

/**
 * Vercel-safe headers.
 * Note: Next.js (esp. React Refresh / some runtime paths) needs 'unsafe-eval'.
 * Strict nonce CSP without wiring into Next <Script> breaks hydration.
 */
function buildCsp(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://wa.me https://api.whatsapp.com https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://connect.facebook.net https://vitals.vercel-insights.com",
    "frame-src 'self' https://direct.tranzila.com https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me https://api.whatsapp.com",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", buildCsp());
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)",
  );
  // Avoid COOP/CORP that can break Vercel preview tooling / some browsers
  response.headers.set("X-DNS-Prefetch-Control", "off");

  const path = request.nextUrl.pathname;
  if (
    path.startsWith("/checkout") ||
    path.startsWith("/cart") ||
    path.startsWith("/account") ||
    path.startsWith("/api/")
  ) {
    response.headers.set(
      "Cache-Control",
      "private, no-store, max-age=0, must-revalidate",
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
