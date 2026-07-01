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
    // TODO: envoyer un email à l'équipe avec data (client + configuration + devis).
    console.log("[devis] nouvelle demande:", data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }
}
