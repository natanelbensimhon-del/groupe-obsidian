// ──────────────────────────────────────────────────────────────────────────
// Catalogue Climatisation résidentielle.
//
// ⚠️ À COMPLÉTER / VÉRIFIER : les specs et surtout les PRIX PUBLICS ci-dessous
// sont INDICATIFS et doivent être confirmés / mis à jour depuis votre compte
// ClimPlus (renseignez la référence dans `ref`).
//
// 🖼️ Pour un rendu réaliste dans le configurateur : déposez une image PNG
// DÉTOURÉE (fond transparent) de l'unité intérieure dans
// /public/climatisation/  puis renseignez le champ `unitImage`
// (ex: "/climatisation/daikin-perfera.png"). Sans image, une silhouette
// générique est utilisée.
// ──────────────────────────────────────────────────────────────────────────

export type AcType = "mural" | "console" | "gainable";

// Une variante = une puissance disponible dans une gamme (prix TTC indicatif).
export type AcVariant = {
  powerKw: number; // puissance (kW)
  btu: number; // équivalent BTU
  surfaceMax: number; // surface conseillée (m²)
  price: number; // € TTC — ⚠️ INDICATIF, à confirmer via export catalogue
  ref?: string; // réf. interne (jamais affichée au client)
};

// Une gamme = un produit décliné en plusieurs puissances (ex. Daikin « Stylish »).
// Côté client on n'affiche QUE le nom de la gamme ; la puissance est choisie
// automatiquement selon la surface et l'isolation de chaque pièce.
export type AcGamme = {
  id: string;
  brand: string;
  name: string; // nom de gamme affiché (ex. "Stylish")
  type: AcType;
  scop?: number;
  tagline?: string;
  variants: AcVariant[]; // triées par puissance croissante
  unitImage?: string; // silhouette overlay (détourée) — sinon générique
  photo?: string; // 🖼️ photo produit de la gamme montrée au client
  // ex: "/climatisation/gammes/daikin-stylish.jpg" (à déposer dans /public)
  videoId?: string; // 🎬 ID YouTube (vidéo lue en lightbox sur le site)
};

// ── Tarification client (forfait par unité intérieure + groupe suppl.) ──────
// ⚠️ TTC par unité intérieure, selon la marque. À ajuster librement.
export const PRICE_PER_INTERIOR_UNIT: Record<string, number> = {
  Daikin: 3500,
  "Mitsubishi Electric": 3500,
  Atlantic: 3200,
  LG: 3200,
  Toshiba: 3000,
};
export const DEFAULT_UNIT_PRICE = 3500;
// Supplément TTC par groupe extérieur au-delà du premier.
export const EXTRA_GROUP_PRICE = 2000;

export function unitPriceFor(brand: string): number {
  return PRICE_PER_INTERIOR_UNIT[brand] ?? DEFAULT_UNIT_PRICE;
}
export function totalTTC(brand: string, nbSplits: number, nbGroupes: number): number {
  return (
    unitPriceFor(brand) * nbSplits +
    EXTRA_GROUP_PRICE * Math.max(0, nbGroupes - 1)
  );
}

// ── Isolation & dimensionnement automatique de la puissance ────────────────
export type Insulation = "bonne" | "moyenne" | "faible";
export const INSULATION_LABELS: Record<Insulation, string> = {
  bonne: "Bonne (logement récent ou rénové)",
  moyenne: "Moyenne",
  faible: "Faible (ancien, peu isolé)",
};
// Puissance indicative nécessaire par m² (W/m²) selon l'isolation.
const W_PER_M2: Record<Insulation, number> = { bonne: 80, moyenne: 100, faible: 125 };

/** Puissance (kW) conseillée pour une pièce, selon surface + isolation. */
export function requiredKw(surface: number, insul: Insulation): number {
  return Math.round(((surface * W_PER_M2[insul]) / 1000) * 10) / 10;
}

