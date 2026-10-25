import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { MagneticCursor } from "@/components/motion/MagneticCursor";
import { VipPopup } from "@/components/home/VipPopup";
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
    "LALIBAKERY — עוגות גן, עוגות מספרים ועוגות מעוצבות. אפייה מהלב. הזמנות: 050-8739090",
  metadataBase: new URL("https://lalibakery.co.il"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="bg-[#fffaf8]">
      <body
        className={`${heebo.variable} ${frank.variable} sticky-cta-safe bg-[#fffaf8] antialiased`}
        style={{ backgroundColor: "#fffaf8" }}
      >
        <LenisProvider>
          <MagneticCursor />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <StickyMobileCTA />
          <CartDrawer />
          <VipPopup />
        </LenisProvider>
      </body>
    </html>
  );
}
