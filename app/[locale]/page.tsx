import { Hero } from "@/components/hero";
import { WelcomeVideoSection } from "@/components/welcome-video-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { PressSection } from "@/components/press-section";
import { ArticlesSection } from "@/components/articles-section";
import { CtaSection } from "@/components/cta-section";
import { type Locale, isLocale } from "@/lib/i18n";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const isFr = lc === "fr";
  return {
    title: isFr
      ? "Dr Nicole Hani — Psychologue clinicienne · TCC · Beyrouth"
      : "Dr. Nicole Hani — Clinical Psychologist in Lebanon · CBT Therapist · Beirut",
    description: isFr
      ? "Dr Nicole Absi Hani — psychologue clinicienne et thérapeute TCC à Beyrouth. 30+ ans d'exercice. Enfants, adultes, couples. Séances en arabe, anglais et français."
      : "Dr. Nicole Absi Hani — clinical psychologist and CBT therapist in Beirut with 30+ years of practice. Children, adults, and couples. Sessions in Arabic, English, and French.",
    alternates: {
      canonical: isFr ? "/fr" : "/",
      languages: { en: "/", fr: "/fr", "x-default": "/" },
    },
    openGraph: {
      locale: isFr ? "fr_FR" : "en_US",
    },
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  return (
    <>
      <Hero locale={lc} />
      <WelcomeVideoSection locale={lc} />
      <ServicesSection locale={lc} />
      <AboutSection locale={lc} compact />
      <PressSection locale={lc} />
      <ArticlesSection locale={lc} />
      <CtaSection locale={lc} />
    </>
  );
}
