import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import {
  FeatureColumns,
  ProcessTimeline,
  Manifesto,
  ListCheck,
} from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Le Groupe",
  description:
    "Groupe Obsidian : un groupe énergétique structuré qui analyse, structure, pilote et exécute les projets de rénovation énergétique à fort enjeu.",
  path: "/le-groupe",
  keywords: ["groupe rénovation énergétique", "pilotage projet énergétique"],
});

const VALUES = [
  {
    title: "Notre vision",
    text: "Faire de la rénovation énergétique un levier de valeur maîtrisé, lisible et durable pour les actifs exigeants.",
  },
  {
    title: "Notre exigence",
    text: "Conformité, traçabilité et rigueur technique à chaque étape. Aucune zone grise, aucune promesse non tenable.",
  },
  {
    title: "Notre méthode",
    text: "Une lecture globale du projet : du diagnostic à l'exécution, en passant par la structuration et la valorisation.",
  },
];

const ROLE = [
  {
    title: "Structurer",
    text: "Cadrer le projet, les opérations éligibles et la chaîne documentaire avant toute exécution.",
  },
  {
    title: "Piloter",
    text: "Coordonner les intervenants, suivre la technique et garantir la conformité jusqu'à la livraison.",
  },
  {
    title: "Optimiser",
    text: "Identifier et mobiliser les gisements de valeur, notamment au titre des certificats d'économies d'énergie.",
  },
  {
    title: "Exécuter",
    text: "Mener les travaux et le gros œuvre dans une logique de performance et de qualité encadrée.",
  },
];

export default function LeGroupePage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Le Groupe"
        title="Un groupe énergétique structuré, du diagnostic à l'exécution."
        intro="Groupe Obsidian accompagne les projets énergétiques avec une approche globale : analyse, structuration, conformité, pilotage et exécution. Notre rôle est de rendre les opérations plus lisibles, plus sécurisées et plus performantes."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <FeatureColumns items={VALUES} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            Notre rôle : structurer, piloter, optimiser et exécuter les projets
            énergétiques à fort enjeu.
          </Manifesto>
          <div className="mt-14">
            <ProcessTimeline steps={ROLE} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <SectionHeader
            index="02"
            eyebrow="Conformité, technique & performance"
            title="Une approche qui sécurise autant qu'elle valorise."
            intro="Nous combinons maîtrise technique, exigence documentaire et lecture économique pour transformer la complexité d'un projet énergétique en trajectoire claire."
          />
          <Reveal>
            <ListCheck
              items={[
                "Lecture technique des bâtiments et des usages",
                "Cadrage réglementaire et documentaire",
                "Coordination d'un réseau de partenaires qualifiés",
                "Pilotage du diagnostic jusqu'à l'exécution",
                "Sécurisation des opérations CEE",
                "Vision performance et valeur long terme",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Parlons de votre opération."
        secondary={{ label: "Voir le pôle tertiaire", href: "/tertiaire" }}
      />
    </>
  );
}
