"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={site.phone.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="fixed bottom-5 right-5 z-50 group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex">
        {!reduce && (
          <>
            <span className="absolute inset-0 -m-1 rounded-full bg-[#25D366] opacity-30 animate-ping" />
            <span className="absolute inset-0 -m-3 rounded-full bg-[#25D366] opacity-15 animate-ping" style={{ animationDelay: "300ms" }} />
          </>
        )}
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
        </span>
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink text-cream text-[12px] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t.whatsapp}
      </span>
    </motion.a>
  );
}
