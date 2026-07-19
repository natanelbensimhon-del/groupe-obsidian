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
    src: "/realisations/daikin-emura-1.jpg",
    title: "Daikin Emura",
    caption: "Unité murale design premium, intégration nette sur lambris.",
    brand: "Daikin",
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
