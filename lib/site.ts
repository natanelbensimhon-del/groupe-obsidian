// ──────────────────────────────────────────────────────────────────────────
// Données centrales du site Groupe Obsidian.
// ⚠️ À COMPLÉTER : remplacez les coordonnées / réseaux par vos infos définitives.
// ──────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Groupe Obsidian",
  shortName: "Obsidian",
  // ⚠️ Mettez ici l'URL de production définitive (utilisée pour le SEO / sitemap).
  url: "https://www.groupe-obsidian.com",
  baseline:
    "Rénovation énergétique, travaux et optimisation CEE pour les actifs exigeants.",
  description:
    "Groupe Obsidian structure, pilote et valorise les projets énergétiques à fort enjeu : rénovation tertiaire, optimisation CEE, travaux et gros œuvre encadré.",
  // ⚠️ COORDONNÉES — vérifiez / remplacez par vos informations définitives.
  contact: {
    phone: "01 80 97 57 21",
    phoneHref: "tel:+33180975721",
    email: "contact@groupe-obsidian.fr",
    address: "313 Avenue Georges Clemenceau, 78670 Villennes-sur-Seine",
    whatsapp: "+33 6 29 85 28 08",
    whatsappHref: "https://wa.me/33629852808",
  },
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Le Groupe", href: "/le-groupe" },
  { label: "Tertiaire", href: "/tertiaire" },
  { label: "Travaux", href: "/travaux" },
  { label: "Climatisation", href: "/climatisation" },
  { label: "OBSI'BAT", href: "/obsibat" },
  { label: "Optimisation CEE", href: "/optimisation-cee" },
  { label: "Particuliers", href: "/particuliers" },
  { label: "APIRYON", href: "/apiryon" },
  { label: "Contact", href: "/contact" },
];

// ── Pièces du puzzle hero (ordre = ordre d'apparition) ─────────────────────
export type PuzzlePiece = {
  id: string;
  label: string;
  short: string;
  href: string;
  index: string;
  accent: "platinum" | "steel" | "gold";
};

export const PUZZLE_PIECES: PuzzlePiece[] = [
  {
    id: "groupe",
    label: "Groupe Obsidian",
    short: "Un écosystème structuré pour piloter vos projets à fort enjeu.",
    href: "/le-groupe",
    index: "01",
    accent: "platinum",
  },
  {
    id: "tertiaire",
    label: "Tertiaire",
    short: "Rénovation énergétique et performance des actifs professionnels.",
    href: "/tertiaire",
    index: "02",
    accent: "platinum",
  },
  {
    id: "travaux",
    label: "Travaux",
    short: "Exécution terrain, coordination technique et solutions énergétiques.",
    href: "/travaux",
    index: "03",
    accent: "platinum",
  },
  {
    id: "cee",
    label: "Optimisation CEE",
    short: "Identification, structuration et valorisation des gisements CEE.",
    href: "/optimisation-cee",
    index: "04",
    accent: "platinum",
  },
  {
    id: "particuliers",
    label: "Particuliers",
    short: "Accompagnement premium pour les propriétaires exigeants.",
    href: "/particuliers",
    index: "05",
    accent: "platinum",
  },
  {
    id: "obsibat",
    label: "OBSI'BAT",
    short: "Gros œuvre, démolition et interventions techniques encadrées.",
    href: "/obsibat",
    index: "06",
    accent: "steel",
  },
  {
    id: "apiryon",
    label: "APIRYON",
    short: "Aviation d'affaires, déplacements privés et service confidentiel.",
    href: "/apiryon",
    index: "07",
    accent: "gold",
  },
  {
    id: "contact",
    label: "Contact",
    short: "Soumettre un projet ou échanger avec notre équipe.",
    href: "/contact",
    index: "08",
    accent: "platinum",
  },
];

// ── Partenaires / standards (repris du site actuel) ────────────────────────
export const PARTNERS = [
  { name: "STO", note: "Isolation thermique par l'extérieur" },
  { name: "De Dietrich", note: "Chauffage collectif & tertiaire" },
  // ⚠️ Ajoutez vos autres partenaires / certifications (RGE, Qualibat…).
];
