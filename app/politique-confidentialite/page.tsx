import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du Groupe Obsidian : vos données ne sont ni conservées, ni revendues, ni exploitées à d'autres fins que le traitement de votre demande.",
  path: "/politique-confidentialite",
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
    <div className="space-y-2 text-sm leading-relaxed text-ash-300">{children}</div>
  </div>
);

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Confidentialité & RGPD"
        title="Vos données restent les vôtres."
        intro="Nous traitons vos informations avec sobriété : uniquement pour vous recontacter et établir votre devis. Elles ne sont ni conservées durablement, ni revendues, ni exploitées à d'autres fins."
      />
      <section className="pb-28">
        <div className="shell max-w-3xl space-y-10">
          <Block title="Principe">
            <p>
              Le {SITE.name} s&apos;engage à ne collecter que le strict nécessaire.
              Les données que vous transmettez via nos formulaires (contact et
              configurateur / devis) servent <strong>exclusivement</strong> à
              traiter votre demande : vous recontacter, préparer la visite
              technique et établir votre devis.
            </p>
            <p className="text-ash-100">
              Vos données ne sont <strong>en aucun cas conservées</strong> au-delà
              du traitement de votre demande, ni <strong>revendues</strong>, ni{" "}
              <strong>exploitées</strong> à des fins commerciales, publicitaires
              ou de profilage.
            </p>
          </Block>

          <Block title="Données collectées">
            <p>
              Selon le formulaire : nom, prénom, société (facultatif), téléphone,
              e-mail, adresse du chantier (facultatif), et les éléments de votre
              projet (type d&apos;équipement, configuration, message).
            </p>
            <p>
              Le devis PDF est généré <strong>directement dans votre navigateur</strong> :
              son contenu n&apos;est pas hébergé sur nos serveurs.
            </p>
          </Block>

          <Block title="Finalité & base légale">
            <p>
              Finalité unique : le traitement de votre demande (rappel, étude,
              devis). Base légale : votre consentement, recueilli au moment de
              l&apos;envoi du formulaire ou du téléchargement du devis.
            </p>
          </Block>

          <Block title="Durée de conservation">
            <p>
              Les informations transmises sont utilisées le temps nécessaire au
              traitement de votre demande, puis supprimées. Aucun stockage
              durable, aucune constitution de fichier commercial.
            </p>
          </Block>

          <Block title="Destinataires">
            <p>
              Vos données sont traitées uniquement par l&apos;équipe du{" "}
              {SITE.name} en charge de votre demande. Elles ne sont transmises à
              aucun tiers à des fins commerciales.
            </p>
          </Block>

          <Block title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, d&apos;opposition et de portabilité.
              Pour l&apos;exercer, écrivez-nous à{" "}
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-ash-100 underline hover:text-white"
              >
                {SITE.contact.email}
              </a>
              . Vous pouvez également introduire une réclamation auprès de la CNIL
              (www.cnil.fr).
            </p>
          </Block>

          <Block title="Rendu réaliste par IA (optionnel)">
            <p>
              Le configurateur climatisation propose, en option, un rendu
              photo-réaliste généré par intelligence artificielle. Cette
              fonction n&apos;est utilisée que si vous la déclenchez
              <strong> explicitement</strong> et cochez le consentement dédié.
            </p>
            <p>
              Dans ce cas uniquement, la photo que vous fournissez est transmise
              à un prestataire d&apos;IA (Google Gemini) le temps de générer
              l&apos;image, sans conservation de notre part. Si vous n&apos;utilisez
              pas cette option, aucune image n&apos;est envoyée à un tiers.
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              Ce site ne dépose pas de cookies publicitaires ou de traçage. ⚠ À
              compléter si vous ajoutez ultérieurement des outils de mesure
              d&apos;audience.
            </p>
          </Block>

          <p className="border-t border-white/10 pt-6 text-xs text-ash-500">
            ⚠ À COMPLÉTER : identité du responsable de traitement (raison sociale,
            SIRET), coordonnées du DPO le cas échéant, et hébergeur. Modèle
            fourni à titre indicatif — faites-le valider selon votre situation.
          </p>
        </div>
      </section>
    </>
  );
}