/** Choisit la variante adaptée d'une gamme selon surface + isolation. */
export function pickVariant(
  g: AcGamme,
  surface?: number,
  insul?: Insulation
): AcVariant {
  if (!surface || !insul) return g.variants[0];
  const need = requiredKw(surface, insul);
  return g.variants.find((v) => v.powerKw >= need) ?? g.variants[g.variants.length - 1];
}

/** Prix "à partir de" d'une gamme (variante la moins chère). */
export function gammeFrom(g: AcGamme): number {
  return Math.min(...g.variants.map((v) => v.price));
}

export const AC_BRANDS = [
  "Daikin",
  "Mitsubishi Electric",
  "Atlantic",
  "LG",
  "Toshiba",
] as const;

export const AC_TYPES: { id: AcType; label: string; desc: string }[] = [
  { id: "mural", label: "Mural", desc: "Unité murale — la plus courante en résidentiel." },
  { id: "console", label: "Console", desc: "Au sol — idéale en rénovation, sous fenêtre." },
  { id: "gainable", label: "Gainable", desc: "Encastré en faux-plafond — discrétion maximale." },
];

// Fabrique de variantes (prix TTC INDICATIFS — ⚠️ à remplacer par l'export).
const V = (powerKw: number, btu: number, surfaceMax: number, price: number): AcVariant => ({
  powerKw,
  btu,
  surfaceMax,
  price,
});
// Jeux de puissances standard (2,5 / 3,5 / 5,0 kW).
const ESSENTIEL = [V(2.5, 9000, 25, 690), V(3.5, 12000, 35, 820), V(5.0, 18000, 50, 1090)];
const CONFORT = [V(2.5, 9000, 25, 1090), V(3.5, 12000, 35, 1290), V(5.0, 18000, 50, 1650)];
const DESIGN = [V(2.5, 9000, 25, 1290), V(3.5, 12000, 35, 1490), V(5.0, 18000, 50, 1890)];
const CONSOLE = [V(2.5, 9000, 25, 1450), V(3.5, 12000, 35, 1650), V(5.0, 18000, 50, 2100)];
const GAINABLE = [V(3.5, 12000, 35, 1950), V(5.0, 18000, 50, 2400), V(7.1, 24000, 70, 3200)];

// ⚠️ Gammes & PRIX INDICATIFS — à confirmer / compléter depuis l'export catalogue.
export const AC_GAMMES: AcGamme[] = [
  // Daikin
  { id: "daikin-sensira", brand: "Daikin", name: "Sensira", type: "mural", scop: 4.0, tagline: "Essentiel, fiable", variants: ESSENTIEL },
  { id: "daikin-perfera", brand: "Daikin", name: "Perfera", type: "mural", scop: 5.1, tagline: "Confort & haute performance", variants: CONFORT },
  { id: "daikin-stylish", brand: "Daikin", name: "Stylish", type: "mural", scop: 5.1, tagline: "Design signature", variants: DESIGN, videoId: "dYoO5SweWfc" },
  { id: "daikin-emura", brand: "Daikin", name: "Emura", type: "mural", scop: 5.1, tagline: "Design premium", variants: DESIGN, videoId: "zWORzE8fiMY" },
  { id: "daikin-perfera-console", brand: "Daikin", name: "Perfera Console", type: "console", scop: 4.6, variants: CONSOLE },
  { id: "daikin-gainable", brand: "Daikin", name: "Gainable", type: "gainable", scop: 4.0, variants: GAINABLE },
  // Mitsubishi Electric
  { id: "mitsubishi-essentiel", brand: "Mitsubishi Electric", name: "Mural Essentiel (MSZ-HR)", type: "mural", scop: 4.0, tagline: "Essentiel", variants: ESSENTIEL, videoId: "BiHY56LKn7c" },
  { id: "mitsubishi-compact", brand: "Mitsubishi Electric", name: "Mural Compact (MSZ-AP)", type: "mural", scop: 4.6, tagline: "Compact & confort", variants: CONFORT, videoId: "W2H-F963aSs" },
  { id: "mitsubishi-design", brand: "Mitsubishi Electric", name: "Kirigamine (Design)", type: "mural", scop: 5.2, tagline: "Design & silence", variants: DESIGN },
  { id: "mitsubishi-gainable", brand: "Mitsubishi Electric", name: "Gainable", type: "gainable", scop: 4.2, variants: GAINABLE },
  // Atlantic
  { id: "atlantic-takao", brand: "Atlantic", name: "Takao", type: "mural", scop: 4.6, tagline: "Confort", variants: CONFORT },
  { id: "atlantic-console", brand: "Atlantic", name: "Console", type: "console", scop: 4.4, variants: CONSOLE },
  // LG
  { id: "lg-standard", brand: "LG", name: "Smart Inverter", type: "mural", scop: 4.6, tagline: "Essentiel connecté", variants: ESSENTIEL, videoId: "OG4rKO043Q4" },
  { id: "lg-artcool", brand: "LG", name: "Artcool", type: "mural", scop: 5.1, tagline: "Design", variants: DESIGN },
  { id: "lg-console", brand: "LG", name: "Console", type: "console", scop: 4.6, variants: CONSOLE },
  // Toshiba
  { id: "toshiba-seiya", brand: "Toshiba", name: "Seiya", type: "mural", scop: 4.0, tagline: "Essentiel", variants: ESSENTIEL },
  { id: "toshiba-shorai", brand: "Toshiba", name: "Shorai Edge", type: "mural", scop: 4.6, tagline: "Confort", variants: CONFORT },
];

