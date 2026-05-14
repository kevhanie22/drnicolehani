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
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
      className="whatsapp-fab fixed z-40 group transition-[opacity,transform] duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex">
        {!reduce && (
          <span className="absolute inset-0 -m-1 rounded-full bg-[#25D366] opacity-25 animate-ping" />
        )}
        <span className="relative inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
        </span>
      </span>
      <span className="hidden sm:inline absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink text-cream text-[12px] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t.whatsapp}
      </span>
    </motion.a>
  );
}
