import { cn } from "@/lib/utils";

/**
 * Logotype PROVISOIRE Groupe Obsidian (monogramme hexagonal « O » fragmenté
 * + wordmark). ⚠️ REMPLACEZ par votre logo vectoriel définitif :
 * déposez votre SVG dans /public/logo.svg et importez-le ici, ou éditez ce
 * composant.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-full w-auto" aria-hidden>
        <defs>
          <linearGradient id="obs-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EDEEF0" />
            <stop offset="1" stopColor="#8A8F98" />
          </linearGradient>
        </defs>
        {/* Hexagone fragmenté */}
        <path
          d="M16 2 28 9v14L16 30 4 23V9L16 2Z"
          fill="none"
          stroke="url(#obs-mark)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M16 2 16 16 4 23M16 16 28 9M16 16 16 30"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.22em] text-ash-100">
        Obsidian
      </span>
    </span>
  );
}
