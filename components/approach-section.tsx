"use client";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

export function ApproachSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section
      id="approach"
      className="relative section-pad section-divider overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 30% at 100% 0%, rgba(200,168,91,0.08), transparent 60%)",
        }}
      />
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start mb-12">
          {/* Editorial photo — close-up of the work itself */}
          <FadeUp className="lg:col-span-5 lg:sticky lg:top-32">
            <figure className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[24px] bg-gradient-to-br from-gold/25 via-cream/0 to-brand/10"
              />
              <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden bg-line shadow-[0_30px_70px_-30px_rgba(11,18,32,0.28)] ring-1 ring-white/40">
                <Image
                  src="/images/session-adults.jpg"
                  alt={
                    locale === "fr"
                      ? "Une séance en cours — carnet de notes en premier plan, patient en arrière-plan"
                      : "A session in progress — therapist's notebook in foreground, client in soft focus"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-deep/55 via-brand-deep/15 to-transparent pointer-events-none" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif italic text-[14px] text-cream/95 leading-tight text-balance">
                    {locale === "fr"
                      ? "« On écoute d'abord. Le travail commence là. »"
                      : "“We listen first. The work begins there.”"}
                  </p>
                </figcaption>
              </div>
            </figure>
          </FadeUp>

          {/* Heading + pillars */}
          <div className="lg:col-span-7">
            <FadeUp className="mb-8 max-w-xl">
              <p className="micro-label">{t.approach.eyebrow}</p>
              <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
                {t.approach.title}
              </h2>
            </FadeUp>

            <Stagger className="grid sm:grid-cols-2 gap-4">
              {t.approach.pillars.map((p, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <StaggerItem key={p.title}>
                    <div
                      className="group relative h-full overflow-hidden rounded-2xl border border-line/70 p-6 lg:p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-26px_rgba(11,18,32,0.16)]"
                      style={{
                        background:
                          "linear-gradient(180deg, #FBF7EE 0%, #F3EDDD 100%)",
                      }}
                    >
                      <span className="gold-line-grow rounded-t-2xl" aria-hidden />
                      <span
                        aria-hidden
                        className="absolute top-4 right-5 font-serif italic text-[14px] text-gold/80 tabular-nums"
                      >
                        {num}
                      </span>

                      <h3 className="font-serif text-[19px] text-ink leading-tight tracking-[-0.01em]">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-muted text-pretty">
                        {p.body}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
