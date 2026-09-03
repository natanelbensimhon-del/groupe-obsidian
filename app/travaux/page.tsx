import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Manifesto } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Travaux de rénovation énergétique",
  description:
    "Travaux de rénovation énergétique pilotés poste par poste : isolation thermique par l'extérieur, pompe à chaleur, climatisation réversible, ventilation, chauffage et rénovation globale.",
  path: "/travaux",
  keywords: [
    "travaux rénovation énergétique",
    "isolation thermique extérieure",
    "pompe à chaleur",
    "climatisation réversible",
    "ventilation VMC",
  ],
});

type PosteKey =
  | "isolation"
  | "pac"
  | "clim"
  | "ventilation"
  | "chauffage"
  | "globale";

const POSTES: { key: PosteKey; title: string; text: string }[] = [
  {
    key: "isolation",
    title: "Isolation thermique par l'extérieur (ITE)",
    text: "On enveloppe les murs d'un isolant recouvert d'un nouveau revêtement. Résultat : moins de déperditions, un confort constant été comme hiver, et une façade rénovée — sans réduire la surface habitable.",
  },
  {
    key: "pac",
    title: "Pompe à chaleur",
    text: "On remplace un chauffage énergivore par une pompe à chaleur (air/eau ou air/air), dimensionnée selon les besoins réels du bâtiment : chauffage performant, consommation nettement réduite.",
  },
  {
    key: "clim",
    title: "Climatisation réversible",
    text: "Pose de climatisation réversible pour rafraîchir l'été et chauffer l'hiver, pièce par pièce. Confort immédiat et pilotage précis de chaque zone.",
  },
  {
    key: "ventilation",
    title: "Ventilation (VMC)",
    text: "Installation ou rénovation de la ventilation mécanique : un air sain renouvelé en continu, l'humidité évacuée, sans gaspiller la chaleur du logement.",
  },
  {
    key: "chauffage",
    title: "Chauffage",
    text: "Modernisation des systèmes de chauffage, en résidentiel collectif comme en tertiaire, pour plus d'efficacité, de régulation et de confort.",
  },
  {
    key: "globale",
    title: "Rénovation globale",
    text: "Plutôt qu'un empilement de gestes isolés, une approche d'ensemble cohérente — isolation, chauffage, ventilation — coordonnée et suivie par le groupe.",
  },
];

export default function TravauxPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Travaux"
        title="Comprendre chaque poste de travaux."
        intro="Nos travaux ne sont pas un catalogue de prestations : chaque poste répond à un besoin précis du bâtiment. Voici, geste par geste, ce que nous réalisons — dans une stratégie globale coordonnée et suivie par le groupe."
      />

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Nos postes de travaux"
            title="Un visuel, un poste, un objectif clair."
            intro="Chaque intervention est pensée comme une pièce d'un système, pas comme un geste isolé."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {POSTES.map((p, i) => (
              <Reveal key={p.key} delayIndex={i % 3}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-glow/30 bg-glow/[0.06] text-glow">
                    <PosteIcon k={p.key} />
                  </span>
                  <h3 className="mt-6 text-lg font-medium text-ash-100">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash-300">{p.text}</p>
                </div>
              </Reveal>
            ))}
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

function PosteIcon({ k }: { k: PosteKey }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (k) {
    case "isolation":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 4l9 6.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M9 20V9.5M9 12.5h6M9 15.5h6" />
        </svg>
      );
    case "pac":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M3 10h18M3 14h18" />
          <path d="M16.5 8.5c1.5 1 1.5 2 0 3" />
        </svg>
      );
    case "clim":
      return (
        <svg {...common}>
          <path d="M12 3v18M12 3l-2.4 2.4M12 3l2.4 2.4M12 21l-2.4-2.4M12 21l2.4-2.4" />
          <path d="M3.8 7.5 20.2 16.5M3.8 7.5l3.3.2M3.8 7.5l.2 3.3M20.2 16.5l-3.3-.2M20.2 16.5l-.2-3.3" />
          <path d="M20.2 7.5 3.8 16.5M20.2 7.5l-3.3.2M20.2 7.5l-.2 3.3M3.8 16.5l3.3-.2M3.8 16.5l.2-3.3" />
        </svg>
      );
    case "ventilation":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.6" />
          <path d="M12 10.4c-.6-3-1.2-4.6-3-4.6-1.6 0-2.4 2-1 6" />
          <path d="M13.6 12c3 .6 4.6 1.2 4.6 3 0 1.6-2 2.4-6 1" />
          <path d="M10.4 13.6c-2.4 1.9-3.6 3-2.7 4.6.8 1.4 2.9 1 5.3-2.2" />
        </svg>
      );
    case "chauffage":
      return (
        <svg {...common}>
          <rect x="4" y="7" width="16" height="11" rx="1.2" />
          <path d="M8 7v11M12 7v11M16 7v11" />
          <path d="M6 5.5V4M18 5.5V4" />
        </svg>
      );
    case "globale":
      return (
        <svg {...common}>
          <path d="M3 9.5 12 4l9 5.5" />
          <path d="M5 8.6V20h14V8.6" />
          <path d="M9.5 20v-5h5v5" />
        </svg>
      );
  }
}
