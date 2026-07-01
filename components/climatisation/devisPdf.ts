import { SITE, LEGAL } from "@/lib/site";

export type DevisSim = { dataUrl: string; ratio: number };

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
  dwelling: string;
  model: {
    brand: string;
    name: string;
    type: string;
    ref?: string;
    powerKw: number;
    btu: number;
  };
  nbSplits: number;
  nbGroupes: number;
  materialUnit: number; // TTC
  poseUnit: number; // TTC
  cableRouting: string;
  condensate: string;
  usage?: string;
  rooms?: { name: string; surface?: number }[];
  tvaRate: number;
  sims?: { title: string; sim: DevisSim }[];
};

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
  " €";

const M = 16;
const W = 210;
const COL = { qte: 118, pu: 150, tot: W - M };

function head(doc: import("jspdf").jsPDF, d: DevisData) {
  doc.setFillColor(10, 11, 13);
  doc.rect(0, 0, W, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("GROUPE OBSIDIAN", M, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.6);
  doc.setTextColor(180, 185, 192);
  doc.text(LEGAL.activity, M, 18.5);
  doc.text(
    `${SITE.contact.address}  •  Tél. ${SITE.contact.phone}  •  ${SITE.contact.email}`,
    M,
    23
  );
  doc.text(
    `${LEGAL.form}  •  SIRET ${LEGAL.siret}  •  TVA ${LEGAL.tva}  •  ${LEGAL.rcs}  •  ${LEGAL.ape}`,
    M,
    27
  );
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`DEVIS ${d.numero}`, W - M, 13, { align: "right" });
}

function foot(doc: import("jspdf").jsPDF) {
  doc.setFontSize(6.8);
  doc.setTextColor(140, 140, 140);
  doc.text(
    `${SITE.name} • ${SITE.contact.address} • SIRET ${LEGAL.siret} • ${SITE.contact.email}`,
    W / 2,
    290,
    { align: "center" }
  );
}

