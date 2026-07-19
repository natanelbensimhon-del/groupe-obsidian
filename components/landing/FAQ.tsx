"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/content/faq-climatisation";

export { FAQ_ITEMS };

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-obsidian-800/50">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor="hover"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-ash-100 md:text-base">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-glow transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-ash-300">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
