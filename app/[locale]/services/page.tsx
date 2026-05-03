import { ServicesSection } from "@/components/services-section";
import { ApproachSection } from "@/components/approach-section";
import { CtaSection } from "@/components/cta-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  return { title: t.nav.services, description: t.services.subtitle };
}

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  return (
    <>
      <section className="pt-[100px] lg:pt-[120px] pb-8 lg:pb-12 bg-cream">
        <div className="container-tight text-center">
          <span className="eyebrow justify-center">{t.services.eyebrow}</span>
          <h1 className="mt-5 font-serif text-display-xl text-brand-deep text-balance">{t.services.title}</h1>
          <p className="mt-6 text-[17px] text-muted max-w-2xl mx-auto leading-relaxed text-pretty">{t.services.subtitle}</p>
        </div>
      </section>
      <ServicesSection locale={lc} />
      <ApproachSection locale={lc} />
      <CtaSection locale={lc} />
    </>
  );
}
