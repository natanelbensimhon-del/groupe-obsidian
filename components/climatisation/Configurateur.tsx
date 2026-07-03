"use client";

import { useMemo, useRef, useState } from "react";
import {
  AC_BRANDS,
  AC_TYPES,
  AC_GAMMES,
  EXTRA_GROUP_PRICE,
  unitPriceFor,
  TVA_RENOVATION,
  TVA_NEUF,
  USAGE_LABELS,
  DWELLING_LABELS,
  CONDENSATE_LABELS,
  INSULATION_LABELS,
  recommendCableRouting,
  pickVariant,
  defaultUnitImage,
  defaultOutdoorImage,
  type AcGamme,
  type AcType,
  type WallType,
  type OutdoorProximity,
  type FinishPref,
  type Dwelling,
  type Condensate,
  type Usage,
  type Insulation,
} from "@/content/climatisation";
import { generateDevisPdf, type DevisSim } from "./devisPdf";
import { cn } from "@/lib/utils";

type Slot = {
  photo: string | null;
  render?: string | null; // rendu IA (remplace l'aperçu si présent)
  pos: { x: number; y: number };
  size: number;
  rot: number;
};
type PieceSlot = Slot & { room: string; surface?: number; insulation?: Insulation };

function imageToSim(dataUrl: string): Promise<DevisSim> {
  return loadImage(dataUrl).then((img) => ({
    dataUrl,
    ratio: img.naturalWidth > 0 ? img.naturalHeight / img.naturalWidth : 0.66,
  }));
}

const INT_POS = { x: 0.5, y: 0.35 };
const EXT_POS = { x: 0.5, y: 0.62 };
const newPiece = (): PieceSlot => ({
  room: "",
  photo: null,
  pos: { ...INT_POS },
  size: 0.28,
  rot: 0,
});
const newGroupe = (): Slot => ({
  photo: null,
  pos: { ...EXT_POS },
  size: 0.4,
  rot: 0,
});

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

