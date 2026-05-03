"use client";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

export function ApproachSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section
      id="approach"
      className="relative py-14 lg:py-20 border-t border-line/70 overflow-hidden"
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
        <FadeUp className="mb-10 max-w-2xl">
          <p className="micro-label">{t.approach.eyebrow}</p>
          <h2 className="mt-4 font-serif text-[2rem] lg:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            {t.approach.title}
          </h2>
        </FadeUp>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  {/* gold serif italic number, top-right */}
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 font-serif italic text-[14px] text-gold/80 tabular-nums"
                  >
                    {num}
                  </span>

                  <h3 className="font-serif text-[20px] text-ink leading-tight tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.65] text-muted text-pretty">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
