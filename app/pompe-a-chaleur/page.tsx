import type { Metadata } from "next";
import { SITE, LEGAL } from "@/lib/site";
import { MobileBar } from "@/components/landing/MobileBar";
import { Tracking } from "@/components/landing/Tracking";
import { LeadForm } from "@/components/landing/LeadForm";
import { BoutiqueTheme } from "@/components/boutique/BoutiqueTheme";

const LP_URL = `${SITE.url}/pompe-a-chaleur`;
const AIDES = "8 000 €";
const AIDES_MENTION =
  "Aides indicatives « jusqu'à 8 000 € », cumulables (MaPrimeRénov', Certificats d'Économies d'Énergie), soumises à conditions d'éligibilité (revenus, logement, équipement installé) et au cadre réglementaire en vigueur. Montant non garanti, évalué lors de l'étude personnalisée.";
const WRAP = "mx-auto w-full max-w-6xl px-5 md:px-8";

export const metadata: Metadata = {
  title: "Pompe à chaleur air/eau installée | Groupe Obsidian 78",
  description:
    "Installez une pompe à chaleur air/eau (Daikin, De Dietrich, Viessmann) : chauffage et eau chaude toute l'année. Jusqu'à 8 000 € d'aides selon votre éligibilité. Demandez votre devis en Île-de-France.",
  alternates: { canonical: LP_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: LP_URL,
    siteName: SITE.name,
    title: "Pompe à chaleur air/eau installée | Groupe Obsidian",
    description:
      "PAC air/eau Daikin, De Dietrich, Viessmann. Jusqu'à 8 000 € d'aides selon éligibilité. Demandez votre devis.",
  },
  robots: { index: true, follow: true },
};

const PAC_FAQ = [
  { q: "Qu'est-ce qu'une pompe à chaleur air/eau ?", a: "Un système qui capte les calories de l'air extérieur pour chauffer l'eau de votre circuit (radiateurs, plancher chauffant) et produire votre eau chaude sanitaire. Elle remplace une chaudière fioul, gaz ou un chauffage électrique." },
  { q: "Chauffe-t-elle aussi l'eau chaude sanitaire ?", a: "Oui, selon la configuration retenue, la pompe à chaleur air/eau assure le chauffage du logement et la production d'eau chaude sanitaire, toute l'année." },
  { q: "Quelles marques installez-vous ?", a: "Des marques de référence : Daikin (Altherma 3 H HT), De Dietrich (HMTC) et Viessmann (Vitocal 200-A). Le modèle est défini lors de l'étude selon votre logement." },
  { q: "Est-ce bruyant ?", a: "Les modèles que nous installons sont conçus pour un fonctionnement discret. L'emplacement de l'unité extérieure est étudié pour préserver votre confort et le voisinage." },
  { q: "Quelles aides puis-je obtenir ?", a: "La pompe à chaleur air/eau peut ouvrir droit à des aides de l'État (MaPrimeRénov', Certificats d'Économies d'Énergie), jusqu'à 8 000 € selon votre situation. Le montant exact dépend de vos revenus, de votre logement et du cadre en vigueur : nous le vérifions lors de l'étude." },
  { q: "Une étude est-elle nécessaire avant le devis ?", a: "Oui. Une étude permet de dimensionner la pompe à chaleur selon les besoins réels de votre maison et de valider la faisabilité avant tout engagement." },
  { q: "Assurez-vous le SAV et l'entretien ?", a: "Oui, avec la garantie constructeur et un suivi SAV & maintenance pour la durée de vie de votre installation." },
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
      address: { "@type": "PostalAddress", streetAddress: "313 avenue Georges-Clemenceau", postalCode: "78670", addressLocality: "Villennes-sur-Seine", addressCountry: "FR" },
    },
    { "@type": "FAQPage", mainEntity: PAC_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const REASSURANCE = ["Exécution irréprochable", "Accompagnement de A à Z", "Marques de référence", "Intervention en Île-de-France"];
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
  { n: "1", t: "Votre demande", d: "Vous remplissez le formulaire en quelques secondes." },
  { n: "2", t: "Étude personnalisée", d: "Nous évaluons votre logement, vos besoins et vos aides." },
  { n: "3", t: "Devis clair", d: "Une proposition détaillée, sans engagement." },
  { n: "4", t: "Pose & mise en service", d: "Installation soignée, réglages et prise en main." },
];

