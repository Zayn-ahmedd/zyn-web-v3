import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Code2,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Zap,
  User,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { Globe } from "@/components/ui/cobe-globe";

const globeMarkers = [
  { id: "usa", location: [37.7595, -122.4367] as [number, number], label: "United States" },
  { id: "canada", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "uk", location: [51.5074, -0.1278] as [number, number], label: "United Kingdom" },
  { id: "uae", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "india", location: [19.0760, 72.8777] as [number, number], label: "India" },
  { id: "australia", location: [-33.8688, 151.2093] as [number, number], label: "Australia" },
];

const globeArcs = [
  { id: "usa-uk", from: [37.7595, -122.4367] as [number, number], to: [51.5074, -0.1278] as [number, number] },
  { id: "uk-uae", from: [51.5074, -0.1278] as [number, number], to: [25.2048, 55.2708] as [number, number] },
  { id: "uae-india", from: [25.2048, 55.2708] as [number, number], to: [19.0760, 72.8777] as [number, number] },
  { id: "india-australia", from: [19.0760, 72.8777] as [number, number], to: [-33.8688, 151.2093] as [number, number] },
];

export const Route = createFileRoute("/industry")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Visual Identity, Social Media & Paid Ads | Zynovax" },
      {
        name: "description",
        content:
          "Growth systems engineered for SaaS, healthcare, fintech, D2C, education, professional services, and local brands across international markets.",
      },
      { property: "og:title", content: "Industries We Serve | Zynovax" },
      {
        property: "og:description",
        content: "Growth systems engineered for your category constraints, not against them.",
      },
    ],
  }),
  component: IndustryPage,
});

const industries = [
  {
    icon: Code2,
    t: "SaaS & Tech",
    d: "ARR-stage platforms scaling qualified pipeline and trial-to-paid conversions.",
    play: "Visual Identity · Social Media · Paid Campaigns",
  },
  {
    icon: HeartPulse,
    t: "Healthcare Networks",
    d: "Clinics and telehealth brands building trust-led patient demand.",
    play: "Social Media Management · Paid Search Ads",
  },
  {
    icon: Landmark,
    t: "Fintech & Wealth",
    d: "Wealthtech, digital banks, and payments platforms compounding regulated growth.",
    play: "Brand Guidelines · Performance Ads · Attribution",
  },
  {
    icon: ShoppingBag,
    t: "E-commerce & D2C",
    d: "Premium brands and marketplaces engineering high AOV and customer repeat rates.",
    play: "Brand Restage · Social Video · Meta Ads",
  },
  {
    icon: GraduationCap,
    t: "Education & EdTech",
    d: "EdTech platforms and credentialing programs scaling global enrollments.",
    play: "Social Media Content · Performance ads",
  },
  {
    icon: User,
    t: "Founder Authority",
    d: "Founders and executives turning personal brand visibility into qualified pipeline.",
    play: "Narrative · Social Media · Content Engine",
  },
  {
    icon: Building2,
    t: "Multi-Location",
    d: "Multi-location service brands building local category dominance.",
    play: "Local Social Distribution · Performance ads",
  },
  {
    icon: Briefcase,
    t: "Professional Services",
    d: "Legal, advisory, and consulting firms compounding enterprise inbound.",
    play: "Positioning · LinkedIn Distribution · Visual Assets",
  },
  {
    icon: Zap,
    t: "High-Growth Startups",
    d: "VC-funded teams installing professional growth foundations from day one.",
    play: "Brand Identity · GTM · Paid Ads Setup",
  },
];

function IndustryPage() {
  return (
    <div className="bg-white">
      <SiteNav />

      <div className="animate-slide-down-page">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow>Industries</Eyebrow>
                <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
                  One operating model.{" "}
                  <span className="font-display italic font-normal text-gradient-brand">
                    Adapted to your category.
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
                  We adapt visual identity, social media presence, and performance ad accounts to your
                  category constraints. Below: the industries where our systems compound fastest.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center relative w-full max-w-[450px] lg:max-w-none mx-auto">
                <div className="absolute inset-0 bg-gradient-brand-soft opacity-40 blur-2xl rounded-full" />
                <Globe
                  markers={globeMarkers}
                  arcs={globeArcs}
                  className="w-full h-full relative z-10"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {industries.map((i) => (
                <div
                  key={i.t}
                  className="group rounded-3xl border border-border p-8 bg-white hover:bg-surface transition-colors flex flex-col justify-between"
                >
                  <div>
                    <i.icon className="size-6 text-ink" />
                    <h3 className="mt-6 text-2xl font-semibold text-ink">{i.t}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{i.d}</p>
                  </div>
                  <div className="mt-7 pt-5 border-t border-border">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      Typical play
                    </div>
                    <div className="mt-1.5 text-sm text-ink">{i.play}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-surface py-24">
          <Container>
            <div className="rounded-[28px] bg-ink text-white p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
              <div className="relative grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8">
                  <SectionLabel no="·" label="Don't see your industry?" />
                  <h2 className="mt-5 text-3xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-balance">
                    We've engineered growth systems in{" "}
                    <span className="font-display italic font-normal text-gradient-brand">
                      6+ countries.
                    </span>
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Serving enterprises across USA, Canada, Australia, UK, UAE, and India.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:-translate-y-0.5 transition-transform"
                  >
                    Talk to our team <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
