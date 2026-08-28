import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { traduireLigne, libelleLigne, type LigneCommande } from "@/lib/fournisseur";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * ────────────────────────────────────────────────────────────────────────────
 * Transmission automatique des commandes boutique au fabricant partenaire.
 *
 * Déclenché par le webhook Shopify « orders/create ». À chaque commande payée
 * sur la boutique, la commande de production est transmise au fabricant, qui
 * expédie directement au client final.
 *
 * ⚠️ VARIABLES D'ENVIRONNEMENT (Vercel → Settings → Environment Variables)
 *
 *   SHOPIFY_WEBHOOK_SECRET   obligatoire — signe et authentifie le webhook.
 *                            Fourni par Shopify à la création du webhook.
 *
 *   FOURNISSEUR_API_URL      URL de base de l'API du fabricant (…/wp-json/wc/v3)
 *   FOURNISSEUR_API_KEY      consumer key   (à demander au fabricant)
 *   FOURNISSEUR_API_SECRET   consumer secret (à demander au fabricant)
 *   FOURNISSEUR_AUTO         "1" pour transmettre réellement les commandes.
 *                            Tant que cette variable n'est pas à "1", la
 *                            commande est seulement préparée et notifiée :
 *                            rien n'est envoyé au fabricant. Mettez-la à "1"
 *                            une fois le circuit validé sur une vraie commande.
 *
 *   COMMANDE_TO              destinataire du récapitulatif (défaut : contact@)
 *   RESEND_API_KEY           envoi des e-mails (déjà utilisé par le site)
 * ────────────────────────────────────────────────────────────────────────────
 */



/** Vue minimale d'une commande Shopify, telle que reçue par le webhook. */
type Adr = Record<string, string | undefined>;
type LigneShopify = {
  sku?: string;
  quantity?: number;
  properties?: { name?: string; value?: unknown }[];
};
type Cmd = {
  name?: string;
  email?: string;
  currency?: string;
  total_price?: string;
  shipping_address?: Adr;
  billing_address?: Adr;
  line_items?: LigneShopify[];
};

function verifieSignature(brut: string, signature: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const attendu = crypto.createHmac("sha256", secret).update(brut, "utf8").digest("base64");
  const a = Buffer.from(attendu);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function attributsDe(ligne: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of ((ligne?.properties as { name?: string; value?: unknown }[]) ?? [])) {
    if (p?.name) out[String(p.name)] = String(p.value ?? "");
  }
  return out;
}

/** Bon de commande lisible, pour l'e-mail de suivi. */
function bonDeCommande(commande: Cmd, lignes: LigneCommande[], transmis: boolean): string {
  const a = (commande.shipping_address ?? commande.billing_address ?? {}) as Adr;
  const adresse = [
    [a.first_name, a.last_name].filter(Boolean).join(" "),
    a.company,
    a.address1,
    a.address2,
    [a.zip, a.city].filter(Boolean).join(" "),
    a.country,
    a.phone,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    `Commande boutique ${commande.name ?? ""}`,
    transmis
      ? "Transmise automatiquement au fabricant pour expédition directe."
      : "NON transmise — mode préparation (FOURNISSEUR_AUTO n'est pas à 1).",
    "",
    "— À PRODUIRE —",
    ...lignes.map((l) => {
      const base = libelleLigne(l);
      const sur = l.surMesure ? "  ⚠ Coloris sur mesure — vérifier la référence RAL" : "";
      return `${base}\n  Réf. fabricant : ${l.fabricant.produit}${sur}`;
    }),
    "",
    "— LIVRAISON DIRECTE CLIENT —",
    adresse || "(adresse absente)",
    "",
    `E-mail client : ${commande.email ?? "—"}`,
    `Total encaissé : ${commande.total_price ?? "—"} ${commande.currency ?? ""}`,
  ].join("\n");
}

async function transmetAuFabricant(commande: Cmd, lignes: LigneCommande[]) {
  const url = process.env.FOURNISSEUR_API_URL;
  const key = process.env.FOURNISSEUR_API_KEY;
  const secret = process.env.FOURNISSEUR_API_SECRET;
  if (process.env.FOURNISSEUR_AUTO !== "1" || !url || !key || !secret) return false;

  const a = (commande.shipping_address ?? commande.billing_address ?? {}) as Adr;
  const payload = {
    set_paid: false,
    shipping: {
      first_name: a.first_name ?? "",
      last_name: a.last_name ?? "",
      company: a.company ?? "",
      address_1: a.address1 ?? "",
      address_2: a.address2 ?? "",
      city: a.city ?? "",
      postcode: a.zip ?? "",
      country: a.country_code ?? "FR",
      phone: a.phone ?? "",
    },
    line_items: lignes.map((l) => ({
      quantity: l.quantite,
      meta_data: [
        { key: "produit", value: l.fabricant.produit },
        { key: "pa_fixations", value: l.fabricant.fixation ?? "" },
        { key: "pa_dimensions", value: l.fabricant.dimensions ?? "" },
        { key: "pa_couleurs", value: l.fabricant.couleurs },
        { key: "coloris_demande", value: l.coloris },
      ],
    })),
    customer_note: `Commande partenaire ${commande.name ?? ""} — expédition directe au client final.`,
  };

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(`${url.replace(/\/$/, "")}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("[fournisseur] échec", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  const brut = await request.text();
  const signature = request.headers.get("x-shopify-hmac-sha256");

  if (!verifieSignature(brut, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let commande: Cmd;
  try {
    commande = JSON.parse(brut);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lignes: LigneCommande[] = [];
  for (const li of ((commande.line_items as LigneShopify[]) ?? [])) {
    const l = traduireLigne(String(li.sku ?? ""), Number(li.quantity) || 1, attributsDe(li as unknown as Record<string, unknown>));
    if (l) lignes.push(l);
  }

  // Commande sans article de la boutique cache-clim : rien à transmettre.
  if (lignes.length === 0) return NextResponse.json({ ok: true, ignore: true });

  let transmis = false;
  try {
    transmis = await transmetAuFabricant(commande, lignes);
  } catch (e) {
    console.error("[fournisseur]", e);
  }

  // Trace systématique par e-mail : suivi et rattrapage en cas d'échec.
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const resend = new Resend(key);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "Boutique Obsidian <onboarding@resend.dev>",
        to: process.env.COMMANDE_TO || "contact@groupe-obsidian.fr",
        subject: `${transmis ? "✅" : "⚠️"} Commande boutique ${commande.name ?? ""} — ${lignes.length} article(s)`,
        text: bonDeCommande(commande, lignes, transmis),
      });
    } catch (e) {
      console.error("[commande] e-mail", e);
    }
  }

  return NextResponse.json({ ok: true, transmis, lignes: lignes.length });
}
