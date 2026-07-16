import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Sparkles, Megaphone, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { PerspectiveBook } from "@/components/ui/perspective-book";
import { cn } from "@/lib/utils";
import { generatePageHead } from "@/lib/seo/metadata";
import { collectionPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";

export const Route = createFileRoute("/insights")({
  head: () =>
    generatePageHead({
      title: "Insights & Playbooks — White-Papers | Zynovax",
      description:
        "Download our creative branding manuals, performance marketing guides, and brand design white-papers built for ambitious founders.",
      path: "/insights",
    }),
  component: InsightsPage,
});

type Playbook = {
  title: string;
  subtitle: string;
  size: string;
  downloaded: string;
  percent: number;
  stat: string;
  statLabel: string;
  category: "brand" | "social" | "performance";
  categoryLabel: string;
  icon: typeof Sparkles;
};

const categoryStyles = {
  brand: {
    bg: "bg-gradient-to-br from-[#0c0d14] via-[#1b1c2b] to-[#0c0d14] text-white border-l border-white/10",
    glow: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    textGradient: "text-purple-300",
  },
  social: {
    bg: "bg-gradient-to-br from-[#12070c] via-[#260e1b] to-[#12070c] text-white border-l border-white/10",
    glow: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
    textGradient: "text-pink-300",
  },
  performance: {
    bg: "bg-gradient-to-br from-[#050b0b] via-[#0b1b1c] to-[#050b0b] text-white border-l border-white/10",
    glow: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    textGradient: "text-teal-300",
  },
};

const playbooks: Playbook[] = [
  {
    title: "Visual Identity Playbook",
    subtitle: "Codifying brand guides and positioning structures for high-ticket market trust.",
    size: "2.4 MB",
    downloaded: "2.1 MB",
    percent: 88,
    stat: "58%",
    statLabel: "Recall Increase",
    category: "brand",
    categoryLabel: "Brand Strategy",
    icon: Sparkles,
  },
  {
    title: "Social Media Growth Manual",
    subtitle: "Engineering organic narrative distribution loops and founder thought leadership.",
    size: "1.8 MB",
    downloaded: "1.8 MB",
    percent: 100,
    stat: "180%",
    statLabel: "Inbound DMs Lift",
    category: "social",
    categoryLabel: "Organic Content",
    icon: Megaphone,
  },
  {
    title: "Performance Scaling Engine",
    subtitle: "Google Ads, Meta Ads campaign scaling layouts and server-side attribution tracking.",
    size: "3.2 MB",
    downloaded: "3.2 MB",
    percent: 100,
    stat: "5.2x",
    statLabel: "Blended ROAS",
    category: "performance",
    categoryLabel: "Paid Acquisition",
    icon: Target,
  },
];

function InsightsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", market: "USA" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const collectionItems = playbooks.map((p) => ({
    name: `${p.title} — ${p.subtitle}`,
    url: `https://www.zynovax.in/insights`,
    description: `Category: ${p.categoryLabel}. Stat: ${p.stat} (${p.statLabel})`,
  }));

  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={collectionPageSchema(
          "Insights & Playbooks — White-Papers | Zynovax",
          "Download our creative branding manuals, performance marketing guides, and brand design white-papers.",
          "/insights",
          collectionItems,
        )}
      />
      <SiteNav />

      <div className="animate-slide-down-page">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-12 lg:pt-28 lg:pb-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Insights", path: "/insights" },
              ]}
              className="mb-8"
            />
            <Eyebrow>Knowledge Base</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Playbooks &{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                growth systems playbooks.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
              Download high-value research docs, strategy guidelines, and technical attribution
              setups compiled by senior operators.
            </p>
          </Container>
        </section>

        {/* Playbooks list with download progress widgets */}
        <section className="bg-white pb-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-border/80">
              {playbooks.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group rounded-3xl border border-border bg-white p-7 sm:p-8 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Centered 3D Book Container */}
                      <div className="flex justify-center py-6 mb-6 bg-surface rounded-2xl border border-border/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.01]" />
                        <PerspectiveBook size="default" textured>
                          <div
                            className={cn(
                              "w-full h-full flex flex-col justify-between p-5 text-white select-none relative overflow-hidden",
                              categoryStyles[p.category].bg,
                            )}
                          >
                            {/* Subtle texture lines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                            {/* Header */}
                            <div className="flex justify-between items-center opacity-80 relative z-10">
                              <span className="text-[7px] font-bold uppercase tracking-[0.2em] font-mono">
                                Zynovax Framework
                              </span>
                              <span className="text-[7px] font-bold font-mono">v2.5</span>
                            </div>

                            {/* Middle Icon artwork */}
                            <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10">
                              <div
                                className={cn(
                                  "size-11 rounded-full flex items-center justify-center mb-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
                                  categoryStyles[p.category].glow,
                                )}
                              >
                                <Icon className="size-5" />
                              </div>
                              <div className="h-px w-8 bg-white/20 my-1" />
                            </div>

                            {/* Title & Metadata */}
                            <div className="mt-auto relative z-10">
                              <h4 className="text-[11px] font-semibold tracking-tight leading-snug line-clamp-2">
                                {p.title}
                              </h4>
                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10 opacity-70">
                                <span className="text-[6px] font-bold uppercase tracking-wider text-white/70">
                                  {p.categoryLabel}
                                </span>
                                <span className="text-[6px] font-bold font-mono">
                                  VOL. 0{playbooks.indexOf(p) + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                        </PerspectiveBook>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border",
                            p.category === "brand"
                              ? "text-purple-600 bg-purple-50/50 border-purple-100"
                              : p.category === "social"
                                ? "text-pink-600 bg-pink-50/50 border-pink-100"
                                : "text-teal-600 bg-teal-50/50 border-teal-100",
                          )}
                        >
                          {p.categoryLabel}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-ink leading-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.subtitle}</p>

                      {/* Performance Metric Block */}
                      <div className="mt-6 p-4 rounded-2xl bg-surface border border-border flex items-baseline justify-between">
                        <span className="text-xs text-ink-soft font-semibold">
                          Projected Impact
                        </span>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gradient-brand leading-none">
                            {p.stat}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-ink-soft mt-0.5">
                            {p.statLabel}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/80">
                      {/* Visual progress gauge bar / gauge widgets */}
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-ink-soft font-medium">Download progress</span>
                        <span className="font-mono text-ink font-semibold">
                          {p.downloaded} / {p.size} ({p.percent}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-5">
                        <div
                          className="h-full bg-gradient-brand rounded-full transition-all duration-500"
                          style={{ width: `${p.percent}%` }}
                        />
                      </div>

                      <a
                        href="#lead-form"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink text-white py-3 text-xs font-semibold uppercase tracking-wider hover:shadow-glow transition-all duration-300"
                      >
                        <Download className="size-3.5" /> Access Document
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Lead Gen Form Section */}
        <section id="lead-form" className="bg-surface py-24 lg:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <Eyebrow>Unlock Materials</Eyebrow>
                <h2 className="mt-6 text-3xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-ink">
                  Get full access to all Zynovax manuals.
                </h2>
                <p className="mt-6 text-base text-ink-soft leading-relaxed">
                  Enter your details to generate custom download links. Select your primary target
                  market region to receive localized compliance frameworks and ROAS benchmarks
                  tailored to USA, Canada, Australia, UK, UAE, and India.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-border/80">
                  <div>
                    <div className="text-3xl font-bold text-ink">12K+</div>
                    <div className="text-[10px] text-ink-soft mt-1 uppercase tracking-wider">
                      Downloads Deployed
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-ink">6</div>
                    <div className="text-[10px] text-ink-soft mt-1 uppercase tracking-wider">
                      Regions Benchmarked
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-ink">4.9/5</div>
                    <div className="text-[10px] text-ink-soft mt-1 uppercase tracking-wider">
                      Operator Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white border border-border rounded-[32px] p-8 lg:p-10 shadow-elegant">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="inline-flex size-14 rounded-full bg-gradient-brand-soft flex items-center justify-center mb-6">
                        <CheckCircle2 className="size-7 text-ink" />
                      </div>
                      <h3 className="text-2xl font-semibold text-ink leading-tight">
                        Access Link Dispatched
                      </h3>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-sm mx-auto">
                        We have sent the PDF download links and custom data audits for **
                        {formData.market}** to **{formData.email}**. Check your inbox.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                          Founder / Contact Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink bg-surface focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                          Corporate Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@luminaskin.com"
                          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink bg-surface focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                          Primary Target Market Region
                        </label>
                        <select
                          value={formData.market}
                          onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink bg-surface focus:outline-none focus:border-ink transition-colors"
                        >
                          <option value="USA">United States (USA)</option>
                          <option value="Canada">Canada (CAN)</option>
                          <option value="Australia">Australia (AUS)</option>
                          <option value="United Kingdom">United Kingdom (UK)</option>
                          <option value="UAE">United Arab Emirates (UAE)</option>
                          <option value="India">India (IND)</option>
                        </select>
                      </div>

                      {/* Full-width premium liquid metal submit */}
                      <div className="flex justify-center mt-4">
                        <LiquidMetalButton
                          label="REQUEST PLAYBOOK ACCESS"
                          width={246}
                          onClick={() => {
                            if (formData.name && formData.email) setSubmitted(true);
                          }}
                        />
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
