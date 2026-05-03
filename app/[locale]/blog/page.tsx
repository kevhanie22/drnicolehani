import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { CtaSection } from "@/components/cta-section";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  const isFr = lc === "fr";
  return {
    title: isFr
      ? "Réflexions — Articles d'une psychologue clinicienne au Liban"
      : "Insights — Articles from a Clinical Psychologist in Lebanon",
    description: t.blog.subtitle,
    alternates: {
      canonical: isFr ? "/fr/blog" : "/blog",
      languages: { en: "/blog", fr: "/fr/blog", "x-default": "/blog" },
    },
  };
}

export default function BlogIndexPage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  const base = lc === "en" ? "" : `/${lc}`;
  const formatter = new Intl.DateTimeFormat(lc === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <section className="pt-[100px] lg:pt-[120px] pb-8 lg:pb-12 bg-cream">
        <div className="container-tight text-center">
          <span className="eyebrow justify-center">{t.blog.eyebrow}</span>
          <h1 className="mt-5 font-serif text-display-xl text-brand-deep text-balance">{t.blog.title}</h1>
          <p className="mt-6 text-[17px] text-muted max-w-2xl mx-auto leading-relaxed text-pretty">{t.blog.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <Stagger className="grid md:grid-cols-2 gap-6 lg:gap-7">
            {t.blog.posts.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`${base}/blog/${p.slug}`}
                  className="group block h-full p-7 lg:p-9 rounded-2xl bg-white border border-line/60 hover:border-gold/40 hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-[12px] tracking-tight text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {formatter.format(new Date(p.date))}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {p.minutes} {t.blog.minutes}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-full">
                      {p.category}
                    </span>
                  </div>
                  <h2 className="mt-5 font-serif text-2xl lg:text-[26px] text-brand-deep leading-snug text-balance group-hover:text-brand transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-[15px] text-muted leading-relaxed text-pretty">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-brand link-underline">
                    {t.blog.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaSection locale={lc} />
    </>
  );
}
