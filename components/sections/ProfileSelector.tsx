import Link from "next/link";

type Profil = {
  key: "copro" | "maison" | "pro" | "tertiaire";
  label: string;
  sub: string;
  href: string;
};

const PROFILS: Profil[] = [
  { key: "copro", label: "Copropriété", sub: "Syndic, conseil syndical", href: "/coproprietes" },
  { key: "maison", label: "Maison individuelle", sub: "Propriétaire occupant", href: "/particuliers" },
  { key: "pro", label: "Professionnel", sub: "Installateur, promoteur", href: "/travaux" },
  { key: "tertiaire", label: "Tertiaire", sub: "Bureaux, commerces, collectivités", href: "/tertiaire" },
];

/** Sélecteur de profil du hero d'accueil : chaque porte mène à un parcours dédié. */
export function ProfileSelector() {
  return (
    <div>
      <p className="text-center text-xs uppercase tracking-label text-ash-400">
        Vous êtes ?
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PROFILS.map((p) => (
          <Link
            key={p.key}
            href={p.href}
            data-cursor="hover"
            className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-glow/30 bg-glow/[0.06] text-glow">
              <ProfilIcon k={p.key} />
            </span>
            <span className="mt-4 text-sm font-medium text-ash-100">{p.label}</span>
            <span className="mt-1 text-xs leading-snug text-ash-400">{p.sub}</span>
            <span className="mt-3 text-xs text-glow opacity-0 transition-opacity group-hover:opacity-100">
              Entrer →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProfilIcon({ k }: { k: Profil["key"] }) {
  const c = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (k) {
    case "copro":
      return (
        <svg {...c}>
          <path d="M3 21h18M5 21V7l6-3v17M19 21V11l-8-4" />
          <path d="M8 9v0M8 12v0M8 15v0M15 13v0M15 16v0" />
        </svg>
      );
    case "maison":
      return (
        <svg {...c}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "pro":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="12" rx="1.5" />
          <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18" />
        </svg>
      );
    case "tertiaire":
      return (
        <svg {...c}>
          <path d="M4 21V4h9v17M13 21V9h7v12M4 21h17" />
          <path d="M7 8v0M7 12v0M7 16v0M16 12v0M16 16v0" />
        </svg>
      );
  }
}
