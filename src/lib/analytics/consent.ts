/**
 * Zynovax — Consent Mode v2 Implementation
 * Manages analytics_storage, ad_storage, personalization_storage, etc.
 * Persists user preference to localStorage.
 */

const CONSENT_STORAGE_KEY = "zynovax_consent_v2";

export interface ConsentState {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  personalization_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  security_storage: "granted";
}

export interface ConsentPreference {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
}

const DEFAULT_CONSENT: ConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_personalization: "denied",
  ad_user_data: "denied",
  personalization_storage: "denied",
  functionality_storage: "denied",
  security_storage: "granted",
};

/**
 * Set default consent before any tags fire.
 * Call this as early as possible in the app lifecycle.
 */
export function setDefaultConsent(): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") {
    // Create a minimal gtag that pushes to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }

  // Check if user already made a choice
  const stored = getStoredConsent();
  if (stored) {
    const state = consentPreferenceToState(stored);
    window.gtag("consent", "default", state);
  } else {
    window.gtag("consent", "default", DEFAULT_CONSENT);
  }
}

/**
 * Update consent after user makes a choice.
 */
export function updateConsent(preference: ConsentPreference): void {
  if (typeof window === "undefined") return;

  const state = consentPreferenceToState(preference);

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", state);
  }

  // Persist to localStorage
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preference));
}

/**
 * Get stored consent preference from localStorage.
 */
export function getStoredConsent(): ConsentPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentPreference;
  } catch {
    return null;
  }
}

/**
 * Check if user has already made a consent choice.
 */
export function hasConsentChoice(): boolean {
  return getStoredConsent() !== null;
}

function consentPreferenceToState(pref: ConsentPreference): ConsentState {
  return {
    analytics_storage: pref.analytics ? "granted" : "denied",
    ad_storage: pref.marketing ? "granted" : "denied",
    ad_personalization: pref.marketing ? "granted" : "denied",
    ad_user_data: pref.marketing ? "granted" : "denied",
    personalization_storage: pref.functional ? "granted" : "denied",
    functionality_storage: pref.functional ? "granted" : "denied",
    security_storage: "granted",
  };
}
