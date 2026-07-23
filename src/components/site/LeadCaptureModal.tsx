/**
 * LeadCaptureModal — Mobile Visual Header Banner + Desktop 2-Column Split Modal
 * Mobile Conversion Architecture & Luxury SaaS UI/UX Design System
 *
 * Mobile (< md): Native Bottom Sheet with an integrated 4:5 Poster Header Banner,
 * drag handle, trust badge, miniature glass social icons, 48px touch inputs,
 * 2-column touch service chips, 2x2 budget grid & sticky bottom CTA bar.
 * Desktop (>= md): Luxury 2-column translucent glass split layout with poster banner.
 */

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
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
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  User,
  Mail,
  Phone,
  DollarSign,
  ShieldCheck,
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

// ─── Schema ───────────────────────────────────────────────────────────────────

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().min(7, "Valid phone/WhatsApp number required"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budget: z.string().min(1, "Please select a budget range"),
});

type LeadFormData = z.infer<typeof leadSchema>;

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
      services: [],
      budget: "",
    },
  });

  const selectedServices = form.watch("services");
  const selectedBudget = form.watch("budget");
  const errors = form.formState.errors;

  const toggleService = useCallback(
    (serviceId: string) => {
      const current = form.getValues("services");
      const next = current.includes(serviceId)
        ? current.filter((s) => s !== serviceId)
        : [...current, serviceId];
      form.setValue("services", next, { shouldValidate: true });
    },
    [form],
  );

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitLead({
        data: {
          ...data,
          source: "lead-modal-mobile-header",
          submittedAt: new Date().toISOString(),
        },
      });

      if (!result.success) {
        console.warn("[LeadCaptureModal] API result warning:", result);
      }
    } catch (err) {
      console.warn("[LeadCaptureModal] Lead submission error:", err);
    } finally {
      setIsSubmitting(false);
      setDirection(1);
      setStep(2);
    }
  };

  const handleSkip = () => {
    dismiss();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          /* ── Mobile: Bottom Sheet ── */
          "fixed left-0 bottom-0 top-auto translate-x-0 translate-y-0",
          "w-full max-h-[92vh] rounded-t-3xl rounded-b-none border-t border-white/20",
          "bg-slate-950/90 backdrop-blur-3xl shadow-[0_-10px_50px_rgba(0,0,0,0.9)]",
          /* ── Desktop: Centered Split Glass Modal ── */
          "md:left-[50%] md:top-[50%] md:bottom-auto md:translate-x-[-50%] md:translate-y-[-50%]",
          "md:max-w-4xl md:max-h-[85vh] md:rounded-3xl md:border md:border-white/20",
          "md:bg-slate-950/40 md:shadow-[0_0_140px_rgba(168,85,247,0.25),0_30px_90px_rgba(0,0,0,0.8)]",
          "p-0 border-0 overflow-hidden text-white font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        {/* ── Top Edge Specular Reflection Line (Desktop) ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent z-30 hidden md:block" />

        {/* ── Ambient Floating Mesh Light Flares ── */}
        <div className="pointer-events-none absolute -top-32 -left-32 size-80 rounded-full bg-purple-500/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-pink-500/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-96 rounded-full bg-indigo-500/15 blur-[120px] z-0" />

        <motion.div
          variants={sheetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 flex flex-col md:flex-row w-full h-full max-h-[92vh] md:max-h-[85vh] md:min-h-[560px] overflow-y-auto md:overflow-hidden"
        >
          {/* ══════════════════════════════════════════════════════════════════
              MOBILE VISUAL HEADER BANNER (< md screens)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full h-32 md:hidden rounded-t-3xl overflow-hidden shrink-0 z-10">
            {/* Native Top Drag Handle Bar */}
            <div className="w-10 h-1 bg-white/40 rounded-full absolute top-2 inset-x-0 mx-auto z-20" />

            {/* Poster Image */}
            <img
              src="/Lead popup image 2.png"
              alt="Zynovax Agency"
              className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.02]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
              }}
            />

            {/* Gradient Overlay for Seamless Transition into Form */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />

            {/* Glass Trust Pill Badge (Bottom-Left) */}
            <div className="absolute bottom-2.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-md text-[10px] font-semibold text-purple-200 tracking-wide">
              <ShieldCheck className="size-3 text-emerald-400 shrink-0" />
              <span>Verified Partner • Zynovax</span>
            </div>

            {/* Glass Social Links (Bottom-Right) */}
            <div className="absolute bottom-2.5 right-3.5 z-20 flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Zynovax on ${social.name}`}
                    className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md shadow-md transition-all active:scale-95"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP LEFT SIDE: Poster Presentation (4:5 Ratio, ~42% Desktop)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative hidden md:flex md:w-[42%] flex-col justify-between p-6 overflow-hidden border-r border-white/15 bg-white/[0.02] backdrop-blur-md">
            {/* Background Poster Image */}
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

            {/* Top Badge (High-Contrast Premium Dark Glass Pill) */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-purple-500/30 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <Sparkles className="size-3 text-purple-400 animate-pulse shrink-0" />
                <span className="text-[11px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 uppercase">
                  Zynovax Agency
                </span>
              </div>
            </div>

            {/* Bottom Guarantee Badge & Social Media Buttons */}
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
          <div className="w-full md:w-[58%] flex flex-col justify-between p-5 sm:p-8 bg-white/[0.03] backdrop-blur-2xl">
            {/* Header */}
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

              <DialogTitle className="text-lg sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 font-[family-name:var(--font-display)]">
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
            <div className="my-3 sm:my-4 flex-1">
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
                    className="space-y-3.5"
                  >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3 sm:space-y-3.5"
                      id="mobile-lead-form"
                    >
                      {/* Name, Email, Phone Inputs (h-12 / text-base on mobile prevents iOS auto-zoom) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {/* Full Name */}
                        <div className="space-y-1 sm:col-span-2">
                          <Label
                            htmlFor="modal-fullName"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
                          >
                            Full Name
                          </Label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-fullName"
                              placeholder="e.g. Sarah Jenkins"
                              {...form.register("fullName")}
                              className={cn(
                                "pl-9.5 h-12 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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

                        {/* Business Email */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-email"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
                          >
                            Business Email
                          </Label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-email"
                              type="email"
                              placeholder="sarah@company.com"
                              {...form.register("email")}
                              className={cn(
                                "pl-9.5 h-12 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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

                        {/* WhatsApp / Phone */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="modal-phone"
                            className="text-[11px] font-medium text-zinc-200 tracking-wide"
                          >
                            WhatsApp / Phone
                          </Label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3 size-4 text-purple-300/70 pointer-events-none" />
                            <Input
                              id="modal-phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              {...form.register("phone")}
                              className={cn(
                                "pl-9.5 h-12 md:h-9.5 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white text-base md:text-xs placeholder:text-zinc-400",
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
                      </div>

                      {/* Service Chips (2-Column Grid on Mobile for Ergonomic 44px+ Tap Targets) */}
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-medium text-zinc-200 tracking-wide flex items-center justify-between">
                          <span>Service Required</span>
                          <span className="text-[10px] text-purple-300 font-normal">
                            (select all that apply)
                          </span>
                        </Label>
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
                          {SERVICES.map((service) => {
                            const isSelected = selectedServices.includes(service.id);
                            const Icon = service.icon;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={cn(
                                  "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 sm:py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 backdrop-blur-md border",
                                  "hover:-translate-y-0.5 active:translate-y-0 text-left justify-start",
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
                                <span className="truncate">{service.label}</span>
                                {isSelected && (
                                  <Check className="size-3 text-purple-300 ml-auto shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {errors.services && (
                          <p className="text-[10px] text-rose-300 font-medium">
                            {errors.services.message}
                          </p>
                        )}
                      </div>

                      {/* Monthly Budget Selector (2x2 Grid on Mobile) */}
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-medium text-zinc-200 tracking-wide flex items-center justify-between">
                          <span>Monthly Budget Range</span>
                          <DollarSign className="size-3 text-purple-300/70" />
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {BUDGET_OPTIONS.map((opt) => {
                            const isSelected = selectedBudget === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() =>
                                  form.setValue("budget", opt.value, {
                                    shouldValidate: true,
                                  })
                                }
                                className={cn(
                                  "h-11 sm:h-9 min-h-[44px] px-2 rounded-xl text-center text-xs font-medium cursor-pointer transition-all duration-200 border backdrop-blur-md flex items-center justify-center",
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
                        {errors.budget && (
                          <p className="text-[10px] text-rose-300 font-medium">
                            {errors.budget.message}
                          </p>
                        )}
                      </div>

                      {/* ── Mobile Sticky Action Bar & Keyboard Safety ── */}
                      <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-2xl pt-2 pb-3 px-1 -mx-1 border-t border-white/10 md:static md:bg-transparent md:p-0 md:mx-0 md:border-0 z-20">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-12 md:h-10.5 rounded-xl font-semibold text-sm text-white cursor-pointer",
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
                                Submitting Request…
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
                    </form>
                  </motion.div>
                ) : (
                  /* ─── STEP 2: Calendar Booking ─── */
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
                    {/* Confirmation Badge */}
                    <div className="flex items-center gap-2 rounded-xl bg-purple-500/15 border border-purple-400/40 p-3 text-purple-200 text-xs backdrop-blur-md shadow-lg">
                      <Sparkles className="size-4 text-purple-300 shrink-0" />
                      <p>
                        Your details were submitted! Pick a time for your 1-on-1 strategy call below.
                      </p>
                    </div>

                    {/* Calendar Embed Container */}
                    <div className="w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-950/40 backdrop-blur-xl">
                      <iframe
                        src={CAL_EMBED_URL}
                        title="Book a strategy call"
                        className="w-full border-0"
                        style={{ height: "370px", minHeight: "320px" }}
                        loading="lazy"
                        allow="payment"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Skip Link */}
            <div className="pt-2 text-center border-t border-white/15">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
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
