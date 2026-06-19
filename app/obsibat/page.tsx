import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, Manifesto } from "@/components/sections/Blocks";

export const metadata = buildMetadata({
  title: "OBSI'BAT — Gros œuvre & démolition",
  description:
    "OBSI'BAT, entité technique du Groupe Obsidian : gros œuvre, démolition, structure, renforcement et préparation technique des bâtiments pour les opérations structurantes.",
  path: "/obsibat",
  keywords: ["gros œuvre", "démolition", "OBSI'BAT", "structure bâtiment"],
});

const SCOPE = [
  {
    title: "Gros œuvre",
    text: "Réalisation des ouvrages structurels qui conditionnent la solidité et la pérennité du bâtiment.",
  },
  {
    title: "Démolition",
    text: "Interventions de déconstruction maîtrisées, préalables aux transformations lourdes.",
  },
  {
    title: "Structure & renforcement",
    text: "Reprise et renforcement structurel pour adapter le bâti aux nouveaux usages.",
  },
  {
    title: "Maçonnerie technique",
    text: "Travaux de maçonnerie exigeants, intégrés à une logique de projet global.",
  },
  {
    title: "Préparation du bâti",
    text: "Mise en condition technique des bâtiments avant les phases de rénovation énergétique.",
  },
  {
    title: "Coordination bureaux d'étude",
    text: "Travail conjoint avec les bureaux d'étude lorsque les opérations l'exigent.",
  },
];

export default function ObsibatPage() {
  return (
    <>
      <PageHero
        tone="steel"
        index="06"
        eyebrow="OBSI'BAT — Entité du groupe"
        title="Gros œuvre, démolition et interventions techniques encadrées."
        intro="OBSI'BAT intervient sur les phases lourdes et techniques des projets : démolition, gros œuvre, préparation structurelle et adaptation du bâti. Une structure technique du Groupe Obsidian, capable d'intervenir sur des opérations structurantes."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Périmètre d'intervention"
            title="Une expertise structurelle, intégrée à l'écosystème."
            intro="OBSI'BAT n'est pas une simple entreprise de maçonnerie : c'est l'entité qui sécurise les fondations techniques des projets du groupe."
          />
          <div className="mt-14">
            <FeatureColumns items={SCOPE} accent="steel" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            Les travaux lourds conditionnent la réussite d&apos;un projet
            énergétique. OBSI&apos;BAT les traite avec méthode, sécurité et
            encadrement.
          </Manifesto>
        </div>
      </section>

      <CTASection
        title="Une opération structurante à étudier ?"
        secondary={{ label: "Voir les travaux", href: "/travaux" }}
      />
    </>
  );
}
