"use client";

import { useMemo, useState } from "react";
import { COULEURS, DIMENSIONS, BOUTIQUE } from "@/content/boutique";
import type { ShopProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type Cat = "exterieur" | "interieur" | "piece";

function opt(v: { options: { name: string; value: string }[] }, name: string) {
  return v.options.find((o) => o.name === name)?.value ?? "";
}

export function Configurateur({ p, categorie }: { p: ShopProduct; categorie: Cat }) {
  const tailles = useMemo(
    () => Array.from(new Set(p.variants.map((v) => opt(v, "Taille")))).filter(Boolean),
    [p]
  );
  const finitions = useMemo(
    () => Array.from(new Set(p.variants.map((v) => opt(v, "Finition")))).filter(Boolean),
    [p]
  );
  const hasSurMesure = finitions.includes("Coloris sur mesure");

  const [taille, setTaille] = useState(tailles[0] ?? "");
  const [surMesure, setSurMesure] = useState(false);
  const [pose, setPose] = useState<"Murale" | "Au sol">("Murale");
  const [couleur, setCouleur] = useState<string>(COULEURS[0].name);
  const [ral, setRal] = useState("");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const finitionVoulue = surMesure ? "Coloris sur mesure" : "Standard";

  const variant = useMemo(() => {
    return (
      p.variants.find(
        (v) =>
          opt(v, "Taille") === taille &&
          (finitions.length === 0 || opt(v, "Finition") === finitionVoulue)
      ) ?? null
    );
  }, [p, taille, finitionVoulue, finitions.length]);

  const dims =
    DIMENSIONS[`${categorie}-${pose === "Au sol" ? "sol" : "murale"}`]?.[taille] ??
    DIMENSIONS[`${categorie}-murale`]?.[taille] ??
    "";

  const total = variant ? variant.price * qty : 0;

  async function commander() {
    if (!variant) return;
    if (surMesure && !ral.trim()) {
      setStatus("error");
      setMessage("Indiquez la référence RAL souhaitée.");
      return;
    }
    setStatus("loading");
    setMessage("");

    const attributes: { key: string; value: string }[] = [];
    if (categorie === "exterieur") attributes.push({ key: "Pose", value: pose });
    attributes.push({
      key: "Coloris",
      value: surMesure ? `Sur mesure — ${ral.trim()}` : couleur,
    });
    if (dims) attributes.push({ key: "Dimensions", value: dims });

    try {
      const res = await fetch("/api/panier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: variant.id, quantity: qty, attributes }),
      });
      const json = await res.json();
      if (!res.ok || !json.checkoutUrl) throw new Error(json.error || "Erreur");
      window.location.href = json.checkoutUrl;
    } catch (e) {
      setStatus("error");
      setMessage(
        e instanceof Error && e.message !== "Erreur"
          ? e.message
          : "La commande n'a pas pu être lancée. Réessayez ou contactez-nous."
      );
    }
  }

  const legend = "mb-3 block text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]";

  return (
    <div className="rounded-lg border border-[#e9e9e9] bg-white p-6 md:p-7">
      {/* Pose */}
      {categorie === "exterieur" && (
        <div>
          <span className={legend}>Fixation</span>
          <div className="grid grid-cols-2 gap-2.5">
            {(["Murale", "Au sol"] as const).map((v) => (
              <button
                key={v}
                data-on={pose === v}
                onClick={() => setPose(v)}
                data-cursor="hover"
                className="gu-pill"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Taille */}
      {tailles.length > 1 && (
        <div className={categorie === "exterieur" ? "mt-7" : ""}>
          <span className={legend}>Dimensions</span>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
            {tailles.map((t) => (
              <button
                key={t}
                data-on={taille === t}
                onClick={() => setTaille(t)}
                data-cursor="hover"
                className="gu-pill"
              >
                {t}
              </button>
            ))}
          </div>
          {dims && <p className="mt-3 text-xs text-[#6b7177]">Dimensions du cache : {dims}</p>}
        </div>
      )}

      {/* Couleurs */}
      <div className="mt-7">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
            Couleurs
          </span>
          {!surMesure && <span className="text-xs text-[#6b7177]">{couleur}</span>}
        </div>

        {!surMesure && (
          <div className="flex flex-wrap gap-2.5">
            {COULEURS.map((c) => (
              <button
                key={c.name}
                onClick={() => setCouleur(c.name)}
                title={`${c.name} — ${c.ral}`}
                aria-label={`${c.name} — ${c.ral}`}
                data-cursor="hover"
                className={cn(
                  "h-9 w-9 rounded-full border transition-transform",
                  couleur === c.name
                    ? "scale-110 border-[#22282b] ring-1 ring-[#22282b]"
                    : "border-black/15 hover:border-black/40"
                )}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        )}

        {hasSurMesure && (
          <div className="mt-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={surMesure}
                onChange={(e) => setSurMesure(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#22282b]"
              />
              <span className="text-sm text-[#4a4f54]">
                Coloris sur mesure — plus de 200 teintes RAL
                <span className="text-[#9aa0a6]"> (+{BOUTIQUE.customColorSupplement} €)</span>
              </span>
            </label>
            {surMesure && (
              <input
                value={ral}
                onChange={(e) => setRal(e.target.value)}
                placeholder="Référence RAL souhaitée — ex : RAL 7021"
                className="mt-3 w-full rounded border border-[#dcdcdc] bg-white px-4 py-3 text-sm text-[#22282b] outline-none transition-colors placeholder:text-[#9aa0a6] focus:border-[#22282b]"
              />
            )}
          </div>
        )}
      </div>

      {/* Quantité + prix */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[#ececec] pt-7">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
            Quantité
          </span>
          <div className="inline-flex items-center rounded border border-[#dcdcdc]">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2.5 text-[#6b7177] hover:text-[#22282b]"
              aria-label="Diminuer"
              data-cursor="hover"
            >
              −
            </button>
            <span className="w-9 text-center text-sm text-[#22282b]">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="px-4 py-2.5 text-[#6b7177] hover:text-[#22282b]"
              aria-label="Augmenter"
              data-cursor="hover"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="block text-xs uppercase tracking-wider text-[#9aa0a6]">Total TTC</span>
          <span className="text-3xl font-bold text-[#22282b] md:text-4xl">
            {total.toLocaleString("fr-FR")} €
          </span>
          <span className="mt-1 block text-xs text-[#9aa0a6]">{BOUTIQUE.delivery}</span>
        </div>
      </div>

      <button
        onClick={commander}
        disabled={!variant || status === "loading"}
        data-cursor="hover"
        className="gu-btn mt-6 w-full text-base"
      >
        {status === "loading" ? "Ouverture du paiement…" : "Commander"}
      </button>

      {status === "error" && message && (
        <p className="mt-4 text-sm text-red-600">{message}</p>
      )}

      <p className="mt-5 text-center text-xs leading-relaxed text-[#9aa0a6]">
        Paiement sécurisé · {BOUTIQUE.deliveryDelay} · {BOUTIQUE.warranty}
      </p>
    </div>
  );
}
