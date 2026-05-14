import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildEmail(p: Required<Pick<BookingPayload, "name" | "email" | "message">> & BookingPayload) {
  const rows: Array<[string, string]> = [
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone ?? "—"],
    ["About", p.service ?? "—"],
  ];

  const html = `
    <div style="font-family:Georgia,'EB Garamond',serif;max-width:560px;margin:auto;color:#0B1220;line-height:1.55">
      <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6B6256;margin:0 0 6px">
        New session request · drnicolehani.com
      </p>
      <h1 style="font-size:22px;margin:0 0 18px;letter-spacing:-0.01em">${escapeHtml(p.name)} has sent you a message</h1>
      <table style="border-collapse:collapse;width:100%;border:1px solid #E5DFD0;border-radius:10px;overflow:hidden;font-family:-apple-system,Segoe UI,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
            <tr>
              <td style="padding:10px 14px;background:#F7F2E8;color:#6B6256;width:120px;border-bottom:1px solid #E5DFD0">${k}</td>
              <td style="padding:10px 14px;border-bottom:1px solid #E5DFD0">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <div style="margin-top:22px;padding:18px 20px;background:#FBF7EE;border:1px solid #E5DFD0;border-radius:10px;white-space:pre-wrap;font-family:-apple-system,Segoe UI,sans-serif;font-size:14px">
${escapeHtml(p.message)}
      </div>
      <p style="margin-top:24px;font-size:12px;color:#6B6256">
        Reply directly to this email to respond to ${escapeHtml(p.name)} at ${escapeHtml(p.email)}.
      </p>
    </div>
  `;

  const text =
    `New session request — drnicolehani.com\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${p.message}\n\n` +
    `Reply to: ${p.email}`;

  return { html, text };
}

async function deliverWithResend(opts: {
  apiKey: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  service?: string;
}) {
  const fromAddress = process.env.BOOKING_FROM_EMAIL ?? "Dr. Nicole Hani <onboarding@resend.dev>";
  const { html, text } = buildEmail(opts);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [site.email],
      reply_to: opts.email,
      subject: `Session request — ${opts.name}`,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Resend ${res.status}: ${errBody}`);
  }
}

/**
 * FormSubmit zero-signup delivery. POSTs to formsubmit.co/ajax/{email}.
 *
 * First-ever submission triggers a one-time activation email to
 * nicoleabsi71@gmail.com — clicking the link in it enables forwarding for
 * good. All subsequent submissions arrive directly in the inbox.
 *
 * Docs: https://formsubmit.co/
 */
async function deliverWithFormSubmit(opts: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  service?: string;
}) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      Name: opts.name,
      Email: opts.email,
      Phone: opts.phone || "—",
      About: opts.service || "—",
      Message: opts.message,
      _subject: `Session request — ${opts.name}`,
      _replyto: opts.email,
      _captcha: "false",
      _template: "table",
    }),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`FormSubmit ${res.status}: ${errBody}`);
  }
}

export async function POST(req: Request) {
  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const payload = { name, email, message, phone: body.phone, service: body.service };

  // Preferred path: Resend (set RESEND_API_KEY in Vercel for production-grade
  // delivery + branded HTML email). Falls back to FormSubmit otherwise.
  const resendKey = process.env.RESEND_API_KEY;
  try {
    if (resendKey) {
      await deliverWithResend({ apiKey: resendKey, ...payload });
      return NextResponse.json({ ok: true, delivery: "resend" });
    }
    await deliverWithFormSubmit(payload);
    return NextResponse.json({ ok: true, delivery: "formsubmit" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[booking-request] delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