// ── Tarification pose ──────────────────────────────────────────────────────
// ⚠️ CONFIDENTIEL / à ajuster : coût interne (main d'œuvre + accessoires) par
// unité intérieure. NE PAS afficher côté client.
export const POSE_COST_PER_UNIT = 700; // € — votre coût (MO + accessoires)
export const POSE_MARGIN = 0.3; // 30 %

// TVA appliquée sur le devis : 10 % (travaux d'amélioration d'un logement
// achevé depuis plus de 2 ans, sous réserve de l'attestation de TVA), comme sur
// votre devis officiel. ⚠️ À adapter si la situation diffère (ex. neuf → 20 %).
export const TVA_RATE = 0.1;

// Prix de vente du forfait pose affiché au client.
// Interprétation retenue : coefficient ×1,30 → 910 €/unité.
// (Si vous vouliez la « marge commerciale » réelle à 30 % : 700 / 0,70 = 1000 €.
//  Dans ce cas remplacez la ligne ci-dessous par :
//  Math.round(POSE_COST_PER_UNIT / (1 - POSE_MARGIN)).)
export const POSE_PRICE_PER_UNIT = Math.round(
  POSE_COST_PER_UNIT * (1 + POSE_MARGIN)
); // 910 €

// ── Contexte logement ──────────────────────────────────────────────────────
export type Dwelling = "maison" | "appartement";
export const DWELLING_LABELS: Record<Dwelling, string> = {
  maison: "Maison individuelle",
  appartement: "Appartement",
};

// ── Usage souhaité (issu du questionnaire Solu+, simplifié client) ─────────
export type Usage = "rafraichir" | "chauffer" | "les_deux";
export const USAGE_LABELS: Record<Usage, string> = {
  rafraichir: "Rafraîchir (été)",
  chauffer: "Chauffer (hiver)",
  les_deux: "Chauffer et rafraîchir",
};

// TVA selon l'ancienneté du logement.
export const TVA_RENOVATION = 0.1; // logement achevé depuis +2 ans
export const TVA_NEUF = 0.2; // logement neuf / -2 ans

// ── Évacuation des condensats (question non technique) ─────────────────────
export type Condensate = "facade" | "pluviale" | "relevage" | "inconnu";
export const CONDENSATE_LABELS: Record<Condensate, string> = {
  facade: "Écoulement libre en façade",
  pluviale: "Raccordement à une descente d'eau pluviale",
  relevage: "Pompe de relevage",
  inconnu: "À déterminer lors de la visite",
};

