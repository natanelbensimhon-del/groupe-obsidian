// ──────────────────────────────────────────────────────────────────────────
// Guide de compatibilité — quels climatiseurs / PAC vont avec quelle taille de
// cache. Données techniques reproduites depuis la table de compatibilité
// fabricant (dimensions constructeur = faits). Aucune marque de fournisseur :
// contenu présenté sous la marque Groupe Obsidian.
//
// Chaque ligne : modèle(s), dimensions constructeur (H × L × P mm), taille de
// cache recommandée.
// ──────────────────────────────────────────────────────────────────────────

export type CompatRow = { modele: string; dimensions: string; taille: string };
export type CompatMarque = { marque: string; lignes: CompatRow[] };

export const COMPAT_EXTERIEUR: CompatMarque[] = [
  {
    marque: "Mitsubishi Electric",
    lignes: [
      { modele: "SUZ SW M40 Ecodan 4 Inverter", dimensions: "880 × 840 × 330", taille: "L" },
      { modele: "MSZ-HR R32 UE 2,5/3,5 kW · MSZ-BT UE 3,5/2,5/2 kW", dimensions: "538 × 699 × 249", taille: "S" },
      { modele: "MXZ3-HA50VF 5 kW · MXZ 6,8 kW", dimensions: "710 × 840 × 330", taille: "M" },
      { modele: "MXZ-2HA40VF 4 kW · MXZ 5,3/3,3 kW · MSZ-HR R32 UE 5/4,2 kW · MSZ-BT UE 5 kW · MSZ-EF UE 3,5/2,5/4,2 kW", dimensions: "550 × 800 × 285", taille: "S" },
      { modele: "MXZ 8,3 kW", dimensions: "796 × 950 × 330", taille: "M" },
      { modele: "MSZ-EF UE 5 kW", dimensions: "714 × 800 × 285", taille: "M" },
    ],
  },
  {
    marque: "Daikin",
    lignes: [
      { modele: "Altherma air/eau 3 R : 4, 6 et 8 kW", dimensions: "740 × 884 × 388", taille: "M" },
      { modele: "MXM-N (8/9) air/air multi", dimensions: "550 × 765 × 285", taille: "S" },
      { modele: "MXM-N (8/9)", dimensions: "734 × 868 × 328", taille: "M" },
      { modele: "Ururu Sarara RXZ-N (3,6 – 6,3)", dimensions: "693 × 795 × 300", taille: "S" },
      { modele: "Emura 3 RXJ-A (2 / 2,5 / 3,4)", dimensions: "552 × 840 × 350", taille: "S" },
      { modele: "Emura 3 RXJ-A (4,2 / 5)", dimensions: "734 × 954 × 408", taille: "M" },
      { modele: "Stylish (2 / 2,5 / 3,5)", dimensions: "550 × 765 × 285", taille: "S" },
      { modele: "Stylish (4,2 / 5)", dimensions: "734 × 870 × 373", taille: "M" },
      { modele: "Perfera RXM (2,5 / 3,5)", dimensions: "552 × 840 × 350", taille: "S" },
      { modele: "Perfera RXM (5)", dimensions: "734 × 954 × 401", taille: "M" },
      { modele: "Perfera RXM-R (2 / 2,5 / 3,5)", dimensions: "550 × 765 × 285", taille: "S" },
      { modele: "Perfera RXM-R (4 / 5 / 6 / 7)", dimensions: "734 × 870 × 320", taille: "M" },
      { modele: "Perfera FTXM-R", dimensions: "550 × 765 × 285", taille: "S" },
      { modele: "Perfera FTXM-R", dimensions: "734 × 870 × 272/320", taille: "M" },
      { modele: "Perfera FVXM-A", dimensions: "552 × 840 × 350 · 551 × 847 × 356", taille: "S" },
      { modele: "Perfera FVXM-A", dimensions: "734 × 954 × 401", taille: "M" },
      { modele: "Gamme Stylish", dimensions: "550 × 765 × 285", taille: "S" },
      { modele: "Gamme Stylish", dimensions: "734 × 870 × 373", taille: "M" },
    ],
  },
  {
    marque: "Hitachi",
    lignes: [
      { modele: "Triple C R32 avec ECS Yutampo – RAM-53NYP3E & RAM-70NYP4E", dimensions: "800 × 850 × 298", taille: "M" },
      { modele: "Triple C R32 avec ECS Yutampo – RAM-90NYP5E", dimensions: "800 × 950 × 370", taille: "M" },
    ],
  },
  {
    marque: "Atlantic",
    lignes: [
      { modele: "Calypso Split", dimensions: "535 × 735 × 330", taille: "S" },
      { modele: "Alfea Extensa Duo 3, 5, 6 kW", dimensions: "632 × 886 × 353", taille: "S" },
      { modele: "Extensa Duo 8 kW", dimensions: "716 × 907 × 353", taille: "M" },
      { modele: "Extensa Duo +10", dimensions: "996 × 940 × 365", taille: "L" },
      { modele: "Alfea Excellia AI 11 à 16", dimensions: "1290 × 970 × 400", taille: "XXL" },
      { modele: "Excelia HP AI 16 à 17", dimensions: "1428 × 1080 × 482", taille: "XXL" },
      { modele: "Shogun unité extérieure gainable AOYG 24 KBTB.UE", dimensions: "716 × 820 × 315", taille: "M" },
      { modele: "Takao M1", dimensions: "541 × 663 × 290 · 641 × 663 × 290 · 632 × 799 × 290", taille: "S" },
      { modele: "Takao M2", dimensions: "541 × 663 × 290 · 542 × 799 × 290", taille: "S" },
      { modele: "Takao M3", dimensions: "542 × 799 × 290", taille: "S" },
      { modele: "Gamme Dojo", dimensions: "544 × 700 × 245 · 540 × 780 × 245 · 550 × 800 × 280", taille: "S" },
      { modele: "Gamme Zenkeo", dimensions: "553 × 800 × 275 · 614 × 820 × 338", taille: "S" },
      { modele: "Gamme Takao Line", dimensions: "541 × 663 × 290 · 542 × 799 × 290", taille: "S" },
    ],
  },
  {
    marque: "Saunier Duval",
    lignes: [
      { modele: "GeniaAir (5)", dimensions: "800 × 980 × 360", taille: "M" },
      { modele: "GeniaAir (8 & 11)", dimensions: "942 × 1103 × 415", taille: "M" },
      { modele: "GeniaAir (15)", dimensions: "1340 × 1103 × 415", taille: "XXL" },
      { modele: "GeniaAir Split 3 et 5 & GeniaAir Max (4, 5)", dimensions: "1340 × 1103 × 415", taille: "L" },
      { modele: "GeniaAir Split 7 & GeniaAir Max (8)", dimensions: "965 × 1100 × 450", taille: "L" },
      { modele: "GeniaAir Max (12, 15)", dimensions: "1565 × 1100 × 450", taille: "XXL" },
      { modele: "VivAir monosplit (2,5 / 3,5 / 5 / 6,5)", dimensions: "596 × 848 × 320", taille: "S" },
      { modele: "VivAir multisplit Bi-Split (4,4 / 5,4)", dimensions: "596 × 899 × 378", taille: "S" },
      { modele: "VivAir multisplit Tri & Quadri Split (8,5 / 9,5)", dimensions: "790 × 1003 × 427", taille: "L" },
    ],
  },
  {
    marque: "LG",
    lignes: [
      { modele: "KUSXB361A (condenseur ext., 36 000 BTU)", dimensions: "814 × 952 × 330", taille: "M" },
      { modele: "KUSXB181A (condenseur ext., 18 000 BTU)", dimensions: "480 × 750 × 330", taille: "S" },
      { modele: "LAU120HYV3 (12 000 BTU mini-split)", dimensions: "642 × 870 × 330", taille: "S" },
      { modele: "LMU24CHV (24 000 BTU Multi-Zone)", dimensions: "655 × 870 × 330", taille: "S" },
      { modele: "LMU300HHV (30 000 BTU Multi-Zone)", dimensions: "797 × 944 × 330", taille: "M" },
      { modele: "LSU180HEV1 (18 000 BTU Heat Pump)", dimensions: "546 × 288 × 310", taille: "S" },
    ],
  },
  {
    marque: "Panasonic",
    lignes: [
      { modele: "Aquarea bi-bloc monophasé Génération H (3, 5)", dimensions: "622 × 824 × 298", taille: "S" },
      { modele: "Aquarea bi-bloc monophasé Génération H (7, 9)", dimensions: "795 × 900 × 320", taille: "M" },
      { modele: "Aquarea bi-bloc mono. 12-16 kW · triphasé 9/12/16 Gén. H et F", dimensions: "1340 × 900 × 320", taille: "XXL" },
      { modele: "Aquarea monophasé Génération H 7 kW", dimensions: "1340 × 900 × 320", taille: "M" },
      { modele: "Aquarea Gén. H haute performance monobloc mono. (5, 7, 9)", dimensions: "865 × 1283 × 320", taille: "XL" },
      { modele: "Aquarea Gén. H T-CAP monobloc mono./tri. · Gén. G HT (9, 12)", dimensions: "1410 × 1283 × 320", taille: "XXL" },
      { modele: "Etherea Inverter (2 / 2,5 / 3,5)", dimensions: "542 × 780 × 289", taille: "S" },
      { modele: "Etherea Inverter (4 / 5 / 7)", dimensions: "619 × 824 × 299", taille: "S" },
      { modele: "Gamme TZ", dimensions: "542 × 780 × 289 · 619 × 824 × 299 · 695 × 875 × 320", taille: "S" },
      { modele: "Gamme CZ", dimensions: "622 × 824 × 299", taille: "S" },
      { modele: "Gamme BZ", dimensions: "542 × 780 × 289 · 619 × 824 × 299", taille: "S" },
      { modele: "Gamme Etherea Z", dimensions: "542 × 780 × 289 · 619 × 824 × 299", taille: "S" },
    ],
  },
  {
    marque: "Toshiba",
    lignes: [
      { modele: "Estia monophasé 4, 5", dimensions: "630 × 800 × 300", taille: "S" },
      { modele: "Estia monophasé 7, 5", dimensions: "890 × 900 × 320", taille: "L" },
      { modele: "Seiya monosplit (2,5 – 3,3 kW)", dimensions: "285 × 730 × 545", taille: "S" },
      { modele: "Gamme Yukai", dimensions: "530 × 660 × 240 · 550 × 780 × 290", taille: "S" },
      { modele: "Shorai +", dimensions: "550 × 780 × 290 · 630 × 800 × 300", taille: "S" },
      { modele: "Haori", dimensions: "550 × 780 × 290", taille: "S" },
    ],
  },
  {
    marque: "De Dietrich",
    lignes: [
      { modele: "Strateo & Alezio 4,5", dimensions: "880 × 921 × 360", taille: "L" },
      { modele: "Strateo & Alezio 6", dimensions: "630 × 871 × 360", taille: "M" },
      { modele: "Strateo & Alezio 8", dimensions: "943 × 950 × 370", taille: "L" },
      { modele: "Alezio 11 et 16", dimensions: "1350 × 950 × 370", taille: "XXL" },
    ],
  },
  {
    marque: "Bosch",
    lignes: [
      { modele: "Mono-split Climate 3000i R32 2,6 kW", dimensions: "495 × 720 × 270", taille: "S" },
      { modele: "Mono-split Climate 3000i R32 5,6 kW", dimensions: "554 × 805 × 330", taille: "S" },
    ],
  },
  {
    marque: "Frisquet",
    lignes: [
      { modele: "Module monophasé R32 8 kW", dimensions: "880 × 921 × 360", taille: "M" },
      { modele: "Module R32 monophasé 10/12/14 kW et triphasé 14 kW", dimensions: "790 × 920 × 370", taille: "M" },
    ],
  },
  {
    marque: "Vaillant",
    lignes: [
      { modele: "aroTHERM Split VWL 35/5 et 55/5", dimensions: "765 × 1100 × 450", taille: "L" },
      { modele: "aroTHERM Split VWL 75/5", dimensions: "965 × 1100 × 450", taille: "L" },
      { modele: "aroTHERM Split VWL 105/5, 125/5", dimensions: "1585 × 1100 × 450", taille: "XXL" },
      { modele: "GeniaAir Tek 4 & 6", dimensions: "702 × 975 × 396", taille: "L" },
      { modele: "GeniaAir Tek 8 & 10", dimensions: "787 × 982 × 427", taille: "L" },
    ],
  },
  {
    marque: "Hisense",
    lignes: [
      { modele: "Aldes T.One AquaAIR et T.One Air 04, 05, 06", dimensions: "800 × 640 × 352", taille: "M" },
      { modele: "Aldes T.One Air 08", dimensions: "880 × 750 × 340", taille: "L" },
      { modele: "Monosplit Energy Pro Plus 2,5-3,5 kW · Easy Smart 5 kW · New Comfort 5 kW", dimensions: "810 × 585 × 280", taille: "M" },
      { modele: "Monosplit Easy Smart 2,5-3,5 kW", dimensions: "660 × 483 × 240", taille: "S" },
      { modele: "Monosplit Easy Smart 7 kW · New Comfort 7 kW", dimensions: "860 × 667 × 310", taille: "L" },
      { modele: "Monosplit New Comfort 2,5-3,5 kW", dimensions: "715 × 482 × 240", taille: "M" },
      { modele: "Multisplit 3,5-4,2 kW", dimensions: "715 × 540 × 240", taille: "M" },
      { modele: "Multisplit 8,1-10,5 kW · 12,5 kW", dimensions: "950 × 840 × 340", taille: "L" },
      { modele: "PAC air/eau bibloc 4, 6, 8 kW", dimensions: "900 × 750 × 320", taille: "L" },
      { modele: "PAC air/eau bibloc 10, 12, 14, 16 kW", dimensions: "1100 × 840 × 390", taille: "L" },
      { modele: "PAC air/eau monobloc 4-8 kW", dimensions: "1270 × 815 × 340", taille: "XXL" },
      { modele: "PAC air/eau monobloc 10, 12, 14, 16 kW", dimensions: "1376 × 840 × 390", taille: "XXL" },
    ],
  },
  {
    marque: "Qlima",
    lignes: [
      { modele: "Scm 52, 7900 W", dimensions: "554 × 805 × 330", taille: "S" },
      { modele: "Scm 52, 7900 W", dimensions: "750 × 1030 × 438", taille: "L" },
      { modele: "Sc 52 ext 2,5 kW / 3,2 kW", dimensions: "550 × 770 × 300", taille: "S" },
    ],
  },
  {
    marque: "Samsung",
    lignes: [
      { modele: "6800 W · 8000 W", dimensions: "798 × 880 × 310", taille: "M" },
      { modele: "Windfree avant 3500/5000/4000/2500 W", dimensions: "548 × 790 × 285", taille: "S" },
      { modele: "Luzon 3500 W · Luzon 2500 W", dimensions: "475 × 660 × 242", taille: "S" },
      { modele: "Windfree avant 5000/6500/5200 W", dimensions: "638 × 880 × 310", taille: "S" },
      { modele: "10000 W", dimensions: "998 × 940 × 330", taille: "S" },
    ],
  },
  {
    marque: "Ariston",
    lignes: [
      { modele: "Nimbus EXT R32 35 M / 50 M", dimensions: "1016 × 670 × 374", taille: "XL" },
      { modele: "Nimbus EXT R32 80 M / 80 M-T", dimensions: "548 × 790 × 285", taille: "XL" },
      { modele: "Nimbus EXT R32 120 M/120 M-T & 150 M/150 M-T", dimensions: "475 × 660 × 242", taille: "XXL" },
      { modele: "Nimbus Compact M NET R32", dimensions: "1016 × 374 × 1506", taille: "XL" },
      { modele: "Nimbus Pocket M NET R32", dimensions: "998 × 940 × 330", taille: "XL" },
    ],
  },
];

