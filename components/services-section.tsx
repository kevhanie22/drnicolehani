"use client";
import Link from "next/link";
import { Baby, Heart, Users, ClipboardList, ArrowUpRight, Sparkles, type LucideIcon } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

const icons = { children: Baby, adults: Heart, couples: Users, assessments: ClipboardList } as const;

export function ServicesSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;

  // pull featured (Adults / CBT) out, render others as smaller cards
  const featured = t.services.items.find((i) => i.key === "adults")!;
  const rest = t.services.items.filter((i) => i.key !== "adults");

  return (
    <section
      id="services"
      className="relative py-14 lg:py-20 border-t border-line/70 overflow-hidden"
    >
      {/* gentle warm wash behind the section */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 100% 0%, rgba(200,168,91,0.10), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(14,42,90,0.05), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <FadeUp className="mb-10 max-w-2xl">
          <p className="micro-label">{t.services.eyebrow}</p>
          <h2 className="mt-4 font-serif text-[2rem] lg:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            {t.services.title}
          </h2>
        </FadeUp>

        {/* bento grid: featured spans 7 cols + 2 rows on lg, rest fills 5 cols */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto] gap-5 lg:gap-6">
          {/* FEATURED — Adult Therapy & CBT */}
          <StaggerItem className="lg:col-span-7 lg:row-span-2">
            <FeaturedCard locale={locale} item={featured} href={`${base}/services#${featured.key}`} />
          </StaggerItem>

          {/* three smaller cards */}
          {rest.map((it) => {
            const Icon = icons[it.key as keyof typeof icons];
            return (
              <StaggerItem key={it.key} className="lg:col-span-5">
                <SmallCard
                  href={`${base}/services#${it.key}`}
                  Icon={Icon}
                  title={it.title}
                  summary={it.summary}
                  bullets={it.bullets.slice(0, 3)}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Featured large card ---------- */

function FeaturedCard({
  locale,
  item,
  href,
}: {
  locale: Locale;
  item: { key: string; title: string; summary: string; bullets: string[] };
  href: string;
}) {
  return (
    <Link
      href={href}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
        (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group spot-hover relative block h-full overflow-hidden rounded-3xl surface-card-cream p-8 lg:p-10 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.20)]"
    >
      {/* gradient mesh inside the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(60% 40% at 100% 0%, rgba(200,168,91,0.22), transparent 60%), radial-gradient(40% 40% at 0% 100%, rgba(14,42,90,0.10), transparent 60%)",
        }}
      />
      <span className="gold-line-grow rounded-t-3xl" aria-hidden />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 text-brand-deep ring-1 ring-gold/30 shadow-[0_8px_20px_-10px_rgba(200,168,91,0.5)]">
              <Heart className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/8 text-brand px-2.5 py-1 text-[10.5px] font-medium tracking-tight">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              {locale === "fr" ? "Spécialité principale" : "Flagship specialty"}
            </span>
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-muted/70 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-1 group-hover:translate-x-1"
            strokeWidth={1.6}
          />
        </div>

        <h3 className="mt-6 font-serif text-[28px] lg:text-[34px] leading-[1.08] tracking-[-0.015em] text-ink text-balance max-w-[18ch]">
          {item.title}
        </h3>

        <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.7] text-muted text-pretty">
          {item.summary}
        </p>

        <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] text-ink/85">
          {item.bullets.slice(0, 6).map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8 flex items-center justify-between">
          <span className="text-[12.5px] tracking-tight text-muted">
            {locale === "fr"
              ? "Adolescents, adultes & adultes âgés"
              : "Teens, adults & older adults"}
          </span>
          <span className="text-[13px] font-medium text-brand inline-flex items-center gap-1.5">
            {locale === "fr" ? "Découvrir" : "Explore"}
            <span className="h-px w-6 bg-brand/40 transition-all group-hover:w-10 group-hover:bg-brand" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Small card ---------- */

function SmallCard({
  href,
  Icon,
  title,
  summary,
  bullets,
}: {
  href: string;
  Icon: LucideIcon;
  title: string;
  summary: string;
  bullets: string[];
}) {
  return (
    <Link
      href={href}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
        (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group spot-hover relative block h-full overflow-hidden rounded-2xl surface-card p-6 lg:p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.18)]"
    >
      <span className="gold-line-grow rounded-t-2xl" aria-hidden />
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/22 to-gold/6 text-gold ring-1 ring-gold/25">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted/60 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.6}
        />
      </div>

      <h3 className="mt-5 font-serif text-[20px] lg:text-[22px] leading-[1.18] text-ink text-balance">
        {title}
      </h3>

      <p className="mt-3 text-[14px] leading-[1.6] text-muted text-pretty">
        {summary}
      </p>

      <ul className="mt-5 space-y-1.5 text-[13.5px] text-ink/80">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-gold/80 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
