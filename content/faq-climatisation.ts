// Données FAQ climatisation réversible — module neutre (utilisable en Server
// Component pour le JSON-LD FAQPage et en Client Component pour l'accordéon).

export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien de pièces peut-on climatiser avec cette offre ?",
    a: "L'offre comprend trois unités intérieures reliées à un groupe extérieur multisplit, permettant de traiter jusqu'à trois pièces. Le nombre et la répartition exacts sont confirmés lors de l'étude technique de votre logement.",
  },
  {
    q: "La climatisation réversible permet-elle également de chauffer ?",
    a: "Oui. Une climatisation réversible (pompe à chaleur air/air) rafraîchit l'été et chauffe l'hiver. Selon le dimensionnement, elle peut servir de chauffage d'appoint ou principal.",
  },
  {
    q: "Où peut-on installer le groupe extérieur ?",
    a: "Sur un mur de façade (équerres), au sol sur plots ou dalle, ou sur un balcon, en respectant les dégagements du constructeur et le voisinage. L'emplacement est validé lors de la prévisite.",
  },
  {
    q: "Comment sont évacués les condensats ?",
    a: "Selon la configuration : écoulement libre en façade, raccordement à une descente d'eaux pluviales, ou pompe de relevage si aucune évacuation naturelle n'est possible.",
  },
  {
    q: "Combien de temps dure l'installation ?",
    a: "Une installation multisplit standard se réalise généralement sur une à deux journées, selon le nombre d'unités, les longueurs de liaison et l'accessibilité du chantier.",
  },
  {
    q: "Une prévisite technique est-elle nécessaire ?",
    a: "Oui. La prévisite permet de valider la faisabilité, de dimensionner l'installation et de définir l'emplacement des unités et le passage des liaisons avant l'établissement du devis définitif.",
  },
  {
    q: "Le prix de 7 500 € TTC comprend-il toute l'installation ?",
    a: "Ce prix correspond à une installation standard fournie et posée (3 unités intérieures + 1 groupe extérieur De Dietrich). Il est soumis à la prévisite et à la validation de la faisabilité technique ; d'éventuels travaux complémentaires feraient l'objet d'un devis.",
  },
  {
    q: "La climatisation réversible est-elle éligible aux aides de l'État ?",
    a: "Une climatisation réversible air/air n'est généralement pas financée par MaPrimeRénov'. D'autres dispositifs ou conditions particulières peuvent exister selon le projet et la réglementation en vigueur. Une vérification personnalisée est nécessaire.",
  },
  {
    q: "Comment entretenir une climatisation réversible ?",
    a: "Un entretien régulier est recommandé : nettoyage des filtres des unités intérieures, contrôle de l'unité extérieure et vérification de l'écoulement des condensats. Un entretien périodique par un professionnel prolonge la durée de vie de l'installation.",
  },
];
