import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { DataFlowCEE } from "@/components/sections/DataFlowCEE";
import { FeatureColumns } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Optimisation de gisement CEE",
  description:
    "Optimisation des gisements de certificats d'économies d'énergie : analyse des fiches standardisées, identification des volumes valorisables, structuration et sécurisation documentaire.",
  path: "/optimisation-cee",
  keywords: [
    "optimisation CEE",
    "gisement CEE",
    "certificats d'économies d'énergie",
  ],
});

const STEPS = [
  {
    title: "Analyse des fiches CEE",
    text: "Lecture des fiches standardisées applicables et des conditions d'éligibilité des opérations.",
  },
  {
    title: "Volumes valorisables",
    text: "Identification des gisements mobilisables au regard du projet et du bâtiment.",
  },
  {
    title: "Structuration du dossier",
    text: "Cadrage des opérations et organisation de la chaîne documentaire dès l'amont.",
  },
  {
    title: "Sécurisation documentaire",
    text: "Constitution et fiabilisation des preuves nécessaires à la conformité.",
  },
  {
    title: "Coordination",
    text: "Articulation entre travaux, preuves, conformité et valorisation.",
  },
  {
    title: "Analyse du potentiel",
    text: "Lecture du potentiel opérationnel, énergétique et financier de l'opération.",
  },
];

export default function CeePage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Optimisation CEE"
        title="Identifier, structurer et valoriser les gisements CEE."
        intro="Notre approche consiste à identifier les gisements mobilisables, structurer les opérations et sécuriser la chaîne documentaire afin de maximiser la valeur potentielle des projets, dans le respect du cadre applicable."
      />

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Flux de valorisation"
            title="Du diagnostic à la valeur, une chaîne sécurisée."
            intro="Chaque étape alimente la suivante : la valeur d'un gisement se construit dès l'amont, dans la qualité de la structuration et des preuves."
          />
          <div className="mt-14">
            <DataFlowCEE />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Notre méthode"
            title="Une expertise sobre, conforme et opérationnelle."
          />
          <div className="mt-14">
            <FeatureColumns items={STEPS} />
          </div>
          <Reveal className="mt-12 max-w-3xl">
            <p className="text-sm leading-relaxed text-ash-400">
              L&apos;optimisation dépend des critères techniques, réglementaires,
              documentaires et opérationnels propres à chaque opération. Nous ne
              promettons aucun montant garanti ni aucune aide automatique : notre
              engagement porte sur la rigueur de l&apos;identification, de la
              structuration et de la sécurisation des dossiers.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Évaluons votre gisement."
        intro="Décrivez-nous votre opération : nature des travaux, bâtiment, calendrier. Nous évaluons le potentiel et la structuration possible."
        secondary={{ label: "Voir le tertiaire", href: "/tertiaire" }}
      />
    </>
  );
}
