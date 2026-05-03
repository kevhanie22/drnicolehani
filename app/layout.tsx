import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0E2A5A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://drnicolehani.vercel.app"),
  title: {
    default: "Dr. Nicole Hani — Clinical Psychologist in Lebanon · CBT Therapist · Beirut",
    template: "%s · Dr. Nicole Hani — Psychologist in Lebanon",
  },
  description:
    "Dr. Nicole Absi Hani is a leading clinical psychologist in Lebanon with 30+ years of practice. CBT therapist treating children, adults, and couples in Beirut, Zouk Mosbeh, and Mount Lebanon. Sessions in Arabic, English, and French.",
  keywords: [
    "psychologist in Lebanon",
    "clinical psychologist Lebanon",
    "clinical psychologist Beirut",
    "CBT therapist Lebanon",
    "CBT therapist Beirut",
    "child psychologist Lebanon",
    "child psychologist Beirut",
    "couple therapy Lebanon",
    "couples therapist Beirut",
    "psychologist Zouk Mosbeh",
    "ADHD assessment Lebanon",
    "psychometric testing Lebanon",
    "Dr. Nicole Hani",
    "Dr. Nicole Absi Hani",
    "psychologue clinicienne Liban",
    "psychologue Beyrouth",
    "thérapie TCC Beyrouth",
    "psychologue enfants Liban",
  ],
  authors: [{ name: "Dr. Nicole Absi Hani" }],
  creator: "Dr. Nicole Absi Hani",
  publisher: "Clinique Dr. Nicole Hani",
  category: "Health",
  applicationName: "Dr. Nicole Hani · Clinical Psychology",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    siteName: "Dr. Nicole Hani — Clinical Psychologist in Lebanon",
    title: "Dr. Nicole Hani — Clinical Psychologist in Lebanon · CBT Therapist · Beirut",
    description:
      "30+ years of practice. CBT-certified clinical psychologist serving Beirut and Mount Lebanon. Children, adults, and couples therapy.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Dr. Nicole Hani — Clinical Psychologist in Lebanon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nicole Hani — Clinical Psychologist in Lebanon · CBT · Beirut",
    description: "30+ years of clinical practice in Beirut. Children, adults, and couples therapy.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "fr": "/fr",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "LB-JL",
    "geo.placename": "Zouk Mosbeh, Mount Lebanon",
    "geo.position": "33.9706;35.6131",
    "ICBM": "33.9706, 35.6131",
  },
};

const SITE_URL = "https://drnicolehani.vercel.app";

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${SITE_URL}/#person`,
  name: "Dr. Nicole Absi Hani",
  alternateName: ["Dr. Nicole Hani", "Nicole Hani"],
  jobTitle: "Clinical Psychologist & CBT Therapist",
  description:
    "Senior Lebanese clinical psychologist with 30+ years of practice in Beirut and Mount Lebanon. Certified in Cognitive Behavioural Therapy. PhD in Clinical Psychology from USEK.",
  medicalSpecialty: "Psychiatric",
  email: "nicoleabsi71@gmail.com",
  telephone: "+96171635800",
  url: SITE_URL,
  image: `${SITE_URL}/images/dr-nicole-hero.jpg`,
  priceRange: "$$",
  knowsLanguage: ["Arabic", "English", "French"],
  sameAs: [
    "https://www.instagram.com/dr_nicolehani/",
    "https://www.facebook.com/nicolehanipsychologist/",
    "https://www.linkedin.com/in/dr-nicole-absi-hani-595335224/",
  ],
  worksFor: [
    { "@type": "Hospital", name: "Saint Joseph University Hospital", address: "Dora, Beirut, Lebanon" },
    { "@type": "Hospital", name: "Aboujaoudé Hospital", address: "Jal El Dib, Mount Lebanon" },
    { "@type": "EducationalOrganization", name: "Saint Joseph University (USJ)" },
    { "@type": "EducationalOrganization", name: "Lebanese University" },
  ],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Holy Spirit University of Kaslik (USEK)" },
  ],
  areaServed: [
    { "@type": "City", name: "Beirut" },
    { "@type": "City", name: "Zouk Mosbeh" },
    { "@type": "City", name: "Jal El Dib" },
    { "@type": "AdministrativeArea", name: "Mount Lebanon" },
    { "@type": "Country", name: "Lebanon" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Salamé & Rizk Building",
    addressLocality: "Zouk Mosbeh",
    addressRegion: "Mount Lebanon",
    addressCountry: "LB",
  },
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#practice`,
  name: "Clinique Dr. Nicole Hani — Clinical Psychology Practice",
  alternateName: "Dr. Nicole Hani Clinical Psychology",
  description:
    "Premier clinical psychology practice in Beirut, Lebanon. Specializing in Cognitive Behavioural Therapy (CBT), psychometric testing, and therapy for children, adults, and couples.",
  image: `${SITE_URL}/images/dr-nicole-hero.jpg`,
  logo: `${SITE_URL}/images/logo-mark.png`,
  url: SITE_URL,
  telephone: "+96171635800",
  email: "nicoleabsi71@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD, LBP",
  paymentAccepted: "Cash",
  medicalSpecialty: "Psychiatric",
  founder: { "@id": `${SITE_URL}/#person` },
  foundingDate: "1996",
  knowsLanguage: ["Arabic", "English", "French"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Salamé & Rizk Building",
    addressLocality: "Zouk Mosbeh",
    addressRegion: "Mount Lebanon",
    addressCountry: "LB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.9706, longitude: 35.6131 },
  areaServed: [
    { "@type": "City", name: "Beirut" },
    { "@type": "AdministrativeArea", name: "Mount Lebanon" },
    { "@type": "Country", name: "Lebanon" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  availableService: [
    { "@type": "MedicalTherapy", name: "Cognitive Behavioural Therapy (CBT)" },
    { "@type": "MedicalTherapy", name: "Couple & Family Therapy" },
    { "@type": "MedicalTherapy", name: "Child & Adolescent Therapy" },
    { "@type": "MedicalTherapy", name: "Adult Psychotherapy" },
    { "@type": "DiagnosticProcedure", name: "Psychometric Assessment & IQ Testing" },
    { "@type": "DiagnosticProcedure", name: "ADHD Assessment (TOVA)" },
  ],
  sameAs: [
    "https://www.instagram.com/dr_nicolehani/",
    "https://www.facebook.com/nicolehanipsychologist/",
    "https://www.linkedin.com/in/dr-nicole-absi-hani-595335224/",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Dr. Nicole Hani",
  legalName: "Clinique Dr. Nicole Hani",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-mark.png`,
  founder: { "@id": `${SITE_URL}/#person` },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+96171635800",
    contactType: "customer service",
    areaServed: "LB",
    availableLanguage: ["Arabic", "English", "French"],
  },
  sameAs: [
    "https://www.instagram.com/dr_nicolehani/",
    "https://www.facebook.com/nicolehanipsychologist/",
    "https://www.linkedin.com/in/dr-nicole-absi-hani-595335224/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Dr. Nicole Hani — Clinical Psychologist in Lebanon",
  inLanguage: ["en", "fr"],
  publisher: { "@id": `${SITE_URL}/#org` },
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
