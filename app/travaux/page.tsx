import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, Manifesto } from "@/components/sections/Blocks";

export const metadata = buildMetadata({
  title: "Travaux de rénovation énergétique",
  description:
    "Travaux de rénovation énergétique pilotés : isolation thermique par l'extérieur, pompe à chaleur, chauffage, ventilation et rénovation globale, dans une logique de performance.",
  path: "/travaux",
  keywords: [
    "travaux rénovation énergétique",
    "isolation thermique extérieure",
    "pompe à chaleur",
  ],
});

const WORKS = [
  {
    title: "Isolation thermique par l'extérieur",
    text: "Traitement de l'enveloppe pour réduire les déperditions et améliorer le confort, avec des systèmes de référence.",
  },
  {
    title: "Pompe à chaleur",
    text: "Solutions de chauffage performantes, dimensionnées selon les besoins réels du bâtiment.",
  },
  {
    title: "Chauffage",
    text: "Modernisation des systèmes pour le résidentiel collectif et le tertiaire.",
  },
  {
    title: "Ventilation",
    text: "Renouvellement d'air maîtrisé, au service de la qualité d'air et de la performance.",
  },
  {
    title: "Rénovation globale",
    text: "Approche d'ensemble cohérente plutôt qu'empilement de gestes isolés.",
  },
  {
    title: "Traitement technique du bâti",
    text: "Préparation et adaptation du bâtiment pour fiabiliser les opérations.",
  },
];

export default function TravauxPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Travaux"
        title="L'exécution au service de la performance énergétique."
        intro="Nos travaux ne sont pas un catalogue de prestations : ils s'inscrivent dans une stratégie globale de performance, coordonnée et suivie par le groupe."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Nos domaines d'intervention"
            title="Des solutions techniques, pensées comme un système."
          />
          <div className="mt-14">
            <FeatureColumns items={WORKS} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            Coordination des intervenants, exécution encadrée et suivi rigoureux :
            la qualité d&apos;un chantier se joue dans son pilotage.
          </Manifesto>
        </div>
      </section>

      <CTASection
        title="Un chantier à cadrer ?"
        secondary={{ label: "Voir OBSI'BAT", href: "/obsibat" }}
      />
    </>
  );
}
