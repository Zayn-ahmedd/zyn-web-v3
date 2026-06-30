import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Megaphone, Target, Gauge, Rocket, Check } from "lucide-react";
import { useState } from "react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Globe } from "@/components/ui/cobe-globe";

const globeMarkers = [
  { id: "usa", location: [37.7595, -122.4367] as [number, number], label: "United States" },
  { id: "canada", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "uk", location: [51.5074, -0.1278] as [number, number], label: "United Kingdom" },
  { id: "uae", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "india", location: [19.0760, 72.8777] as [number, number], label: "India" },
  { id: "australia", location: [-33.8688, 151.2093] as [number, number], label: "Australia" },
];

const globeArcs = [
  { id: "usa-uk", from: [37.7595, -122.4367] as [number, number], to: [51.5074, -0.1278] as [number, number] },
  { id: "uk-uae", from: [51.5074, -0.1278] as [number, number], to: [25.2048, 55.2708] as [number, number] },
  { id: "uae-india", from: [25.2048, 55.2708] as [number, number], to: [19.0760, 72.8777] as [number, number] },
  { id: "india-australia", from: [19.0760, 72.8777] as [number, number], to: [-33.8688, 151.2093] as [number, number] },
];

export const Route = createFileRoute("/growth-engine")({
  head: () => ({
    meta: [
      { title: "The Zynovax Growth Engine™ — A System for Compounding Revenue" },
      { name: "description", content: "The proprietary five-stage operating system Zynovax uses to engineer compounding revenue: Visual Identity, Social Presence, Performance Ads, CRO Funnels and Global Scale." },
      { property: "og:title", content: "The Zynovax Growth Engine™" },
      { property: "og:description", content: "A five-stage operating system for compounding revenue." },
    ],
  }),
  component: GrowthEnginePage,
});

const stages = [
  { n: "01", icon: Sparkles, t: "Visual Identity", short: "Build premium assets.", d: "We design premium logo lockups, standardized brand color guidelines, and visual assets built for global trust.", outputs: ["Primary logo marks", "Figma design system", "Collateral styling"] },
  { n: "02", icon: Megaphone, t: "Social Presence", short: "Build organic reach.", d: "Authority content distribution calendars, short-form video assets, and active community manager setups.", outputs: ["Content schedule", "Video/Image design", "Inbox routing"] },
  { n: "03", icon: Target, t: "Performance Ads", short: "Acquire paid demand.", d: "High-converting search and social ad setups running on Google and Meta platforms tuned for direct pipeline.", outputs: ["Google Search ads", "Meta creative setups", "Attribution trackers"] },
  { n: "04", icon: Gauge, t: "CRO Funnels", short: "Convert traffic.", d: "Fast custom landing pages, lifecycle tracking, and direct email nurture templates designed for high conversion.", outputs: ["Landing page design", "Attribution dash", "Nurture sequence"] },
  { n: "05", icon: Rocket, t: "Global Scale", short: "Maximize ROAS.", d: "Weekly optimization reviews, creative testing loops, and geographical scaling playbooks.", outputs: ["Multi-region scale", "A/B testing loop", "Weekly playbook"] },
];

function GrowthEnginePage() {
  const [active, setActive] = useState(0);
  const a = stages[active];
  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[520px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow>The Zynovax Growth Engine™</Eyebrow>
                <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
                  One connected system.{" "}
                  <span className="font-display italic font-normal text-gradient-brand">Five compounding stages.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
                  Not a bundle of disconnected services. A proprietary operating system for growth. Every stage feeds the next, and every stage is measured against revenue metrics.
                </p>
                <div className="mt-9">
                  <LiquidMetalButton
                    label="Run the engine on your business"
                    width={240}
                    onClick={() => { window.location.href = "/contact"; }}
                  />
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center relative w-full max-w-[450px] lg:max-w-none mx-auto">
                <div className="absolute inset-0 bg-gradient-brand-soft opacity-40 blur-2xl rounded-full" />
                <Globe
                  markers={globeMarkers}
                  arcs={globeArcs}
                  className="w-full h-full relative z-10"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            {/* Stage rail */}
            <div className="relative">
              <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-px bg-border" />
              <div
                className="hidden lg:block absolute top-[28px] left-0 h-px bg-gradient-brand transition-all duration-700"
                style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
                {stages.map((s, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <button key={s.n} onClick={() => setActive(i)} className="group text-left cursor-pointer">
                      <div className={`size-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                        on ? "bg-gradient-brand text-white shadow-glow scale-110" :
                        done ? "bg-ink text-white" : "bg-white border border-border text-ink-soft group-hover:border-ink/30"
                      }`}>
                        <s.icon className="size-5" />
                      </div>
                      <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-ink-soft">Stage {s.n}</div>
                      <div className={`mt-1 text-lg font-semibold ${on ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}>{s.t}</div>
                      <div className="text-sm text-ink-soft hidden lg:block">{s.short}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active stage */}
            <div key={a.t} className="mt-14 rounded-[28px] bg-ink text-white p-10 lg:p-16 shadow-elegant animate-rise overflow-hidden relative">
              <div className="absolute -top-32 -right-32 size-[420px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
              <div className="relative grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">Stage {a.n} · {a.t}</div>
                  <h3 className="mt-4 text-3xl lg:text-6xl font-semibold leading-tight">
                    <span className="font-display italic font-normal text-gradient-brand">{a.short}</span>
                  </h3>
                  <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">{a.d}</p>
                </div>
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4">Deliverables</div>
                  <ul className="space-y-3">
                    {a.outputs.map((o) => (
                      <li key={o} className="flex items-center gap-3 border-b border-white/10 pb-3">
                        <Check className="size-4" />
                        <span className="text-[15px]">{o}</span>
                      </li>
                    ))}
                  </ul>
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
