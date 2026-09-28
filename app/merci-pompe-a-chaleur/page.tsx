import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Tracking } from "@/components/landing/Tracking";
import { BoutiqueTheme } from "@/components/boutique/BoutiqueTheme";

export const metadata: Metadata = {
  title: "Demande reçue | Groupe Obsidian",
  description:
    "Votre demande de devis pompe à chaleur a bien été enregistrée. Notre équipe vous recontacte rapidement.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/merci-pompe-a-chaleur` },
};

const WRAP = "mx-auto w-full max-w-6xl px-5 md:px-8";

const NEXT_STEPS = [
  { n: "1", t: "Prise de contact", d: "Notre équipe vous rappelle pour préciser votre projet." },
  { n: "2", t: "Étude personnalisée", d: "Nous évaluons votre logement, vos besoins et vos aides." },
  { n: "3", t: "Devis clair", d: "Vous recevez une proposition détaillée, sans engagement." },
];

export default function MerciPompeAChaleur() {
  return (
    <div id="top" className="boutique-light min-h-screen bg-white">
      <Tracking pageEvent="view_thank_you" />
      <BoutiqueTheme />

      <header className="border-b border-[#ececec] bg-white">
        <div className={`${WRAP} flex h-16 items-center justify-between`}>
          <a href="/" aria-label="Groupe Obsidian" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
              <path d="M16 2 28 9v14L16 30 4 23V9L16 2Z" fill="none" stroke="#22282b" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <span className="text-[15px] font-semibold uppercase tracking-[0.22em] text-[#22282b]">Obsidian</span>
          </a>
        </div>
      </header>

      <section className={`${WRAP} flex flex-col items-center py-20 text-center md:py-28`}>
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e7d7ab] bg-[#f7f1e2]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#9a7b2b]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>

        <h1 className="mt-8 text-balance text-4xl font-semibold leading-tight text-[#22282b] md:text-5xl">
          Merci, votre demande est bien reçue
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#4a4f54]">
          Notre équipe va prendre connaissance de votre projet de pompe à chaleur
          air/eau et vous recontacter rapidement pour organiser votre étude.
        </p>

        <div className="mt-12 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
          {NEXT_STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-[#e9e9e9] bg-[#fafafa] p-6 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7d7ab] bg-[#f7f1e2] text-sm font-semibold text-[#9a7b2b]">
                {s.n}
              </span>
              <p className="mt-4 text-base font-semibold text-[#22282b]">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7177]">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[#22282b] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-black">
            Retour à l&apos;accueil
          </Link>
          <Link href="/realisations" className="rounded-full border border-[#dcdcdc] px-7 py-3.5 text-sm font-medium text-[#22282b] transition-colors hover:border-[#22282b]">
            Voir nos réalisations
          </Link>
        </div>
      </section>
    </div>
  );
}
