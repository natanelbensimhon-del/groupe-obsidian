import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Réception des leads de la landing climatisation (prévisite / devis).
 * Envoie l'email à l'équipe via Resend. Nécessite `RESEND_API_KEY` (Vercel).
 * Sans clé : la demande est acceptée mais aucun email n'est envoyé.
 * RGPD : email de traitement de la demande, sans conservation.
 */
export async function POST(request: Request) {
  try {
    const d = await request.json();
    // Anti-spam discret : honeypot + validation minimale serveur.
    if (d?.company) return NextResponse.json({ ok: true }); // honeypot rempli = bot
    if (!d?.nom || !d?.tel || !d?.cp) {
      return NextResponse.json(
        { ok: false, error: "Nom, téléphone et code postal sont requis." },
        { status: 400 }
      );
    }
    if (!d?.consent) {
      return NextResponse.json(
        { ok: false, error: "Consentement requis." },
        { status: 400 }
      );
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ ok: true, emailed: false });

    const resend = new Resend(key);
    const from = process.env.RESEND_FROM || "Site Obsidian <onboarding@resend.dev>";
    const to = process.env.LEAD_TO || process.env.CONTACT_TO || "contact@groupe-obsidian.fr";

    const l = (k: string, v: unknown) =>
      v === undefined || v === null || v === "" ? "" : `${k} : ${v}\n`;
    const text =
      `Nouveau lead — Landing Climatisation réversible.\n\n` +
      `— CLIENT —\n` +
      l("Nom", d.nom) +
      l("Téléphone", d.tel) +
      l("E-mail", d.email) +
      l("Code postal", d.cp) +
      l("Ville", d.ville) +
      l("Type de logement", d.logement) +
      l("Pièces à climatiser", d.pieces) +
      l("Délai souhaité", d.delai) +
      l("Message", d.message) +
      `\n— CAMPAGNE —\n` +
      l("Source", d.utm_source) +
      l("Medium", d.utm_medium) +
      l("Campagne", d.utm_campaign) +
      l("Content", d.utm_content) +
      l("Term", d.utm_term) +
      l("gclid", d.gclid) +
      l("msclkid", d.msclkid) +
      l("fbclid", d.fbclid) +
      l("Page", d.page);

    await resend.emails.send({
      from,
      to,
      replyTo: d.email || undefined,
      subject: `Lead climatisation — ${d.nom} (${d.cp})`,
      text,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch {
    return NextResponse.json({ ok: true, emailed: false });
  }
}
