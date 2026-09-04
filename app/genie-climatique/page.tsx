import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, Manifesto } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Ingénierie & génie climatique",
  description:
    "Groupe Obsidian, au-delà de la pose : dimensionnement, études thermiques et suivi des technologies du génie climatique — pompes à chaleur, fluides bas-GWP, régulation intelligente, récupération de chaleur.",
  path: "/genie-climatique",
  keywords: [
    "génie climatique",
    "ingénierie thermique",
    "bureau d'études climatisation",
    "dimensionnement pompe à chaleur",
    "veille technologique génie climatique",
  ],
});

const EXPERTISE = [
  {
    title: "Dimensionnement",
    text: "Calcul des besoins réels du bâtiment pour ne jamais sur- ou sous-dimensionner les équipements.",
  },
  {
    title: "Études thermiques",
    text: "Lecture technique de l'enveloppe, des déperditions et des usages avant toute préconisation.",
  },
  {
    title: "Choix des équipements",
    text: "Sélection objective des matériels selon la performance, la fiabilité et le contexte.",
  },
  {
    title: "Régulation & pilotage",
    text: "Paramétrage fin et supervision pour tirer le meilleur des installations dans la durée.",
  },
  {
    title: "Suivi de performance",
    text: "Vérification des résultats après mise en service : le projet tient ses promesses.",
  },
  {
    title: "Conformité & sécurité",
    text: "Respect des règles de l'art, des fluides frigorigènes et des normes en vigueur.",
  },
];

const VEILLE = [
  {
    title: "Pompes à chaleur au propane (R290)",
    text: "Le passage aux fluides frigorigènes naturels à très faible impact climatique.",
  },
  {
    title: "Régulation prédictive & pilotage intelligent",
    text: "Anticiper les besoins et adapter la production en continu pour économiser sans perdre en confort.",
  },
  {
    title: "Récupération de chaleur",
    text: "Réutiliser les calories perdues (air extrait, eaux grises) pour améliorer les rendements globaux.",
  },
  {
    title: "Solutions hybrides",
    text: "Coupler pompe à chaleur, solaire et systèmes existants pour la meilleure performance annuelle.",
  },
  {
    title: "Confort d'été bas carbone",
    text: "Rafraîchir sans surconsommer : sobriété, inertie du bâti et climatisation réversible bien dimensionnée.",
  },
  {
    title: "Fluides & réglementation",
    text: "Suivi des évolutions réglementaires (F-Gas, bas-GWP) qui redessinent le marché.",
  },
];

export default function GenieClimatiquePage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Ingénierie · Génie climatique"
        title="Au-delà de la pose : une vraie ingénierie."
        intro="Un cache ou un équipement bien posé ne suffit pas. Nous dimensionnons, étudions et pilotons vos installations comme un bureau d'ingénierie — et nous suivons de près les technologies qui font évoluer le génie climatique."
      />

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Notre approche ingénierie"
            title="La performance se décide avant la pose."
          />
          <div className="mt-14">
            <FeatureColumns items={EXPERTISE} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-obsidian-800/40 py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              index="02"
              eyebrow="Veille technologique"
              title="Les sujets que nous suivons de près."
              intro="Notre veille sur le génie climatique — les technologies et évolutions que nous intégrons à nos études. (Rubrique enrichie au fil de l'actualité.)"
            />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VEILLE.map((v, i) => (
              <Reveal key={v.title} delayIndex={i % 3}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="text-[11px] uppercase tracking-label text-glow">
                    Veille
                  </span>
                  <h3 className="mt-3 text-base font-medium text-ash-100">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash-300">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <Manifesto>
            La différence entre « ça marche » et « c&apos;est performant » se joue
            dans l&apos;ingénierie.
          </Manifesto>
        </div>
      </section>

      <CTASection
        title="Un projet qui mérite une vraie étude ?"
        intro="Parlons de votre bâtiment : nous dimensionnons et cadrons votre projet avant tout engagement."
        secondary={{ label: "Voir nos réalisations", href: "/realisations" }}
      />
    </>
  );
}
