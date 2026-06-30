import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Sparkles, Megaphone, Target, Award, ArrowRight, Globe, TrendingUp, Users } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Container, Eyebrow } from "@/components/site/primitives";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { motion } from "framer-motion";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works & Case Studies — Portfolio | Zynovax" },
      { name: "description", content: "Proof over promises. Explore our latest global client rollouts across visual identity, social media management, and performance marketing." },
      { property: "og:title", content: "Zynovax Works" },
      { property: "og:description", content: "High-ticket global client case studies and growth metrics." },
    ],
  }),
  component: WorksPage,
});

type Project = {
  client: string;
  industry: string;
  category: "visual-identity" | "social-media-management" | "performance-marketing";
  categoryLabel: string;
  headline: string;
  challenge: string;
  strategy: string;
  metrics: { value: string; label: string }[];
  location: string;
};

const projects: Project[] = [
  {
    client: "AeroPay",
    industry: "Fintech · UAE",
    category: "performance-marketing",
    categoryLabel: "Performance Marketing",
    headline: "Scaling acquisition channels & attribution structure.",
    challenge: "High customer acquisition costs and lack of clear attribution modeling across paid media.",
    strategy: "Structured custom Meta & Google Ad campaigns targeting high-net-worth operators with clean server-side tracking.",
    metrics: [
      { value: "5.2x", label: "Blended ROAS" },
      { value: "+220%", label: "Pipeline Velocity" },
      { value: "-42%", label: "CPA Reduction" }
    ],
    location: "UAE"
  },
  {
    client: "Lumina Skin",
    industry: "D2C Luxury Wellness · Canada",
    category: "visual-identity",
    categoryLabel: "Visual Identity",
    headline: "Overhauling premium market perception via visual standards.",
    challenge: "Outgrown startup branding templates that failed to command premium pricing or retain trust.",
    strategy: "Developed an entirely new logo system, high-end typography sheets, and cohesive product packaging guides.",
    metrics: [
      { value: "+58%", label: "Brand Recall" },
      { value: "4.8/5", label: "Perceived Premium Score" },
      { value: "+27%", label: "AOV Lift" }
    ],
    location: "Canada"
  },
  {
    client: "Vercel Pro",
    industry: "B2B Developer Tools · USA",
    category: "social-media-management",
    categoryLabel: "Social Media Management",
    headline: "Authority thought leadership loops that generate inbound pipeline.",
    challenge: "Stagnant follower count and low lead conversion rates from organic channels.",
    strategy: "Introduced high-value written carousels and executive thought leadership programs built around technical insights.",
    metrics: [
      { value: "+310%", label: "Follower Reach" },
      { value: "+180%", label: "Inbound DMs" },
      { value: "4.2x", label: "Social Lead Pipeline" }
    ],
    location: "USA"
  },
  {
    client: "Aura Living",
    industry: "E-commerce · Australia",
    category: "performance-marketing",
    categoryLabel: "Performance Marketing",
    headline: "Scaling revenue predictably from ground up.",
    challenge: "Low repeat customer rate, high dependency on seasonal sales, and stagnant ad performance.",
    strategy: "Engineered high-converting landing pages integrated with structured Google Performance Max and Meta workflows.",
    metrics: [
      { value: "$50k+/mo", label: "Scaled from $0" },
      { value: "4.3x", label: "Ad Return Spend" },
      { value: "+61%", label: "Repeat Purchase Rate" }
    ],
    location: "Australia"
  },
  {
    client: "Zenith Capital",
    industry: "Wealth Management · UK",
    category: "visual-identity",
    categoryLabel: "Visual Identity",
    headline: "Forging institutional trust for high-ticket capital.",
    challenge: "Branding failed to reflect the ultra-high-net-worth scale of newly raised capital pools.",
    strategy: "Created an elegant crest logo system, curated HSL tailored color palette, and premium investor presentation decks.",
    metrics: [
      { value: "100%", label: "Institutional Trust Score" },
      { value: "£140M+", label: "Capital Influenced" },
      { value: "3 weeks", label: "System Rollout" }
    ],
    location: "UK"
  },
  {
    client: "Riva Health",
    industry: "Healthcare Platform · India",
    category: "social-media-management",
    categoryLabel: "Social Media Management",
    headline: "Creating clinical authority through organic content distribution.",
    challenge: "Low brand awareness in a crowded market and friction in patient booking workflows.",
    strategy: "Constructed monthly interactive content calendars highlighting medical breakthroughs and case reviews.",
    metrics: [
      { value: "+260%", label: "Engagement Scale" },
      { value: "+180%", label: "Direct Consults Booked" },
      { value: "4.6/5", label: "Patient Retention Rating" }
    ],
    location: "India"
  }
];

