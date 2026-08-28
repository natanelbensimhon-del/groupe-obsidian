"use client";

import { useState } from "react";
import { CATEGORIES } from "@/content/boutique";
import { ProductCard } from "./ProductCard";
import type { ShopProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type Id = "tous" | "exterieur" | "interieur" | "piece";

export function Filtres({
  produits,
  initial = "exterieur",
}: {
  produits: ShopProduct[];
  initial?: Id;
}) {
  const [cat, setCat] = useState<Id>(initial);

  const visibles =
    cat === "tous" ? produits : produits.filter((p) => p.tags.includes(cat));

  const onglets: { id: Id; label: string }[] = [
    ...CATEGORIES.map((c) => ({ id: c.id as Id, label: c.label })),
    { id: "tous", label: "Tout voir" },
  ];

  const intro = CATEGORIES.find((c) => c.id === cat)?.intro;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {onglets.map((o) => (
          <button
            key={o.id}
            onClick={() => setCat(o.id)}
            data-cursor="hover"
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm transition-colors",
              cat === o.id
                ? "border-[#22282b] bg-[#22282b] text-white"
                : "border-[#dcdcdc] bg-white text-[#4a4f54] hover:border-[#22282b] hover:text-[#22282b]"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      {intro && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#6b7177]">{intro}</p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibles.map((p) => (
          <ProductCard key={p.handle} p={p} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-10 text-sm text-[#9aa0a6]">
          Aucun modèle dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
