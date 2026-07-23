/**
 * useLeadModal — Auto-trigger hook for the Lead Capture Modal
 *
 * Sequence Policy:
 * 1. Cookie Consent Banner ALWAYS pops up FIRST (at 0ms delay on mount).
 * 2. Lead Capture Modal checks if cookie choice has been made.
 *    - If cookie choice is UNANSWERED, the Lead Modal defers completely until cookies are resolved.
 *    - Once cookies are resolved, Lead Modal opens after its timer (6s) or scroll (25%).
 * 3. Persists submission/dismissal in localStorage (zynovax_lead_submitted).
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { hasConsentChoice } from "@/lib/analytics/consent";

const STORAGE_KEY = "zynovax_lead_submitted";
const TRIGGER_DELAY_MS = 6_000;
const SCROLL_THRESHOLD = 0.25;
const CONSENT_POLL_MS = 500;

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
    // Silently fail
  }
}

export function useLeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggered = useRef(false);
  const pendingOpen = useRef(false);

  const open = useCallback(() => {
    if (hasTriggered.current) return;

    // Cookie Banner MUST be answered first!
    if (!hasConsentChoice()) {
      pendingOpen.current = true;
      return;
    }

    hasTriggered.current = true;
    pendingOpen.current = false;
    setIsOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    persistDismissal();
  }, []);

  useEffect(() => {
    if (isDismissed()) return;

    // ── 1. Timer trigger ──
    const timer = setTimeout(open, TRIGGER_DELAY_MS);

    // ── 2. Scroll trigger ──
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

    // ── 3. Cookie consent resolution poll ──
    // If a trigger fired while cookie consent was pending, poll until consent choice is made.
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
