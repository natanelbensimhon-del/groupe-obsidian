import Link from "next/link";

export type LegalBlock = { h?: string; p?: string; ul?: string[] };
export type LegalSection = { title: string; blocks: LegalBlock[] };

const WRAP = "mx-auto w-full max-w-3xl px-5 md:px-8";

/** Gabarit clair pour les pages légales de la boutique (CGV, retours…). */
export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated?: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="border-b border-[#ececec] bg-[#fafafa]">
        <div className={`${WRAP} py-12 md:py-16`}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#9aa0a6]">
            <Link href="/boutique" className="hover:text-[#22282b]" data-cursor="hover">
              Boutique
            </Link>
            <span>/</span>
            <span className="text-[#4a4f54]">{title}</span>
          </nav>
          <h1 className="text-3xl font-semibold leading-[1.1] text-[#22282b] md:text-4xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-xs text-[#9aa0a6]">Dernière mise à jour : {updated}</p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className={`${WRAP} text-sm leading-relaxed text-[#4a4f54]`}>
          {intro?.map((b, i) => (
            <Block key={`intro-${i}`} b={b} intro />
          ))}

          {sections.map((s, si) => (
            <div key={si} className="mt-10 first:mt-8">
              <h2 className="text-lg font-semibold text-[#22282b] md:text-xl">{s.title}</h2>
              <div className="mt-3 space-y-3">
                {s.blocks.map((b, bi) => (
                  <Block key={bi} b={b} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Block({ b, intro }: { b: LegalBlock; intro?: boolean }) {
  if (b.h) return <h3 className="pt-2 text-base font-semibold text-[#22282b]">{b.h}</h3>;
  if (b.ul)
    return (
      <ul className="ml-5 list-disc space-y-1.5 marker:text-[#c3c6ca]">
        {b.ul.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  if (b.p)
    return (
      <p className={intro ? "rounded-lg border border-[#e9e9e9] bg-[#fafafa] p-4" : ""}>
        {b.p}
      </p>
    );
  return null;
}
