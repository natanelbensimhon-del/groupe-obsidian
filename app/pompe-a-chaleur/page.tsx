import type { Metadata } from "next";
import { SITE, LEGAL } from "@/lib/site";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { MobileBar } from "@/components/landing/MobileBar";
import { Tracking } from "@/components/landing/Tracking";
import { LeadForm } from "@/components/landing/LeadForm";

const LP_URL = `${SITE.url}/pompe-a-chaleur`;
const AIDES = "8 000 €";
const AIDES_MENTION =
  "Aides indicatives « jusqu'à 8 000 € », cumulables (MaPrimeRénov', Certificats d'Économies d'Énergie), soumises à conditions d'éligibilité (revenus, logement, équipement installé) et au cadre réglementaire en vigueur. Montant non garanti, évalué lors de l'étude personnalisée.";

export const metadata: Metadata = {
  title: "Pompe à chaleur air/eau installée | Groupe Obsidian 78",
  description:
    "Installez une pompe à chaleur air/eau (Daikin, De Dietrich, Viessmann) : chauffage et eau chaude toute l'année. Jusqu'à 8 000 € d'aides selon votre éligibilité. Étude personnalisée en Île-de-France.",
  alternates: { canonical: LP_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: LP_URL,
    siteName: SITE.name,
    title: "Pompe à chaleur air/eau installée | Groupe Obsidian",
    description:
      "PAC air/eau Daikin, De Dietrich, Viessmann — le confort toute l'année. Jusqu'à 8 000 € d'aides selon éligibilité. Installateur en Île-de-France (78).",
  },
  robots: { index: true, follow: true },
};

