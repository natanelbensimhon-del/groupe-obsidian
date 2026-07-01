import { NextResponse } from "next/server";

/**
 * Réception des demandes de devis climatisation (le client télécharge son PDF ;
 * on capte ici ses coordonnées + sa configuration pour le rappeler).
 *
 * ⚠️ À BRANCHER : aujourd'hui on valide et on journalise, sans envoi d'email.
 * Branchez Resend (ou autre) ici — voir app/api/contact/route.ts pour le modèle.
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
    // RGPD : on ne journalise PAS les données personnelles. Une fois branché,
    // l'endpoint doit uniquement TRANSMETTRE la demande par email à l'équipe
    // (Resend/…) sans stockage durable.
    // TODO: envoyer l'email à l'équipe puis ne rien persister.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }
}
