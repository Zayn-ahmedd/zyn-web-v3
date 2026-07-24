import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Container, Eyebrow } from "@/components/site/primitives";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { getBlogPost, blogPosts, type BlogSection } from "@/data/blog-posts";
import { generatePageHead } from "@/lib/seo/metadata";
import { articleSchema, faqSchema, webPageSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { slug: post.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = getBlogPost(loaderData.slug);
    if (!post) return {};
    return generatePageHead({
      title: post.metaTitle,
      description: post.metaDescription,
      path: `/blogs/${post.slug}`,
      ogType: "article",
      publishedTime: post.dateISO,
      modifiedTime: post.dateISO,
      keywords: post.keywords,
    });
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-ink">Article not found</h1>
        <Link to="/blogs" className="mt-4 inline-block text-ink-soft hover:text-ink">
          ← Back to all articles
        </Link>
      </div>
    </div>
  ),
});

/* ─── Section Renderers ─── */

function RenderSection({ section, index }: { section: BlogSection; index: number }) {
  switch (section.type) {
    case "heading2":
      return (
        <h2
          id={slugify(section.content ?? "")}
          className="mt-16 mb-6 text-3xl sm:text-4xl font-semibold text-ink leading-[1.1] tracking-tight scroll-mt-24"
        >
          {section.content}
        </h2>
      );
    case "heading3":
      return (
        <h3 className="mt-10 mb-4 text-2xl font-semibold text-ink leading-tight">
          {section.content}
        </h3>
      );
    case "heading4":
      return (
        <h4 className="mt-8 mb-3 text-lg font-semibold text-ink leading-snug">
          {section.content}
        </h4>
      );
    case "paragraph":
      return (
        <p
          className="my-5 text-[16px] sm:text-[17px] text-ink-soft leading-[1.75]"
          dangerouslySetInnerHTML={{ __html: section.content ?? "" }}
        />
      );
    case "list":
      return (
        <ul className="my-5 space-y-2.5 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-[16px] sm:text-[17px] text-ink-soft leading-[1.7]">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <ul className="my-5 space-y-2 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-[16px] sm:text-[17px] text-ink-soft leading-[1.7]">
              <span className="mt-1 size-4 shrink-0 rounded border border-border" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote className="my-8 border-l-[3px] border-ink/20 pl-6 py-1">
          <p
            className="text-[16px] text-ink-soft leading-[1.7] italic"
            dangerouslySetInnerHTML={{ __html: section.content ?? "" }}
          />
        </blockquote>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            {section.headers && (
              <thead>
                <tr className="bg-surface">
                  {section.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-3.5 text-left text-[11px] uppercase tracking-[0.18em] font-semibold text-ink border-b border-border"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} className="border-b border-border/60 last:border-b-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 text-ink-soft leading-relaxed ${ci === 0 ? "font-medium text-ink" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div className="my-10 rounded-2xl border border-border bg-surface p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-[15px] text-ink font-medium leading-snug max-w-md">
            {section.content}
          </p>
          <Link
            to={section.link ?? "/contact"}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-ink text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:shadow-glow transition-all duration-300 shrink-0"
          >
            {section.linkText ?? "Learn More"}{" "}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/* ─── Table of Contents ─── */

function TableOfContents({ sections }: { sections: BlogSection[] }) {
  const headings = sections.filter((s) => s.type === "heading2" && s.content);
  if (headings.length === 0) return null;

  return (
    <nav className="my-10 rounded-2xl border border-border bg-surface p-7">
      <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-semibold mb-4">
        In this article
      </div>
      <ol className="space-y-2.5">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${slugify(h.content ?? "")}`}
              className="flex items-center gap-2.5 text-[14px] text-ink-soft hover:text-ink transition-colors leading-snug"
            >
              <span className="font-display italic text-ink/40 text-xs w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              {h.content}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Main Page ─── */

function BlogPostPage() {
  const { slug } = Route.useLoaderData();
  const post = getBlogPost(slug)!;

  // Get related posts (exclude current)
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-white" id="main-content">
      {/* Structured Data */}
      <JsonLd
        data={[
          webPageSchema({
            title: post.metaTitle,
            description: post.metaDescription,
            path: `/blogs/${post.slug}`,
            datePublished: post.dateISO,
            dateModified: post.dateISO,
          }),
          articleSchema({
            title: post.title,
            description: post.description,
            path: `/blogs/${post.slug}`,
            datePublished: post.dateISO,
            dateModified: post.dateISO,
            author: post.author,
          }),
          faqSchema(
            post.faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />
      <SiteNav />

      <div className="animate-slide-down-page">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-40 -z-10 h-[480px] bg-gradient-brand-soft opacity-70 blur-3xl" />
          <Container className="pt-20 pb-10 lg:pt-28 lg:pb-14">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
                { name: post.title.length > 50 ? post.title.substring(0, 50) + "…" : post.title, path: `/blogs/${post.slug}` },
              ]}
              className="mb-8"
            />
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors mb-7"
            >
              <ArrowLeft className="size-3.5" />
              All articles
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <Eyebrow>{post.category}</Eyebrow>
            </div>
            <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-[56px] font-semibold leading-[1.04] tracking-[-0.03em] text-ink text-balance">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-[1.55]">
              {post.description}
            </p>

            {/* Meta row */}
            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-ink-soft border-t border-border pt-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readTime}
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border font-medium">
                {post.author}
              </div>
            </div>

            {/* Featured Hero Image */}
            {post.image && (
              <div className="mt-10 aspect-[16/9] sm:aspect-[21/9] rounded-[24px] overflow-hidden border border-border/20 shadow-elegant">
                <img
                  src={post.image}
                  alt={post.title}
                  className="size-full object-cover object-center"
                />
              </div>
            )}
          </Container>
        </section>

        {/* Article Body */}
        <section className="bg-white pb-24 lg:pb-32">
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Table of Contents */}
              <TableOfContents sections={post.content} />

              {/* Content sections */}
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} index={i} />
              ))}

              {/* Divider */}
              <div className="my-16 h-px bg-border" />

              {/* FAQ Section */}
              {post.faqs.length > 0 && (
                <div>
                  <h2 className="text-3xl font-semibold text-ink mb-8 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group rounded-2xl border border-border bg-white hover:shadow-elegant transition-shadow duration-300"
                      >
                        <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[15px] font-semibold text-ink leading-snug list-none [&::-webkit-details-marker]:hidden">
                          {faq.question}
                          <ChevronRight className="size-4 text-ink-soft shrink-0 ml-4 transition-transform duration-300 group-open:rotate-90" />
                        </summary>
                        <div className="px-6 pb-5 text-[15px] text-ink-soft leading-[1.7]">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="mt-16 rounded-[28px] border border-border bg-surface p-8 sm:p-12 text-center">
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-semibold mb-4">
                  Ready to get started?
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-tight">
                  Build a brand strategy that{" "}
                  <span className="font-display italic font-normal text-gradient-brand">
                    drives revenue.
                  </span>
                </h3>
                <p className="mt-4 text-[15px] text-ink-soft leading-relaxed max-w-lg mx-auto">
                  Book a free strategy consultation with the ZYNOVAX team. We'll
                  run a brand audit, identify the gaps, and give you a clear
                  roadmap.
                </p>
                <div className="mt-8 flex justify-center">
                  <LiquidMetalButton
                    label="Book Strategy Call"
                    width={180}
                    onClick={() => {
                      window.location.href = "/contact";
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="bg-surface py-20 lg:py-28">
            <Container>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft mb-10">
                <span className="font-display italic text-ink">·</span>
                <span className="h-px w-8 bg-ink/20" />
                More articles
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blogs/$slug"
                    params={{ slug: p.slug }}
                    className="group rounded-3xl border border-border bg-white p-7 hover:-translate-y-1 hover:shadow-elegant transition-all duration-500"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gradient-brand-soft border border-border/10 mb-7">
                      <div className="size-full bg-gradient-brand-soft scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      <span>{p.category}</span>
                      <span className="h-px w-6 bg-ink/20" />
                      <span>{p.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-ink leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                    <div className="mt-5 text-xs text-ink-soft">{p.readTime}</div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        <SiteFooter />
      </div>
    </main>
  );
}
