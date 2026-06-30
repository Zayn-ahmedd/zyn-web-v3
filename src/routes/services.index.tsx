import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Visual Identity, Social Media & Paid Acquisition | Zynovax" },
      { name: "description", content: "Three core capabilities engineered into one connected growth system: visual identity, social media management, and performance marketing." },
      { property: "og:title", content: "Services — Visual Identity, Social Media & Paid Acquisition | Zynovax" },
      { property: "og:description", content: "Three core capabilities engineered into one connected growth system." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 h-[520px] bg-gradient-brand-soft opacity-70 blur-3xl" />
        <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
          <Eyebrow>Capabilities</Eyebrow>
          <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
            Three capabilities.{" "}
            <span className="font-display italic font-normal text-gradient-brand">One connected system.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
            We don't sell disconnected services. We engineer integrated outcomes — and every capability below feeds the same premium growth engine.
          </p>
          <div className="mt-9">
            <LiquidMetalButton
              label="Book Strategy Call"
              width={162}
              onClick={() => { window.location.href = "/contact"; }}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white pb-24 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group rounded-3xl border border-border bg-white p-8 lg:p-10 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="size-12 rounded-xl bg-gradient-brand-soft flex items-center justify-center">
                        <Icon className="size-5 text-ink" />
                      </div>
                      <ArrowUpRight className="size-5 text-ink-soft group-hover:text-ink transition-colors" />
                    </div>
                    <div className="mt-7 text-[11px] uppercase tracking-[0.22em] text-ink-soft">{s.tagline}</div>
                    <h3 className="mt-2 text-2xl lg:text-3xl font-semibold text-ink leading-tight">{s.name}</h3>
                    <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">{s.subheadline}</p>
                  </div>
                  <div>
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-border">
                      {s.outcomes.slice(0, 3).map((o) => (
                        <div key={o.l}>
                          <div className="text-2xl font-semibold text-gradient-brand tracking-tight">{o.v}</div>
                          <div className="text-[11px] text-ink-soft mt-0.5">{o.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                      Explore {s.name.toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
