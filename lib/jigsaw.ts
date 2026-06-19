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
 * Les tenons sont des demi-cercles (rendu net et premium).
 */
export function piecePoints(
  w: number,
  h: number,
  s: Signs,
  knob = 0.22,
  seg = 16
): Pt[] {
  const pts: Pt[] = [];
  const r = Math.min(w, h) * knob;
  const hw = w / 2;
  const hh = h / 2;

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

  pts.push(TL);
  for (const e of edges) {
    if (e.sign === 0) {
      pts.push(e.to);
      continue;
    }
    const mid: Pt = [(e.from[0] + e.to[0]) / 2, (e.from[1] + e.to[1]) / 2];
    for (let i = 0; i <= seg; i++) {
      const phi = Math.PI - (i / seg) * Math.PI; // PI → 0
      const t = r * Math.cos(phi); // -r → r (le long du bord)
      const n = e.sign * r * Math.sin(phi); // bombé selon le signe
      pts.push([
        mid[0] + e.tan[0] * t + e.nor[0] * n,
        mid[1] + e.tan[1] * t + e.nor[1] * n,
      ]);
    }
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
