"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Landing pages publicitaires : header global masqué (chrome dédié).
  if (pathname === "/climatisation-reversible" || pathname === "/merci-climatisation") {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-obsidian-900/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="Groupe Obsidian — accueil" data-cursor="hover">
            <Logo className="h-7 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.slice(1, -1).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] transition-colors",
                    active ? "text-white" : "text-ash-300 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-ash-100 transition-all hover:border-white/40 hover:bg-white/[0.04] md:inline-flex"
            >
              Étudier un projet
            </Link>
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
              data-cursor="hover"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-white transition-transform duration-300",
                    open && "translate-y-[6px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-px w-full bg-white transition-opacity duration-300",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-300",
                    open && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-obsidian-900/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="mt-[72px] flex flex-col gap-1 px-6 py-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-white/5 py-4 text-2xl font-display text-ash-100"
                  >
                    {item.label}
                    <span className="text-sm text-ash-400">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto px-6 pb-10 text-sm text-ash-300">
              <a href={SITE.contact.phoneHref} className="block">
                {SITE.contact.phone}
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="block">
                {SITE.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
