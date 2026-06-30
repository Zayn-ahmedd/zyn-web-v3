import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel, GhostButton } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { getService, services, type Service } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service: { slug: service.slug } }; // Only serialize the slug to avoid function serialization issues
  },
  head: ({ loaderData }) => {
    if (!loaderData) return [];
    const service = getService(loaderData.service.slug);
    if (!service) return [];
    return [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
    ];
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-ink">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-ink-soft hover:text-ink">
          ← View all services
        </Link>
      </div>
    </div>
  ),
});

function ServicePage() {
  const { service: loaderService } = Route.useLoaderData() as { service: { slug: string } };
  const s = services.find((x) => x.slug === loaderService.slug)!;
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const Icon = s.icon;

  return (
    <div className="bg-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 h-[520px] bg-gradient-brand-soft opacity-70 blur-3xl" />
        <Container className="pt-20 pb-20 lg:pt-28 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 animate-rise">
              <Eyebrow>Service · {s.name}</Eyebrow>
              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
                {s.headline.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  {s.headline.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-ink-soft leading-[1.55]">{s.subheadline}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {/* Premium liquid metal CTA — label driven by service data */}
                <LiquidMetalButton
                  label={s.cta}
                  width={Math.max(140, s.cta.length * 9.2 + 32)}
                  onClick={() => {
                    window.location.href = "/contact";
                  }}
                />
                <GhostButton to="/success-stories">See client outcomes</GhostButton>
              </div>
            </div>
            <div className="lg:col-span-5 animate-rise w-full" style={{ animationDelay: "120ms" }}>
              <Card className="w-full bg-black/[0.96] border-neutral-900 relative overflow-hidden flex flex-col sm:flex-row lg:flex-col justify-between rounded-[28px] shadow-elegant">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

                {/* Outcomes Section */}
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center w-full">
                  <div className="size-14 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-glow">
                    <Icon className="size-6" />
                  </div>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                    Typical outcomes
                  </div>
                  <div className="mt-4 divide-y divide-neutral-800 w-full">
                    {s.outcomes.map((o) => (
                      <div key={o.l} className="py-4 flex items-baseline justify-between gap-4">
                        <div className="text-3xl font-semibold text-gradient-brand tracking-tight">
                          {o.v}
                        </div>
                        <div className="text-sm text-neutral-400 text-right">{o.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Spline 3D Scene */}
                <div className="flex-1 relative min-h-[300px] sm:min-h-[350px] lg:min-h-[250px] w-full">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Scopes of Work (Capabilities) */}
      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14">
            <SectionLabel no="01" label="Scopes of Work" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.04] text-ink tracking-tight text-balance">
              Capabilities, engineered{" "}
              <span className="font-display italic font-normal text-ink-soft">
                into one system.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border bg-white">
            {s.capabilities.map((c) => (
              <div
                key={c.t}
                className="p-8 lg:p-10 border-r border-b border-border hover:bg-surface/60 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  {s.name}
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-ink leading-tight">{c.t}</h3>
                <p className="mt-3 text-[15px] text-ink-soft leading-relaxed max-w-md">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strategy (Process) */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14">
            <SectionLabel no="02" label="Strategy & Engagement" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.04] text-ink tracking-tight text-balance">
              A repeatable{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                four-stage
              </span>{" "}
              strategic playbook.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {s.process.map((p) => (
              <div key={p.n} className="rounded-2xl border border-border p-7 bg-surface">
                <div className="font-display italic text-3xl text-gradient-brand">{p.n}</div>
                <div className="mt-4 text-lg font-semibold text-ink">{p.t}</div>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="bg-surface py-24 lg:py-32 border-t border-b border-border">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionLabel no="03" label="Key Deliverables" />
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.04] text-ink tracking-tight text-balance">
                Tangible assets,{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  shipped to perform.
                </span>
              </h2>
              <p className="mt-6 text-base text-ink-soft leading-relaxed">
                We deliver structured, production-grade assets and systems that enable your teams
                and compound in value over time. No vague checklists — only concrete, actionable
                files and configurations.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {s.deliverables.map((d, index) => (
                  <div
                    key={d}
                    className="rounded-2xl border border-border p-6 bg-white shadow-elegant flex items-start gap-4 hover:border-ink/20 transition-colors duration-300"
                  >
                    <span className="font-display italic text-2xl text-gradient-brand leading-none">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink leading-snug">{d}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel no="04" label="Who it's for" />
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-[48px] font-semibold leading-[1.05] text-ink tracking-tight text-balance">
                Built for teams ready to{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  compound.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border border-y border-border">
                {s.whoFor.map((w) => (
                  <li key={w} className="py-5 flex gap-4 items-start">
                    <Check className="size-5 mt-0.5 text-ink shrink-0" />
                    <span className="text-[17px] text-ink leading-snug">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="bg-ink text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
        <Container>
          <div className="max-w-4xl relative">
            <Quote className="size-10 text-white/40 mb-8" />
            <p className="text-3xl lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-balance">
              "Zynovax didn't deliver a service — they engineered the{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                {s.name.toLowerCase()}
              </span>{" "}
              system our growth was missing."
            </p>
            <div className="mt-8 text-sm">
              <div className="font-medium">Priya Mehta</div>
              <div className="text-white/60">CMO, Growth-stage SaaS</div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel no="05" label="Questions, answered" />
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-[44px] font-semibold leading-[1.05] text-ink tracking-tight">
                Common questions about {s.name.toLowerCase()}.
              </h2>
            </div>
            <div className="lg:col-span-8 divide-y divide-border border-y border-border">
              {s.faqs.map((f) => (
                <div key={f.q} className="py-7">
                  <div className="text-lg font-medium text-ink">{f.q}</div>
                  <p className="mt-3 text-[15px] text-ink-soft leading-relaxed max-w-2xl">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel no="06" label="Related capabilities" />
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-[48px] font-semibold text-ink tracking-tight">
                Explore the full system.
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:gap-2.5 transition-all"
            >
              View all <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => {
              const RI = r.icon;
              return (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-3xl bg-white border border-border p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="size-11 rounded-lg bg-gradient-brand-soft flex items-center justify-center">
                    <RI className="size-5 text-ink" />
                  </div>
                  <div className="mt-6 text-lg font-semibold text-ink">{r.name}</div>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{r.tagline}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    Explore{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <FinalCTA cta={s.cta} />
      <SiteFooter />
    </div>
  );
}

function FinalCTA({ cta }: { cta: string }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-white p-10 lg:p-20">
          <div className="absolute -top-32 -right-32 size-[600px] rounded-full bg-gradient-brand opacity-40 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.0] tracking-tight text-balance">
              Ready to engineer{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                measurable growth?
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              30-minute strategy call. We'll audit your current system, identify your
              highest-leverage move, and outline what an engagement could look like.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:-translate-y-0.5 hover:shadow-glow transition-all"
              >
                {cta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
