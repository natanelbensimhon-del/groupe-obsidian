"use client";

import { useState } from "react";
import { CATEGORIES } from "@/content/boutique";
import { ProductCard } from "./ProductCard";
import type { ShopProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type Id = "tous" | "exterieur" | "interieur" | "piece";

export function Filtres({ produits }: { produits: ShopProduct[] }) {
  const [cat, setCat] = useState<Id>("exterieur");

  const visibles =
    cat === "tous" ? produits : produits.filter((p) => p.tags.includes(cat));

  const onglets: { id: Id; label: string }[] = [
    ...CATEGORIES.map((c) => ({ id: c.id as Id, label: c.short })),
    { id: "tous", label: "Tout voir" },
  ];

  const intro = CATEGORIES.find((c) => c.id === cat)?.intro;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {onglets.map((o) => (
          <button
            key={o.id}
            onClick={() => setCat(o.id)}
            data-cursor="hover"
            className={cn(
              "rounded-full border px-5 py-2.5 text-[13px] transition-colors",
              cat === o.id
                ? "border-white/40 bg-white/[0.07] text-white"
                : "border-white/10 text-ash-300 hover:border-white/25 hover:text-white"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      {intro && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ash-300">{intro}</p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p, i) => (
          <ProductCard key={p.handle} p={p} i={i} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-10 text-sm text-ash-400">
          Aucun modèle dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
