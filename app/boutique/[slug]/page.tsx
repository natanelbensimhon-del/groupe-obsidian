import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Gallery } from "@/components/boutique/Gallery";
import { Configurateur } from "@/components/boutique/Configurateur";
import { ProductCard } from "@/components/boutique/ProductCard";
import { getBoutiqueProduct, getBoutiqueProducts } from "@/lib/shopify";
import { BOUTIQUE } from "@/content/boutique";

export const revalidate = 3600;
export const dynamicParams = true;

const WRAP = "mx-auto w-full max-w-6xl px-5 md:px-8";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const produits = await getBoutiqueProducts();
  return produits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getBoutiqueProduct(`cache-climatiseur-${params.slug}`);
  if (!p)
    return buildMetadata({
      title: "Modèle introuvable",
      description: "",
      path: `/boutique/${params.slug}`,
    });
  return buildMetadata({
    title: `Cache climatiseur ${p.name}`,
    description: `${p.description.split("\n")[0]} À partir de ${p.priceFrom} € TTC, livraison offerte, garantie 10 ans.`,
    path: `/boutique/${p.slug}`,
    keywords: [`cache climatiseur ${p.name}`, "cache clim design", "habillage unité extérieure"],
  });
}

function categorieOf(tags: string[]): "exterieur" | "interieur" | "piece" {
  if (tags.includes("interieur")) return "interieur";
  if (tags.includes("piece")) return "piece";
  return "exterieur";
}

const CAT_LABEL: Record<string, string> = {
  exterieur: "Cache extérieur",
  interieur: "Cache intérieur",
  piece: "Pièces détachées",
};

function GuideIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#9aa0a6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

export default async function ProduitPage({ params }: Params) {
  const p = await getBoutiqueProduct(`cache-climatiseur-${params.slug}`);
  if (!p) notFound();

  const categorie = categorieOf(p.tags);
  const tous = await getBoutiqueProducts();
  const similaires = tous
    .filter((x) => x.handle !== p.handle && categorieOf(x.tags) === categorie)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.description.split("\n")[0],
    image: p.images.map((i) => i.url),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: p.priceFrom,
      highPrice: Math.max(...p.variants.map((v) => v.price), p.priceFrom),
      offerCount: p.variants.length,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/boutique/${p.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-10 md:py-14">
        <div className={WRAP}>
          {/* Fil d'ariane */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-[#9aa0a6]">
            <Link href="/boutique" className="hover:text-[#22282b]" data-cursor="hover">
              Boutique
            </Link>
            <span>/</span>
            <Link
              href={`/boutique?cat=${categorie}`}
              className="hover:text-[#22282b]"
              data-cursor="hover"
            >
              {CAT_LABEL[categorie]}
            </Link>
            <span>/</span>
            <span className="text-[#4a4f54]">{p.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Gallery images={p.images} name={p.name} />

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                {p.productType}
              </span>
              <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] text-[#22282b] md:text-4xl">
                {p.name}
              </h1>
              <p className="mt-4 text-2xl font-bold text-[#22282b] md:text-3xl">
                À partir de {p.priceFrom.toLocaleString("fr-FR")} €{" "}
                <span className="text-base font-normal text-[#9aa0a6]">TTC</span>
              </p>
              <p className="mt-5 text-pretty leading-relaxed text-[#6b7177]">
                {p.description.split("\n")[0]}
              </p>

              <div className="mt-8">
                <Configurateur p={p} categorie={categorie} />
              </div>

              {/* Guides & compatibilité */}
              <div className="mt-6 rounded-lg border border-[#e9e9e9] bg-[#fafafa] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Guides &amp; compatibilité
                </p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/boutique/guide-compatibilite"
                      className="inline-flex items-center gap-2 text-[#22282b] underline-offset-4 hover:underline"
                      data-cursor="hover"
                    >
                      <GuideIcon /> Guide de compatibilité — trouvez votre taille
                    </Link>
                  </li>
                  {categorie === "exterieur" && (
                    <>
                      <li>
                        <a
                          href="/guides/installation-cache-clim-mural.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#22282b] underline-offset-4 hover:underline"
                          data-cursor="hover"
                        >
                          <GuideIcon /> Guide d&apos;installation — pose murale (PDF)
                        </a>
                      </li>
                      <li>
                        <a
                          href="/guides/installation-cache-clim-sol.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#22282b] underline-offset-4 hover:underline"
                          data-cursor="hover"
                        >
                          <GuideIcon /> Guide d&apos;installation — pose au sol (PDF)
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="border-t border-[#ececec] bg-[#fafafa] py-14 md:py-16">
        <div className={WRAP}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Matériau", v: BOUTIQUE.material },
              { t: "Origine", v: BOUTIQUE.origin },
              { t: "Garantie", v: BOUTIQUE.warranty },
              { t: "Livraison", v: `${BOUTIQUE.delivery} — ${BOUTIQUE.deliveryDelay.toLowerCase()}` },
            ].map((x) => (
              <div key={x.t} className="rounded-lg border border-[#e9e9e9] bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  {x.t}
                </div>
                <div className="mt-3 text-sm leading-relaxed text-[#4a4f54]">{x.v}</div>
              </div>
            ))}
          </div>

          {p.descriptionHtml && (
            <div
              className="prose-obsidian mt-12 max-w-3xl text-sm leading-relaxed text-[#4a4f54] [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#22282b] [&_li]:mt-2 [&_ul]:list-none [&_ul]:pl-0"
              dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
            />
          )}
        </div>
      </section>

      {/* Similaires */}
      {similaires.length > 0 && (
        <section className="py-16 md:py-20">
          <div className={WRAP}>
            <h2 className="text-2xl font-semibold text-[#22282b] md:text-3xl">
              D&apos;autres modèles à découvrir
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similaires.map((s) => (
                <ProductCard key={s.handle} p={s} />
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/boutique"
                className="inline-flex rounded border border-[#dcdcdc] px-5 py-2.5 text-sm text-[#22282b] transition-colors hover:border-[#22282b]"
                data-cursor="hover"
              >
                Voir tout le catalogue
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
