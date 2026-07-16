/**
 * Zynovax — Pre-defined Analytics Event Helpers
 * Reusable tracking functions for common user interactions.
 * All use trackEvent() from ga4.ts internally.
 */

import { trackEvent } from "./ga4";
import { pushDataLayer } from "./gtm";

// ─── Lead Generation ───
export function trackGenerateLead(source: string) {
  trackEvent("generate_lead", { event_category: "engagement", event_label: source });
  pushDataLayer({ event: "generate_lead", source });
}

export function trackBookStrategyCall(source: string) {
  trackEvent("book_strategy_call", { event_category: "conversion", event_label: source });
  pushDataLayer({ event: "book_strategy_call", source });
}

export function trackContactFormSubmit(formName: string) {
  trackEvent("contact_form_submit", { event_category: "conversion", form_name: formName });
  pushDataLayer({ event: "contact_form_submit", form_name: formName });
}

// ─── Communication Clicks ───
export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", { event_category: "engagement", event_label: location });
  pushDataLayer({ event: "whatsapp_click", location });
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", { event_category: "engagement", event_label: location });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", { event_category: "engagement", event_label: location });
}

// ─── Content Engagement ───
export function trackServicePageView(serviceName: string) {
  trackEvent("service_page_view", { event_category: "content", service_name: serviceName });
}

export function trackBlogRead(blogTitle: string) {
  trackEvent("blog_read", { event_category: "content", blog_title: blogTitle });
}

export function trackCaseStudyView(clientName: string) {
  trackEvent("case_study_view", { event_category: "content", client_name: clientName });
}

export function trackDownloadResource(resourceName: string) {
  trackEvent("download_resource", { event_category: "conversion", resource_name: resourceName });
  pushDataLayer({ event: "download_resource", resource_name: resourceName });
}

// ─── UI Interactions ───
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", { event_category: "engagement", cta_name: ctaName, location });
  pushDataLayer({ event: "cta_click", cta_name: ctaName, location });
}

export function trackFAQExpand(question: string) {
  trackEvent("faq_expand", { event_category: "engagement", question });
}

export function trackHeroCTA(ctaLabel: string) {
  trackEvent("hero_cta", { event_category: "engagement", cta_label: ctaLabel });
}

export function trackFooterCTA(ctaLabel: string) {
  trackEvent("footer_cta", { event_category: "engagement", cta_label: ctaLabel });
}

export function trackNewsletterSignup(location: string) {
  trackEvent("newsletter_signup", { event_category: "conversion", event_label: location });
  pushDataLayer({ event: "newsletter_signup", location });
}

export function trackPricingView() {
  trackEvent("pricing_view", { event_category: "content" });
}

export function track404Page(path: string) {
  trackEvent("404_page", { event_category: "error", page_path: path });
}
