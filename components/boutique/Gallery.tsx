"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Gallery({
  images,
  name,
}: {
  images: { url: string; alt: string | null }[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-obsidian-800 text-sm text-ash-400">
        Visuel à venir
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active].url}
          alt={images[active].alt ?? name}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.slice(0, 8).map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Voir la photo ${i + 1}`}
              className={cn(
                "overflow-hidden rounded-xl border bg-obsidian-800 transition-colors",
                i === active ? "border-white/50" : "border-white/10 hover:border-white/30"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
