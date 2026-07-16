
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Star,
  Sparkles,
  Target,
  Megaphone,
  Search,
  Code2,
  Bot,
  TrendingUp,
  Compass,
  Lightbulb,
  Rocket,
  Gauge,
  Infinity as InfinityIcon,
  ShieldCheck,
  Award,
  MessageCircle,
  Plus,
  Minus,
  Building2,
  HeartPulse,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Landmark,
  Quote,
  Zap,
  LineChart,
  Layers,
  Users,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";
import logo from "@/assets/zynovax-logo.png";
import heroVisual from "@/assets/hero-visual.jpg";
import ahmedRashmi from "@/assets/ahmed-rashmi.jpg";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import {
  Container,
  Eyebrow,
  SectionLabel,
  PrimaryButton,
  GhostButton,
} from "@/components/site/primitives";

import { lazy, Suspense } from 'react';

const LazySections = lazy(() => import('./-index-lazy'));

import { generatePageHead } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";

export const Route = createFileRoute("/")({
  head: () =>
    generatePageHead({
      title: "Zynovax — Creative Branding & Digital Marketing",
      description:
        "Zynovax is a global creative branding and digital marketing firm. Borders are imaginary; your scale is absolute. We build visual identity, social media, and performance ads that predictably scale enterprise revenue.",
      path: "/",
    }),
  component: Index,
});

/* ---------- Hero ---------- */

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 -top-40 -z-10 h-[680px] bg-gradient-brand-soft opacity-70 blur-3xl" />
      <Container className="pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 animate-rise">
            <Eyebrow>Creative Branding & Digital Marketing · Est. 2025</Eyebrow>
            <h1 className="mt-7 text-[44px] sm:text-6xl lg:text-[88px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              We engineer the growth{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                ambitious brands
              </span>{" "}
              can't buy off the shelf.
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-ink-soft leading-[1.55]">
              Borders are imaginary; your scale is absolute. Zynovax is a global creative branding
              and digital marketing firm. We build and operate connected systems — visual identity,
              social media management, and performance marketing — that scale revenue predictably
              for ambitious enterprises across the globe.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Premium Liquid Metal CTA — WebGL shader button */}
              <LiquidMetalButton
                label="Book Strategy Call"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <GhostButton href="#stories">See Client Outcomes</GhostButton>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-medium text-ink">4.9</span>
                <span>· 120+ global engagements</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-ink" />
                <span>ISO-aligned process</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-ink" />
                <span>International Delivery Stack</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-rise" style={{ animationDelay: "120ms" }}>
            <div className="relative rounded-[28px] overflow-hidden shadow-elegant border border-border bg-white">
              <img
                src="/hero-visual.webp" fetchPriority="high"
                alt="Zynovax growth system visualization"
                className="w-full h-auto z-10 relative opacity-40"
                width={1024}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-transparent z-15" />
              <GooeyText
                texts={["Identity", "Branding", "Scale", "Performance"]}
                morphTime={1.2}
                cooldownTime={0.4}
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full font-sans font-bold text-center tracking-tighter"
                textClassName="text-black text-4xl md:text-5xl lg:text-[44pt]"
              />
            </div>
            <div className="absolute -left-6 -bottom-8 rounded-2xl bg-white shadow-elegant border border-border p-5 w-60">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-soft mb-1.5">
                <TrendingUp className="size-3.5" /> Avg. pipeline growth
              </div>
              <div className="text-4xl font-semibold text-gradient-brand">+320%</div>
              <div className="text-xs text-ink-soft mt-1.5">across global enterprise partners</div>
            </div>
            <div className="absolute -right-4 -top-6 rounded-2xl bg-ink text-white shadow-elegant p-4 w-48">
              <div className="text-[11px] uppercase tracking-wider text-white/60 mb-1">
                ROI delivered
              </div>
              <div className="text-3xl font-semibold">
                4.3<span className="font-display italic">×</span>
              </div>
              <div className="text-[11px] text-white/60 mt-1">avg. 12-month return</div>
            </div>
          </div>
        </div>

        {/* Editorial stat strip */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-border pt-10">
          {[
            { v: "120+", l: "Engagements delivered" },
            { v: "$210M", l: "Client revenue influenced" },
            { v: "6+", l: "Countries served (USA, CAN, AUS, UK, UAE & IND)" },
            { v: "Chennai", l: "Physical Hub & Operations Center" },
          ].map((s) => (
            <div key={s.l} className="px-1 md:px-6 first:pl-0">
              <div className="text-4xl md:text-5xl font-semibold text-ink tracking-tight">
                {s.v}
              </div>
              <div className="mt-2 text-sm text-ink-soft">{s.l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


function Index() {
  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={webPageSchema({
          title: "Zynovax — Creative Branding & Digital Marketing",
          description:
            "Zynovax is a global creative branding and digital marketing firm. Borders are imaginary; your scale is absolute. We build visual identity, social media, and performance ads that predictably scale enterprise revenue.",
          path: "/",
        })}
      />
      <SiteNav />
      <Hero />
      <Suspense fallback={<div className="h-[50vh] w-full flex items-center justify-center"><div className="size-8 rounded-full border-4 border-border border-t-ink animate-spin" /></div>}>
        <LazySections />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
