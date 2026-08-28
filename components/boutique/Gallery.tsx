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
      <div className="flex aspect-square items-center justify-center rounded-lg border border-[#e9e9e9] bg-[#f4f4f4] text-sm text-[#9aa0a6]">
        Visuel à venir
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-[#e9e9e9] bg-[#f4f4f4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active].url}
          alt={images[active].alt ?? name}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {images.slice(0, 10).map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Voir la photo ${i + 1}`}
              className={cn(
                "overflow-hidden rounded-md border bg-[#f4f4f4] transition-colors",
                i === active ? "border-[#22282b]" : "border-[#e9e9e9] hover:border-[#bcbcbc]"
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
