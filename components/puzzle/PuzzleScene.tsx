"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, Html, Edges } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { PUZZLE_PIECES, type PuzzlePiece } from "@/lib/site";
import { piecePoints, gridSigns } from "@/lib/jigsaw";

const COLS = 4;
const ROWS = 2;
const W = 1; // largeur/hauteur d'une pièce
const DEPTH = 0.24;

const ACCENT: Record<PuzzlePiece["accent"], string> = {
  platinum: "#9CC4FF",
  steel: "#C2CAD4",
  gold: "#E6D2A6",
};

function useGeometries() {
  return useMemo(() => {
    const grid = gridSigns(COLS, ROWS);
    return grid.flat().map((signs) => {
      const pts = piecePoints(W, W, signs);
      const shape = new THREE.Shape();
      shape.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.045,
        bevelSegments: 2,
      });
      geo.center();
      return geo;
    });
  }, []);
}

type PieceProps = {
  piece: PuzzlePiece;
  i: number;
  geometry: THREE.BufferGeometry;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  reduced: boolean;
};

function Piece({
  piece,
  i,
  geometry,
  hoveredId,
  setHoveredId,
  reduced,
}: PieceProps) {
  const router = useRouter();
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);

  const c = i % COLS;
  const r = Math.floor(i / COLS);

  const base = useMemo(
    () =>
      new THREE.Vector3(
        (c - (COLS - 1) / 2) * W,
        ((ROWS - 1) / 2 - r) * W,
        0
      ),
    [c, r]
  );
  // Position de départ (assemblage) : pièces dispersées qui convergent.
  const start = useMemo(
    () =>
      new THREE.Vector3(
        base.x + Math.cos(i * 2.3) * 3.2,
        base.y + Math.sin(i * 1.7) * 3.2,
        2.5 + (i % 4) * 0.6
      ),
    [base, i]
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const hovered = hoveredId === piece.id;
  const dimmed = hoveredId !== null && !hovered;
  const accent = ACCENT[piece.accent];

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!g.userData.init) {
      g.position.copy(start);
      g.userData.init = true;
    }
    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.0009, delta);

    tmp.copy(base);
    if (!reduced) tmp.z += Math.sin(t * 0.8 + i * 0.7) * 0.05;
    if (hovered) tmp.z += 0.8;
    g.position.lerp(tmp, k);

    const targetScale = hovered ? 1.06 : 1;
    const s = g.scale.x + (targetScale - g.scale.x) * k;
    g.scale.setScalar(s);

    if (mat.current) {
      const targetE = hovered ? 0.95 : 0.1;
      mat.current.emissiveIntensity +=
        (targetE - mat.current.emissiveIntensity) * k;
      const targetO = dimmed ? 0.5 : 1;
      mat.current.opacity += (targetO - mat.current.opacity) * k;
    }
  });

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHoveredId(piece.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredId(null);
          document.body.style.cursor = "";
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          router.push(piece.href);
        }}
      >
        <meshPhysicalMaterial
          ref={mat}
          color="#13161b"
          metalness={0.55}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.35}
          reflectivity={0.5}
          emissive={accent}
          emissiveIntensity={0.1}
          transparent
          opacity={1}
        />
        <Edges threshold={15} scale={1.001} color={hovered ? accent : "#3a4250"} />
      </mesh>

      {/* Titre affiché en permanence, centré sur la pièce */}
      <Html
        center
        position={[0, 0, DEPTH / 2 + 0.06]}
        distanceFactor={7}
        zIndexRange={[20, 0]}
        pointerEvents="none"
      >
        <div
          className="select-none text-center"
          style={{ width: 96, opacity: dimmed ? 0.55 : 1, transition: "opacity .3s" }}
        >
          <div
            className="font-display font-semibold leading-tight"
            style={{
              fontSize: 11,
              letterSpacing: "0.02em",
              color: hovered ? accent : "#EDEEF0",
              transition: "color .3s",
            }}
          >
            {piece.label}
          </div>
          <div
            style={{
              marginTop: 3,
              fontSize: 7,
              letterSpacing: "0.22em",
              color: hovered ? accent : "#6b7280",
              transition: "color .3s, opacity .3s",
              opacity: hovered ? 1 : 0.7,
            }}
          >
            {hovered ? "EXPLORER →" : piece.index}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Board({
  hoveredId,
  setHoveredId,
  reduced,
}: {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const geometries = useGeometries();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.05, delta);
    // Parallaxe douce (faible, pour garder les titres lisibles).
    const tx = state.pointer.y * 0.12;
    const ty = state.pointer.x * 0.16;
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.y += (ty - g.rotation.y) * k;
  });

  return (
    <group ref={group}>
      {PUZZLE_PIECES.map((piece, i) => (
        <Piece
          key={piece.id}
          piece={piece}
          i={i}
          geometry={geometries[i]}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          reduced={reduced}
        />
      ))}
    </group>
  );
}

export default function PuzzleScene({
  onHover,
  reduced = false,
}: {
  onHover?: (id: string | null) => void;
  reduced?: boolean;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    onHover?.(id);
  };

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 2.7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <directionalLight position={[-6, -2, 3]} intensity={0.5} color="#6FA8FF" />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 3, 5]}
          scale={[10, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          position={[-5, -3, 2]}
          scale={[6, 6, 1]}
          color="#7fb0ff"
        />
      </Environment>

      <Board hoveredId={hoveredId} setHoveredId={handleHover} reduced={reduced} />

      {!reduced && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