const PAC_FAQ = [
  {
    q: "Qu'est-ce qu'une pompe à chaleur air/eau ?",
    a: "C'est un système qui capte les calories de l'air extérieur pour chauffer l'eau de votre circuit de chauffage (radiateurs, plancher chauffant) et produire votre eau chaude sanitaire. Elle remplace une chaudière fioul, gaz ou un chauffage électrique.",
  },
  {
    q: "Chauffe-t-elle aussi l'eau chaude sanitaire ?",
    a: "Oui, selon la configuration retenue, la pompe à chaleur air/eau assure le chauffage du logement et la production d'eau chaude sanitaire, toute l'année.",
  },
  {
    q: "Quelles marques installez-vous ?",
    a: "Des marques de référence : Daikin (Altherma 3 H HT), De Dietrich (HMTC) et Viessmann (Vitocal 200-A). Le choix du modèle est défini lors de l'étude selon votre logement.",
  },
  {
    q: "Est-ce bruyant ?",
    a: "Les modèles que nous installons sont conçus pour un fonctionnement discret. L'emplacement de l'unité extérieure est étudié pour préserver votre confort et le voisinage.",
  },
  {
    q: "Quelles aides puis-je obtenir ?",
    a: "La pompe à chaleur air/eau peut ouvrir droit à des aides de l'État (MaPrimeRénov', Certificats d'Économies d'Énergie), jusqu'à 8 000 € selon votre situation. Le montant exact dépend de vos revenus, de votre logement et du cadre en vigueur : nous le vérifions lors de l'étude, sans rien promettre qui ne soit certain.",
  },
  {
    q: "Une étude est-elle nécessaire avant le devis ?",
    a: "Oui. Une étude permet de dimensionner la pompe à chaleur selon les besoins réels de votre maison et de valider la faisabilité avant tout engagement.",
  },
  {
    q: "Assurez-vous le SAV et l'entretien ?",
    a: "Oui, avec la garantie constructeur et un suivi SAV & maintenance pour la durée de vie de votre installation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HVACBusiness",
      "@id": `${LP_URL}#business`,
      name: SITE.name,
      url: LP_URL,
      telephone: "+33605531004",
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
      mainEntity: PAC_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const REASSURANCE = [
  "Exécution irréprochable",
  "Accompagnement de A à Z",
  "Marques de référence",
  "Intervention en Île-de-France",
];

const MODELES = [
  { marque: "Daikin", modele: "Altherma 3 H HT" },
  { marque: "De Dietrich", modele: "HMTC" },
  { marque: "Viessmann", modele: "Vitocal 200-A" },
];

const AVANTAGES = [
  { t: "Silencieuse", d: "Confort thermique en toute discrétion." },
  { t: "Chauffage & eau chaude", d: "Le confort de votre maison, toute l'année." },
  { t: "SAV & maintenance", d: "Garantie constructeur et suivi dans la durée." },
  { t: "Marques de référence", d: "Daikin, De Dietrich, Viessmann." },
];

const PARCOURS = [
  { n: "1", t: "Votre demande", d: "Vous nous laissez vos coordonnées en quelques secondes." },
  { n: "2", t: "Étude personnalisée", d: "Nous évaluons votre logement, vos besoins et vos aides." },
  { n: "3", t: "Devis clair", d: "Une proposition détaillée, sans engagement." },
  { n: "4", t: "Pose & mise en service", d: "Installation soignée, réglages et prise en main." },
];

export default function LandingPompeAChaleur() {
  return (
    <div id="top" className="pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Tracking pageEvent="view_offer" />
      <LandingHeader
        phone={SITE.contact.mobile}
        phoneHref={SITE.contact.mobileHref}
        cta="Recevoir mon étude"
      />

      {/* Réassurance */}
      <div className="border-b border-white/10 bg-obsidian-800">
        <div className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-ash-300">
          {REASSURANCE.map((r) => (
            <span key={r} className="flex items-center gap-2">
              <span className="h-1 w-1 rotate-45 bg-gold" />
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Hero + formulaire */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]" style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(216,196,154,0.12), rgba(10,11,13,0) 70%)" }} />
        <div className="shell relative grid items-start gap-10 py-10 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-label text-gold">
              Pompe à chaleur air/eau
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.03] text-ash-100 md:text-6xl">
              Le confort toute l&apos;année pour votre maison.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ash-200 md:text-lg">
              Remplacez votre chauffage par une pompe à chaleur air/eau : chauffage
              et eau chaude, plus d&apos;économies, une exécution irréprochable et un
              accompagnement de A à Z.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display text-3xl font-semibold text-gold md:text-4xl">
                Jusqu&apos;à {AIDES} d&apos;aides<span className="align-super text-base">*</span>
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {MODELES.map((m) => (
                <span key={m.marque} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ash-200">
                  <span className="font-medium text-ash-100">{m.marque}</span> {m.modele}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#devis" className="btn-primary" data-cursor="hover">
                Recevoir mon étude gratuite
              </a>
              <a href={SITE.contact.mobileHref} className="btn-ghost" data-cursor="hover">
                Appeler le {SITE.contact.mobile}
              </a>
            </div>
            <p className="mt-3 text-xs text-ash-400">
              Réponse rapide — Étude personnalisée — Sans engagement avant acceptation du devis
            </p>
          </div>

          {/* Formulaire */}
          <div className="lg:sticky lg:top-20">
            <div className="glass rounded-3xl p-6 md:p-7">
              <h2 className="font-display text-xl font-semibold text-ash-100">
                Recevez votre proposition
              </h2>
              <p className="mt-1 text-sm text-ash-400">
                Laissez vos coordonnées : nous vous rappelons pour votre étude.
              </p>
              <div className="mt-5">
                <LeadForm
                  redirectTo="/merci-pompe-a-chaleur"
                  offer="pompe_a_chaleur_air_eau"
                  formName="lead_pompe_a_chaleur"
                  value={12000}
                  secondaryField={{
                    name: "chauffage",
                    placeholder: "Chauffage actuel",
                    options: ["Fioul", "Gaz", "Électrique", "Pompe à chaleur", "Autre"],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Pourquoi passer à la pompe à chaleur air/eau
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((a, i) => (
              <div key={a.t} className="rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <p className="mt-4 text-sm font-medium text-ash-100">{a.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash-300">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modèles */}
      <section className="border-t border-white/10 bg-obsidian-800/40 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Des marques de référence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-ash-400">
            Le modèle est choisi lors de l&apos;étude, selon votre logement et vos besoins.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {MODELES.map((m) => (
              <div key={m.marque} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-center">
                <p className="font-display text-xl font-semibold text-ash-100">{m.marque}</p>
                <p className="mt-2 text-sm text-gold">{m.modele}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aides */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold/30 bg-gold/[0.05] p-8 text-center md:p-12">
            <p className="text-xs font-medium uppercase tracking-label text-gold">Aides de l&apos;État</p>
            <p className="mt-4 font-display text-4xl font-semibold text-ash-100 md:text-5xl">
              Jusqu&apos;à {AIDES} d&apos;aides<span className="align-super text-lg text-gold">*</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ash-300">
              MaPrimeRénov&apos; et Certificats d&apos;Économies d&apos;Énergie
              peuvent réduire fortement le coût de votre installation, selon votre
              éligibilité. Nous évaluons vos droits lors de l&apos;étude, en toute
              transparence.
            </p>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Un parcours clair, en quatre étapes
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4">
            {PARCOURS.map((s) => (
              <div key={s.n} className="bg-obsidian-800 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-display text-gold">
                  {s.n}
                </span>
                <p className="mt-5 text-base font-medium text-ash-100">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash-300">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-ash-100 md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {PAC_FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ash-100 md:text-base">
                  {f.q}
                  <span className="shrink-0 text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ash-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 60% at 50% 50%, rgba(216,196,154,0.12), rgba(10,11,13,0) 70%)" }} />
        <div className="shell relative text-center">
          <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold text-ash-100 md:text-5xl">
            Prêt à passer à la pompe à chaleur ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ash-300">
            Recevez votre étude personnalisée et le détail de vos aides.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#devis" className="btn-primary" data-cursor="hover">
              Recevoir mon étude
            </a>
            <a href={SITE.contact.mobileHref} className="btn-ghost" data-cursor="hover">
              Appeler le {SITE.contact.mobile}
            </a>
          </div>
        </div>
      </section>

      {/* Mention légale */}
      <div className="shell pb-10">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-ash-500">
          *{AIDES_MENTION}
        </p>
      </div>

      {/* Footer landing */}
      <footer className="border-t border-white/10 bg-obsidian-800">
        <div className="shell grid gap-8 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-ash-100">
              Groupe Obsidian
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash-300">
              Notre agence au cœur de Villennes
              <br />
              313 avenue Georges-Clemenceau
              <br />
              78670 Villennes-sur-Seine
            </p>
          </div>
          <div className="text-sm text-ash-200">
            <p className="label mb-3">Contact</p>
            <a href={SITE.contact.mobileHref} className="block hover:text-white">
              {SITE.contact.mobile}
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="block hover:text-white">
              {SITE.contact.email}
            </a>
          </div>
          <div className="text-sm">
            <p className="label mb-3">Informations</p>
            <ul className="flex flex-col gap-2 text-ash-300">
              <li><a href="/mentions-legales" className="hover:text-white">Mentions légales</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-white">Politique de confidentialité</a></li>
              <li><a href="/" className="hover:text-white">Retour au site principal</a></li>
            </ul>
          </div>
        </div>
        <div className="shell border-t border-white/5 py-5 text-xs text-ash-500">
          © {new Date().getFullYear()} {SITE.name} — {LEGAL.form} · SIRET {LEGAL.siret}
        </div>
      </footer>

      <MobileBar phoneHref={SITE.contact.mobileHref} />
    </div>
  );
}
