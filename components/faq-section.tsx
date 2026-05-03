"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp } from "./motion";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="relative py-14 lg:py-20 border-t border-line/70 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 30% at 100% 50%, rgba(200,168,91,0.07), transparent 60%)",
        }}
      />
      <div className="container-wide relative grid lg:grid-cols-12 gap-x-12 gap-y-8">
        <FadeUp className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <p className="micro-label">{t.faq.eyebrow}</p>
          <h2 className="mt-4 font-serif text-[2rem] lg:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            {t.faq.title}
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.65] text-muted max-w-[34ch]">
            {locale === "fr"
              ? "Six questions qui reviennent souvent. Si la vôtre n'y est pas, écrivez-moi."
              : "Six questions that come up often. If yours isn't here, write to me."}
          </p>
        </FadeUp>

        <div className="lg:col-span-7 lg:col-start-6 space-y-2">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <div
                  className={`group relative rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-gold/40 bg-gradient-to-br from-cream/80 to-white/30 shadow-[0_18px_40px_-26px_rgba(11,18,32,0.18)]"
                      : "border-line/70 bg-transparent hover:border-gold/30 hover:bg-cream/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start gap-5 px-5 py-5 lg:px-7 lg:py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`mt-1 font-serif italic text-[13.5px] tabular-nums shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-gold" : "text-gold/60 group-hover:text-gold"
                      }`}
                    >
                      {num}
                    </span>
                    <span className="flex-1 font-serif text-[17.5px] lg:text-[19px] text-ink leading-[1.35] tracking-[-0.005em]">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 mt-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-brand text-cream rotate-45"
                          : "bg-cream/60 text-muted ring-1 ring-line group-hover:bg-gold/15 group-hover:text-gold group-hover:ring-gold/30"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pl-12 lg:px-7 lg:pl-[3.25rem] pb-6 pr-12 max-w-[62ch] text-[15px] leading-[1.7] text-muted text-pretty">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
