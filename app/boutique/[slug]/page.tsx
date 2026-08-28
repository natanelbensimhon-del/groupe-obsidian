import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Gallery } from "@/components/boutique/Gallery";
import { Configurateur } from "@/components/boutique/Configurateur";
import { ProductCard } from "@/components/boutique/ProductCard";
import { getBoutiqueProduct, getBoutiqueProducts } from "@/lib/shopify";
import { BOUTIQUE } from "@/content/boutique";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const produits = await getBoutiqueProducts();
  return produits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getBoutiqueProduct(`cache-climatiseur-${params.slug}`);
  if (!p) return buildMetadata({ title: "Modèle introuvable", description: "", path: `/boutique/${params.slug}` });
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

export default async function ProduitPage({ params }: Params) {
  const p = await getBoutiqueProduct(`cache-climatiseur-${params.slug}`);
  if (!p) notFound();

  const categorie = categorieOf(p.tags);
  const tous = await getBoutiqueProducts();
  const similaires = tous
    .filter((x) => x.handle !== p.handle && categorieOf(x.tags) === categorie)
    .slice(0, 3);

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

      <section className="pb-10 pt-32 md:pt-40">
        <div className="shell">
          <nav className="mb-10 flex items-center gap-2 text-xs text-ash-400">
            <Link href="/boutique" className="hover:text-ash-200" data-cursor="hover">
              Boutique
            </Link>
            <span>/</span>
            <span className="text-ash-300">{p.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Gallery images={p.images} name={p.name} />

            <div>
              <span className="label">{p.productType}</span>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] text-ash-100 md:text-5xl">
                {p.name}
              </h1>
              <p className="mt-6 text-pretty leading-relaxed text-ash-300">
                {p.description.split("\n")[0]}
              </p>

              <div className="mt-8">
                <Configurateur p={p} categorie={categorie} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Matériau", v: BOUTIQUE.material },
              { t: "Origine", v: BOUTIQUE.origin },
              { t: "Garantie", v: BOUTIQUE.warranty },
              { t: "Livraison", v: `${BOUTIQUE.delivery} — ${BOUTIQUE.deliveryDelay.toLowerCase()}` },
            ].map((x, i) => (
              <Reveal key={x.t} delayIndex={i} className="bg-obsidian-800 p-7">
                <div className="text-xs uppercase tracking-label text-ash-400">{x.t}</div>
                <div className="mt-3 text-sm leading-relaxed text-ash-200">{x.v}</div>
              </Reveal>
            ))}
          </div>

          {p.descriptionHtml && (
            <Reveal className="mt-12 max-w-3xl">
              <div
                className="prose-obsidian text-sm leading-relaxed text-ash-300 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-ash-100 [&_li]:mt-2 [&_ul]:list-none [&_ul]:pl-0"
                dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
              />
            </Reveal>
          )}
        </div>
      </section>

      {similaires.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="shell">
            <SectionHeader eyebrow="Aussi dans la gamme" title="D'autres motifs à découvrir." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similaires.map((s, i) => (
                <ProductCard key={s.handle} p={s} i={i} />
              ))}
            </div>
            <div className="mt-10">
              <Link href="/boutique" className="btn-ghost" data-cursor="hover">
                Voir tout le catalogue
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Un doute sur la taille ?"
        intro="Envoyez-nous les dimensions de votre unité extérieure : nous vous confirmons le gabarit adapté avant que vous ne commandiez."
        primary={{ label: "Nous écrire", href: "/contact" }}
        secondary={{ label: "Retour à la boutique", href: "/boutique" }}
      />
    </>
  );
}
