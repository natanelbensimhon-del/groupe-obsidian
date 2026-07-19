import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { ClimatisationFeature } from "@/components/sections/ClimatisationFeature";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExpertiseCard } from "@/components/ui/ExpertiseCard";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTASection } from "@/components/sections/CTASection";
import { DataFlowCEE } from "@/components/sections/DataFlowCEE";
import {
  StatStrip,
  ProcessTimeline,
  FeatureColumns,
  ListCheck,
  PartnersStrip,
  Manifesto,
} from "@/components/sections/Blocks";
import { PARTNERS } from "@/lib/site";

const POLES = [
  {
    index: "01",
    title: "Tertiaire",
    description:
      "Rénovation énergétique et performance des bureaux, commerces et bâtiments collectifs.",
    href: "/tertiaire",
  },
  {
    index: "02",
    title: "Travaux",
    description:
      "Isolation, chauffage, pompe à chaleur et ventilation, exécutés dans une logique de performance.",
    href: "/travaux",
  },
  {
    index: "03",
    title: "Optimisation CEE",
    description:
      "Identification, structuration et sécurisation documentaire des gisements valorisables.",
    href: "/optimisation-cee",
  },
  {
    index: "04",
    title: "OBSI'BAT",
    description:
      "Gros œuvre, démolition et préparation structurelle des bâtiments.",
    href: "/obsibat",
    accent: "steel" as const,
  },
  {
    index: "05",
    title: "Particuliers",
    description:
      "Accompagnement premium et lisible des propriétaires de maisons individuelles.",
    href: "/particuliers",
  },
  {
    index: "06",
    title: "APIRYON",
    description:
      "Aviation d'affaires : déplacements privés et service confidentiel sur mesure.",
    href: "/apiryon",
    accent: "gold" as const,
  },
];

const PROCESS = [
  {
    title: "Analyse",
    text: "Lecture technique du bâtiment, des usages et des gisements d'économies d'énergie.",
  },
  {
    title: "Structuration",
    text: "Cadrage du projet, des opérations éligibles et de la chaîne documentaire.",
  },
  {
    title: "Pilotage",
    text: "Coordination des intervenants, suivi technique et conformité à chaque étape.",
  },
  {
    title: "Valorisation",
    text: "Exécution terrain et mise en valeur énergétique et financière de l'opération.",
  },
];

