import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, FileText, PlayCircle, Download } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Playbooks, Frameworks & Guides | Zynovax" },
      {
        name: "description",
        content:
          "Frameworks, playbooks and branding & marketing guides from the Zynovax team. Built for operators serious about compounding revenue.",
      },
      { property: "og:title", content: "Zynovax Resources" },
      {
        property: "og:description",
        content: "Playbooks and frameworks from the creative branding and digital marketing team.",
      },
    ],
  }),
  component: ResourcesPage,
});

const featured = {
  type: "Playbook",
  title: "The Growth Engine™ Operating Manual",
  desc: "The full five-stage methodology Zynovax runs with growth-stage and enterprise teams — codified into one downloadable guide.",
};

const items = [
  {
    icon: BookOpen,
    type: "Playbook",
    t: "The Visual Identity Design System",
    d: "How to architect a premium brand identity that compounds.",
  },
  {
    icon: FileText,
    type: "Guide",
    t: "The Social Media Conversion Loop",
    d: "A tactical guide to turning organic content attention into qualified pipeline.",
  },
  {
    icon: PlayCircle,
    type: "Teardown",
    t: "We rebuilt a $40M SaaS paid funnel. Here's what shipped.",
    d: "An anonymized walkthrough of a real performance marketing audit.",
  },
  {
    icon: BookOpen,
    type: "Playbook",
    t: "Google & Meta Scale Guidelines",
    d: "How to optimize paid acquisition accounts for maximum ROAS return.",
  },
  {
    icon: FileText,
    type: "Guide",
    t: "CRO for Global Enterprises",
    d: "Conversion engineering for complex, considered international sales.",
  },
  {
    icon: PlayCircle,
    type: "Webinar",
    t: "Inside the Growth Engine",
    d: "60-minute deep dive with founder Ahmed Rashmi.",
  },
];

function ResourcesPage() {
  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Frameworks, playbooks and{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                branding & marketing guides.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
              The same operating manuals we ship internally — codified for operators serious about
              compounding revenue across global markets.
            </p>
          </Container>
        </section>

        {/* Featured */}
        <section className="bg-white pb-24">
          <Container>
            <div className="rounded-[28px] bg-ink text-white p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
              <div className="relative grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                    Featured · {featured.type}
                  </div>
                  <h2 className="mt-4 text-3xl lg:text-[56px] font-semibold leading-[1.05] tracking-tight text-balance">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-lg text-white/70 max-w-xl leading-relaxed">
                    {featured.desc}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:-translate-y-0.5 transition-transform"
                  >
                    <Download className="size-4" /> Download playbook
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-surface py-24 lg:py-32">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel no="·" label="Library" />
                <h2 className="mt-5 text-3xl md:text-4xl lg:text-[48px] font-semibold text-ink tracking-tight">
                  Latest from the team.
                </h2>
              </div>
              <Link
                to="/blogs"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:gap-2.5 transition-all"
              >
                All articles <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((it) => (
                <a
                  key={it.t}
                  href="#"
                  className="group rounded-3xl border border-border bg-white p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="size-10 rounded-lg bg-gradient-brand-soft flex items-center justify-center">
                      <it.icon className="size-4 text-ink" />
                    </div>
                    <ArrowUpRight className="size-4 text-ink-soft group-hover:text-ink transition-colors" />
                  </div>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                    {it.type}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-ink leading-tight">{it.t}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{it.d}</p>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
