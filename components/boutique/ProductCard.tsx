"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopProduct } from "@/lib/shopify";

export function ProductCard({ p, i = 0 }: { p: ShopProduct; i?: number }) {
  const img = p.images[0]?.url;
  return (
    <Reveal delayIndex={i % 3}>
      <Link
        href={`/boutique/${p.slug}`}
        data-cursor="hover"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors hover:border-white/20"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-obsidian-800">
          {img ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={img}
              alt={p.images[0]?.alt ?? p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-ash-400">
              Visuel à venir
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-medium text-ash-100">{p.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ash-300">
            {p.description.split("\n")[0]}
          </p>
          <div className="mt-auto flex items-end justify-between pt-5">
            <span className="text-xs uppercase tracking-label text-ash-400">
              à partir de
            </span>
            <span className="font-display text-xl text-ash-100">
              {p.priceFrom.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
