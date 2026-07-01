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

export type AcModel = {
  id: string;
  brand: string;
  name: string;
  type: AcType;
  powerKw: number; // puissance froid (kW)
  btu: number; // équivalent BTU
  surfaceMax: number; // surface conseillée (m²)
  scop?: number;
  seer?: number;
  price: number; // € TTC public — ⚠️ INDICATIF, à confirmer
  ref?: string; // référence ClimPlus
  unitImage?: string; // /climatisation/xxx.png (détourée) — sinon silhouette
};

export const AC_BRANDS = [
  "Daikin",
  "Mitsubishi Electric",
  "Atlantic",
  "Toshiba",
] as const;

export const AC_TYPES: { id: AcType; label: string; desc: string }[] = [
  { id: "mural", label: "Mural", desc: "Unité murale — la plus courante en résidentiel." },
  { id: "console", label: "Console", desc: "Au sol — idéale en rénovation, sous fenêtre." },
  { id: "gainable", label: "Gainable", desc: "Encastré en faux-plafond — discrétion maximale." },
];

// ⚠️ Données INDICATIVES à vérifier / compléter depuis ClimPlus.
export const AC_MODELS: AcModel[] = [
  {
    id: "daikin-sensira-35",
    brand: "Daikin",
    name: "Sensira FTXF35E",
    type: "mural",
    powerKw: 3.5,
    btu: 12000,
    surfaceMax: 35,
    scop: 4.0,
    seer: 6.8,
    price: 890,
    ref: "FTXF35E / RXF35E",
  },
  {
    id: "daikin-perfera-35",
    brand: "Daikin",
    name: "Perfera FTXM35R",
    type: "mural",
    powerKw: 3.5,
    btu: 12000,
    surfaceMax: 35,
    scop: 5.1,
    seer: 8.6,
    price: 1390,
    ref: "FTXM35R / RXM35R",
  },
  {
    id: "daikin-perfera-console-25",
    brand: "Daikin",
    name: "Perfera Console FVXM25A",
    type: "console",
    powerKw: 2.5,
    btu: 9000,
    surfaceMax: 25,
    scop: 4.6,
    price: 1650,
    ref: "FVXM25A / RXM25R",
  },
  {
    id: "daikin-gainable-35",
    brand: "Daikin",
    name: "Gainable FDXM35F3",
    type: "gainable",
    powerKw: 3.5,
    btu: 12000,
    surfaceMax: 35,
    scop: 4.0,
    price: 1950,
    ref: "FDXM35F3 / RXM35R",
  },
  {
    id: "mitsubishi-hr-35",
    brand: "Mitsubishi Electric",
    name: "MSZ-HR35VF",
    type: "mural",
    powerKw: 3.4,
    btu: 12000,
    surfaceMax: 34,
    scop: 4.0,
    seer: 6.8,
    price: 820,
    ref: "MSZ-HR35VF / MUZ-HR35VF",
  },
  {
    id: "mitsubishi-ap-35",
    brand: "Mitsubishi Electric",
    name: "MSZ-AP35VGK",
    type: "mural",
    powerKw: 3.5,
    btu: 12000,
    surfaceMax: 35,
    scop: 4.6,
    seer: 7.0,
    price: 1150,
    ref: "MSZ-AP35VGK / MUZ-AP35VG",
  },
  {
    id: "atlantic-fujitsu-12",
    brand: "Atlantic",
    name: "Fujitsu ASYG12KPCA",
    type: "mural",
    powerKw: 3.4,
    btu: 12000,
    surfaceMax: 34,
    scop: 4.6,
    price: 940,
    ref: "ASYG12KPCA / AOYG12KPCA",
  },
  {
    id: "toshiba-seiya-13",
    brand: "Toshiba",
    name: "Seiya RAS-B13E2KVG",
    type: "mural",
    powerKw: 3.3,
    btu: 12000,
    surfaceMax: 33,
    scop: 4.0,
    price: 760,
    ref: "RAS-B13E2KVG-E / RAS-13E2AVG-E",
  },
];

// ── Tarification pose ──────────────────────────────────────────────────────
// ⚠️ CONFIDENTIEL / à ajuster : coût interne (main d'œuvre + accessoires) par
// unité intérieure. NE PAS afficher côté client.
export const POSE_COST_PER_UNIT = 700; // € — votre coût (MO + accessoires)
export const POSE_MARGIN = 0.3; // 30 %

// Prix de vente du forfait pose affiché au client.
// Interprétation retenue : coefficient ×1,30 → 910 €/unité.
// (Si vous vouliez la « marge commerciale » réelle à 30 % : 700 / 0,70 = 1000 €.
//  Dans ce cas remplacez la ligne ci-dessous par :
//  Math.round(POSE_COST_PER_UNIT / (1 - POSE_MARGIN)).)
export const POSE_PRICE_PER_UNIT = Math.round(
  POSE_COST_PER_UNIT * (1 + POSE_MARGIN)
); // 910 €

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
