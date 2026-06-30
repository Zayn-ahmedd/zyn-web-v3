import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import ahmedRashmi from "@/assets/ahmed-rashmi.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zynovax — Creative Branding & Digital Marketing" },
      {
        name: "description",
        content:
          "Zynovax is a global creative branding and digital marketing firm. Borders are imaginary; your scale is absolute.",
      },
      { property: "og:title", content: "About Zynovax" },
      { property: "og:description", content: "Borders are imaginary; your scale is absolute." },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    t: "Outcomes over outputs",
    d: "We're measured by the revenue our clients earn, not decks we deliver.",
  },
  {
    t: "Senior pods only",
    d: "Every engagement is led by operators with 10+ years in the room — no juniors hidden in process.",
  },
  {
    t: "Systems, not services",
    d: "We engineer connected operating systems (Visual Identity, Social Media & Performance Marketing) for growth, not disconnected campaigns.",
  },
  {
    t: "Live Dashboards",
    d: "Live metrics and pipeline reporting are built into every engagement as a structural advantage.",
  },
  {
    t: "Transparent KPIs",
    d: "Shared dashboards. Weekly cadence. Monthly business reviews. No vague retainers.",
  },
  {
    t: "Long partnerships",
    d: "Our average engagement is 18 months. Growth compounds with continuity.",
  },
];

function AboutPage() {
  return (
    <div className="bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
        <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
          <Eyebrow>About Zynovax · Est. 2025</Eyebrow>
          <h1 className="mt-7 max-w-5xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
            We design branding and digital marketing for{" "}
            <span className="font-display italic font-normal text-gradient-brand">
              companies serious about scaling.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55]">
            Zynovax is a global creative branding and digital marketing firm built by senior
            operators from Stripe, McKinsey, and category-defining startups. We design and operate
            connected systems that compound revenue.
          </p>
        </Container>
      </section>

      <section className="bg-white pb-24 lg:pb-28">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border pt-10">
            {[
              { v: "120+", l: "Engagements delivered" },
              { v: "$210M", l: "Client revenue influenced" },
              { v: "6+", l: "Countries served (USA, CAN, AUS, UK, UAE & IND)" },
              { v: "Chennai", l: "Physical Origin HQ" },
            ].map((s) => (
              <div key={s.l} className="px-1 md:px-6 first:pl-0">
                <div className="text-4xl md:text-5xl font-semibold text-ink tracking-tight">
                  {s.v}
                </div>
                <div className="mt-2 text-sm text-ink-soft">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel no="01" label="Founder vision" />
              <div className="mt-10 rounded-3xl border border-border p-8 bg-white">
                <img
                  src={ahmedRashmi}
                  alt="Ahmed Rashmi"
                  className="size-16 rounded-full object-cover"
                />
                <div className="mt-5 text-base font-semibold text-ink">Ahmed Rashmi</div>
                <div className="text-sm text-ink-soft">Founder & CEO</div>
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-ink-soft">
                  <div className="flex justify-between">
                    <span>Background</span>
                    <span className="text-ink">Ex-McKinsey, ex-Stripe</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HQ Origin</span>
                    <span className="text-ink">Chennai, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Footprint</span>
                    <span className="text-ink">Global Scope</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-4xl lg:text-[56px] font-semibold leading-[1.05] text-ink tracking-tight text-balance">
                <span className="font-display italic font-normal text-ink-soft">"</span>
                Growth isn't a department. It's an{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  operating system
                </span>{" "}
                — and most companies have never been given one.
                <span className="font-display italic font-normal text-ink-soft">"</span>
              </h2>
              <div className="mt-10 grid sm:grid-cols-2 gap-8 text-[15px] text-ink-soft leading-[1.7]">
                <p>
                  Zynovax exists because we watched too many ambitious businesses hit a ceiling —
                  not from lack of ambition, but from running growth as a portfolio of disconnected
                  vendors.
                </p>
                <p>
                  We built a different model. Senior strategists, visual designers, and performance
                  marketers working under one operating system, with one set of metrics, and a
                  single team accountable to revenue.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14">
            <SectionLabel no="02" label="How we operate" />
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.04] text-ink tracking-tight text-balance">
              Six principles that{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                govern every engagement.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {principles.map((p, i) => (
              <div key={p.t} className="p-8 lg:p-10 border-r border-b border-border">
                <div className="font-display italic text-2xl text-gradient-brand">0{i + 1}</div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
