/**
 * LeadCaptureModal — Ultra-Premium Glassmorphic Lead Capture Modal
 * Features:
 * - 2-Column Split Glass Canvas (Desktop) / Centered Vertical Stack (Mobile)
 * - Frosted Glass White Poster Showcase featuring the Quote & Graphic (/Lead popup image 2.png)
 * - Floating Interactive Ambient Mesh Flares & Specular Reflections
 * - Framer Motion Micro-Animations on inputs, badges, and liquid metal CTA button
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  User,
  Mail,
  Phone,
  DollarSign,
  ShieldCheck,
  ChevronDown,
  Star,
  CheckCircle2,
  Lock,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/hooks/useLeadModal";
import { submitLead } from "@/lib/api/lead.functions";
import { SITE_CONFIG } from "@/lib/seo/seo-config";
import { getCalApi } from "@calcom/embed-react";

// ─── Form Schema ──────────────────────────────────────────────────────────────

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().min(7, "Valid phone/WhatsApp number required"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
});

type LeadFormData = z.infer<typeof leadSchema>;

// ─── Options Data ─────────────────────────────────────────────────────────────

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

// ─── Config ───────────────────────────────────────────────────────────────────

const CAL_EMBED_URL =
  import.meta.env.VITE_CAL_EMBED_URL ||
  "https://cal.com/zynovax/book-strategy-call";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: Instagram,
    href: SITE_CONFIG.social.instagram || "https://instagram.com/zynovax",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: SITE_CONFIG.social.facebook || "https://facebook.com/zynovax",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: SITE_CONFIG.social.linkedin || "https://linkedin.com/company/zynovax",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@zynovax",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function LeadCaptureModal() {
  const { isOpen, handleOpenChange, dismiss } = useLeadModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
    },
  });

  const errors = form.formState.errors;

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    // 1. Send Lead Data via Resend API
    try {
      await submitLead({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          services: [data.service],
          budget: data.budget,
          source: "lead-modal-elite",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn("[LeadCaptureModal] Lead submission warning:", err);
    } finally {
      setIsSubmitting(false);
      setStep(2);
    }

    // 2. Launch pre-filled Cal.com modal widget or open prefilled URL
    try {
      const cal = await getCalApi({ namespace: "book-strategy-call" });
      cal("modal", {
        calLink: "zynovax/book-strategy-call",
        config: {
          name: data.fullName,
          email: data.email,
          notes: `WhatsApp: ${data.phone} | Services: ${data.service} | Budget: ${data.budget}`,
        },
      });
    } catch (err) {
      console.warn("[LeadCaptureModal] Opening prefilled Cal.com URL:", err);
      const calUrl = new URL("https://cal.com/zynovax/book-strategy-call");
      calUrl.searchParams.append("name", data.fullName);
      calUrl.searchParams.append("email", data.email);
      const notes = `WhatsApp: ${data.phone} | Services: ${data.service} | Budget: ${data.budget}`;
      calUrl.searchParams.append("notes", notes);
      window.open(calUrl.toString(), "_blank");
    }
  };

  const handleSkip = () => {
    dismiss();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "w-[94vw] max-w-4xl max-h-[92vh] overflow-y-auto md:overflow-hidden rounded-[32px] border border-white/20",
          "bg-slate-950/85 backdrop-blur-3xl shadow-[0_0_120px_rgba(168,85,247,0.35),0_30px_100px_rgba(0,0,0,0.95)]",
          "p-0 border-0 text-white font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        {/* ── Top Edge Specular Reflection ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-300 to-transparent z-30" />

        {/* ── Floating Animated Mesh Ambient Light Flares ── */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-purple-500/25 blur-[120px] z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-pink-500/25 blur-[120px] z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] rounded-full bg-indigo-500/20 blur-[130px] z-0"
        />

        <div className="relative z-10 flex flex-col md:flex-row w-full h-full min-h-[560px]">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE: Luxury White Glass Poster Showcase (~44% Width Desktop)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full md:w-[44%] flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-white/95 via-slate-100 to-white text-slate-900 border-b md:border-b-0 md:border-r border-white/20 overflow-hidden shadow-2xl">
            {/* Top Brand Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white border border-purple-500/30 shadow-lg backdrop-blur-md">
                <span className="size-2 rounded-full bg-purple-400 animate-ping" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-300">
                  Zynovax Studio
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-full border border-slate-300/80">
                <Star className="size-3 text-amber-500 fill-amber-500" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            {/* Middle Poster Graphic Image Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 my-4 flex items-center justify-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white group">
                <img
                  src="/Lead popup image 2.png"
                  alt="Those who trust us are family to us - Zynovax"
                  className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
                  }}
                />
              </div>
            </motion.div>

            {/* Bottom Guarantee & Social Icons */}
            <div className="relative z-10 space-y-3 pt-1">
              <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-slate-600 border-t border-slate-200/80 pt-3">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-purple-600 shrink-0" />
                  <span>Verified Growth Partner</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Lock className="size-3" />
                  <span>100% Confidential</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 justify-center pt-1">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      aria-label={`Zynovax on ${social.name}`}
                      className="p-2 rounded-full bg-slate-900 text-white hover:bg-purple-600 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                    >
                      <Icon className="size-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT SIDE: Interactive Dark Glass Form (~56% Width Desktop)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-[56%] flex flex-col justify-between p-6 sm:p-8 bg-slate-950/60 backdrop-blur-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      step === 1
                        ? "w-8 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_rgba(192,38,211,0.6)]"
                        : "w-2 bg-white/20",
                    )}
                  />
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      step === 2
                        ? "w-8 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_rgba(192,38,211,0.6)]"
                        : "w-2 bg-white/20",
                    )}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-purple-300 uppercase">
                  Step 0{step} / 02
                </span>
              </div>

              <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-200 font-[family-name:var(--font-display)]">
                {step === 1 ? (
                  <>Accelerate Your Brand Growth 🚀</>
                ) : (
                  <>Claim Your 1-on-1 Strategy Call</>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                {step === 1
                  ? "Tell us about your project to unlock a custom growth roadmap."
                  : "Pick a time that works best for your team below."}
              </DialogDescription>
            </div>

            {/* Interactive Step Content */}
            <div className="my-4 flex-1">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* ─── STEP 1: 2-Column Mobile-Optimized Form ─── */
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3.5"
                    >
                      {/* 2-Column Grid Layout */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Row 1: Full Name (col-span-2 / 100%) */}
                        <div className="col-span-2 space-y-1">
                          <Label
                            htmlFor="modal-fullName"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                          >
                            Full Name
                          </Label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-fullName"
                              placeholder="e.g. Sarah Jenkins"
                              {...form.register("fullName")}
                              className={cn(
                                "pl-10 pr-4 h-11 md:h-10 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.1] focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
                                errors.fullName && "border-rose-400/80 focus:ring-rose-400/30",
                              )}
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        {/* Row 2: Business Email (col-span-1 / 50%) */}
                        <div className="col-span-1 space-y-1">
                          <Label
                            htmlFor="modal-email"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide block truncate"
                          >
                            Business Email
                          </Label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-email"
                              type="email"
                              placeholder="sarah@company.com"
                              {...form.register("email")}
                              className={cn(
                                "pl-10 pr-4 h-11 md:h-10 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.1] focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
                                errors.email && "border-rose-400/80 focus:ring-rose-400/30",
                              )}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Row 2: WhatsApp / Phone (col-span-1 / 50%) */}
                        <div className="col-span-1 space-y-1">
                          <Label
                            htmlFor="modal-phone"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide block truncate"
                          >
                            WhatsApp / Phone
                          </Label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              {...form.register("phone")}
                              className={cn(
                                "pl-10 pr-4 h-11 md:h-10 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.1] focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
                                errors.phone && "border-rose-400/80 focus:ring-rose-400/30",
                              )}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* Row 3: Service Required Dropdown (col-span-1 / 50%) */}
                        <div className="col-span-1 space-y-1">
                          <Label
                            htmlFor="modal-service"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide block truncate"
                          >
                            Service Required
                          </Label>
                          <div className="relative flex items-center">
                            <Sparkles className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-service"
                              {...form.register("service")}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 md:h-10 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer truncate",
                                errors.service && "border-rose-400/80",
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
                          {errors.service && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.service.message}
                            </p>
                          )}
                        </div>

                        {/* Row 3: Monthly Budget Dropdown (col-span-1 / 50%) */}
                        <div className="col-span-1 space-y-1">
                          <Label
                            htmlFor="modal-budget"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide block truncate"
                          >
                            Monthly Budget Range
                          </Label>
                          <div className="relative flex items-center">
                            <DollarSign className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-budget"
                              {...form.register("budget")}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 md:h-10 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer truncate",
                                errors.budget && "border-rose-400/80",
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
                          {errors.budget && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.budget.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 4: Radiant Liquid Gradient CTA Button (col-span-2 / 100%) */}
                      <div className="pt-2">
                        <motion.button
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-12 rounded-xl font-bold text-xs sm:text-sm text-white cursor-pointer",
                            "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                            "border border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)]",
                            "transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden",
                          )}
                        >
                          {/* Liquid Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Processing Request…
                              </>
                            ) : (
                              <>
                                Continue to Book Strategy Call
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                              </>
                            )}
                          </span>
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  /* ─── STEP 2: Calendar Embed View ─── */
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 rounded-xl bg-purple-500/20 border border-purple-400/40 p-3 text-purple-200 text-xs backdrop-blur-md shadow-lg">
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                      <p>
                        Your details were recorded! Pick a time for your 1-on-1 strategy call below.
                      </p>
                    </div>

                    <div className="w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-950/40 backdrop-blur-xl">
                      <iframe
                        src={CAL_EMBED_URL}
                        title="Book a strategy call"
                        className="w-full border-0"
                        style={{ height: "370px", minHeight: "330px" }}
                        loading="lazy"
                        allow="payment"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Dismiss Button */}
            <div className="pt-2 text-center border-t border-white/15">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {step === 1 ? "I'll explore the site first" : "I'll book later, show me the site"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
