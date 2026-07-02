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
    gamme: string; // nom de gamme (sans référence technique)
    type: string;
  };
  nbSplits: number;
  nbGroupes: number;
  unitPrice: number; // TTC par unité intérieure
  extraGroupPrice: number; // TTC par groupe extérieur supplémentaire
  cableRouting: string;
  condensate: string;
  usage?: string;
  rooms?: { name: string; surface?: number; powerKw?: number }[];
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
    .filter((r) => r.name || r.surface || r.powerKw)
    .map(
      (r, i) =>
        `${r.name?.trim() || "Pièce " + (i + 1)}${r.surface ? " ~" + r.surface + " m²" : ""}${r.powerKw ? " (" + r.powerKw + " kW)" : ""}`
    )
    .join(", ");
  const objet =
    `Fourniture et installation d'une pompe à chaleur air/air réversible${d.usage ? " (" + d.usage.toLowerCase() + ")" : " (chauffage et climatisation)"} pour ${d.dwelling.toLowerCase()}, ` +
    `en configuration ${d.nbGroupes} groupe(s) extérieur(s) / ${d.nbSplits} unité(s) intérieure(s), gamme ${d.model.brand} ${d.model.gamme}` +
    `${roomsTxt ? ". Pièces à traiter : " + roomsTxt : ""}. Puissances dimensionnées selon la surface et l'isolation de chaque pièce. ` +
    `Passage et raccordement des liaisons frigorifiques et électriques, ` +
    `évacuation des condensats (${d.condensate.toLowerCase()}), passage des câbles (${d.cableRouting.toLowerCase()}), ` +
    `tirage au vide, contrôle d'étanchéité, mise en service et essais.`;
  const objetLines = doc.splitTextToSize(objet, W - 2 * M);
  doc.text(objetLines, M, y);
  y += objetLines.length * 3.7 + 4;

  // ── Tableau détaillé (LOTS) ──
  const BOTTOM = 276;
  const nbS = Math.max(1, d.nbSplits);
  const nbG = Math.max(1, d.nbGroupes);
  const ttc = Math.round(
    d.unitPrice * d.nbSplits + d.extraGroupPrice * Math.max(0, d.nbGroupes - 1)
  );
  const ht = ttc / (1 + d.tvaRate);
  const tva = ttc - ht;
  const A = (w: number) => Math.round(ht * w * 100) / 100; // montant HT d'un poids

  const drawHeadRow = () => {
    doc.setFillColor(10, 11, 13);
    doc.rect(M, y, W - 2 * M, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.text("DÉSIGNATION", M + 2, y + 4.7);
    doc.text("QTÉ", COL.qte, y + 4.7, { align: "center" });
    doc.text("P.U. HT", COL.pu, y + 4.7, { align: "right" });
    doc.text("MONTANT HT", COL.tot - 2, y + 4.7, { align: "right" });
    y += 7;
  };
  const contPage = () => {
    doc.addPage();
    doc.setFillColor(10, 11, 13);
    doc.rect(0, 0, W, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("GROUPE OBSIDIAN", M, 9.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(180, 185, 192);
    doc.text(`Devis ${d.numero} — suite`, W - M, 9.5, { align: "right" });
    foot(doc);
    y = 22;
    drawHeadRow();
  };
  const ensure = (h: number) => {
    if (y + h > BOTTOM) contPage();
  };
  const lot = (title: string) => {
    ensure(9);
    doc.setFillColor(232, 235, 239);
    doc.rect(M, y, W - 2 * M, 6, "F");
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.text(title, M + 2, y + 4);
    y += 6;
  };
  const item = (label: string, qte: number, pu: number, twoLine = false) => {
    const h = twoLine ? 9 : 6.5;
    ensure(h);
    doc.setTextColor(45, 45, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.9);
    const lines = doc.splitTextToSize(label, COL.qte - M - 8);
    doc.text(lines, M + 2, y + 4);
    doc.text(String(qte), COL.qte, y + 4, { align: "center" });
    doc.text(eur(pu), COL.pu, y + 4, { align: "right" });
    doc.text(eur(pu * qte), COL.tot - 2, y + 4, { align: "right" });
    y += Math.max(h, lines.length * 3.4 + 2.5);
    doc.setDrawColor(232, 234, 238);
    doc.line(M, y, W - M, y);
  };
  const subtotal = (label: string, amount: number) => {
    ensure(6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.6);
    doc.setTextColor(60, 60, 60);
    doc.text(label, COL.pu, y + 4, { align: "right" });
    doc.text(eur(amount), COL.tot - 2, y + 4, { align: "right" });
    y += 6;
  };

  drawHeadRow();

  // LOT 1 — Équipements
  lot("LOT 1 — ÉQUIPEMENTS PAC AIR/AIR (fourniture)");
  const perUnit = A(0.25) / nbS;
  const perGroup = A(0.18) / nbG;
  item(
    `Groupe(s) extérieur(s) ${d.model.brand} multi-split (R32)`,
    d.nbGroupes,
    perGroup
  );
  const rooms = d.rooms ?? [];
  for (let i = 0; i < nbS; i++) {
    const r = rooms[i];
    const room = r?.name?.trim() || `Pièce ${i + 1}`;
    const pw = r?.powerKw ? ` — ${r.powerKw} kW` : "";
    item(`Unité intérieure ${d.model.brand} ${d.model.gamme}${pw} — ${room}`, 1, perUnit);
  }
  item("Équerres / supports de fixation + plots antivibratiles", 1, A(0.03));
  subtotal("Sous-total LOT 1", A(0.46));

  // LOT 2 — Liaisons frigorifiques
  lot("LOT 2 — LIAISONS FRIGORIFIQUES (fourniture)");
  item("Liaisons frigorifiques cuivre pré-isolé + isolation (par unité)", nbS, A(0.05) / nbS);
  item("Raccords, dudgeons et accessoires frigorifiques", nbG, A(0.02) / nbG);
  subtotal("Sous-total LOT 2", A(0.07));

  // LOT 3 — Réseau électrique
  lot("LOT 3 — RÉSEAU ÉLECTRIQUE ET RÉGULATION (fourniture)");
  item("Câbles de liaison / commande et d'alimentation", nbS, A(0.035) / nbS);
  item("Disjoncteur dédié + protection différentielle au tableau", nbG, A(0.015) / nbG);
  item("Goulottes PVC et fourreaux de cheminement", 1, A(0.01));
  subtotal("Sous-total LOT 3", A(0.06));

  // LOT 4 — Condensats
  lot("LOT 4 — ÉVACUATION DES CONDENSATS (fourniture)");
  item(`Évacuation des condensats (${d.condensate.toLowerCase()}), tubes et accessoires`, 1, A(0.04));
  subtotal("Sous-total LOT 4", A(0.04));

  // LOT 5 — Main d'œuvre
  lot("LOT 5 — MAIN-D'ŒUVRE ET PRESTATIONS DE POSE");
  item("Étude technique, dimensionnement et implantation", 1, A(0.03));
  item("Pose et fixation des groupes extérieurs", nbG, A(0.05) / nbG);
  item("Pose et fixation des unités intérieures", nbS, A(0.08) / nbS);
  item("Perçages, carottages, traversées et cheminement des liaisons", 1, A(0.06));
  item("Raccordements frigorifiques et électriques (dudgeonnage, ligne dédiée)", 1, A(0.05));
  item("Tirage au vide, contrôle d'étanchéité, charge R32, mise en service et essais", 1, A(0.04), true);
  subtotal("Sous-total LOT 5", A(0.31));

  // LOT 6 — Prestations complémentaires
  lot("LOT 6 — PRESTATIONS COMPLÉMENTAIRES");
  item("Déplacements et acheminement du matériel", 1, A(0.035));
  item("PV de mise en service, attestation fluides frigorigènes, dossier remis", 1, A(0.025), true);
  subtotal("Sous-total LOT 6", A(0.06));

  // Totaux
  ensure(24);
  y += 3;
  const right = (label: string, val: string, bold = false, size = 8.6) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(bold ? 10 : 70, bold ? 11 : 70, bold ? 13 : 70);
    doc.text(label, COL.pu, y, { align: "right" });
    doc.text(val, COL.tot - 2, y, { align: "right" });
    y += bold ? 6.5 : 5;
  };
  right("Sous-total travaux HT", eur(ht));
  right("Total HT", eur(ht));
  right(`TVA ${Math.round(d.tvaRate * 100)} %`, eur(tva));
  right("TOTAL TTC", eur(ttc), true, 10.5);
  y += 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Montant clé en main, fourni-posé : matériel, pose et mise en service inclus.",
    M,
    y
  );
  y += 4;

  // Échéancier + Qualifications (deux colonnes)
  ensure(40);
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
  ensure(28);
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

  const filename = `devis-obsidian-${d.numero}.pdf`;
  doc.save(filename);
  // base64 (sans le préfixe data:) pour l'envoi email en pièce jointe.
  const dataUri = doc.output("datauristring");
  const base64 = dataUri.split(",")[1] ?? "";
  return { filename, base64 };
}