// ── Passage des câbles (questions non techniques) ─────────────────────────
export type WallType = "placo" | "dur" | "inconnu";
export type OutdoorProximity = "proche" | "loin" | "inconnu";
export type FinishPref = "cache" | "goulotte";

export type CableResult = { key: string; label: string; detail: string };

/** Déduit une reco de passage des câbles à partir de réponses simples. */
export function recommendCableRouting(
  wall: WallType,
  outdoor: OutdoorProximity,
  finish: FinishPref
): CableResult {
  if (finish === "goulotte") {
    return {
      key: "goulotte",
      label: "Goulotte façade + intérieure",
      detail:
        "Solution simple et rapide : une goulotte discrète cache les liaisons à l'intérieur et en façade.",
    };
  }
  if (wall === "placo" && outdoor === "proche") {
    return {
      key: "encastre",
      label: "Encastré — câbles cachés",
      detail:
        "Cloison légère et unité extérieure proche : le passage caché des liaisons est a priori possible.",
    };
  }
  if (wall === "inconnu" || outdoor === "inconnu") {
    return {
      key: "a_definir",
      label: "À confirmer lors de la visite",
      detail:
        "Nous vérifierons sur place si les câbles peuvent être cachés ; à défaut, une goulotte discrète sera posée.",
    };
  }
  return {
    key: "goulotte",
    label: "Goulotte discrète recommandée",
    detail:
      "Le passage caché semble difficile à cet endroit : une goulotte discrète est la solution la plus adaptée.",
  };
}

/**
 * Silhouette SVG générique d'une unité intérieure murale, utilisée quand aucun
 * `unitImage` n'est fourni. Retournée sous forme de data-URL (dessinable sur
 * canvas et affichable en <img>).
 */
export function defaultUnitImage(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='134' viewBox='0 0 420 134'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#ffffff'/>
      <stop offset='1' stop-color='#dbe1e8'/>
    </linearGradient>
  </defs>
  <rect x='5' y='7' width='410' height='108' rx='30' fill='url(#g)' stroke='#aeb7c2' stroke-width='2'/>
  <rect x='26' y='86' width='368' height='20' rx='10' fill='#c4ccd6'/>
  <line x1='34' y1='96' x2='386' y2='96' stroke='#a3adb9' stroke-width='2'/>
  <rect x='44' y='28' width='150' height='7' rx='3.5' fill='#eef1f5'/>
  <circle cx='372' cy='44' r='4.5' fill='#7f97ad'/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Silhouette SVG générique d'un groupe extérieur (unité extérieure / PAC). */
export function defaultOutdoorImage(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='240' viewBox='0 0 360 240'>
  <defs>
    <linearGradient id='og' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#eef1f5'/>
      <stop offset='1' stop-color='#c7ced7'/>
    </linearGradient>
  </defs>
  <rect x='6' y='10' width='348' height='196' rx='16' fill='url(#og)' stroke='#9aa4b0' stroke-width='2'/>
  <rect x='6' y='176' width='348' height='30' rx='8' fill='#b6bfca'/>
  <circle cx='240' cy='108' r='78' fill='none' stroke='#8a94a1' stroke-width='3'/>
  <circle cx='240' cy='108' r='10' fill='#8a94a1'/>
  <g stroke='#aab3be' stroke-width='2'>
    <line x1='240' y1='40' x2='240' y2='176'/>
    <line x1='172' y1='108' x2='308' y2='108'/>
    <line x1='192' y1='60' x2='288' y2='156'/>
    <line x1='288' y1='60' x2='192' y2='156'/>
  </g>
  <g stroke='#9aa4b0' stroke-width='3' stroke-linecap='round'>
    <line x1='36' y1='58' x2='120' y2='58'/>
    <line x1='36' y1='84' x2='120' y2='84'/>
    <line x1='36' y1='110' x2='120' y2='110'/>
    <line x1='36' y1='136' x2='120' y2='136'/>
  </g>
  <rect x='26' y='214' width='60' height='18' rx='4' fill='#9aa4b0'/>
  <rect x='274' y='214' width='60' height='18' rx='4' fill='#9aa4b0'/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
