/**
 * Zynovax — GDPR Cookie Consent Banner
 * Accept All / Reject All / Customize with category toggles.
 * Persists choice and never shows again after decision.
 */

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  updateConsent,
  hasConsentChoice,
  type ConsentPreference,
} from "@/lib/analytics/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    // Only show if user hasn't already made a choice
    if (!hasConsentChoice()) {
      // Small delay to avoid CLS on initial load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function saveAndClose(pref: ConsentPreference) {
    updateConsent(pref);
    setVisible(false);
  }

  function handleAcceptAll() {
    saveAndClose({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    });
  }

  function handleRejectAll() {
    saveAndClose({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    });
  }

  function handleSaveCustom() {
    saveAndClose({
      necessary: true,
      analytics,
      marketing,
      functional,
      timestamp: new Date().toISOString(),
    });
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6 pointer-events-none"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
    >
      <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl bg-white border border-border shadow-elegant p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-ink">
              We respect your privacy
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
              We use cookies to improve your experience, analyze traffic, and
              personalize content. You can choose which cookies to allow.
            </p>
          </div>
          <button
            onClick={handleRejectAll}
            className="shrink-0 text-ink-soft hover:text-ink transition-colors"
            aria-label="Close cookie consent"
          >
            <X className="size-4" />
          </button>
        </div>

        {showCustomize && (
          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-ink">
                Necessary{" "}
                <span className="text-ink-soft">(always on)</span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                className="rounded accent-ink"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-ink">Analytics</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="rounded accent-ink cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-ink">Marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="rounded accent-ink cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-ink">Functional</span>
              <input
                type="checkbox"
                checked={functional}
                onChange={(e) => setFunctional(e.target.checked)}
                className="rounded accent-ink cursor-pointer"
              />
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={handleAcceptAll}
            className="rounded-full bg-ink text-white px-5 py-2 text-sm font-medium hover:bg-ink/90 transition-colors cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectAll}
            className="rounded-full border border-border text-ink px-5 py-2 text-sm font-medium hover:bg-surface transition-colors cursor-pointer"
          >
            Reject All
          </button>
          {!showCustomize ? (
            <button
              onClick={() => setShowCustomize(true)}
              className="text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              Customize
            </button>
          ) : (
            <button
              onClick={handleSaveCustom}
              className="rounded-full border border-border text-ink px-5 py-2 text-sm font-medium hover:bg-surface transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
