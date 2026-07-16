/**
 * Zynovax — Google Tag Manager
 * Injects GTM script and noscript iframe.
 * Production-only, deduplication-guarded, loaded after hydration.
 */

import { getAnalyticsConfig, isProduction } from "./analytics-config";

let gtmInitialized = false;

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initialize Google Tag Manager.
 * Safe to call multiple times — only initializes once.
 */
export function initGTM(): void {
  if (gtmInitialized) return;
  if (typeof window === "undefined") return;

  const { gtmId } = getAnalyticsConfig();
  if (!gtmId) return;
  if (!isProduction()) {
    console.debug("[GTM] Skipped — not in production mode");
    return;
  }

  gtmInitialized = true;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Inject GTM script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  // Push initial event
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  // Inject noscript iframe
  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

/**
 * Push an event to the GTM dataLayer.
 */
export function pushDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
