/**
 * Zynovax — Google Analytics 4
 * Loads gtag.js with measurement ID from env var.
 * Production-only with typed event helpers.
 */

import { getAnalyticsConfig, isProduction } from "./analytics-config";

let ga4Initialized = false;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
}

/**
 * Initialize GA4 by loading the gtag.js script.
 * Safe to call multiple times.
 */
export function initGA4(): void {
  if (ga4Initialized) return;
  if (typeof window === "undefined") return;

  const { gaMeasurementId } = getAnalyticsConfig();
  if (!gaMeasurementId) return;
  if (!isProduction()) {
    console.debug("[GA4] Skipped — not in production mode");
    return;
  }

  ga4Initialized = true;

  // Load gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, {
    send_page_view: false, // We handle page views manually for SPA
  });
}

/**
 * Track a page view in GA4.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/**
 * Track a custom event in GA4.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
