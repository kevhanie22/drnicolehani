import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { WelcomeVideoSection } from "@/components/welcome-video-section";
import { ServicesSection } from "@/components/services-section";
import { ApproachSection } from "@/components/approach-section";
import { CredentialsSection } from "@/components/credentials-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { type Locale, isLocale } from "@/lib/i18n";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  return (
    <>
      <Hero locale={lc} />
      <AboutSection locale={lc} />
      <WelcomeVideoSection locale={lc} />
      <ServicesSection locale={lc} />
      <ApproachSection locale={lc} />
      <CredentialsSection locale={lc} />
      <FaqSection locale={lc} />
      <CtaSection locale={lc} />
    </>
  );
}
