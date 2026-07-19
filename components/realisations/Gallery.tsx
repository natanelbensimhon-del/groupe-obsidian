"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Realisation } from "@/content/realisations";
import { cn } from "@/lib/utils";

export function Gallery({ items }: { items: Realisation[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((r, i) => (
          <motion.button
            key={r.src}
            onClick={() => setOpen(i)}
            data-cursor="hover"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-obsidian-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.src}
              alt={`${r.title} — ${r.caption}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <span className="text-[10px] uppercase tracking-label text-glow">
                {r.brand} · {r.kind}
              </span>
              <p className="mt-1 text-sm font-medium text-white">{r.title}</p>
              <p className="mt-0.5 hidden text-xs leading-snug text-ash-200 md:block">
                {r.caption}
              </p>
            </div>
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            data-cursor="hover"
          >
            ✕
          </button>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onClick={(e) => {
                e.stopPropagation();
                go(dir);
              }}
              aria-label={dir < 0 ? "Précédent" : "Suivant"}
              data-cursor="hover"
              className={cn(
                "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10",
                dir < 0 ? "left-4" : "right-4"
              )}
            >
              {dir < 0 ? "‹" : "›"}
            </button>
          ))}
          <figure
            className="flex max-h-[88vh] max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[open].src}
              alt={items[open].title}
              className="max-h-[78vh] w-auto rounded-xl border border-white/10 object-contain"
            />
            <figcaption className="mt-4 text-center">
              <span className="text-[10px] uppercase tracking-label text-glow">
                {items[open].brand} · {items[open].kind}
              </span>
              <p className="mt-1 text-sm text-ash-100">{items[open].caption}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
