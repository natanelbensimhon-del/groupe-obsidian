import { buildMetadata } from "@/lib/seo";
import { LegalDoc, type LegalSection } from "@/components/boutique/LegalDoc";

export const metadata = buildMetadata({
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de la boutique Groupe Obsidian : commande, prix, paiement, livraison, garanties et litiges pour les caches de climatisation.",
  path: "/boutique/cgv",
});

const INTRO = [
  {
    p: "Les présentes conditions générales de vente (CGV) régissent les ventes de caches pour unités de climatisation et de pièces détachées conclues sur la boutique en ligne de Groupe Obsidian. Toute commande implique l'acceptation sans réserve des présentes CGV, que le Client reconnaît avoir lues avant de valider son paiement.",
  },
];

const SECTIONS: LegalSection[] = [
  {
    title: "1. Vendeur",
    blocks: [
      {
        p: "La boutique est éditée par Groupe Obsidian, SASU au capital de 40 000 €, immatriculée au RCS de Versailles sous le numéro 904 594 157, dont le siège est situé 313 avenue Georges-Clemenceau, 78670 Villennes-sur-Seine. SIRET 904 594 157 00037 — TVA intracommunautaire FR00 904 594 157. Contact : contact@groupe-obsidian.fr — 01 80 97 57 21.",
      },
    ],
  },
  {
    title: "2. Produits",
    blocks: [
      {
        p: "Les produits proposés sont des caches d'habillage pour unités de climatisation (extérieures et intérieures) et pièces détachées associées, en aluminium thermolaqué, fabriqués sur mesure à la commande par notre atelier de fabrication partenaire. Les photographies et descriptifs sont les plus fidèles possibles mais ne sauraient engager le Vendeur au-delà d'une présentation générale du produit. Le Client est responsable du choix de la taille et des dimensions adaptées à son appareil ; un guide de compatibilité est mis à sa disposition.",
      },
    ],
  },
  {
    title: "3. Prix",
    blocks: [
      {
        p: "Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors éventuels frais spécifiques signalés avant la commande. La livraison est offerte en France métropolitaine. Groupe Obsidian se réserve le droit de modifier ses prix à tout moment ; les produits sont facturés sur la base des tarifs en vigueur au moment de la validation de la commande.",
      },
    ],
  },
  {
    title: "4. Commande",
    blocks: [
      {
        p: "Le Client sélectionne son modèle, sa taille, sa pose et son coloris, puis valide son panier. La commande est ferme et définitive après validation du paiement. Un e-mail de confirmation récapitulant la commande est adressé au Client. S'agissant de produits fabriqués sur mesure, la fabrication démarre immédiatement après le paiement.",
      },
    ],
  },
  {
    title: "5. Paiement",
    blocks: [
      {
        p: "Le paiement s'effectue en ligne, au moment de la commande, via notre prestataire de paiement sécurisé. Sont notamment acceptées les cartes bancaires (Visa, Mastercard, American Express, Cartes Bancaires), Apple Pay, PayPal et, le cas échéant, le paiement en plusieurs fois. Les transactions sont sécurisées et chiffrées. La commande n'est validée qu'après encaissement effectif du paiement.",
      },
    ],
  },
  {
    title: "6. Livraison",
    blocks: [
      {
        p: "Les produits sont fabriqués à la commande puis expédiés directement au client. Le délai moyen d'expédition est de 10 à 15 jours ouvrés, en France métropolitaine, livraison offerte. Les délais sont donnés à titre indicatif. Le Client est tenu de vérifier l'état du colis à la réception et d'émettre toute réserve utile auprès du transporteur (voir la politique de retour et de remboursement).",
      },
    ],
  },
  {
    title: "7. Droit de rétractation",
    blocks: [
      {
        p: "Les produits étant confectionnés sur mesure selon les spécifications du Client, ils sont exclus du droit de rétractation de 14 jours, conformément à l'article L.221-28 3° du Code de la consommation. En validant sa commande, le Client renonce expressément à ce droit. Les modalités détaillées figurent dans la politique de retour et de remboursement.",
      },
    ],
  },
  {
    title: "8. Garanties",
    blocks: [
      {
        p: "Le Client bénéficie de la garantie légale de conformité (art. L.217-3 et suivants du Code de la consommation), de la garantie des vices cachés (art. 1641 et suivants du Code civil) et d'une garantie commerciale de 10 ans sur le thermolaquage. Les conditions d'exercice sont précisées dans la politique de retour et de remboursement.",
      },
    ],
  },
  {
    title: "9. Responsabilité",
    blocks: [
      {
        p: "La responsabilité de Groupe Obsidian ne saurait être engagée en cas d'erreur de mesure communiquée par le Client, de mauvaise installation du cache, ou d'utilisation non conforme aux instructions de pose et d'entretien. Le cache est un élément d'habillage : il ne doit pas entraver la ventilation de l'appareil, conformément aux dégagements indiqués.",
      },
    ],
  },
  {
    title: "10. Propriété intellectuelle",
    blocks: [
      {
        p: "L'ensemble des éléments de la boutique (textes, visuels, marques, mises en page) est protégé par le droit de la propriété intellectuelle et demeure la propriété de Groupe Obsidian ou de ses partenaires. Toute reproduction sans autorisation est interdite.",
      },
    ],
  },
  {
    title: "11. Données personnelles",
    blocks: [
      {
        p: "Les données collectées lors de la commande sont nécessaires à son traitement et à la livraison. Elles sont traitées conformément à notre politique de confidentialité. Le Client dispose d'un droit d'accès, de rectification, d'effacement et d'opposition à l'adresse contact@groupe-obsidian.fr.",
      },
    ],
  },
  {
    title: "12. Litiges, médiation et droit applicable",
    blocks: [
      {
        p: "Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. Le consommateur peut recourir gratuitement à un médiateur de la consommation (voir la politique de retour et de remboursement) ou à la plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr/. À défaut de résolution amiable, les tribunaux français sont compétents.",
      },
    ],
  },
];

export default function CgvPage() {
  return (
    <LegalDoc
      title="Conditions générales de vente"
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