const filters = [
  { id: "all", label: "All Works", icon: null },
  { id: "visual-identity", label: "Visual Identity", icon: Sparkles },
  { id: "social-media-management", label: "Social Media", icon: Megaphone },
  { id: "performance-marketing", label: "Performance Marketing", icon: Target }
];

function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        {/* ─────────────── HERO — Premium Elite ─────────────── */}
        <section className="relative overflow-hidden min-h-[88vh] sm:min-h-[82vh] lg:min-h-[78vh] flex flex-col">

          {/* Layer 1 — animated dot grid */}
          <DottedSurface className="absolute inset-0 size-full z-0 opacity-40" />

          {/* Layer 2 — soft white top-fade so dots read clearly mid-section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-48 z-[1]"
            style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }}
          />

          {/* Layer 3 — brand soft bloom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-gradient-brand-soft opacity-60 blur-3xl z-[1]"
          />

          {/* Layer 4 — bottom fade into the next white section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[1]"
            style={{ background: "linear-gradient(to top, #ffffff 0%, transparent 100%)" }}
          />

          {/* ── Foreground content ── */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <Container className="pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow>Our Portfolio</Eyebrow>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="mt-6 max-w-4xl text-[2.6rem] sm:text-5xl lg:text-[80px] font-semibold leading-[0.97] tracking-[-0.04em] text-ink text-balance"
              >
                Proof over promises.{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  Explore our latest global client rollouts.
                </span>
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="mt-6 max-w-xl text-base sm:text-lg text-ink-soft leading-[1.6]"
              >
                Explore active case studies representing our high-impact systems deployed across
                USA, Canada, UK, UAE, Australia, and India.
              </motion.p>

              {/* ── CTA Row ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book Strategy Call
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#works-grid"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-ink hover:border-ink/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Case Studies
                  <ArrowUpRight className="size-4" />
                </a>
              </motion.div>

              {/* ── Stat strip — glassmorphic card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
                className="mt-12 inline-flex flex-wrap gap-px rounded-2xl border border-border/60 bg-white/60 backdrop-blur-md shadow-elegant overflow-hidden"
              >
                {[
                  { icon: Globe,       value: "6",     label: "Active Markets"   },
                  { icon: TrendingUp,  value: "5.2×",  label: "Avg. Blended ROAS"},
                  { icon: Users,       value: "100%",  label: "Client Retention" },
                ].map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 px-5 sm:px-7 py-4 sm:py-5 bg-white/50 ${
                      i < 2 ? "border-r border-border/50" : ""
                    }`}
                  >
                    <div className="size-8 rounded-xl bg-gradient-brand-soft flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-ink" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gradient-brand tracking-tight leading-none">
                        {value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink-soft font-semibold mt-0.5">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* ── Location tag strip ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.46 }}
                className="mt-8 flex flex-wrap items-center gap-2"
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft/60 font-semibold mr-1">
                  Deployed in
                </span>
                {["USA", "Canada", "UK", "UAE", "Australia", "India"].map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center rounded-full border border-border/70 bg-white/60 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-ink-soft"
                  >
                    {loc}
                  </span>
                ))}
              </motion.div>

            </Container>
          </div>
        </section>

        {/* Scroll anchor for "View Case Studies" CTA */}
        <div id="works-grid" />

        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="flex flex-wrap gap-2.5 border-b border-border pb-8 mb-12">
              {filters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-ink text-white shadow-elegant"
                      : "bg-surface text-ink-soft hover:bg-border/40 hover:text-ink border border-border/40"
                      }`}
                  >
                    {Icon && <Icon className={`size-3.5 ${isActive ? "text-white" : "text-ink-soft group-hover:text-ink"}`} />}
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Project Display Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {filteredProjects.map((p) => (
                <article
                  key={p.client}
                  className="group rounded-[32px] border border-border bg-white p-8 lg:p-10 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-semibold">{p.industry}</span>
                      <span className="text-xs font-medium text-gradient-brand font-semibold px-3 py-1 bg-gradient-brand-soft rounded-full border border-border/10">
                        {p.categoryLabel}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl lg:text-3xl font-semibold leading-[1.1] text-ink">
                      {p.client} — {p.headline}
                    </h3>

                    <div className="mt-8 space-y-4 text-sm text-ink-soft">
                      <div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-ink block mb-1">Challenge</span>
                        <p className="leading-relaxed">{p.challenge}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-ink block mb-1">Strategy</span>
                        <p className="leading-relaxed">{p.strategy}</p>
                      </div>
                    </div>

                    {/* Service Specific High-Fidelity Custom Styling Widgets */}
                    {p.category === "visual-identity" && (
                      <div className="mt-8 rounded-2xl bg-surface border border-border p-5 flex items-center justify-between gap-4">
                        <div className="flex gap-2">
                          <div className="size-10 rounded-full bg-ink flex items-center justify-center text-xs font-semibold text-white shadow-elegant">Aa</div>
                          <div className="size-10 rounded-full bg-brand-pink border border-white/20 shadow-elegant" />
                          <div className="size-10 rounded-full bg-brand-orange border border-white/20 shadow-elegant" />
                          <div className="size-10 rounded-full bg-brand-violet border border-white/20 shadow-elegant" />
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] uppercase tracking-wider text-ink-soft font-semibold">Primary Font</div>
                          <div className="text-sm font-semibold text-ink font-display italic">Instrument Serif</div>
                        </div>
                      </div>
                    )}

                    {p.category === "social-media-management" && (
                      <div className="mt-8 rounded-2xl bg-surface border border-border p-5">
                        <div className="flex justify-between items-end h-16 gap-2">
                          {[28, 42, 36, 64, 52, 85, 100].map((val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-brand rounded-t-lg transition-all duration-500 hover:opacity-80"
                              style={{ height: `${val}%` }}
                            />
                          ))}
                        </div>
                        <div className="mt-3 flex justify-between text-[9px] uppercase tracking-wider text-ink-soft font-semibold">
                          <span>Day 1</span>
                          <span className="text-gradient-brand">Velocity scale</span>
                          <span>Day 90</span>
                        </div>
                      </div>
                    )}

                    {p.category === "performance-marketing" && (
                      <div className="mt-8 rounded-2xl bg-surface border border-border p-5 space-y-2.5">
                        <div className="flex justify-between text-xs border-b border-border pb-2">
                          <span className="text-ink-soft">Channel Allocation</span>
                          <span className="font-semibold text-ink">Google & Meta Ads</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-border pb-2">
                          <span className="text-ink-soft">Blended CPA</span>
                          <span className="font-semibold text-ink">$14.20 (Stable)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-ink-soft">Attribution Framework</span>
                          <span className="font-semibold text-gradient-brand">Server-Side Cloud</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="grid grid-cols-3 gap-6 flex-1">
                      {p.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-2xl font-bold text-gradient-brand tracking-tight">{m.value}</div>
                          <div className="text-[10px] text-ink-soft mt-1 uppercase tracking-wider">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex size-11 rounded-full bg-surface border border-border items-center justify-center shrink-0 text-ink hover:bg-ink hover:text-white hover:border-ink hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Call to Action bottom */}
            <div className="mt-20 rounded-[32px] bg-ink text-white p-8 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-brand opacity-15" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Apply For Partnership</span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                  Ready to engineer your custom growth system?
                </h2>
                <p className="mt-6 text-white/70 leading-relaxed text-sm sm:text-base">
                  We design, manage, and scale the operational growth engine for high-ticket market players globally. Book a strategy audit today.
                </p>
                <div className="mt-8 flex justify-center">
                  <LiquidMetalButton
                    label="Book Strategy Call"
                    width={162}
                    onClick={() => { window.location.href = "/contact"; }}
                  />
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
