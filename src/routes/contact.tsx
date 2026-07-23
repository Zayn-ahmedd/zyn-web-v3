import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";
import {
  Palette,
  Code2,
  Share2,
  Target,
  Megaphone,
  ArrowRight,
  Loader2,
  Sparkles,
  Check,
  User,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  MessageCircle,
  MapPin,
  CheckCircle2,
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

// ─── Services Data ────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "visual-identity", label: "Visual Identity", icon: Palette },
  { id: "web-design", label: "Web Design & Development", icon: Code2 },
  { id: "social-media", label: "Social Media Management", icon: Share2 },
  { id: "meta-ads", label: "Meta Ads", icon: Target },
  { id: "google-ads", label: "Google Ads", icon: Megaphone },
] as const;

// ─── Budget Options ───────────────────────────────────────────────────────────

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "< $1k" },
  { value: "1k-3k", label: "$1k – $3k" },
  { value: "3k-5k", label: "$3k – $5k" },
  { value: "5k-plus", label: "$5k+" },
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
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
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

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId],
    );
  }, []);

  const launchCalModal = async (nameVal: string, emailVal: string, phoneVal: string, servicesVal: string[], budgetVal: string) => {
    const notesStr = `WhatsApp: ${phoneVal} | Services: ${servicesVal.join(", ")} | Budget: ${budgetVal}`;

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
    if (selectedServices.length === 0) {
      setErrorMsg("Please select at least one service required.");
      return;
    }
    if (!selectedBudget) {
      setErrorMsg("Please select a monthly budget range.");
      return;
    }

    setIsSubmitting(true);

    // Track Analytics Event
    trackContactFormSubmit("contact_strategy_call");
    trackBookStrategyCall("contact_page");

    // 1. Send Lead Data to Server Action / Resend Email API
    try {
      await submitLead({
        data: {
          fullName,
          email,
          phone,
          services: selectedServices,
          budget: selectedBudget,
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
    await launchCalModal(fullName, email, phone, selectedServices, selectedBudget);
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

            {/* ── Right Column: Synchronized Dark Glass Lead Capture Form ── */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] border border-white/20 bg-slate-950/90 backdrop-blur-3xl shadow-[0_0_80px_rgba(168,85,247,0.2),0_30px_90px_rgba(0,0,0,0.8)] p-6 sm:p-8 lg:p-10 text-white overflow-hidden">
                {/* ── Top Edge Specular Reflection Line ── */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />

                {/* ── Ambient Floating Mesh Light Flares ── */}
                <div className="pointer-events-none absolute -top-32 -left-32 size-72 rounded-full bg-purple-500/20 blur-[100px] z-0" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-pink-500/20 blur-[100px] z-0" />

                <div className="relative z-10">
                  <SectionLabel no="·" label="Book strategy call" />

                  {/* Header Titles matching Modal Popup */}
                  <div className="mt-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 font-[family-name:var(--font-display)]">
                      Accelerate Your Brand Growth 🚀
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      Tell us about your project to unlock a custom growth roadmap.
                    </p>
                  </div>

                  {submitted ? (
                    /* ── Success State ── */
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
                          onClick={() => launchCalModal(fullName, email, phone, selectedServices, selectedBudget)}
                          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-7 py-3.5 text-sm font-semibold shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer"
                        >
                          <Sparkles className="size-4 text-purple-200 animate-pulse" />
                          <span>Launch Cal.com Calendar</span>
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Synchronized Lead Capture Form ── */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name, Email, Phone Inputs */}
                      <div className="space-y-3">
                        {/* Full Name */}
                        <div className="space-y-1">
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

                        {/* Email & Phone Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Business Email */}
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

                          {/* WhatsApp / Phone */}
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
                        </div>
                      </div>

                      {/* Service Required (Multi-select pill chips) */}
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[11px] font-medium text-zinc-200 tracking-wide flex items-center justify-between">
                          <span>Service Required</span>
                          <span className="text-[10px] text-purple-300 font-normal">
                            (select all that apply)
                          </span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SERVICES.map((service) => {
                            const isSelected = selectedServices.includes(service.id);
                            const Icon = service.icon;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 backdrop-blur-md border",
                                  "hover:-translate-y-0.5 active:translate-y-0",
                                  isSelected
                                    ? "bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-1 ring-purple-300/50 font-semibold"
                                    : "bg-white/[0.06] border-white/15 text-zinc-200 hover:bg-white/15 hover:border-white/30 hover:text-white",
                                )}
                              >
                                {isSelected ? (
                                  <span className="size-1.5 rounded-full bg-purple-300 animate-pulse shrink-0" />
                                ) : (
                                  <Icon className="size-3.5 text-zinc-300 shrink-0" />
                                )}
                                <span>{service.label}</span>
                                {isSelected && (
                                  <Check className="size-3 text-purple-300 ml-0.5 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Monthly Budget Selector (Single-select pill chips) */}
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[11px] font-medium text-zinc-200 tracking-wide flex items-center justify-between">
                          <span>Monthly Budget Range</span>
                          <DollarSign className="size-3 text-purple-300/70" />
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {BUDGET_OPTIONS.map((opt) => {
                            const isSelected = selectedBudget === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setSelectedBudget(opt.value)}
                                className={cn(
                                  "py-2 px-2 rounded-xl text-center text-xs font-medium cursor-pointer transition-all duration-200 border backdrop-blur-md",
                                  "hover:-translate-y-0.5 active:translate-y-0",
                                  isSelected
                                    ? "bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-indigo-500/40 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-1 ring-purple-300/50 font-semibold"
                                    : "bg-white/[0.06] border-white/15 text-zinc-200 hover:bg-white/15 hover:text-white",
                                )}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Error Message */}
                      {errorMsg && (
                        <p className="text-xs text-rose-400 font-medium pt-1">
                          {errorMsg}
                        </p>
                      )}

                      {/* Submit CTA Button */}
                      <div className="pt-3">
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
