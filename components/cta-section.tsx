"use client";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";
import { FadeUp } from "./motion";
import { Magnetic } from "./magnetic-button";
import { MeshGradient } from "./mesh-gradient";

export function CtaSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;
  return (
    <section
      id="contact"
      className="relative py-14 lg:py-20 border-t border-line/70"
    >
      <div className="container-wide">
        {/* STATEMENT PANEL — navy with gold mesh */}
        <FadeUp>
          <div className="relative overflow-hidden rounded-[28px] surface-navy text-cream shadow-[0_40px_80px_-30px_rgba(11,18,32,0.5)]">
            {/* mesh + grain */}
            <MeshGradient variant="navy" />
            <div className="grain-overlay-light" />

            {/* faint top hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="relative grid lg:grid-cols-12 gap-x-12 gap-y-8 px-7 py-14 lg:px-14 lg:py-20">
              {/* headline + CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[12px] font-medium tracking-tight text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(200,168,91,0.18)]" />
                  {locale === "fr" ? "Premier pas" : "First step"}
                </div>

                <h2 className="mt-5 font-serif text-display-lg text-cream text-balance">
                  {t.cta.title}
                </h2>

                <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.7] text-cream/75 text-pretty">
                  {t.cta.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <Magnetic
                    href={`${base}/contact`}
                    strength={0.2}
                    cursorLabel={locale === "fr" ? "Réserver" : "Book"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-brand-deep px-7 py-3.5 text-[14px] font-medium tracking-tight transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_18px_40px_-12px_rgba(200,168,91,0.55)] active:scale-[0.98]"
                  >
                    {t.cta.primary}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </Magnetic>
                  <a
                    href={site.phone.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/5 backdrop-blur px-6 py-3.5 text-[14px] font-medium text-cream transition-all duration-300 hover:bg-white/10 hover:border-cream/40"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.8} />
                    WhatsApp · {site.phone.primary}
                  </a>
                </div>

                {/* details rail */}
                <div className="mt-6 pt-7 border-t border-cream/12 max-w-[560px] grid grid-cols-3 gap-6">
                  {[
                    {
                      l: locale === "fr" ? "Réponse" : "Reply",
                      v: locale === "fr" ? "1 jour ouvré" : "1 working day",
                    },
                    {
                      l: locale === "fr" ? "Langues" : "Languages",
                      v: "AR · EN · FR",
                    },
                    {
                      l: locale === "fr" ? "Format" : "Format",
                      v: locale === "fr" ? "Cabinet · Visio" : "In-person · Video",
                    },
                  ].map((it, i) => (
                    <div key={i}>
                      <div className="text-[11px] tracking-tight text-cream/55">{it.l}</div>
                      <div className="mt-1 font-serif text-[15px] text-cream">{it.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* small floating booking card on the right — premium accent */}
              <div className="lg:col-span-5 lg:pl-4">
                <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-cream/12 p-6 lg:p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 100% 0%, rgba(200,168,91,0.15), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] tracking-tight text-cream/55">
                        {locale === "fr" ? "Première séance" : "First session"}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {locale === "fr" ? "Créneaux ouverts" : "Slots open"}
                      </span>
                    </div>
                    <p className="mt-3 font-serif text-[24px] leading-[1.15] text-cream tracking-[-0.01em] text-balance">
                      {locale === "fr"
                        ? "Cinquante minutes. Sans étiquette. Sans jugement."
                        : "Fifty minutes. No label. No judgment."}
                    </p>

                    <ul className="mt-6 space-y-3 text-[13.5px] text-cream/80">
                      {[
                        locale === "fr" ? "Cabinet à Zouk Mosbeh ou en visio" : "In-person at Zouk Mosbeh or by video",
                        locale === "fr" ? "Confidentialité absolue" : "Absolute confidentiality",
                        locale === "fr" ? "Sans ordonnance médicale" : "No medical referral required",
                      ].map((l) => (
                        <li key={l} className="flex items-start gap-2.5">
                          <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 pt-5 border-t border-cream/10 flex items-center justify-between">
                      <span className="text-[11.5px] text-cream/55">
                        {locale === "fr" ? "Tarif" : "Session fee"}
                      </span>
                      <span className="font-serif text-[15px] text-cream">
                        USD 80 — 120
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* LOCATIONS — clean premium grid below the panel */}
        <FadeUp delay={0.1} className="mt-6">
          <div className="flex items-end justify-between mb-6">
            <p className="micro-label">{t.locations.eyebrow}</p>
            <span className="text-[11.5px] tracking-tight text-muted">
              {site.locations.length} {locale === "fr" ? "lieux" : "places"}
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {site.locations.map((loc) => (
              <a
                key={loc.key}
                href={`https://www.google.com/maps/search/?api=1&query=${loc.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
                  (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="group spot-hover relative block overflow-hidden rounded-2xl surface-card p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-22px_rgba(11,18,32,0.16)]"
              >
                <span className="gold-line-grow rounded-t-2xl" aria-hidden />
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/22 to-gold/6 text-gold ring-1 ring-gold/25">
                    <MapPin className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-muted/60 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="mt-5">
                  <div className="font-serif text-[18px] text-ink leading-snug tracking-[-0.005em]">
                    {loc.name[locale]}
                  </div>
                  <div className="mt-1.5 text-[13.5px] text-muted leading-snug">
                    {loc.address[locale]}
                  </div>
                  <div className="mt-4 pt-4 border-t border-line/60 flex items-center gap-2 text-[12.5px] text-muted">
                    <Phone className="h-3 w-3 text-gold/80" strokeWidth={1.8} />
                    <a
                      href={loc.phoneHref}
                      onClick={(e) => e.stopPropagation()}
                      className="tabular-nums hover:text-brand transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
