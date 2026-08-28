// ──────────────────────────────────────────────────────────────────────────
// Contenu éditorial de la boutique (hors catalogue).
// Le catalogue, les prix et les photos viennent de Shopify (lib/shopify.ts).
// ──────────────────────────────────────────────────────────────────────────

export const BOUTIQUE = {
  eyebrow: "Boutique",
  title: "Des caches design pour vos unités de climatisation.",
  intro:
    "Aluminium thermolaqué, fabrication française, garantie 10 ans. Une quarantaine de motifs, cinq tailles, huit teintes RAL et une option sur mesure. Livraison offerte en France métropolitaine.",
  delivery: "Livraison offerte en France métropolitaine",
  deliveryDelay: "Expédition sous 10 à 15 jours ouvrés",
  warranty: "Garantie 10 ans",
  material: "Aluminium thermolaqué certifié Qualilaquage",
  origin: "Fabrication française",
  customColorSupplement: 180,
} as const;

export type Categorie = {
  id: "exterieur" | "interieur" | "piece";
  label: string;
  short: string;
  intro: string;
};

export const CATEGORIES: Categorie[] = [
  {
    id: "exterieur",
    label: "Unité extérieure",
    short: "Extérieur",
    intro:
      "Le groupe extérieur habillé sans jamais entraver la ventilation. Pose murale ou au sol, cinq tailles du S au XXL.",
  },
  {
    id: "interieur",
    label: "Split intérieur",
    short: "Intérieur",
    intro:
      "Un habillage discret et épuré pour l'unité intérieure, décliné en trois tailles.",
  },
  {
    id: "piece",
    label: "Pièces détachées",
    short: "Pièces",
    intro: "Panneaux et réglettes de rechange, dans la finition de votre cache.",
  },
];

export const COULEURS = [
  { name: "Noir profond", ral: "RAL 9005", hex: "#0E0E10" },
  { name: "Blanc pur", ral: "RAL 9010", hex: "#F1F0EA" },
  { name: "Gris clair", ral: "RAL 7035", hex: "#C5C7C4" },
  { name: "Gris aluminium", ral: "RAL 9006", hex: "#A5A5A5" },
  { name: "Gris anthracite", ral: "RAL 7016", hex: "#383E42" },
  { name: "Brun sépia", ral: "RAL 8014", hex: "#4A3A2C" },
  { name: "Ivoire", ral: "RAL 1015", hex: "#E6D2B5" },
  { name: "Vert mousse", ral: "RAL 6005", hex: "#2F4538" },
] as const;

export const POSES = ["Murale", "Au sol"] as const;

/** Dimensions par taille, selon la catégorie et la pose. */
export const DIMENSIONS: Record<string, Record<string, string>> = {
  "exterieur-murale": {
    S: "H 70–85 × L 90 × P 50 cm",
    M: "H 85–100 × L 100 × P 50 cm",
    L: "H 100–115 × L 110 × P 70 cm",
    XL: "H 115–130 × L 120 × P 50 cm",
    XXL: "H 165–180 × L 120 × P 50 cm",
  },
  "exterieur-sol": {
    S: "H 70 × L 90 × P 50–74 cm",
    M: "H 85 × L 100 × P 50–74 cm",
    L: "H 100 × L 110 × P 70–94 cm",
    XL: "H 115 × L 120 × P 50–74 cm",
    XXL: "H 165 × L 120 × P 50–74 cm",
  },
  "interieur-murale": {
    S: "H 30 × L 92 × P 26,5 cm",
    M: "H 33,5 × L 108 × P 30,5 cm",
    L: "H 44 × L 120 × P 35 cm",
  },
};

export const ARGUMENTS = [
  {
    title: "La ventilation préservée",
    text: "Chaque motif est découpé pour laisser passer l'air dont l'appareil a besoin. Les performances et la consommation de votre climatisation restent inchangées.",
  },
  {
    title: "Pensé pour durer dehors",
    text: "Aluminium thermolaqué certifié Qualilaquage : ni rouille, ni décoloration sous les UV, ni dégradation par la pluie ou le gel. Garantie dix ans.",
  },
  {
    title: "Compatible avec votre matériel",
    text: "Les cinq gabarits couvrent les groupes extérieurs des grandes marques du marché. Mesurez votre unité, choisissez la taille juste au-dessus.",
  },
  {
    title: "Posé en quelques minutes",
    text: "Les pièces arrivent pré-assemblées, avec la visserie inox et la notice. Pose murale sur équerres ou au sol selon votre configuration.",
  },
  {
    title: "Huit teintes, ou la vôtre",
    text: "Huit coloris RAL au catalogue, du noir profond au vert mousse. Pour une teinte précise, l'option sur mesure ouvre plus de 200 références RAL.",
  },
  {
    title: "Livraison offerte",
    text: "Expédition sous 10 à 15 jours ouvrés partout en France métropolitaine, sans frais de port, directement chez vous.",
  },
];

export const FAQ = [
  {
    q: "Le cache réduit-il les performances de ma climatisation ?",
    a: "Non. Les découpes sont dimensionnées pour conserver le débit d'air nécessaire au groupe. Il faut simplement respecter la taille adaptée à votre appareil et les dégagements indiqués dans la notice.",
  },
  {
    q: "Comment choisir la bonne taille ?",
    a: "Mesurez la hauteur, la largeur et la profondeur de votre unité extérieure, puis retenez le gabarit immédiatement supérieur. Les dimensions de chaque taille sont indiquées sur la fiche produit. En cas de doute, écrivez-nous avant de commander.",
  },
  {
    q: "Est-ce compatible avec ma marque de climatiseur ?",
    a: "Oui, les caches sont universels : ils se dimensionnent sur l'encombrement de l'appareil et non sur sa marque. Ils conviennent aux climatiseurs et pompes à chaleur air/air des principaux fabricants.",
  },
  {
    q: "Puis-je le poser moi-même ?",
    a: "Oui. Les éléments arrivent pré-assemblés avec la visserie inox et une notice de montage. Comptez quelques minutes pour la pose murale comme pour la pose au sol.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Les caches sont fabriqués à la commande. Comptez 10 à 15 jours ouvrés d'expédition, en France métropolitaine, livraison offerte.",
  },
  {
    q: "Et si je veux une couleur qui n'est pas au catalogue ?",
    a: "Choisissez la finition « Coloris sur mesure » sur la fiche produit et indiquez la référence RAL souhaitée : plus de 200 teintes sont disponibles.",
  },
];
