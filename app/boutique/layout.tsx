import type { ReactNode } from "react";
import { BoutiqueTheme } from "@/components/boutique/BoutiqueTheme";
import { BoutiqueHeader } from "@/components/boutique/BoutiqueHeader";
import { BoutiqueFooter } from "@/components/boutique/BoutiqueFooter";

/**
 * Layout dédié à la boutique : thème CLAIR (fond blanc, façon catalogue
 * e-commerce), en-tête et pied propres. Le menu et le pied globaux du site
 * (sombres) sont masqués sur ces routes.
 */
export default function BoutiqueLayout({ children }: { children: ReactNode }) {
  return (
    <div className="boutique-light flex min-h-screen flex-col bg-white">
      <BoutiqueTheme />
      <BoutiqueHeader />
      <main className="flex-1">{children}</main>
      <BoutiqueFooter />
    </div>
  );
}
