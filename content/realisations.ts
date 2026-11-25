// Réalisations climatisation — photos de chantiers Groupe Obsidian.
// 🖼️ Ajoutez d'autres photos dans /public/realisations/ et complétez la liste.

export type Realisation = {
  src: string;
  title: string;
  caption: string;
  brand: string;
  kind: "Intérieure" | "Extérieure";
};

export const REALISATIONS: Realisation[] = [
  {
    src: "/realisations/daikin-stylish-1.jpg",
    title: "Daikin Stylish",
    caption: "Unité murale intérieure, finition soignée le long de la moulure.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/daikin-noir-delperier.jpg",
    title: "Daikin — finition noire",
    caption: "Unité murale noire, intégration élégante au-dessus des briques de verre.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/daikin-stylish-gris.jpg",
    title: "Daikin Stylish — finition grise",
    caption: "Unité murale Stylish gris anthracite, pose épurée en angle.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/daikin-emura-1.jpg",
    title: "Daikin Emura",
    caption: "Unité murale design premium, intégration nette sur lambris.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/airwell-interieur-1.jpg",
    title: "Airwell — unité murale",
    caption: "Split intérieur posé au-dessus d'une étagère, intégration dans un intérieur soigné.",
    brand: "Airwell",
    kind: "Intérieure",
  },
  {
    src: "/realisations/mitsubishi-exterieur-1.jpg",
    title: "Groupe extérieur Mitsubishi",
    caption: "Unité extérieure posée sur équerres, sous débord de toiture.",
    brand: "Mitsubishi Electric",
    kind: "Extérieure",
  },
  {
    src: "/realisations/daikin-stylish-2.jpg",
    title: "Daikin Stylish",
    caption: "Implantation discrète en angle de pièce, liaisons cachées.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/daikin-stylish-3.jpg",
    title: "Daikin Stylish",
    caption: "Pose sous fenêtre, diffusion optimisée dans la pièce.",
    brand: "Daikin",
    kind: "Intérieure",
  },
  {
    src: "/realisations/airwell-exterieur-1.jpg",
    title: "Groupe extérieur au sol",
    caption: "Unité extérieure sur dalles et plots antivibratiles.",
    brand: "Airwell",
    kind: "Extérieure",
  },
];

// Réalisations pompe à chaleur air/eau — photos et vidéos de chantiers.
// Fichiers dans /public/realisations/pac/.
export type PacRealisation = {
  title: string;
  caption: string;
  brand: string;
  src: string;
  /** Vidéo : `src` pointe vers le .mp4, `poster` vers l'image d'aperçu. */
  video?: boolean;
  poster?: string;
  /** Mise en avant : grande vignette en tête de galerie. */
  featured?: boolean;
};

export const PAC_REALISATIONS: PacRealisation[] = [
  {
    title: "Installation complète air/eau",
    caption: "Module hydraulique, ballon d'eau chaude, vases d'expansion et groupe extérieur : le tour d'un chantier terminé.",
    brand: "Air/eau",
    src: "/realisations/pac/installation-complete.mp4",
    poster: "/realisations/pac/installation-complete-poster.jpg",
    video: true,
    featured: true,
  },
  {
    title: "PAC York 30 kW",
    caption: "Visite d'un chantier : groupe extérieur posé sur dalle béton.",
    brand: "York",
    src: "/realisations/pac/york-30kw-installation.mp4",
    poster: "/realisations/pac/york-30kw-installation-poster.jpg",
    video: true,
  },
  {
    title: "PAC De Dietrich 27 kW",
    caption: "Installation terminée, présentation du chantier.",
    brand: "De Dietrich",
    src: "/realisations/pac/de-dietrich-27kw-installation.mp4",
    poster: "/realisations/pac/de-dietrich-27kw-installation-poster.jpg",
    video: true,
  },
  {
    title: "Groupe extérieur York",
    caption: "PAC air/eau sur dalle béton et plots antivibratiles, liaisons sous goulotte.",
    brand: "York",
    src: "/realisations/pac/york-exterieur-dalle.jpg",
  },
  {
    title: "Module hydraulique Atlantic",
    caption: "Module intérieur en chaufferie, vase d'expansion et ballon, réseau calorifugé.",
    brand: "Atlantic",
    src: "/realisations/pac/atlantic-module-hydraulique.jpg",
  },
  {
    title: "Groupe extérieur Atlantic",
    caption: "Unité extérieure posée sur terrasse, plots antivibratiles et interrupteur de proximité.",
    brand: "Atlantic",
    src: "/realisations/pac/atlantic-fujitsu-terrasse.jpg",
  },
  {
    title: "Groupe extérieur Ariston",
    caption: "PAC air/eau double ventilateur, pose sur plots en façade.",
    brand: "Ariston",
    src: "/realisations/pac/ariston-exterieur.jpg",
  },
  {
    title: "Raccordements brasés",
    caption: "Brasure des raccordements cuivre, en atelier de chantier.",
    brand: "Thaleos",
    src: "/realisations/pac/thaleos-brasure.mp4",
    poster: "/realisations/pac/thaleos-brasure-poster.jpg",
    video: true,
  },
  {
    title: "PAC air/eau monobloc",
    caption: "Groupe extérieur en patio, sur plots antivibratiles.",
    brand: "Air/eau",
    src: "/realisations/pac/monobloc-terrasse.jpg",
  },
];
