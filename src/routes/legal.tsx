import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, FileCheck, Landmark, Scale, Cpu } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { generatePageHead } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";

export const Route = createFileRoute("/legal")({
  head: () =>
    generatePageHead({
      title: "Legal & Compliance Frameworks | Zynovax",
      description:
        "Terms of engagement, global privacy standards, and cross-border client compliance frameworks for Zynovax operations.",
      path: "/legal",
    }),
  component: LegalPage,
});

type Section = {
  id: string;
  number: string;
  title: string;
  icon: typeof Shield;
  content: string[];
};

const sections: Section[] = [
  {
    id: "terms",
    number: "1.0",
    title: "Terms of Engagement",
    icon: Scale,
    content: [
      "Our engagement structure is governed by performance milestones. Zynovax works under predefined strategic sprints focusing on Visual Identity system delivery, Social Media Management calendars, and Performance Marketing campaign operations.",
      "Payments are handled on monthly recurring retainers or milestone-based structures. Sprints are locked 14 days in advance to ensure our senior strategists are fully assigned.",
      "Either party may terminate the engagement with a 30-day written notice, subject to completion of active milestones.",
    ],
  },
  {
    id: "privacy",
    number: "2.0",
    title: "Global Privacy Framework",
    icon: Shield,
    content: [
      "Zynovax operates globally. We adhere strictly to data privacy frameworks including GDPR (EU), CCPA (USA), and local cross-border regulations to ensure client data integrity.",
      "All consumer data gathered through client marketing campaigns, conversion lead sheets, or analytics pixels remains the exclusive property of the client.",
      "We utilize server-side cloud infrastructure to run analytics, ensuring no direct third-party script leakage occurs without secure hashing protocol compliance.",
    ],
  },
  {
    id: "compliance",
    number: "3.0",
    title: "Cross-Border Compliance",
    icon: Landmark,
    content: [
      "Our services comply with international advertising standards. We configure geographic and age constraints dynamically based on local regulations in USA, Canada, Australia, UK, UAE, and India.",
      "Zynovax operates as a registered corporate entity under international tax rules. All digital payouts, invoices, and compliance documentation are provided transparently for regional audits.",
      "We do not advise on local licensing rules; clients are responsible for industry-specific compliance certificates in their respective jurisdictions.",
    ],
  },
  {
    id: "intellectual-property",
    number: "4.0",
    title: "Intellectual Property Rights",
    icon: Cpu,
    content: [
      "Upon full settlement of milestone payments, all creative deliverables (logos, brand books, guidelines, custom design tokens, copy decks) are fully transferred to the client.",
      "Zynovax retains the right to display visual transformations, growth charts, and case study outcomes for marketing and portfolio purposes, subject to non-disclosure exclusions.",
      "Any open-source tooling, library templates, or custom scripts created by Zynovax remain our proprietary technology but are licensed to the client indefinitely.",
    ],
  },
  {
    id: "sla",
    number: "5.0",
    title: "Service Level Agreements (SLAs)",
    icon: FileCheck,
    content: [
      "We maintain a response timeline of less than 24 hours during standard corporate work weeks for active engagements.",
      "Media budget scaling metrics and campaign reporting dashboards are sync-updated hourly, ensuring transparent real-time attribution data access.",
      "Creative asset updates (graphics, social content) maintain a delivery cadence of 5 business days from briefing sign-off.",
    ],
  },
];

function LegalPage() {
  const [activeSec, setActiveSec] = useState<string>("terms");

  const activeContent = sections.find((s) => s.id === activeSec) || sections[0];

  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={webPageSchema({
          title: "Legal & Compliance Frameworks | Zynovax",
          description:
            "Terms of engagement, global privacy standards, and cross-border client compliance frameworks for Zynovax operations.",
          path: "/legal",
        })}
      />
      <SiteNav />

      <div className="animate-slide-down-page">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-12 lg:pt-28 lg:pb-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Legal", path: "/legal" },
              ]}
              className="mb-8"
            />
            <Eyebrow>Compliance</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Legal{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                documentation & frameworks.
              </span>
            </h1>
          </Container>
        </section>

        {/* Document Reader Section */}
        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-start pt-6 border-t border-border/80">
              {/* Side-anchored Table of Contents */}
              <nav className="lg:col-span-4 space-y-2 sticky top-24">
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft font-bold block mb-4">
                  Document Sections
                </span>
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = s.id === activeSec;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSec(s.id)}
                      className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-ink text-white shadow-elegant"
                          : "bg-surface text-ink-soft hover:bg-border/40 hover:text-ink"
                      }`}
                    >
                      <Icon
                        className={`size-4 shrink-0 ${isActive ? "text-white" : "text-ink-soft"}`}
                      />
                      <span className="font-mono text-xs opacity-60 shrink-0">{s.number}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  );
                })}
                <div className="mt-8 p-6 rounded-2xl bg-surface border border-border text-xs text-ink-soft">
                  <p className="leading-relaxed">
                    Last updated: **June 2026**. Managed under cross-border legal counsel
                    frameworks.
                  </p>
                </div>
              </nav>

              {/* Main content Document Reader panel */}
              <div className="lg:col-span-8 bg-white border border-border rounded-[28px] p-8 lg:p-12 shadow-elegant min-h-[460px]">
                <div className="flex items-center gap-3.5">
                  <div className="size-11 rounded-lg bg-gradient-brand-soft flex items-center justify-center">
                    <activeContent.icon className="size-5 text-ink" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                      Section {activeContent.number}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-none mt-1">
                      {activeContent.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-6 text-base text-ink-soft leading-relaxed">
                  {activeContent.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border flex items-center justify-between text-xs text-ink-soft">
                  <span>Zynovax Operations Framework</span>
                  <span>Compliance Certified</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
