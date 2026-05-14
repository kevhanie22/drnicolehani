"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success";

export function BookingForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Compose a clean WhatsApp message — sent directly to Dr. Hani's phone.
    const lines =
      locale === "fr"
        ? [
            `Bonjour Dr Hani,`,
            ``,
            `Nom : ${name}`,
            `Email : ${email}`,
            phone ? `Téléphone : ${phone}` : null,
            service ? `Sujet : ${service}` : null,
            ``,
            message,
          ]
        : [
            `Hello Dr. Hani,`,
            ``,
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            service ? `About: ${service}` : null,
            ``,
            message,
          ];

    const text = lines.filter(Boolean).join("\n");
    const url = `${site.phone.whatsappLink}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp (Web on desktop, native app on mobile) in a new tab.
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
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
          {locale === "fr"
            ? "WhatsApp s'est ouvert."
            : "WhatsApp has opened."}
        </p>
        <p className="mt-3 text-[14px] text-muted max-w-[40ch] mx-auto leading-relaxed">
          {locale === "fr"
            ? "Appuyez sur « Envoyer » dans WhatsApp pour transmettre votre message au Dr Hani. Elle vous répondra sous un jour ouvré."
            : "Tap “Send” in WhatsApp to deliver your message to Dr. Hani. She'll reply within one working day."}
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
        {status === "sending"
          ? locale === "fr"
            ? "Ouverture de WhatsApp…"
            : "Opening WhatsApp…"
          : locale === "fr"
          ? "Envoyer via WhatsApp"
          : "Send via WhatsApp"}
        <Send className="h-4 w-4" strokeWidth={1.8} />
      </button>
      <p className="text-[12px] text-muted/85 leading-relaxed text-center sm:text-left">
        {locale === "fr"
          ? "WhatsApp s'ouvrira avec votre message déjà rédigé. Il vous suffira d'appuyer sur Envoyer."
          : "WhatsApp will open with your message already drafted — just tap Send."}
      </p>
    </form>
  );
}
