import Link from "next/link";
import { SITE } from "@/lib/site";

const CATS = [
  { label: "Extérieur", href: "/boutique?cat=exterieur" },
  { label: "Intérieur", href: "/boutique?cat=interieur" },
  { label: "Pièces détachées", href: "/boutique?cat=piece" },
];

/** En-tête clair dédié à la boutique (masque le menu global du site). */
export function BoutiqueHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ececec] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="/boutique"
          className="flex items-center gap-2.5"
          aria-label="Boutique Groupe Obsidian"
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
            <path
              d="M16 2 28 9v14L16 30 4 23V9L16 2Z"
              fill="none"
              stroke="#22282b"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M16 2 16 16 4 23M16 16 28 9M16 16 16 30"
              fill="none"
              stroke="#c3c6ca"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[15px] font-semibold uppercase tracking-[0.22em] text-[#22282b]">
            Obsidian
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-[#4a4f54] md:flex">
          {CATS.map((c) => (
            <Link key={c.href} href={c.href} className="transition-colors hover:text-[#22282b]">
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={SITE.contact.phoneHref}
            className="hidden text-[#4a4f54] transition-colors hover:text-[#22282b] sm:inline"
          >
            {SITE.contact.phone}
          </a>
          <Link
            href="/le-groupe"
            className="text-[#4a4f54] transition-colors hover:text-[#22282b]"
          >
            Le Groupe&nbsp;↗
          </Link>
        </div>
      </div>
    </header>
  );
}
