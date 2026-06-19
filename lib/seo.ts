import type { Metadata } from "next";
import { SITE } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

const DEFAULT_KEYWORDS = [
  "Groupe Obsidian",
  "rénovation énergétique tertiaire",
  "rénovation énergétique entreprise",
  "certificats d'économies d'énergie",
  "optimisation CEE",
  "gisement CEE",
  "travaux rénovation énergétique",
  "isolation thermique extérieure",
  "pompe à chaleur",
  "gros œuvre",
  "accompagnement énergétique premium",
];

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageSeo): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    path === "/" ? `${SITE.name} — ${SITE.baseline}` : `${title} — ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      // ⚠️ Ajoutez votre image de partage : /public/og.jpg (1200×630).
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.jpg"],
    },
  };
}
