"use client";

import { useEffect } from "react";

/**
 * Bascule le fond du <body> en blanc pendant qu'on est sur la boutique
 * (thème clair scopé), et le restaure en sortant.
 */
export function BoutiqueTheme() {
  useEffect(() => {
    document.body.classList.add("boutique-light");
    return () => document.body.classList.remove("boutique-light");
  }, []);
  return null;
}