function LogoMark() {
  return (
    <a href="#top" aria-label="Groupe Obsidian" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <path d="M16 2 28 9v14L16 30 4 23V9L16 2Z" fill="none" stroke="#22282b" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M16 2 16 16 4 23M16 16 28 9M16 16 16 30" fill="none" stroke="#c3c6ca" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      <span className="text-[15px] font-semibold uppercase tracking-[0.22em] text-[#22282b]">Obsidian</span>
    </a>
  );
}

export default function LandingPompeAChaleur() {
  return (
    <div id="top" className="boutique-light min-h-screen bg-white pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Tracking pageEvent="view_offer" />
      <BoutiqueTheme />

      {/* En-tête clair */}
      <header className="sticky top-0 z-40 border-b border-[#ececec] bg-white/95 backdrop-blur-sm">
        <div className={`${WRAP} flex h-16 items-center justify-between`}>
          <LogoMark />
          <div className="flex items-center gap-3 sm:gap-4">
            <a href={SITE.contact.mobileHref} className="hidden text-sm font-semibold text-[#22282b] sm:inline">
              {SITE.contact.mobile}
            </a>
            <a href="#devis" className="rounded-full bg-[#22282b] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black">
              Je demande un devis
            </a>
          </div>
        </div>
      </header>

      {/* Bandeau de réassurance — aligné */}
      <div className="border-b border-[#ececec] bg-[#fafafa]">
        <div className={`${WRAP} flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5 py-3 text-center text-xs font-medium text-[#5b6167]`}>
          {REASSURANCE.map((r) => (
            <span key={r} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#9a7b2b]" />
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Hero + formulaire mis en avant */}
      <section className="bg-[#fafafa]">
        <div className={`${WRAP} grid items-start gap-10 py-10 md:py-14 lg:grid-cols-2`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e7d7ab] bg-[#f7f1e2] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#7d6420]">
              Pompe à chaleur air/eau
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] text-[#22282b] md:text-6xl">
              Le confort toute l&apos;année pour votre maison.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#4a4f54]">
              Remplacez votre chauffage par une pompe à chaleur air/eau : chauffage
              et eau chaude, plus d&apos;économies, une exécution irréprochable et un
              accompagnement de A à Z.
            </p>

            <p className="mt-7 text-3xl font-bold text-[#9a7b2b] md:text-4xl">
              Jusqu&apos;à {AIDES} d&apos;aides<span className="align-super text-lg">*</span>
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {MODELES.map((m) => (
                <span key={m.marque} className="rounded-lg border border-[#e6e6e6] bg-white px-3 py-1.5 text-sm text-[#4a4f54]">
                  <span className="font-semibold text-[#22282b]">{m.marque}</span> {m.modele}
                </span>
              ))}
            </div>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <a href={SITE.contact.mobileHref} className="text-lg font-semibold text-[#22282b]">
                Une question ? {SITE.contact.mobile}
              </a>
            </div>
          </div>

          {/* Carte formulaire — mise en avant */}
          <div id="devis" className="scroll-mt-20 rounded-2xl border border-[#e6e6e6] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] md:p-8">
            <h2 className="text-2xl font-semibold text-[#22282b]">Demandez votre devis gratuit</h2>
            <p className="mt-2 text-base text-[#6b7177]">
              Remplissez le formulaire ci-dessous : nous vous rappelons rapidement
              pour votre étude, sans engagement.
            </p>
            <div className="mt-6">
              <LeadForm
                light
                submitLabel="Je demande un devis"
                redirectTo="/merci-pompe-a-chaleur"
                offer="pompe_a_chaleur_air_eau"
                formName="lead_pompe_a_chaleur"
                value={12000}
                secondaryField={{ name: "chauffage", placeholder: "Chauffage actuel", options: ["Fioul", "Gaz", "Électrique", "Pompe à chaleur", "Autre"] }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="border-t border-[#ececec] py-16 md:py-20">
        <div className={WRAP}>
          <h2 className="text-center text-3xl font-semibold text-[#22282b] md:text-4xl">
            Pourquoi passer à la pompe à chaleur air/eau
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((a, i) => (
              <div key={a.t} className="rounded-2xl border border-[#e9e9e9] bg-[#fafafa] p-6">
                <span className="text-sm font-bold text-[#9a7b2b]">0{i + 1}</span>
                <p className="mt-4 text-base font-semibold text-[#22282b]">{a.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7177]">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modèles */}
      <section className="border-t border-[#ececec] bg-[#fafafa] py-16 md:py-20">
        <div className={WRAP}>
          <h2 className="text-center text-3xl font-semibold text-[#22282b] md:text-4xl">Des marques de référence</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#6b7177]">
            Le modèle est choisi lors de l&apos;étude, selon votre logement et vos besoins.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MODELES.map((m) => (
              <div key={m.marque} className="rounded-2xl border border-[#e9e9e9] bg-white p-7 text-center">
                <p className="text-xl font-semibold text-[#22282b]">{m.marque}</p>
                <p className="mt-2 text-base text-[#9a7b2b]">{m.modele}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aides */}
      <section className="py-16 md:py-20">
        <div className={WRAP}>
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#e7d7ab] bg-[#faf4e6] p-8 text-center md:p-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#7d6420]">Aides de l&apos;État</p>
            <p className="mt-4 text-4xl font-bold text-[#9a7b2b] md:text-5xl">
              Jusqu&apos;à {AIDES} d&apos;aides<span className="align-super text-lg">*</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5b6167]">
              MaPrimeRénov&apos; et Certificats d&apos;Économies d&apos;Énergie peuvent
              réduire fortement le coût de votre installation, selon votre éligibilité.
              Nous évaluons vos droits lors de l&apos;étude, en toute transparence.
            </p>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="border-t border-[#ececec] py-16 md:py-20">
        <div className={WRAP}>
          <h2 className="text-center text-3xl font-semibold text-[#22282b] md:text-4xl">Un parcours clair, en quatre étapes</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {PARCOURS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-[#e9e9e9] bg-[#fafafa] p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d7ab] bg-[#f7f1e2] text-base font-semibold text-[#9a7b2b]">
                  {s.n}
                </span>
                <p className="mt-5 text-base font-semibold text-[#22282b]">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7177]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#ececec] bg-[#fafafa] py-16 md:py-20">
        <div className={`${WRAP} max-w-3xl`}>
          <h2 className="text-center text-3xl font-semibold text-[#22282b] md:text-4xl">Questions fréquentes</h2>
          <div className="mt-10 divide-y divide-[#ececec] border-y border-[#ececec]">
            {PAC_FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-[#22282b]">
                  {f.q}
                  <span className="shrink-0 text-xl text-[#9a7b2b] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[#6b7177]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-[#ececec] bg-[#22282b] py-16 text-center md:py-20">
        <div className={WRAP}>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold text-white md:text-5xl">
            Prêt à passer à la pompe à chaleur ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Remplissez le formulaire et recevez votre devis, avec le détail de vos aides.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#devis" className="rounded-full bg-white px-8 py-4 text-base font-medium text-[#22282b] transition-colors hover:bg-[#f0f0f0]" data-cursor="hover">
              Je demande un devis
            </a>
            <a href={SITE.contact.mobileHref} className="rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10" data-cursor="hover">
              Appeler le {SITE.contact.mobile}
            </a>
          </div>
        </div>
      </section>

      {/* Mention légale */}
      <div className={`${WRAP} py-8`}>
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-[#9aa0a6]">
          *{AIDES_MENTION}
        </p>
      </div>

      {/* Footer clair */}
      <footer className="border-t border-[#ececec] bg-[#fafafa]">
        <div className={`${WRAP} grid gap-8 py-12 md:grid-cols-3`}>
          <div>
            <LogoMark />
            <p className="mt-4 text-sm leading-relaxed text-[#6b7177]">
              Notre agence au cœur de Villennes
              <br />
              313 avenue Georges-Clemenceau, 78670 Villennes-sur-Seine
            </p>
          </div>
          <div className="text-sm text-[#4a4f54]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9aa0a6]">Contact</p>
            <a href={SITE.contact.mobileHref} className="block hover:text-[#22282b]">{SITE.contact.mobile}</a>
            <a href={`mailto:${SITE.contact.email}`} className="block hover:text-[#22282b]">{SITE.contact.email}</a>
          </div>
          <div className="text-sm text-[#4a4f54]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9aa0a6]">Informations</p>
            <ul className="flex flex-col gap-2">
              <li><a href="/mentions-legales" className="hover:text-[#22282b]">Mentions légales</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-[#22282b]">Politique de confidentialité</a></li>
              <li><a href="/" className="hover:text-[#22282b]">Retour au site principal</a></li>
            </ul>
          </div>
        </div>
        <div className={`${WRAP} border-t border-[#ececec] py-5 text-xs text-[#9aa0a6]`}>
          © {new Date().getFullYear()} {SITE.name} — {LEGAL.form} · SIRET {LEGAL.siret}
        </div>
      </footer>

      <MobileBar phoneHref={SITE.contact.mobileHref} />
    </div>
  );
}
