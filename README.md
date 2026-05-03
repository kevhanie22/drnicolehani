# Dr. Nicole Hani — Official website

Bilingual (EN/FR) website for **Dr. Nicole Absi Hani** — Lebanese clinical psychologist, CBT therapist, professor at Saint Joseph University and Lebanese University.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (24 prerendered pages)
npm run start        # serve the production build
```

---

## Stack

- **Framework**: Next.js 14.2 (App Router, RSC, route handlers)
- **Styling**: Tailwind CSS 3.4 with a custom design system (navy + gold + cream palette)
- **Type system**: TypeScript 5.6 (strict)
- **Animation**: Framer Motion 11 (`whileInView` for scroll-triggered fades/staggers)
- **Icons**: lucide-react (consistent stroke icon family)
- **Fonts**: Playfair Display (headings, italic) + Inter (body) via `next/font`
- **i18n**: hand-rolled EN/FR with route-level locale (`/` = English, `/fr` = French) and middleware-based default-locale rewrite

---

## Project structure

```
app/
  layout.tsx                  # root layout, fonts, JSON-LD Physician schema
  globals.css                 # design tokens + utility classes
  [locale]/
    layout.tsx                # nav + footer + WhatsApp button per locale
    page.tsx                  # home
    about/page.tsx
    services/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx      # blog post
    contact/page.tsx
  api/booking/route.ts        # POST handler for the contact form
  sitemap.ts                  # dynamic sitemap (all locales + posts)
  robots.ts
middleware.ts                 # rewrites "/about" -> "/en/about" so English lives at the root
components/
  nav.tsx, footer.tsx, whatsapp-button.tsx
  hero.tsx, services-section.tsx, about-section.tsx,
  approach-section.tsx, credentials-section.tsx,
  testimonials-section.tsx, locations-section.tsx,
  cta-section.tsx, booking-form.tsx
  motion.tsx                  # FadeUp / Stagger primitives
  decor.tsx                   # FloatingOrb, GoldDivider
lib/
  i18n.ts                     # locale type + helpers
  site.ts                     # phones, locations, social URLs
  blog.ts                     # bilingual post bodies
  translations/{en,fr,index}.ts
public/
  images/dr-nicole-hero.svg   # PLACEHOLDER — replace with real photos (see below)
  favicon.svg
  og-image.svg
```

---

## Brand system

| Token        | Value     | Use                                |
|--------------|-----------|------------------------------------|
| `brand-deep` | `#081E45` | Footer, dark sections              |
| `brand`      | `#0E2A5A` | Primary buttons, headings accents  |
| `brand-500`  | `#1E3D7C` | Eyebrow text, hovers               |
| `gold`       | `#C8A85B` | Accents, dividers, badges          |
| `cream`      | `#FBF8F1` | Page background                    |
| `ink`        | `#0B1220` | Body text                          |
| `muted`      | `#5B6470` | Secondary text                     |

Type:
- **Headings**: `Playfair Display` (italic for emphasis on key words)
- **Body**: `Inter` (16–17px on mobile, 16px minimum)

Motion: 150–700ms, `cubic-bezier(0.22, 1, 0.36, 1)` ease-out, viewport-triggered, respects `prefers-reduced-motion`.

---

## Replacing the placeholder photos

The hero portrait + about portrait currently use `public/images/dr-nicole-hero.svg` (a stylised placeholder).
To use her real photos:

1. Drop the photos in `public/images/`:
   - `dr-nicole-hero.jpg` — vertical portrait (~880×1100, the headshot from Wadih Chlink Photography is perfect)
   - `dr-nicole-portrait.jpg` — second photo for the About section
2. Update three lines:
   - `components/hero.tsx` → `src="/images/dr-nicole-hero.jpg"`
   - `components/about-section.tsx` → `src="/images/dr-nicole-portrait.jpg"`
   - In `next.config.mjs` you can remove `dangerouslyAllowSVG` since you'll be on JPGs.
3. Generate a real OG image at `public/og-image.jpg` (1200×630) and update `app/layout.tsx` `images: ["/og-image.jpg"]`.

---

## Wiring the contact form to a real inbox

`app/api/booking/route.ts` currently logs the submission to the server console. To deliver real emails, drop in one of:

**Resend (recommended, 100 emails/day free):**
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);
await resend.emails.send({
  from: "booking@drnicolehani.com",
  to: "nicoleabsi71@gmail.com",
  subject: `New session request — ${name}`,
  text: `From: ${name} <${email}> · ${phone}\nAbout: ${service}\n\n${message}`,
});
```

**Formspree:** point the form `action` to your Formspree endpoint and remove the route handler.

The frontend already has a graceful fallback — if the API fails, it opens the user's mail client with a prefilled `mailto:` to `nicoleabsi71@gmail.com`. So the form is *never* a dead end.

---

## Deploying

The fastest path is **Vercel** (zero config):

```bash
npx vercel       # link the project
npx vercel --prod
```

Then point her domain (drnicolehani.com) at Vercel — DNS instructions appear in the dashboard. SSL is automatic.

Alternative hosts: Netlify, Cloudflare Pages — same build command (`npm run build`).

---

## Content sourcing

Bio, credentials, and locations were aggregated from her public profiles:
- LinkedIn (Dr. Nicole Absi Hani)
- Aboujaoudé Hospital physician profile (EN + FR)
- TrakMD listing
- Saint Joseph University (USJ) faculty page
- Instagram `@dr_nicolehani` and Facebook `@nicolehanipsychologist`
- Lebanon Ministry of Public Health licensed-psychologists registry

All testimonials are anonymised illustrative composites — feel free to replace them with real (consented) patient quotes via `lib/translations/{en,fr}.ts`.
