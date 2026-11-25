import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { StatStrip } from "@/components/sections/Blocks";
import { Gallery } from "@/components/realisations/Gallery";
import { REALISATIONS, PAC_REALISATIONS } from "@/content/realisations";
import { PacRealisations } from "@/components/landing/PacRealisations";

export const metadata = buildMetadata({
  title: "Réalisations",
  description:
    "Nos chantiers de pompes à chaleur air/eau (York, De Dietrich, Atlantic, Ariston) et de climatisation réversible (Daikin, Mitsubishi…), en photos et vidéos.",
  path: "/realisations",
  keywords: [
    "réalisations pompe à chaleur air eau",
    "réalisations climatisation",
    "installation pompe à chaleur air-air",
    "chantier climatisation",
  ],
});

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        index="10"
        eyebrow="Réalisations"
        title="Nos installations, dans les règles de l'art."
        intro="Un aperçu de nos chantiers de pompe à chaleur air/eau et de climatisation réversible : groupes extérieurs posés proprement, modules hydrauliques, liaisons maîtrisées."
      />

      <section className="py-10 md:py-16">
        <div className="shell">
          <StatStrip
            items={[
              { value: "Air/Eau", label: "Pompe à chaleur" },
              { value: "Air/Air", label: "Climatisation réversible" },
              { value: "DTU", label: "Règles de l'art" },
              { value: "Clé en main", label: "Fourni & posé" },
            ]}
          />
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="shell">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ash-100 md:text-3xl">
            Pompe à chaleur air/eau
          </h2>
          <PacRealisations items={PAC_REALISATIONS} theme="dark" />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="shell">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ash-100 md:text-3xl">
            Climatisation réversible
          </h2>
          <Gallery items={REALISATIONS} />
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ash-400">
            Photos de chantiers réalisés par nos équipes. L&apos;implantation et
            les finitions sont adaptées à chaque logement et validées lors de la
            visite technique.
          </p>
        </div>
      </section>

      <CTASection
        title="Envie du même résultat chez vous ?"
        intro="Configurez votre climatisation en ligne, visualisez-la sur une photo de votre pièce et recevez votre devis détaillé."
        primary={{ label: "Configurer ma climatisation", href: "/climatisation" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />
    </>
  );
}
