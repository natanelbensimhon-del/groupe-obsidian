"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Rénovation énergétique tertiaire",
  "Optimisation CEE",
  "Travaux / rénovation",
  "Climatisation résidentielle",
  "Gros œuvre & démolition (OBSI'BAT)",
  "Projet particulier",
  "Aviation d'affaires (APIRYON)",
  "Autre",
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-ash-100 placeholder:text-ash-400 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-label text-ash-300">
        {label}
        {required && <span className="text-glow"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  // Pré-remplissage depuis le configurateur climatisation (sessionStorage).
  useEffect(() => {
    try {
      const devis = sessionStorage.getItem("obsidian_devis");
      if (devis) {
        if (messageRef.current) messageRef.current.value = devis;
        if (typeRef.current) typeRef.current.value = "Climatisation résidentielle";
        sessionStorage.removeItem("obsidian_devis");
      }
    } catch {}
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-obsidian-800/60 p-6 md:p-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-glow/40 text-glow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 13 4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-medium text-ash-100">
              Demande transmise.
            </h3>
            <p className="mt-3 max-w-sm text-sm text-ash-300">
              Merci. Notre équipe revient vers vous rapidement pour étudier votre
              projet.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-ghost mt-8"
              data-cursor="hover"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="grid gap-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nom" required>
                <input name="nom" required className={inputClass} placeholder="Votre nom" />
              </Field>
              <Field label="Société">
                <input name="societe" className={inputClass} placeholder="Votre société" />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Téléphone">
                <input
                  name="telephone"
                  type="tel"
                  className={inputClass}
                  placeholder="01 23 45 67 89"
                />
              </Field>
              <Field label="E-mail" required>
                <input
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="vous@exemple.fr"
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Type de projet">
                <select ref={typeRef} name="type" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Sélectionnez…
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-obsidian-800">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Surface / bâtiment concerné">
                <input
                  name="surface"
                  className={inputClass}
                  placeholder="Ex : bureaux 1 200 m²"
                />
              </Field>
            </div>

            <Field label="Message" required>
              <textarea
                ref={messageRef}
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Décrivez votre projet, vos enjeux et votre calendrier…"
              />
            </Field>

            {status === "error" && (
              <p className="text-sm text-red-300">
                Une erreur est survenue. Réessayez ou contactez-nous directement.
              </p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-ash-400">
                Les champs marqués * sont obligatoires.
              </p>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary disabled:opacity-60"
                data-cursor="hover"
              >
                {status === "loading" ? "Envoi…" : "Soumettre un projet"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
