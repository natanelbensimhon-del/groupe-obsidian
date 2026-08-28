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
import { GlassCard } from "@/components/ui/GlassCard";
import { GROUP_SECTIONS } from "@/lib/site";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Le Groupe",
  description:
    "Groupe Obsidian : un groupe énergétique structuré qui analyse, structure, pilote et exécute les projets de rénovation énergétique à fort enjeu. Tertiaire, travaux, climatisation, CEE, OBSI'BAT et APIRYON.",
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


      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Nos pôles"
            title="Tout ce que nous faisons, en un coup d'œil."
            intro="Chaque pôle a sa page dédiée : entrez par celui qui correspond à votre projet."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {GROUP_SECTIONS.map((s, i) => (
              <Reveal key={s.href} delayIndex={i % 4}>
                <Link href={s.href} data-cursor="hover" className="block h-full">
                  <GlassCard accent={s.accent} className="h-full">
                    <div className="flex h-full flex-col">
                      <span className="font-display text-sm text-ash-400">{s.index}</span>
                      <h3 className="mt-5 text-lg font-medium text-ash-100">{s.label}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ash-300">{s.short}</p>
                      <span className="mt-auto pt-6 text-xs uppercase tracking-label text-ash-400 transition-colors group-hover:text-ash-200">
                        Découvrir →
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="shell">
          <Reveal>
            <Link href="/boutique" data-cursor="hover" className="block">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/25 md:p-12">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="label">Boutique</span>
                <h3 className="mt-5 max-w-2xl text-balance text-2xl font-semibold leading-snug text-ash-100 md:text-4xl">
                  Des caches design pour vos unités de climatisation.
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash-300 md:text-base">
                  Aluminium thermolaqué, fabrication française, garantie 10 ans.
                  Une quarantaine de motifs, cinq tailles, huit teintes RAL.
                  Livraison offerte.
                </p>
                <span className="mt-8 inline-block text-xs uppercase tracking-label text-ash-400 transition-colors group-hover:text-ash-100">
                  Voir le catalogue →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Parlons de votre opération."
        secondary={{ label: "Voir la boutique", href: "/boutique" }}
      />
    </>
  );
}
