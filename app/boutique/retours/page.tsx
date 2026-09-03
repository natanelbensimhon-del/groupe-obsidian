import { buildMetadata } from "@/lib/seo";
import { LegalDoc, type LegalSection } from "@/components/boutique/LegalDoc";

export const metadata = buildMetadata({
  title: "Retours & remboursement",
  description:
    "Politique de retour et de remboursement de la boutique Groupe Obsidian : produits fabriqués sur mesure, garanties légales, garantie 10 ans, produits endommagés ou non conformes.",
  path: "/boutique/retours",
});

const INTRO = [
  {
    p: "Information importante — produits personnalisés : les caches pour unités de climatisation vendus par Groupe Obsidian sont fabriqués sur mesure à la commande (dimensions spécifiques, coloris RAL au choix, motifs de découpe). Conformément à l'article L.221-28 3° du Code de la consommation, ces produits sont exclus du droit de rétractation de 14 jours. En validant votre commande, vous reconnaissez expressément que la fabrication démarre immédiatement et vous renoncez à votre droit de rétractation. Aucun retour ou remboursement pour convenance personnelle ne pourra être accepté une fois la fabrication lancée.",
  },
  {
    p: "La présente politique de retour et de remboursement s'applique à toutes les commandes passées sur la boutique en ligne de Groupe Obsidian. Elle est conforme au Code de la consommation, notamment aux articles L.221-18 et suivants (droit de rétractation) et L.217-3 et suivants (garantie légale de conformité).",
  },
];