async function composite(p: Slot, src: string): Promise<DevisSim | null> {
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

function Counter({
  value,
  onDec,
  onInc,
  suffix,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDec}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ash-200 hover:border-white/40"
        data-cursor="hover"
      >
        −
      </button>
      <span className="w-6 text-center font-display text-lg text-ash-100">
        {value}
      </span>
      <button
        onClick={onInc}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ash-200 hover:border-white/40"
        data-cursor="hover"
      >
        +
      </button>
      {suffix && <span className="text-xs text-ash-400">{suffix}</span>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ash-100 placeholder:text-ash-400 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]";

export function Configurateur() {
  const [brand, setBrand] = useState<string>(AC_BRANDS[0]);
  const [type, setType] = useState<AcType>("mural");
  const [gammeId, setGammeId] = useState<string>("");

  const [pieces, setPieces] = useState<PieceSlot[]>([newPiece()]);
  const [groupes, setGroupes] = useState<Slot[]>([newGroupe()]);
  const [sel, setSel] = useState<{ kind: "int" | "ext"; index: number }>({
    kind: "int",
    index: 0,
  });

  const [dwelling, setDwelling] = useState<Dwelling | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [oldEnough, setOldEnough] = useState<boolean | null>(null); // logement +2 ans ?
  const [wall, setWall] = useState<WallType | null>(null);
  const [outdoor, setOutdoor] = useState<OutdoorProximity | null>(null);
  const [finish, setFinish] = useState<FinishPref | null>(null);
  const [condensate, setCondensate] = useState<Condensate | null>(null);

  const [downloading, setDownloading] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [aiConsent, setAiConsent] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "error">("idle");
  const [aiError, setAiError] = useState("");
  const [client, setClient] = useState({
    prenom: "",
    nom: "",
    tel: "",
    email: "",
    adresse: "",
  });
  const [consent, setConsent] = useState(false);
  const [devisStatus, setDevisStatus] = useState<
    "idle" | "generating" | "done" | "error"
  >("idle");
  const [devisError, setDevisError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; bx: number; by: number } | null>(
    null
  );

  const gammes = useMemo(
    () => AC_GAMMES.filter((g) => g.brand === brand && g.type === type),
    [brand, type]
  );
  const gamme: AcGamme | undefined =
    AC_GAMMES.find((g) => g.id === gammeId) ?? gammes[0];
  const unitSrc = gamme?.unitImage || defaultUnitImage();
  const outdoorSrc = defaultOutdoorImage();

  const nbSplits = pieces.length;
  const nbGroupes = groupes.length;

  // Variante (puissance) choisie automatiquement pour une pièce.
  const variantFor = (p: PieceSlot) =>
    gamme ? pickVariant(gamme, p.surface, p.insulation) : undefined;

  const cable = finish
    ? recommendCableRouting(wall ?? "inconnu", outdoor ?? "inconnu", finish)
    : null;

  const activeArr = sel.kind === "int" ? pieces : groupes;
  const activeIndex = Math.min(sel.index, activeArr.length - 1);
  const active = activeArr[activeIndex] as Slot;
  const activeSrc = sel.kind === "int" ? unitSrc : outdoorSrc;

  const updateActive = (upd: Partial<Slot>) => {
    if (sel.kind === "int")
      setPieces((a) => a.map((s, i) => (i === activeIndex ? { ...s, ...upd } : s)));
    else
      setGroupes((a) => a.map((s, i) => (i === activeIndex ? { ...s, ...upd } : s)));
  };

  const unitPrice = unitPriceFor(brand);
  const extraGroups = Math.max(0, nbGroupes - 1);
  const grandTotal = unitPrice * nbSplits + EXTRA_GROUP_PRICE * extraGroups;
  const tvaRate = oldEnough === false ? TVA_NEUF : TVA_RENOVATION;

  function onFile(file?: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () =>
      updateActive({
        photo: reader.result as string,
        pos: sel.kind === "int" ? { ...INT_POS } : { ...EXT_POS },
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
    updateActive({
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
      const sim = active.render
        ? await imageToSim(active.render)
        : await composite(active, activeSrc);
      if (!sim) return;
      const a = document.createElement("a");
      a.href = sim.dataUrl;
      a.download = `apercu-${sel.kind === "int" ? "piece" + (activeIndex + 1) : "groupe" + (activeIndex + 1)}.jpg`;
      a.click();
    } finally {
      setDownloading(false);
    }
  }

  async function generateRender() {
    if (!active.photo || !gamme) return;
    if (!aiConsent) {
      setAiError("Merci d'accepter l'envoi de la photo au service d'IA.");
      return;
    }
    setAiError("");
    setAiStatus("loading");
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: active.photo,
          brand: gamme.brand,
          model: gamme.name,
          kind: sel.kind,
        }),
      });
      const j = await res.json();
      if (!j.ok) {
        setAiStatus("error");
        setAiError(
          j.error === "not_configured"
            ? "Le rendu réaliste par IA sera bientôt disponible."
            : "Le rendu IA n'a pas abouti. Réessayez ou utilisez le placement manuel."
        );
        return;
      }
      updateActive({ render: j.image });
      setAiStatus("idle");
    } catch {
      setAiStatus("error");
      setAiError("Le rendu IA n'a pas abouti. Réessayez.");
    }
  }

  async function downloadDevis() {
    setDevisError("");
    if (!gamme) return;
    if (!client.prenom.trim() || !client.nom.trim())
      return setDevisError("Merci d'indiquer votre nom et prénom.");
    if (!client.tel.trim())
      return setDevisError("Merci d'indiquer votre téléphone.");
    if (!isEmail(client.email))
      return setDevisError("Merci d'indiquer un e-mail valide.");
    if (!consent)
      return setDevisError(
        "Merci d'accepter d'être recontacté pour valider votre demande."
      );

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
      const buildSim = (slot: Slot, src: string) =>
        slot.render ? imageToSim(slot.render) : composite(slot, src);
      const [pieceSims, groupSims] = await Promise.all([
        Promise.all(pieces.map((p) => buildSim(p, unitSrc))),
        Promise.all(groupes.map((g) => buildSim(g, outdoorSrc))),
      ]);
      const sims: { title: string; sim: DevisSim }[] = [];
      pieceSims.forEach((s, i) => {
        if (s)
          sims.push({
            title: `${pieces[i].room?.trim() || "Pièce " + (i + 1)} — unité intérieure`,
            sim: s,
          });
      });
      groupSims.forEach((s, i) => {
        if (s) sims.push({ title: `Groupe extérieur ${i + 1}`, sim: s });
      });

      const pdf = await generateDevisPdf({
        numero,
        date: dateFr,
        client,
        dwelling: dwellingLabel,
        model: {
          brand: gamme.brand,
          gamme: gamme.name,
          type: AC_TYPES.find((t) => t.id === type)?.label ?? type,
        },
        nbSplits,
        nbGroupes,
        unitPrice,
        extraGroupPrice: EXTRA_GROUP_PRICE,
        cableRouting: cableLabel,
        condensate: condensateLabel,
        usage: usage ? USAGE_LABELS[usage] : undefined,
        rooms: pieces.map((p) => ({
          name: p.room,
          surface: p.surface,
          powerKw: variantFor(p)?.powerKw,
        })),
        tvaRate,
        sims,
      });

      // Envoi du lead + PDF à l'équipe (email), sans bloquer le téléchargement.
      fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...client,
          type: "Climatisation résidentielle",
          logement: dwellingLabel,
          usage: usage ? USAGE_LABELS[usage] : undefined,
          modele: `${gamme.brand} ${gamme.name}`,
          splits: nbSplits,
          groupes: nbGroupes,
          passageCables: cableLabel,
          condensats: condensateLabel,
          totalEstimatif: grandTotal,
          numero,
          pdfBase64: pdf?.base64,
          pdfFilename: pdf?.filename,
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

  // Onglets de placement (pièces + groupes)
  const tabs = [
    ...pieces.map((p, i) => ({
      kind: "int" as const,
      index: i,
      label: p.room?.trim() || `Pièce ${i + 1}`,
      set: !!p.photo,
    })),
    ...groupes.map((g, i) => ({
      kind: "ext" as const,
      index: i,
      label: `Groupe ${i + 1}`,
      set: !!g.photo,
    })),
  ];

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
                    setGammeId("");
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
                    setGammeId("");
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
            <p className="label mb-3">3 · Gamme</p>
            {gammes.length === 0 ? (
              <p className="text-sm text-ash-400">
                Aucune gamme {type} pour {brand} pour l&apos;instant.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {gammes.map((g) => {
                  const activeG = gamme?.id === g.id;
                  return (
                    <div
                      key={g.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setGammeId(g.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setGammeId(g.id);
                      }}
                      data-cursor="hover"
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                        activeG
                          ? "border-white/40 bg-white/[0.06]"
                          : "border-white/10 hover:border-white/25"
                      )}
                    >
                      <span
                        className={cn(
                          "relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10",
                          g.photo ? "bg-white" : "bg-obsidian-900"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={g.photo || defaultUnitImage()}
                          alt={g.name}
                          className="h-full w-full object-contain p-1"
                        />
                        {g.videoId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoId(g.videoId!);
                            }}
                            aria-label={`Voir la vidéo ${g.name}`}
                            title="Voir la vidéo"
                            data-cursor="hover"
                            className="group/vid absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/55"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-obsidian-900 shadow transition-transform group-hover/vid:scale-110">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </button>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ash-100">
                          {g.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-ash-400">
                          {g.tagline ? g.tagline : g.brand}
                          {g.scop ? ` · SCOP ${g.scop}` : ""}
                        </span>
                      </span>
                      {g.videoId && (
                        <span className="shrink-0 text-[11px] text-ash-400">
                          ▶ Vidéo
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-ash-500">
              La puissance est déterminée automatiquement pour chaque pièce
              (surface + isolation). Prix indicatifs TTC — confirmés après étude.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="label mb-3">4 · Splits int.</p>
              <Counter
                value={nbSplits}
                onDec={() =>
                  setPieces((p) => (p.length > 1 ? p.slice(0, -1) : p))
                }
                onInc={() =>
                  setPieces((p) => (p.length < 6 ? [...p, newPiece()] : p))
                }
              />
            </div>
            <div>
              <p className="label mb-3">5 · Groupes ext.</p>
              <Counter
                value={nbGroupes}
                onDec={() =>
                  setGroupes((g) => (g.length > 1 ? g.slice(0, -1) : g))
                }
                onInc={() =>
                  setGroupes((g) => (g.length < 4 ? [...g, newGroupe()] : g))
                }
              />
            </div>
          </div>

          <div>
            <p className="label mb-3">6 · Votre logement</p>
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

            <p className="mb-2 mt-4 text-xs font-medium text-ash-200">
              Votre logement a-t-il plus de 2 ans&nbsp;?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: true, label: "Oui (+ de 2 ans)" },
                { v: false, label: "Non / neuf" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setOldEnough(o.v)}
                  data-cursor="hover"
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-center text-xs transition-colors",
                    oldEnough === o.v
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-ash-300 hover:border-white/25"
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-ash-500">
              +2 ans → TVA 10 % · neuf → TVA 20 %.
            </p>

            <p className="mb-2 mt-4 text-xs font-medium text-ash-200">
              Vous souhaitez surtout&nbsp;?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["rafraichir", "chauffer", "les_deux"] as Usage[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUsage(u)}
                  data-cursor="hover"
                  className={cn(
                    "rounded-xl border px-2 py-2.5 text-center text-[11px] leading-tight transition-colors",
                    usage === u
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-ash-300 hover:border-white/25"
                  )}
                >
                  {u === "rafraichir"
                    ? "Rafraîchir"
                    : u === "chauffer"
                      ? "Chauffer"
                      : "Les deux"}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="label mb-1">7 · Passage des câbles</p>
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

          <div className="border-t border-white/10 pt-6">
            <p className="label mb-1">8 · Évacuation de l&apos;eau</p>
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

        {/* ── Visualiseur multi-pièces ── */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-obsidian-800/60 p-6">
          <p className="label">Placez chaque unité sur une photo</p>

          {/* Onglets pièces / groupes */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const activeTab = sel.kind === t.kind && activeIndex === t.index;
              return (
                <button
                  key={`${t.kind}-${t.index}`}
                  onClick={() => setSel({ kind: t.kind, index: t.index })}
                  data-cursor="hover"
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                    activeTab
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-ash-300 hover:border-white/25"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      t.set ? "bg-glow" : "bg-white/20"
                    )}
                  />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Pièce (unités intérieures) : nom, surface, isolation → puissance auto */}
          {sel.kind === "int" && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_110px] gap-2">
                <input
                  className={inputClass}
                  placeholder="Nom de la pièce (ex : Salon)"
                  value={(active as PieceSlot).room}
                  onChange={(e) =>
                    updateActive({ room: e.target.value } as Partial<Slot>)
                  }
                />
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  placeholder="Surface m²"
                  value={(active as PieceSlot).surface ?? ""}
                  onChange={(e) =>
                    updateActive({
                      surface: e.target.value ? Number(e.target.value) : undefined,
                    } as Partial<Slot>)
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["bonne", "moyenne", "faible"] as Insulation[]).map((ins) => (
                  <button
                    key={ins}
                    onClick={() =>
                      updateActive({ insulation: ins } as Partial<Slot>)
                    }
                    data-cursor="hover"
                    title={INSULATION_LABELS[ins]}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-center text-[11px] capitalize transition-colors",
                      (active as PieceSlot).insulation === ins
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 text-ash-300 hover:border-white/25"
                    )}
                  >
                    {ins === "bonne"
                      ? "Bien isolé"
                      : ins === "moyenne"
                        ? "Moyen"
                        : "Peu isolé"}
                  </button>
                ))}
              </div>
              {gamme &&
                (() => {
                  const v = variantFor(active as PieceSlot);
                  const p = active as PieceSlot;
                  if (!v) return null;
                  return (
                    <p className="text-[11px] text-glow">
                      Puissance recommandée : <strong>{v.powerKw} kW</strong>
                      {p.surface && p.insulation
                        ? ` (${p.surface} m², isolation ${p.insulation})`
                        : " — précisez surface + isolation pour affiner"}{" "}
                      · {gamme.name} {v.powerKw} kW
                    </p>
                  );
                })()}
            </div>
          )}

          {!active.photo ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onFile(e.dataTransfer.files?.[0]);
              }}
              className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-white/30"
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
                  {sel.kind === "int"
                    ? "Photo de la pièce / du mur"
                    : "Photo de la façade / emplacement extérieur"}
                </p>
                <p className="mt-1 text-xs text-ash-400">
                  glissez-déposez ou cliquez · JPG, PNG
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
              <div className="flex items-center justify-end">
                <button
                  onClick={() => updateActive({ photo: null, render: null })}
                  className="text-xs text-ash-400 hover:text-white"
                  data-cursor="hover"
                >
                  Changer de photo
                </button>
              </div>

              {active.render ? (
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={active.render} alt="Rendu réaliste" className="block w-full" />
                  <span className="absolute left-2 top-2 rounded-full bg-glow/80 px-3 py-1 text-[11px] font-medium text-obsidian-900">
                    Rendu IA
                  </span>
                  <button
                    onClick={() => updateActive({ render: null })}
                    className="absolute right-2 top-2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/80 backdrop-blur hover:text-white"
                    data-cursor="hover"
                  >
                    Placement manuel
                  </button>
                </div>
              ) : (
                <>
                  <div
                    ref={containerRef}
                    className="relative select-none overflow-hidden rounded-xl border border-white/10"
                    style={{ touchAction: "none" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={active.photo} alt="Emplacement" className="block w-full" />
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
                        onChange={(e) => updateActive({ size: parseFloat(e.target.value) })}
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
                        onChange={(e) => updateActive({ rot: parseInt(e.target.value) })}
                        className="accent-glow"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Rendu réaliste par IA */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-ash-100">
                  Rendu réaliste par IA
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-ash-400">
                  Génère une photo réaliste de l&apos;unité installée
                  (quelques secondes). Sinon, placez l&apos;unité à la main
                  ci-dessus.
                </p>
                <label className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-ash-300">
                  <input
                    type="checkbox"
                    checked={aiConsent}
                    onChange={(e) => setAiConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-glow"
                  />
                  <span>
                    J&apos;accepte que ma photo soit envoyée à un service d&apos;IA
                    (Google Gemini) pour générer le rendu. Elle n&apos;est pas
                    conservée.
                  </span>
                </label>
                {aiError && (
                  <p className="mt-2 text-[11px] text-amber-300/90">{aiError}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <button
                    onClick={generateRender}
                    disabled={aiStatus === "loading"}
                    className="btn-ghost text-xs disabled:opacity-40"
                    data-cursor="hover"
                  >
                    {aiStatus === "loading"
                      ? "Génération du rendu… (quelques secondes)"
                      : active.render
                        ? "Régénérer le rendu IA"
                        : "Générer un rendu réaliste (IA)"}
                  </button>
                  <button
                    onClick={downloadPreview}
                    disabled={downloading}
                    className="text-xs text-ash-400 hover:text-white disabled:opacity-40"
                    data-cursor="hover"
                  >
                    {downloading ? "Génération…" : "Télécharger cet aperçu"}
                  </button>
                </div>
              </div>
            </>
          )}
          <p className="text-[11px] text-ash-500">
            Une photo par pièce (unité intérieure) et par groupe extérieur : tous
            les visuels sont joints au devis, organisés par pièce.
          </p>
        </div>
      </div>

      {/* ── Devis ── */}
      <div className="rounded-2xl border border-white/10 bg-obsidian-800/60 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="label mb-5">Votre estimation</p>
            {gamme && (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ash-300">
                    {gamme.brand} {gamme.name} — {nbSplits} unité(s) intérieure(s)
                  </span>
                  <span className="text-ash-100">
                    {eur(unitPrice * nbSplits)}
                  </span>
                </div>
                {extraGroups > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-ash-300">
                      Groupe(s) extérieur(s) supplémentaire(s) × {extraGroups}
                    </span>
                    <span className="text-ash-100">
                      {eur(EXTRA_GROUP_PRICE * extraGroups)}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-medium text-ash-100">
                    Total estimatif TTC
                  </span>
                  <span className="font-display text-2xl text-ash-100">
                    {eur(grandTotal)}
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ash-400">
                  Prestation clé en main, fourni-posé : matériel, pose, liaisons,
                  accessoires et mise en service inclus. Montant indicatif,
                  confirmé après visite technique.
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
                  après laquelle le devis sera validé. Vos données ne sont pas
                  conservées.
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
                  (avec vos simulations par pièce).
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={inputClass} placeholder="Prénom" value={client.prenom} onChange={field("prenom")} />
                  <input className={inputClass} placeholder="Nom" value={client.nom} onChange={field("nom")} />
                  <input className={inputClass} placeholder="Téléphone" type="tel" value={client.tel} onChange={field("tel")} />
                  <input className={inputClass} placeholder="E-mail" type="email" value={client.email} onChange={field("email")} />
                  <input className={cn(inputClass, "sm:col-span-2")} placeholder="Adresse du chantier (optionnel)" value={client.adresse} onChange={field("adresse")} />
                </div>

                <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ash-300">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-glow"
                  />
                  <span>
                    J&apos;accepte d&apos;être recontacté au sujet de ma demande.
                    Mes données servent uniquement à ce traitement :{" "}
                    <strong className="text-ash-200">
                      elles ne sont ni conservées, ni revendues, ni exploitées
                    </strong>{" "}
                    à d&apos;autres fins.
                  </span>
                </label>

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
                  Devis estimatif, validé après visite technique. Voir notre{" "}
                  <a href="/politique-confidentialite" className="underline hover:text-ash-300">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox vidéo (lecteur intégré, sans quitter le site) */}
      {videoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoId(null)}
              aria-label="Fermer la vidéo"
              className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
              data-cursor="hover"
            >
              ✕
            </button>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Vidéo produit"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
