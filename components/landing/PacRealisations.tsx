"use client";

import { useCallback, useEffect, useState } from "react";
import type { PacRealisation } from "@/content/realisations";

/** Galerie photos + vidéos des chantiers PAC air/eau, avec visionneuse plein écran. */
export function PacRealisations({
  items,
  theme = "light",
}: {
  items: PacRealisation[];
  theme?: "light" | "dark";
}) {
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

  const card =
    theme === "light"
      ? "border-[#e6e6e6] bg-[#f3f3f3]"
      : "border-white/10 bg-obsidian-800";

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((r, i) => (
          <button
            key={r.src}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="hover"
            className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border text-left ${card} ${
              r.featured ? "col-span-2 aspect-[4/5] md:row-span-2 md:aspect-auto" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.video ? r.poster : r.src}
              alt={`${r.title} — ${r.caption}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
            {r.video && (
              <span className={`absolute left-1/2 top-1/2 flex ${r.featured ? "h-20 w-20" : "h-14 w-14"} -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#22282b] shadow-lg transition-transform group-hover:scale-110`}>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75">
                {r.brand}
                {r.video ? " · Vidéo" : ""}
              </span>
              <p className={`mt-0.5 font-medium leading-snug text-white ${r.featured ? "text-lg md:text-2xl" : "text-sm"}`}>
                {r.title}
              </p>
              {r.featured && (
                <p className="mt-1 hidden max-w-md text-sm text-white/80 md:block">{r.caption}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={items[open].title}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg text-white hover:bg-white/10"
          >
            ✕
          </button>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(dir);
              }}
              aria-label={dir < 0 ? "Précédent" : "Suivant"}
              className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-2xl text-white hover:bg-white/10 ${
                dir < 0 ? "left-3" : "right-3"
              }`}
            >
              {dir < 0 ? "‹" : "›"}
            </button>
          ))}
          <figure
            className="flex max-h-[90vh] max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {items[open].video ? (
              <video
                key={items[open].src}
                src={items[open].src}
                poster={items[open].poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[78vh] w-auto rounded-xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={items[open].src}
                alt={items[open].title}
                className="max-h-[78vh] w-auto rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-4 max-w-xl px-10 text-center">
              <p className="text-base font-medium text-white">{items[open].title}</p>
              <p className="mt-1 text-sm text-white/70">{items[open].caption}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
