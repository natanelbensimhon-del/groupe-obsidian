import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import {
  FeatureColumns,
  ProcessTimeline,
  ListCheck,
  StatStrip,
} from "@/components/sections/Blocks";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Rénovation énergétique tertiaire",
  description:
    "Rénovation énergétique tertiaire pour entreprises, bureaux, commerces, foncières et syndics : audit, gisements d'économies, travaux, valorisation CEE et pilotage technique.",
  path: "/tertiaire",
  keywords: [
    "rénovation énergétique tertiaire",
    "rénovation énergétique entreprise",
    "performance énergétique bâtiment",
  ],
});

const TARGETS = [
  "Entreprises & bureaux",
  "Commerces & retail",
  "Foncières & gestionnaires d'actifs",
  "Syndics & bâtiments collectifs",
  "Sites professionnels",
  "Maîtres d'ouvrage",
];

const APPROACH = [
  {
    title: "Audit & lecture du bâtiment",
    text: "Compréhension technique de l'enveloppe, des systèmes et des usages réels du site.",
  },
  {
    title: "Gisements d'économies",
    text: "Identification des postes de déperdition et des opérations à plus fort potentiel.",
  },
  {
    title: "Solutions énergétiques",
    text: "Isolation, chauffage, ventilation et systèmes pensés pour la performance globale.",
  },
  {
    title: "Valorisation CEE",
    text: "Structuration des opérations éligibles et sécurisation de la chaîne documentaire.",
  },
  {
    title: "Pilotage technique",
    text: "Coordination des intervenants et suivi rigoureux du chantier jusqu'à réception.",
  },
  {
    title: "Accompagnement administratif",
    text: "Gestion des dossiers, des justificatifs et de la conformité réglementaire.",
  },
];

const STEPS = [
  { title: "Diagnostic", text: "État des lieux technique et énergétique de l'actif." },
  { title: "Stratégie", text: "Plan d'actions priorisé selon le potentiel et le ROI." },
  { title: "Exécution", text: "Travaux pilotés et coordonnés par le groupe." },
  { title: "Valorisation", text: "Suivi des performances et mobilisation CEE." },
];

export default function TertiairePage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Pôle tertiaire"
        title="Rénovation énergétique des actifs professionnels."
        intro="Pour les entreprises, foncières, syndics et gestionnaires d'actifs : nous lisons le bâtiment, identifions les gisements d'économies d'énergie et pilotons les opérations dans une logique de performance et de conformité."
      />

      <section className="py-16 md:py-24">
        <div className="shell">
          <StatStrip
            items={[
              { value: "360°", label: "Lecture du bâtiment" },
              { value: "CEE", label: "Opérations valorisables" },
              { value: "ROI", label: "Vision performance" },
              { value: "1", label: "Interlocuteur groupe" },
            ]}
          />
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <SectionHeader
            index="01"
            eyebrow="Pour qui"
            title="Des actifs exigeants, des interlocuteurs structurés."
            intro="Nous intervenons auprès des décideurs qui attendent de la rigueur, de la lisibilité et une vision orientée valeur."
          />
          <Reveal>
            <GlassCard className="p-8 md:p-10">
              <ListCheck items={TARGETS} />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Notre approche"
            title="De l'audit à la valorisation, une chaîne maîtrisée."
            intro="Chaque levier est traité comme un maillon d'une stratégie énergétique cohérente, jamais comme une prestation isolée."
          />
          <div className="mt-14">
            <FeatureColumns items={APPROACH} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Déroulé d'un projet"
            title="Une trajectoire claire en quatre temps."
          />
          <div className="mt-14">
            <ProcessTimeline steps={STEPS} />
          </div>
          <Reveal className="mt-10 max-w-2xl">
            <p className="text-sm leading-relaxed text-ash-400">
              Les performances et les volumes valorisables dépendent des
              caractéristiques techniques du bâtiment, des opérations engagées et
              du cadre réglementaire applicable. Aucun résultat ni aide ne sont
              garantis : nous nous engageons sur la rigueur de la méthode.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Faisons parler votre bâtiment."
        intro="Présentez-nous votre actif tertiaire : surface, usage, enjeux. Nous revenons vers vous avec une lecture structurée et des pistes d'optimisation."
        secondary={{ label: "Optimisation CEE", href: "/optimisation-cee" }}
      />
    </>
  );
}
