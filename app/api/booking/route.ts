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

  // Basic email shape check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key wired up yet — keep the local-dev path working so the form
    // still resolves "success" and we can see submissions in logs.
    // eslint-disable-next-line no-console
    console.warn("[booking-request] RESEND_API_KEY missing — request not delivered", {
      receivedAt: new Date().toISOString(),
      ...body,
    });
    return NextResponse.json({ ok: true, delivery: "logged" });
  }

  const fromAddress = process.env.BOOKING_FROM_EMAIL ?? "Dr. Nicole Hani <onboarding@resend.dev>";
  const replyTo = email;
  const { html, text } = buildEmail({ name, email, message, phone: body.phone, service: body.service });
  const subject = `Session request — ${name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [site.email],
        reply_to: replyTo,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      // eslint-disable-next-line no-console
      console.error("[booking-request] Resend rejected", res.status, errBody);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivery: "sent" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[booking-request] Resend fetch threw", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
