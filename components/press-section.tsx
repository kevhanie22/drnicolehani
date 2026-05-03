"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

type Item = { id: string; outlet: string; topic: string };

function PressCard({ item, watchCta, locale }: { item: Item; watchCta: string; locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  return (
    <article className="group relative overflow-hidden rounded-2xl surface-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.18)]">
      <span className="gold-line-grow rounded-t-2xl" aria-hidden />
      <div className="relative aspect-video bg-brand-deep overflow-hidden rounded-t-2xl">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group/btn absolute inset-0 cursor-pointer w-full h-full"
            aria-label={`${watchCta}: ${item.outlet}`}
            data-cursor={locale === "fr" ? "Lire" : "Play"}
          >
            <Image
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              alt={`${item.outlet} interview poster`}
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
            <motion.div
              animate={reduce ? {} : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-brand-deep shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                {!reduce && (
                  <span className="absolute inset-0 -m-1.5 rounded-full bg-gold/30 animate-ping" />
                )}
                <Play className="relative h-5 w-5 fill-brand-deep ml-0.5" strokeWidth={1.4} />
              </span>
            </motion.div>
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 ring-1 ring-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] font-medium tracking-wider uppercase text-ink">
                {locale === "fr" ? "Diffusé" : "Broadcast"}
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1`}
            title={`${item.outlet} — ${item.topic}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>

      <div className="p-5 lg:p-6">
        <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold">
          {item.outlet}
        </p>
        <h3 className="mt-2.5 font-serif text-[17.5px] leading-[1.3] text-ink text-balance">
          {item.topic}
        </h3>
        <a
          href={`https://www.youtube.com/watch?v=${item.id}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-muted hover:text-brand transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {watchCta}
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
        </a>
      </div>
    </article>
  );
}

export function PressSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section
      id="press"
      className="relative py-14 lg:py-20 border-t border-line/70 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 30% at 0% 100%, rgba(200,168,91,0.10), transparent 60%), radial-gradient(40% 30% at 100% 0%, rgba(14,42,90,0.05), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <FadeUp className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-10">
          <div className="lg:col-span-6">
            <p className="micro-label">{t.press.eyebrow}</p>
            <h2 className="mt-4 font-serif text-[2rem] lg:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
              {t.press.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <p className="text-[15.5px] leading-[1.7] text-muted text-pretty">
              {t.press.body}
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5">
          {t.press.items.map((it) => (
            <StaggerItem key={it.id}>
              <PressCard item={it} watchCta={t.press.watchCta} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
