import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";
import { getBoutiqueProducts } from "@/lib/shopify";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    ...NAV.map((n) => n.href),
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const produits = await getBoutiqueProducts();
  const boutique = produits.map((p) => `/boutique/${p.slug}`);

  return [...routes, ...boutique].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/boutique/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/boutique" ? 0.9 : 0.7,
  }));
}
