/**
 * LeadCaptureModal — Compact Dark Glass Lead & Booking Modal
 * Row 1: Full Name (100%)
 * Row 2: Email (50%) | Phone (50%)
 * Row 3: Service Dropdown (50%) | Budget Dropdown (50%)
 * Row 4: Continue to Book Strategy Call CTA
 */

import { useState, useCallback } from "react";
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

const sheetVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
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
          source: "lead-modal-dropdowns",
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
          "fixed left-0 bottom-0 top-auto translate-x-0 translate-y-0",
          "w-full max-h-[92vh] rounded-t-3xl rounded-b-none border-t border-white/20",
          "bg-slate-950/90 backdrop-blur-3xl shadow-[0_-10px_50px_rgba(0,0,0,0.9)]",
          "md:left-[50%] md:top-[50%] md:bottom-auto md:translate-x-[-50%] md:translate-y-[-50%]",
          "md:max-w-4xl md:max-h-[85vh] md:rounded-3xl md:border md:border-white/20",
          "md:bg-slate-950/40 md:shadow-[0_0_140px_rgba(168,85,247,0.25),0_30px_90px_rgba(0,0,0,0.8)]",
          "p-0 border-0 overflow-hidden text-white font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent z-30 hidden md:block" />

        <div className="pointer-events-none absolute -top-32 -left-32 size-80 rounded-full bg-purple-500/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-pink-500/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-96 rounded-full bg-indigo-500/15 blur-[120px] z-0" />

        <motion.div
          variants={sheetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 flex flex-col md:flex-row w-full h-full max-h-[92vh] md:max-h-[85vh] md:min-h-[540px] overflow-y-auto md:overflow-hidden"
        >
          {/* Mobile Top Drag Handle */}
          <div className="w-10 h-1 bg-white/40 rounded-full absolute top-2 inset-x-0 mx-auto z-20 md:hidden" />

          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP LEFT SIDE: Poster Presentation (4:5 Ratio, ~42% Desktop)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative hidden md:flex md:w-[42%] flex-col justify-between p-6 overflow-hidden border-r border-white/15 bg-white/[0.02] backdrop-blur-md">
            <div className="absolute inset-0 z-0">
              <img
                src="/Lead popup image 2.png"
                alt="Partner with Zynovax"
                className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.02]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            </div>

            {/* High-Contrast Dark Glass Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-purple-500/30 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <Sparkles className="size-3 text-purple-400 animate-pulse shrink-0" />
                <span className="text-[11px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 uppercase">
                  Zynovax Agency
                </span>
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md text-[10px] text-zinc-300">
                <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                <span>Verified Brand Partner & Growth Studio</span>
              </div>

              <div className="flex items-center gap-2">
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
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT SIDE / MAIN FORM CONTENT (~58% Desktop)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-[58%] flex flex-col justify-between p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
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

            <div className="my-4 flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 ? (
                  /* ─── STEP 1: Compact Grid Layout Form with Dropdowns ─── */
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3.5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Row 1: Full Name (100% / sm:col-span-2) */}
                        <div className="space-y-1 sm:col-span-2">
                          <Label
                            htmlFor="modal-fullName"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
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
                                "pl-10 h-11 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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

                        {/* Row 2: Business Email (50%) */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-email"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
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
                                "pl-10 h-11 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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

                        {/* Row 2: WhatsApp / Phone (50%) */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-phone"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
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
                                "pl-10 h-11 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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

                        {/* Row 3: Service Required Dropdown (50%) */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-service"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
                          >
                            Service Required
                          </Label>
                          <div className="relative flex items-center">
                            <Sparkles className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-service"
                              {...form.register("service")}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 md:h-9.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-base md:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
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

                        {/* Row 3: Monthly Budget Dropdown (50%) */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-budget"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
                          >
                            Monthly Budget Range
                          </Label>
                          <div className="relative flex items-center">
                            <DollarSign className="absolute left-3.5 size-4 text-purple-300/70 pointer-events-none" />
                            <select
                              id="modal-budget"
                              {...form.register("budget")}
                              className={cn(
                                "w-full pl-10 pr-8 h-11 md:h-9.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white text-base md:text-xs focus:border-purple-400 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(168,85,247,0.35)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
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

                      {/* Row 4: Submit Liquid Glass CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-12 md:h-10.5 rounded-xl font-semibold text-xs sm:text-sm text-white cursor-pointer",
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
