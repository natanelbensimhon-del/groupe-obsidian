import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureColumns, StatStrip } from "@/components/sections/Blocks";
import { Reveal } from "@/components/ui/Reveal";
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

export default async function BoutiquePage() {
  const produits = await getBoutiqueProducts();

  const prixMini = produits.length
    ? Math.min(...produits.filter((p) => p.tags.includes("exterieur")).map((p) => p.priceFrom))
    : 349;

  return (
    <>
      <PageHero
        index="02"
        eyebrow={BOUTIQUE.eyebrow}
        title={BOUTIQUE.title}
        intro={BOUTIQUE.intro}
      />

      <section className="pb-4 pt-2 md:pb-8">
        <div className="shell">
          <StatStrip
            items={[
              { value: `${produits.length || 46}`, label: "Modèles au catalogue" },
              { value: "10 ans", label: "De garantie" },
              { value: `dès ${prixMini} €`, label: "Cache extérieur" },
              { value: "0 €", label: "Frais de livraison" },
            ]}
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Le catalogue"
            title="Choisissez le motif, la taille et la teinte."
            intro="Chaque cache est fabriqué à la commande, dans la finition que vous choisissez. Les prix affichés sont TTC, livraison comprise en France métropolitaine."
          />

          <div className="mt-12">
            {produits.length > 0 ? (
              <Filtres produits={produits} />
            ) : (
              <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <p className="text-sm leading-relaxed text-ash-300">
                  {shopifyConfigured
                    ? "Le catalogue est momentanément indisponible. Réessayez dans quelques instants ou contactez-nous : nous prenons votre commande directement."
                    : "La boutique est en cours de mise en ligne. Contactez-nous pour commander dès maintenant."}
                </p>
                <Link href="/contact" className="btn-ghost mt-6" data-cursor="hover">
                  Nous contacter
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Ce qui compte"
            title="Un habillage qui ne bride pas l'appareil."
            intro="Un cache mal conçu étouffe le groupe et fait grimper la consommation. Ceux-ci sont dessinés pour l'inverse."
          />
          <div className="mt-12">
            <FeatureColumns items={ARGUMENTS} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeader index="03" eyebrow="Questions fréquentes" title="Avant de commander." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delayIndex={i % 2} className="bg-obsidian-800 p-7">
                <h3 className="text-base font-medium text-ash-100">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash-300">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Une question sur votre installation ?"
        intro="Nous posons et entretenons des climatisations au quotidien : si vous hésitez sur la taille, la pose ou la compatibilité avec votre appareil, écrivez-nous avant de commander."
        primary={{ label: "Nous écrire", href: "/contact" }}
        secondary={{ label: "Voir nos climatisations", href: "/climatisation" }}
      />
    </>
  );
}
