import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow, SectionLabel } from "@/components/site/primitives";
import { generatePageHead } from "@/lib/seo/metadata";
import { collectionPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { blogPosts } from "@/data/blog-posts";

export const Route = createFileRoute("/blogs/")({
  head: () =>
    generatePageHead({
      title: "Blogs — Creative Branding & Marketing Insights | Zynovax",
      description:
        "Insights, teardowns and frameworks on brand strategy, performance marketing, SEO, CRO, content and AI automation from the Zynovax team.",
      path: "/blogs",
    }),
  component: BlogsPage,
});

/**
 * Posts array — real posts from blog-posts.ts are merged with placeholder posts.
 * Posts with a `slug` field link to `/blogs/{slug}`. Others link to `#`.
 */
type PostEntry = {
  cat: string;
  date: string;
  t: string;
  d: string;
  read: string;
  slug?: string;
  image?: string;
};

const placeholderPosts: PostEntry[] = [
  {
    cat: "Strategy",
    date: "Jun 2026",
    t: "Why most growth ceilings aren't strategy problems — they're system problems",
    d: "The diagnostic framework we run on every growth-stage company before we ever propose work.",
    read: "9 min read",
  },
  {
    cat: "Performance",
    date: "May 2026",
    t: "Server-side attribution: what actually moves ROAS in 2026",
    d: "A teardown of what worked across $40M of managed media this year.",
    read: "12 min read",
  },
  {
    cat: "Brand",
    date: "May 2026",
    t: "Repositioning for pricing power without losing volume",
    d: "Six weeks. One narrative shift. A 42% lift in pricing power.",
    read: "8 min read",
  },
  {
    cat: "AI",
    date: "Apr 2026",
    t: "Where AI actually compounds margin (and where it burns it)",
    d: "Our internal heuristic for when to ship an AI workflow vs. when to leave it manual.",
    read: "10 min read",
  },
  {
    cat: "CRO",
    date: "Apr 2026",
    t: "Conversion engineering for senior buyers",
    d: "Why most CRO playbooks fail enterprise sales — and what to do instead.",
    read: "11 min read",
  },
  {
    cat: "SEO",
    date: "Mar 2026",
    t: "The authority SEO compounding map",
    d: "How we architect SEO programs that compound for 24+ months.",
    read: "14 min read",
  },
];

// Build the combined posts list: real posts first, then placeholders
const realPosts: PostEntry[] = blogPosts.map((p) => ({
  cat: p.category,
  date: p.date,
  t: p.title,
  d: p.description,
  read: p.readTime,
  slug: p.slug,
  image: p.image,
}));

const posts: PostEntry[] = [...realPosts, ...placeholderPosts];

function BlogsPage() {
  const [hero, ...rest] = posts;

  const collectionItems = posts.map((post) => ({
    name: post.t,
    url: post.slug
      ? `https://www.zynovax.in/blogs/${post.slug}`
      : `https://www.zynovax.in/blogs`,
    description: post.d,
  }));

  return (
    <main className="bg-white" id="main-content">
      <JsonLd
        data={collectionPageSchema(
          "Blogs — Creative Branding & Marketing Insights",
          "Insights, teardowns and frameworks on brand strategy, performance marketing, SEO, CRO, content and AI automation.",
          "/blogs",
          collectionItems,
        )}
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
                { name: "Blogs", path: "/blogs" },
              ]}
              className="mb-8"
            />
            <Eyebrow>Editorial</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl sm:text-5xl lg:text-[80px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Branding and marketing,{" "}
              <span className="font-display italic font-normal text-gradient-brand">
                in writing.
              </span>
            </h1>
          </Container>
        </section>

        {/* Featured Card with image zoom interaction */}
        <section className="bg-white pb-12">
          <Container>
            {hero.slug ? (
              <Link
                to="/blogs/$slug"
                params={{ slug: hero.slug }}
                className="group block rounded-[28px] border border-border bg-white p-8 lg:p-14 hover:shadow-elegant transition-all duration-300"
              >
                <FeaturedCardInner hero={hero} />
              </Link>
            ) : (
              <a
                href="#"
                className="group block rounded-[28px] border border-border bg-white p-8 lg:p-14 hover:shadow-elegant transition-all duration-300"
              >
                <FeaturedCardInner hero={hero} />
              </a>
            )}
          </Container>
        </section>

        {/* Latest posts grid with image zoom transitions */}
        <section className="bg-surface py-24 lg:py-32">
          <Container>
            <SectionLabel no="·" label="Latest articles" />
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => {
                const cardContent = (
                  <>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border/20 mb-7">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.t}
                          className="size-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="size-full bg-gradient-brand-soft scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      <span>{p.cat}</span>
                      <span className="h-px w-6 bg-ink/20" />
                      <span>{p.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-ink leading-snug">{p.t}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{p.d}</p>
                    <div className="mt-5 text-xs text-ink-soft">{p.read}</div>
                  </>
                );

                return p.slug ? (
                  <Link
                    key={p.t}
                    to="/blogs/$slug"
                    params={{ slug: p.slug }}
                    className="group rounded-3xl border border-border bg-white p-7 hover:-translate-y-1 hover:shadow-elegant transition-all duration-500"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <a
                    key={p.t}
                    href="#"
                    className="group rounded-3xl border border-border bg-white p-7 hover:-translate-y-1 hover:shadow-elegant transition-all duration-500"
                  >
                    {cardContent}
                  </a>
                );
              })}
            </div>
          </Container>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

/* ─── Featured Card Inner Content ─── */
function FeaturedCardInner({ hero }: { hero: PostEntry }) {
  return (
    <div className="grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          <span>Featured · {hero.cat}</span>
          <span className="h-px w-8 bg-ink/20" />
          <span>{hero.date}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-[48px] font-semibold leading-[1.05] tracking-tight text-balance text-ink">
          {hero.t}
        </h2>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-2xl">{hero.d}</p>
        <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Read article{" "}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border/20 shadow-elegant relative">
          {hero.image ? (
            <img
              src={hero.image}
              alt={hero.t}
              className="size-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="size-full bg-gradient-brand scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-90" />
          )}
        </div>
      </div>
    </div>
  );
}
