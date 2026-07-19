"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/tracking";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-obsidian-900/95 p-2.5 backdrop-blur-xl md:hidden">
      <a
        href={SITE.contact.phoneHref}
        onClick={() => track("click_phone", { location: "mobile_bar" })}
        className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-medium text-ash-100"
      >
        Appeler maintenant
      </a>
      <a
        href="#devis"
        onClick={() => track("click_cta", { location: "mobile_bar" })}
        className="flex items-center justify-center rounded-full bg-ash-100 py-3 text-sm font-medium text-obsidian-900"
      >
        Demander un devis
      </a>
    </div>
  );
}
