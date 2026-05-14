"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users2, Languages, MapPin, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";
import { Magnetic } from "./magnetic-button";
import { MeshGradient } from "./mesh-gradient";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;

  const stats = [
    {
      icon: ShieldCheck,
      value: "30",
      label: locale === "fr" ? "ans d'exercice" : "years in practice",
    },
    {
      icon: Users2,
      value: "10,000+",
      label: locale === "fr" ? "patients suivis" : "patients seen",
    },
    {
      icon: Languages,
      value: "3",
      label: locale === "fr" ? "langues" : "languages",
    },
    {
      icon: MapPin,
      value: "3",
      label: locale === "fr" ? "cabinets" : "locations",
    },
  ];

  return (
    <section className="relative pt-[88px] lg:pt-[100px] pb-6 lg:pb-10 overflow-hidden">
      {/* animated mesh gradient + grain background */}
      <MeshGradient variant="warm" />

      {/* subtle horizon line at top — adds depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-x-10 lg:gap-x-14 gap-y-7 items-start">
          {/* copy column */}
          <div className="lg:col-span-7 lg:pt-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
              className="micro-label"
            >
              <span>
                {locale === "fr"
                  ? "Psychologue clinicienne · Beyrouth"
                  : "Clinical Psychologist · Beirut"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
              className="mt-5 font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] tracking-[-0.02em] text-ink text-balance"
            >
              {t.hero.title.split(",")[0]}
              {t.hero.title.includes(",") && (
                <>
                  ,
                  <br className="hidden sm:block" />
                  <span className="italic font-normal text-ink/90">
                    {t.hero.title.split(",").slice(1).join(",")}
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.35 }}
              className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-muted text-pretty"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
              className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-5 sm:gap-y-3"
            >
              <Magnetic
                href={`${base}/contact`}
                strength={0.2}
                cursorLabel={locale === "fr" ? "Réserver" : "Book"}
                className="btn-primary justify-center w-full sm:w-auto shadow-[0_8px_30px_-8px_rgba(14,42,90,0.35)] hover:shadow-[0_12px_36px_-10px_rgba(14,42,90,0.5)]"
              >
                {t.hero.primaryCta}
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Magnetic>
              <a
                href={site.phone.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.8} />
                {locale === "fr" ? "Poser une question" : "Ask a question"}
              </a>
            </motion.div>

            {/* bento stat strip — sits in the copy column below the fold */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
              className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-xl surface-card px-4 py-4 lg:px-5 lg:py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-22px_rgba(11,18,32,0.18)]"
                  >
                    <span className="gold-line-grow" aria-hidden />
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gold/12 text-gold transition-colors group-hover:bg-gold/20">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </span>
                    <div className="mt-3 font-serif text-[28px] leading-none tracking-[-0.02em] text-ink">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[11.5px] leading-tight text-muted">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* portrait — premium editorial cover treatment */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[520px]">
              {/* gold gradient frame — softly glowing */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-gold/35 via-gold/0 to-brand/20 blur-md opacity-70"
              />
              <div
                aria-hidden
                className="absolute -inset-2 rounded-[24px] bg-gradient-to-br from-gold/30 via-cream/40 to-brand/15"
              />

              {/* portrait card */}
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-line shadow-[0_30px_80px_-30px_rgba(11,18,32,0.30),0_8px_24px_-12px_rgba(11,18,32,0.15)] ring-1 ring-white/40">
                <Image
                  src="/images/dr-nicole-hero.jpg"
                  alt="Dr. Nicole Absi Hani, Clinical Psychologist"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-center"
                />
                {/* soft inner top glow for editorial feel */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cream/15 to-transparent pointer-events-none" />
                {/* bottom credential strip — magazine cover */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/60 px-4 py-3 shadow-[0_8px_24px_-8px_rgba(11,18,32,0.18)]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-[15px] text-ink leading-tight truncate">
                          Dr. Nicole Absi Hani
                        </p>
                        <p className="mt-0.5 text-[11.5px] text-muted leading-tight">
                          {locale === "fr"
                            ? "PhD · Thérapeute TCC · USEK"
                            : "PhD · CBT Therapist · USEK"}
                        </p>
                      </div>
                      <a
                        href={site.phone.primaryHref}
                        className="text-[11px] tabular-nums text-muted shrink-0 hover:text-brand transition-colors"
                      >
                        {site.phone.primary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
