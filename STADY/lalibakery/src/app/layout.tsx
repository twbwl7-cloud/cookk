import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainShell } from "@/components/layout/MainShell";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { MagneticCursor } from "@/components/motion/MagneticCursor";
import { VipPopup } from "@/components/home/VipPopup";
import { AccessibilityWidget } from "@/components/layout/AccessibilityWidget";
import { ConsentAnalytics } from "@/components/layout/ConsentAnalytics";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { siteSettings } from "@/data/site";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteSettings.brandName} · ${siteSettings.tagline}`,
    template: `%s · ${siteSettings.brandName}`,
  },
  description:
    "LALIBAKERY — עוגות מספרים, מעוצבות ויום הולדת. אפייה מהלב. הזמנות: 050-8739090",
  metadataBase: new URL("https://lalibakery.co.il"),
  openGraph: {
    title: `${siteSettings.brandName} · ${siteSettings.tagline}`,
    description:
      "בונות את העוגה — רואות את המחיר. Cake Builder תלת־ממד · איסוף נתניה.",
    images: [{ url: "/cakes/brand/logo.jpg", width: 512, height: 512 }],
    locale: "he_IL",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/cakes/brand/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${frank.variable} sticky-cta-safe antialiased`}
      >
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        <LenisProvider>
          <MagneticCursor />
          <Header />
          <MainShell>{children}</MainShell>
          <Footer />
          <WhatsAppFloat />
          <StickyMobileCTA />
          <AccessibilityWidget />
          <CartDrawer />
          <VipPopup />
          <ConsentAnalytics />
        </LenisProvider>
      </body>
    </html>
  );
}
