"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const HIDDEN = [
  "/climatisation-reversible",
  "/merci-climatisation",
  "/pompe-a-chaleur",
  "/merci-pompe-a-chaleur",
];

/** Masque le footer global sur les landing pages et la boutique (chrome dédié). */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (HIDDEN.includes(pathname) || pathname.startsWith("/boutique")) return null;
  return <Footer />;
}
