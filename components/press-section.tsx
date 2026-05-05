"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

type Item = {
  id: string;
  provider: "youtube" | "facebook";
  url: string;
  outlet: string;
  topic: string;
};

function FacebookPoster({ outlet }: { outlet: string }) {
  // Branded custom poster for FB videos (no thumbnail API)
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0E2A5A 0%, #16224a 60%, #081E45 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 60% at 30% 20%, rgba(200,168,91,0.30), transparent 60%), radial-gradient(40% 50% at 80% 80%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grain-overlay-light opacity-60" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
        <p className="font-serif italic text-cream/95 text-[28px] leading-tight tracking-tight">
          {outlet}
        </p>
        <div className="mx-auto mt-3 h-px w-12 bg-gold/70" />
      </div>
    </div>
  );
}

function PressCard({ item, watchCta, locale }: { item: Item; watchCta: string; locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const embedSrc =
    item.provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1`
      : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          item.url,
        )}&show_text=false&autoplay=true&width=560`;

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
            {item.provider === "youtube" ? (
              <>
                <Image
                  src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                  alt={`${item.outlet} interview poster`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
              </>
            ) : (
              <FacebookPoster outlet={item.outlet} />
            )}

            <motion.div
              animate={reduce ? {} : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-brand-deep shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                {!reduce && (
                  <span className="absolute inset-0 -m-1.5 rounded-full bg-gold/30 animate-ping" />
                )}
                <Play className="relative h-4 w-4 fill-brand-deep ml-0.5" strokeWidth={1.4} />
              </span>
            </motion.div>

            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 ring-1 ring-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[9.5px] font-medium tracking-wider uppercase text-ink">
                {locale === "fr" ? "Vidéo" : "Video"}
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={embedSrc}
            title={`${item.outlet} — ${item.topic}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>

      <div className="p-4 lg:p-5">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-gold leading-tight">
          {item.outlet}
        </p>
        <h3 className="mt-2 font-serif text-[15px] leading-[1.3] text-ink text-balance">
          {item.topic}
        </h3>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-muted hover:text-brand transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {watchCta}
          <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={1.8} />
        </a>
      </div>
    </article>
  );
}

export function PressSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const items = t.press.items;
  return (
    <section
      id="press"
      className="relative py-10 lg:py-14 border-t border-line/30 overflow-hidden"
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
        <FadeUp className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-6 items-end">
          <div className="lg:col-span-7">
            <p className="micro-label">{t.press.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
              {t.press.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[16.5px] leading-[1.7] text-muted text-pretty">
              {t.press.body}
            </p>
          </div>
        </FadeUp>

        {/* Channel ribbon — quiet credibility wall */}
        <FadeUp delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4 border-y border-line/60">
            {[...new Set(items.map((i) => i.outlet))].map((outlet) => (
              <span
                key={outlet}
                className="font-serif italic text-[15px] text-muted/80"
              >
                {outlet}
              </span>
            ))}
          </div>
        </FadeUp>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <StaggerItem key={it.id}>
              <PressCard item={it as Item} watchCta={t.press.watchCta} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
