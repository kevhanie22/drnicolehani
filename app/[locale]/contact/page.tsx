import { MessageCircle, Mail, Phone, AlertTriangle } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";
import { BookingForm } from "@/components/booking-form";
import { FadeUp } from "@/components/motion";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  return { title: t.nav.contact, description: t.contact.subtitle };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const lc: Locale = isLocale(locale) ? locale : "en";
  const t = getT(lc);
  return (
    <>
      <section className="pt-[100px] lg:pt-[120px] pb-8 lg:pb-10 bg-cream">
        <div className="container-tight text-center">
          <span className="eyebrow justify-center">{t.contact.eyebrow}</span>
          <h1 className="mt-5 font-serif text-display-xl text-brand-deep text-balance">{t.contact.title}</h1>
          <p className="mt-6 text-[17px] text-muted max-w-2xl mx-auto leading-relaxed text-pretty">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <FadeUp className="lg:col-span-7 rounded-2xl bg-white border border-line/60 p-7 lg:p-10 shadow-card">
            <BookingForm locale={lc} />
          </FadeUp>

          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1} className="rounded-2xl bg-brand-deep text-cream p-7 lg:p-9">
              <h3 className="font-serif text-2xl">{t.contact.direct.title}</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a href={site.phone.whatsappLink} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-cream/8 group-hover:bg-gold group-hover:text-brand-deep inline-flex items-center justify-center transition-colors">
                      <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[12px] tracking-[0.14em] uppercase text-cream/55">{t.contact.direct.whatsapp}</div>
                      <div className="text-[15px] mt-0.5 group-hover:text-gold transition-colors">{site.phone.primary}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={site.phone.primaryHref} className="flex items-start gap-3 group">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-cream/8 group-hover:bg-gold group-hover:text-brand-deep inline-flex items-center justify-center transition-colors">
                      <Phone className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[12px] tracking-[0.14em] uppercase text-cream/55">{t.contact.direct.call}</div>
                      <div className="text-[15px] mt-0.5 group-hover:text-gold transition-colors">{site.phone.primary}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 group">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-cream/8 group-hover:bg-gold group-hover:text-brand-deep inline-flex items-center justify-center transition-colors">
                      <Mail className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[12px] tracking-[0.14em] uppercase text-cream/55">{t.contact.direct.email}</div>
                      <div className="text-[15px] mt-0.5 group-hover:text-gold transition-colors">{site.email}</div>
                    </div>
                  </a>
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.2} className="rounded-2xl border border-red-200 bg-red-50/60 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <h4 className="font-medium text-red-900 text-[14px]">{t.contact.emergency.title}</h4>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-red-900/80">{t.contact.emergency.body}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </>
  );
}
