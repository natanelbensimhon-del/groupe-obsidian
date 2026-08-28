import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CompatGuide } from "@/components/boutique/CompatGuide";
import { DIMENSIONS } from "@/content/boutique";

export const metadata = buildMetadata({
  title: "Guide de compatibilité — cache climatiseur",
  description:
    "Trouvez la taille de cache adaptée à votre climatiseur ou pompe à chaleur : compatibilité par marque et modèle (Daikin, Mitsubishi, Atlantic, LG, Panasonic…) et guide des tailles.",
  path: "/boutique/guide-compatibilite",
  keywords: [
    "compatibilité cache climatiseur",
    "quelle taille cache climatiseur",
    "cache climatiseur Daikin",
    "cache climatiseur Mitsubishi",
    "guide des tailles cache clim",
  ],
});

const WRAP = "mx-auto w-full max-w-5xl px-5 md:px-8";
const TAILLES = ["S", "M", "L", "XL", "XXL"] as const;

export default function GuideCompatibilitePage() {
  const ext = DIMENSIONS["exterieur-murale"];

  return (
    <>
      {/* En-tête */}
      <section className="border-b border-[#ececec] bg-[#fafafa]">
        <div className={`${WRAP} py-12 md:py-16`}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#9aa0a6]">
            <Link href="/boutique" className="hover:text-[#22282b]" data-cursor="hover">
              Boutique
            </Link>
            <span>/</span>
            <span className="text-[#4a4f54]">Guide de compatibilité</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-semibold leading-[1.1] text-[#22282b] md:text-5xl">
            Guide de compatibilité
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6b7177] md:text-base">
            Nos caches s&apos;adaptent à l&apos;encombrement de l&apos;appareil, pas à sa
            marque. Repérez votre climatiseur ou votre pompe à chaleur ci-dessous pour
            connaître la taille de cache conseillée. En cas de doute, mesurez votre
            unité et choisissez la taille juste au-dessus.
          </p>
        </div>
      </section>

      {/* Guide des tailles */}
      <section className="py-12 md:py-16">
        <div className={WRAP}>
          <h2 className="text-2xl font-semibold text-[#22282b]">Guide des tailles</h2>
          <p className="mt-2 text-sm text-[#6b7177]">
            Dimensions extérieures de nos caches (pose murale). Choisissez la taille
            dont les dimensions englobent celles de votre unité.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-lg border border-[#e9e9e9] text-sm">
              <thead>
                <tr className="bg-[#22282b] text-left text-white">
                  <th className="px-5 py-3 font-semibold">Taille</th>
                  <th className="px-5 py-3 font-semibold">Dimensions du cache (H × L × P)</th>
                </tr>
              </thead>
              <tbody>
                {TAILLES.map((t) =>
                  ext?.[t] ? (
                    <tr key={t} className="border-b border-[#f0f0f0] last:border-0">
                      <td className="px-5 py-3">
                        <span className="inline-flex min-w-[44px] items-center justify-center rounded-full bg-[#eef2f4] px-3 py-1 text-xs font-bold text-[#22282b]">
                          {t}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#4a4f54]">{ext[t]}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#9aa0a6]">
            Les caches intérieurs sont déclinés en tailles S, M et L selon le modèle.
            Dimensions indiquées sur chaque fiche produit.
          </p>
        </div>
      </section>

      {/* Compatibilité par marque */}
      <section className="border-t border-[#ececec] bg-[#fafafa] py-12 md:py-16">
        <div className={WRAP}>
          <h2 className="text-2xl font-semibold text-[#22282b]">Compatibilité par marque</h2>
          <p className="mt-2 text-sm text-[#6b7177]">
            Liste indicative des modèles les plus courants. Si votre modèle n&apos;y
            figure pas, fiez-vous aux dimensions.
          </p>
          <div className="mt-8">
            <CompatGuide />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className={`${WRAP} text-center`}>
          <p className="text-sm text-[#6b7177]">
            Un doute sur votre modèle ? Envoyez-nous les dimensions de votre unité,
            nous validons le gabarit avec vous.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/boutique" className="gu-btn px-8" data-cursor="hover">
              Voir les caches
            </Link>
            <Link
              href="/le-groupe"
              className="inline-flex items-center justify-center rounded border border-[#dcdcdc] px-6 py-4 text-sm text-[#22282b] transition-colors hover:border-[#22282b]"
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
