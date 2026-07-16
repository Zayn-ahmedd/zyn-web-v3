/**
 * Zynovax — Centralized SEO Configuration
 * Single source of truth for all company data, used by metadata generators,
 * JSON-LD schema builders, and LLM optimization files.
 */

export const SITE_CONFIG = {
  // ─── Company Identity ───
  name: "Zynovax",
  legalName: "Zynovax",
  tagline: "Creative Branding & Digital Marketing",
  description:
    "Zynovax is a global creative branding and digital marketing firm. We engineer integrated growth systems — visual identity, social media management, and performance marketing — that scale revenue predictably for ambitious enterprises.",
  shortDescription:
    "Integrated Brand Growth Agency specializing in Visual Identity, Social Media Management, and Performance Marketing.",
  foundingYear: 2025,
  slogan: "Borders are imaginary; your scale is absolute.",

  // ─── Domain & URLs ───
  url: "https://www.zynovax.in",
  domain: "www.zynovax.in",

  // ─── Contact ───
  email: "info@zynovax.in",
  phone: "+919876543210",
  whatsapp: "https://wa.me/919876543210",

  // ─── Location ───
  location: {
    name: "Zynovax HQ",
    streetAddress: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600001",
    country: "IN",
    countryName: "India",
    geo: {
      latitude: 13.0827,
      longitude: 80.2707,
    },
  },

  // ─── Founder ───
  founder: {
    name: "Ahmed Rashmi",
    role: "Founder & CEO",
    image: "/assets/images/ahmed-rashmi.jpg",
  },

  // ─── Markets ───
  markets: [
    { country: "India", code: "IN", primary: true },
    { country: "United States", code: "US" },
    { country: "Canada", code: "CA" },
    { country: "Australia", code: "AU" },
    { country: "United Kingdom", code: "GB" },
    { country: "United Arab Emirates", code: "AE" },
  ],

  // ─── Social Profiles ───
  social: {
    linkedin: "https://www.linkedin.com/company/zynovax",
    instagram: "https://www.instagram.com/zynovax",
    facebook: "https://www.facebook.com/zynovax",
    twitter: "https://x.com/zynovax",
  },

  // ─── Services ───
  services: [
    {
      name: "Visual Identity",
      slug: "visual-identity",
      shortDescription: "Premium logo systems, brand guidelines, and visual consistency engineered for trust and recognition.",
    },
    {
      name: "Social Media Management",
      slug: "social-media-management",
      shortDescription: "Performance-led social media management with content strategy, community building, and lead generation.",
    },
    {
      name: "Performance Marketing",
      slug: "performance-marketing",
      shortDescription: "Paid acquisition engines on Google and Meta, engineered for qualified pipeline and compounding ROAS.",
    },
  ],

  // ─── Brand ───
  brand: {
    primaryColor: "#E8461E",
    themeColor: "#0a0a0a",
    backgroundColor: "#ffffff",
  },

  // ─── Images ───
  ogImage: "/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  logo: "/assets/images/zynovax-text-logo.png",
  icon: "/favicon-32x32.png",

  // ─── Language ───
  language: "en",
  locale: "en_IN",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
