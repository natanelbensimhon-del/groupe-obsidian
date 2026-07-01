"use client";

import { useMemo, useRef, useState } from "react";
import {
  AC_BRANDS,
  AC_TYPES,
  AC_MODELS,
  POSE_PRICE_PER_UNIT,
  TVA_RATE,
  DWELLING_LABELS,
  CONDENSATE_LABELS,
  recommendCableRouting,
  defaultUnitImage,
  defaultOutdoorImage,
  type AcModel,
  type AcType,
  type WallType,
  type OutdoorProximity,
  type FinishPref,
  type Dwelling,
  type Condensate,
} from "@/content/climatisation";
import { generateDevisPdf, type DevisSim } from "./devisPdf";
import { cn } from "@/lib/utils";

type Placement = {
  photo: string | null;
  pos: { x: number; y: number };
  size: number;
  rot: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const eur = (n: number) => n.toLocaleString("fr-FR") + " €";
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function composite(p: Placement, src: string): Promise<DevisSim | null> {
  if (!p.photo) return null;
  const bg = await loadImage(p.photo);
  const maxW = 1200;
  const scale = Math.min(1, maxW / bg.naturalWidth);
  const Wd = Math.round(bg.naturalWidth * scale);
  const Hd = Math.round(bg.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = Wd;
  canvas.height = Hd;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(bg, 0, 0, Wd, Hd);
  const unit = await loadImage(src);
  const ratio = unit.naturalWidth > 0 ? unit.naturalHeight / unit.naturalWidth : 0.32;
  const uw = p.size * Wd;
  const uh = uw * ratio;
  ctx.save();
  ctx.translate(p.pos.x * Wd, p.pos.y * Hd);
  ctx.rotate((p.rot * Math.PI) / 180);
  ctx.drawImage(unit, -uw / 2, -uh / 2, uw, uh);
  ctx.restore();
  return { dataUrl: canvas.toDataURL("image/jpeg", 0.85), ratio: Hd / Wd };
}

function Choice<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | null;
  options: { id: T; label: string; hint?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          data-cursor="hover"
          className={cn(
            "rounded-xl border px-4 py-3 text-left transition-colors",
            value === o.id
              ? "border-white/40 bg-white/[0.06]"
              : "border-white/10 hover:border-white/25"
          )}
        >
          <span className="block text-sm text-ash-100">{o.label}</span>
          {o.hint && (
            <span className="mt-0.5 block text-xs text-ash-400">{o.hint}</span>
          )}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ash-100 placeholder:text-ash-400 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]";

export function Configurateur() {
  const [brand, setBrand] = useState<string>(AC_BRANDS[0]);
  const [type, setType] = useState<AcType>("mural");
  const [modelId, setModelId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const [dwelling, setDwelling] = useState<Dwelling | null>(null);
  const [wall, setWall] = useState<WallType | null>(null);
  const [outdoor, setOutdoor] = useState<OutdoorProximity | null>(null);
  const [finish, setFinish] = useState<FinishPref | null>(null);
  const [condensate, setCondensate] = useState<Condensate | null>(null);

  // Deux vues : unité intérieure & unité extérieure
  const [view, setView] = useState<"int" | "ext">("int");
  const [interior, setInterior] = useState<Placement>({
    photo: null,
    pos: { x: 0.5, y: 0.35 },
    size: 0.28,
    rot: 0,
  });
  const [exterior, setExterior] = useState<Placement>({
    photo: null,
    pos: { x: 0.5, y: 0.62 },
    size: 0.4,
    rot: 0,
  });
  const [downloading, setDownloading] = useState(false);

  const [client, setClient] = useState({
    prenom: "",
    nom: "",
    tel: "",
    email: "",
    adresse: "",
  });
  const [devisStatus, setDevisStatus] = useState<
    "idle" | "generating" | "done" | "error"
  >("idle");
  const [devisError, setDevisError] = useState("");

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
  const outdoorSrc = defaultOutdoorImage();

  const cable = finish
    ? recommendCableRouting(wall ?? "inconnu", outdoor ?? "inconnu", finish)
    : null;

  const active = view === "int" ? interior : exterior;
  const setActive = (upd: Partial<Placement>) =>
    (view === "int" ? setInterior : setExterior)((p) => ({ ...p, ...upd }));
  const activeSrc = view === "int" ? unitSrc : outdoorSrc;

  const materialTotal = (model?.price ?? 0) * quantity;
  const poseTotal = POSE_PRICE_PER_UNIT * quantity;
  const grandTotal = materialTotal + poseTotal;

  function onFile(file?: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () =>
      setActive({
        photo: reader.result as string,
        pos: view === "int" ? { x: 0.5, y: 0.35 } : { x: 0.5, y: 0.62 },
      });
    reader.readAsDataURL(file);
  }
  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { sx: e.clientX, sy: e.clientY, bx: active.pos.x, by: active.pos.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    const dr = dragRef.current;
    const el = containerRef.current;
    if (!dr || !el) return;
    const r = el.getBoundingClientRect();
    setActive({
      pos: {
        x: clamp(dr.bx + (e.clientX - dr.sx) / r.width, 0, 1),
        y: clamp(dr.by + (e.clientY - dr.sy) / r.height, 0, 1),
      },
    });
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  async function downloadPreview() {
    setDownloading(true);
    try {
      const sim = await composite(active, activeSrc);
      if (!sim) return;
      const a = document.createElement("a");
      a.href = sim.dataUrl;
      a.download = `apercu-${view === "int" ? "interieur" : "exterieur"}-${model?.id ?? "obsidian"}.jpg`;
      a.click();
    } finally {
      setDownloading(false);
    }
  }

  async function downloadDevis() {
    setDevisError("");
    if (!model) return;
    if (!client.prenom.trim() || !client.nom.trim()) {
      setDevisError("Merci d'indiquer votre nom et prénom.");
      return;
    }
    if (!client.tel.trim()) {
      setDevisError("Merci d'indiquer votre téléphone.");
      return;
    }
    if (!isEmail(client.email)) {
      setDevisError("Merci d'indiquer un e-mail valide.");
      return;
    }
    setDevisStatus("generating");
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const numero = `CL-${String(now.getFullYear()).slice(2)}${pad(
      now.getMonth() + 1
    )}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    const dateFr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    const cableLabel = cable?.label ?? "À déterminer lors de la visite technique";
    const condensateLabel = condensate
      ? CONDENSATE_LABELS[condensate]
      : CONDENSATE_LABELS.inconnu;
    const dwellingLabel = dwelling ? DWELLING_LABELS[dwelling] : "Non précisé";

    try {
      const [interiorSim, exteriorSim] = await Promise.all([
        composite(interior, unitSrc),
        composite(exterior, outdoorSrc),
      ]);
      await generateDevisPdf({
        numero,
        date: dateFr,
        client,
        dwelling: dwellingLabel,
        model: {
          brand: model.brand,
          name: model.name,
          type: AC_TYPES.find((t) => t.id === type)?.label ?? type,
          ref: model.ref,
          powerKw: model.powerKw,
          btu: model.btu,
        },
        quantity,
        materialUnit: model.price,
        poseUnit: POSE_PRICE_PER_UNIT,
        cableRouting: cableLabel,
        condensate: condensateLabel,
        tvaRate: TVA_RATE,
        interiorSim: interiorSim ?? undefined,
        exteriorSim: exteriorSim ?? undefined,
      });
      fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...client,
          type: "Climatisation résidentielle",
          logement: dwellingLabel,
          modele: `${model.brand} ${model.name}`,
          quantite: quantity,
          passageCables: cableLabel,
          condensats: condensateLabel,
          totalEstimatif: grandTotal,
          numero,
        }),
      }).catch(() => {});
      setDevisStatus("done");
    } catch {
      setDevisStatus("error");
      setDevisError("La génération du devis a échoué. Réessayez.");
    }
  }

  const field = (k: keyof typeof client) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setClient((c) => ({ ...c, [k]: e.target.value }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* ── Configuration ── */}
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
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

          <div>
            <p className="label mb-3">3 · Modèle</p>
            {models.length === 0 ? (
              <p className="text-sm text-ash-400">
                Aucun modèle {type} référencé pour {brand} pour l&apos;instant.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {models.map((m) => {
                  const activeM = model?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setModelId(m.id)}
                      data-cursor="hover"
                      className={cn(
                        "rounded-xl border p-4 text-left transition-colors",
                        activeM
                          ? "border-white/40 bg-white/[0.06]"
                          : "border-white/10 hover:border-white/25"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-ash-100">
                          {m.name}
                        </span>
                        <span className="whitespace-nowrap text-sm text-glow">
                          {eur(m.price)}
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
              Prix publics indicatifs TTC du matériel (unité intérieure + groupe
              extérieur) — à confirmer selon l&apos;étude technique.
            </p>
          </div>

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
              <span className="text-xs text-ash-400">
                {quantity > 1 ? "Multi-split" : "Mono-split"}
              </span>
            </div>
          </div>

          <div>
            <p className="label mb-3">5 · Type de logement</p>
            <div className="grid grid-cols-2 gap-2">
              {(["maison", "appartement"] as Dwelling[]).map((dw) => (
                <button
                  key={dw}
                  onClick={() => setDwelling(dw)}
                  data-cursor="hover"
                  className={cn(
                    "rounded-xl border px-3 py-3 text-center text-xs transition-colors",
                    dwelling === dw
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-ash-300 hover:border-white/25"
                  )}
                >
                  {DWELLING_LABELS[dw]}
                </button>
              ))}
            </div>
          </div>

          {/* 6 · Passage des câbles */}
          <div className="border-t border-white/10 pt-6">
            <p className="label mb-1">6 · Passage des câbles</p>
            <p className="mb-4 text-xs text-ash-400">
              Trois questions simples pour savoir si les câbles peuvent être
              cachés ou passés dans une goulotte discrète.
            </p>

            <p className="mb-2 text-xs font-medium text-ash-200">
              Le mur où poser le climatiseur, c&apos;est plutôt&nbsp;?
            </p>
            <Choice<WallType>
              value={wall}
              onChange={setWall}
              options={[
                { id: "placo", label: "Une cloison légère / placo", hint: "Ça sonne creux quand on tape dessus." },
                { id: "dur", label: "Un mur dur", hint: "Béton, brique, pierre — plein." },
                { id: "inconnu", label: "Je ne sais pas" },
              ]}
            />
            <p className="mb-2 mt-5 text-xs font-medium text-ash-200">
              L&apos;unité extérieure sera-t-elle facile à relier&nbsp;?
            </p>
            <Choice<OutdoorProximity>
              value={outdoor}
              onChange={setOutdoor}
              options={[
                { id: "proche", label: "Oui, tout proche / juste derrière", hint: "Même mur, balcon, ou à quelques mètres." },
                { id: "loin", label: "Non, plutôt éloignée", hint: "Autre pièce, autre étage, façade opposée." },
                { id: "inconnu", label: "Je ne sais pas" },
              ]}
            />
            <p className="mb-2 mt-5 text-xs font-medium text-ash-200">
              Côté esthétique, vous préférez&nbsp;?
            </p>
            <Choice<FinishPref>
              value={finish}
              onChange={setFinish}
              options={[
                { id: "cache", label: "Des câbles cachés si c'est possible", hint: "Rendu le plus discret." },
                { id: "goulotte", label: "Une goulotte discrète me convient", hint: "Simple et rapide." },
              ]}
            />
            {cable && (
              <div className="mt-5 rounded-xl border border-glow/25 bg-glow/[0.06] p-4">
                <p className="text-xs uppercase tracking-label text-glow">
                  Solution proposée
                </p>
                <p className="mt-1.5 text-sm font-medium text-ash-100">
                  {cable.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ash-300">
                  {cable.detail}
                </p>
              </div>
            )}
          </div>

          {/* 7 · Évacuation des condensats */}
          <div className="border-t border-white/10 pt-6">
            <p className="label mb-1">7 · Évacuation de l&apos;eau</p>
            <p className="mb-4 text-xs text-ash-400">
              La climatisation produit un peu d&apos;eau (condensats). Comment
              l&apos;évacuer&nbsp;?
            </p>
            <Choice<Condensate>
              value={condensate}
              onChange={setCondensate}
              options={[
                { id: "facade", label: "Écoulement libre en façade", hint: "Un léger filet d'eau s'écoule sur le mur extérieur." },
                { id: "pluviale", label: "Vers une descente d'eau de pluie", hint: "S'il y a une gouttière / descente à proximité." },
                { id: "relevage", label: "Prévoir une pompe de relevage", hint: "Si aucune évacuation naturelle n'est possible (ex. appartement)." },
                { id: "inconnu", label: "Je ne sais pas", hint: "On déterminera la meilleure solution en visite." },
              ]}
            />
          </div>
        </div>

        {/* ── Visualiseur (2 vues) ── */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex rounded-full border border-white/10 p-1">
              {([
                { id: "int", label: "Unité intérieure" },
                { id: "ext", label: "Unité extérieure" },
              ] as const).map((v) => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  data-cursor="hover"
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs transition-colors",
                    view === v.id ? "bg-white/10 text-white" : "text-ash-300"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
            {active.photo && (
              <button
                onClick={() => setActive({ photo: null })}
                className="text-xs text-ash-400 hover:text-white"
                data-cursor="hover"
              >
                Changer de photo
              </button>
            )}
          </div>

          {!active.photo ? (
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
                  {view === "int"
                    ? "Déposez une photo du mur / de la pièce"
                    : "Déposez une photo de la façade / emplacement extérieur"}
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
                <img src={active.photo} alt="Votre emplacement" className="block w-full" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeSrc}
                  alt="Unité"
                  draggable={false}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  className="absolute cursor-grab touch-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)] active:cursor-grabbing"
                  style={{
                    left: `${active.pos.x * 100}%`,
                    top: `${active.pos.y * 100}%`,
                    width: `${active.size * 100}%`,
                    transform: `translate(-50%,-50%) rotate(${active.rot}deg)`,
                  }}
                />
                <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
                  Glissez l&apos;unité pour la positionner
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs text-ash-300">Taille</span>
                  <input
                    type="range"
                    min={0.12}
                    max={0.7}
                    step={0.01}
                    value={active.size}
                    onChange={(e) => setActive({ size: parseFloat(e.target.value) })}
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
                    value={active.rot}
                    onChange={(e) => setActive({ rot: parseInt(e.target.value) })}
                    className="accent-glow"
                  />
                </label>
              </div>

              <button
                onClick={downloadPreview}
                disabled={downloading}
                className="btn-ghost self-start disabled:opacity-40"
                data-cursor="hover"
              >
                {downloading ? "Génération…" : "Télécharger cet aperçu"}
              </button>
            </>
          )}
          <p className="text-[11px] text-ash-500">
            Placez l&apos;unité intérieure et l&apos;unité extérieure : les deux
            visuels seront joints à votre devis.
          </p>
        </div>
      </div>

      {/* ── Devis ── */}
      <div className="rounded-2xl border border-white/10 bg-obsidian-800/60 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="label mb-5">Votre estimation</p>
            {model && (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ash-300">
                    {model.brand} {model.name} × {quantity}
                  </span>
                  <span className="text-ash-100">{eur(materialTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ash-300">
                    Forfait pose & accessoires × {quantity}
                  </span>
                  <span className="text-ash-100">{eur(poseTotal)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-medium text-ash-100">
                    Total estimatif TTC
                  </span>
                  <span className="font-display text-2xl text-ash-100">
                    {eur(grandTotal)}
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ash-400">
                  Comprend le matériel (unité intérieure + groupe extérieur) et le
                  forfait pose (main d&apos;œuvre, liaisons, accessoires, mise en
                  service). Montant indicatif, confirmé après visite technique.
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="label mb-2">Téléchargez votre devis</p>
            {devisStatus === "done" ? (
              <div className="rounded-xl border border-glow/25 bg-glow/[0.06] p-6 text-center">
                <p className="text-sm font-medium text-ash-100">
                  Votre devis a été généré et téléchargé. ✅
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ash-300">
                  Notre équipe vous rappelle pour organiser la visite technique,
                  après laquelle le devis sera validé.
                </p>
                <button
                  onClick={() => setDevisStatus("idle")}
                  className="btn-ghost mt-5"
                  data-cursor="hover"
                >
                  Modifier ma configuration
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-xs text-ash-400">
                  Renseignez vos coordonnées pour recevoir votre devis en PDF
                  (avec vos simulations photo).
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={inputClass} placeholder="Prénom" value={client.prenom} onChange={field("prenom")} />
                  <input className={inputClass} placeholder="Nom" value={client.nom} onChange={field("nom")} />
                  <input className={inputClass} placeholder="Téléphone" type="tel" value={client.tel} onChange={field("tel")} />
                  <input className={inputClass} placeholder="E-mail" type="email" value={client.email} onChange={field("email")} />
                  <input className={cn(inputClass, "sm:col-span-2")} placeholder="Adresse du chantier (optionnel)" value={client.adresse} onChange={field("adresse")} />
                </div>
                {devisError && <p className="mt-3 text-sm text-red-300">{devisError}</p>}
                <button
                  onClick={downloadDevis}
                  disabled={devisStatus === "generating"}
                  className="btn-primary mt-5 w-full sm:w-auto disabled:opacity-50"
                  data-cursor="hover"
                >
                  {devisStatus === "generating"
                    ? "Génération du devis…"
                    : "Télécharger mon devis (PDF)"}
                </button>
                <p className="mt-3 text-[11px] leading-relaxed text-ash-500">
                  En téléchargeant votre devis, vous acceptez d&apos;être
                  recontacté par notre équipe. Devis estimatif, validé après
                  visite technique.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
