import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureColumns, Manifesto } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "APIRYON — Club d'affaires",
  description:
    "APIRYON, le club d'affaires du Groupe Obsidian : aviation d'affaires, technologie, rénovation énergétique, financement de start-ups et immobilier de luxe basse consommation.",
  path: "/apiryon",
  keywords: [
    "club d'affaires",
    "APIRYON",
    "aviation d'affaires",
    "investissement rénovation énergétique",
    "immobilier de luxe BBC",
  ],
});

const HORIZONS = [
  {
    title: "Aviation d'affaires",
    text: "Affrètement privé et déplacements confidentiels, avec un service sur mesure, précis et discret.",
  },
  {
    title: "Technologie",
    text: "Investissement et accompagnement de projets et d'entreprises technologiques à fort potentiel.",
  },
  {
    title: "Rénovation énergétique",
    text: "Au cœur de l'écosystème Obsidian : une vision orientée performance et valeur du bâtiment.",
  },
  {
    title: "Financement de start-up",
    text: "Nous finançons de jeunes entreprises de la rénovation énergétique, pour accélérer les solutions de demain.",
  },
  {
    title: "Immobilier de luxe",
    text: "Acquisition et rénovation de biens d'exception, aux meilleures normes basse consommation (BBC).",
  },
];

export default function ApiryonPage() {
  return (
    <>
      <PageHero
        tone="gold"
        index="07"
        eyebrow="APIRYON — Branche du groupe"
        title="Un club d'affaires aux horizons multiples."
        intro="APIRYON réunit, sous une même exigence, plusieurs univers : aviation d'affaires, technologie, rénovation énergétique, financement de jeunes entreprises et immobilier de luxe. Une branche premium du Groupe Obsidian, à la croisée du service, de l'investissement et de la performance."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Nos horizons"
            title="Plusieurs mondes, une même exigence."
            intro="Un club d'affaires qui investit, accompagne et opère à la rencontre de secteurs complémentaires."
          />
          <div className="mt-14">
            <FeatureColumns items={HORIZONS} accent="gold" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            Réunir des univers d&apos;exception autour d&apos;une même exigence :
            discrétion, précision et performance.
          </Manifesto>
        </div>
      </section>

      {/* CTA dédié — contact direct, ton premium gold */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 50%, rgba(216,196,154,0.12), rgba(10,11,13,0) 70%)",
          }}
        />
        <div className="shell relative text-center">
          <Reveal>
            <span className="label text-gold">Contact direct</span>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold text-ash-100 md:text-5xl">
              Échangeons sur votre projet.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={SITE.contact.phoneHref}
                className="btn-primary"
                data-cursor="hover"
              >
                {SITE.contact.phone}
              </a>
              <Link href="/contact" className="btn-ghost" data-cursor="hover">
                Demande confidentielle
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
