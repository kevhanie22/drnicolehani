import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Cursor } from "@/components/cursor";
import { LocaleLangSetter } from "@/components/locale-lang-setter";

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
      <LocaleLangSetter locale={locale} />
      <Cursor />
      <Nav locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </SmoothScrollProvider>
  );
}
