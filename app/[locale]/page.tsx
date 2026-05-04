import { Hero } from "@/components/hero";
import { WelcomeVideoSection } from "@/components/welcome-video-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { PressSection } from "@/components/press-section";
import { CtaSection } from "@/components/cta-section";
import { type Locale, isLocale } from "@/lib/i18n";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  return (
    <>
      <Hero locale={lc} />
      <WelcomeVideoSection locale={lc} />
      <ServicesSection locale={lc} />
      <AboutSection locale={lc} compact />
      <PressSection locale={lc} />
      <CtaSection locale={lc} />
    </>
  );
}
