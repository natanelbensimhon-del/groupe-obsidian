"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        {index && (
          <span className="font-display text-sm text-ash-400">{index}</span>
        )}
        <span className="label">{eyebrow}</span>
        <span className="h-px w-10 bg-white/15" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "max-w-3xl text-balance text-3xl font-semibold leading-[1.08] text-ash-100 md:text-5xl",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-ash-300 md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
