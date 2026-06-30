import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Globe,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  Activity,
  Sparkles,
  Landmark,
  MessageSquare,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Globe as CobeGlobe } from "@/components/ui/cobe-globe";

const globeMarkers = [
  { id: "usa", location: [37.7595, -122.4367] as [number, number], label: "United States" },
  { id: "canada", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "uk", location: [51.5074, -0.1278] as [number, number], label: "United Kingdom" },
  { id: "uae", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "india", location: [19.076, 72.8777] as [number, number], label: "India" },
  { id: "australia", location: [-33.8688, 151.2093] as [number, number], label: "Australia" },
];

const globeArcs = [
  {
    id: "usa-uk",
    from: [37.7595, -122.4367] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
  },
  {
    id: "uk-uae",
    from: [51.5074, -0.1278] as [number, number],
    to: [25.2048, 55.2708] as [number, number],
  },
  {
    id: "uae-india",
    from: [25.2048, 55.2708] as [number, number],
    to: [19.076, 72.8777] as [number, number],
  },
  {
    id: "india-australia",
    from: [19.076, 72.8777] as [number, number],
    to: [-33.8688, 151.2093] as [number, number],
  },
];

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Global Target Markets — Analytics & Hub Performance | Zynovax" },
      {
        name: "description",
        content:
          "Growth metrics, active hub channels, and ROI charts across our primary target markets: USA, Canada, Australia, UK, UAE, and India.",
      },
      { property: "og:title", content: "Global Target Markets | Zynovax" },
      {
        property: "og:description",
        content: "Compounding scale systems operating in 6 international regions.",
      },
    ],
  }),
  component: MarketsPage,
});

const markets = [
  {
    flag: "🇺🇸",
    country: "United States",
    status: "Active Hub",
    metricLabel: "Avg. ROAS",
    metricValue: "4.9x",
    sector: "SaaS & Fintech",
    channel: "LinkedIn + Google Search",
    graphPoints: "M10 80 Q 40 70, 70 50 T 130 20 T 190 10",
    gradientId: "us-grad",
    fromColor: "var(--color-brand-orange)",
    toColor: "var(--color-brand-violet)",
    attribution: "First-touch multi-channel",
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    status: "Scaling Network",
    metricLabel: "Lead Growth",
    metricValue: "+310%",
    sector: "EdTech & Tech Platforms",
    channel: "Meta Campaigns + Search",
    graphPoints: "M10 80 Q 50 65, 90 60 T 150 35 T 190 15",
    gradientId: "ca-grad",
    fromColor: "var(--color-brand-magenta)",
    toColor: "var(--color-brand-pink)",
    attribution: "Linear attribute tracking",
  },
  {
    flag: "🇦🇺",
    country: "Australia",
    status: "Active Hub",
    metricLabel: "Avg. Conv. Rate",
    metricValue: "2.8%",
    sector: "Enterprise B2B Logistics",
    channel: "Google Search + Paid Social",
    graphPoints: "M10 80 Q 45 75, 80 50 T 140 40 T 190 20",
    gradientId: "au-grad",
    fromColor: "var(--color-brand-violet)",
    toColor: "var(--color-brand-orange)",
    attribution: "Multi-touch position-based",
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    status: "Active Hub",
    metricLabel: "Acquisition CAC",
    metricValue: "-42%",
    sector: "Consumer Fintech & Wealth",
    channel: "Attribution + Paid Search",
    graphPoints: "M10 80 Q 35 70, 75 55 T 135 30 T 190 18",
    gradientId: "uk-grad",
    fromColor: "var(--color-brand-pink)",
    toColor: "var(--color-brand-violet)",
    attribution: "Time-decay algorithmic model",
  },
  {
    flag: "🇦🇪",
    country: "United Arab Emirates",
    status: "High Growth",
    metricLabel: "Blended ROI",
    metricValue: "5.4x",
    sector: "D2C Premium E-Commerce",
    channel: "Social Video + Meta Ads",
    graphPoints: "M10 85 Q 40 80, 80 50 T 140 25 T 190 5",
    gradientId: "ae-grad",
    fromColor: "var(--color-brand-orange)",
    toColor: "var(--color-brand-magenta)",
    attribution: "Last-click marketing integration",
  },
  {
    flag: "🇮🇳",
    country: "India",
    status: "Scaling Network",
    metricLabel: "Social Reach",
    metricValue: "+480%",
    sector: "Founder Authority Systems",
    channel: "Content Engine + LinkedIn",
    graphPoints: "M10 80 Q 30 75, 60 55 T 120 40 T 190 12",
    gradientId: "in-grad",
    fromColor: "var(--color-brand-violet)",
    toColor: "var(--color-brand-pink)",
    attribution: "W-Shaped full pipeline visibility",
  },
];

