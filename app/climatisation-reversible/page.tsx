import type { Metadata } from "next";
import Image from "next/image";
import { SITE, LEGAL } from "@/lib/site";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { MobileBar } from "@/components/landing/MobileBar";
import { Tracking } from "@/components/landing/Tracking";
import { LeadForm } from "@/components/landing/LeadForm";
import { FAQ } from "@/components/landing/FAQ";
import { FAQ_ITEMS } from "@/content/faq-climatisation";
import { Gallery } from "@/components/realisations/Gallery";
import { REALISATIONS } from "@/content/realisations";

const LP_URL = `${SITE.url}/climatisation-reversible`;
const PRICE = "7 500 € TTC";
const OFFER_MENTION =
  "Offre soumise à une prévisite et à la validation de la faisabilité technique. Prix valable pour une installation standard, selon le dimensionnement nécessaire, les longueurs de liaison, l'accessibilité du chantier et la configuration du logement. Les éventuels travaux complémentaires feront l'objet d'un devis.";

export const metadata: Metadata = {
  title: "Climatisation réversible De Dietrich installée | Groupe Obsidian 78",
  description:
    "Installez une climatisation réversible De Dietrich avec 3 unités intérieures et 1 groupe multisplit. Offre à 7 500 € TTC fourni et posé, sous réserve d'étude technique.",
  alternates: { canonical: LP_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: LP_URL,
    siteName: SITE.name,
    title: "Climatisation réversible De Dietrich installée | Groupe Obsidian 78",
    description:
      "3 unités intérieures + 1 groupe multisplit De Dietrich, fournis et posés à 7 500 € TTC, sous réserve d'étude technique. Installateur en Île-de-France (78).",
    images: [{ url: "/realisations/daikin-stylish-1.jpg", width: 1200, height: 630, alt: "Climatisation réversible installée par Groupe Obsidian" }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HVACBusiness",
      "@id": `${LP_URL}#business`,
      name: SITE.name,
      url: LP_URL,
      telephone: "+33180975721",
      email: SITE.contact.email,
      areaServed: "Île-de-France",
      address: {
        "@type": "PostalAddress",
        streetAddress: "313 avenue Georges-Clemenceau",
        postalCode: "78670",
        addressLocality: "Villennes-sur-Seine",
        addressCountry: "FR",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const REASSURANCE = [
  "Étude personnalisée",
  "Installation professionnelle",
  "Devis détaillé",
  "Intervention en Île-de-France",
];

const INCLUS = [
  { t: "3 unités intérieures murales De Dietrich", d: "Une par pièce à climatiser, réglables indépendamment." },
  { t: "1 groupe extérieur multisplit", d: "Un seul groupe pour alimenter les trois unités." },
  { t: "Fourniture et pose comprises", d: "Matériel, liaisons, fixations et accessoires inclus." },
  { t: "Mise en service & explications", d: "Réglages, essais et prise en main de votre installation." },
];

const BENEFITS = [
  "Rafraîchissement de plusieurs pièces en été",
  "Chauffage d'appoint ou principal selon le dimensionnement",
  "Réglage indépendant de chaque zone",
  "Confort rapide et homogène",
  "Installation pensée pour préserver l'esthétique du logement",
  "Accompagnement de l'étude jusqu'à la mise en service",
];

const DIFF = [
  "Le bon dimensionnement des équipements",
  "L'emplacement des unités intérieures",
  "Le passage soigné des liaisons",
  "L'évacuation des condensats",
  "L'intégration esthétique dans le logement",
  "L'accessibilité du groupe extérieur",
  "Une mise en service rigoureuse",
];

const STEPS = [
  { n: "1", t: "Votre demande", d: "Vous nous transmettez votre projet en quelques informations." },
  { n: "2", t: "La prévisite technique", d: "Nous évaluons la faisabilité et le dimensionnement sur place." },
  { n: "3", t: "Votre devis détaillé", d: "Vous recevez une proposition claire, adaptée à votre logement." },
  { n: "4", t: "Installation & mise en service", d: "Nous posons, raccordons, mettons en service et vous expliquons." },
];

const WHY = [
  "Entreprise locale basée à Villennes-sur-Seine (78)",
  "Étude personnalisée de votre logement",
  "Solutions adaptées à votre configuration",
  "Devis détaillé et transparent",
  "Accompagnement de proximité",
  "Suivi du projet de A à Z",
  "Sélection d'équipements performants",
];

export default function LandingClimatisation() {
  return (
    <div id="top" className="pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Tracking />
      <LandingHeader />

      {/* 1 — Barre de réassurance */}
      <div className="border-b border-white/10 bg-obsidian-800">
        <div className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-ash-300">
          {REASSURANCE.map((r) => (
            <span key={r} className="flex items-center gap-2">
              <span className="h-1 w-1 rotate-45 bg-glow" />
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* 3 + 4 — Hero + formulaire */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-radial-glow" />
        <div className="shell relative grid items-start gap-10 py-10 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-label text-gold">
              Offre exceptionnelle De Dietrich
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.03] text-ash-100 md:text-6xl">
              Équipez votre maison d&apos;une climatisation réversible multisplit
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ash-200 md:text-lg">
              Profitez d&apos;un confort optimal toute l&apos;année avec trois
              unités intérieures et un groupe extérieur De Dietrich, fournis et
              installés par Groupe Obsidian.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display text-4xl font-semibold text-white md:text-5xl">
                {PRICE}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-label text-ash-100">
                Fourni &amp; posé*
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {["3 unités intérieures", "1 groupe extérieur", "Chauffage + climatisation", "Étude technique préalable"].map((c) => (
                <span key={c} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ash-200">
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#devis" className="btn-primary" data-cursor="hover">
                Demander ma prévisite technique
              </a>
              <a href={SITE.contact.phoneHref} className="btn-ghost" data-cursor="hover">
                Appeler le {SITE.contact.phone}
              </a>
            </div>
            <p className="mt-3 text-xs text-ash-400">
              Réponse rapide — Étude personnalisée — Sans engagement avant acceptation du devis
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/realisations/daikin-stylish-1.jpg"
                alt="Climatisation réversible murale installée par Groupe Obsidian"
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:sticky lg:top-20">
            <div className="glass rounded-3xl p-6 md:p-7">
              <h2 className="font-display text-xl font-semibold text-ash-100">
                Étudions votre installation
              </h2>
              <p className="mt-1 text-sm text-ash-400">
                Demande de prévisite — réponse rapide de notre équipe.
              </p>
              <div className="mt-5">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Offre : tout est compris */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Tout est compris dans votre installation
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUS.map((it, i) => (
              <div key={it.t} className="rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <p className="mt-4 text-sm font-medium text-ash-100">{it.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash-300">{it.d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ash-400">
            La puissance et le positionnement des équipements sont définis après
            l&apos;étude technique de votre logement.
          </p>
        </div>
      </section>

      {/* 6 — Bénéfices */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Un seul équipement pour votre confort toute l&apos;année
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-glow" />
                <span className="text-sm leading-relaxed text-ash-200">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Différenciation */}
      <section className="border-y border-white/10 bg-obsidian-800/40 py-16 md:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance font-display text-3xl font-semibold text-ash-100 md:text-4xl">
              Une installation pensée pour votre maison
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ash-300">
              La qualité d&apos;une climatisation ne se limite pas au matériel :
              elle se joue dans le soin apporté à chaque détail technique et
              esthétique.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {DIFF.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-ash-200">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Parcours client */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Un parcours clair, en quatre étapes
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-obsidian-800 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/40 font-display text-glow">
                  {s.n}
                </span>
                <p className="mt-5 text-base font-medium text-ash-100">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash-300">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Pourquoi Groupe Obsidian */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Pourquoi Groupe Obsidian ?
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-ash-200">
                {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Réalisations (photos réelles) */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Nos installations récentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-ash-400">
            Photos de chantiers réalisés par nos équipes. L&apos;implantation et les
            finitions sont adaptées à chaque logement.
          </p>
          <div className="mt-12">
            <Gallery items={REALISATIONS.slice(0, 6)} />
          </div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      {/* 12 — Dernier CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
        <div className="shell relative text-center">
          <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold text-ash-100 md:text-5xl">
            Votre maison est-elle adaptée à une installation multisplit ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ash-300">
            Demandez votre prévisite technique pour obtenir une proposition
            adaptée à la configuration de votre logement.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#devis" className="btn-primary" data-cursor="hover">
              Demander ma prévisite
            </a>
            <a href={SITE.contact.phoneHref} className="btn-ghost" data-cursor="hover">
              Appeler le {SITE.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Mention légale de l'offre */}
      <div className="shell pb-10">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-ash-500">
          *{OFFER_MENTION}
        </p>
      </div>

      {/* 13 — Footer landing */}
      <footer className="border-t border-white/10 bg-obsidian-800">
        <div className="shell grid gap-8 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-ash-100">
              Groupe Obsidian
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash-300">
              313 avenue Georges-Clemenceau
              <br />
              78670 Villennes-sur-Seine
            </p>
          </div>
          <div className="text-sm text-ash-200">
            <p className="label mb-3">Contact</p>
            <a href={SITE.contact.phoneHref} className="block hover:text-white">
              {SITE.contact.phone}
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="block hover:text-white">
              {SITE.contact.email}
            </a>
          </div>
          <div className="text-sm">
            <p className="label mb-3">Informations</p>
            <ul className="flex flex-col gap-2 text-ash-300">
              <li><a href="/mentions-legales" className="hover:text-white">Mentions légales</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-white">Politique de confidentialité &amp; cookies</a></li>
              <li><a href="/" className="hover:text-white">Retour au site principal</a></li>
            </ul>
          </div>
        </div>
        <div className="shell border-t border-white/5 py-5 text-xs text-ash-500">
          © {new Date().getFullYear()} {SITE.name} — {LEGAL.form} · SIRET {LEGAL.siret}
        </div>
      </footer>

      <MobileBar />
    </div>
  );
}
