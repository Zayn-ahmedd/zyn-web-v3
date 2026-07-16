import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MessageSquare, ArrowRight, Award, Quote } from "lucide-react";
import { useState } from "react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { generatePageHead } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";

export const Route = createFileRoute("/testimonials")({
  head: () =>
    generatePageHead({
      title: "Client Testimonials & Reviews | Zynovax",
      description:
        "What founders from USA, UK, UAE, Canada, Australia & India say about Zynovax. Real trust, proven results, and global growth outcomes.",
      path: "/testimonials",
    }),
  component: TestimonialsPage,
});

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  region: string;
  flag: string;
  avatarGradient: string;
  avatarText: string;
  rating: number;
};

const reviews: Testimonial[] = [
  {
    quote:
      "The visual rebranding Zynovax delivered shifted our market perception instantly. We're now commanding a 30% premium over our nearest competitors and conversions are up 58%.",
    author: "Sarah Jenkins",
    role: "CEO & Founder",
    company: "Lumina Skin",
    region: "Canada",
    flag: "🇨🇦",
    avatarGradient: "from-brand-orange to-brand-pink",
    avatarText: "SJ",
    rating: 5,
  },
  {
    quote:
      "Their performance marketing engine didn't just buy ad slots — it engineered our entire revenue attribution systems. Scaling Meta and Google to a blended 5.2x ROAS speak for itself.",
    author: "Kabir Al-Mansoori",
    role: "Growth Director",
    company: "AeroPay",
    region: "UAE",
    flag: "🇦🇪",
    avatarGradient: "from-brand-pink to-brand-magenta",
    avatarText: "KA",
    rating: 5,
  },
  {
    quote:
      "Zynovax scaled our e-commerce acquisition channels from zero to $50k/month in less than 90 days. Their communication, execution velocity, and data transparency are unmatched.",
    author: "Liam Davis",
    role: "Founder",
    company: "Aura Living",
    region: "Australia",
    flag: "🇦🇺",
    avatarGradient: "from-brand-magenta to-brand-violet",
    avatarText: "LD",
    rating: 5,
  },
  {
    quote:
      "Our organic social presence went from a chore to our primary B2B inbound lead source on LinkedIn. The compounding reach and founder authority building programs have been incredible.",
    author: "Emma Watson",
    role: "VP Marketing",
    company: "Vercel Pro",
    region: "USA",
    flag: "🇺🇸",
    avatarGradient: "from-brand-violet to-brand-orange",
    avatarText: "EW",
    rating: 5,
  },
  {
    quote:
      "We saw a +180% surge in inbound inquiries through content authority distribution loops. They manage the strategy, the writing, the editing, and the publishing seamlessly.",
    author: "Aarav Mukherji",
    role: "Founder",
    company: "Riva Health",
    region: "India",
    flag: "🇮🇳",
    avatarGradient: "from-brand-orange to-brand-magenta",
    avatarText: "AM",
    rating: 5,
  },
  {
    quote:
      "Exceptional high-trust logo system and institutional brand guidelines rollout. They operate as an extension of our executive team rather than a standard vendor.",
    author: "Charlotte Higgins",
    role: "CEO",
    company: "Zenith Capital",
    region: "UK",
    flag: "🇬🇧",
    avatarGradient: "from-brand-pink to-brand-violet",
    avatarText: "CH",
    rating: 5,
  },
];

