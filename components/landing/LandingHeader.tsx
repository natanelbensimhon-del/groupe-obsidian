"use client";

import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { track } from "@/lib/tracking";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-obsidian-900/80 backdrop-blur-xl">
      <div className="shell flex h-[64px] items-center justify-between">
        <a href="#top" aria-label="Groupe Obsidian" data-cursor="hover">
          <Logo className="h-6 w-auto sm:h-7" />
        </a>
        <div className="flex items-center gap-3">
          <a
            href={SITE.contact.phoneHref}
            onClick={() => track("click_phone", { location: "header" })}
            data-cursor="hover"
            className="hidden items-center gap-2 text-sm font-medium text-ash-100 hover:text-white sm:flex"
          >
            <PhoneIcon />
            {SITE.contact.phone}
          </a>
          <a
            href="#devis"
            onClick={() => track("click_cta", { location: "header" })}
            data-cursor="hover"
            className="rounded-full bg-ash-100 px-4 py-2 text-[13px] font-medium text-obsidian-900 transition-colors hover:bg-white"
          >
            Demander ma prévisite
          </a>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
