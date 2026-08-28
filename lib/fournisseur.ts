// ──────────────────────────────────────────────────────────────────────────
// Table de correspondance entre nos références boutique et le catalogue de
// production du fabricant partenaire.
//
// Nos SKU suivent le format : OBS-CC-<MODELE>-<TAILLE>-<STD|SUR>
// Le fabricant identifie ses produits par un slug de fiche.
// ──────────────────────────────────────────────────────────────────────────

/** Slug de la fiche fabricant, par modèle de notre boutique. */
export const REF_FABRICANT: Record<string, string> = {
  // Extérieur — le slug fabricant est identique au nôtre, sauf exceptions
  "persienne-arrondis": "cache-climatiseur-persienne-a-angles-arrondis",
  "persienne-droits": "cache-climatiseur-persienne-angles-droits",
  // Intérieur
  "interieur-bords-arrondis": "cache-climatiseur-interieur",
  "interieur-bords-droits": "cache-climatiseur-interieur-bords-droits",
  "interieur-arque": "cache-climatiseur-interieur-arque-bords-arrondis",
  // Pièces détachées
  "piece-face-inferieure": "piece-detachee-face-inferieure-pour-cache-clim-exterieur",
  "piece-reglette-profondeur":
    "piece-detachee-reglette-profondeur-pour-cache-clim-exterieur-mural-lot-de-4",
  "piece-reglette-hauteur":
    "piece-detachee-reglette-hauteur-pour-cache-clim-exterieur-sol-lot-de-4",
};

/** Résout le slug fabricant à partir de notre slug de modèle. */
export function refFabricant(slug: string): string {
  return REF_FABRICANT[slug] ?? `cache-climatiseur-${slug}`;
}

/** Dimensions catalogue fabricant, par taille et type de pose. */
const DIM_SLUG: Record<string, Record<string, string>> = {
  murale: {
    S: "s-h-70l-90p-50-74cm",
    M: "m-h-85l-100p-50-74cm",
    L: "l-h-100l-110p-70-94cm",
    XL: "xl-h-115l-120p-50-74cm",
    XXL: "xxl-h-165-l-120-p-50-74cm",
  },
  sol: {
    S: "s-h-70-85-l-90-p-50-cm",
    M: "m-h-85-100-l-100-p-50-cm",
    L: "l-h-100-115-l-110-p-70-cm",
    XL: "xl-h-115-130-l-120-p-50-cm",
    XXL: "xxl-h-165-180-l-120-p-50-cm",
  },
  interieur: {
    S: "s-h-92-l-30-p-2605-cm",
    M: "m-h-108-l-3305-p-3005-cm",
    L: "l-h-120-l-44-35-cm",
  },
};

/** Coloris catalogue fabricant. */
const COULEUR_SLUG: Record<string, string> = {
  "Noir profond": "noir-profond-ral-9005",
  "Blanc pur": "blanc-pur-ral-9010",
  "Gris clair": "gris-clair-ral-7035",
  "Gris aluminium": "gris-aluminium-ral-9006",
  "Gris anthracite": "gris-anthracite-ral-7016",
  "Brun sépia": "brun-sepia-ral-8014",
  Ivoire: "ivoire-ral-1015",
  "Vert mousse": "vert-mousse-ral-6005",
};

export type LigneCommande = {
  /** Notre SKU, tel qu'il figure sur la commande client. */
  sku: string;
  modele: string;
  taille: string;
  quantite: number;
  pose: "Murale" | "Au sol" | null;
  coloris: string;
  surMesure: boolean;
  /** Références catalogue fabricant. */
  fabricant: {
    produit: string;
    fixation: string | null;
    dimensions: string | null;
    couleurs: string;
  };
};

/**
 * Traduit une ligne de commande client en références de production.
 * `attributs` reprend les propriétés de ligne enregistrées au paiement
 * (Pose, Coloris, Dimensions).
 */
export function traduireLigne(
  sku: string,
  quantite: number,
  attributs: Record<string, string>
): LigneCommande | null {
  const m = /^OBS-CC-(.+)-([A-Z]+|Unique)-(STD|SUR)$/.exec(sku);
  if (!m) return null;

  const [, modeleRaw, taille, finition] = m;
  const modele = modeleRaw.toLowerCase();
  const surMesure = finition === "SUR";

  const poseAttr = attributs["Pose"];
  const pose = poseAttr === "Au sol" ? "Au sol" : poseAttr === "Murale" ? "Murale" : null;

  const coloris = attributs["Coloris"] ?? "Noir profond";
  const interieur = modele.startsWith("interieur");
  const table = interieur ? "interieur" : pose === "Au sol" ? "sol" : "murale";

  return {
    sku,
    modele,
    taille,
    quantite,
    pose,
    coloris,
    surMesure,
    fabricant: {
      produit: refFabricant(modele),
      fixation: interieur ? null : pose === "Au sol" ? "sol" : "murale",
      dimensions: DIM_SLUG[table]?.[taille] ?? null,
      couleurs: surMesure ? "custom" : COULEUR_SLUG[coloris] ?? "noir-profond-ral-9005",
    },
  };
}

/** Récapitulatif lisible d'une ligne, pour un bon de commande. */
export function libelleLigne(l: LigneCommande): string {
  const bits = [l.modele.toUpperCase(), `Taille ${l.taille}`];
  if (l.pose) bits.push(`Pose ${l.pose.toLowerCase()}`);
  bits.push(`Coloris ${l.coloris}`);
  return `${l.quantite} × ${bits.join(" · ")}`;
}
