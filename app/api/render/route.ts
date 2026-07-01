import { NextResponse } from "next/server";

/**
 * Génération d'un rendu réaliste (IA) : à partir de la photo du client et de la
 * marque/modèle choisis, on demande à un modèle d'image d'intégrer l'unité de
 * climatisation de façon photo-réaliste.
 *
 * ⚠️ À ACTIVER : définissez la variable d'environnement GEMINI_API_KEY (Google
 * AI Studio) dans Vercel. Sans clé, l'endpoint répond `not_configured` et le
 * bouton reste inactif côté site.
 *
 * RGPD : la photo est transmise à un service tiers (Google Gemini) UNIQUEMENT
 * sur action explicite du client (consentement dédié). Aucune conservation.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

function buildPrompt(brand: string, model: string, kind: "int" | "ext") {
  if (kind === "ext") {
    return (
      `À partir de la photo ci-jointe, ajoute un groupe extérieur (unité extérieure) de climatisation / pompe à chaleur air-air de la marque **${brand}**, modèle **${model}**, ` +
      `à l'emplacement le plus logique (au sol sur plots, en façade sur équerres, ou sur balcon). ` +
      `Objectif : un rendu ultra réaliste, comme une vraie photo après installation. ` +
      `Respecte la perspective, les proportions réelles de l'unité extérieure, la hauteur d'installation habituelle, les ombres et la lumière existantes, ` +
      `les matériaux et couleurs de la façade, et les éléments déjà présents. Intègre-le proprement, sans effet montage, sans déformation, sans changer le reste de la scène. ` +
      `Reproduis au maximum le design réel de la marque ${brand} (forme, grille de ventilation, dimensions visuelles, logo discret) ; à défaut, crée une unité crédible et proche du style ${brand}. ` +
      `Ne modifie aucun autre élément, sauf si nécessaire pour une intégration naturelle.`
    );
  }
  return (
    `À partir de la photo ci-jointe, ajoute une unité intérieure de climatisation / pompe à chaleur air-air de la marque **${brand}**, modèle **${model}**, à l'emplacement le plus logique sur le mur. ` +
    `L'objectif est d'obtenir un rendu ultra réaliste, comme une vraie photo après installation. ` +
    `Respecte précisément : la perspective de la pièce, les proportions réelles de l'unité intérieure, la hauteur d'installation habituelle, les ombres et la lumière existantes, la couleur du mur, les angles de la pièce, le mobilier et les éléments déjà présents. ` +
    `L'unité doit être intégrée proprement au décor, sans effet montage, sans déformation, sans changer le reste de la pièce. ` +
    `Si le modèle exact est identifiable, reproduis au maximum son design réel : forme, façade, grille, dimensions visuelles, logo discret de la marque. Sinon, crée une unité intérieure très proche du style de la marque ${brand}, crédible et réaliste. ` +
    `Ne modifie aucun autre élément de la photo, sauf si cela est nécessaire pour intégrer naturellement l'unité intérieure.`
  );
}

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 200 });
  }
  try {
    const { image, brand, model, kind } = await request.json();
    if (!image || typeof image !== "string" || !image.startsWith("data:")) {
      return NextResponse.json({ ok: false, error: "bad_image" }, { status: 400 });
    }
    const m = image.match(/^data:(.*?);base64,(.*)$/);
    if (!m) return NextResponse.json({ ok: false, error: "bad_image" }, { status: 400 });
    const mimeType = m[1];
    const data = m[2];

    const prompt = buildPrompt(
      String(brand || "").trim() || "générique",
      String(model || "").trim() || "standard",
      kind === "ext" ? "ext" : "int"
    );

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ inlineData: { mimeType, data } }, { text: prompt }],
            },
          ],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
    const json = await res.json();
    const parts = json?.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p: { inlineData?: { data?: string } }) => p?.inlineData?.data);
    if (!img?.inlineData?.data) {
      return NextResponse.json({ ok: false, error: "no_image" }, { status: 502 });
    }
    const outMime = img.inlineData.mimeType || "image/png";
    return NextResponse.json({
      ok: true,
      image: `data:${outMime};base64,${img.inlineData.data}`,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
