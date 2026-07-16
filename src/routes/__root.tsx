import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { NotFound } from "@/components/ui/ghost-404-page";
import { JsonLd } from "@/lib/seo/JsonLd";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo/schemas";
import { SITE_CONFIG } from "@/lib/seo/seo-config";
import { initGTM } from "@/lib/analytics/gtm";
import { initGA4 } from "@/lib/analytics/ga4";
import { setDefaultConsent } from "@/lib/analytics/consent";
import { useRouteTracking } from "@/hooks/useRouteTracking";
import { CookieConsent } from "@/components/site/CookieConsent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zynovax — Creative Branding & Digital Marketing" },
      {
        name: "description",
        content: SITE_CONFIG.description,
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: SITE_CONFIG.brand.themeColor },
      { name: "application-name", content: SITE_CONFIG.name },
      { name: "author", content: SITE_CONFIG.name },
      { name: "publisher", content: SITE_CONFIG.name },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:title", content: "Zynovax — Creative Branding & Digital Marketing" },
      { property: "og:description", content: SITE_CONFIG.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_CONFIG.name },
      { property: "og:locale", content: SITE_CONFIG.locale },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon-192x192.png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "icon", type: "image/png", href: "/favicon.png", sizes: "48x48" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Great+Vibes&family=Signika:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap",
      },
      {
        rel: "preload",
        as: "image",
        href: "/hero-visual.webp",
        type: "image/webp",
        // @ts-ignore - fetchpriority is valid HTML but might not be in the types yet
        fetchpriority: "high",
      },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:rounded-md focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // SPA route tracking
  useRouteTracking();

  useEffect(() => {
    // Set consent defaults before any tags fire
    setDefaultConsent();

    // Defer analytics loading until after hydration
    const loadAnalytics = () => {
      initGTM();
      initGA4();
    };

    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadAnalytics);
    } else {
      setTimeout(loadAnalytics, 2000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Global structured data — Organization + WebSite + LocalBusiness */}
      <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* GDPR Cookie Consent Banner */}
      <CookieConsent />
    </QueryClientProvider>
  );
}
