import { NextResponse } from "next/server";
import { storefront, shopifyConfigured } from "@/lib/shopify";

export const runtime = "nodejs";

/**
 * Crée un panier Shopify et renvoie l'URL du tunnel de paiement sécurisé.
 *
 * Les choix qui ne modifient pas le prix (coloris, type de pose, référence RAL
 * sur mesure) voyagent en attributs de ligne : ils apparaissent sur la commande
 * et servent à passer la commande de production.
 */
type Body = {
  variantId?: string;
  quantity?: number;
  attributes?: { key: string; value: string }[];
};

export async function POST(request: Request) {
  if (!shopifyConfigured) {
    return NextResponse.json(
      { ok: false, error: "Boutique non configurée." },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const variantId = body.variantId;
  if (!variantId || !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(variantId)) {
    return NextResponse.json({ ok: false, error: "Référence produit invalide." }, { status: 400 });
  }

  const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 20);

  const attributes = (body.attributes ?? [])
    .filter((a) => a && typeof a.key === "string" && typeof a.value === "string")
    .slice(0, 10)
    .map((a) => ({ key: a.key.slice(0, 60), value: a.value.slice(0, 200) }));

  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation($lines: [CartLineInput!]!) {
       cartCreate(input: { lines: $lines }) {
         cart { checkoutUrl }
         userErrors { message }
       }
     }`,
    { lines: [{ merchandiseId: variantId, quantity, attributes }] },
    false
  );

  const url = data?.cartCreate?.cart?.checkoutUrl;
  if (!url) {
    const msg = data?.cartCreate?.userErrors?.[0]?.message;
    return NextResponse.json(
      { ok: false, error: msg || "Le panier n'a pas pu être créé." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, checkoutUrl: url });
}
