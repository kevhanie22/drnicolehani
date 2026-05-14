"use client";
import { Award } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

export function CredentialsSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section
      id="credentials"
      className="relative section-pad section-divider overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 30% at 0% 100%, rgba(200,168,91,0.10), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        {/* Recognition — premium bento card */}
        <FadeUp className="mb-12">
          <div className="relative overflow-hidden rounded-3xl surface-card-cream p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 50% at 100% 0%, rgba(200,168,91,0.18), transparent 60%), radial-gradient(40% 50% at 0% 100%, rgba(14,42,90,0.06), transparent 60%)",
              }}
            />
            <div className="relative grid lg:grid-cols-12 gap-x-10 gap-y-8 items-center">
              <div className="lg:col-span-4 lg:pr-8 lg:border-r lg:border-gold/25">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold/30 to-gold/10 text-gold ring-1 ring-gold/30">
                    <Award className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <p className="text-[12px] font-medium tracking-tight text-gold/90">
                    {t.recognition.eyebrow}
                  </p>
                </div>
                <p className="font-serif text-[20px] lg:text-[22px] text-ink leading-[1.2] tracking-[-0.01em] text-balance">
                  {locale === "fr"
                    ? "Institutions, hôpitaux & corps professionnels."
                    : "Institutions, hospitals & professional bodies."}
                </p>
              </div>
              <ul className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-4">
                {t.recognition.items.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-2 text-[13.5px] text-ink/80 leading-snug"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold/60 shrink-0 transition-all duration-300 group-hover:bg-gold group-hover:scale-125"
                    />
                    <span className="font-serif italic transition-colors duration-300 group-hover:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-10">
          <div className="lg:col-span-8">
            <p className="micro-label">{t.credentials.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
              {t.credentials.title}
            </h2>
          </div>
        </FadeUp>

        {/* Two-column timeline */}
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10 border-t border-line/70 pt-12">
          <FadeUp>
            <h3 className="text-[12px] tracking-tight text-gold/90 font-medium mb-7 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-gold/70" />
              {locale === "fr" ? "Formation académique" : "Academic education"}
            </h3>
            <Stagger className="space-y-1">
              {t.credentials.education.map((e) => (
                <StaggerItem key={e.year + e.institution}>
                  <div className="group relative flex items-baseline gap-5 rounded-xl py-4 px-3 -mx-3 transition-colors duration-300 hover:bg-cream/70">
                    <div className="text-[12px] text-muted tabular-nums shrink-0 w-20 group-hover:text-gold transition-colors duration-300">
                      {e.year}
                    </div>
                    <div className="flex-1">
                      <div className="font-serif text-[17px] text-ink leading-snug tracking-[-0.005em]">
                        {e.institution}
                      </div>
                      <div className="mt-1 text-[13.5px] text-muted leading-snug">{e.detail}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h3 className="text-[12px] tracking-tight text-gold/90 font-medium mb-7 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-gold/70" />
              {locale === "fr" ? "Postes & affiliations" : "Appointments & affiliations"}
            </h3>
            <Stagger className="space-y-1">
              {t.credentials.appointments.map((a) => (
                <StaggerItem key={a.role + a.org}>
                  <div className="group relative flex items-baseline gap-5 rounded-xl py-4 px-3 -mx-3 transition-colors duration-300 hover:bg-cream/70">
                    <div className="text-[12px] text-muted tabular-nums shrink-0 w-20 group-hover:text-gold transition-colors duration-300">
                      {locale === "fr" ? "depuis " : "since "}
                      {a.since}
                    </div>
                    <div className="flex-1">
                      <div className="font-serif text-[17px] text-ink leading-snug tracking-[-0.005em]">
                        {a.role}
                      </div>
                      <div className="mt-1 text-[13.5px] text-muted leading-snug">{a.org}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
