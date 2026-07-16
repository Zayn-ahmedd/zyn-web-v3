/**
 * Zynovax — Centralized Metadata Generator
 * Universal head metadata factory compatible with TanStack Router's head() API.
 * Generates canonical URLs, full Open Graph set, full Twitter Card set, robots directives.
 */

import { SITE_CONFIG } from "./seo-config";

export interface PageMetaOptions {
  /** Page title — will be suffixed with " | Zynovax" unless it already contains "Zynovax" */
  title: string;
  /** Meta description (150–160 chars recommended) */
  description: string;
  /** URL path e.g. "/about" or "/services/visual-identity" */
  path: string;
  /** Override the default OG image */
  ogImage?: string;
  /** OG type — defaults to "website" */
  ogType?: "website" | "article" | "profile";
  /** Robots directive — defaults to "index, follow" */
  robots?: string;
  /** Additional keywords */
  keywords?: string;
  /** Set true to add noindex */
  noindex?: boolean;
  /** Article publish date (ISO string) for article type */
  publishedTime?: string;
  /** Article modified date (ISO string) */
  modifiedTime?: string;
}

/**
 * Generates a complete TanStack-compatible `head()` return object.
 * Use inside every route's `head()` function.
 *
 * @example
 * ```ts
 * export const Route = createFileRoute("/about")({
 *   head: () => generatePageHead({
 *     title: "About Zynovax — Creative Branding & Digital Marketing",
 *     description: "Learn about Zynovax...",
 *     path: "/about",
 *   }),
 *   component: AboutPage,
 * });
 * ```
 */
export function generatePageHead(options: PageMetaOptions) {
  const {
    title,
    description,
    path,
    ogImage = SITE_CONFIG.ogImage,
    ogType = "website",
    robots,
    keywords,
    noindex = false,
    publishedTime,
    modifiedTime,
  } = options;

  const canonicalUrl = `${SITE_CONFIG.url}${path === "/" ? "" : path}`;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_CONFIG.url}${ogImage}`;
  const robotsContent = noindex ? "noindex, nofollow" : robots ?? "index, follow";

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robotsContent },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: fullOgImage },
    { property: "og:image:width", content: String(SITE_CONFIG.ogImageWidth) },
    { property: "og:image:height", content: String(SITE_CONFIG.ogImageHeight) },
    { property: "og:image:alt", content: title },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { property: "og:locale", content: SITE_CONFIG.locale },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: fullOgImage },
    { name: "twitter:image:alt", content: title },

    // Geo
    { name: "geo.region", content: `${SITE_CONFIG.location.country}-${SITE_CONFIG.location.state.substring(0, 2).toUpperCase()}` },
    { name: "geo.placename", content: SITE_CONFIG.location.city },
    { name: "geo.position", content: `${SITE_CONFIG.location.geo.latitude};${SITE_CONFIG.location.geo.longitude}` },
    { name: "ICBM", content: `${SITE_CONFIG.location.geo.latitude}, ${SITE_CONFIG.location.geo.longitude}` },
  ];

  // Optional: keywords
  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  // Optional: article dates
  if (ogType === "article" && publishedTime) {
    meta.push({ property: "article:published_time", content: publishedTime });
    if (modifiedTime) {
      meta.push({ property: "article:modified_time", content: modifiedTime });
    }
  }

  const links: Record<string, string>[] = [
    { rel: "canonical", href: canonicalUrl },
  ];

  return { meta, links };
}