export async function generateDevisPdf(d: DevisData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  head(doc, d);

  let y = 38;
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("DEVIS DÉTAILLÉ", M, y);
  y += 6;

  // Bloc n° / date / client
  doc.setFontSize(8.4);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  doc.text(`Devis n° : ${d.numero}`, M, y);
  doc.text(`Date : ${d.date}`, M, y + 4.5);
  doc.text(`Validité : ${LEGAL.devisValidity}`, M, y + 9);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("CLIENT", W / 2 + 6, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  const cl = [
    `${d.client.prenom} ${d.client.nom}`.trim(),
    d.client.adresse || "",
    `Tél. : ${d.client.tel}`,
    d.client.email,
  ].filter(Boolean);
  let cy = y + 4.5;
  cl.forEach((l) => {
    doc.text(l, W / 2 + 6, cy);
    cy += 4.5;
  });
  y = Math.max(y + 13, cy) + 4;

  // Objet des travaux
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text("Objet des travaux", M, y);
  y += 4.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(85, 85, 85);
  const roomsTxt = (d.rooms ?? [])
    .filter((r) => r.name || r.surface)
    .map(
      (r, i) =>
        `${r.name?.trim() || "Pièce " + (i + 1)}${r.surface ? " ~" + r.surface + " m²" : ""}`
    )
    .join(", ");
  const objet =
    `Fourniture et installation d'une pompe à chaleur air/air réversible${d.usage ? " (" + d.usage.toLowerCase() + ")" : " (chauffage et climatisation)"} pour ${d.dwelling.toLowerCase()}, ` +
    `en configuration ${d.nbGroupes} groupe(s) extérieur(s) / ${d.nbSplits} unité(s) intérieure(s), marque ${d.model.brand} (modèle ${d.model.name}` +
    `${d.model.ref ? ", réf. " + d.model.ref : ""})` +
    `${roomsTxt ? ". Pièces à traiter : " + roomsTxt : ""}. Passage et raccordement des liaisons frigorifiques et électriques, ` +
    `évacuation des condensats (${d.condensate.toLowerCase()}), passage des câbles (${d.cableRouting.toLowerCase()}), ` +
    `tirage au vide, contrôle d'étanchéité, mise en service et essais.`;
  const objetLines = doc.splitTextToSize(objet, W - 2 * M);
  doc.text(objetLines, M, y);
  y += objetLines.length * 3.7 + 4;

  // ── Tableau (LOTS) ──
  const tableHead = () => {
    doc.setFillColor(10, 11, 13);
    doc.rect(M, y, W - 2 * M, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.text("DÉSIGNATION", M + 2, y + 4.7);
    doc.text("QTÉ", COL.qte, y + 4.7, { align: "center" });
    doc.text("P.U. TTC", COL.pu, y + 4.7, { align: "right" });
    doc.text("MONTANT TTC", COL.tot - 2, y + 4.7, { align: "right" });
    y += 7;
  };
  const lot = (title: string) => {
    doc.setFillColor(232, 235, 239);
    doc.rect(M, y, W - 2 * M, 6, "F");
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.text(title, M + 2, y + 4);
    y += 6;
  };
  const item = (
    label: string,
    sub: string,
    qte: number,
    pu: number
  ) => {
    const h = 12;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.4);
    doc.text(label, M + 2, y + 5, { maxWidth: COL.qte - M - 6 });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(sub, M + 2, y + 9, { maxWidth: COL.qte - M - 6 });
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(8.4);
    doc.text(String(qte), COL.qte, y + 6.5, { align: "center" });
    doc.text(eur(pu), COL.pu, y + 6.5, { align: "right" });
    doc.text(eur(pu * qte), COL.tot - 2, y + 6.5, { align: "right" });
    y += h;
    doc.setDrawColor(228, 230, 234);
    doc.line(M, y, W - M, y);
  };

  tableHead();
  lot("LOT 1 — ÉQUIPEMENTS (fourniture)");
  item(
    `Ensemble climatisation ${d.model.brand} ${d.model.name}`,
    `${d.nbSplits} unité(s) intérieure(s) + ${d.nbGroupes} groupe(s) extérieur(s) • ${d.model.powerKw} kW`,
    d.nbSplits,
    d.materialUnit
  );
  lot("LOT 2 — POSE, RACCORDEMENTS & MISE EN SERVICE");
  item(
    "Forfait pose & mise en service (par unité intérieure)",
    "Liaisons frigorifiques, câblage, fixations, accessoires, tirage au vide, contrôle d'étanchéité, essais",
    d.nbSplits,
    d.poseUnit
  );

  // Totaux
  const ttc = d.materialUnit * d.nbSplits + d.poseUnit * d.nbSplits;
  const ht = ttc / (1 + d.tvaRate);
  const tva = ttc - ht;
  y += 5;
  const right = (label: string, val: string, bold = false, size = 8.6) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(bold ? 10 : 70, bold ? 11 : 70, bold ? 13 : 70);
    doc.text(label, COL.pu, y, { align: "right" });
    doc.text(val, COL.tot - 2, y, { align: "right" });
    y += bold ? 6.5 : 5;
  };
  right("Total HT", eur(ht));
  right(`TVA ${Math.round(d.tvaRate * 100)} %`, eur(tva));
  right("TOTAL TTC", eur(ttc), true, 10.5);

  // Prestations incluses
  y += 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.4);
  doc.setTextColor(40, 40, 40);
  doc.text("Prestations incluses (clé en main)", M, y);
  y += 4.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.4);
  doc.setTextColor(95, 95, 95);
  [
    "Étude technique, dimensionnement et implantation ; pose des unités intérieures et des groupes extérieurs",
    "Liaisons frigorifiques (cuivre), câblage de liaison, raccordements électriques dédiés, fixations et supports",
    `Passage des câbles : ${d.cableRouting} • Évacuation des condensats : ${d.condensate}`,
    "Tirage au vide, contrôle d'étanchéité, charge fluide R32, mise en service, réglages et essais",
  ].forEach((l) => {
    doc.text("•", M, y);
    const lines = doc.splitTextToSize(l, W - 2 * M - 4);
    doc.text(lines, M + 4, y);
    y += lines.length * 3.6 + 0.8;
  });

  // Échéancier + Qualifications (deux colonnes)
  y += 3;
  doc.setDrawColor(220, 222, 226);
  doc.line(M, y, W - M, y);
  y += 4.5;
  const colY = y;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(40, 40, 40);
  doc.text("Échéancier de paiement", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.4);
  doc.setTextColor(90, 90, 90);
  doc.text("• À la commande : aucun acompte demandé", M, y + 4.5, {
    maxWidth: W / 2 - M,
  });
  doc.text("• À la réception des travaux (100 %)", M, y + 8.5, {
    maxWidth: W / 2 - M,
  });

  let qy = colY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(40, 40, 40);
  doc.text("Intervenants & qualifications", W / 2 + 4, qy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(90, 90, 90);
  qy += 4.5;
  const quals = [
    `Suivi de chantier : ${LEGAL.projectContact} (${LEGAL.projectPhone})`,
    `Fluides frigorigènes : ${LEGAL.fluidesAttestation}`,
  ];
  quals.forEach((q) => {
    const lines = doc.splitTextToSize(q, W / 2 - 6);
    doc.text(lines, W / 2 + 4, qy);
    qy += lines.length * 3.4 + 0.6;
  });

  y = Math.max(y + 12, qy) + 3;

  // Mentions
  doc.setDrawColor(220, 222, 226);
  doc.line(M, y, W - M, y);
  y += 4;
  doc.setFontSize(6.8);
  doc.setTextColor(115, 115, 115);
  [
    d.tvaRate < 0.15
      ? "Montant clé en main (fourniture, pose et mise en service incluses). TVA 10 % — travaux d'amélioration d'un logement achevé depuis plus de 2 ans, sous réserve de la remise de l'attestation de TVA."
      : "Montant clé en main (fourniture, pose et mise en service incluses). TVA 20 % (logement neuf ou achevé depuis moins de 2 ans).",
    "Devis estimatif établi à partir de votre configuration en ligne ; les montants et l'implantation définitive sont confirmés après visite technique sur site. Ce document ne vaut pas bon de commande.",
    "Vos données ne sont ni conservées, ni revendues, ni exploitées : elles servent uniquement au traitement de votre demande (rappel, étude, devis).",
    "⚠ À compléter/valider : assurance décennale, CGV.",
  ].forEach((l) => {
    const lines = doc.splitTextToSize(l, W - 2 * M);
    doc.text(lines, M, y);
    y += lines.length * 3.1 + 0.6;
  });

  foot(doc);

  // ── Pages simulations (par pièce / groupe) ──
  const sims = d.sims ?? [];
  if (sims.length) {
    const maxH = 108;
    const contentW = W - 2 * M;
    let py = 999;
    let first = true;
    const newPage = () => {
      doc.addPage();
      doc.setFillColor(10, 11, 13);
      doc.rect(0, 0, W, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Simulation d'implantation", M, 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 185, 192);
      doc.text(`Devis ${d.numero} — visuels indicatifs`, W - M, 12, {
        align: "right",
      });
      foot(doc);
      py = 28;
    };
    for (const it of sims) {
      let imgW = contentW;
      let imgH = imgW * it.sim.ratio;
      if (imgH > maxH) {
        imgH = maxH;
        imgW = imgH / it.sim.ratio;
      }
      const blockH = imgH + 13;
      if (first || py + blockH > 280) {
        newPage();
        first = false;
      }
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(it.title, M, py);
      const x = M + (contentW - imgW) / 2;
      try {
        doc.addImage(it.sim.dataUrl, "JPEG", x, py + 3, imgW, imgH);
      } catch {}
      py += blockH;
    }
  }

  doc.save(`devis-obsidian-${d.numero}.pdf`);
}
