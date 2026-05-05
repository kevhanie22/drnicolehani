"use client";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

export function ArticlesSection({ locale }: { locale: Locale }) {
  const t = getT(locale);

  // ItemList schema — boosts SEO citation signal
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.articles.title,
    description: t.articles.body,
    numberOfItems: t.articles.items.length,
    itemListElement: t.articles.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: it.title,
        about: it.topic,
        url: it.url,
        publisher: { "@type": "Organization", name: it.outlet },
        author: { "@type": "Person", name: "Dr. Nicole Hani", url: "https://drnicolehani.vercel.app/" },
        mentions: { "@type": "Person", name: "Dr. Nicole Absi Hani", "@id": "https://drnicolehani.vercel.app/#person" },
      },
    })),
  };

  return (
    <section
      id="articles"
      className="relative py-14 lg:py-20 border-t border-line/70 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 30% at 100% 100%, rgba(200,168,91,0.08), transparent 60%)",
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="container-wide relative">
        <FadeUp className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-10 items-end">
          <div className="lg:col-span-7">
            <p className="micro-label">{t.articles.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
              {t.articles.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15.5px] leading-[1.7] text-muted text-pretty">
              {t.articles.body}
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {t.articles.items.map((it) => (
            <StaggerItem key={it.id}>
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
                  (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="group spot-hover relative block h-full overflow-hidden rounded-2xl surface-card p-7 lg:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.16)]"
                data-cursor={locale === "fr" ? "Lire" : "Read"}
              >
                <span className="gold-line-grow rounded-t-2xl" aria-hidden />
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/22 to-gold/6 text-gold ring-1 ring-gold/25">
                      <Newspaper className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold leading-tight">
                        {it.outlet}
                      </p>
                      <p className="text-[10.5px] tracking-tight text-muted leading-tight mt-0.5">
                        {it.date}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted/60 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="font-serif text-[20px] lg:text-[22px] text-ink leading-[1.25] tracking-[-0.005em] text-balance">
                  {it.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-muted text-pretty">
                  {it.topic}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-brand font-medium">
                  {t.articles.readCta}
                  <span aria-hidden className="h-px w-6 bg-brand/40 transition-all duration-300 group-hover:w-10 group-hover:bg-brand" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
