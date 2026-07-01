import { SITE } from "@/lib/site";

export type DevisSim = { dataUrl: string; ratio: number }; // ratio = hauteur / largeur

export type DevisData = {
  numero: string;
  date: string;
  client: {
    prenom: string;
    nom: string;
    tel: string;
    email: string;
    adresse?: string;
  };
  dwelling: string; // "Maison individuelle" / "Appartement"
  model: {
    brand: string;
    name: string;
    type: string;
    ref?: string;
    powerKw: number;
    btu: number;
  };
  quantity: number;
  materialUnit: number;
  poseUnit: number;
  cableRouting: string;
  condensate: string;
  tvaRate: number;
  interiorSim?: DevisSim;
  exteriorSim?: DevisSim;
};

const eur = (n: number) =>
  n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";

const M = 18;
const W = 210;

export async function generateDevisPdf(d: DevisData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ───────── En-tête ─────────
  doc.setFillColor(10, 11, 13);
  doc.rect(0, 0, W, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("GROUPE OBSIDIAN", M, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 185, 192);
  doc.text("Climatisation résidentielle — Pompe à chaleur air / air", M, 21);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("DEVIS", W - M, 14, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 185, 192);
  doc.text(`N° ${d.numero}`, W - M, 20, { align: "right" });
  doc.text(`Date : ${d.date}`, W - M, 25, { align: "right" });

  let y = 44;
  doc.setTextColor(30, 30, 30);

  // ───────── Émetteur / Client ─────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ÉMETTEUR", M, y);
  doc.text("CLIENT", W / 2 + 4, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const emitter = [
    SITE.name,
    SITE.contact.address,
    `Tél : ${SITE.contact.phone}`,
    SITE.contact.email,
    "SIRET : ⚠ à compléter",
    "Attestation fluides frigorigènes : ⚠ à compléter",
  ];
  const client = [
    `${d.client.prenom} ${d.client.nom}`.trim(),
    d.client.adresse || "",
    `Tél : ${d.client.tel}`,
    d.client.email,
  ].filter(Boolean);
  let ey = y + 5.5;
  emitter.forEach((l) => {
    doc.text(l, M, ey);
    ey += 4.6;
  });
  let cy = y + 5.5;
  client.forEach((l) => {
    doc.text(l, W / 2 + 4, cy);
    cy += 4.6;
  });
  y = Math.max(ey, cy) + 6;

  // ───────── Contexte ─────────
  doc.setDrawColor(220, 222, 226);
  doc.setFillColor(245, 246, 248);
  doc.rect(M, y, W - 2 * M, 26, "F");
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(`${d.model.brand} ${d.model.name}`, M + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.6);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `Type : ${d.model.type}  •  Puissance : ${d.model.powerKw} kW (~${d.model.btu} BTU)  •  Quantité : ${d.quantity}` +
      (d.model.ref ? `  •  Réf. : ${d.model.ref}` : ""),
    M + 4,
    y + 12.5
  );
  doc.text(`Logement : ${d.dwelling}`, M + 4, y + 17.5);
  doc.text(
    `Passage des câbles : ${d.cableRouting}   •   Condensats : ${d.condensate}`,
    M + 4,
    y + 22.5
  );
  y += 34;

  // ───────── Tableau ─────────
  const col = { qte: 122, pu: 152, tot: W - M };
  doc.setFillColor(10, 11, 13);
  doc.rect(M, y, W - 2 * M, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("DÉSIGNATION", M + 2, y + 5.4);
  doc.text("QTÉ", col.qte, y + 5.4, { align: "center" });
  doc.text("PU TTC", col.pu, y + 5.4, { align: "right" });
  doc.text("TOTAL TTC", col.tot - 2, y + 5.4, { align: "right" });
  y += 8;

  const rows = [
    {
      label: "Fourniture climatiseur — unité intérieure + groupe extérieur",
      sub: `${d.model.brand} ${d.model.name}${d.model.ref ? " (réf. " + d.model.ref + ")" : ""}`,
      qte: d.quantity,
      pu: d.materialUnit,
    },
    {
      label: "Forfait pose & mise en service",
      sub: "Main d'œuvre, liaisons frigorifiques, câblage de liaison, fixations, accessoires, mise en service",
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
    doc.text(r.label, M + 2, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.6);
    doc.setTextColor(120, 120, 120);
    doc.text(r.sub, M + 2, y + 10, { maxWidth: col.qte - M - 6 });
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.text(String(r.qte), col.qte, y + 7.5, { align: "center" });
    doc.text(eur(r.pu), col.pu, y + 7.5, { align: "right" });
    doc.text(eur(r.pu * r.qte), col.tot - 2, y + 7.5, { align: "right" });
    y += h;
    doc.setDrawColor(228, 230, 234);
    doc.line(M, y, W - M, y);
  });

  // ───────── Totaux HT / TVA / TTC ─────────
  const ttc = rows.reduce((s, r) => s + r.pu * r.qte, 0);
  const ht = ttc / (1 + d.tvaRate);
  const tva = ttc - ht;
  y += 6;
  const rightLabel = (label: string, val: string, bold = false, size = 9) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(bold ? 10 : 70, bold ? 11 : 70, bold ? 13 : 70);
    doc.text(label, col.pu, y, { align: "right" });
    doc.text(val, col.tot - 2, y, { align: "right" });
    y += bold ? 7 : 5.4;
  };
  rightLabel("Total HT", eur(ht));
  rightLabel(`TVA ${Math.round(d.tvaRate * 100)} %`, eur(tva));
  rightLabel("TOTAL TTC", eur(ttc), true, 11);

  // ───────── Prestations incluses ─────────
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text("Prestations incluses dans le forfait", M, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.9);
  doc.setTextColor(95, 95, 95);
  const inclus = [
    "Pose de l'unité intérieure et du groupe extérieur, fixations et supports",
    "Liaisons frigorifiques (cuivre), câblage électrique de liaison, tirage au vide et contrôle d'étanchéité",
    `Passage des câbles : ${d.cableRouting}`,
    `Évacuation des condensats : ${d.condensate}`,
    "Mise en service, réglages et remise en main",
  ];
  inclus.forEach((l) => {
    doc.text("•", M, y);
    doc.text(l, M + 4, y, { maxWidth: W - 2 * M - 4 });
    y += 4.6;
  });

  // ───────── Mentions / conformité ─────────
  y += 3;
  doc.setDrawColor(220, 222, 226);
  doc.line(M, y, W - M, y);
  y += 5;
  doc.setFontSize(7.2);
  doc.setTextColor(115, 115, 115);
  const notes = [
    "Installation réalisée selon les règles de l'art ; manipulation des fluides frigorigènes par personnel attesté.",
    "Sous réserve d'une alimentation électrique conforme et disponible, et de conditions d'accès validées en visite technique.",
    "Devis estimatif établi à partir de la configuration en ligne ; les montants seront confirmés après visite technique sur site.",
    "Prix en euros, TVA incluse. Validité : 30 jours. Ce document ne vaut pas bon de commande.",
    "⚠ À compléter : mentions légales, SIRET, assurance décennale, attestation fluides frigorigènes, conditions générales de vente.",
  ];
  notes.forEach((l) => {
    doc.text(l, M, y, { maxWidth: W - 2 * M });
    y += 4;
  });

  footer(doc);

  // ───────── Page 2 : simulations photo ─────────
  if (d.interiorSim || d.exteriorSim) {
    doc.addPage();
    doc.setFillColor(10, 11, 13);
    doc.rect(0, 0, W, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Simulation d'implantation", M, 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(180, 185, 192);
    doc.text("Visuels indicatifs", W - M, 13, { align: "right" });

    let py = 30;
    const contentW = W - 2 * M;
    const maxH = 110;

    const drawSim = (title: string, sim?: DevisSim) => {
      if (!sim) return;
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(title, M, py);
      py += 3;
      let imgW = contentW;
      let imgH = imgW * sim.ratio;
      if (imgH > maxH) {
        imgH = maxH;
        imgW = imgH / sim.ratio;
      }
      const x = M + (contentW - imgW) / 2;
      try {
        doc.addImage(sim.dataUrl, "JPEG", x, py + 2, imgW, imgH);
      } catch {}
      py += imgH + 12;
    };

    drawSim("Unité intérieure", d.interiorSim);
    drawSim("Unité extérieure — emplacement", d.exteriorSim);

    doc.setFontSize(7.4);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Ces visuels sont une projection indicative destinée à faciliter le repérage ; l'implantation définitive est validée lors de la visite technique.",
      M,
      Math.min(py, 280),
      { maxWidth: W - 2 * M }
    );
    footer(doc);
  }

  doc.save(`devis-obsidian-${d.numero}.pdf`);
}

function footer(doc: import("jspdf").jsPDF) {
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 140);
  doc.text(
    `${SITE.name}  •  ${SITE.contact.phone}  •  ${SITE.contact.email}`,
    W / 2,
    289,
    { align: "center" }
  );
}
