import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="shell relative text-center">
        <span className="label">Erreur 404</span>
        <h1 className="mt-6 font-display text-6xl font-semibold text-ash-100 md:text-8xl">
          Hors trajectoire.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ash-300">
          La page recherchée n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary mt-10" data-cursor="hover">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
