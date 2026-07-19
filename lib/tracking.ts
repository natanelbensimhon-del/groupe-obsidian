// Utilitaires de tracking — capture d'attribution (UTM / gclid / msclkid /
// fbclid) et envoi d'événements dans le dataLayer (Google Tag Manager).
//
// ⚠️ Aucun identifiant réel n'est codé en dur. GTM ne se charge que si
// NEXT_PUBLIC_GTM_ID est défini (voir components/landing/Tracking.tsx).
// Le déclenchement des balises publicitaires (consentement) est géré DANS GTM
// (Consent Mode), pas ici : on se contente de pousser des événements.

const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "msclkid",
  "fbclid",
] as const;

const STORAGE = "obsidian_attribution";

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

/** À appeler une fois au chargement : mémorise l'attribution (persistée). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const url = new URLSearchParams(window.location.search);
    const existing = getAttribution();
    const next: Attribution = { ...existing };
    let changed = false;
    KEYS.forEach((k) => {
      const v = url.get(k);
      if (v) {
        next[k] = v;
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem(STORAGE, JSON.stringify(next));
  } catch {}
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE) || "{}");
  } catch {
    return {};
  }
}

type DL = { push: (o: Record<string, unknown>) => void };
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pousse un événement dans le dataLayer (récupéré par GTM). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  (window.dataLayer as unknown as DL).push({ event, ...params });
}
