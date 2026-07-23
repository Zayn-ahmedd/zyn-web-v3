/**
 * Zynovax — Lead Notification Server Function
 *
 * Server-only handler invoked from the LeadCaptureModal.
 * Sends two emails via Resend:
 *   1. Internal notification to info@zynovax.in (dark-themed HTML)
 *   2. Automated confirmation to the lead
 *
 * Uses process.env.RESEND_API_KEY (never exposed to client).
 */

import process from "node:process";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ─── Input Schema ─────────────────────────────────────────────────────────────

const leadSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  services: z.array(z.string()).min(1),
  budget: z.string().min(1),
  source: z.string().optional(),
  submittedAt: z.string().optional(),
});

type LeadPayload = z.infer<typeof leadSchema>;

// ─── Email Templates ──────────────────────────────────────────────────────────

function buildInternalEmail(lead: LeadPayload): string {
  const servicesList = lead.services
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(", ");

  const budgetLabel =
    lead.budget === "1k-3k"
      ? "$1k – $3k"
      : lead.budget === "3k-5k"
        ? "$3k – $5k"
        : lead.budget === "5k-plus"
          ? "$5k+"
          : lead.budget;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Inter',system-ui,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#141414;border-radius:16px;border:1px solid #27272a;overflow:hidden;">
    <!-- Header -->
    <div style="padding:28px 32px 20px;border-bottom:1px solid #27272a;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#E8461E,#d63384);"></div>
        <h1 style="margin:0;font-size:18px;font-weight:700;color:#fafafa;letter-spacing:-0.02em;">
          New Lead Captured
        </h1>
      </div>
      <p style="margin:8px 0 0;font-size:13px;color:#a1a1aa;">
        ${lead.submittedAt ? new Date(lead.submittedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }) : new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
        &nbsp;·&nbsp; Source: ${lead.source || "lead-modal"}
      </p>
    </div>

    <!-- Lead Details Table -->
    <table cellpadding="0" cellspacing="0" role="presentation"
           style="width:100%;border-collapse:collapse;font-size:14px;color:#e4e4e7;">
      <tr style="border-bottom:1px solid #27272a;">
        <td style="padding:14px 32px;color:#71717a;font-weight:500;width:140px;white-space:nowrap;">Full Name</td>
        <td style="padding:14px 32px;font-weight:600;color:#fafafa;">${lead.fullName}</td>
      </tr>
      <tr style="border-bottom:1px solid #27272a;">
        <td style="padding:14px 32px;color:#71717a;font-weight:500;">Email</td>
        <td style="padding:14px 32px;">
          <a href="mailto:${lead.email}" style="color:#a78bfa;text-decoration:none;">${lead.email}</a>
        </td>
      </tr>
      <tr style="border-bottom:1px solid #27272a;">
        <td style="padding:14px 32px;color:#71717a;font-weight:500;">Phone / WhatsApp</td>
        <td style="padding:14px 32px;">
          <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}" style="color:#a78bfa;text-decoration:none;">${lead.phone}</a>
        </td>
      </tr>
      <tr style="border-bottom:1px solid #27272a;">
        <td style="padding:14px 32px;color:#71717a;font-weight:500;">Services</td>
        <td style="padding:14px 32px;color:#fafafa;">${servicesList}</td>
      </tr>
      <tr>
        <td style="padding:14px 32px;color:#71717a;font-weight:500;">Budget Range</td>
        <td style="padding:14px 32px;">
          <span style="display:inline-block;padding:4px 12px;background:#1e1b4b;color:#a78bfa;border-radius:20px;font-size:13px;font-weight:600;">
            ${budgetLabel}
          </span>
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid #27272a;text-align:center;">
      <p style="margin:0;font-size:12px;color:#52525b;">
        Zynovax Lead System &nbsp;·&nbsp; Auto-generated notification
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildClientEmail(lead: LeadPayload): string {
  const firstName = lead.fullName.split(" ")[0] || lead.fullName;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Inter',system-ui,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
    <!-- Header -->
    <div style="padding:32px 32px 24px;text-align:center;">
      <div style="display:inline-block;width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#E8461E,#d63384,#6d28d9);margin-bottom:16px;"></div>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;">
        Welcome to Zynovax, ${firstName}! 🚀
      </h1>
      <p style="margin:12px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">
        Thank you for reaching out. We've received your details and our growth strategists are already reviewing your project requirements.
      </p>
    </div>

    <!-- CTA -->
    <div style="padding:0 32px 28px;text-align:center;">
      <p style="margin:0 0 16px;font-size:14px;color:#374151;font-weight:500;">
        Want to fast-track your growth roadmap?
      </p>
      <a href="https://www.zynovax.in/contact"
         style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#E8461E,#d63384);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;letter-spacing:-0.01em;">
        Book a Strategy Call →
      </a>
    </div>

    <!-- What's Next -->
    <div style="padding:24px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;">
      <h3 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#111827;">What happens next?</h3>
      <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;font-size:13px;color:#4b5563;">
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:24px;color:#E8461E;font-weight:700;">1.</td>
          <td style="padding:6px 0;">Our team reviews your project scope and goals</td>
        </tr>
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:24px;color:#E8461E;font-weight:700;">2.</td>
          <td style="padding:6px 0;">We prepare a custom growth roadmap tailored to your brand</td>
        </tr>
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:24px;color:#E8461E;font-weight:700;">3.</td>
          <td style="padding:6px 0;">A strategist reaches out within 24 hours to schedule your call</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Zynovax — Creative Branding & Digital Marketing<br/>
        <a href="https://www.zynovax.in" style="color:#6d28d9;text-decoration:none;">www.zynovax.in</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Server Function ──────────────────────────────────────────────────────────

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[submitLead] RESEND_API_KEY is not set");
      return { success: false, error: "Email service not configured" } as const;
    }

    // Dynamic import — Resend is server-only, never shipped to client
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Send both emails concurrently
    const [internalResult, clientResult] = await Promise.allSettled([
      // 1. Internal notification to Zynovax team
      resend.emails.send({
        from: "Zynovax Leads <leads@zynovax.in>",
        to: ["info@zynovax.in"],
        subject: `🔥 New Lead: ${data.fullName} — ${data.services.join(", ")}`,
        html: buildInternalEmail(data),
      }),
      // 2. Automated confirmation to client
      resend.emails.send({
        from: "Zynovax <hello@zynovax.in>",
        to: [data.email],
        subject: "Welcome to Zynovax — We've received your request! 🚀",
        html: buildClientEmail(data),
      }),
    ]);

    // Log any failures
    if (internalResult.status === "rejected") {
      console.error("[submitLead] Internal email failed:", internalResult.reason);
    }
    if (clientResult.status === "rejected") {
      console.error("[submitLead] Client email failed:", clientResult.reason);
    }

    return { success: true } as const;
  });
