/**
 * Zynovax — Analytics Configuration
 * Reads all tracking IDs from Vite environment variables.
 * Never hardcode IDs — always use this config.
 */

export interface AnalyticsConfig {
  gtmId: string | undefined;
  gaMeasurementId: string | undefined;
  metaPixelId: string | undefined;
  linkedinInsightId: string | undefined;
  googleAdsId: string | undefined;
  clarityId: string | undefined;
  hotjarId: string | undefined;
  siteUrl: string | undefined;
}

export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    gtmId: import.meta.env.VITE_GTM_ID,
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
    linkedinInsightId: import.meta.env.VITE_LINKEDIN_INSIGHT_ID,
    googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID,
    clarityId: import.meta.env.VITE_CLARITY_ID,
    hotjarId: import.meta.env.VITE_HOTJAR_ID,
    siteUrl: import.meta.env.VITE_SITE_URL,
  };
}

/** Check if we're in a production-like environment */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}
