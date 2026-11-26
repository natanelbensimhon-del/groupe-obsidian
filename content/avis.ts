// Avis Google affichés sur le site.
// ⚠️ SIMULATION : les textes ci-dessous sont des exemples. Remplacez-les par
// les vrais avis de la fiche Google (prénom + initiale, date, texte exact)
// avant toute mise en ligne, puis passez SIMULATION à false.

export const AVIS_SIMULATION = true;

export const AVIS_GOOGLE = {
  note: 5.0,
  total: 7,
  // Lien « Voir tous les avis » : à remplacer par le lien de partage de la fiche.
  url: "https://www.google.com/maps/search/?api=1&query=Groupe+Obsidian+Villennes-sur-Seine",
};

export type Avis = {
  auteur: string;
  date: string;
  note: number;
  texte: string;
  prestation: string;
};

export const AVIS: Avis[] = [
  {
    auteur: "Client A.",
    date: "novembre 2026",
    note: 5,
    prestation: "Pompe à chaleur",
    texte:
      "Texte d'exemple. Installation de notre pompe à chaleur réalisée proprement, équipe ponctuelle et explications claires sur le fonctionnement.",
  },
  {
    auteur: "Client B.",
    date: "octobre 2026",
    note: 5,
    prestation: "Climatisation 4 unités",
    texte:
      "Texte d'exemple. Pose de 4 unités de climatisation, liaisons bien cachées, chantier laissé propre. Je recommande.",
  },
  {
    auteur: "Client C.",
    date: "octobre 2026",
    note: 5,
    prestation: "Isolation par l'extérieur",
    texte:
      "Texte d'exemple. Isolation de la façade par l'extérieur, très bon suivi du début à la fin et résultat soigné.",
  },
];
