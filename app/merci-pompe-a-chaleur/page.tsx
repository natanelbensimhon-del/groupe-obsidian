import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Tracking } from "@/components/landing/Tracking";

export const metadata: Metadata = {
  title: "Demande reçue | Groupe Obsidian",
  description:
    "Votre demande d'étude pompe à chaleur a bien été enregistrée. Notre équipe vous recontacte rapidement.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/merci-pompe-a-chaleur` },
};

const NEXT_STEPS = [
  { n: "1", t: "Prise de contact", d: "Notre équipe vous rappelle pour préciser votre projet." },
  { n: "2", t: "Étude personnalisée", d: "Nous évaluons votre logement, vos besoins et vos aides." },
  { n: "3", t: "Devis clair", d: "Vous recevez une proposition détaillée, sans engagement." },
];

export default function MerciPompeAChaleur() {
  return (
    <div id="top" className="min-h-screen">
      <Tracking pageEvent="view_thank_you" />
      <LandingHeader
        phone={SITE.contact.mobile}
        phoneHref={SITE.contact.mobileHref}
        cta="Recevoir mon étude"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]" style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(216,196,154,0.12), rgba(10,11,13,0) 70%)" }} />
        <div className="shell relative flex flex-col items-center py-20 text-center md:py-28">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>

          <h1 className="mt-8 text-balance font-display text-4xl font-semibold leading-tight text-ash-100 md:text-5xl">
            Merci, votre demande est bien reçue
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ash-300 md:text-lg">
            Notre équipe va prendre connaissance de votre projet de pompe à chaleur
            air/eau et vous recontacter rapidement pour organiser votre étude
            personnalisée.
          </p>

          <div className="mt-12 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-obsidian-800/60 p-6 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold">
                  {s.n}
                </span>
                <p className="mt-4 text-sm font-medium text-ash-100">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash-300">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <p className="text-sm text-ash-400">Une question en attendant ?</p>
            <a href={SITE.contact.mobileHref} className="mt-1 block font-display text-2xl font-semibold text-white hover:text-gold">
              {SITE.contact.mobile}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary" data-cursor="hover">
              Retour à l&apos;accueil
            </Link>
            <Link href="/realisations" className="btn-ghost" data-cursor="hover">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