function MarketsPage() {
  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow>Global Cross-Sections</Eyebrow>
                <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
                  Target markets.{" "}
                  <span className="font-display italic font-normal text-gradient-brand">
                    Engineered to scale.
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
                  We run customized direct-response ad accounts, premium local brand rests, and
                  social media networks across six key geopolitical hubs.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center relative w-full max-w-[450px] lg:max-w-none mx-auto">
                <div className="absolute inset-0 bg-gradient-brand-soft opacity-40 blur-2xl rounded-full" />
                <CobeGlobe
                  markers={globeMarkers}
                  arcs={globeArcs}
                  className="w-full h-full relative z-10"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Global KPI dashboard */}
        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets.map((m) => (
                <div
                  key={m.country}
                  className="group relative rounded-3xl border border-border bg-white p-7 hover:border-ink/20 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header line of card */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label={m.country}>
                          {m.flag}
                        </span>
                        <h3 className="text-xl font-semibold text-ink">{m.country}</h3>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft border border-border">
                        {m.status}
                      </span>
                    </div>

                    {/* Primary Widget Metric */}
                    <div className="mt-6 flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-ink-soft">
                          {m.metricLabel}
                        </div>
                        <div className="text-4xl font-semibold text-ink tracking-tight mt-1">
                          {m.metricValue}
                        </div>
                      </div>
                      <div className="size-8 rounded-lg bg-surface flex items-center justify-center">
                        <TrendingUp className="size-4 text-ink" />
                      </div>
                    </div>

                    {/* Custom SVG Trend Graph */}
                    <div className="mt-5 h-[100px] w-full rounded-2xl bg-surface border border-border/60 overflow-hidden relative flex items-end">
                      <svg
                        className="w-full h-[90px]"
                        viewBox="0 0 200 90"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id={m.gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={m.fromColor} stopOpacity="0.45" />
                            <stop offset="100%" stopColor={m.fromColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area path */}
                        <path
                          d={`${m.graphPoints} L 190 90 L 10 90 Z`}
                          fill={`url(#${m.gradientId})`}
                        />
                        {/* Line path */}
                        <path
                          d={m.graphPoints}
                          fill="none"
                          stroke={m.fromColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Interactive glow point */}
                        <circle
                          cx="190"
                          cy="12"
                          r="4.5"
                          fill={m.toColor}
                          className="animate-pulse"
                        />
                        <circle
                          cx="190"
                          cy="12"
                          r="8"
                          fill={m.toColor}
                          fillOpacity="0.3"
                          className="animate-ping"
                        />
                      </svg>
                      <div className="absolute top-2.5 left-3 text-[10px] text-ink-soft/75 font-mono">
                        REAL-TIME AD PERFORMANCE
                      </div>
                    </div>
                  </div>

                  {/* Sector metadata at bottom */}
                  <div className="mt-6 pt-5 border-t border-border flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-ink-soft">Focus Category</span>
                      <span className="font-medium text-ink">{m.sector}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-ink-soft">Active Channels</span>
                      <span className="font-medium text-ink truncate max-w-[170px]">
                        {m.channel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-dashed border-border/80 pt-2 text-[11px]">
                      <span className="text-ink-soft/80">Attribution Model</span>
                      <span className="text-ink-soft font-mono truncate max-w-[160px]">
                        {m.attribution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Global Operations segment */}
        <section className="bg-surface py-24 border-t border-border">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <SectionLabel no="·" label="Operational Footprint" />
                <h2 className="mt-5 text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-balance">
                  Managing cross-border accounts with{" "}
                  <span className="font-display italic font-normal text-gradient-brand">
                    absolute fidelity.
                  </span>
                </h2>
                <p className="mt-6 text-base text-ink-soft leading-relaxed">
                  Different tax rules, specific regional privacy constraints (CCPA, GDPR, India IT
                  Rules), and cultural layout defaults mean a single marketing playbook fails. We
                  deploy specialized localized variants under a central brand framework.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-gradient-brand flex items-center justify-center">
                      <Sparkles className="size-2.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-ink">
                      Localized creative setups for higher CTR
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-gradient-brand flex items-center justify-center">
                      <Landmark className="size-2.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-ink">
                      Multi-currency financial attribution mapping
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-gradient-brand flex items-center justify-center">
                      <MessageSquare className="size-2.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-ink">
                      Local community response agents in target timezones
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 relative">
                <div className="rounded-3xl border border-border p-8 bg-white shadow-elegant">
                  <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                    <Activity className="size-4 text-ink-soft" /> Attributed Revenue Growth
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-6">
                    Weekly compound run-rate of client revenue processed across international
                    channels.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-ink">North America (USA + CA)</span>
                        <span className="text-ink-soft">$4.2M/mo (+28%)</span>
                      </div>
                      <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: "85%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-ink">Europe & Middle East (UK + UAE)</span>
                        <span className="text-ink-soft">$2.1M/mo (+35%)</span>
                      </div>
                      <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-ink">APAC Region (AU + IN)</span>
                        <span className="text-ink-soft">$1.8M/mo (+42%)</span>
                      </div>
                      <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: "55%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border flex justify-center">
                    <LiquidMetalButton
                      label="Audit your market viability"
                      width={212}
                      onClick={() => {
                        window.location.href = "/contact";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
