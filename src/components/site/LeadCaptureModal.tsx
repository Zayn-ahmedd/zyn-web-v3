/**
 * LeadCaptureModal — Elite Translucent Glassmorphic Popup Modal
 * Features:
 * - Unified Translucent Dark Frosted Glass Frame (bg-slate-950/75 backdrop-blur-3xl border-white/20)
 * - Ambient Glowing Mesh Flares & Top Edge Specular Flare
 * - Left Side: Frosted White Glass Poster Container (/Lead popup image 2.png) + Social Links Pill at Bottom (Instagram, Facebook, LinkedIn, YouTube, WhatsApp)
 * - Right Side: Translucent Dark Glass Vertical Form (Name, Phone, Email, Service Required, Avg Budget)
 * - Liquid Metal Gradient CTA Button
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
  User,
  Mail,
  Phone,
  DollarSign,
  ChevronDown,
  CheckCircle2,
  Lock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
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
  phone: z.string().min(7, "Valid phone/WhatsApp number required"),
  email: z.string().email("Enter a valid business email"),
  service: z.string().min(1, "Please select a service required"),
  budget: z.string().min(1, "Please select an average budget range"),
});

type LeadFormData = z.infer<typeof leadSchema>;

// ─── Dropdown Options ─────────────────────────────────────────────────────────

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

// ─── Social Media Links ───────────────────────────────────────────────────────

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
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/917338898638?text=Hi%20Zynovax%20team%2C%20I%27d%20like%20to%20discuss%20a%20potential%20project.",
  },
] as const;

// ─── Config ───────────────────────────────────────────────────────────────────

const CAL_EMBED_URL =
  import.meta.env.VITE_CAL_EMBED_URL ||
  "https://cal.com/zynovax/book-strategy-call";

// ─── Component ────────────────────────────────────────────────────────────────

export function LeadCaptureModal() {
  const { isOpen, handleOpenChange, dismiss } = useLeadModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
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
          phone: data.phone,
          email: data.email,
          services: [data.service],
          budget: data.budget,
          source: "lead-modal-elite-glassy",
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
          notes: `WhatsApp: ${data.phone} | Service: ${data.service} | Avg Budget: ${data.budget}`,
        },
      });
    } catch (err) {
      console.warn("[LeadCaptureModal] Opening prefilled Cal.com URL:", err);
      const calUrl = new URL("https://cal.com/zynovax/book-strategy-call");
      calUrl.searchParams.append("name", data.fullName);
      calUrl.searchParams.append("email", data.email);
      const notes = `WhatsApp: ${data.phone} | Service: ${data.service} | Avg Budget: ${data.budget}`;
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
          "bg-slate-950/75 backdrop-blur-3xl shadow-[0_0_120px_rgba(168,85,247,0.3),0_30px_100px_rgba(0,0,0,0.95)]",
          "p-0 border-0 text-white font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        {/* ── Specular Top Highlight Flare Line ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent z-30" />

        {/* ── Ambient Glowing Mesh Light Flares ── */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-purple-500/25 blur-[120px] z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-pink-500/25 blur-[120px] z-0"
        />

        <div className="relative z-10 flex flex-col md:flex-row w-full h-full min-h-[540px]">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE: Glass Poster Showcase + Social Links Pill at Bottom
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full md:w-1/2 bg-white/[0.04] backdrop-blur-2xl flex items-center justify-center p-6 overflow-hidden min-h-[280px] md:min-h-[520px] border-b md:border-b-0 md:border-r border-white/15">
            {/* Poster Graphic Image in White Glass Frame */}
            <div className="relative w-full max-w-[290px] sm:max-w-[330px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/95 group mb-8">
              <img
                src="/Lead popup image 2.png"
                alt="Those who trust us are family to us. And we are always with them. - Zynovax"
                className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500 ease-out filter brightness-[1.02]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
                }}
              />
            </div>

            {/* Bottom Dark Glass Overlay Pill with Social Media Icons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 p-2 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-xl shadow-lg">
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
                    className="p-2 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 hover:border-white/40 shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT SIDE: Translucent Glass Vertical Form (Stacked 1-Column)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-slate-950/60 backdrop-blur-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
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

              <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 font-[family-name:var(--font-display)]">
                {step === 1 ? (
                  <>Accelerate Your Brand Growth 🚀</>
                ) : (
                  <>Claim Your 1-on-1 Strategy Call</>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed font-medium">
                {step === 1
                  ? "Tell us about your project to unlock a custom growth roadmap."
                  : "Pick a time that works best for your team below."}
              </DialogDescription>
            </div>

            {/* Form Content */}
            <div className="my-4 flex-1">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* ─── STEP 1: Single-Column Translucent Glass Form Stack ─── */
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      {/* 1. Name Field */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="modal-fullName"
                          className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                        >
                          Name
                        </Label>
                        <div className="relative flex items-center">
                          <User className="absolute left-3.5 size-4 text-purple-300/80 pointer-events-none" />
                          <Input
                            id="modal-fullName"
                            type="text"
                            placeholder="e.g. Sarah Jenkins"
                            {...form.register("fullName")}
                            className={cn(
                              "pl-10 pr-4 h-10 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400 font-medium",
                              "focus:border-purple-400 focus:bg-slate-950/90 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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

                      {/* 2. Phone Field */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="modal-phone"
                          className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                        >
                          Phone
                        </Label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-3.5 size-4 text-purple-300/80 pointer-events-none" />
                          <Input
                            id="modal-phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...form.register("phone")}
                            className={cn(
                              "pl-10 pr-4 h-10 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400 font-medium",
                              "focus:border-purple-400 focus:bg-slate-950/90 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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

                      {/* 3. Email Field */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="modal-email"
                          className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                        >
                          Email
                        </Label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3.5 size-4 text-purple-300/80 pointer-events-none" />
                          <Input
                            id="modal-email"
                            type="email"
                            placeholder="sarah@company.com"
                            {...form.register("email")}
                            className={cn(
                              "pl-10 pr-4 h-10 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs placeholder:text-zinc-400 font-medium",
                              "focus:border-purple-400 focus:bg-slate-950/90 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:ring-1 focus:ring-purple-400/50 transition-all duration-200",
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

                      {/* 4. Service Required Dropdown */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="modal-service"
                          className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                        >
                          Service Required
                        </Label>
                        <div className="relative flex items-center">
                          <Sparkles className="absolute left-3.5 size-4 text-purple-300/80 pointer-events-none" />
                          <select
                            id="modal-service"
                            {...form.register("service")}
                            className={cn(
                              "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs font-medium focus:border-purple-400 focus:bg-slate-950 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                              errors.service && "border-rose-400/80",
                            )}
                          >
                            <option value="" disabled className="bg-slate-950 text-zinc-400">
                              Select service required
                            </option>
                            {SERVICES_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-slate-950 text-white">
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

                      {/* 5. Avg Budget Dropdown */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="modal-budget"
                          className="text-[11px] font-medium text-zinc-200 tracking-wide block"
                        >
                          Avg Budget
                        </Label>
                        <div className="relative flex items-center">
                          <DollarSign className="absolute left-3.5 size-4 text-purple-300/80 pointer-events-none" />
                          <select
                            id="modal-budget"
                            {...form.register("budget")}
                            className={cn(
                              "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-xs font-medium focus:border-purple-400 focus:bg-slate-950 focus:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                              errors.budget && "border-rose-400/80",
                            )}
                          >
                            <option value="" disabled className="bg-slate-950 text-zinc-400">
                              Select average budget
                            </option>
                            {BUDGET_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-slate-950 text-white">
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

                      {/* Accent Liquid Gradient CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group relative w-full h-11.5 rounded-xl font-bold text-xs sm:text-sm text-white cursor-pointer",
                            "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                            "border border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.75)]",
                            "transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden",
                          )}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
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

            {/* Footer Confidential & Skip Note */}
            <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-white/15">
              <div className="flex items-center gap-1">
                <Lock className="size-3 text-zinc-400" />
                <span>100% Confidential</span>
              </div>
              <button
                type="button"
                onClick={handleSkip}
                className="hover:text-white font-medium transition-colors cursor-pointer"
              >
                {step === 1 ? "I'll explore first" : "I'll book later"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
