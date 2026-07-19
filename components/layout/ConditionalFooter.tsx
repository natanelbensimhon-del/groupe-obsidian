"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const HIDDEN = ["/climatisation-reversible", "/merci-climatisation"];

/** Masque le footer global sur les landing pages (chrome dédié). */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (HIDDEN.includes(pathname)) return null;
  return <Footer />;
}
