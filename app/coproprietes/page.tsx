import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, ProcessTimeline } from "@/components/sections/Blocks";

export const metadata = buildMetadata({
  title: "Copropriétés",
  description:
    "Accompagnement des copropriétés (syndics, conseils syndicaux) : climatisation, pompe à chaleur, isolation par l'extérieur, rénovation énergétique, valorisation CEE et présentation claire en assemblée générale.",
  path: "/coproprietes",
  keywords: [
    "rénovation énergétique copropriété",
    "climatisation copropriété",
    "isolation copropriété",
    "syndic conseil syndical",
  ],
});

const OFFRE = [
  {
    title: "Climatisation réversible",
    text: "Solutions individuelles ou collectives pour le confort des logements, dans le respect du règlement de copropriété et des façades.",
  },
  {
    title: "Isolation par l'extérieur",
    text: "Traitement de l'enveloppe de l'immeuble : confort, économies et ravalement valorisant, en une opération coordonnée.",
  },
  {
    title: "Chauffage & pompe à chaleur",
    text: "Modernisation des systèmes collectifs, dimensionnée selon les besoins réels du bâtiment.",
  },
  {
    title: "Valorisation CEE",
    text: "Identification et sécurisation des aides et certificats mobilisables pour la copropriété.",
  },
  {
    title: "Dossier & conformité",
    text: "Constitution des devis, pièces techniques et documents nécessaires à la décision.",
  },
  {
    title: "Présentation en AG",
    text: "Un dossier clair et pédagogique, pensé pour être compris et voté en assemblée générale.",
  },
];

const STEPS = [
  { title: "Prévisite", text: "Visite technique de l'immeuble et écoute des besoins du conseil syndical." },
  { title: "Étude", text: "Préconisations chiffrées, options et gisements d'aides identifiés." },
  { title: "Assemblée générale", text: "Présentation claire du projet, prête à être votée." },
  { title: "Travaux & suivi", text: "Coordination des intervenants et suivi jusqu'à la réception." },
];

export default function CoproprietesPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Copropriétés"
        title="Un interlocuteur unique pour votre copropriété."
        intro="Syndics et conseils syndicaux : nous cadrons, chiffrons et pilotons vos projets énergétiques — climatisation, isolation, chauffage — avec un dossier clair, prêt pour l'assemblée générale."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Ce que nous prenons en charge"
            title="De la première visite au vote en AG."
          />
          <div className="mt-14">
            <FeatureColumns items={OFFRE} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Comment ça se passe"
            title="Une méthode lisible pour décider sereinement."
            intro="Les aides et certificats dépendent de l'éligibilité de la copropriété et du cadre en vigueur. Nous informons honnêtement, sans rien promettre qui ne soit certain."
          />
          <div className="mt-14">
            <ProcessTimeline steps={STEPS} />
          </div>
        </div>
      </section>

      <CTASection
        title="Un projet pour votre immeuble ?"
        intro="Décrivez votre copropriété et son besoin : nous organisons une prévisite et préparons un dossier clair pour votre conseil syndical."
      />
    </>
  );
}
