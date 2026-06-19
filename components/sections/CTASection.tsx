import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  title = "Étudions votre projet.",
  intro = "Chaque opération commence par une lecture précise de vos enjeux. Présentez-nous votre bâtiment, votre actif ou votre besoin : nous revenons vers vous avec une approche structurée.",
  primary = { label: "Soumettre un projet", href: "/contact" },
  secondary,
}: {
  title?: string;
  intro?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] text-ash-100 md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ash-300 md:text-lg">
            {intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={primary.href} className="btn-primary" data-cursor="hover">
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="btn-ghost"
                data-cursor="hover"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
