import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  Lock,
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
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openCalNewTab = (nameVal: string, phoneVal: string, emailVal: string, serviceVal: string, budgetVal: string) => {
    const calUrl = new URL("https://cal.com/zynovax/book-strategy-call");
    calUrl.searchParams.append("name", nameVal);
    calUrl.searchParams.append("email", emailVal);
    const notesStr = `WhatsApp: ${phoneVal} | Service: ${serviceVal} | Avg Budget: ${budgetVal}`;
    calUrl.searchParams.append("notes", notesStr);

    window.open(calUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Form Validation
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("Please fill in all required contact fields.");
      return;
    }
    if (!service) {
      setErrorMsg("Please select a required service.");
      return;
    }
    if (!budget) {
      setErrorMsg("Please select an average budget range.");
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
          phone,
          email,
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

    // 2. Open Cal.com URL in a NEW TAB to reduce page load & speed up UI
    openCalNewTab(fullName, phone, email, service, budget);
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

            {/* ── Right Column: Clean Light Theme Form Container ── */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] border border-slate-200/90 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.12)] p-6 sm:p-8 lg:p-10 text-slate-900 overflow-hidden">
                <SectionLabel no="·" label="Book strategy call" />

                <div className="mt-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)]">
                    Accelerate Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
                      Brand Growth
                    </span>{" "}
                    🚀
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                    Tell us about your project to unlock a custom growth roadmap.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="size-16 rounded-full bg-purple-50 border border-purple-200 mx-auto flex items-center justify-center text-purple-600 shadow-sm">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Details Saved & Sent! 🚀
                    </h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
                      We've dispatched your details to our team. Opening your pre-filled Cal.com scheduling page in a new tab...
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => openCalNewTab(fullName, phone, email, service, budget)}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-7 py-3.5 text-sm font-semibold shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer"
                      >
                        <Sparkles className="size-4 text-purple-200 animate-pulse" />
                        <span>Re-open Cal.com in New Tab</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* 1. Name Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        NAME
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                        <input
                          required
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className={cn(
                            "w-full pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 font-medium",
                            "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          )}
                        />
                      </div>
                    </div>

                    {/* 2. Phone Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        PHONE
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className={cn(
                            "w-full pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 font-medium",
                            "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          )}
                        />
                      </div>
                    </div>

                    {/* 3. Email Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        EMAIL
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sarah@company.com"
                          className={cn(
                            "w-full pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 font-medium",
                            "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          )}
                        />
                      </div>
                    </div>

                    {/* 4. Service Required Dropdown */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        SERVICE REQUIRED
                      </label>
                      <div className="relative flex items-center">
                        <Sparkles className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                        <select
                          required
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={cn(
                            "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                          )}
                        >
                          <option value="" disabled className="bg-white text-slate-400">
                            Select service required
                          </option>
                          {SERVICES_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-slate-900">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 size-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* 5. Avg Budget Dropdown */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        AVG BUDGET
                      </label>
                      <div className="relative flex items-center">
                        <DollarSign className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                        <select
                          required
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className={cn(
                            "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                          )}
                        >
                          <option value="" disabled className="bg-white text-slate-400">
                            Select average budget
                          </option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-slate-900">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 size-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-rose-600 font-medium pt-1">
                        {errorMsg}
                      </p>
                    )}

                    {/* 6. Accent Liquid Gradient CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "group relative w-full h-12 rounded-xl font-bold text-xs sm:text-sm text-white cursor-pointer",
                          "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
                          "shadow-[0_8px_30px_rgba(168,85,247,0.35)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden",
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Submitting Request…
                            </>
                          ) : (
                            <>
                              Continue to Book Strategy Call
                              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 text-center pt-1 font-medium">
                      No commitment. No sales pitch. Just a real growth audit.
                    </p>
                  </form>
                )}

                {/* Footer Note */}
                <div className="pt-3 flex items-center justify-center text-xs text-slate-500 border-t border-slate-200 mt-2">
                  <div className="flex items-center gap-1 font-medium">
                    <Lock className="size-3 text-slate-400" />
                    <span>100% Confidential</span>
                  </div>
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
