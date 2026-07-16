/**
 * Zynovax — JSON-LD Structured Data Schema Generators
 * Each function returns a valid JSON-LD compatible object.
 * Designed per Google Search documentation and schema.org specs.
 */

import { SITE_CONFIG } from "./seo-config";

// ─── Organization ───
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.foundingYear),
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder.name,
      jobTitle: SITE_CONFIG.founder.role,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.location.streetAddress,
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.state,
      postalCode: SITE_CONFIG.location.postalCode,
      addressCountry: SITE_CONFIG.location.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      telephone: `+${SITE_CONFIG.phone}`,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: Object.values(SITE_CONFIG.social),
    areaServed: SITE_CONFIG.markets.map((m) => ({
      "@type": "Country",
      name: m.country,
    })),
  };
}

// ─── LocalBusiness ───
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    telephone: `+${SITE_CONFIG.phone}`,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.location.streetAddress,
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.state,
      postalCode: SITE_CONFIG.location.postalCode,
      addressCountry: SITE_CONFIG.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.location.geo.latitude,
      longitude: SITE_CONFIG.location.geo.longitude,
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

// ─── WebSite ───
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: SITE_CONFIG.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── WebPage ───
export interface WebPageSchemaOptions {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}

export function webPageSchema(options: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}${options.path}`,
    name: options.title,
    description: options.description,
    url: `${SITE_CONFIG.url}${options.path}`,
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    about: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: SITE_CONFIG.language,
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  };
}

// ─── Service ───
export interface ServiceSchemaOptions {
  name: string;
  description: string;
  slug: string;
}

export function serviceSchema(options: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/services/${options.slug}`,
    name: options.name,
    description: options.description,
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
    areaServed: SITE_CONFIG.markets.map((m) => ({
      "@type": "Country",
      name: m.country,
    })),
    url: `${SITE_CONFIG.url}/services/${options.slug}`,
  };
}

// ─── FAQ ───
export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── BreadcrumbList ───
export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

// ─── Article / BlogPosting ───
export interface ArticleSchemaOptions {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleSchema(options: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: `${SITE_CONFIG.url}${options.path}`,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Person",
      name: options.author ?? SITE_CONFIG.founder.name,
    },
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    image: options.image
      ? `${SITE_CONFIG.url}${options.image}`
      : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    inLanguage: SITE_CONFIG.language,
  };
}

// ─── Person ───
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.founder.name,
    jobTitle: SITE_CONFIG.founder.role,
    worksFor: { "@id": `${SITE_CONFIG.url}/#organization` },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.founder.image}`,
    url: `${SITE_CONFIG.url}/about`,
  };
}

// ─── CollectionPage + ItemList ───
export interface CollectionItem {
  name: string;
  url: string;
  description: string;
}

export function collectionPageSchema(
  title: string,
  description: string,
  path: string,
  items: CollectionItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    },
  };
}

// ─── SiteNavigationElement ───
export interface NavItem {
  name: string;
  url: string;
}

export function navigationSchema(items: NavItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    hasPart: items.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
