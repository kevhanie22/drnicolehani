"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp } from "./motion";

export function AboutSection({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;
  const paragraphs = compact ? t.about.body.slice(0, 1) : t.about.body;

  return (
    <section
      id="about"
      className="relative section-pad section-divider overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 0% 30%, rgba(200,168,91,0.08), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        {/* Section heading */}
        <FadeUp className="max-w-2xl mb-7">
          <p className="micro-label">{t.about.eyebrow}</p>
          <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
            {t.about.title}
          </h2>
        </FadeUp>

        {/* Editorial 2-col: portrait left, body+quote right */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-7 items-center">
          <FadeUp className="lg:col-span-5">
            <div className="relative max-w-[480px] mx-auto lg:mx-0">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[24px] bg-gradient-to-br from-gold/25 via-cream/0 to-brand/10"
              />
              <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden bg-line shadow-[0_30px_70px_-30px_rgba(11,18,32,0.28)] ring-1 ring-white/40">
                <Image
                  src="/images/dr-nicole-portrait.jpg"
                  alt="Dr. Nicole Absi Hani — clinical psychologist and CBT therapist, portrait at her Zouk Mosbeh practice"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-[center_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-deep/65 via-brand-deep/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif italic text-[14px] text-cream/95 leading-tight">
                    {locale === "fr"
                      ? "Au cabinet privé · Zouk Mosbeh, depuis 1996."
                      : "At the private practice · Zouk Mosbeh, since 1996."}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-7 lg:pl-4">
            <div className="space-y-5 text-[16.5px] leading-[1.75] text-ink/85">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            <figure className="relative mt-7 rounded-2xl surface-card-cream p-7 lg:p-8 overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 100% at 0% 0%, rgba(200,168,91,0.18), transparent 60%)",
                }}
              />
              <Quote
                aria-hidden
                className="absolute top-5 right-6 h-10 w-10 text-gold/30"
                strokeWidth={1}
              />
              <blockquote className="relative font-serif italic text-[20px] lg:text-[22px] leading-[1.35] tracking-[-0.01em] text-ink/90 text-balance max-w-[40ch]">
                {t.about.quote}
              </blockquote>
              <figcaption className="relative mt-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-3">
                  <span className="h-px w-10 bg-gold" />
                  <span className="text-[12px] tracking-tight text-muted">
                    Dr. Nicole Absi Hani
                  </span>
                </span>
                <Link
                  href={`${base}/about`}
                  className="inline-flex items-center gap-1.5 text-[13px] text-brand font-medium hover:text-brand-deep transition-colors group"
                >
                  {locale === "fr" ? "Lire le parcours" : "Read the biography"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                </Link>
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
