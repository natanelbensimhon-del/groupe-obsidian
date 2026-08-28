import Link from "next/link";
import { COULEURS } from "@/content/boutique";
import type { ShopProduct } from "@/lib/shopify";

/** Carte produit — thème clair, avec nuancier de couleurs directement visible. */
export function ProductCard({ p }: { p: ShopProduct }) {
  const img = p.images[0]?.url;
  return (
    <Link
      href={`/boutique/${p.slug}`}
      data-cursor="hover"
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e9e9e9] bg-white transition-shadow duration-300 hover:shadow-[0_16px_50px_-20px_rgba(0,0,0,0.30)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f4f4f4]">
        {img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={img}
            alt={p.images[0]?.alt ?? p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[#9aa0a6]">
            Visuel à venir
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium text-[#22282b]">{p.name}</h3>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-[#9aa0a6]">
          {p.productType}
        </p>

        {/* Nuancier — les couleurs disponibles, dès le catalogue */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {COULEURS.map((c) => (
            <span
              key={c.name}
              title={`${c.name} — ${c.ral}`}
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ background: c.hex }}
            />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-xs text-[#9aa0a6]">à partir de</span>
          <span className="text-lg font-bold text-[#22282b]">
            {p.priceFrom.toLocaleString("fr-FR")}&nbsp;€
            <span className="ml-1 text-xs font-normal text-[#9aa0a6]">TTC</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
