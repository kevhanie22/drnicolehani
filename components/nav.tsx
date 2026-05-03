"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";

export function Nav({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const base = locale === "en" ? "" : `/${locale}`;
  const items = [
    { href: `${base}/about`, label: t.nav.about },
    { href: `${base}/services`, label: t.nav.services },
    { href: `${base}/blog`, label: t.nav.blog },
    { href: `${base}/contact`, label: t.nav.contact },
  ];

  const otherLocale: Locale = locale === "en" ? "fr" : "en";
  const otherPath = (() => {
    const stripped = pathname.replace(/^\/(en|fr)/, "") || "/";
    return otherLocale === "en" ? stripped : `/${otherLocale}${stripped === "/" ? "" : stripped}`;
  })();

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-cream/85 backdrop-blur-md border-b border-line/60"
            : "bg-transparent"
        )}
      >
        <div className="container-edge flex items-center justify-between h-[88px]">
          <Link href={base || "/"} className="group flex items-center gap-3" aria-label="Dr. Nicole Hani — Home">
            <span className="relative inline-flex h-11 w-11 items-center justify-center">
              <Image
                src="/images/logo-mark.png"
                alt="Dr. Nicole Hani logo"
                width={88}
                height={88}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-[18px] text-ink tracking-tight">Dr. Nicole Hani</span>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-muted">
                {locale === "fr" ? "Psychologue Clinicienne · TCC" : "Clinical Psychologist · CBT"}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {items.map((it) => {
              const active = pathname === it.href || (it.href !== `${base}/` && pathname.startsWith(it.href));
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
                    active ? "text-brand" : "text-ink/65 hover:text-brand"
                  )}
                >
                  {it.label}
                  {active && (
                    <motion.span
                      layoutId="navactive"
                      className="absolute -inset-x-2 -bottom-1.5 h-px bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              href={otherPath}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/65 hover:text-brand transition-colors"
              aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            >
              {locale === "fr" ? "EN" : "FR"}
            </Link>
            <Link href={`${base}/contact`} className="btn-primary !py-2.5 !px-5 !text-[12px]">
              {t.nav.bookNow}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-30 bg-cream pt-[88px]"
          >
            <motion.nav
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="container-wide pt-8 pb-12 flex flex-col gap-1"
            >
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="font-serif text-[32px] py-3 text-ink border-b border-line/60 hover:text-brand transition-colors"
                >
                  {it.label}
                </Link>
              ))}
              <div className="mt-6 flex items-center gap-3">
                <Link href={`${base}/contact`} className="btn-primary flex-1">
                  {t.nav.bookNow}
                </Link>
                <Link
                  href={otherPath}
                  className="btn-secondary !px-5"
                  aria-label={`Switch to ${otherLocale.toUpperCase()}`}
                >
                  <span className="font-mono uppercase tracking-wider">{otherLocale}</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
