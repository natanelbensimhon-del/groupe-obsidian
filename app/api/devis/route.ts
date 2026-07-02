import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Réception d'une demande de devis : envoie à l'équipe les coordonnées du
 * client + le PDF du devis en pièce jointe, à chaque téléchargement.
 *
 * ⚠️ À ACTIVER : définissez dans Vercel :
 *   - RESEND_API_KEY  (clé Resend — resend.com)
 *   - RESEND_FROM     (optionnel, ex "Groupe Obsidian <devis@groupe-obsidian.fr>",
 *                      domaine à vérifier chez Resend ; sinon "onboarding@resend.dev")
 *   - DEVIS_TO        (optionnel, destinataire ; défaut contact@groupe-obsidian.fr)
 * Sans RESEND_API_KEY, la demande est acceptée mais aucun email n'est envoyé.
 *
 * RGPD : email envoyé à l'équipe pour traiter la demande (rappel/étude), sans
 * autre conservation.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data?.email || !data?.nom || !data?.tel) {
      return NextResponse.json(
        { ok: false, error: "Coordonnées incomplètes." },
        { status: 400 }
      );
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      // Pas de clé : on accepte sans envoyer (à activer).
      return NextResponse.json({ ok: true, emailed: false });
    }

    const resend = new Resend(key);
    const from = process.env.RESEND_FROM || "Groupe Obsidian <onboarding@resend.dev>";
    const to = process.env.DEVIS_TO || "contact@groupe-obsidian.fr";

    const l = (k: string, v: unknown) =>
      v === undefined || v === null || v === "" ? "" : `${k} : ${v}\n`;
    const text =
      `Nouveau devis climatisation téléchargé.\n\n` +
      `— CLIENT —\n` +
      l("Nom", `${data.prenom ?? ""} ${data.nom ?? ""}`.trim()) +
      l("Téléphone", data.tel) +
      l("E-mail", data.email) +
      l("Adresse", data.adresse) +
      `\n— CONFIGURATION —\n` +
      l("Logement", data.logement) +
      l("Usage", data.usage) +
      l("Gamme", data.modele) +
      l("Unités intérieures", data.splits) +
      l("Groupes extérieurs", data.groupes) +
      l("Passage des câbles", data.passageCables) +
      l("Condensats", data.condensats) +
      l("Total estimatif TTC", data.totalEstimatif ? data.totalEstimatif + " €" : "") +
      l("N° devis", data.numero);

    const attachments =
      data.pdfBase64 && typeof data.pdfBase64 === "string"
        ? [
            {
              filename: data.pdfFilename || `devis-${data.numero || "obsidian"}.pdf`,
              content: data.pdfBase64, // base64
            },
          ]
        : undefined;

    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Devis climatisation — ${data.prenom ?? ""} ${data.nom ?? ""} (${data.numero ?? ""})`,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch {
    // On n'échoue pas le téléchargement côté client : on répond ok.
    return NextResponse.json({ ok: true, emailed: false });
  }
}
