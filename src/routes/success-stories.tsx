import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote, Star, Award } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Client Outcomes & Case Studies | Zynovax" },
      {
        name: "description",
        content:
          "Real creative branding & digital marketing outcomes. Case studies from Visual Identity, Social Media, and Performance Marketing clients — challenge, strategy, execution and measurable results.",
      },
      { property: "og:title", content: "Zynovax Success Stories" },
      {
        property: "og:description",
        content:
          "Borders are imaginary; your scale is absolute. Real systems, measurable outcomes.",
      },
    ],
  }),
  component: StoriesPage,
});

const stories = [
  {
    client: "Vantage Group",
    industry: "Enterprise SaaS · USA",
    headline: "From stagnant ad performance to a compounding global pipeline.",
    challenge: "High cost-per-lead, outdated visual identity assets, stagnant social presence.",
    strategy:
      "Aligned design system visual standards, mapped social content distribution, launched performance ads.",
    execution:
      "Visual guidelines in 3 weeks. Social templates in 30 days. Ads launched in 45. Full system live in 60.",
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
    headline: "Predictable customer bookings, engineered.",
    challenge: "High client dependency, lack of visual authority, low social reach.",
    strategy:
      "Structured authority social media management, optimized search performance marketing, and built visual identity guides.",
    execution: "Brand guides in 4 weeks. Social campaigns in 45 days. Paid campaigns live in 60.",
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
    execution: "Style book in 4 weeks. Social templates in 6. Performance ads live in 8.",
    kpis: [
      { l: "Conversions", v: "+180%" },
      { l: "AOV Lift", v: "+42%" },
      { l: "Repeat Rate", v: "+61%" },
    ],
    quote:
      "Consistent visual branding combined with social distribution and optimized paid media campaigns. Incredibly effective.",
    author: "Aisha Patel, Founder",
  },
  {
    client: "Quartz Fintech",
    industry: "Fintech · UK",
    headline: "From founder-led sales to a predictable pipeline.",
    challenge: "Founder bandwidth as the bottleneck, no attribution, low ROAS.",
    strategy:
      "Performance marketing engine, custom landing pages, structured visual ads, attribution setup.",
    execution: "Attribution in 3 weeks. Landing pages in 30 days. Campaigns live in 45.",
    kpis: [
      { l: "Pipeline", v: "+320%" },
      { l: "ROAS", v: "4.7×" },
      { l: "CAC", v: "-42%" },
    ],
    quote:
      "We finally have a visual design standards and advertising forecast we can stand behind in board meetings.",
    author: "Sarah Lin, CEO",
  },
];

function StoriesPage() {
  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <Eyebrow>Success Stories</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Real systems.{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                Measurable outcomes.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
              Selected engagements where the Growth Engine compounded into category-leading numbers.
              Names are real. So are the dashboards.
            </p>
          </Container>
        </section>

        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="flex flex-col gap-8">
              {stories.map((c, i) => (
                <article
                  key={c.client}
                  className="rounded-[28px] border border-border bg-white p-8 lg:p-14 hover:shadow-elegant transition-shadow"
                >
                  <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                        <span className="font-display italic text-2xl text-gradient-brand">
                          0{i + 1}
                        </span>
                        <span>{c.industry}</span>
                      </div>
                      <h3 className="mt-5 text-3xl lg:text-[44px] font-semibold leading-[1.05] tracking-tight text-balance">
                        {c.headline}
                      </h3>
                      <dl className="mt-9 grid sm:grid-cols-3 gap-6">
                        <div>
                          <dt className="text-[11px] uppercase tracking-wider text-ink-soft">
                            Challenge
                          </dt>
                          <dd className="mt-2 text-[14px] text-ink leading-relaxed">
                            {c.challenge}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wider text-ink-soft">
                            Strategy
                          </dt>
                          <dd className="mt-2 text-[14px] text-ink leading-relaxed">
                            {c.strategy}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wider text-ink-soft">
                            Execution
                          </dt>
                          <dd className="mt-2 text-[14px] text-ink leading-relaxed">
                            {c.execution}
                          </dd>
                        </div>
                      </dl>
                      <blockquote className="mt-9 pl-5 border-l-2 border-ink">
                        <Quote className="size-4 text-ink-soft mb-2" />
                        <p className="text-lg font-display italic text-ink leading-snug">
                          "{c.quote}"
                        </p>
                        <footer className="mt-2 text-sm text-ink-soft">— {c.author}</footer>
                      </blockquote>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="rounded-3xl bg-ink text-white p-8 lg:p-10 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50">
                            <Award className="size-4" /> Outcomes
                          </div>
                          <div className="mt-6 space-y-5">
                            {c.kpis.map((k) => (
                              <div
                                key={k.l}
                                className="flex items-baseline justify-between border-b border-white/10 pb-4"
                              >
                                <div className="text-4xl font-semibold text-gradient-brand tracking-tight">
                                  {k.v}
                                </div>
                                <div className="text-sm text-white/70">{k.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-8 flex gap-0.5">
                          {[...Array(5)].map((_, n) => (
                            <Star key={n} className="size-3.5 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:gap-3 transition-all cursor-pointer"
              >
                Become the next case study <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
