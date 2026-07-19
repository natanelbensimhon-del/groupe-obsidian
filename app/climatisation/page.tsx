import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessTimeline, FeatureColumns } from "@/components/sections/Blocks";
import { Configurateur } from "@/components/climatisation/Configurateur";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { REALISATIONS } from "@/content/realisations";

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

const INFOS = [
  {
    title: "Confort toute l'année",
    text: "Une pompe à chaleur air/air réversible chauffe l'hiver et rafraîchit l'été. Système aérothermique performant : en moyenne, 1 kW consommé restitue près de 3 kW de chaleur.",
  },
  {
    title: "Emplacement de l'unité extérieure",
    text: "Nous étudions l'implantation du groupe extérieur en respectant les dégagements nécessaires et le voisinage (éloignement des pièces de nuit), sur supports antivibratiles.",
  },
  {
    title: "Discrétion sonore",
    text: "La position du groupe extérieur influence le niveau sonore : nous la choisissons pour limiter les nuisances, avec écran anti-bruit si besoin.",
  },
  {
    title: "Évacuation des condensats",
    text: "La climatisation produit un peu d'eau : nous maîtrisons son évacuation (écoulement, raccordement ou pompe de relevage selon votre configuration).",
  },
  {
    title: "Mise en service encadrée",
    text: "L'installation est réalisée selon les règles de l'art (norme NF DTU 65.16) et la mise en service par un intervenant habilité à la manipulation des fluides frigorigènes.",
  },
  {
    title: "Entretien",
    text: "Un entretien tous les 2 ans est recommandé : nettoyage de l'unité extérieure, contrôle de l'écoulement des condensats et vérification générale.",
  },
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

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Bon à savoir"
            title="Une installation dans les règles de l'art."
            intro="Quelques repères pour aborder votre projet sereinement, du choix de l'emplacement à l'entretien."
          />
          <div className="mt-12">
            <FeatureColumns items={INFOS} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="Réalisations"
            title="Des installations soignées, chez nos clients."
            intro="Un aperçu de nos chantiers récents de climatisation réversible."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {REALISATIONS.slice(0, 4).map((r, i) => (
              <Reveal key={r.src} delayIndex={i % 4}>
                <Link
                  href="/realisations"
                  data-cursor="hover"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-obsidian-800"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.src}
                    alt={r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-medium text-white">
                    {r.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/realisations" className="btn-ghost" data-cursor="hover">
              Voir toutes nos réalisations
            </Link>
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
