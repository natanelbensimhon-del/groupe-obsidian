"use client";

import { useMemo, useState } from "react";
import { COMPAT_EXTERIEUR, COMPAT_INTERIEUR, type CompatMarque } from "@/content/compatibilite";
import { cn } from "@/lib/utils";

const TAILLE_BADGE: Record<string, string> = {
  S: "bg-[#eef2f4]",
  M: "bg-[#e7edf0]",
  L: "bg-[#dfe7eb]",
  XL: "bg-[#d7e1e6]",
  XXL: "bg-[#cddae1]",
};

function filtrer(data: CompatMarque[], q: string): CompatMarque[] {
  const s = q.trim().toLowerCase();
  if (!s) return data;
  return data
    .map((m) => {
      if (m.marque.toLowerCase().includes(s)) return m;
      const lignes = m.lignes.filter(
        (l) => l.modele.toLowerCase().includes(s) || l.dimensions.toLowerCase().includes(s)
      );
      return lignes.length ? { ...m, lignes } : null;
    })
    .filter(Boolean) as CompatMarque[];
}

export function CompatGuide() {
  const [mode, setMode] = useState<"exterieur" | "interieur">("exterieur");
  const [q, setQ] = useState("");

  const data = mode === "exterieur" ? COMPAT_EXTERIEUR : COMPAT_INTERIEUR;
  const filtered = useMemo(() => filtrer(data, q), [data, q]);
  const total = filtered.reduce((n, m) => n + m.lignes.length, 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-[#dcdcdc] p-1">
          {(["exterieur", "interieur"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              data-cursor="hover"
              className={cn(
                "rounded-md px-4 py-2 text-sm transition-colors",
                mode === m ? "bg-[#22282b] text-white" : "text-[#4a4f54] hover:text-[#22282b]"
              )}
            >
              {m === "exterieur" ? "Unité extérieure" : "Split intérieur"}
            </button>
          ))}
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une marque ou un modèle (ex : Daikin, Emura, MSZ…)"
          className="w-full rounded-lg border border-[#dcdcdc] bg-white px-4 py-2.5 text-sm text-[#22282b] outline-none transition-colors placeholder:text-[#9aa0a6] focus:border-[#22282b] sm:w-80"
        />
      </div>

      {q && (
        <p className="mt-4 text-sm text-[#6b7177]">
          {total} résultat{total > 1 ? "s" : ""} pour «&nbsp;{q}&nbsp;»
        </p>
      )}

      <div className="mt-8 space-y-10">
        {filtered.map((m) => (
          <div key={m.marque} className="overflow-hidden rounded-lg border border-[#e9e9e9]">
            <div className="bg-[#22282b] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white">
              {m.marque}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#ececec] bg-[#fafafa] text-left text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                    <th className="px-5 py-3">Modèle</th>
                    <th className="px-5 py-3">Dimensions constructeur (H × L × P)</th>
                    <th className="px-5 py-3 text-center">Taille de cache</th>
                  </tr>
                </thead>
                <tbody>
                  {m.lignes.map((l, i) => (
                    <tr key={i} className="border-b border-[#f0f0f0] last:border-0">
                      <td className="px-5 py-3 text-[#22282b]">{l.modele}</td>
                      <td className="px-5 py-3 text-[#6b7177]">{l.dimensions} mm</td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={cn(
                            "inline-flex min-w-[44px] items-center justify-center rounded-full px-3 py-1 text-xs font-bold text-[#22282b]",
                            TAILLE_BADGE[l.taille] ?? "bg-[#eef2f4]"
                          )}
                        >
                          {l.taille}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-[#9aa0a6]">
            Aucun modèle trouvé. Vérifiez l&apos;orthographe ou mesurez votre unité et
            choisissez la taille juste au-dessus.
          </p>
        )}
      </div>
    </div>
  );
}
