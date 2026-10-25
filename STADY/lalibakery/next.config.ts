import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      // Include Vercel preview/production hosts so checkout isn't blocked
      allowedOrigins: [
        "lalibakery.co.il",
        "www.lalibakery.co.il",
        "*.vercel.app",
        "127.0.0.1:43127",
        "localhost:43127",
      ],
    },
  },
};

export default nextConfig;
