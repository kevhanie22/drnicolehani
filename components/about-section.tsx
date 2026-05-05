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

  const capsule = [
    { value: "30+", label: locale === "fr" ? "années de pratique" : "years in practice" },
    { value: "10,000+", label: locale === "fr" ? "patients accompagnés" : "patients accompanied" },
    { value: "3", label: locale === "fr" ? "hôpitaux & cliniques" : "hospitals & clinics" },
    { value: "2", label: locale === "fr" ? "universités enseignées" : "universities teaching" },
  ];

  return (
    <section
      id="about"
      className="relative py-10 lg:py-14 border-t border-line/30 overflow-hidden"
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
                  alt="Dr. Nicole Absi Hani at the practice in Zouk Mosbeh, Lebanon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-deep/55 via-brand-deep/15 to-transparent pointer-events-none" />
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
              <figcaption className="relative mt-4 flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[12px] tracking-tight text-muted">
                  Dr. Nicole Absi Hani
                </span>
              </figcaption>
            </figure>

            <div className="mt-6">
              <Link href={`${base}/about`} className="btn-text link-underline">
                {locale === "fr" ? "Lire le parcours complet" : "Read the full biography"}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Capsule stats — full-width strip below the editorial spread */}
        <FadeUp delay={0.2} className="mt-8 lg:mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl surface-card divide-y divide-x divide-line/70 overflow-hidden lg:divide-y-0">
            {capsule.map((c) => (
              <div key={c.label} className="px-6 py-6 lg:px-8 lg:py-7 text-center lg:text-left">
                <div className="font-serif text-[28px] lg:text-[32px] leading-none tracking-[-0.02em] text-ink">
                  {c.value}
                </div>
                <div className="mt-2 text-[12px] text-muted leading-tight">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
