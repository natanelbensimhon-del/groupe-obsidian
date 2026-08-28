import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Filtres } from "@/components/boutique/Filtres";
import { getBoutiqueProducts, shopifyConfigured } from "@/lib/shopify";
import { BOUTIQUE, ARGUMENTS, FAQ } from "@/content/boutique";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Boutique — caches climatiseur design",
  description:
    "Caches pour unité de climatisation extérieure et intérieure : aluminium thermolaqué, fabrication française, garantie 10 ans. Une quarantaine de motifs, cinq tailles, huit teintes RAL. Livraison offerte.",
  path: "/boutique",
  keywords: [
    "cache climatiseur",
    "cache climatiseur extérieur",
    "cache clim design",
    "cache unité extérieure",
    "cache pompe à chaleur",
    "habillage climatiseur",
    "cache split intérieur",
  ],
});

const WRAP = "mx-auto w-full max-w-6xl px-5 md:px-8";

const BADGES = [
  BOUTIQUE.warranty,
  "Aluminium thermolaqué",
  BOUTIQUE.origin,
  "Livraison offerte",
  "Installation rapide",
];

type Id = "tous" | "exterieur" | "interieur" | "piece";
function toCat(v?: string): Id {
  return v === "interieur" || v === "piece" || v === "tous" ? v : "exterieur";
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const produits = await getBoutiqueProducts();
  const initial = toCat(searchParams.cat);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#ececec] bg-[#fafafa]">
        <div className={`${WRAP} py-8 text-center md:py-10`}>
          <h1 className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-[1.1] text-[#22282b] md:text-5xl">
            {BOUTIQUE.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#6b7177] md:text-base">
            {BOUTIQUE.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#4a4f54]">
            {BADGES.map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#22282b]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 10 3.5 3.5L15 6" />
                </svg>
                {b}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/boutique/guide-compatibilite"
              className="text-sm text-[#22282b] underline underline-offset-4 hover:opacity-70"
              data-cursor="hover"
            >
              Guide de compatibilité — quelle taille pour mon climatiseur&nbsp;?
            </Link>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-20 pb-16 pt-8 md:pb-20 md:pt-10">
        <div className={WRAP}>
          <div>
            {produits.length > 0 ? (
              <Filtres produits={produits} initial={initial} />
            ) : (
              <div className="rounded-lg border border-[#e9e9e9] bg-[#fafafa] p-8">
                <p className="text-sm leading-relaxed text-[#6b7177]">
                  {shopifyConfigured
                    ? "Le catalogue est momentanément indisponible. Réessayez dans quelques instants ou contactez-nous."
                    : "La boutique est en cours de mise en ligne. Contactez-nous pour commander dès maintenant."}
                </p>
                <Link
                  href="/le-groupe"
                  className="mt-6 inline-flex rounded border border-[#dcdcdc] px-5 py-2.5 text-sm text-[#22282b] transition-colors hover:border-[#22282b]"
                >
                  Nous contacter
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Arguments */}
      <section className="border-t border-[#ececec] bg-[#fafafa] py-16 md:py-20">
        <div className={WRAP}>
          <h2 className="text-2xl font-semibold text-[#22282b] md:text-3xl">
            Un habillage qui ne bride pas l&apos;appareil
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARGUMENTS.map((a) => (
              <div key={a.title} className="rounded-lg border border-[#e9e9e9] bg-white p-6">
                <h3 className="text-base font-semibold text-[#22282b]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b7177]">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className={`${WRAP} max-w-3xl`}>
          <h2 className="text-2xl font-semibold text-[#22282b] md:text-3xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 divide-y divide-[#ececec] border-y border-[#ececec]">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#22282b] md:text-base">
                  {f.q}
                  <span className="text-xl text-[#9aa0a6] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#6b7177]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-[#ececec] bg-[#22282b] py-16 text-center md:py-20">
        <div className={WRAP}>
          <h2 className="mx-auto max-w-2xl text-balance text-2xl font-semibold text-white md:text-4xl">
            Un doute sur la taille de votre unité ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Envoyez-nous les dimensions de votre climatiseur : nous vous confirmons
            le gabarit adapté avant que vous ne commandiez.
          </p>
          <div className="mt-8">
            <Link
              href="/le-groupe"
              className="inline-flex items-center justify-center rounded bg-white px-8 py-4 text-sm font-medium text-[#22282b] transition-colors hover:bg-[#f0f0f0]"
              data-cursor="hover"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
