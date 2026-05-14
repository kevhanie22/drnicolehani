"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "mailto";

export function BookingForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    // Try API delivery first (Resend if RESEND_API_KEY is set, else FormSubmit)
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
    } catch {
      // network error — drop into mailto fallback below
    }

    // Fallback: open the visitor's email client with the message pre-filled.
    // No account / API key required; works on every device.
    const subject = `Session request — ${payload.name}`;
    const body =
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n` +
      `About: ${payload.service}\n\n${payload.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
    form.reset();
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

  if (status === "mailto") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/40 bg-gold/5 p-10 text-center"
      >
        <Mail className="h-12 w-12 text-gold mx-auto" strokeWidth={1.5} />
        <p className="mt-5 font-serif text-[22px] text-brand-deep text-balance">
          {locale === "fr"
            ? "Votre application e-mail s'est ouverte."
            : "Your email app has opened."}
        </p>
        <p className="mt-3 text-[14px] text-muted max-w-[40ch] mx-auto leading-relaxed">
          {locale === "fr"
            ? "Cliquez sur « Envoyer » dans votre messagerie pour finaliser la demande. Le Dr Hani vous répondra sous un jour ouvré."
            : "Click “Send” in your email app to finish. Dr. Hani will reply within one working day."}
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
