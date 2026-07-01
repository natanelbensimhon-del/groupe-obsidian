import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SITE, LEGAL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du Groupe Obsidian.",
  path: "/mentions-legales",
});

const Block = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="mb-2 text-lg font-medium text-ash-100">{title}</h2>
    <div className="space-y-1.5 text-sm leading-relaxed text-ash-300">
      {children}
    </div>
  </div>
);

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Informations"
        title="Mentions légales"
        intro="Informations relatives à l'éditeur du site et à son hébergement."
      />
      <section className="pb-28">
        <div className="shell max-w-3xl space-y-10">
          <Block title="Éditeur du site">
            <p>{SITE.name}</p>
            <p>{LEGAL.activity}</p>
            <p>{LEGAL.form}</p>
            <p>{SITE.contact.address}</p>
            <p>
              SIRET : {LEGAL.siret} — {LEGAL.rcs} — {LEGAL.ape}
            </p>
            <p>N° TVA intracommunautaire : {LEGAL.tva}</p>
            <p>
              Téléphone :{" "}
              <a href={SITE.contact.phoneHref} className="hover:text-white">
                {SITE.contact.phone}
              </a>{" "}
              — E-mail :{" "}
              <a
                href={`mailto:${SITE.contact.email}`}
                className="hover:text-white"
              >
                {SITE.contact.email}
              </a>
            </p>
            <p className="text-ash-400">
              Directeur de la publication : ⚠ à confirmer (représentant légal de
              la société).
            </p>
          </Block>

          <Block title="Hébergement">
            <p>
              Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
              91789, USA — vercel.com.
            </p>
          </Block>

          <Block title="Activité & qualifications">
            <p>
              {LEGAL.activity}. {LEGAL.fluidesAttestation}.
            </p>
            <p className="text-ash-400">
              ⚠ À compléter : assurance de responsabilité civile professionnelle
              et décennale (assureur, n° de police, couverture géographique).
            </p>
          </Block>

          <Block title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus de ce site (textes, visuels, éléments
              graphiques, logo) est protégé. Toute reproduction ou représentation
              totale ou partielle sans autorisation est interdite.
            </p>
          </Block>

          <Block title="Données personnelles">
            <p>
              Le traitement de vos données est décrit dans notre{" "}
              <a
                href="/politique-confidentialite"
                className="text-ash-100 underline hover:text-white"
              >
                politique de confidentialité
              </a>
              . Vos données ne sont ni conservées durablement, ni revendues, ni
              exploitées à d&apos;autres fins que le traitement de votre demande.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
