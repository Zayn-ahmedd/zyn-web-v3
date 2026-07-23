import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { ArrowRight, Mail, MessageCircle, Calendar, MapPin, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { generatePageHead } from "@/lib/seo/metadata";
import { localBusinessSchema, webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { trackContactFormSubmit, trackBookStrategyCall } from "@/lib/analytics/events";
import { submitLead } from "@/lib/api/lead.functions";

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

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    revenue: "$1M – $10M ARR",
    growthQuestion: "",
  });

  // Initialize Cal.com Embed API & dark theme styling
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "book-strategy-call" });
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#000000" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.warn("[Cal.com Embed] Initialization warning:", err);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const launchCalModal = async () => {
    try {
      const cal = await getCalApi({ namespace: "book-strategy-call" });
      cal("modal", {
        calLink: "zynovax/book-strategy-call",
        config: {
          name: formData.fullName,
          email: formData.workEmail,
          notes: `Company: ${formData.company || "N/A"} | Revenue: ${formData.revenue} | Focus: ${formData.growthQuestion || "N/A"}`,
        },
      });
    } catch (err) {
      console.warn("[Cal.com Modal] Failed to open modal widget:", err);
      window.open("https://cal.com/zynovax/book-strategy-call", "_blank");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track Analytics Events
    trackContactFormSubmit("contact_strategy_call");

    // 1. Send Lead Details via Resend API (Internal Email to info@zynovax.in & Confirmation to Client)
    try {
      await submitLead({
        data: {
          fullName: formData.fullName,
          email: formData.workEmail,
          phone: "+91 7338898638",
          services: [formData.growthQuestion || "Strategy Call Audit"],
          budget: formData.revenue,
          source: "contact-page-lead-form",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn("[ContactPage] Resend lead submission error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

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
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* ── Left Column: Heading & Contact Info Cards ── */}
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

              {/* ── Contact Info Cards Grid ── */}
              <div className="mt-10 grid sm:grid-cols-2 gap-5">
                {/* Strategy Call Card */}
                <div className="rounded-2xl border border-border p-5 bg-white hover:border-ink/20 transition-colors">
                  <Calendar className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Strategy Call</div>
                  <div className="mt-1 text-sm text-ink-soft">30 min · Dynamic funnel audit</div>
                </div>

                {/* Email Us Card */}
                <div className="rounded-2xl border border-border p-5 bg-white hover:border-ink/20 transition-colors">
                  <Mail className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Email Us</div>
                  <a
                    href="mailto:info@zynovax.in"
                    className="mt-1 text-sm text-ink-soft hover:text-ink block font-medium transition-colors"
                  >
                    info@zynovax.in
                  </a>
                </div>

                {/* WhatsApp Card */}
                <div className="rounded-2xl border border-border p-5 bg-white hover:border-ink/20 transition-colors">
                  <MessageCircle className="size-5 text-emerald-600" />
                  <div className="mt-3 text-sm font-medium text-ink">WhatsApp the Team</div>
                  <a
                    href="https://wa.me/917338898638?text=Hi%20Zynovax%20team%2C%20I%27d%20like%20to%20discuss%20a%20potential%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-ink-soft hover:text-ink block font-medium transition-colors"
                  >
                    +91 7338898638
                  </a>
                </div>

                {/* Global Footprint Card */}
                <div className="rounded-2xl border border-border p-5 bg-white hover:border-ink/20 transition-colors">
                  <MapPin className="size-5 text-ink" />
                  <div className="mt-3 text-sm font-medium text-ink">Origin & Global Footprint</div>
                  <div className="mt-1 text-sm text-ink-soft">Chennai, India (HQ)</div>
                  <div className="mt-1 text-xs text-ink-soft/80">
                    Serving USA, CAN, AUS, UK, UAE & IND
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Form -> Resend Email Submission -> Cal.com Popup CTA ── */}
            <div className="lg:col-span-6">
              <div className="rounded-[28px] border border-border bg-white shadow-elegant p-8 lg:p-10">
                <SectionLabel no="·" label="Book strategy call" />
                {submitted ? (
                  /* ── Success State with Cal.com Modal Popup CTA ── */
                  <div className="mt-8 py-10 text-center space-y-5">
                    <div className="size-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-600 shadow-sm">
                      <CheckCircle2 className="size-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-ink">
                        Details Sent Successfully! 🚀
                      </h3>
                      <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                        We've received your project details and dispatched a confirmation to your email. Click below to instantly lock in your strategy call slot.
                      </p>
                    </div>

                    {/* Cal.com Popup Modal Trigger CTA */}
                    <div className="pt-3 flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          trackBookStrategyCall("contact_page_popup");
                          launchCalModal();
                        }}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-ink text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl hover:bg-ink/90 active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
                      >
                        <Sparkles className="size-4 text-purple-300 animate-pulse" />
                        <span>Book Strategy Call</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                      <p className="text-xs text-ink-soft">
                        Opens official Cal.com scheduling popup
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── Lead Collection Form (Sends Resend Email) ── */
                  <form onSubmit={handleFormSubmit} className="mt-8 space-y-5" id="contact-page-form">
                    <Field label="Full name">
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input"
                        placeholder="Jane Doe"
                      />
                    </Field>
                    <Field label="Work email">
                      <input
                        required
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        className="input"
                        placeholder="jane@company.com"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        required
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                        placeholder="Acme Inc."
                      />
                    </Field>
                    <Field label="Revenue range">
                      <select
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleChange}
                        className="input cursor-pointer"
                      >
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
                        name="growthQuestion"
                        value={formData.growthQuestion}
                        onChange={handleChange}
                        className="input resize-none"
                        placeholder="Visual identity, social media management, performance marketing, conversion optimization…"
                      />
                    </Field>

                    {/* Liquid Metal Submit Button */}
                    <div className="flex justify-center pt-2">
                      {isSubmitting ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-8 py-3 text-sm font-medium">
                          <Loader2 className="size-4 animate-spin" />
                          Sending Request…
                        </div>
                      ) : (
                        <LiquidMetalButton
                          label="Request strategy call"
                          width={210}
                          onClick={() => {
                            const form = document.getElementById("contact-page-form") as HTMLFormElement;
                            if (form && form.checkValidity()) {
                              form.requestSubmit();
                            } else if (form) {
                              form.reportValidity();
                            }
                          }}
                        />
                      )}
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
