/**
 * LeadCaptureModal — Clean Light Theme Split Lead Modal
 * On Form Submission ("Continue to Book Strategy Call →"):
 * - Saves lead details via Resend API (submitLead)
 * - Opens pre-filled Cal.com booking link directly in a NEW TAB (window.open) to eliminate heavy iframe page load
 * - Closes modal smoothly after launching
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Sparkles,
  User,
  Mail,
  Phone,
  DollarSign,
  ChevronDown,
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

// ─── Component ────────────────────────────────────────────────────────────────

export function LeadCaptureModal() {
  const { isOpen, handleOpenChange, dismiss } = useLeadModal();
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
          source: "lead-modal-new-tab",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn("[LeadCaptureModal] Lead submission warning:", err);
    } finally {
      setIsSubmitting(false);
    }

    // 2. Build prefilled Cal.com scheduling URL and open directly in a NEW TAB
    const calUrl = new URL("https://cal.com/zynovax/book-strategy-call");
    calUrl.searchParams.append("name", data.fullName);
    calUrl.searchParams.append("email", data.email);
    const notesStr = `WhatsApp: ${data.phone} | Service: ${data.service} | Avg Budget: ${data.budget}`;
    calUrl.searchParams.append("notes", notesStr);

    window.open(calUrl.toString(), "_blank", "noopener,noreferrer");

    // 3. Smoothly close modal
    dismiss();
  };

  const handleSkip = () => {
    dismiss();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "w-[94vw] max-w-4xl max-h-[92vh] overflow-y-auto md:overflow-hidden rounded-[32px] border border-slate-200/90",
          "bg-white shadow-[0_25px_90px_rgba(0,0,0,0.25)]",
          "p-0 border-0 text-slate-900 font-sans transition-all duration-300",
        )}
        aria-label="Accelerate Your Brand Growth"
      >
        <div className="relative flex flex-col md:flex-row w-full h-full min-h-[540px]">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE: Image Asset Showcase + Social Media Icons at Bottom
             ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full md:w-1/2 bg-slate-50 flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[520px] border-b md:border-b-0 md:border-r border-slate-200">
            {/* Quote Graphic Image */}
            <img
              src="/Lead popup image 2.png"
              alt="Those who trust us are family to us. And we are always with them. - Zynovax"
              className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.01]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/lead-popup-image-2.png";
              }}
            />

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
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT SIDE: Clean Light Single-Column Form
             ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-white">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-purple-700 uppercase">
                  Zynovax Growth Audit
                </span>
              </div>

              <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)]">
                Accelerate Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
                  Brand Growth
                </span>{" "}
                🚀
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                Tell us about your project to unlock a custom growth roadmap.
              </DialogDescription>
            </div>

            {/* Form Content */}
            <div className="my-4 flex-1">
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
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
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block"
                    >
                      NAME
                    </Label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="modal-fullName"
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        {...form.register("fullName")}
                        className={cn(
                          "pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-xs placeholder:text-slate-400 font-medium",
                          "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          errors.fullName && "border-rose-500 focus:ring-rose-500/30",
                        )}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[10px] text-rose-600 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* 2. Phone Field */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="modal-phone"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block"
                    >
                      PHONE
                    </Label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="modal-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...form.register("phone")}
                        className={cn(
                          "pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-xs placeholder:text-slate-400 font-medium",
                          "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          errors.phone && "border-rose-500 focus:ring-rose-500/30",
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-rose-600 font-medium">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* 3. Email Field */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="modal-email"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block"
                    >
                      EMAIL
                    </Label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="modal-email"
                        type="email"
                        placeholder="sarah@company.com"
                        {...form.register("email")}
                        className={cn(
                          "pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-xs placeholder:text-slate-400 font-medium",
                          "focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 transition-all duration-200",
                          errors.email && "border-rose-500 focus:ring-rose-500/30",
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-rose-600 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* 4. Service Required Dropdown */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="modal-service"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block"
                    >
                      SERVICE REQUIRED
                    </Label>
                    <div className="relative flex items-center">
                      <Sparkles className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                      <select
                        id="modal-service"
                        {...form.register("service")}
                        className={cn(
                          "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-xs font-medium focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                          errors.service && "border-rose-500",
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
                    {errors.service && (
                      <p className="text-[10px] text-rose-600 font-medium">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* 5. Avg Budget Dropdown */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="modal-budget"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block"
                    >
                      AVG BUDGET
                    </Label>
                    <div className="relative flex items-center">
                      <DollarSign className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                      <select
                        id="modal-budget"
                        {...form.register("budget")}
                        className={cn(
                          "w-full pl-10 pr-8 h-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-xs font-medium focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600/30 focus:outline-none transition-all duration-200 appearance-none cursor-pointer",
                          errors.budget && "border-rose-500",
                        )}
                      >
                        <option value="" disabled className="bg-slate-400">
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
                    {errors.budget && (
                      <p className="text-[10px] text-rose-600 font-medium">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  {/* Accent CTA Button */}
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
                </form>
              </motion.div>
            </div>

            {/* Footer Confidential & Skip Note */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
              <div className="flex items-center gap-1 font-medium">
                <Lock className="size-3 text-slate-400" />
                <span>100% Confidential</span>
              </div>
              <button
                type="button"
                onClick={handleSkip}
                className="hover:text-slate-900 font-medium transition-colors cursor-pointer"
              >
                I'll explore first
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
