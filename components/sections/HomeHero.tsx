"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PuzzleHero } from "@/components/puzzle/PuzzleHero";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-radial-glow" />

      <div className="shell relative pb-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={item}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-white/15" />
            <span className="label">Groupe énergétique — France</span>
            <span className="h-px w-10 bg-white/15" />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-5xl font-semibold leading-[0.98] text-ash-100 sm:text-6xl lg:text-7xl"
          >
            GROUPE{" "}
            <span className="bg-gradient-to-r from-white via-ash-100 to-ash-300 bg-clip-text text-transparent">
              OBSIDIAN
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ash-200 md:text-lg"
          >
            Climatisation réversible & pompe à chaleur air/air, rénovation
            énergétique et travaux. Du confort de votre pièce au pilotage de
            projets à fort enjeu — installation clé en main, dans les règles de
            l&apos;art.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link href="/climatisation" className="btn-primary" data-cursor="hover">
              Configurer ma climatisation
            </Link>
            <Link href="/realisations" className="btn-ghost" data-cursor="hover">
              Voir nos réalisations
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Puzzle — pièce maîtresse, pleine largeur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="shell relative"
      >
        <PuzzleHero />
      </motion.div>

      <div className="shell mt-4">
        <div className="hairline" />
      </div>
    </section>
  );
}
