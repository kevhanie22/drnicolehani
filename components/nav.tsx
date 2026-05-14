"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";

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

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.menuOpen = open ? "true" : "false";
    return () => {
      document.body.dataset.menuOpen = "false";
    };
  }, [open]);

  const base = locale === "en" ? "" : `/${locale}`;
  // primary nav items only — Contact lives on the CTA button alone (no duplicate "Book a Session" link in mobile menu)
  const items = [
    { href: `${base}/about`, label: t.nav.about },
    { href: `${base}/services`, label: t.nav.services },
    { href: `${base}/blog`, label: t.nav.blog },
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
        <div className="container-wide flex items-center justify-between h-[88px]">
          <Link href={base || "/"} className="group flex items-center gap-3" aria-label="Dr. Nicole Hani — Home">
            <span className="relative inline-flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center">
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
              <span className="font-serif text-[19px] text-ink tracking-tight">Dr. Nicole Hani</span>
              <span className="font-serif italic text-[12px] text-muted/85">
                {locale === "fr" ? "Psychologue clinicienne · TCC" : "Clinical Psychologist · CBT"}
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
                    "relative text-[13.5px] tracking-tight transition-colors",
                    active ? "text-brand font-medium" : "text-ink/70 hover:text-brand"
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

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram — Dr. Nicole Hani"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 hover:text-brand hover:bg-cream/60 transition-colors"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.7} />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook — Dr. Nicole Hani"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 hover:text-brand hover:bg-cream/60 transition-colors"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.7} />
              </a>
            </div>
            <span aria-hidden className="h-4 w-px bg-line/80" />
            <Link
              href={otherPath}
              className="text-[12px] tracking-[0.12em] uppercase text-ink/55 hover:text-brand transition-colors"
              aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            >
              {locale === "fr" ? "EN" : "FR"}
            </Link>
            <Link href={`${base}/contact`} className="btn-primary !py-2.5 !px-5 !text-[12.5px]">
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
            className="lg:hidden fixed inset-0 z-[55] bg-cream pt-[88px]"
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
                  <span className="text-[12px] tracking-[0.16em] uppercase">{otherLocale}</span>
                </Link>
              </div>

              {/* Social row */}
              <div className="mt-8 pt-6 border-t border-line/60 flex items-center gap-3">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram — Dr. Nicole Hani"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 text-ink/70 hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Instagram className="h-5 w-5" strokeWidth={1.6} />
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook — Dr. Nicole Hani"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 text-ink/70 hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Facebook className="h-5 w-5" strokeWidth={1.6} />
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
