// ──────────────────────────────────────────────────────────────────────────
// Générateur de géométrie de pièces de puzzle (jigsaw) partagé 3D / 2D.
// Une pièce a 4 bords ; chaque bord est plat (0), bombé vers l'extérieur (+1)
// ou creusé vers l'intérieur (-1). Les bords des pièces voisines sont
// complémentaires → elles s'emboîtent réellement.
// ──────────────────────────────────────────────────────────────────────────

export type Signs = { top: number; right: number; bottom: number; left: number };

export type Pt = [number, number];

/**
 * Contour d'une pièce centrée sur (0,0), en coordonnées y-vers-le-haut.
 * Les tenons sont ANGULAIRES (trapèzes) pour un rendu géométrique / futuriste.
 * Les bords de pièces voisines restent strictement complémentaires.
 */
export function piecePoints(w: number, h: number, s: Signs, tab = 0.17): Pt[] {
  const pts: Pt[] = [];
  const hw = w / 2;
  const hh = h / 2;
  const unit = Math.min(w, h);
  const base = unit * tab; // demi-largeur du tenon à sa base (le long du bord)
  const top = base * 0.5; // demi-largeur au sommet → trapèze
  const depth = unit * tab * 0.95; // profondeur de la saillie

  const TL: Pt = [-hw, hh];
  const TR: Pt = [hw, hh];
  const BR: Pt = [hw, -hh];
  const BL: Pt = [-hw, -hh];

  const edges = [
    { from: TL, to: TR, tan: [1, 0] as Pt, nor: [0, 1] as Pt, sign: s.top },
    { from: TR, to: BR, tan: [0, -1] as Pt, nor: [1, 0] as Pt, sign: s.right },
    { from: BR, to: BL, tan: [-1, 0] as Pt, nor: [0, -1] as Pt, sign: s.bottom },
    { from: BL, to: TL, tan: [0, 1] as Pt, nor: [-1, 0] as Pt, sign: s.left },
  ];

  const add = (mid: Pt, tan: Pt, nor: Pt, sign: number, t: number, n: number) =>
    pts.push([
      mid[0] + tan[0] * t + nor[0] * sign * n,
      mid[1] + tan[1] * t + nor[1] * sign * n,
    ]);

  pts.push(TL);
  for (const e of edges) {
    if (e.sign === 0) {
      pts.push(e.to);
      continue;
    }
    const mid: Pt = [(e.from[0] + e.to[0]) / 2, (e.from[1] + e.to[1]) / 2];
    // base gauche → sommet gauche → sommet droit → base droite (trapèze)
    add(mid, e.tan, e.nor, e.sign, -base, 0);
    add(mid, e.tan, e.nor, e.sign, -top, depth);
    add(mid, e.tan, e.nor, e.sign, top, depth);
    add(mid, e.tan, e.nor, e.sign, base, 0);
    pts.push(e.to);
  }
  return pts;
}

/** Signes des bords pour une grille cols×rows, garantissant l'emboîtement. */
export function gridSigns(cols: number, rows: number): Signs[][] {
  const seam = (a: number, b: number) => ((a * 2 + b) % 2 === 0 ? 1 : -1);
  const grid: Signs[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Signs[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        top: r === 0 ? 0 : -seam(r - 1, c),
        bottom: r === rows - 1 ? 0 : seam(r, c),
        left: c === 0 ? 0 : -seam(r, c - 1),
        right: c === cols - 1 ? 0 : seam(r, c),
      });
    }
    grid.push(row);
  }
  return grid;
}

/** Convertit un contour en attribut `d` SVG (y inversé pour l'écran). */
export function pointsToSvgPath(pts: Pt[], scale = 1, cx = 0, cy = 0): string {
  return (
    pts
      .map((p, i) => {
        const x = cx + p[0] * scale;
        const y = cy - p[1] * scale;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}
