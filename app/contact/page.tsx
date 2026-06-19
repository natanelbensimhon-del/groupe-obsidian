import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Soumettez votre projet de rénovation énergétique, d'optimisation CEE ou de travaux au Groupe Obsidian, ou échangez directement avec notre équipe.",
  path: "/contact",
});

const COORDS = [
  { label: "Téléphone", value: SITE.contact.phone, href: SITE.contact.phoneHref },
  {
    label: "E-mail",
    value: SITE.contact.email,
    href: `mailto:${SITE.contact.email}`,
  },
  { label: "Adresse", value: SITE.contact.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="08"
        eyebrow="Contact"
        title="Soumettez votre projet."
        intro="Présentez-nous votre bâtiment, votre actif ou votre besoin. Nous revenons vers vous avec une lecture structurée et des pistes d'accompagnement."
      />

      <section className="pb-28 md:pb-36">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="flex flex-col gap-8">
              <div>
                <h2 className="label mb-5">Coordonnées</h2>
                <ul className="flex flex-col gap-5">
                  {COORDS.map((c) => (
                    <li key={c.label}>
                      <div className="text-xs uppercase tracking-label text-ash-400">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="mt-1 block text-base text-ash-100 hover:text-white"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-base text-ash-200">
                          {c.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hairline" />

              <a
                href={SITE.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost justify-center"
                data-cursor="hover"
              >
                Échanger sur WhatsApp
              </a>

              <p className="text-xs leading-relaxed text-ash-400">
                Demande confidentielle pour APIRYON (aviation d&apos;affaires) ?
                Précisez-le dans votre message : elle sera traitée avec la plus
                grande discrétion.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
