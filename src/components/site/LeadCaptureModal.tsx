/**
 * LeadCaptureModal — Centered Vertical Stack Glassmorphic Modal
 * Top Section: Brand Poster Image Banner (/Lead popup image 2.png) with glass badges & social links
 * Bottom Section: Form (Name 100%, Email 50% | Phone 50%, Service 50% | Budget 50%, CTA Button)
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

// ─── Schema ───────────────────────────────────────────────────────────────────

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().min(7, "Valid phone/WhatsApp number required"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
});

type LeadFormData = z.infer<typeof leadSchema>;

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

// ─── Config ───────────────────────────────────────────────────────────────────

const CAL_EMBED_URL =
  import.meta.env.VITE_CAL_EMBED_URL ||
  "https://cal.com/zynovax/book-strategy-call";

// ─── Social Links ─────────────────────────────────────────────────────────────

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

// ─── Animation Variants ───────────────────────────────────────────────────────

const modalVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function LeadCaptureModal() {
  const { isOpen, handleOpenChange, dismiss } = useLeadModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState(1);
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
          source: "lead-modal-centered",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn("[LeadCaptureModal] Lead submission warning:", err);
    } finally {
      setIsSubmitting(false);
      setDirection(1);
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
          /* ── Centered Modal Popup on all screens ── */
          "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "w-[92vw] max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20",
          "bg-slate-950/90 backdrop-blur-3xl shadow-[0_0_100px_rgba(168,85,247,0.3),0_25px_80px_rgba(0,0,0,0.9)]",
          "p-0 border-0 text-white font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        {/* Top Edge Specular Highlight Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent z-30" />

        {/* Ambient Glow Flares */}
        <div className="pointer-events-none absolute -top-32 -left-32 size-72 rounded-full bg-purple-500/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-pink-500/20 blur-[100px] z-0" />

        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 flex flex-col w-full h-full overflow-hidden"
        >
          {/* ══════════════════════════════════════════════════════════════════
              TOP SECTION: Featured Brand Image Banner (/Lead popup image 2.png)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full h-44 sm:h-52 rounded-t-3xl overflow-hidden shrink-0">
            {/* Poster Image */}
            <img
              src="/Lead popup image 2.png"
              alt="Zynovax Agency"
              className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.02]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
              }}
            />

            {/* Dark Gradient Overlay for Seamless Transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/50 to-slate-950" />

            {/* Top-Left High-Contrast Glass Badge */}
            <div className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-purple-500/30 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <Sparkles className="size-3 text-purple-400 animate-pulse shrink-0" />
              <span className="text-[10px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 uppercase">
                Zynovax Agency
              </span>
            </div>

            {/* Bottom-Left Guarantee Badge */}
            <div className="absolute bottom-3 left-3.5 z-20 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-zinc-300">
              <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
              <span>Verified Brand Partner</span>
            </div>

            {/* Bottom-Right Social Media Glass Icons */}
            <div className="absolute bottom-3 right-3.5 z-20 flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Zynovax on ${social.name}`}
                    className="p-1.5 sm:p-2 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md shadow-md transition-all active:scale-95"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              BOTTOM SECTION: Form & Step Content (Down below image)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full p-5 sm:p-6 bg-white/[0.03] backdrop-blur-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      step === 1
                        ? "w-7 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_8px_rgba(192,38,211,0.5)]"
                        : "w-2 bg-white/20",
                    )}
                  />
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      step === 2
                        ? "w-7 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_8px_rgba(192,38,211,0.5)]"
                        : "w-2 bg-white/20",
                    )}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-purple-300 uppercase">
                  Step 0{step} / 02
                </span>
              </div>

              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 font-[family-name:var(--font-display)]">
                {step === 1 ? (
                  <>Accelerate Your Brand Growth 🚀</>
                ) : (
                  <>Claim Your 1-on-1 Strategy Call</>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-300 mt-1 leading-relaxed">
                {step === 1
                  ? "Tell us about your project to unlock a custom growth roadmap."
                  : "Pick a time that works best for your team."}
              </DialogDescription>
            </div>

            {/* Step Content */}
            <div className="my-3 flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 ? (
                  /* ─── STEP 1: Form ─── */
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      {/* 2-Column Grid Layout */}
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        {/* Row 1: Full Name (col-span-2 / 100%) */}
                        <div className="col-span-2 space-y-1">
                          <Label
                            htmlFor="modal-fullName"
                            className="text-[10px] sm:text-[11px] font-medium text-zinc-200 tracking-wide block leading-none"
                          >
                            Full Name
                          </Label>
                          <div className="relative flex items-center">
                            <User className="absolute left-2.5 sm:left-3.5 size-3.5 sm:size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-fullName"
                              placeholder="e.g. Sarah Jenkins"
                              {...form.register("fullName")}
                              className={cn(
                                "pl-8 sm:pl-10 pr-2.5 sm:pr-4 h-10 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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
                            className="text-[10px] sm:text-[11px] font-medium text-zinc-200 tracking-wide block leading-none truncate"
                          >
                            Business Email
                          </Label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-2.5 sm:left-3.5 size-3.5 sm:size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-email"
                              type="email"
                              placeholder="sarah@company.com"
                              {...form.register("email")}
                              className={cn(
                                "pl-8 sm:pl-10 pr-2.5 sm:pr-4 h-10 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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
                            className="text-[10px] sm:text-[11px] font-medium text-zinc-200 tracking-wide block leading-none truncate"
                          >
                            WhatsApp / Phone
                          </Label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-2.5 sm:left-3.5 size-3.5 sm:size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              {...form.register("phone")}
                              className={cn(
                                "pl-8 sm:pl-10 pr-2.5 sm:pr-4 h-10 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400",
                                "focus:border-purple-400 focus:bg-white/[0.09] focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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
                            className="text-[10px] sm:text-[11px] font-medium text-zinc-200 tracking-wide block leading-none truncate"
                          >
                            Service Required
                          </Label>
                          <div className="relative flex items-center">
                            <Sparkles className="absolute left-2.5 sm:left-3.5 size-3.5 sm:size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-service"
                              {...form.register("service")}
                              className={cn(
                                "w-full pl-8 sm:pl-10 pr-6 sm:pr-8 h-10 md:h-9.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer truncate",
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
                            <ChevronDown className="absolute right-2 sm:right-3 size-3.5 sm:size-4 text-zinc-400 pointer-events-none" />
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
                            className="text-[10px] sm:text-[11px] font-medium text-zinc-200 tracking-wide block leading-none truncate"
                          >
                            Monthly Budget Range
                          </Label>
                          <div className="relative flex items-center">
                            <DollarSign className="absolute left-2.5 sm:left-3.5 size-3.5 sm:size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-budget"
                              {...form.register("budget")}
                              className={cn(
                                "w-full pl-8 sm:pl-10 pr-6 sm:pr-8 h-10 md:h-9.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer truncate",
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
                            <ChevronDown className="absolute right-2 sm:right-3 size-3.5 sm:size-4 text-zinc-400 pointer-events-none" />
                          </div>
                          {errors.budget && (
                            <p className="text-[10px] text-rose-300 font-medium">
                              {errors.budget.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 4: Submit Liquid Glass CTA Button (col-span-2 / 100%) */}
                      <div className="pt-1.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-11 md:h-10.5 rounded-xl font-semibold text-xs sm:text-sm text-white cursor-pointer",
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
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  /* ─── STEP 2: Calendar Embed View ─── */
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 rounded-xl bg-purple-500/15 border border-purple-400/40 p-3 text-purple-200 text-xs backdrop-blur-md shadow-lg">
                      <Sparkles className="size-4 text-purple-300 shrink-0" />
                      <p>
                        Your request was submitted! Pick a time for your 1-on-1 strategy call below.
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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
