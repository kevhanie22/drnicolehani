"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function BookingForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      service: data.get("service"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      // graceful fallback: open mailto so the message isn't lost
      const subject = `Session request — ${payload.name}`;
      const body =
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n` +
        `About: ${payload.service}\n\n${payload.message}`;
      window.open(
        `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_self",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/40 bg-gold/5 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-gold mx-auto" strokeWidth={1.5} />
        <p className="mt-5 font-serif text-[22px] text-brand-deep text-balance">
          {t.contact.form.success}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="field-label">{t.contact.form.name}<span className="text-gold">*</span></label>
          <input id="name" name="name" type="text" required className="field" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">{t.contact.form.email}<span className="text-gold">*</span></label>
          <input id="email" name="email" type="email" required className="field" autoComplete="email" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="field-label">{t.contact.form.phone}</label>
          <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" inputMode="tel" />
        </div>
        <div>
          <label htmlFor="service" className="field-label">{t.contact.form.service}</label>
          <select id="service" name="service" className="field" defaultValue={t.contact.form.services[0]}>
            {t.contact.form.services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label">{t.contact.form.message}<span className="text-gold">*</span></label>
        <textarea
          id="message"
          name="message"
          required
          className="field-area"
          placeholder={t.contact.form.messagePlaceholder}
        />
      </div>

      <p className="text-[12.5px] text-muted leading-relaxed">{t.contact.form.consent}</p>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-xl bg-red-50 text-red-700 p-3.5 text-[13px]"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={1.8} />
            <span>{t.contact.form.error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
        <Send className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </form>
  );
}
