import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, Calendar, MapPin } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { generatePageHead } from "@/lib/seo/metadata";
import { localBusinessSchema, webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { trackContactFormSubmit, trackBookStrategyCall } from "@/lib/analytics/events";

export const Route = createFileRoute("/contact")({
  head: () =>
    generatePageHead({
      title: "Book a Strategy Call | Zynovax",
      description:
        "Book a 30-minute strategy call with the Zynovax team. We'll audit your funnel, identify your highest-leverage move, and outline what an engagement could look like.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={[
          webPageSchema({
            title: "Book a Strategy Call | Zynovax",
            description:
              "Book a 30-minute strategy call with the Zynovax team. We'll audit your funnel, identify your highest-leverage move, and outline what an engagement could look like.",
            path: "/contact",
          }),
          localBusinessSchema(),
        ]}
      />
      <SiteNav />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 h-[520px] bg-gradient-brand-soft opacity-70 blur-3xl" />
        <Container className="pt-20 pb-24 lg:pt-28 lg:pb-32">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
            className="mb-8"
          />
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <Eyebrow>Start the conversation</Eyebrow>
              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[72px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
                Let's engineer your{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  next chapter
                </span>{" "}
                of growth.
              </h1>
              <p className="mt-7 max-w-xl text-lg text-ink-soft leading-[1.55]">
                Book a 30-minute strategy call. We'll audit your positioning, organic channels, or
                paid acquisition funnels, identify your single highest-leverage move, and outline
                what a Zynovax engagement could look like.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-border p-5 bg-white">
                  <Calendar className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Strategy Call</div>
                  <div className="mt-1 text-sm text-ink-soft">30 min · Dynamic funnel audit</div>
                </div>
                <div className="rounded-2xl border border-border p-5 bg-white">
                  <Mail className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Email Us</div>
                  <a
                    href="mailto:info@zynovax.in"
                    className="mt-1 text-sm text-ink-soft hover:text-ink block"
                  >
                    info@zynovax.in
                  </a>
                </div>
                <div className="rounded-2xl border border-border p-5 bg-white">
                  <MessageCircle className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">WhatsApp the Team</div>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-ink-soft hover:text-ink block"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div className="rounded-2xl border border-border p-5 bg-white">
                  <MapPin className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Origin & Global Footprint</div>
                  <div className="mt-1 text-sm text-ink-soft">Chennai, India (HQ)</div>
                  <div className="mt-1 text-xs text-ink-soft/80">
                    Serving USA, CAN, AUS, UK, UAE & IND
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[28px] border border-border bg-white shadow-elegant p-8 lg:p-10">
                <SectionLabel no="·" label="Book strategy call" />
                {submitted ? (
                  <div className="mt-10 py-16 text-center">
                    <div className="size-14 rounded-full bg-gradient-brand mx-auto flex items-center justify-center text-white">
                      <ArrowRight className="size-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-ink">
                      We'll be in touch within 24 hours.
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft max-w-sm mx-auto">
                      A senior growth strategist will review your goals and reach out to schedule
                      your funnel audit.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                      trackContactFormSubmit("contact_strategy_call");
                      trackBookStrategyCall("contact_page");
                    }}
                    className="mt-8 space-y-5"
                  >
                    <Field label="Full name">
                      <input required className="input" placeholder="Jane Doe" />
                    </Field>
                    <Field label="Work email">
                      <input
                        required
                        type="email"
                        className="input"
                        placeholder="jane@company.com"
                      />
                    </Field>
                    <Field label="Company">
                      <input required className="input" placeholder="Acme Inc." />
                    </Field>
                    <Field label="Revenue range">
                      <select className="input">
                        <option>$1M – $10M ARR</option>
                        <option>$10M – $50M ARR</option>
                        <option>$50M – $200M ARR</option>
                        <option>$200M+ ARR</option>
                      </select>
                    </Field>
                    <Field label="What's the highest-leverage growth question on your mind?">
                      <textarea
                        required
                        rows={4}
                        className="input resize-none"
                        placeholder="Visual identity, social media management, performance marketing, conversion optimization…"
                      />
                    </Field>
                    {/* Full-width premium liquid metal submit */}
                    <div className="flex justify-center">
                      <LiquidMetalButton
                        label="Request strategy call"
                        width={210}
                        onClick={() => {
                          // Button click will validate via HTML5 constraint and trigger form submit
                          // We only set submitted inside the onSubmit form handler to ensure validation runs
                        }}
                      />
                    </div>
                    <p className="text-xs text-ink-soft text-center">
                      No commitment. No sales pitch. Just a real audit.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />

      <style>{`
        .input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input:focus { border-color: var(--ink); background: white; }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
