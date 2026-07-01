"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AC_BRANDS,
  AC_TYPES,
  AC_MODELS,
  defaultUnitImage,
  type AcModel,
  type AcType,
} from "@/content/climatisation";
import { cn } from "@/lib/utils";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function Configurateur() {
  const router = useRouter();

  const [brand, setBrand] = useState<string>(AC_BRANDS[0]);
  const [type, setType] = useState<AcType>("mural");
  const [modelId, setModelId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const [photo, setPhoto] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.35 }); // centre de l'unité (fractions)
  const [size, setSize] = useState(0.28); // largeur de l'unité / largeur photo
  const [rotation, setRotation] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; bx: number; by: number } | null>(
    null
  );

  const models = useMemo(
    () => AC_MODELS.filter((m) => m.brand === brand && m.type === type),
    [brand, type]
  );

  const model: AcModel | undefined =
    AC_MODELS.find((m) => m.id === modelId) ?? models[0];

  const unitSrc = model?.unitImage || defaultUnitImage();

  // ── Dépôt de photo ────────────────────────────────────────────────
  function onFile(file?: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setPos({ x: 0.5, y: 0.35 });
    };
    reader.readAsDataURL(file);
  }

  // ── Déplacement de l'unité ────────────────────────────────────────
  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { sx: e.clientX, sy: e.clientY, bx: pos.x, by: pos.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    const el = containerRef.current;
    if (!d || !el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: clamp(d.bx + (e.clientX - d.sx) / r.width, 0, 1),
      y: clamp(d.by + (e.clientY - d.sy) / r.height, 0, 1),
    });
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  // ── Téléchargement du montage ─────────────────────────────────────
  async function download() {
    if (!photo) return;
    setDownloading(true);
    try {
      const bg = await loadImage(photo);
      const maxW = 1600;
      const scale = Math.min(1, maxW / bg.naturalWidth);
      const W = Math.round(bg.naturalWidth * scale);
      const H = Math.round(bg.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(bg, 0, 0, W, H);

      const unit = await loadImage(unitSrc);
      const ratio =
        unit.naturalWidth > 0 ? unit.naturalHeight / unit.naturalWidth : 134 / 420;
      const uw = size * W;
      const uh = uw * ratio;
      ctx.save();
      ctx.translate(pos.x * W, pos.y * H);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(unit, -uw / 2, -uh / 2, uw, uh);
      ctx.restore();

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `apercu-climatisation-${model?.id ?? "obsidian"}.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  }

  // ── Demande de devis (pré-remplit le formulaire de contact) ───────
  function requestQuote() {
    if (!model) return;
    const summary =
      `Demande de devis — Climatisation résidentielle\n` +
      `• Marque : ${model.brand}\n` +
      `• Modèle : ${model.name} (${type})\n` +
      `• Puissance : ${model.powerKw} kW (~${model.btu} BTU), surface ~${model.surfaceMax} m²\n` +
      `• Quantité d'unités : ${quantity}\n` +
      `• Référence : ${model.ref ?? "—"}\n` +
      `• Prix public indicatif unitaire : ${model.price} € TTC\n` +
      `\nJe souhaite une étude / un devis pour cette configuration.`;
    try {
      sessionStorage.setItem("obsidian_devis", summary);
    } catch {}
    router.push("/contact");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* ── Panneau de configuration ── */}
      <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
        {/* Marque */}
        <div>
          <p className="label mb-3">1 · Marque</p>
          <div className="flex flex-wrap gap-2">
            {AC_BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => {
                  setBrand(b);
                  setModelId("");
                }}
                data-cursor="hover"
                className={cn(
                  "rounded-full border px-4 py-2 text-xs transition-colors",
                  brand === b
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/10 text-ash-300 hover:border-white/25"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <p className="label mb-3">2 · Type d&apos;unité</p>
          <div className="grid grid-cols-3 gap-2">
            {AC_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setType(t.id);
                  setModelId("");
                }}
                data-cursor="hover"
                title={t.desc}
                className={cn(
                  "rounded-xl border px-2 py-3 text-center text-xs transition-colors",
                  type === t.id
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/10 text-ash-300 hover:border-white/25"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modèle */}
        <div>
          <p className="label mb-3">3 · Modèle</p>
          {models.length === 0 ? (
            <p className="text-sm text-ash-400">
              Aucun modèle {type} référencé pour {brand} pour l&apos;instant.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {models.map((m) => {
                const active = model?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setModelId(m.id)}
                    data-cursor="hover"
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors",
                      active
                        ? "border-white/40 bg-white/[0.06]"
                        : "border-white/10 hover:border-white/25"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ash-100">
                        {m.name}
                      </span>
                      <span className="whitespace-nowrap text-sm text-glow">
                        {m.price.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-ash-400">
                      {m.powerKw} kW · ~{m.surfaceMax} m²
                      {m.scop ? ` · SCOP ${m.scop}` : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-ash-500">
            Prix publics indicatifs TTC, hors pose — à confirmer selon
            l&apos;étude technique et l&apos;éligibilité aux aides.
          </p>
        </div>

        {/* Quantité */}
        <div>
          <p className="label mb-3">4 · Nombre d&apos;unités</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => clamp(q - 1, 1, 8))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ash-200 hover:border-white/40"
              data-cursor="hover"
            >
              −
            </button>
            <span className="w-6 text-center font-display text-lg text-ash-100">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => clamp(q + 1, 1, 8))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ash-200 hover:border-white/40"
              data-cursor="hover"
            >
              +
            </button>
            {quantity > 1 && (
              <span className="text-xs text-ash-400">
                {quantity > 1 ? "Multi-split" : "Mono-split"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Visualiseur ── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
        <div className="flex items-center justify-between">
          <p className="label">Aperçu sur votre pièce</p>
          {photo && (
            <button
              onClick={() => setPhoto(null)}
              className="text-xs text-ash-400 hover:text-white"
              data-cursor="hover"
            >
              Changer de photo
            </button>
          )}
        </div>

        {!photo ? (
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files?.[0]);
            }}
            className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-white/30"
            data-cursor="hover"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-ash-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16V4m0 0 4 4m-4-4L8 8M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ash-100">
                Déposez une photo de votre mur / pièce
              </p>
              <p className="mt-1 text-xs text-ash-400">
                ou cliquez pour parcourir · JPG, PNG
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
        ) : (
          <>
            <div
              ref={containerRef}
              className="relative select-none overflow-hidden rounded-xl border border-white/10"
              style={{ touchAction: "none" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="Votre pièce" className="block w-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={unitSrc}
                alt="Unité intérieure"
                draggable={false}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="absolute cursor-grab touch-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)] active:cursor-grabbing"
                style={{
                  left: `${pos.x * 100}%`,
                  top: `${pos.y * 100}%`,
                  width: `${size * 100}%`,
                  transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
                }}
              />
              <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
                Glissez l&apos;unité pour la positionner
              </span>
            </div>

            {/* Contrôles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs text-ash-300">Taille</span>
                <input
                  type="range"
                  min={0.12}
                  max={0.6}
                  step={0.01}
                  value={size}
                  onChange={(e) => setSize(parseFloat(e.target.value))}
                  className="accent-glow"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs text-ash-300">Inclinaison</span>
                <input
                  type="range"
                  min={-20}
                  max={20}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="accent-glow"
                />
              </label>
            </div>
          </>
        )}

        {/* Récapitulatif + actions */}
        {model && (
          <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-label text-ash-400">
                  Votre sélection
                </p>
                <p className="mt-1 text-lg font-medium text-ash-100">
                  {model.brand} {model.name}
                </p>
                <p className="text-xs text-ash-400">
                  {AC_TYPES.find((t) => t.id === type)?.label} · {model.powerKw} kW ·
                  {" "}
                  {quantity} unité{quantity > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl text-ash-100">
                  {(model.price * quantity).toLocaleString("fr-FR")} €
                </p>
                <p className="text-[11px] text-ash-400">
                  indicatif, hors pose
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={download}
                disabled={!photo || downloading}
                className="btn-ghost disabled:opacity-40"
                data-cursor="hover"
              >
                {downloading ? "Génération…" : "Télécharger l'aperçu"}
              </button>
              <button
                onClick={requestQuote}
                className="btn-primary"
                data-cursor="hover"
              >
                Demander un devis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
