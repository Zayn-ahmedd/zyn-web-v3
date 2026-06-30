import { Sparkles, Megaphone, Target, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  headline: string;
  subheadline: string;
  cta: string;
  metaTitle: string;
  metaDescription: string;
  capabilities: { t: string; d: string }[];
  outcomes: { v: string; l: string }[];
  process: { n: string; t: string; d: string }[];
  faqs: { q: string; a: string }[];
  whoFor: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "visual-identity",
    name: "Visual Identity",
    icon: Sparkles,
    tagline: "Identity systems that earn premium perception.",
    headline: "A visual identity that makes you instantly recognizable.",
    subheadline:
      "We design logo systems, brand guidelines and end-to-end brand experiences engineered for consistency, trust and premium positioning at every touchpoint.",
    cta: "Build My Brand Identity",
    metaTitle: "Visual Identity Design — Logo & Brand Systems | Zynovax",
    metaDescription:
      "Premium visual identity design. Logo systems, brand guidelines, visual consistency and brand experiences engineered for trust and recognition.",
    capabilities: [
      {
        t: "Logo Systems",
        d: "Primary marks, lockups, monograms and a flexible system that works at every scale.",
      },
      {
        t: "Brand Guidelines",
        d: "Type, color, motion, voice and usage rules codified for in-house teams.",
      },
      {
        t: "Visual Consistency",
        d: "Templates, components and design tokens that lock perception across every channel.",
      },
      {
        t: "Brand Experience",
        d: "End-to-end identity rollout across product, marketing, sales and customer touchpoints.",
      },
    ],
    outcomes: [
      { v: "+58%", l: "Brand recall" },
      { v: "+27%", l: "Time-on-site" },
      { v: "4.6/5", l: "Perceived premium score" },
    ],
    process: [
      {
        n: "01",
        t: "Discover",
        d: "Audit, moodboards, design principles and references aligned to positioning.",
      },
      { n: "02", t: "Design", d: "Logo system, type, color, motion and core component design." },
      {
        n: "03",
        t: "System",
        d: "Guidelines, design tokens, templates and a Figma library for your team.",
      },
      {
        n: "04",
        t: "Rollout",
        d: "Web, social, sales decks, product UI and brand experience across surfaces.",
      },
    ],
    whoFor: [
      "Companies that have outgrown a startup-era logo and need a system, not just a mark.",
      "Premium D2C and healthcare brands competing on trust and perceived quality.",
      "Teams launching a new category or pivoting positioning.",
    ],
    faqs: [
      {
        q: "Do you redesign or refresh?",
        a: "Either. We start with positioning, then decide whether the right move is a refresh, a system extension, or a ground-up redesign.",
      },
      {
        q: "What deliverables do we get?",
        a: "Logo system, full brand book, design tokens, Figma library, social and sales templates, and rollout assets.",
      },
    ],
    deliverables: [
      "Primary & secondary logo lockups",
      "Typography & color system tokens",
      "Codified Brand Book (PDF & Figma)",
      "Social media design templates",
      "Stationery & sales deck collateral assets",
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    icon: Megaphone,
    tagline: "Social as a growth channel, not a chore.",
    headline: "Turn social media into a consistent growth channel.",
    subheadline:
      "We build content strategies, community programs and authority systems that compound attention and convert it into qualified pipeline — not vanity metrics.",
    cta: "Grow My Social Presence",
    metaTitle: "Social Media Management for Growth | Zynovax",
    metaDescription:
      "Performance-led social media management. Content strategy, community building, authority programs and lead generation engineered to compound monthly.",
    capabilities: [
      {
        t: "Content Strategy",
        d: "Pillars, formats and a publishing system tied to ICP, narrative and KPIs.",
      },
      {
        t: "Community Building",
        d: "Audience growth, engagement loops and inbound conversation systems.",
      },
      {
        t: "Authority Building",
        d: "Founder, executive and brand thought leadership programs that compound trust.",
      },
      {
        t: "Lead Generation",
        d: "Conversion-engineered social funnels — DMs, lead magnets and direct response.",
      },
    ],
    outcomes: [
      { v: "+310%", l: "Qualified reach" },
      { v: "+180%", l: "Inbound DMs" },
      { v: "+4.2×", l: "Pipeline from social" },
    ],
    process: [
      {
        n: "01",
        t: "Strategy",
        d: "ICP, pillars, formats, voice, KPI tree and a 90-day content roadmap.",
      },
      {
        n: "02",
        t: "Production",
        d: "Studio-grade content production cadence across video, carousel and written formats.",
      },
      {
        n: "03",
        t: "Distribution",
        d: "Multi-platform publishing, community engagement and inbound conversion.",
      },
      {
        n: "04",
        t: "Optimize",
        d: "Weekly experimentation, performance reviews and content iteration.",
      },
    ],
    whoFor: [
      "Founder-led brands building thought leadership at scale.",
      "B2B teams turning LinkedIn into a primary pipeline source.",
      "Premium D2C brands compounding organic demand.",
    ],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "LinkedIn, Instagram, X, YouTube, TikTok — selected based on where your ICP actually converts.",
      },
      {
        q: "Do you produce video?",
        a: "Yes — script, edit, shoot direction and packaging are part of every content engagement.",
      },
    ],
    deliverables: [
      "Monthly content distribution calendar",
      "High-converting written & visual assets (carousels, short-form video)",
      "Community monitoring & direct-message flow integration",
      "Monthly performance, pipeline attribution, and growth audits",
    ],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    icon: Target,
    tagline: "Predictable leads and revenue, on tap.",
    headline: "Generate predictable leads and revenue.",
    subheadline:
      "We architect and operate paid acquisition engines on Google, Meta and beyond — engineered for qualified pipeline, attribution and compounding return on ad spend.",
    cta: "Launch Growth Campaign",
    metaTitle: "Performance Marketing Agency — Paid Acquisition | Zynovax",
    metaDescription:
      "Performance marketing engineered for revenue. Google Ads, Meta Ads, campaign optimization and analytics designed to compound qualified pipeline and ROAS.",
    capabilities: [
      {
        t: "Google Ads",
        d: "Search, Performance Max, YouTube and Demand Gen built for qualified pipeline.",
      },
      { t: "Meta Ads", d: "Full-funnel Facebook and Instagram campaigns tuned for CAC and LTV." },
      {
        t: "Campaign Optimization",
        d: "Creative testing, audience expansion and bid strategy iteration weekly.",
      },
      {
        t: "Analytics & Attribution",
        d: "GA4, server-side tracking, MMM and dashboards that decision-makers actually use.",
      },
    ],
    outcomes: [
      { v: "4.3×", l: "Blended ROAS" },
      { v: "-38%", l: "Cost per acquisition" },
      { v: "+220%", l: "Qualified pipeline" },
    ],
    process: [
      {
        n: "01",
        t: "Audit",
        d: "Account audit, attribution review, creative diagnostics and funnel teardown.",
      },
      {
        n: "02",
        t: "Architect",
        d: "Channel strategy, campaign architecture, creative brief and measurement plan.",
      },
      {
        n: "03",
        t: "Launch",
        d: "Production-grade creative, server-side tracking and full-funnel launch.",
      },
      {
        n: "04",
        t: "Compound",
        d: "Weekly experimentation, scaling and quarterly business reviews.",
      },
    ],
    whoFor: [
      "SaaS and fintech teams scaling beyond founder-led acquisition.",
      "D2C brands ready to compound ROAS, not just buy traffic.",
      "Multi-location healthcare and services brands needing predictable bookings.",
    ],
    faqs: [
      {
        q: "Do you handle creative?",
        a: "Yes — ad creative, video and landing pages ship from the same pod that runs media.",
      },
      {
        q: "What's your minimum spend?",
        a: "Most clients spend $25K–$500K/month on media. We're optimized for performance at scale, not micro-budgets.",
      },
    ],
    deliverables: [
      "Active, optimized Google & Meta campaign setups",
      "Creative assets (graphic ads, video scripts, custom copy)",
      "High-converting custom landing pages",
      "GA4, custom tracking tags & server-side attribution dashboards",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
