import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { StatStrip } from "@/components/sections/Blocks";
import { Gallery } from "@/components/realisations/Gallery";
import { REALISATIONS } from "@/content/realisations";

export const metadata = buildMetadata({
  title: "Réalisations",
  description:
    "Nos installations de climatisation réversible (pompe à chaleur air/air) : unités intérieures et groupes extérieurs posés dans les règles de l'art — Daikin, Mitsubishi et plus.",
  path: "/realisations",
  keywords: [
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
        intro="Un aperçu de nos chantiers de climatisation réversible : intégration soignée des unités intérieures, groupes extérieurs posés proprement, liaisons maîtrisées."
      />

      <section className="py-10 md:py-16">
        <div className="shell">
          <StatStrip
            items={[
              { value: "Air/Air", label: "Pompe à chaleur réversible" },
              { value: "Multi", label: "Mono & multi-split" },
              { value: "DTU", label: "Règles de l'art" },
              { value: "Clé en main", label: "Fourni & posé" },
            ]}
          />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="shell">
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
