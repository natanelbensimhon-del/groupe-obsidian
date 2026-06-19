"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hero d'en-tête pour les pages internes. `tone` adapte l'ambiance lumineuse
 * (obsidian par défaut, steel pour OBSI'BAT, gold pour APIRYON).
 */
export function PageHero({
  eyebrow,
  index,
  title,
  intro,
  tone = "platinum",
}: {
  eyebrow: string;
  index: string;
  title: React.ReactNode;
  intro: string;
  tone?: "platinum" | "steel" | "gold";
}) {
  const glow =
    tone === "gold"
      ? "rgba(216,196,154,0.14)"
      : tone === "steel"
        ? "rgba(154,163,173,0.12)"
        : "rgba(111,168,255,0.12)";

  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${glow} 0%, rgba(10,11,13,0) 70%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="font-display text-sm text-ash-400">{index}</span>
          <span className="label">{eyebrow}</span>
          <span className="h-px w-12 bg-white/15" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "max-w-4xl text-balance text-4xl font-semibold leading-[1.04] text-ash-100 md:text-7xl"
          )}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ash-300 md:text-xl"
        >
          {intro}
        </motion.p>
      </div>
      <div className="shell mt-14">
        <div className="hairline" />
      </div>
    </section>
  );
}
