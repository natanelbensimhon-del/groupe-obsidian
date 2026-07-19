import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Chauffe & rafraîchit",
    text: "Une pompe à chaleur air/air réversible : confort l'hiver comme l'été, sur une seule installation.",
  },
  {
    title: "Performance énergétique",
    text: "Système aérothermique : en moyenne 1 kW consommé restitue près de 3 kW de chaleur.",
  },
  {
    title: "Configurateur en ligne",
    text: "Choisissez votre gamme, visualisez l'unité sur une photo de votre pièce et recevez un devis détaillé.",
  },
  {
    title: "Clé en main",
    text: "Étude, pose, liaisons, mise en service : une installation soignée, dans les règles de l'art.",
  },
];

export function ClimatisationFeature() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="shell relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/realisations/daikin-stylish-1.jpg"
                alt="Climatisation réversible Daikin installée par Groupe Obsidian"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-5 -right-4 hidden rounded-2xl px-5 py-4 sm:block">
              <p className="font-display text-2xl text-ash-100">Air / Air</p>
              <p className="text-[11px] uppercase tracking-label text-ash-300">
                Réversible · Chauffage & clim
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="label text-glow">Notre spécialité</span>
            <span className="h-px w-12 bg-white/15" />
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.08] text-ash-100 md:text-5xl">
            La climatisation réversible, de la pièce unique à la maison entière.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ash-300 md:text-lg">
            Groupe Obsidian conçoit, installe et met en service votre pompe à
            chaleur air/air — mono ou multi-split — avec une exigence de
            finition et de performance.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                <p className="text-sm font-medium text-ash-100">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ash-300">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/climatisation" className="btn-primary" data-cursor="hover">
              Configurer ma climatisation
            </Link>
            <Link href="/realisations" className="btn-ghost" data-cursor="hover">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
