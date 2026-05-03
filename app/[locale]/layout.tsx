import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Cursor } from "@/components/cursor";
import { IntroLoader } from "@/components/intro-loader";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(locale)) notFound();

  return (
    <SmoothScrollProvider>
      <IntroLoader locale={locale} />
      <Cursor />
      <Nav locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </SmoothScrollProvider>
  );
}