const WHY = [
  {
    title: "Approche de groupe",
    text: "Un écosystème intégré — du diagnostic au gros œuvre — qui rend les opérations plus lisibles et mieux coordonnées.",
  },
  {
    title: "Exigence documentaire",
    text: "La conformité et la traçabilité au cœur de chaque dossier, en particulier sur les opérations CEE.",
  },
  {
    title: "Vision performance",
    text: "Une lecture orientée ROI et performance énergétique, au-delà de la simple exécution de travaux.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Climatisation réversible — mise en avant principale */}
      <ClimatisationFeature />

      {/* Présentation courte */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <Manifesto>
            « Chaque expertise est une pièce. Ensemble, elles forment une
            stratégie énergétique complète. »
          </Manifesto>
          <Reveal delayIndex={1} className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ash-300 md:text-lg">
              Groupe Obsidian accompagne les projets énergétiques avec une
              approche globale : analyse, structuration, conformité, pilotage et
              exécution. Notre rôle est de rendre les opérations plus lisibles,
              plus sécurisées et plus performantes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* L'écosystème + chiffres */}
      <section className="py-12 md:py-16">
        <div className="shell">
          <StatStrip
            items={[
              { value: "01", label: "Groupe structuré" },
              { value: "3", label: "Entités dédiées" },
              { value: "CEE", label: "Expertise gisements" },
              { value: "B2B", label: "Tertiaire & collectif" },
            ]}
          />
        </div>
      </section>

      {/* Nos pôles d'expertise */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Nos pôles d'expertise"
            title="Un écosystème, plusieurs expertises complémentaires."
            intro="Chaque branche du groupe couvre un maillon précis de la chaîne énergétique. Ensemble, elles permettent de traiter un projet de bout en bout."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {POLES.map((p) => (
              <Reveal key={p.title} delayIndex={POLES.indexOf(p) % 3}>
                <ExpertiseCard
                  index={p.index}
                  title={p.title}
                  description={p.description}
                  href={p.href}
                  accent={p.accent}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus tertiaire */}
      <section className="py-24 md:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              index="02"
              eyebrow="Focus tertiaire"
              title="La performance énergétique des actifs professionnels."
              intro="Bureaux, commerces, foncières, syndics, sites collectifs : nous lisons le bâtiment, identifions les gisements et pilotons les opérations dans une logique de valeur."
            />
            <div className="mt-8">
              <Link href="/tertiaire" className="btn-ghost" data-cursor="hover">
                Découvrir le pôle tertiaire
              </Link>
            </div>
          </div>
          <Reveal>
            <GlassCard className="p-8 md:p-10">
              <ListCheck
                items={[
                  "Audit et compréhension technique du bâtiment",
                  "Identification des gisements d'économies d'énergie",
                  "Isolation, chauffage, ventilation, systèmes énergétiques",
                  "Valorisation CEE et accompagnement administratif",
                  "Pilotage technique et conformité documentaire",
                  "Vision ROI et performance énergétique",
                ]}
              />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Optimisation CEE */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Optimisation de gisement CEE"
            title="Du gisement identifié à la valeur mobilisée."
            intro="Notre approche consiste à identifier les gisements mobilisables, structurer les opérations et sécuriser la chaîne documentaire afin de maximiser la valeur potentielle des projets, dans le respect du cadre applicable."
          />
          <div className="mt-14">
            <DataFlowCEE />
          </div>
          <div className="mt-10">
            <Link href="/optimisation-cee" className="btn-ghost" data-cursor="hover">
              Explorer l&apos;optimisation CEE
            </Link>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="Méthode d'accompagnement"
            title="Une mécanique en quatre temps."
            intro="Une méthode constante, du premier diagnostic à la valorisation finale, pensée pour la lisibilité et la sécurité de chaque opération."
          />
          <div className="mt-14">
            <ProcessTimeline steps={PROCESS} />
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <SectionHeader
            index="05"
            eyebrow="Pourquoi Groupe Obsidian"
            title="La rigueur d'un groupe, la précision d'un cabinet."
          />
          <div className="mt-14">
            <FeatureColumns items={WHY} />
          </div>
        </div>
      </section>

      {/* Mise en avant OBSI'BAT & APIRYON */}
      <section className="py-12 md:py-20">
        <div className="shell grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Link href="/obsibat" data-cursor="hover" className="block h-full">
              <GlassCard accent="steel" className="flex h-full flex-col justify-between">
                <div>
                  <span className="label text-steel">OBSI&apos;BAT</span>
                  <h3 className="mt-5 text-2xl font-medium text-ash-100 md:text-3xl">
                    Gros œuvre & démolition
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ash-300">
                    OBSI&apos;BAT intervient sur les phases lourdes et techniques
                    des projets : démolition, gros œuvre, préparation structurelle
                    et adaptation du bâti.
                  </p>
                </div>
                <span className="mt-8 text-xs uppercase tracking-label text-ash-300">
                  Découvrir OBSI&apos;BAT →
                </span>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delayIndex={1}>
            <Link href="/apiryon" data-cursor="hover" className="block h-full">
              <GlassCard accent="gold" className="flex h-full flex-col justify-between">
                <div>
                  <span className="label text-gold">APIRYON</span>
                  <h3 className="mt-5 text-2xl font-medium text-ash-100 md:text-3xl">
                    Aviation d&apos;affaires
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ash-300">
                    APIRYON accompagne les déplacements privés et professionnels
                    avec une approche confidentielle, précise et sur mesure.
                  </p>
                </div>
                <span className="mt-8 text-xs uppercase tracking-label text-ash-300">
                  Découvrir APIRYON →
                </span>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Partenaires / standards */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal className="mb-12 text-center">
            <span className="label">Standards & partenaires</span>
          </Reveal>
          <PartnersStrip partners={PARTNERS} />
        </div>
        <div className="shell mt-16">
          <div className="hairline" />
        </div>
      </section>

      <CTASection
        secondary={{ label: "Découvrir le groupe", href: "/le-groupe" }}
      />
    </>
  );
}
