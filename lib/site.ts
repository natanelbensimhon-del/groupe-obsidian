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
    // Ligne commerciale mise en avant sur la landing climatisation.
    mobile: "06 05 53 10 04",
    mobileHref: "tel:+33605531004",
    email: "contact@groupe-obsidian.fr",
    address: "313 Avenue Georges Clemenceau, 78670 Villennes-sur-Seine",
    whatsapp: "+33 6 29 85 28 08",
    whatsappHref: "https://wa.me/33629852808",
  },
} as const;

// ── Mentions légales / société (reprises du devis officiel) ────────────────
// ⚠️ Vérifiez ces informations avant diffusion large. Le n° TVA "FR00…" est
// repris tel quel du devis — corrigez la clé si nécessaire.
export const LEGAL = {
  activity: "Travaux d'installation d'équipements thermiques et de climatisation",
  form: "SASU au capital de 40 000 €",
  siret: "904 594 157 00037",
  tva: "FR00 904 594 157",
  rcs: "RCS Versailles 904 594 157",
  ape: "APE 43.29A",
  projectContact: "Natanel Bensimhon, chef de projet",
  projectPhone: "06 29 85 28 08",
  // Attestation d'aptitude à la manipulation des fluides frigorigènes.
  fluidesAttestation: "Attestation d'aptitude Catégorie I n° 541 2429 (délivrée le 09/03/2026 par CEE Formation)",
  devisValidity: "3 mois",
  tvaRate: 0.1, // TVA 10 % — travaux d'amélioration d'un logement achevé depuis +2 ans
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Le Groupe", href: "/le-groupe" },
  { label: "Boutique", href: "/boutique" },
  { label: "Tertiaire", href: "/tertiaire" },
  { label: "Travaux", href: "/travaux" },
  { label: "Climatisation", href: "/climatisation" },
  { label: "Réalisations", href: "/realisations" },
  { label: "OBSI'BAT", href: "/obsibat" },
  { label: "Optimisation CEE", href: "/optimisation-cee" },
  { label: "Particuliers", href: "/particuliers" },
  { label: "APIRYON", href: "/apiryon" },
  { label: "Contact", href: "/contact" },
];

// ── Navigation principale (barre de menu desktop) ──────────────────────────
// Deux portes d'entrée : l'activité du groupe d'un côté, la boutique de
// l'autre. Le détail des pôles est accessible depuis la page « Le Groupe ».
export const PRIMARY_NAV: NavItem[] = [
  { label: "Le Groupe", href: "/le-groupe" },
  { label: "Boutique", href: "/boutique" },
];

// ── Sommaire de la page « Le Groupe » ─────────────────────────────────────
export type GroupSection = {
  label: string;
  href: string;
  index: string;
  short: string;
  accent: "platinum" | "steel" | "gold";
};

export const GROUP_SECTIONS: GroupSection[] = [
  {
    label: "Tertiaire",
    href: "/tertiaire",
    index: "01",
    short: "Rénovation énergétique et performance des actifs professionnels.",
    accent: "platinum",
  },
  {
    label: "Travaux",
    href: "/travaux",
    index: "02",
    short: "Exécution terrain, coordination technique et solutions énergétiques.",
    accent: "platinum",
  },
  {
    label: "Climatisation",
    href: "/climatisation",
    index: "03",
    short: "Étude, pose et entretien de la climatisation réversible chez les particuliers.",
    accent: "platinum",
  },
  {
    label: "Optimisation CEE",
    href: "/optimisation-cee",
    index: "04",
    short: "Identification, structuration et valorisation des gisements CEE.",
    accent: "platinum",
  },
  {
    label: "Particuliers",
    href: "/particuliers",
    index: "05",
    short: "Accompagnement premium pour les propriétaires exigeants.",
    accent: "platinum",
  },
  {
    label: "Réalisations",
    href: "/realisations",
    index: "06",
    short: "Nos chantiers récents, en images.",
    accent: "platinum",
  },
  {
    label: "OBSI'BAT",
    href: "/obsibat",
    index: "07",
    short: "Gros œuvre, démolition et interventions techniques encadrées.",
    accent: "steel",
  },
  {
    label: "APIRYON",
    href: "/apiryon",
    index: "08",
    short: "Club d'affaires : aviation, technologie, rénovation énergétique, investissement et immobilier de luxe.",
    accent: "gold",
  },
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
    short: "Club d'affaires : aviation, technologie, rénovation énergétique, investissement et immobilier de luxe.",
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
