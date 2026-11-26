import { AVIS, AVIS_GOOGLE, AVIS_SIMULATION } from "@/content/avis";

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            fill={i < Math.round(n) ? "#FBBC04" : "rgba(255,255,255,0.15)"}
          />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** Bloc « Avis Google » : note globale + derniers avis + lien vers la fiche. */
export function GoogleReviews() {
  return (
    <section id="avis" className="scroll-mt-24 py-14 md:py-20">
      <div className="shell">
        {AVIS_SIMULATION && (
          <p className="mb-6 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-center text-xs text-amber-200">
            Aperçu : textes d&apos;exemple, à remplacer par les vrais avis de la fiche Google avant publication.
          </p>
        )}

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="label">Ils nous ont fait confiance</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ash-100 md:text-4xl">
              Avis clients Google
            </h2>
          </div>
          <a
            href={AVIS_GOOGLE.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-white/25"
          >
            <GoogleG />
            <span>
              <span className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-ash-100">
                  {AVIS_GOOGLE.note.toFixed(1).replace(".", ",")}
                </span>
                <Stars n={AVIS_GOOGLE.note} size={18} />
              </span>
              <span className="block text-xs text-ash-400">
                {AVIS_GOOGLE.total} avis sur Google
              </span>
            </span>
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AVIS.map((a) => (
            <figure
              key={a.auteur + a.date}
              className="flex flex-col rounded-2xl border border-white/10 bg-obsidian-800/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-glow/15 text-sm font-semibold text-glow">
                  {a.auteur.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ash-100">{a.auteur}</span>
                  <span className="block text-xs text-ash-400">{a.date}</span>
                </span>
                <span className="ml-auto opacity-80">
                  <GoogleG />
                </span>
              </div>
              <div className="mt-4">
                <Stars n={a.note} />
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ash-200">
                « {a.texte} »
              </blockquote>
              <figcaption className="mt-5 text-[11px] uppercase tracking-label text-ash-400">
                {a.prestation}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={AVIS_GOOGLE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            data-cursor="hover"
          >
            Voir tous les avis sur Google
          </a>
        </div>
      </div>
    </section>
  );
}