function VideoTestimonialCard({
  founder,
  company,
  role,
  duration,
  topics,
}: {
  founder: string;
  company: string;
  role: string;
  duration: string;
  topics: string;
}) {
  return (
    <div className="relative group overflow-hidden rounded-[28px] border border-border bg-ink text-white aspect-[16/10] flex flex-col justify-end p-6 sm:p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
      {/* Background visual overlay representing video */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-brand opacity-15 group-hover:opacity-25 transition-opacity duration-300" />

      {/* Visual background simulated lines to look high-tech/premium */}
      <div className="absolute inset-0 grid-lines opacity-10" />

      {/* Play micro-interaction */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="size-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-ink text-white shadow-glow">
          <svg
            className="size-7 fill-current pl-1 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="relative z-20 w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-white/15 rounded backdrop-blur-sm text-white/90">
            Case Study Review
          </span>
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-gradient-brand-soft border border-white/10 rounded text-gradient-brand font-semibold">
            {duration}
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-semibold leading-snug tracking-tight text-white mb-4">
          "{topics}"
        </h4>
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div>
            <div className="text-sm font-semibold text-white">{founder}</div>
            <div className="text-xs text-white/60">
              {role} · {company}
            </div>
          </div>
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsPage() {
  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={webPageSchema({
          title: "Client Testimonials & Reviews | Zynovax",
          description:
            "What founders from USA, UK, UAE, Canada, Australia & India say about Zynovax. Real trust, proven results, and global growth outcomes.",
          path: "/testimonials",
        })}
      />
      <SiteNav />

      <div className="animate-slide-down-page">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Testimonials", path: "/testimonials" },
              ]}
              className="mb-8"
            />
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <Eyebrow>Client Proof</Eyebrow>
                <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[72px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance animate-rise">
                  Real voices.{" "}
                  <span className="font-display italic font-normal text-gradient-brand">
                    Trusted by ambitious founders globally.
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-[1.55] animate-rise">
                  How we operate at scale. Unfiltered reviews from founders and executives across
                  USA, Canada, UK, UAE, Australia, and India.
                </p>
              </div>
              <div className="lg:col-span-6 flex items-center justify-center relative mt-12 lg:mt-0 w-full overflow-hidden">
                <CircularTestimonials
                  testimonials={[
                    {
                      quote:
                        "The visual rebranding Zynovax delivered shifted our market perception instantly. We're now commanding a 30% premium over our nearest competitors and conversions are up 58%.",
                      name: "Sarah Jenkins",
                      designation: "CEO & Founder, Lumina Skin (Canada)",
                      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
                    },
                    {
                      quote:
                        "Their performance marketing engine didn't just buy ad slots — it engineered our entire revenue attribution systems. Scaling Meta and Google to a blended 5.2x ROAS speak for itself.",
                      name: "Kabir Al-Mansoori",
                      designation: "Growth Director, AeroPay (UAE)",
                      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
                    },
                    {
                      quote:
                        "Zynovax scaled our e-commerce acquisition channels from zero to $50k/month in less than 90 days. Their communication, execution velocity, and data transparency are unmatched.",
                      name: "Liam Davis",
                      designation: "Founder, Aura Living (Australia)",
                      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
                    },
                  ]}
                  autoplay={true}
                  colors={{
                    name: "#141414",
                    designation: "#6b7280",
                    testimony: "#262626",
                    arrowBackground: "#141414",
                    arrowForeground: "#f1f1f7",
                    arrowHoverBackground: "oklch(0.62 0.29 350)",
                  }}
                  fontSizes={{
                    name: "24px",
                    designation: "14px",
                    quote: "16px",
                  }}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonials Review Grid (Infinite scrolling columns) */}
        <section className="bg-white pb-20 relative overflow-hidden">
          <Container>
            <div className="flex justify-center gap-6 md:gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden pt-6 pb-6">
              <TestimonialsColumn
                testimonials={reviews.filter((_, i) => i % 3 === 0)}
                duration={15}
              />
              <TestimonialsColumn
                testimonials={reviews.filter((_, i) => i % 3 === 1)}
                className="hidden md:block"
                duration={19}
              />
              <TestimonialsColumn
                testimonials={reviews.filter((_, i) => i % 3 === 2)}
                className="hidden lg:block"
                duration={17}
              />
            </div>
          </Container>
        </section>

        {/* Video Reviews Section */}
        <section className="bg-surface py-24 lg:py-32">
          <Container>
            <div className="max-w-3xl mb-14">
              <Eyebrow>On Camera</Eyebrow>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.04] text-ink tracking-tight text-balance">
                Founders on{" "}
                <span className="font-display italic font-normal text-gradient-brand">
                  strategic partnership value.
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-[1.5]">
                Hear directly from the operators we partner with to deploy visual identity guides,
                content channels, and performance acquisition scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <VideoTestimonialCard
                founder="Marcus Chen"
                company="Apex Logistics"
                role="CEO & Founder"
                duration="3:42 min"
                topics="How we scaled organic lead volume by 260% in 90 days"
              />
              <VideoTestimonialCard
                founder="Zahra Al-Taji"
                company="CorePay"
                role="Chief Marketing Officer"
                duration="4:15 min"
                topics="The transition from disconnected agencies to Zynovax's growth engine"
              />
            </div>
          </Container>
        </section>

        {/* Bottom CTA section */}
        <section className="bg-white py-24 lg:py-32">
          <Container>
            <div className="rounded-[32px] bg-ink text-white p-8 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-brand opacity-15" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                  Ready to scale?
                </span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                  Become our next global success story.
                </h2>
                <p className="mt-6 text-white/70 leading-relaxed text-sm sm:text-base">
                  Book a strategy assessment with our senior operators. We will audit your current
                  branding, organic distribution footprint, and performance marketing setup.
                </p>
                <div className="mt-8 flex justify-center">
                  <LiquidMetalButton
                    label="Book Strategy Call"
                    width={162}
                    onClick={() => {
                      window.location.href = "/contact";
                    }}
                  />
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