const SECTIONS: LegalSection[] = [
  {
    title: "1. Absence de droit de rétractation — produits personnalisés",
    blocks: [
      { h: "1.1. Principe" },
      {
        p: "Conformément à l'article L.221-28 3° du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.",
      },
      {
        p: "L'ensemble des caches pour unités de climatisation extérieures et intérieures et les pièces détachées associées sont fabriqués sur mesure par notre atelier de fabrication partenaire, selon les choix du Client :",
      },
      {
        ul: [
          "Dimensions et taille sélectionnées en fonction de l'appareil ;",
          "Motifs de découpe et gammes décoratives ;",
          "Coloris au choix parmi le nuancier RAL (plus de 200 teintes) ou coloris spécifique.",
        ],
      },
      {
        p: "Ces produits étant fabriqués spécifiquement à la demande de chaque Client, ils sont exclus du droit de rétractation de 14 jours.",
      },
      { h: "1.2. Reconnaissance expresse du Client" },
      { p: "En validant sa commande, le Client reconnaît expressément :" },
      {
        ul: [
          "Que la fabrication de son produit personnalisé démarre immédiatement après validation du paiement ;",
          "Qu'il renonce à son droit de rétractation de 14 jours en application de l'article L.221-28 3° du Code de la consommation ;",
          "Qu'aucun retour, échange ou remboursement pour convenance personnelle ne sera accepté une fois la fabrication lancée ;",
          "Qu'il est seul responsable de l'exactitude des mesures et spécifications communiquées lors de la commande.",
        ],
      },
    ],
  },
  {
    title: "2. Produits endommagés, non conformes ou défectueux",
    blocks: [
      {
        p: "Malgré l'absence de droit de rétractation, le Client bénéficie des garanties légales en cas de produit endommagé, non conforme à la commande ou défectueux.",
      },
      { h: "2.1. Vérification à la réception" },
      {
        p: "Le Client est tenu de vérifier l'état de l'emballage et du produit en présence du transporteur au moment de la livraison. En cas de dommage constaté, le Client doit impérativement :",
      },
      {
        ul: [
          "Émettre des réserves précises et détaillées sur le bon de livraison du transporteur (la simple mention « sous réserve de déballage » est insuffisante) ;",
          "Prendre des photos du produit et de l'emballage, extérieur comme intérieur ;",
          "Refuser la livraison si le dommage est manifestement grave.",
        ],
      },
      { h: "2.2. Signalement à Groupe Obsidian" },
      {
        p: "Le Client doit informer Groupe Obsidian dans un délai de 72 heures suivant la réception, à l'adresse contact@groupe-obsidian.fr, en joignant : le numéro de commande, les photos du produit et de l'emballage, une copie du bon de livraison avec les réserves émises, et une description précise du défaut. Le produit et son emballage devront être conservés jusqu'à instruction de notre part.",
      },
      { h: "2.3. Solutions proposées" },
      {
        p: "Après analyse du dossier, Groupe Obsidian procédera selon la situation à l'envoi gratuit d'une pièce de remplacement, au remplacement complet du produit, ou au remboursement intégral de la commande (produit et frais de livraison inclus).",
      },
    ],
  },
  {
    title: "3. Garanties légales",
    blocks: [
      {
        p: "Indépendamment de la garantie commerciale, le Client bénéficie des garanties légales suivantes.",
      },
      { h: "3.1. Garantie légale de conformité (art. L.217-3 à L.217-17 du Code de la consommation)" },
      {
        p: "Le Client dispose d'un délai de 2 ans à compter de la délivrance du bien pour agir en garantie légale de conformité. Pendant ce délai, il peut obtenir la mise en conformité gratuite du produit par réparation ou remplacement, sans avoir à prouver l'existence du défaut. Cette garantie s'applique notamment si le produit reçu ne correspond pas aux spécifications de la commande validée (erreur de couleur, de dimensions ou de motif qui nous serait imputable). Elle ne s'applique pas aux erreurs de mesure communiquées par le Client. Les défauts apparaissant dans les 24 mois suivant la délivrance sont présumés exister au moment de la délivrance, sauf preuve contraire.",
      },
      { h: "3.2. Garantie des vices cachés (art. 1641 à 1649 du Code civil)" },
      {
        p: "Le Client peut également invoquer la garantie des vices cachés si le produit présente un défaut de fabrication rendant son usage impossible ou dangereux. Il peut alors choisir entre la résolution de la vente ou une réduction du prix (art. 1644 du Code civil). L'action doit être intentée dans un délai de 2 ans à compter de la découverte du vice.",
      },
      { h: "3.3. Exercice des garanties légales" },
      {
        p: "Pour faire valoir vos garanties légales, contactez-nous à contact@groupe-obsidian.fr en précisant la référence de commande, la description précise du défaut et en joignant des photos. Une pièce d'identité et une preuve d'achat pourront vous être demandées.",
      },
    ],
  },
  {
    title: "4. Garantie commerciale 10 ans (thermolaquage)",
    blocks: [
      {
        p: "En complément des garanties légales, Groupe Obsidian offre une garantie commerciale de 10 ans sur le thermolaquage de ses produits aluminium.",
      },
      { h: "4.1. Étendue" },
      {
        ul: [
          "Résistance du thermolaquage aux UV ;",
          "Non-décoloration anormale du revêtement ;",
          "Absence d'écaillage, de cloquage ou de corrosion dans des conditions d'usage normales.",
        ],
      },
      { h: "4.2. Exclusions" },
      {
        ul: [
          "Dommages résultant d'une mauvaise installation ou d'une utilisation non conforme ;",
          "Dommages causés par des chocs, rayures ou actes de vandalisme ;",
          "Dommages résultant de produits d'entretien inadaptés ou agressifs ;",
          "Usure normale et évolution naturelle de l'aspect du revêtement ;",
          "Environnement marin ou industriel agressif, sauf commande spécifique pour ces environnements ;",
          "Modifications ou réparations effectuées par le Client ou un tiers non autorisé.",
        ],
      },
      { h: "4.3. Mise en œuvre" },
      {
        p: "Pour faire valoir la garantie commerciale, contactez-nous à contact@groupe-obsidian.fr en joignant votre facture, des photos du produit et une description précise du défaut. Après expertise, nous procéderons à la réparation, au remplacement ou au remboursement dans les meilleurs délais.",
      },
    ],
  },
  {
    title: "5. Responsabilité du Client",
    blocks: [
      { p: "Groupe Obsidian ne saurait être tenue pour responsable :" },
      {
        ul: [
          "Des erreurs de mesure communiquées par le Client lors de la commande (hauteur, largeur, profondeur de l'unité de climatisation ou de la pompe à chaleur) ;",
          "D'une installation non conforme du cache par le Client ou un tiers, qui endommagerait l'appareil ou son support ;",
          "De l'utilisation du produit dans des conditions non prévues par les instructions de pose et d'entretien.",
        ],
      },
      {
        p: "Il appartient au Client de vérifier l'exactitude des mesures avant validation de la commande. En cas de doute, notre service client est à disposition pour vous accompagner dans le choix des dimensions adaptées (voir aussi notre guide de compatibilité).",
      },
    ],
  },
  {
    title: "6. Remboursement",
    blocks: [
      { h: "6.1. Cas donnant lieu à remboursement" },
      {
        ul: [
          "Produit non conforme aux spécifications de la commande validée (garantie légale de conformité) ;",
          "Produit présentant un vice caché ;",
          "Produit endommagé lors du transport, avec réserves dûment émises à la livraison ;",
          "Annulation de la commande par Groupe Obsidian avant le lancement de la fabrication.",
        ],
      },
      { h: "6.2. Délai et modalités" },
      {
        p: "Le remboursement est effectué dans un délai maximal de 14 jours à compter de la validation du dossier. Il est réalisé en utilisant le même moyen de paiement que celui de la transaction initiale, sauf accord exprès du Client. Aucun frais n'est appliqué au Client au titre du remboursement.",
      },
    ],
  },
  {
    title: "7. Dispositions applicables aux professionnels (B2B)",
    blocks: [
      {
        p: "Les garanties légales de conformité prévues par le Code de la consommation (art. L.217-3 et suivants) ne s'appliquent pas aux commandes passées dans le cadre d'une activité professionnelle. Les professionnels bénéficient toutefois de la garantie commerciale de 10 ans et de la garantie des vices cachés (art. 1641 à 1649 du Code civil).",
      },
    ],
  },
  {
    title: "8. Service client",
    blocks: [
      {
        p: "Notre équipe est à votre disposition pour toute question relative à une commande, une livraison, un retour ou une garantie : e-mail contact@groupe-obsidian.fr — courrier : Groupe Obsidian, Service Client, 313 avenue Georges-Clemenceau, 78670 Villennes-sur-Seine.",
      },
    ],
  },
  {
    title: "9. Médiation de la consommation",
    blocks: [
      {
        p: "Conformément aux articles L.611-1 et suivants du Code de la consommation, en cas de litige non résolu à l'amiable, le consommateur peut recourir gratuitement au médiateur de la consommation. La saisine du médiateur n'est recevable qu'après une démarche écrite préalable auprès de Groupe Obsidian restée sans réponse satisfaisante dans un délai de deux mois. Le consommateur peut également utiliser la plateforme européenne de Règlement en Ligne des Litiges : https://ec.europa.eu/consumers/odr/",
      },
      {
        p: "Coordonnées du médiateur de la consommation : à compléter (Groupe Obsidian doit adhérer à un service de médiation agréé avant l'ouverture commerciale).",
      },
    ],
  },
  {
    title: "10. Paiement en plusieurs fois",
    blocks: [
      {
        p: "Lorsque cette option est proposée au paiement (via notre prestataire de paiement fractionné), son utilisation est soumise aux conditions générales propres à ce prestataire, que le Client accepte au moment de la commande.",
      },
    ],
  },
  {
    title: "11. Droit applicable",
    blocks: [
      {
        p: "La présente politique est soumise au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.",
      },
    ],
  },
];

export default function RetoursPage() {
  return <LegalDoc title="Retours & remboursement" intro={INTRO} sections={SECTIONS} />;
}
