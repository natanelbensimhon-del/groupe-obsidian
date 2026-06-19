"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PUZZLE_PIECES, type PuzzlePiece } from "@/lib/site";
import { piecePoints, gridSigns, pointsToSvgPath } from "@/lib/jigsaw";

const COLS = 4;
const ROWS = 2;
const SCALE = 124;
const PAD = 46;

const ACCENT: Record<PuzzlePiece["accent"], string> = {
  platinum: "#9CC4FF",
  steel: "#C2CAD4",
  gold: "#E6D2A6",
};

function splitLabel(label: string): string[] {
  if (label.length <= 10 || !label.includes(" ")) return [label];
  const words = label.split(" ");
  if (words.length === 1) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * Fallback 2.5D : vraie grille de puzzle (jigsaw) 4×2 avec titres visibles en
 * permanence. Animation d'assemblage à l'apparition, survol qui soulève et
 * illumine la pièce. Utilisé sur mobile / sans WebGL / reduced-motion.
 */
export function Puzzle2D({
  onHover,
}: {
  onHover?: (id: string | null) => void;
}) {
  const router = useRouter();
  const [active, setActive] = useState<number | null>(null);

  const setHover = (i: number | null) => {
    setActive(i);
    onHover?.(i === null ? null : PUZZLE_PIECES[i].id);
  };

  const pieces = useMemo(() => {
    const grid = gridSigns(COLS, ROWS).flat();
    return PUZZLE_PIECES.map((piece, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      const cx = PAD + SCALE / 2 + c * SCALE;
      const cy = PAD + SCALE / 2 + r * SCALE;
      const path = pointsToSvgPath(piecePoints(1, 1, grid[i]), SCALE, cx, cy);
      return { piece, cx, cy, path };
    });
  }, []);

  const vw = COLS * SCALE + PAD * 2;
  const vh = ROWS * SCALE + PAD * 2;

  return (
    <div className="relative mx-auto w-full max-w-[860px]">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="block h-auto w-full">
        <defs>
          <linearGradient id="j2d-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#23282f" />
            <stop offset="100%" stopColor="#0d0f13" />
          </linearGradient>
          <filter id="j2d-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {pieces.map(({ piece, cx, cy, path }, i) => {
          const isActive = active === i;
          const accent = ACCENT[piece.accent];
          const lines = splitLabel(piece.label);
          return (
            <motion.g
              key={piece.id}
              style={{ cursor: "pointer" }}
              initial={{
                opacity: 0,
                x: Math.cos(i * 2.3) * 60,
                y: Math.sin(i * 1.7) * 60,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => router.push(piece.href)}
            >
              <motion.g
                animate={{ y: isActive ? -10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ opacity: active !== null && !isActive ? 0.55 : 1 }}
              >
                <path
                  d={path}
                  fill="url(#j2d-face)"
                  stroke={isActive ? accent : "rgba(255,255,255,0.14)"}
                  strokeWidth={isActive ? 2 : 1.2}
                  filter={isActive ? "url(#j2d-glow)" : undefined}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                <text
                  x={cx}
                  y={cy - (lines.length > 1 ? 4 : 0)}
                  textAnchor="middle"
                  className="font-display"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    fill: isActive ? accent : "#EDEEF0",
                    transition: "fill 0.3s",
                  }}
                >
                  {lines.map((line, li) => (
                    <tspan key={li} x={cx} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
                <text
                  x={cx}
                  y={cy + (lines.length > 1 ? 26 : 18)}
                  textAnchor="middle"
                  style={{
                    fontSize: 7.5,
                    letterSpacing: "0.2em",
                    fill: isActive ? accent : "#6b7280",
                    transition: "fill 0.3s",
                  }}
                >
                  {isActive ? "EXPLORER →" : piece.index}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
