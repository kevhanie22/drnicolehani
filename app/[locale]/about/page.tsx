import { AboutSection } from "@/components/about-section";
import { CredentialsSection } from "@/components/credentials-section";
import { ApproachSection } from "@/components/approach-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  const isFr = lc === "fr";
  return {
    title: isFr
      ? "À propos — Dr Nicole Hani, psychologue clinicienne au Liban"
      : "About Dr. Nicole Hani — Senior Clinical Psychologist in Lebanon",
    description: t.about.body[0],
    alternates: {
      canonical: isFr ? "/fr/about" : "/about",
      languages: { en: "/about", fr: "/fr/about", "x-default": "/about" },
    },
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} />
      <AboutSection locale={lc} />
      <CredentialsSection locale={lc} />
      <ApproachSection locale={lc} />
      <FaqSection locale={lc} />
      <CtaSection locale={lc} />
    </>
  );
}

function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="pt-[100px] lg:pt-[120px] pb-8 lg:pb-12 bg-cream">
      <div className="container-tight text-center">
        <span className="eyebrow justify-center">{eyebrow}</span>
        <h1 className="mt-5 font-serif text-display-xl text-brand-deep text-balance">{title}</h1>
      </div>
    </section>
  );
}
