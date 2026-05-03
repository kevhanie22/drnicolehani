"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader({ locale }: { locale: "en" | "fr" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (sessionStorage.getItem("dnh-intro-played")) return;
    setShow(true);
    sessionStorage.setItem("dnh-intro-played", "1");

    const dismiss = () => setShow(false);
    const t = setTimeout(dismiss, 1100);
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    window.addEventListener("click", dismiss, { once: true });
    window.addEventListener("keydown", dismiss, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("click", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[80] bg-brand-deep flex flex-col items-center justify-center text-cream"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex h-24 w-24 items-center justify-center"
          >
            <Image
              src="/images/logo-mark.png"
              alt="Dr. Nicole Hani logo"
              width={192}
              height={192}
              className="h-full w-full object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-center"
          >
            <p className="font-serif text-[20px] tracking-tight">Dr. Nicole Hani</p>
            <p className="mt-1 text-[10.5px] tracking-[0.22em] uppercase text-gold">
              {locale === "fr" ? "Psychologue clinicienne" : "Clinical Psychologist"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
