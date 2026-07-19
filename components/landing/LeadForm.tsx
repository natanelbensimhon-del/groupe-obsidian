"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAttribution, track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ash-100 placeholder:text-ash-400 outline-none transition-colors focus:border-glow/50 focus:bg-white/[0.06]";

const LOGEMENTS = ["Maison individuelle", "Appartement", "Autre"];
const PIECES = ["1 pièce", "2 pièces", "3 pièces", "4 pièces ou plus"];
const DELAIS = ["Dès que possible", "Sous 1 à 3 mois", "Plus tard / je me renseigne"];

export function LeadForm({ id = "devis" }: { id?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const started = useRef(false);

  function onFirstInteraction() {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "lead_climatisation" });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (!data.nom?.trim() || !data.tel?.trim() || !data.cp?.trim()) {
      setError("Merci d'indiquer votre nom, téléphone et code postal.");
      return;
    }
    if (!/^\d{5}$/.test(data.cp.trim())) {
      setError("Le code postal doit comporter 5 chiffres.");
      return;
    }
    if (!data.consent) {
      setError("Merci d'accepter d'être recontacté pour traiter votre demande.");
      return;
    }

    setStatus("loading");
    const payload = {
      ...data,
      ...getAttribution(),
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || j.ok === false) {
        setStatus("error");
        setError("Une erreur est survenue. Réessayez ou appelez-nous.");
        return;
      }
      track("form_submit", { form: "lead_climatisation" });
      track("generate_lead", {
        value: 7500,
        currency: "EUR",
        offer: "climatisation_reversible_de_dietrich",
      });
      router.push("/merci-climatisation");
    } catch {
      setStatus("error");
      setError("Connexion impossible. Réessayez ou appelez-nous.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      className="scroll-mt-24"
      noValidate
    >
      {/* Honeypot anti-spam (caché) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input className={inputClass} name="nom" required placeholder="Nom et prénom *" autoComplete="name" />
        <input className={inputClass} name="tel" required type="tel" placeholder="Téléphone *" autoComplete="tel" />
        <input className={inputClass} name="email" type="email" placeholder="E-mail" autoComplete="email" />
        <div className="grid grid-cols-[110px_1fr] gap-3">
          <input className={inputClass} name="cp" required inputMode="numeric" maxLength={5} placeholder="CP *" autoComplete="postal-code" />
          <input className={inputClass} name="ville" placeholder="Ville" autoComplete="address-level2" />
        </div>
        <select className={inputClass} name="logement" defaultValue="">
          <option value="" disabled>Type de logement</option>
          {LOGEMENTS.map((o) => <option key={o} value={o} className="bg-obsidian-800">{o}</option>)}
        </select>
        <select className={inputClass} name="pieces" defaultValue="">
          <option value="" disabled>Pièces à climatiser</option>
          {PIECES.map((o) => <option key={o} value={o} className="bg-obsidian-800">{o}</option>)}
        </select>
        <select className={cn(inputClass, "sm:col-span-2")} name="delai" defaultValue="">
          <option value="" disabled>Délai souhaité</option>
          {DELAIS.map((o) => <option key={o} value={o} className="bg-obsidian-800">{o}</option>)}
        </select>
        <textarea className={cn(inputClass, "sm:col-span-2 resize-none")} name="message" rows={2} placeholder="Message (facultatif)" />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-ash-300">
        <input type="checkbox" name="consent" value="1" className="mt-0.5 h-4 w-4 shrink-0 accent-glow" />
        <span>
          J&apos;accepte que Groupe Obsidian utilise mes informations pour me
          recontacter au sujet de mon projet.{" "}
          <a href="/politique-confidentialite" className="underline hover:text-ash-100">
            Politique de confidentialité
          </a>
          .
        </span>
      </label>

      {error && <p className="mt-3 text-sm text-amber-300">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-5 w-full text-[15px] disabled:opacity-60"
        data-cursor="hover"
      >
        {status === "loading" ? "Envoi en cours…" : "Recevoir ma proposition personnalisée"}
      </button>
      <p className="mt-3 text-center text-[11px] text-ash-500">
        Réponse rapide · Étude personnalisée · Sans engagement avant acceptation du devis
      </p>
    </form>
  );
}
