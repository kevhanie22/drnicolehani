export const site = {
  name: "Dr. Nicole Hani",
  fullName: "Dr. Nicole Absi Hani",
  title: {
    en: "Clinical Psychologist & CBT Therapist",
    fr: "Psychologue Clinicienne & Thérapeute TCC",
  },
  baseUrl: "https://drnicolehani.com",
  email: "nicoleabsi71@gmail.com",
  phone: {
    primary: "+961 71 635 800",
    primaryHref: "tel:+96171635800",
    mobile: "+961 3 909 381",
    mobileHref: "tel:+9613909381",
    whatsapp: "96171635800",
    whatsappLink: "https://wa.me/96171635800",
  },
  socials: {
    instagram: "https://www.instagram.com/dr_nicolehani/",
    facebook: "https://www.facebook.com/nicolehanipsychologist/",
    linkedin: "https://www.linkedin.com/in/dr-nicole-absi-hani-595335224",
  },
  locations: [
    {
      key: "private",
      name: { en: "Private Clinic", fr: "Cabinet privé" },
      address: { en: "Salamé & Rizk Building, Zouk Mosbeh, Lebanon", fr: "Immeuble Salamé & Rizk, Zouk Mosbeh, Liban" },
      phone: "+961 71 635 800",
      phoneHref: "tel:+96171635800",
      hours: { en: "Mon–Fri · By appointment", fr: "Lun–Ven · Sur rendez-vous" },
      mapsQuery: "Salamé+Rizk+Building+Zouk+Mosbeh+Lebanon",
    },
    {
      key: "saint-joseph",
      name: { en: "Saint Joseph University Hospital", fr: "Hôpital Universitaire Saint-Joseph" },
      address: { en: "Dora, Beirut", fr: "Dora, Beyrouth" },
      phone: "+961 1 240 111 ext. 1170 / 1171",
      phoneHref: "tel:+9611240111",
      hours: { en: "Outpatient consultation", fr: "Consultation externe" },
      mapsQuery: "Hotel-Dieu+de+France+Beirut",
    },
    {
      key: "abou-jaoude",
      name: { en: "Aboujaoudé Hospital", fr: "Hôpital Aboujaoudé" },
      address: { en: "Jal El Dib, Mount Lebanon", fr: "Jal El Dib, Mont-Liban" },
      phone: "+961 4 718 000 ext. 6100",
      phoneHref: "tel:+9614718000",
      hours: { en: "Wednesdays · 12:00 to 16:00", fr: "Mercredis · 12h00 à 16h00" },
      mapsQuery: "Abou+Jaoude+Hospital+Jal+El+Dib",
    },
  ],
} as const;

export type SiteConfig = typeof site;
