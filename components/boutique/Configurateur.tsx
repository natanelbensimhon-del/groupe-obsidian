"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

  const pill =
    "rounded-xl border px-4 py-3 text-sm transition-colors data-[on=false]:border-white/10 data-[on=false]:bg-white/[0.02] data-[on=false]:text-ash-300 data-[on=true]:border-white/40 data-[on=true]:bg-white/[0.07] data-[on=true]:text-white hover:border-white/25";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-obsidian-800/60 p-6 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Taille */}
      {tailles.length > 1 && (
        <div>
          <span className="mb-3 block text-xs uppercase tracking-label text-ash-300">
            Taille
          </span>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {tailles.map((t) => (
              <button
                key={t}
                data-on={taille === t}
                onClick={() => setTaille(t)}
                data-cursor="hover"
                className={pill}
              >
                {t}
              </button>
            ))}
          </div>
          {dims && (
            <p className="mt-3 text-xs text-ash-400">Dimensions du cache : {dims}</p>
          )}
        </div>
      )}

      {/* Pose */}
      {categorie === "exterieur" && (
        <div className="mt-7">
          <span className="mb-3 block text-xs uppercase tracking-label text-ash-300">
            Type de pose
          </span>
          <div className="grid grid-cols-2 gap-2">
            {(["Murale", "Au sol"] as const).map((v) => (
              <button
                key={v}
                data-on={pose === v}
                onClick={() => setPose(v)}
                data-cursor="hover"
                className={pill}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coloris */}
      <div className="mt-7">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="text-xs uppercase tracking-label text-ash-300">Coloris</span>
          {!surMesure && <span className="text-xs text-ash-400">{couleur}</span>}
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
                  "h-9 w-9 rounded-full border-2 transition-transform",
                  couleur === c.name
                    ? "scale-110 border-white"
                    : "border-white/20 hover:border-white/50"
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
                className="mt-1 h-4 w-4 accent-white"
              />
              <span className="text-sm text-ash-300">
                Coloris sur mesure — plus de 200 teintes RAL
                <span className="text-ash-400">
                  {" "}
                  (+{BOUTIQUE.customColorSupplement} €)
                </span>
              </span>
            </label>
            {surMesure && (
              <input
                value={ral}
                onChange={(e) => setRal(e.target.value)}
                placeholder="Référence RAL souhaitée — ex : RAL 7021"
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ash-100 placeholder:text-ash-400 outline-none transition-colors focus:border-white/30"
              />
            )}
          </div>
        )}
      </div>

      {/* Quantité + prix */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-7">
        <div>
          <span className="mb-2 block text-xs uppercase tracking-label text-ash-300">
            Quantité
          </span>
          <div className="inline-flex items-center rounded-xl border border-white/10">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2.5 text-ash-300 hover:text-white"
              aria-label="Diminuer"
              data-cursor="hover"
            >
              −
            </button>
            <span className="w-9 text-center text-sm text-ash-100">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="px-4 py-2.5 text-ash-300 hover:text-white"
              aria-label="Augmenter"
              data-cursor="hover"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="block text-xs uppercase tracking-label text-ash-400">
            Total TTC
          </span>
          <motion.span
            key={total}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl text-ash-100 md:text-4xl"
          >
            {total.toLocaleString("fr-FR")} €
          </motion.span>
          <span className="mt-1 block text-xs text-ash-400">
            {BOUTIQUE.delivery}
          </span>
        </div>
      </div>

      <button
        onClick={commander}
        disabled={!variant || status === "loading"}
        data-cursor="hover"
        className="btn-primary mt-7 w-full justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Ouverture du paiement…" : "Commander"}
      </button>

      {status === "error" && message && (
        <p className="mt-4 text-sm text-red-300">{message}</p>
      )}

      <p className="mt-5 text-center text-xs leading-relaxed text-ash-400">
        Paiement sécurisé · {BOUTIQUE.deliveryDelay} · {BOUTIQUE.warranty}
      </p>
    </div>
  );
}
