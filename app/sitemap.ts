import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...NAV.map((n) => n.href),
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  return routes.map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
