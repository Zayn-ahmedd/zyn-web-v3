import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  CheckCircle2,
  Loader2,
  Sparkles,
  User,
  Phone,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { generatePageHead } from "@/lib/seo/metadata";
import { localBusinessSchema, webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { trackContactFormSubmit, trackBookStrategyCall } from "@/lib/analytics/events";
import { submitLead } from "@/lib/api/lead.functions";
import { cn } from "@/lib/utils";

// ─── Dropdown Options Data ────────────────────────────────────────────────────

const SERVICES_OPTIONS = [
  "Visual Identity",
  "Web Design & Development",
  "Social Media Management",
  "Meta Ads",
  "Google Ads",
] as const;

const BUDGET_OPTIONS = [
  "< $1k",
  "$1k – $3k",
  "$3k – $5k",
  "$5k+",
] as const;

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize Cal.com Embed API on mount
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

  const launchCalModal = async (nameVal: string, emailVal: string, phoneVal: string, serviceVal: string, budgetVal: string) => {
    const notesStr = `WhatsApp: ${phoneVal} | Services: ${serviceVal} | Budget: ${budgetVal}`;

    try {
      const cal = await getCalApi({ namespace: "book-strategy-call" });
      cal("modal", {
        calLink: "zynovax/book-strategy-call",
        config: {
          name: nameVal,
          email: emailVal,
          notes: notesStr,
        },
      });
    } catch (err) {
      console.warn("[Cal.com Modal] Launching fallback URL:", err);
      const calUrl = new URL("https://cal.com/zynovax/book-strategy-call");
      calUrl.searchParams.append("name", nameVal);
      calUrl.searchParams.append("email", emailVal);
      calUrl.searchParams.append("notes", notesStr);
      window.location.href = calUrl.toString();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Form Validation
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all required contact fields.");
      return;
    }
    if (!service) {
      setErrorMsg("Please select a required service.");
      return;
    }
    if (!budget) {
      setErrorMsg("Please select a monthly budget range.");
      return;
    }

    setIsSubmitting(true);

    // Track Analytics Events
    trackContactFormSubmit("contact_strategy_call");
    trackBookStrategyCall("contact_page");

    // 1. Send Lead Data via Resend API
    try {
      await submitLead({
        data: {
          fullName,
          email,
          phone,
          services: [service],
          budget,
          source: "Contact Page Form",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn("[ContactPage] Lead dispatch warning:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }

    // 2. Open Cal.com Modal Widget Pre-filled with User Data
    await launchCalModal(fullName, email, phone, service, budget);
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

            {/* ── Right Column: Synchronized Shared Lead Capture Form ── */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] border border-white/20 bg-slate-950/90 backdrop-blur-3xl shadow-[0_0_80px_rgba(168,85,247,0.2),0_30px_90px_rgba(0,0,0,0.8)] p-6 sm:p-8 lg:p-10 text-white overflow-hidden">
                {/* Top Edge Specular Highlight Line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />

                {/* Ambient Light Flares */}
                <div className="pointer-events-none absolute -top-32 -left-32 size-72 rounded-full bg-purple-500/20 blur-[100px] z-0" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-pink-500/20 blur-[100px] z-0" />

                <div className="relative z-10">
                  <SectionLabel no="·" label="Book strategy call" />

                  <div className="mt-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 font-[family-name:var(--font-display)]">
                      Accelerate Your Brand Growth 🚀
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      Tell us about your project to unlock a custom growth roadmap.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="size-16 rounded-full bg-purple-500/20 border border-purple-400/40 mx-auto flex items-center justify-center text-purple-300 shadow-lg backdrop-blur-md">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Details Saved & Sent! 🚀
                      </h3>
                      <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                        We've dispatched your details to our team. Click below to launch your pre-filled Cal.com strategy call calendar.
                      </p>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => launchCalModal(fullName, email, phone, service, budget)}
                          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-7 py-3.5 text-sm font-semibold shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer"
                        >
                          <Sparkles className="size-4 text-purple-200 animate-pulse" />
                          <span>Launch Cal.com Calendar</span>
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Row 1: Full Name (Full width / sm:col-span-2) */}
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[11px] font-medium text-zinc-200 tracking-wide block">
                            Full Name
                          </label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <input
                              required
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. Sarah Jenkins"
                              className={cn(
                                "w-full pl-10 pr-4 h-11 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-sm placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200",
                              )}
                            />
                          </div>
                        </div>

                        {/* Row 2: Business Email (50%) */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-200 tracking-wide block">
                            Business Email
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="sarah@company.com"
                              className={cn(
                                "w-full pl-10 pr-4 h-11 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-sm placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200",
                              )}
                            />
                          </div>
                        </div>

                        {/* Row 2: WhatsApp / Phone (50%) */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-200 tracking-wide block">
                            WhatsApp / Phone
                          </label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <input
                              required
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+1 (555) 000-0000"
                              className={cn(
                                "w-full pl-10 pr-4 h-11 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-sm placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200",
                              )}
                            />
                          </div>
                        </div>

                        {/* Row 3: Service Required Dropdown (50%) */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-200 tracking-wide block">
                            Service Required
                          </label>
                          <div className="relative flex items-center">
                            <Sparkles className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              required
                              value={service}
                              onChange={(e) => setService(e.target.value)}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-sm focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                              )}
                            >
                              <option value="" disabled className="bg-slate-900 text-zinc-400">
                                Select service
                              </option>
                              {SERVICES_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-slate-900 text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 size-4 text-zinc-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Row 3: Monthly Budget Dropdown (50%) */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-200 tracking-wide block">
                            Monthly Budget Range
                          </label>
                          <div className="relative flex items-center">
                            <DollarSign className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              required
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-sm focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                              )}
                            >
                              <option value="" disabled className="bg-slate-900 text-zinc-400">
                                Select budget
                              </option>
                              {BUDGET_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-slate-900 text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 size-4 text-zinc-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {errorMsg && (
                        <p className="text-xs text-rose-400 font-medium pt-1">
                          {errorMsg}
                        </p>
                      )}

                      {/* Row 4: Continue CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-12 rounded-xl font-semibold text-sm text-white cursor-pointer",
                            "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                            "border border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]",
                            "active:scale-[0.985] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden",
                          )}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Processing Request…
                              </>
                            ) : (
                              <>
                                Continue to Book Strategy Call
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                              </>
                            )}
                          </span>
                        </button>
                      </div>

                      <p className="text-xs text-zinc-400 text-center pt-1">
                        No commitment. No sales pitch. Just a real growth audit.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
