"use client";
import Link from "next/link";
import Image from "next/image";
import { Baby, Heart, Users, ClipboardList, ArrowUpRight, type LucideIcon } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp, Stagger, StaggerItem } from "./motion";

const icons = { children: Baby, adults: Heart, couples: Users, assessments: ClipboardList } as const;

// Photo + label tuples per service. Photos are landscape-cropped editorial backdrops
// pulled from Unsplash and saved locally under /public/images/.
const visuals: Record<
  string,
  { src: string; alt: { en: string; fr: string }; focal: string }
> = {
  adults: {
    src: "/images/service-adults.jpg",
    alt: {
      en: "Two hands reaching toward each other against an open sky — a metaphor for therapeutic connection",
      fr: "Deux mains tendues l'une vers l'autre contre un ciel ouvert — métaphore du lien thérapeutique",
    },
    focal: "object-[center_35%]",
  },
  children: {
    src: "/images/session-children.jpg",
    alt: {
      en: "A young child working through an alphabet exercise with Dr. Hani during a session",
      fr: "Une jeune patiente travaille sur un exercice de lettres avec Dr Hani",
    },
    focal: "object-center",
  },
  couples: {
    src: "/images/service-couples.jpg",
    alt: {
      en: "A couple walking down a sunlit street holding hands — partnership and shared work",
      fr: "Un couple marchant main dans la main dans une rue ensoleillée — partenariat et travail partagé",
    },
    focal: "object-[center_60%]",
  },
  assessments: {
    src: "/images/service-assess.jpg",
    alt: {
      en: "A hand writing with a fountain pen on a notebook under low warm light — precise clinical work",
      fr: "Une main écrit au stylo plume sur un carnet sous une lumière chaude — travail clinique précis",
    },
    focal: "object-[center_30%]",
  },
};

export function ServicesSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;

  const featured = t.services.items.find((i) => i.key === "adults")!;
  const children = t.services.items.find((i) => i.key === "children")!;
  const rest = t.services.items.filter((i) => i.key !== "adults" && i.key !== "children");

  return (
    <section
      id="services"
      className="relative section-pad section-divider overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 100% 0%, rgba(200,168,91,0.10), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(14,42,90,0.05), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <FadeUp className="mb-8 max-w-2xl">
          <p className="micro-label">{t.services.eyebrow}</p>
          <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
            {t.services.title}
          </h2>
        </FadeUp>

        {/* Bento — top row: Adults featured (7) + Children (5).
            Bottom row: Couples (6) + Assessments (6). All cards photo-backed. */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <StaggerItem className="lg:col-span-7">
            <PhotoServiceCard
              size="featured"
              locale={locale}
              service={featured}
              icon={icons.adults}
              visual={visuals.adults}
              eyebrow={locale === "fr" ? "Spécialité principale" : "Flagship specialty"}
              href={`${base}/services#${featured.key}`}
            />
          </StaggerItem>

          <StaggerItem className="lg:col-span-5">
            <PhotoServiceCard
              size="standard"
              locale={locale}
              service={children}
              icon={icons.children}
              visual={visuals.children}
              eyebrow={locale === "fr" ? "Enfants & adolescents" : "Children & adolescents"}
              href={`${base}/services#${children.key}`}
            />
          </StaggerItem>

          {rest.map((it) => {
            const v = visuals[it.key];
            const Icon = icons[it.key as keyof typeof icons];
            const eyebrowLabel =
              it.key === "couples"
                ? locale === "fr" ? "Couples & familles" : "Couples & families"
                : locale === "fr" ? "Bilans & rapports" : "Assessment & reports";
            return (
              <StaggerItem key={it.key} className="lg:col-span-6">
                <PhotoServiceCard
                  size="standard"
                  locale={locale}
                  service={it}
                  icon={Icon}
                  visual={v}
                  eyebrow={eyebrowLabel}
                  href={`${base}/services#${it.key}`}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Unified photo-backdrop service card ---------- */

function PhotoServiceCard({
  size,
  locale,
  service,
  icon: Icon,
  visual,
  eyebrow,
  href,
}: {
  size: "featured" | "standard";
  locale: Locale;
  service: { key: string; title: string; summary: string; bullets: string[] };
  icon: LucideIcon;
  visual: { src: string; alt: { en: string; fr: string }; focal: string };
  eyebrow: string;
  href: string;
}) {
  const isFeatured = size === "featured";
  const minH = isFeatured ? "min-h-[460px] lg:min-h-[520px]" : "min-h-[400px] lg:min-h-[460px]";
  const titleSize = isFeatured
    ? "text-[28px] lg:text-[34px] leading-[1.08]"
    : "text-[24px] lg:text-[26px] leading-[1.12]";
  const bulletCount = isFeatured ? 5 : 3;

  return (
    <Link
      href={href}
      className={`group relative block h-full overflow-hidden rounded-3xl bg-brand-deep text-cream transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.30)] ring-1 ring-ink/5 ${minH}`}
    >
      <Image
        src={visual.src}
        alt={visual.alt[locale]}
        fill
        sizes={isFeatured ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 1024px) 100vw, 520px"}
        className={`object-cover ${visual.focal} transition-transform duration-700 group-hover:scale-[1.03]`}
      />
      {/* tonal overlay — readable cream text on every photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/65 to-brand-deep/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 0% 100%, rgba(200,168,91,0.16), transparent 55%)",
        }}
      />
      <span className="gold-line-grow rounded-t-3xl" aria-hidden />

      <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/12 backdrop-blur px-3 py-1 ring-1 ring-cream/20 text-[10.5px] tracking-[0.14em] uppercase text-cream/85 font-medium">
            <Icon className="h-3 w-3" strokeWidth={2} />
            {eyebrow}
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-cream/70 transition-all duration-300 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1"
            strokeWidth={1.6}
          />
        </div>

        <div>
          <h3 className={`font-serif ${titleSize} tracking-[-0.01em] text-cream text-balance`}>
            {service.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-cream/80 text-pretty max-w-[42ch]">
            {service.summary}
          </p>

          <ul
            className={`mt-5 ${
              isFeatured ? "grid sm:grid-cols-2 gap-x-6 gap-y-2" : "grid grid-cols-1 gap-y-2"
            } text-[13.5px] text-cream/85`}
          >
            {service.bullets.slice(0, bulletCount).map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-cream/15 flex items-center justify-between">
            <span className="text-[12.5px] tracking-tight text-cream/65">
              {service.key === "adults"
                ? locale === "fr"
                  ? "Adolescents, adultes & adultes âgés"
                  : "Teens, adults & older adults"
                : service.key === "children"
                ? locale === "fr"
                  ? "À partir de 4 ans"
                  : "From age 4"
                : service.key === "couples"
                ? locale === "fr"
                  ? "Couples & systèmes familiaux"
                  : "Couples & family systems"
                : locale === "fr"
                ? "QI · TDAH · personnalité"
                : "IQ · ADHD · personality"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gold">
              {locale === "fr" ? "Découvrir" : "Explore"}
              <span className="h-px w-6 bg-gold/50 transition-all group-hover:w-10 group-hover:bg-gold" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
