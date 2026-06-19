"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Puzzle2D } from "./Puzzle2D";
import { PUZZLE_PIECES } from "@/lib/site";

const PuzzleScene = dynamic(() => import("./PuzzleScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-glow/10 blur-2xl" />
    </div>
  );
}

export function PuzzleHero() {
  const [mode, setMode] = useState<"loading" | "3d" | "2d">("loading");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(
        c.getContext("webgl2") || c.getContext("webgl")
      );
    } catch {
      webgl = false;
    }

    setMode(!webgl || reduce || narrow ? "2d" : "3d");
  }, []);

  const active = PUZZLE_PIECES.find((p) => p.id === activeId) ?? null;

  return (
    <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[560px]">
      {/* halo de fond */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />

      {mode === "loading" && <SceneSkeleton />}
      {mode === "3d" && <PuzzleScene onHover={setActiveId} />}
      {mode === "2d" && (
        <div className="flex h-full w-full items-center justify-center px-2">
          <Puzzle2D onHover={setActiveId} />
        </div>
      )}

      {/* Étiquette descriptive (les deux modes) */}
      {mode !== "loading" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.id ?? "idle"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="glass max-w-lg rounded-full px-6 py-3 text-center"
            >
              {active ? (
                <p className="text-sm text-ash-200">
                  <span className="font-medium text-white">{active.label}</span>
                  <span className="mx-2 text-ash-400">—</span>
                  {active.short}
                </p>
              ) : (
                <p className="text-xs uppercase tracking-label text-ash-300">
                  Survolez une pièce — chaque pièce mène à une expertise
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
