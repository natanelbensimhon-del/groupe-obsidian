import Link from "next/link";
import { SITE, LEGAL } from "@/lib/site";

/** Pied de page clair dédié à la boutique (masque le pied global du site). */
export function BoutiqueFooter() {
  return (
    <footer className="border-t border-[#ececec] bg-[#fafafa] text-[#22282b]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
              <path
                d="M16 2 28 9v14L16 30 4 23V9L16 2Z"
                fill="none"
                stroke="#22282b"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[15px] font-semibold uppercase tracking-[0.22em]">
              Obsidian
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b7177]">
            Caches design pour unités de climatisation — aluminium thermolaqué,
            fabrication française, garantie 10 ans. Livraison offerte en France
            métropolitaine.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9aa0a6]">
            Catalogue
          </p>
          <ul className="flex flex-col gap-2.5 text-[#4a4f54]">
            <li><Link href="/boutique?cat=exterieur" className="hover:text-[#22282b]">Cache extérieur</Link></li>
            <li><Link href="/boutique?cat=interieur" className="hover:text-[#22282b]">Cache intérieur</Link></li>
            <li><Link href="/boutique?cat=piece" className="hover:text-[#22282b]">Pièces détachées</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9aa0a6]">
            Contact
          </p>
          <ul className="flex flex-col gap-2.5 text-[#4a4f54]">
            <li><a href={SITE.contact.phoneHref} className="hover:text-[#22282b]">{SITE.contact.phone}</a></li>
            <li><a href={`mailto:${SITE.contact.email}`} className="hover:text-[#22282b]">{SITE.contact.email}</a></li>
            <li><Link href="/le-groupe" className="hover:text-[#22282b]">Retour au site</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-[#22282b]">Mentions légales</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#ececec]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-[#9aa0a6] md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {SITE.name} — {LEGAL.form}</span>
          <span>Paiement sécurisé · Livraison offerte en France métropolitaine</span>
        </div>
      </div>
    </footer>
  );
}
