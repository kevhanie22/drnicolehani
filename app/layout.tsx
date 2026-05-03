import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const inter = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drnicolehani.com"),
  title: {
    default: "Dr. Nicole Hani — Clinical Psychologist & CBT Therapist · Beirut, Lebanon",
    template: "%s · Dr. Nicole Hani",
  },
  description:
    "Dr. Nicole Absi Hani is a Lebanese clinical psychologist with 30+ years of practice. CBT-certified by Hôpital Sainte-Anne, Paris. Therapy for children, adults, and couples in Beirut & Mount Lebanon.",
  keywords: [
    "clinical psychologist Lebanon",
    "CBT therapist Beirut",
    "Dr. Nicole Hani",
    "Dr. Nicole Absi Hani",
    "couples therapy Lebanon",
    "child psychologist Zouk Mosbeh",
    "psychologue clinicienne Liban",
    "thérapie TCC Beyrouth",
  ],
  authors: [{ name: "Dr. Nicole Absi Hani" }],
  creator: "Dr. Nicole Absi Hani",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dr. Nicole Hani",
    title: "Dr. Nicole Hani — Clinical Psychologist & CBT Therapist",
    description:
      "30+ years of clinical practice. CBT-certified, Hôpital Sainte-Anne, Paris. Therapy for children, adults, and couples in Lebanon.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nicole Hani — Clinical Psychologist & CBT Therapist",
    description: "30+ years of clinical practice in Beirut and Mount Lebanon.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", fr: "/fr" },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand focus:text-cream focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to main content
        </a>
        {children}

        {/* Practitioner schema for AI / Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr. Nicole Absi Hani",
              alternateName: "Dr. Nicole Hani",
              jobTitle: "Clinical Psychologist & CBT Therapist",
              medicalSpecialty: "Psychology",
              email: "nicoleabsi71@gmail.com",
              telephone: "+961-71-635800",
              url: "https://drnicolehani.com",
              image: "https://drnicolehani.com/images/dr-nicole-hero.jpg",
              sameAs: [
                "https://www.instagram.com/dr_nicolehani/",
                "https://www.facebook.com/nicolehanipsychologist/",
                "https://www.linkedin.com/in/dr-nicole-absi-hani-595335224/",
              ],
              worksFor: [
                { "@type": "Hospital", name: "Aboujaoudé Hospital", address: "Jal El Dib, Lebanon" },
                { "@type": "Hospital", name: "Hôtel-Dieu de France · USJ", address: "Achrafieh, Beirut, Lebanon" },
                { "@type": "EducationalOrganization", name: "Saint Joseph University" },
                { "@type": "EducationalOrganization", name: "Lebanese University" },
              ],
              alumniOf: [
                { "@type": "EducationalOrganization", name: "Holy Spirit University of Kaslik (USEK)" },
                { "@type": "EducationalOrganization", name: "Hôpital Sainte-Anne, Paris" },
              ],
              knowsLanguage: ["English", "French", "Arabic"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Salamé & Rizk Building",
                addressLocality: "Zouk Mosbeh",
                addressCountry: "LB",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
