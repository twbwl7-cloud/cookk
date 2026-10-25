import { siteSettings } from "@/data/site";
import { faqs } from "@/data/site";
import { products } from "@/data/products";

function escapeJsonLd(json: unknown): string {
  return JSON.stringify(json).replace(/</g, "\\u003c");
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Bakery"],
    name: siteSettings.brandName,
    alternateName: siteSettings.legalName,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    url: "https://lalibakery.co.il",
    address: {
      "@type": "PostalAddress",
      addressLocality: "נתניה",
      addressCountry: "IL",
    },
    areaServed: ["נתניה", "השרון", "מרכז"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  );
}

export function ProductJsonLd({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  const variant = product.variants[0];
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: [`https://lalibakery.co.il${product.image}`],
    offers: {
      "@type": "Offer",
      priceCurrency: "ILS",
      price: variant?.priceIls ?? 0,
      availability: "https://schema.org/LimitedAvailability",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  );
}
