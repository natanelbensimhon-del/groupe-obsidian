import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureColumns, Manifesto } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "APIRYON — Aviation d'affaires",
  description:
    "APIRYON, la branche aviation d'affaires du Groupe Obsidian : affrètement privé, déplacements professionnels et voyages confidentiels, avec un service sur mesure et discret.",
  path: "/apiryon",
  keywords: ["aviation d'affaires", "APIRYON", "affrètement privé"],
});

const SERVICES = [
  {
    title: "Affrètement privé",
    text: "Organisation de vols privés adaptés à vos itinéraires et à vos exigences.",
  },
  {
    title: "Déplacements professionnels",
    text: "Une logistique fluide pour vos rendez-vous, partout, sans contrainte.",
  },
  {
    title: "Voyages confidentiels",
    text: "Discrétion absolue pour des déplacements qui exigent réserve et précision.",
  },
  {
    title: "Service sur mesure",
    text: "Chaque demande est traitée individuellement, dans le détail et l'anticipation.",
  },
];

export default function ApiryonPage() {
  return (
    <>
      <PageHero
        tone="gold"
        index="07"
        eyebrow="APIRYON — Branche du groupe"
        title="L'aviation d'affaires, dans la plus grande discrétion."
        intro="APIRYON accompagne les déplacements privés et professionnels avec une approche confidentielle, précise et sur mesure. Une branche premium du Groupe Obsidian, dédiée à l'exigence du voyage."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Nos services"
            title="Un accompagnement discret, du premier appel à l'arrivée."
          />
          <div className="mt-14">
            <FeatureColumns items={SERVICES} accent="gold" columns={2} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            La discrétion n&apos;est pas une option : c&apos;est le fondement de
            notre service.
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
              Organisons votre prochain déplacement.
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
