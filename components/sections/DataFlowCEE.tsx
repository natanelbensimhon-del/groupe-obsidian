"use client";

import { motion } from "framer-motion";

const STAGES = [
  { k: "Diagnostic", d: "Lecture technique & fiches CEE" },
  { k: "Travaux", d: "Opérations éligibles exécutées" },
  { k: "Preuves", d: "Chaîne documentaire sécurisée" },
  { k: "Valorisation", d: "Gisement mobilisé & valorisé" },
];

/**
 * Animation signature de la page CEE : flux d'énergie / réseau de données
 * reliant les étapes Diagnostic → Travaux → Preuves → Valorisation.
 */
export function DataFlowCEE() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-obsidian-800/60 p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      <svg
        viewBox="0 0 1000 260"
        className="relative w-full"
        role="img"
        aria-label="Flux de valorisation CEE : diagnostic, travaux, preuves, valorisation"
      >
        <defs>
          <linearGradient id="cee-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6FA8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#6FA8FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6FA8FF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cee-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1b2330" />
            <stop offset="100%" stopColor="#0a0b0d" />
          </radialGradient>
          <filter id="cee-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* réseau de fond */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = (i * 137) % 1000;
          const y = (i * 83) % 260;
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#2a313b" opacity="0.6" />
          );
        })}

        {/* connecteur principal */}
        <line x1="120" y1="130" x2="880" y2="130" stroke="#23282f" strokeWidth="2" />
        <line
          x1="120"
          y1="130"
          x2="880"
          y2="130"
          stroke="url(#cee-flow)"
          strokeWidth="2.5"
          strokeDasharray="120 760"
          className="cee-stream"
        />

        {STAGES.map((s, i) => {
          const x = 120 + i * (760 / (STAGES.length - 1));
          return (
            <g key={s.k}>
              <circle
                cx={x}
                cy={130}
                r="46"
                fill="url(#cee-node)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy={130}
                r="46"
                fill="none"
                stroke="#6FA8FF"
                strokeWidth="1.4"
                opacity="0.35"
                filter="url(#cee-glow)"
                className="cee-ring"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
              <text
                x={x}
                y={126}
                textAnchor="middle"
                className="font-display"
                style={{ fontSize: 15, fill: "#EDEEF0" }}
              >
                {s.k}
              </text>
              <text
                x={x}
                y={196}
                textAnchor="middle"
                style={{ fontSize: 10.5, fill: "#8A8F98" }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="relative mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-medium text-ash-100">{s.k}</p>
            <p className="mt-1 text-xs leading-relaxed text-ash-300">{s.d}</p>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .cee-stream {
          animation: cee-move 4s linear infinite;
        }
        @keyframes cee-move {
          to {
            stroke-dashoffset: -880;
          }
        }
        .cee-ring {
          animation: cee-pulse 3.2s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes cee-pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cee-stream,
          .cee-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
