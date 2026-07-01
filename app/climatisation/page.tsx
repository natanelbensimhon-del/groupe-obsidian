import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessTimeline } from "@/components/sections/Blocks";
import { Configurateur } from "@/components/climatisation/Configurateur";

export const metadata = buildMetadata({
  title: "Climatisation résidentielle",
  description:
    "Configurez votre climatisation résidentielle : choisissez la marque et le modèle (Daikin, Mitsubishi, Atlantic, Toshiba), visualisez l'unité intérieure sur une photo de votre pièce et demandez un devis.",
  path: "/climatisation",
  keywords: [
    "climatisation résidentielle",
    "climatiseur split",
    "pompe à chaleur air-air",
    "installation climatisation",
    "configurateur climatisation",
  ],
});

const STEPS = [
  { title: "Choisissez", text: "Marque, type d'unité et modèle selon la surface à traiter." },
  { title: "Visualisez", text: "Déposez une photo de votre pièce et placez l'unité intérieure." },
  { title: "Ajustez", text: "Positionnez, redimensionnez et téléchargez votre aperçu." },
  { title: "Demandez un devis", text: "Votre configuration est transmise à notre équipe." },
];

export default function ClimatisationPage() {
  return (
    <>
      <PageHero
        index="09"
        eyebrow="Climatisation résidentielle"
        title="Configurez votre climatisation, visualisez-la chez vous."
        intro="Choisissez votre équipement parmi les grandes marques, projetez l'unité intérieure sur une photo de votre pièce, et transmettez-nous votre configuration pour une étude sur mesure."
      />

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Comment ça marche"
            title="Un configurateur simple, en quatre temps."
          />
          <div className="mt-12">
            <ProcessTimeline steps={STEPS} />
          </div>
        </div>
      </section>

      <section className="pb-8 md:pb-16">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Configurateur"
            title="Composez et visualisez votre installation."
            intro="Le rendu généré est une projection indicative destinée à vous aider à vous projeter. L'implantation définitive est validée lors de l'étude technique."
          />
          <div className="mt-12">
            <Configurateur />
          </div>
        </div>
      </section>

      <CTASection
        title="Un projet de climatisation ?"
        intro="Transmettez-nous votre configuration : nous étudions la faisabilité, le dimensionnement et les conditions d'installation, en toute transparence."
        secondary={{ label: "Voir nos travaux", href: "/travaux" }}
      />
    </>
  );
}