export const COMPAT_INTERIEUR: CompatMarque[] = [
  {
    marque: "Mitsubishi Electric",
    lignes: [
      { modele: "MSZ-HR50VF", dimensions: "280 × 838 × 228", taille: "S" },
      { modele: "MSZ-LN25VG2W", dimensions: "307 × 890 × 233", taille: "L" },
      { modele: "MSZ-LN25VGB", dimensions: "307 × 890 × 233", taille: "L" },
    ],
  },
  {
    marque: "Daikin",
    lignes: [
      { modele: "FTXM60R", dimensions: "299 × 998 × 292", taille: "S" },
      { modele: "FTXM35R", dimensions: "295 × 778 × 272", taille: "S" },
      { modele: "CTXM15R", dimensions: "295 × 778 × 272", taille: "S" },
      { modele: "FTXM35A", dimensions: "298 × 804 × 252", taille: "S" },
      { modele: "FTXA25CS", dimensions: "295 × 798 × 189", taille: "S" },
      { modele: "FTXF35F (Sensira)", dimensions: "286 × 770 × 225", taille: "S" },
    ],
  },
  {
    marque: "Samsung",
    lignes: [
      { modele: "AR 5500 7k / 9k / 12k", dimensions: "299 × 820 × 215", taille: "S" },
    ],
  },
  {
    marque: "Toshiba",
    lignes: [
      { modele: "RAS-B16N4KVRG-E", dimensions: "300 × 987 × 210", taille: "L" },
      { modele: "RAS-B13B2KVG-E", dimensions: "288 × 770 × 225", taille: "S" },
      { modele: "RAS-B10G3KVSG-E", dimensions: "293 × 800 × 226", taille: "S" },
      { modele: "RAS-M07N4KVRG-E · RAS-B10N4KVRG-E · RAS-B13N4KVRG-E", dimensions: "293 × 800 × 226", taille: "L" },
    ],
  },
  {
    marque: "Panasonic",
    lignes: [
      { modele: "CS-TZ20WKEW", dimensions: "290 × 779 × 209", taille: "S" },
      { modele: "CS-MZ16XKE", dimensions: "295 × 870 × 229", taille: "L" },
      { modele: "CS-TZ35WKEW", dimensions: "290 × 779 × 209", taille: "S" },
      { modele: "CS-FZ35WKE", dimensions: "290 × 779 × 209", taille: "L" },
      { modele: "CS-FZ50WKE · CS-FZ60WKE · CS-FZ25WKE", dimensions: "290 × 779 × 209", taille: "S" },
    ],
  },
  {
    marque: "Atlantic",
    lignes: [
      { modele: "ASYG 12 KGTB.UI", dimensions: "270 × 834 × 215", taille: "S" },
      { modele: "ASYG 9 KGTB.UI", dimensions: "270 × 834 × 215", taille: "S" },
      { modele: "ASYG 7 KGTB.UI", dimensions: "270 × 834 × 215", taille: "S" },
    ],
  },
  {
    marque: "LG",
    lignes: [
      { modele: "PM05SK.NSA", dimensions: "308 × 754 × 189", taille: "S" },
      { modele: "AC09BK.NSJ", dimensions: "308 × 837 × 192", taille: "S" },
      { modele: "AC12BK.NSJ", dimensions: "308 × 837 × 192", taille: "S" },
      { modele: "DC12RT.NSJ", dimensions: "308 × 837 × 189", taille: "S" },
      { modele: "AC18BK.NSJ", dimensions: "345 × 998 × 212", taille: "S" },
      { modele: "S12ET.NSJ", dimensions: "308 × 837 × 189", taille: "S" },
    ],
  },
  {
    marque: "Heiwa",
    lignes: [
      { modele: "HMIP2-25C1-V1", dimensions: "293 × 837 × 200", taille: "S" },
      { modele: "HMIS3-35-V1", dimensions: "275 × 790 × 200", taille: "S" },
      { modele: "HMIS3-20-V1", dimensions: "270 × 713 × 195", taille: "S" },
    ],
  },
  {
    marque: "Saunier Duval",
    lignes: [
      { modele: "SDH 19-025 NW", dimensions: "275 × 790 × 200", taille: "S" },
      { modele: "SDH 19-035 NW", dimensions: "289 × 845 × 209", taille: "S" },
      { modele: "SDH 19-065 NW", dimensions: "325 × 1078 × 246", taille: "L" },
    ],
  },
  {
    marque: "Hitachi",
    lignes: [
      { modele: "RAK-35RXE (Takai)", dimensions: "295 × 900 × 210", taille: "L" },
    ],
  },
];
