import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // TODO (Kevin): wire to Resend / SendGrid / formspree.
    // For now, log to server console so the demo works without keys.
    // eslint-disable-next-line no-console
    console.info("[booking-request]", { receivedAt: new Date().toISOString(), ...body });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
