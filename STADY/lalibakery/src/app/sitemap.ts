import type { MetadataRoute } from "next";
import { products, collections } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lalibakery.co.il";
  const staticRoutes = [
    "",
    "/shop",
    "/builder",
    "/about",
    "/contact",
    "/faq",
    "/reviews",
    "/terms",
    "/privacy",
    "/accessibility",
    "/collections",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
