"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Carte verre avec halo lumineux qui suit le curseur + léger tilt 3D.
 */
export function GlassCard({
  children,
  className,
  accent = "platinum",
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "platinum" | "steel" | "gold";
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const accentRgb =
    accent === "gold"
      ? "216,196,154"
      : accent === "steel"
        ? "154,163,173"
        : "111,168,255";

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -5;
      const ry = ((x / rect.width) - 0.5) * 5;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ["--accent" as string]: accentRgb }}
      className={cn(
        "card-hover group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:p-8",
        "hover:border-white/20",
        className
      )}
    >
      {/* Halo curseur */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgba(var(--accent),0.14), transparent 60%)",
        }}
      />
      {/* Liseré supérieur lumineux */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
