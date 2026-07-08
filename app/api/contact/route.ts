import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Réception du formulaire de contact : transmet la demande par e-mail à
 * l'équipe. Nécessite `RESEND_API_KEY` (Vercel). Sans clé, la demande est
 * acceptée mais aucun e-mail n'est envoyé.
 *
 * Variables d'env (Vercel) :
 *   RESEND_API_KEY, RESEND_FROM (optionnel), CONTACT_TO (défaut contact@groupe-obsidian.fr)
 *
 * RGPD : e-mail envoyé à l'équipe pour traiter la demande, sans autre
 * conservation (pas de base de données, pas de journalisation).
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data?.nom || !data?.email || !data?.message) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json({ ok: true, emailed: false });
    }

    const resend = new Resend(key);
    const from = process.env.RESEND_FROM || "Site Obsidian <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO || "contact@groupe-obsidian.fr";

    const l = (k: string, v: unknown) =>
      v === undefined || v === null || v === "" ? "" : `${k} : ${v}\n`;
    const text =
      `Nouvelle demande via le formulaire de contact.\n\n` +
      l("Nom", data.nom) +
      l("Société", data.societe) +
      l("Téléphone", data.telephone) +
      l("E-mail", data.email) +
      l("Type de projet", data.type) +
      l("Surface / bâtiment", data.surface) +
      `\nMessage :\n${data.message}\n`;

    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Contact site — ${data.nom}${data.type ? " · " + data.type : ""}`,
      text,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch {
    return NextResponse.json({ ok: true, emailed: false });
  }
}
