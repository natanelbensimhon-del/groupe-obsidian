"use client";

import Link from "next/link";
import { GlassCard } from "./GlassCard";

type ExpertiseCardProps = {
  index: string;
  title: string;
  description: string;
  href: string;
  accent?: "platinum" | "steel" | "gold";
  cta?: string;
};

export function ExpertiseCard({
  index,
  title,
  description,
  href,
  accent = "platinum",
  cta = "Explorer",
}: ExpertiseCardProps) {
  return (
    <Link href={href} className="block h-full" data-cursor="hover">
      <GlassCard accent={accent} className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm text-ash-400">{index}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ash-300 transition-all duration-300 group-hover:border-white/30 group-hover:text-white">
              <ArrowUpRight />
            </span>
          </div>
          <h3 className="text-xl font-medium text-ash-100 md:text-2xl">{title}</h3>
          <p className="text-sm leading-relaxed text-ash-300">{description}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-label text-ash-300 transition-colors group-hover:text-white">
          {cta}
          <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
        </span>
      </GlassCard>
    </Link>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M7 17 17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
