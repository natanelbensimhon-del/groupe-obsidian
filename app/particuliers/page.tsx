import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, ProcessTimeline } from "@/components/sections/Blocks";

export const metadata = buildMetadata({
  title: "Particuliers",
  description:
    "Accompagnement premium des propriétaires : rénovation énergétique, isolation, chauffage, pompe à chaleur, ventilation, dossier administratif et suivi clair.",
  path: "/particuliers",
  keywords: ["rénovation énergétique maison", "accompagnement énergétique premium"],
});

const OFFER = [
  {
    title: "Isolation",
    text: "Amélioration de l'enveloppe pour plus de confort et moins de déperditions.",
  },
  {
    title: "Chauffage & pompe à chaleur",
    text: "Solutions performantes adaptées à votre logement et à vos usages.",
  },
  {
    title: "Ventilation",
    text: "Un air sain et renouvelé, en cohérence avec la rénovation.",
  },
  {
    title: "Aides selon éligibilité",
    text: "Information claire sur les dispositifs mobilisables, selon votre situation.",
  },
  {
    title: "Dossier administratif",
    text: "Constitution et suivi des démarches, sans jargon inutile.",
  },
  {
    title: "Partenaires qualifiés",
    text: "Des intervenants sélectionnés et coordonnés pour la qualité d'exécution.",
  },
];

const STEPS = [
  { title: "Échange", text: "Compréhension de votre projet et de vos attentes." },
  { title: "Étude", text: "Préconisations claires et étapes du projet." },
  { title: "Travaux", text: "Réalisation par des partenaires qualifiés." },
  { title: "Suivi", text: "Accompagnement jusqu'à la fin du chantier." },
];

export default function ParticuliersPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Particuliers"
        title="Un accompagnement premium, simple et rassurant."
        intro="Pour les propriétaires de maisons individuelles : un projet de rénovation énergétique mené avec sérieux, clarté et suivi, du premier échange jusqu'à la fin des travaux."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Ce que nous prenons en charge"
            title="Tout est plus simple quand c'est bien accompagné."
          />
          <div className="mt-14">
            <FeatureColumns items={OFFER} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Comment ça se passe"
            title="Des étapes claires, du début à la fin."
            intro="Les aides éventuelles dépendent de votre éligibilité et du cadre en vigueur. Nous vous informons honnêtement, sans rien promettre qui ne soit certain."
          />
          <div className="mt-14">
            <ProcessTimeline steps={STEPS} />
          </div>
        </div>
      </section>

      <CTASection
        title="Parlons de votre maison."
        intro="Décrivez votre logement et votre projet : nous vous expliquons les options, les étapes et les démarches, en toute clarté."
      />
    </>
  );
}
