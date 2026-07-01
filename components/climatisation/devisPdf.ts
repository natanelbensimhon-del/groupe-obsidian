import { SITE } from "@/lib/site";

export type DevisData = {
  numero: string;
  date: string; // ex "01/07/2026"
  client: {
    prenom: string;
    nom: string;
    tel: string;
    email: string;
    adresse?: string;
  };
  model: {
    brand: string;
    name: string;
    type: string;
    ref?: string;
    powerKw: number;
    btu: number;
  };
  quantity: number;
  materialUnit: number; // prix public unitaire matériel
  poseUnit: number; // prix pose unitaire (TTC)
  cableRouting: string; // libellé passage câbles
};

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " €";

/**
 * Génère et télécharge un devis PDF (jsPDF importé dynamiquement).
 * Rendu sobre noir & blanc, cohérent avec l'image Groupe Obsidian.
 */
export async function generateDevisPdf(d: DevisData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const M = 18; // marge
  const W = 210;
  let y = 0;

  // ── Bandeau d'en-tête ──
  doc.setFillColor(10, 11, 13);
  doc.rect(0, 0, W, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("GROUPE OBSIDIAN", M, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 185, 192);
  doc.text("Climatisation résidentielle", M, 21);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("DEVIS ESTIMATIF", W - M, 14, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 185, 192);
  doc.text(`N° ${d.numero}`, W - M, 20, { align: "right" });
  doc.text(`Date : ${d.date}`, W - M, 25, { align: "right" });

  y = 46;
  doc.setTextColor(30, 30, 30);

  // ── Émetteur / Client (deux colonnes) ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ÉMETTEUR", M, y);
  doc.text("CLIENT", W / 2 + 4, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);

  const emitter = [
    SITE.name,
    SITE.contact.address,
    `Tél : ${SITE.contact.phone}`,
    SITE.contact.email,
    "SIRET : ⚠ à compléter",
  ];
  const client = [
    `${d.client.prenom} ${d.client.nom}`.trim(),
    d.client.adresse || "",
    `Tél : ${d.client.tel}`,
    d.client.email,
  ].filter(Boolean);

  let ey = y + 6;
  emitter.forEach((l) => {
    doc.text(l, M, ey);
    ey += 5;
  });
  let cy = y + 6;
  client.forEach((l) => {
    doc.text(l, W / 2 + 4, cy);
    cy += 5;
  });

  y = Math.max(ey, cy) + 8;

  // ── Récap configuration ──
  doc.setDrawColor(220, 222, 226);
  doc.setFillColor(245, 246, 248);
  doc.rect(M, y, W - 2 * M, 20, "F");
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(`${d.model.brand} ${d.model.name}`, M + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.8);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `Type : ${d.model.type}   •   Puissance : ${d.model.powerKw} kW (~${d.model.btu} BTU)   •   Quantité : ${d.quantity}` +
      (d.model.ref ? `   •   Réf. : ${d.model.ref}` : ""),
    M + 4,
    y + 13
  );
  doc.text(`Passage des câbles : ${d.cableRouting}`, M + 4, y + 17.5);

  y += 30;

  // ── Tableau des prestations ──
  const colX = { des: M, qte: 128, pu: 150, tot: W - M };
  doc.setFillColor(10, 11, 13);
  doc.rect(M, y, W - 2 * M, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("DÉSIGNATION", colX.des + 2, y + 5.4);
  doc.text("QTÉ", colX.qte, y + 5.4, { align: "center" });
  doc.text("PU TTC", colX.pu, y + 5.4, { align: "right" });
  doc.text("TOTAL TTC", colX.tot - 2, y + 5.4, { align: "right" });
  y += 8;

  const rows = [
    {
      label: `Fourniture climatiseur ${d.model.brand} ${d.model.name}`,
      sub: "Unité intérieure + unité extérieure",
      qte: d.quantity,
      pu: d.materialUnit,
    },
    {
      label: "Forfait pose & mise en service",
      sub: "Main d'œuvre, liaisons frigorifiques, accessoires et fixations inclus",
      qte: d.quantity,
      pu: d.poseUnit,
    },
  ];

  doc.setTextColor(40, 40, 40);
  rows.forEach((r, i) => {
    const h = 13;
    if (i % 2 === 1) {
      doc.setFillColor(247, 248, 250);
      doc.rect(M, y, W - 2 * M, h, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(r.label, colX.des + 2, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(120, 120, 120);
    doc.text(r.sub, colX.des + 2, y + 10);
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.text(String(r.qte), colX.qte, y + 7, { align: "center" });
    doc.text(eur(r.pu), colX.pu, y + 7, { align: "right" });
    doc.text(eur(r.pu * r.qte), colX.tot - 2, y + 7, { align: "right" });
    y += h;
    doc.setDrawColor(228, 230, 234);
    doc.line(M, y, W - M, y);
  });

  // ── Total ──
  const total = rows.reduce((s, r) => s + r.pu * r.qte, 0);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 11, 13);
  doc.text("TOTAL ESTIMATIF TTC", colX.pu, y, { align: "right" });
  doc.text(eur(total), colX.tot - 2, y, { align: "right" });

  // ── Mentions ──
  y += 12;
  doc.setDrawColor(220, 222, 226);
  doc.line(M, y, W - M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.6);
  doc.setTextColor(110, 110, 110);
  const notes = [
    "Devis estimatif sans engagement, établi à partir de votre configuration en ligne. Les montants sont indicatifs et",
    "seront confirmés après une visite technique sur site (accessibilité, distances de liaison, support, alimentation",
    "électrique). Prix exprimés TTC. Validité : 30 jours. Ce document ne vaut pas bon de commande.",
    "⚠ À compléter : mentions légales, SIRET, assurance décennale, conditions générales de vente.",
  ];
  notes.forEach((l) => {
    doc.text(l, M, y);
    y += 4.2;
  });

  // ── Pied de page ──
  doc.setDrawColor(10, 11, 13);
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 140);
  doc.text(
    `${SITE.name}  •  ${SITE.contact.phone}  •  ${SITE.contact.email}`,
    W / 2,
    287,
    { align: "center" }
  );

  doc.save(`devis-obsidian-${d.numero}.pdf`);
}
