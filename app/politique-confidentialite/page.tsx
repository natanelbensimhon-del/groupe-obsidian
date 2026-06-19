import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données du Groupe Obsidian.",
  path: "/politique-confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Informations"
        title="Politique de confidentialité"
        intro="Cette page est un gabarit. ⚠️ À COMPLÉTER avec votre politique définitive (RGPD)."
      />
      <section className="pb-28">
        <div className="shell max-w-3xl space-y-8 text-sm leading-relaxed text-ash-300">
          <div>
            <h2 className="mb-2 text-ash-100">Données collectées</h2>
            <p>
              ⚠️ À COMPLÉTER : nature des données recueillies via le formulaire de
              contact (nom, société, téléphone, e-mail, message…) et finalités.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-ash-100">Base légale & durée de conservation</h2>
            <p>⚠️ À COMPLÉTER : base légale du traitement et durée de conservation.</p>
          </div>
          <div>
            <h2 className="mb-2 text-ash-100">Vos droits</h2>
            <p>
              ⚠️ À COMPLÉTER : droits d&apos;accès, de rectification, d&apos;effacement
              et coordonnées du responsable de traitement / DPO.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
