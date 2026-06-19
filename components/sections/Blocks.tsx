"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

/* ── Bandeau de chiffres-clés ──────────────────────────────────── */
export function StatStrip({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4">
      {items.map((s, i) => (
        <Reveal
          key={s.label}
          delayIndex={i}
          className="bg-obsidian-800 p-7 text-center"
        >
          <div className="font-display text-3xl font-semibold text-ash-100 md:text-5xl">
            {s.value}
          </div>
          <div className="mt-2 text-xs uppercase tracking-label text-ash-300">
            {s.label}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Process / méthode en étapes numérotées ────────────────────── */
export function ProcessTimeline({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal
          key={s.title}
          delayIndex={i}
          className="group relative bg-obsidian-800 p-8"
        >
          <span className="font-display text-sm text-ash-400">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="mt-6 h-px w-full bg-white/10">
            <span className="block h-px w-0 bg-glow transition-all duration-700 group-hover:w-full" />
          </div>
          <h3 className="mt-6 text-lg font-medium text-ash-100">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ash-300">{s.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Colonnes de features (cartes verre) ───────────────────────── */
export function FeatureColumns({
  items,
  accent = "platinum",
  columns = 3,
}: {
  items: { title: string; text: string }[];
  accent?: "platinum" | "steel" | "gold";
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {items.map((f, i) => (
        <Reveal key={f.title} delayIndex={i % 3}>
          <GlassCard accent={accent} className="h-full">
            <h3 className="text-lg font-medium text-ash-100">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ash-300">{f.text}</p>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Liste à puces premium (coche fine) ────────────────────────── */
export function ListCheck({
  items,
  accent = "#6FA8FF",
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          className="flex items-start gap-3 border-b border-white/5 pb-4"
        >
          <span
            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45"
            style={{ background: accent }}
          />
          <span className="text-sm leading-relaxed text-ash-200">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ── Bandeau partenaires / standards ───────────────────────────── */
export function PartnersStrip({
  partners,
}: {
  partners: { name: string; note: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {partners.map((p) => (
        <div key={p.name} className="text-center">
          <div className="font-display text-2xl font-medium tracking-wide text-ash-100 md:text-3xl">
            {p.name}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-label text-ash-400">
            {p.note}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Bloc citation / manifeste ─────────────────────────────────── */
export function Manifesto({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-4xl text-balance text-center font-display text-2xl font-medium leading-snug text-ash-100 md:text-4xl">
      {children}
    </Reveal>
  );
}
