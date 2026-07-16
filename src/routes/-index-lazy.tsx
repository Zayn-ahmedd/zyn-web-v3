
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { JsonLd } from "@/lib/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schemas";
import { trackFAQExpand } from "@/lib/analytics/events";
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


/* ---------- Trusted By (marquee) ---------- */

function TrustedBy() {
  const logos = [
    "NORTHWIND",
    "ACME ◆",
    "LUMEN",
    "QUARTZ.IO",
    "VANTAGE",
    "OBSIDIAN",
    "HELIX",
    "STRATA",
    "MERIDIAN",
    "KAIROS",
    "OCTAVE",
    "PRISM·",
  ];
  return (
    <section className="border-y border-border bg-surface overflow-hidden py-8">
      <Container className="mb-6">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-ink-soft">
          Trusted by enterprise teams across USA, Canada, Australia, UK, UAE &amp; India
        </p>
      </Container>
      <div className="relative w-full h-[60px] overflow-hidden flex items-center">
        <InfiniteSlider className="flex h-full w-full items-center" duration={35} gap={80}>
          {logos.map((n, i) => (
            <span
              key={i}
              className="text-base font-semibold tracking-[0.18em] text-ink-soft/80 whitespace-nowrap px-4"
            >
              {n}
            </span>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-40 z-20"
          direction="left"
          blurIntensity={1.2}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-40 z-20"
          direction="right"
          blurIntensity={1.2}
        />
      </div>
    </section>
  );
}

/* ---------- Industries Served ---------- */

function Industries() {
  const items = [
    { icon: Code2, t: "SaaS & Tech", d: "Scaling pipeline & visual authority." },
    { icon: HeartPulse, t: "Healthcare Networks", d: "Cross-border clinics and telehealth." },
    {
      icon: Landmark,
      t: "Fintech Platforms",
      d: "Wealthtech, digital banks, and trading platforms.",
    },
    { icon: ShoppingBag, t: "Premium E-commerce", d: "D2C brands expanding in global markets." },
    {
      icon: Briefcase,
      t: "Professional Services",
      d: "Consultancies scaling international reach.",
    },
    { icon: GraduationCap, t: "EdTech & Learning", d: "Certification ecosystems and platforms." },
    { icon: Building2, t: "Global Proptech", d: "Brokerages and real estate tech hubs." },
    { icon: Zap, t: "Climate & Infrastructure", d: "Clean-energy scaling models." },
  ];
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <SectionLabel no="01" label="Industries served" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
              We build growth systems for{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                complex, high-growth
              </span>{" "}
              businesses.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-ink-soft leading-relaxed">
              Global reach, localized constraints. We adapt our visual design, media presence, and
              acquisition playbooks to match your local market targets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
          {items.map((it) => (
            <div
              key={it.t}
              className="group relative p-7 lg:p-8 border-r border-b border-border bg-white hover:bg-surface transition-colors duration-300"
            >
              <it.icon className="size-5 text-ink-soft group-hover:text-ink transition-colors" />
              <h3 className="mt-8 text-lg font-semibold text-ink">{it.t}</h3>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">{it.d}</p>
              <ArrowUpRight className="absolute top-7 right-7 size-4 text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Interactive Growth Challenges ---------- */

function Challenges() {
  const items = [
    {
      t: "Low Visibility",
      tag: "Organic",
      d: "Your ideal customers can't find your brand online. Social media presence and category visibility have stalled.",
      sym: "Social engagement flat; organic channels stagnant for 2+ quarters.",
      fix: "Authority content engine and structured social media management optimized for reach.",
    },
    {
      t: "Weak Visual Position",
      tag: "Branding",
      d: "Inconsistent visual assets weaken premium perception and erode customer trust.",
      sym: "Discounting to close deals. Sales assets looking dated.",
      fix: "Premium logo systems, visual design languages, and standardized guidelines.",
    },
    {
      t: "Leaky Funnels",
      tag: "Conversion",
      d: "Ad traffic lands on your site, but visitors don't convert into leads or paying customers.",
      sym: "Sub-2% conversion on paid traffic landing pages.",
      fix: "Custom high-converting landing pages, structured copy, and CRO design loops.",
    },
    {
      t: "No Predictable Pipeline",
      tag: "Media Acquisition",
      d: "Growth relies on referral loops and random outreach. Customer acquisition is expensive.",
      sym: "Unpredictable monthly pipeline. Volatile CAC.",
      fix: "Multi-channel performance marketing engine across search and social channels.",
    },
  ];
  const [active, setActive] = useState(0);
  const a = items[active];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mb-14">
          <SectionLabel no="02" label="Growth challenges" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
            Ceilings aren't strategy problems.{" "}
            <span className="font-display italic font-normal text-ink-soft">
              They are execution problems.
            </span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-2">
            {items.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.t}
                  onClick={() => setActive(i)}
                  className={`group text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    on
                      ? "bg-white border-ink shadow-elegant"
                      : "bg-white/50 border-border hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-display italic text-xl ${on ? "text-gradient-brand" : "text-ink-soft"}`}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-base font-medium text-ink">{it.t}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-ink-soft border border-border rounded-full px-2 py-0.5">
                      {it.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-7 rounded-3xl bg-white border border-border p-8 lg:p-12 shadow-elegant">
            <div key={a.t} className="animate-rise">
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                Challenge · {a.tag}
              </div>
              <h3 className="mt-3 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
                {a.t}
              </h3>
              <p className="mt-4 text-lg text-ink-soft leading-relaxed">{a.d}</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-surface p-5">
                  <div className="text-[11px] uppercase tracking-wider text-ink-soft">Symptom</div>
                  <p className="mt-2 text-[15px] text-ink leading-relaxed">{a.sym}</p>
                </div>
                <div className="rounded-2xl bg-ink text-white p-5">
                  <div className="text-[11px] uppercase tracking-wider text-white/60">
                    The Solution
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed">{a.fix}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Growth Engine (interactive 5-stage) ---------- */

function GrowthEngine() {
  const steps = [
    {
      icon: Sparkles,
      t: "Visual Identity",
      short: "Build premium assets.",
      d: "We design premium logo lockups, standardized brand color guidelines, and visual assets built for global trust.",
      outputs: ["Primary logo marks", "Figma design system", "Collateral styling"],
    },
    {
      icon: Megaphone,
      t: "Social Presence",
      short: "Build organic reach.",
      d: "Authority content distribution calendars, short-form video assets, and active community manager setups.",
      outputs: ["Content schedule", "Video/Image design", "Inbox routing"],
    },
    {
      icon: Target,
      t: "Performance Ads",
      short: "Acquire paid demand.",
      d: "High-converting search and social ad setups running on Google and Meta platforms tuned for direct pipeline.",
      outputs: ["Google Search ads", "Meta creative setups", "Attribution trackers"],
    },
    {
      icon: Gauge,
      t: "CRO Funnels",
      short: "Convert traffic.",
      d: "Fast custom landing pages, lifecycle tracking, and direct email nurture templates designed for high conversion.",
      outputs: ["Landing page design", "Attribution dash", "Nurture sequence"],
    },
    {
      icon: Rocket,
      t: "Global Scale",
      short: "Maximize ROAS.",
      d: "Weekly optimization reviews, creative testing loops, and geographical scaling playbooks.",
      outputs: ["Multi-region scale", "A/B testing loop", "Weekly playbook"],
    },
  ];
  const [active, setActive] = useState(0);
  const a = steps[active];
  return (
    <section id="engine" className="relative bg-white py-24 lg:py-36">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-[400px] bg-gradient-brand-soft opacity-60 blur-3xl" />
      <Container>
        <div className="max-w-3xl mb-16">
          <SectionLabel no="03" label="The Zynovax Growth Engine™" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[72px] font-semibold leading-[1.0] text-ink tracking-tight text-balance">
            One unified engine.{" "}
            <span className="font-display italic font-normal text-gradient-brand">
              Five strategic stages.
            </span>
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
            Not a bundle of disconnected services. A single operating system for enterprise scaling.
            From visual assets to targeted paid acquisition campaigns.
          </p>
        </div>

        {/* Stage selector */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-px bg-border" />
          <div
            className="hidden lg:block absolute top-[28px] left-0 h-px bg-gradient-brand transition-all duration-700"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-2 relative">
            {steps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button
                  key={s.t}
                  onClick={() => setActive(i)}
                  className="group text-left cursor-pointer"
                >
                  <div
                    className={`size-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      on
                        ? "bg-gradient-brand text-white shadow-glow scale-110"
                        : done
                          ? "bg-ink text-white"
                          : "bg-white border border-border text-ink-soft group-hover:border-ink/30"
                    }`}
                  >
                    <s.icon className="size-5" />
                  </div>
                  <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                    Stage 0{i + 1}
                  </div>
                  <div
                    className={`mt-1 text-lg font-semibold transition-colors ${on ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}
                  >
                    {s.t}
                  </div>
                  <div className="text-sm text-ink-soft hidden lg:block">{s.short}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail */}
        <div
          key={a.t}
          className="mt-14 rounded-[28px] bg-ink text-white p-10 lg:p-14 shadow-elegant animate-rise overflow-hidden relative"
        >
          <div className="absolute -top-32 -right-32 size-[420px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                Stage 0{active + 1} · {a.t}
              </div>
              <h3 className="mt-4 text-3xl lg:text-5xl font-semibold leading-tight">
                <span className="font-display italic font-normal text-gradient-brand">
                  {a.short}
                </span>
              </h3>
              <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">{a.d}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4">
                Core Deliverables
              </div>
              <ul className="space-y-3">
                {a.outputs.map((o) => (
                  <li key={o} className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <Check className="size-4 text-white" />
                    <span className="text-[15px]">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Interactive Results Showcase ---------- */

function Results() {
  const tabs = ["All", "USA & Canada", "UK & Europe", "Australia", "India & UAE"];
  const data = [
    {
      v: "+412%",
      l: "Leads growth",
      industry: "USA & Canada",
      timeline: "9 months",
      method: "Social content + Performance campaigns",
    },
    {
      v: "+260%",
      l: "Organic reach",
      industry: "Australia",
      timeline: "7 months",
      method: "Social media distribution & optimization",
    },
    {
      v: "+180%",
      l: "Conversion lift",
      industry: "USA & Canada",
      timeline: "4 months",
      method: "Visual identity restyle & custom funnels",
    },
    {
      v: "4.3×",
      l: "ROI on ad spend",
      industry: "UK & Europe",
      timeline: "12 months",
      method: "Performance marketing + Google search setup",
    },
    {
      v: "-38%",
      l: "Customer acquisition cost",
      industry: "UK & Europe",
      timeline: "6 months",
      method: "Visual guidelines overhaul + CRO funnels",
    },
    {
      v: "+210%",
      l: "Revenue growth YoY",
      industry: "India & UAE",
      timeline: "12 months",
      method: "Omnichannel performance + social authority",
    },
    {
      v: "11.2%",
      l: "Lead-to-booking rate",
      industry: "India & UAE",
      timeline: "5 months",
      method: "Meta ads campaigns + custom landing pages",
    },
    {
      v: "+320%",
      l: "Pipeline coverage",
      industry: "Australia",
      timeline: "8 months",
      method: "Performance scaling & social management",
    },
  ];
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? data : data.filter((d) => d.industry === tab);
  return (
    <section id="results" className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-8">
            <SectionLabel no="04" label="Results · 24-month rolling" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
              The metrics we{" "}
              <span className="font-display italic font-normal text-gradient-brand">engineer.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  tab === t
                    ? "bg-ink text-white"
                    : "bg-white border border-border text-ink-soft hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((d, i) => (
            <div
              key={d.l + i}
              className="group rounded-3xl bg-white border border-border p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 animate-rise"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="text-5xl lg:text-[56px] font-semibold text-gradient-brand tracking-tight leading-none">
                {d.v}
              </div>
              <div className="mt-5 text-base font-medium text-ink">{d.l}</div>
              <div className="mt-6 pt-5 border-t border-border space-y-2 text-[13px] text-ink-soft">
                <div className="flex justify-between">
                  <span>Region</span>
                  <span className="text-ink">{d.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline</span>
                  <span className="text-ink">{d.timeline}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="shrink-0">Method</span>
                  <span className="text-ink text-right">{d.method}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Solutions ---------- */

function Solutions() {
  const items = [
    {
      slug: "visual-identity",
      icon: Sparkles,
      t: "Visual Identity",
      o: "Become instantly recognizable.",
      d: "Premium logo systems, brand guidelines, and visual consistency engineered for trust.",
    },
    {
      slug: "social-media-management",
      icon: Megaphone,
      t: "Social Media",
      o: "Turn attention into pipeline.",
      d: "Authority content strategy, active community growth, and conversion-focused social funnels.",
    },
    {
      slug: "performance-marketing",
      icon: Target,
      t: "Performance Marketing",
      o: "Generate predictable revenue.",
      d: "Paid acquisition campaign architecture across search and social channels built for maximum ROAS.",
    },
  ];
  return (
    <section id="solutions" className="bg-white py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mb-14">
          <SectionLabel no="05" label="Core Capabilities" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
            Outcomes, not tasks —{" "}
            <span className="font-display italic font-normal text-ink-soft">
              engineered into one system.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">
          {items.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative p-8 lg:p-10 border-r border-b border-border hover:bg-surface transition-colors duration-300 block"
            >
              <s.icon className="size-6 text-ink" />
              <div className="mt-7 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {s.t}
              </div>
              <h3 className="mt-2 text-2xl lg:text-[28px] font-semibold text-ink leading-tight">
                {s.o}
              </h3>
              <p className="mt-3 text-[15px] text-ink-soft leading-relaxed max-w-sm">{s.d}</p>
              <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                  Read approach
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Interactive Case Studies ---------- */

function Stories() {
  const cases = [
    {
      client: "Vantage Group",
      industry: "Enterprise SaaS · USA",
      headline: "From stagnant ad performance to a compounding global pipeline.",
      challenge: "High cost-per-lead, outdated visual identity assets, stagnant social presence.",
      strategy:
        "Aligned design system visual standards, mapped social content distribution, launched performance ads.",
      kpis: [
        { l: "Ad Leads Lift", v: "+412%" },
        { l: "Acquisition cost", v: "-38%" },
        { l: "Blended ROI", v: "5.1×" },
      ],
      quote:
        "Zynovax didn't deliver a standard service. They engineered the unified visual and advertising system our growth was missing.",
      author: "Priya Mehta, VP Marketing",
    },
    {
      client: "Northwind Tech",
      industry: "B2B Logistics · Australia",
      headline: "Scalable customer acquisition, engineered.",
      challenge: "High client dependency, lack of visual authority, low social reach.",
      strategy:
        "Structured authority social media management, optimized search performance marketing, built consistent visual identity.",
      kpis: [
        { l: "Social Reach", v: "+260%" },
        { l: "Sales Bookings", v: "+180%" },
        { l: "Conversion Rate", v: "4.6/5" },
      ],
      quote:
        "Within two quarters, Zynovax shifted our brand from a local provider to a global authority using consistent social campaigns.",
      author: "Daniel Roth, Growth Director",
    },
    {
      client: "Helix Premium",
      industry: "D2C E-commerce · UAE & India",
      headline: "A premium brand identity engineered to convert.",
      challenge:
        "Discounting to close sales, weak repeat customer rates, inconsistent branding templates.",
      strategy:
        "Overhauled visual identity style book, set monthly social calendars, structured conversion paid ads.",
      kpis: [
        { l: "Conversions", v: "+180%" },
        { l: "AOV Lift", v: "+42%" },
        { l: "Repeat Rate", v: "+61%" },
      ],
      quote:
        "Consistent visual branding combined with social distribution and optimized paid media campaigns. Incredibly effective.",
      author: "Aisha Patel, Founder",
    },
  ];
  const [active, setActive] = useState(0);
  const c = cases[active];
  return (
    <section id="stories" className="bg-ink text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 relative">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
              <span className="font-display italic text-white">06</span>
              <span className="h-px w-8 bg-white/20" />
              Case studies
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] tracking-tight text-balance">
              Real systems.{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                Compounding metrics.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 relative">
          <div className="lg:col-span-4 flex flex-col gap-3">
            {cases.map((cc, i) => {
              const on = i === active;
              return (
                <button
                  key={cc.client}
                  onClick={() => setActive(i)}
                  className={`group text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                    on
                      ? "bg-white text-ink border-white shadow-glow"
                      : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  <div
                    className={`text-[11px] uppercase tracking-wider ${on ? "text-ink-soft" : "text-white/50"}`}
                  >
                    {cc.industry}
                  </div>
                  <div className={`mt-2 text-lg font-semibold ${on ? "text-ink" : "text-white"}`}>
                    {cc.client}
                  </div>
                  <div className={`mt-1 text-sm ${on ? "text-ink-soft" : "text-white/60"}`}>
                    {cc.headline}
                  </div>
                </button>
              );
            })}
          </div>
          <article
            key={c.client}
            className="lg:col-span-8 rounded-[28px] bg-white text-ink p-10 lg:p-14 shadow-elegant animate-rise"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  {c.industry}
                </div>
                <h3 className="mt-3 text-3xl lg:text-[40px] font-semibold leading-[1.05] tracking-tight text-balance">
                  {c.headline}
                </h3>
              </div>
              <Award className="size-7 text-ink-soft hidden md:block" />
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {c.kpis.map((k) => (
                <div key={k.l} className="rounded-2xl bg-surface p-5">
                  <div className="text-3xl lg:text-4xl font-semibold text-gradient-brand tracking-tight">
                    {k.v}
                  </div>
                  <div className="mt-1 text-sm text-ink-soft">{k.l}</div>
                </div>
              ))}
            </div>
            <dl className="mt-10 grid sm:grid-cols-2 gap-8">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-ink-soft">Challenge</dt>
                <dd className="mt-2 text-[15px] text-ink leading-relaxed">{c.challenge}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-ink-soft">Strategy</dt>
                <dd className="mt-2 text-[15px] text-ink leading-relaxed">{c.strategy}</dd>
              </div>
            </dl>
            <blockquote className="mt-10 pl-6 border-l-2 border-ink">
              <Quote className="size-5 text-ink-soft mb-3" />
              <p className="text-xl leading-snug font-display italic text-ink">"{c.quote}"</p>
              <footer className="mt-3 text-sm text-ink-soft">— {c.author}</footer>
            </blockquote>
          </article>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Founder Vision ---------- */

function FounderVision() {
  return (
    <section id="vision" className="bg-white py-24 lg:py-36">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionLabel no="07" label="Founder vision" />
            <div className="mt-10 rounded-3xl border border-border p-8 bg-surface">
              <img
                src={ahmedRashmi}
                alt="Ahmed Rashmi"
                className="size-16 rounded-full object-cover"
              />
              <div className="mt-5 text-base font-semibold text-ink">Ahmed Rashmi</div>
              <div className="text-sm text-ink-soft">Founder & CEO, Zynovax</div>
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-ink-soft">
                <div className="flex justify-between">
                  <span>Background</span>
                  <span className="text-ink">Ex-Stripe, ex-McKinsey</span>
                </div>
                <div className="flex justify-between">
                  <span>HQ Origin</span>
                  <span className="text-ink">Chennai, India</span>
                </div>
                <div className="flex justify-between">
                  <span>Global Scale</span>
                  <span className="text-ink">USA · UK · AUS · UAE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-5xl lg:text-[64px] font-semibold leading-[1.05] text-ink tracking-tight text-balance">
              <span className="font-display italic font-normal text-ink-soft">"</span>
              Growth isn't a collection of tactics. It's a unified{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                operating system
              </span>{" "}
              — and most brands have never been given one.
              <span className="font-display italic font-normal text-ink-soft">"</span>
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 text-[15px] text-ink-soft leading-[1.7]">
              <p>
                Zynovax was built to resolve a common frustration: watching ambitious enterprises
                hit operational and customer acquisition ceilings due to disconnected vendors. A
                design firm here, a social media agency there, and a separate media buyer.
              </p>
              <p>
                We engineered a single connected system. Visual identity design, organic social
                media management, and data-driven performance marketing campaigns run under one
                unified team. The result is visual authority and client pipeline that compounds
                globally.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <LiquidMetalButton
                label="Book a call with the team"
                width={210}
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Why Outgrow Traditional Agencies ---------- */

function WhyOutgrow() {
  const rows = [
    ["Operating model", "Connected growth system", "Disconnected services"],
    ["Capabilities", "Visual identity + Social + Performance", "Generalist agency bundles"],
    ["Output", "Measurable pipeline metrics", "Deliverables & simple hours reports"],
    ["Execution Speed", "Aligned production pods", "Slow back-and-forth reviews"],
    ["Accountability", "Live, custom dashboards", "Vague spreadsheets"],
    ["Market Scope", "Engineered for international reach", "Local context only"],
    ["Pricing Model", "Outcomes-aligned fixed retainers", "Inflated hourly billings"],
  ];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mb-14">
          <SectionLabel no="08" label="Why businesses outgrow traditional agencies" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
            A unified{" "}
            <span className="font-display italic font-normal text-gradient-brand">
              delivery architecture
            </span>{" "}
            for a different outcome.
          </h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-elegant">
          <div className="grid grid-cols-12 bg-surface border-b border-border">
            <div className="col-span-4 p-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Dimension
            </div>
            <div className="col-span-4 p-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink flex items-center gap-2">
              <img src={logo} className="h-4 w-auto" alt="" /> Zynovax
            </div>
            <div className="col-span-4 p-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Typical Agency
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r[0]}
              className={`grid grid-cols-12 items-start ${i !== rows.length - 1 ? "border-b border-border" : ""} hover:bg-surface/60 transition-colors`}
            >
              <div className="col-span-4 p-5 text-sm font-medium text-ink">{r[0]}</div>
              <div className="col-span-4 p-5 text-sm text-ink flex items-start gap-2">
                <Check className="size-4 mt-0.5 text-ink shrink-0" /> {r[1]}
              </div>
              <div className="col-span-4 p-5 text-sm text-ink-soft flex items-start gap-2">
                <X className="size-4 mt-0.5 shrink-0" /> {r[2]}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Horizontal Process Journey ---------- */

function Process() {
  const steps = [
    {
      n: "01",
      icon: Lightbulb,
      t: "Audit",
      d: "Audit of visual guidelines, search/social presence, and existing performance ad performance.",
      out: "Growth audit · Mapped funnels",
    },
    {
      n: "02",
      icon: Compass,
      t: "Position",
      d: "Visual standards setup, target audience mapping, and a 90-day multi-channel roadmap.",
      out: "Roadmap · Campaign briefs",
    },
    {
      n: "03",
      icon: Rocket,
      t: "Execute",
      d: "Design logo systems, schedule monthly social calendars, and deploy paid search/social ads in parallel.",
      out: "Brand system · Ads · Social content",
    },
    {
      n: "04",
      icon: Gauge,
      t: "Optimize",
      d: "Weekly ad creative iterations, search query refinement, and landing page CRO tests.",
      out: "Live dashboards · A/B logs",
    },
    {
      n: "05",
      icon: InfinityIcon,
      t: "Scale",
      d: "Audience budget expansion, geographic scaling, and quarterly reviews.",
      out: "QBR playbooks · Scale logs",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="process" className="bg-white py-24 lg:py-36">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-8">
            <SectionLabel no="09" label="The engagement" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[72px] font-semibold leading-[1.0] text-ink tracking-tight text-balance">
              How we engineer{" "}
              <span className="font-display italic font-normal text-gradient-brand">growth.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-ink-soft leading-relaxed">
              A five-stage journey designed to deliver visual authority and paid lead pipelines.
            </p>
          </div>
        </div>

        {/* Progressive horizontal journey */}
        <div className="relative">
          {/* progress rail */}
          <div className="absolute left-0 right-0 top-7 h-px bg-border" />
          <div
            className="absolute left-0 top-7 h-px bg-gradient-brand transition-all duration-700"
            style={{ width: `${((active + 1) / steps.length) * 100}%` }}
          />

          <ol className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <li key={s.n} onMouseEnter={() => setActive(i)} className="cursor-pointer group">
                  <div
                    className={`size-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
                      on
                        ? "bg-ink text-white border-ink scale-110"
                        : done
                          ? "bg-ink text-white border-ink"
                          : "bg-white border-border text-ink-soft group-hover:border-ink/40"
                    }`}
                  >
                    <s.icon className="size-5" />
                  </div>
                  <div className="mt-6 font-display italic text-2xl text-gradient-brand">{s.n}</div>
                  <div className="mt-1 text-lg font-semibold text-ink">{s.t}</div>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.d}</p>
                  <div
                    className={`mt-4 text-[11px] uppercase tracking-wider transition-colors ${on ? "text-ink" : "text-ink-soft"}`}
                  >
                    {s.out}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Methodology badges */}
        <div className="mt-20 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Layers,
              t: "Asset Libraries",
              d: "Standardized color libraries, logo files, and creative templates.",
            },
            {
              icon: Users,
              t: "Strategic Pods",
              d: "Senior brand designers, social strategists, and performance specialists.",
            },
            {
              icon: LineChart,
              t: "Pipeline Metrics",
              d: "Custom conversion dash, campaign logs, and weekly calls.",
            },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border p-6 bg-surface">
              <b.icon className="size-5 text-ink" />
              <div className="mt-4 text-base font-semibold text-ink">{b.t}</div>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const items = [
    {
      name: "Sarah Lin",
      role: "CEO, Quartz.io",
      quote:
        "The visual style and advertising pipeline they built is incredible. High attention to detail.",
    },
    {
      name: "Marcus Webb",
      role: "VP Growth, Lumen",
      quote:
        "We scaled our ad spend by 3x while maintaining our CAC. The content engine is rock solid.",
    },
    {
      name: "Aisha Patel",
      role: "Founder, Helix Premium",
      quote:
        "Stunning logo design, consistent Instagram presence, and profitable performance ads. All-in-one team.",
    },
  ];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mb-14">
          <SectionLabel no="10" label="What leaders say" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
            Trusted by operators who've{" "}
            <span className="font-display italic font-normal text-gradient-brand">
              built before.
            </span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 relative rounded-[28px] overflow-hidden bg-ink text-white p-10 lg:p-14 min-h-[420px] flex flex-col justify-between">
            <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
            <div className="relative">
              <Quote className="size-10 mb-8 text-white/40" />
              <p className="text-3xl lg:text-[40px] font-semibold leading-[1.15] tracking-tight max-w-2xl">
                "Zynovax aligned our visual guidelines and structured our global paid campaigns.
                Outstanding execution."
              </p>
            </div>
            <div className="relative mt-8">
              <div className="font-medium">Elena Marquez</div>
              <div className="text-sm text-white/60">CEO, Obsidian Tech</div>
            </div>
          </div>
          <div className="grid gap-5">
            {items.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white border border-border p-6 hover:shadow-elegant transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-[15px] text-ink leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 text-sm">
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="text-ink-soft">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const qs = [
    {
      q: "Who is Zynovax for?",
      a: "Startups, e-commerce, and high-growth brands that want a professional visual identity, active social presence, and high-ROAS paid acquisition campaigns engineered under one unified agency.",
    },
    {
      q: "How is this different from hiring traditional agencies?",
      a: "Instead of hiring three separate teams for design, social management, and paid media, Zynovax gives you one senior team and a connected dashboard tracking all three.",
    },
    {
      q: "How quickly do we see results?",
      a: "Visual style books ship in 3-4 weeks. Ads set up and social content launch within the first month. ROI optimizations happen weekly.",
    },
    {
      q: "Do you serve international clients?",
      a: "Yes, we serve clients globally including the USA, Canada, Australia, UK, UAE, and India, with our physical operations based in Chennai, India.",
    },
    {
      q: "How do you price engagements?",
      a: "Fixed retainers based on your tailored roadmap. Shared commercials are discussed on the strategy call once we review your channels.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-24 lg:py-32">
      <JsonLd data={faqSchema(qs.map((it) => ({ question: it.q, answer: it.a })))} />
      <Container>
        <div className="max-w-3xl mb-14">
          <SectionLabel no="11" label="Questions, answered" />
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.02] text-ink tracking-tight text-balance">
            Everything you need to{" "}
            <span className="font-display italic font-normal text-gradient-brand">decide.</span>
          </h2>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {qs.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => {
                    const nextOpen = isOpen ? null : i;
                    setOpen(nextOpen);
                    if (nextOpen !== null) {
                      trackFAQExpand(it.q);
                    }
                  }}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer"
                >
                  <span className="text-lg font-medium text-ink">{it.q}</span>
                  {isOpen ? (
                    <Minus className="size-5 text-ink-soft shrink-0" />
                  ) : (
                    <Plus className="size-5 text-ink-soft shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-7 -mt-3 text-[15px] text-ink-soft leading-relaxed max-w-2xl">
                    {it.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-white p-10 lg:p-24">
          <div className="absolute -top-32 -right-32 size-[600px] rounded-full bg-gradient-brand opacity-40 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
              <span className="font-display italic text-white">12</span>
              <span className="h-px w-8 bg-white/20" />
              Start the conversation
            </div>
            <h2 className="mt-7 text-4xl md:text-5xl lg:text-[80px] font-semibold leading-[1.0] tracking-tight text-balance">
              Let's engineer your{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                next chapter
              </span>{" "}
              of growth.
            </h2>
            <p className="mt-7 text-lg text-white/70 max-w-2xl leading-relaxed">
              Book a 30-minute strategy call. We'll audit your brand channels, search presence, or
              ad accounts, and outline a custom scaling roadmap.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <LiquidMetalButton
                label="Book Strategy Call"
                width={162}
                onClick={() => {
                  window.location.href = "/contact";
                }}
              />
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
              >
                <MessageCircle className="size-4" /> WhatsApp the team
              </a>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 grid sm:grid-cols-4 gap-6 text-xs text-white/70">
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">Email Us</div>
                <a href="mailto:info@zynovax.in" className="mt-1 text-white block hover:underline">
                  info@zynovax.in
                </a>
              </div>
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">
                  Physical HQ
                </div>
                <div className="mt-1 text-white">Chennai, India</div>
              </div>
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">First call</div>
                <div className="mt-1 text-white">30 min · Funnel audit</div>
              </div>
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">
                  Availability
                </div>
                <div className="mt-1 text-white">Q2 — 2 spots remaining</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


export default function LazySections() {
  return (
    <>
      <TrustedBy />
      <Industries />
      <Challenges />
      <GrowthEngine />
      <Results />
      <Solutions />
      <Stories />
      <FounderVision />
      <WhyOutgrow />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
