import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = locale === "en" ? "" : `/${locale}`;
  return (
    <footer className="relative bg-brand-deep text-cream/85 mt-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="container-wide pt-12 pb-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href={base || "/"} className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-11 w-11 items-center justify-center">
                <Image
                  src="/images/logo-mark.png"
                  alt="Dr. Nicole Hani logo"
                  width={88}
                  height={88}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-serif text-[20px] text-cream">Dr. Nicole Hani</span>
            </Link>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-cream/65">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                 className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-cream/15 hover:border-gold hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" strokeWidth={1.6} />
              </a>
              <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                 className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-cream/15 hover:border-gold hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" strokeWidth={1.6} />
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                 className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-cream/15 hover:border-gold hover:text-gold transition-colors">
                <Linkedin className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/90 mb-5">{t.footer.sections.explore}</h4>
            <ul className="space-y-3 text-[14px]">
              <li><Link href={`${base}/about`} className="hover:text-gold transition-colors">{t.nav.about}</Link></li>
              <li><Link href={`${base}/services`} className="hover:text-gold transition-colors">{t.nav.services}</Link></li>
              <li><Link href={`${base}/blog`} className="hover:text-gold transition-colors">{t.nav.blog}</Link></li>
              <li><Link href={`${base}/contact`} className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/90 mb-5">{t.footer.sections.contact}</h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href={site.phone.whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 hover:text-gold transition-colors">
                  <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.6} />
                  WhatsApp · {site.phone.primary}
                </a>
              </li>
              <li>
                <a href={site.phone.primaryHref} className="inline-flex items-center gap-2.5 hover:text-gold transition-colors">
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.6} />
                  {site.phone.primary}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-gold transition-colors">
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.6} />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[12px] text-cream/55">
          <span>{t.footer.legal}</span>
          <span>{t.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
