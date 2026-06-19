import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-obsidian-800">
      <div className="hairline" />
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo className="h-7 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash-300">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-col gap-1 text-sm text-ash-200">
            <a href={SITE.contact.phoneHref} className="hover:text-white">
              {SITE.contact.phone}
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-white">
              {SITE.contact.email}
            </a>
            <span className="text-ash-300">{SITE.contact.address}</span>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-7">
          <p className="label mb-5">Écosystème</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ash-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="label mb-5">Démarrer</p>
          <a
            href={SITE.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ash-200 hover:text-white"
          >
            WhatsApp — échange direct
          </a>
          <Link
            href="/contact"
            className="mt-3 inline-flex text-sm text-ash-200 hover:text-white"
          >
            Soumettre un projet
          </Link>
        </div>
      </div>

      <div className="shell flex flex-col items-start justify-between gap-4 border-t border-white/5 py-7 text-xs text-ash-400 md:flex-row md:items-center">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
        </span>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-ash-200">
            Mentions légales
          </Link>
          <Link href="/politique-confidentialite" className="hover:text-ash-200">
            Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
