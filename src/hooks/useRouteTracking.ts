/**
 * Zynovax — SPA Route Tracking Hook
 * Fires page view events on every TanStack Router navigation.
 */

import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackPageView } from "@/lib/analytics/ga4";
import { pushDataLayer } from "@/lib/analytics/gtm";

/**
 * Hook that fires a page view event on every route change.
 * Must be called inside a TanStack Router context.
 */
export function useRouteTracking() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // GA4 page view
    trackPageView(path);

    // GTM virtual pageview
    pushDataLayer({
      event: "virtual_page_view",
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname]);
}
