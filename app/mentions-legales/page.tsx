import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du Groupe Obsidian.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Informations"
        title="Mentions légales"
        intro="Cette page est un gabarit. ⚠️ À COMPLÉTER avec vos informations légales définitives."
      />
      <section className="pb-28">
        <div className="shell max-w-3xl space-y-8 text-sm leading-relaxed text-ash-300">
          <div>
            <h2 className="mb-2 text-ash-100">Éditeur du site</h2>
            <p>
              ⚠️ À COMPLÉTER : raison sociale, forme juridique, capital social,
              SIREN/SIRET, RCS, n° TVA intracommunautaire, adresse du siège,
              directeur de la publication, e-mail, téléphone.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-ash-100">Hébergement</h2>
            <p>
              ⚠️ À COMPLÉTER : hébergeur (ex. Vercel Inc.), adresse de
              l&apos;hébergeur.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-ash-100">Propriété intellectuelle</h2>
            <p>
              ⚠️ À COMPLÉTER : mention relative aux droits sur les contenus,
              marques, logos et visuels.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
