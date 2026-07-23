/**
 * useLeadModal — Auto-trigger hook for the Lead Capture Modal
 *
 * Opens the modal after 6 seconds OR when the user scrolls past 25% of the
 * page — whichever comes first.  Persists submission/dismissal state in
 * localStorage so the modal never re-appears in the same session.
 *
 * Cookie Consent Coordination:
 * If the cookie consent banner is still unanswered (zynovax_consent_v2),
 * the lead modal defers its trigger until the user resolves cookies.
 * This prevents z-index collisions and pointer-event traps.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { hasConsentChoice } from "@/lib/analytics/consent";

const STORAGE_KEY = "zynovax_lead_submitted";
const TRIGGER_DELAY_MS = 6_000;
const SCROLL_THRESHOLD = 0.25;
/** How often we poll for cookie consent resolution when deferred (ms) */
const CONSENT_POLL_MS = 1_000;

function isDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function persistDismissal(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Silently fail — private browsing or quota exceeded
  }
}

export function useLeadModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Guard: once we've triggered, stop listening
  const hasTriggered = useRef(false);
  /** Whether at least one trigger condition has been met */
  const pendingOpen = useRef(false);

  const open = useCallback(() => {
    if (hasTriggered.current) return;

    // If the cookie consent banner is still active (unanswered),
    // defer the modal — mark as pending and let the poll pick it up
    if (!hasConsentChoice()) {
      pendingOpen.current = true;
      return;
    }

    hasTriggered.current = true;
    pendingOpen.current = false;
    setIsOpen(true);
  }, []);

  /** Dismiss the modal and persist so it never shows again */
  const dismiss = useCallback(() => {
    setIsOpen(false);
    persistDismissal();
  }, []);

  useEffect(() => {
    // Don't set up triggers if previously dismissed/submitted
    if (isDismissed()) return;

    // ── Timer trigger ──
    const timer = setTimeout(open, TRIGGER_DELAY_MS);

    // ── Scroll trigger ──
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight > 0 && scrollTop / docHeight >= SCROLL_THRESHOLD) {
        open();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Cookie consent poll ──
    // If a trigger fired while the cookie banner was visible, we stored
    // pendingOpen = true.  Poll until the user resolves the cookie choice,
    // then open the lead modal.
    const consentPoll = setInterval(() => {
      if (pendingOpen.current && hasConsentChoice()) {
        open();
        clearInterval(consentPoll);
      }
    }, CONSENT_POLL_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(consentPoll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // Allow controlled open/close via setIsOpen (e.g. Radix onOpenChange)
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        dismiss();
      } else {
        setIsOpen(true);
      }
    },
    [dismiss],
  );

  return { isOpen, handleOpenChange, dismiss } as const;
}
