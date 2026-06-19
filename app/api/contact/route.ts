import { NextResponse } from "next/server";

/**
 * Endpoint de réception du formulaire de contact.
 *
 * ⚠️ À BRANCHER : aujourd'hui, cet endpoint valide les données et répond OK
 * sans envoyer d'email. Pour recevoir réellement les demandes, choisissez une
 * option et décommentez/complétez le bloc correspondant :
 *
 *  • Resend (recommandé) :
 *      npm i resend
 *      const { Resend } = require("resend");
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({
 *        from: "Site <site@votre-domaine.fr>",
 *        to: "contact@groupe-obsidian.fr",
 *        subject: `Nouveau projet — ${data.nom}`,
 *        text: JSON.stringify(data, null, 2),
 *      });
 *
 *  • Formspree / autre : faites un fetch POST vers votre endpoint depuis ici.
 *
 * Pensez à définir RESEND_API_KEY dans les variables d'environnement Vercel.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation minimale côté serveur.
    if (!data?.nom || !data?.email || !data?.message) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    // TODO: brancher l'envoi réel ici (voir commentaire ci-dessus).
    console.log("[contact] nouvelle demande reçue:", data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }
}
