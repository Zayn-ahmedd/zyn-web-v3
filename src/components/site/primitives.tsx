import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 lg:px-10 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft shadow-elegant">
      <span className="size-1.5 rounded-full bg-gradient-brand" />
      {children}
    </div>
  );
}

export function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
      <span className="font-display italic text-ink">{no}</span>
      <span className="h-px w-8 bg-ink/20" />
      {label}
    </div>
  );
}

type LinkLike = { to: string; params?: Record<string, string> } | { href: string };

function isInternal(target: LinkLike): target is { to: string; params?: Record<string, string> } {
  return "to" in target;
}

export function PrimaryButton({
  children,
  to = "/contact",
  params,
  href,
}: {
  children: ReactNode;
  to?: string;
  params?: Record<string, string>;
  href?: string;
}) {
  const cls =
    "group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px] border border-transparent bg-ink px-6 py-3.5 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-ink hover:rounded-[12px] active:scale-[0.95] hover:-translate-y-0.5 hover:shadow-glow";

  const inner = (
    <>
      <ArrowRight className="absolute w-4 h-4 left-[-25%] stroke-white fill-none z-10 group-hover:left-4 group-hover:stroke-black transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
      <span className="relative z-10 transition-all duration-[800ms] ease-out group-hover:translate-x-4">
        {children}
      </span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
      <ArrowRight className="absolute w-4 h-4 right-4 stroke-white fill-none z-10 group-hover:right-[-25%] group-hover:stroke-black transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </>
  );

  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <Link to={to} params={params} className={cls}>
      {inner}
    </Link>
  );
}

export function GhostButton({
  children,
  to = "/stories",
  params,
  href,
}: {
  children: ReactNode;
  to?: string;
  params?: Record<string, string>;
  href?: string;
}) {
  const cls =
    "group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px] border border-[#333333]/30 bg-white/80 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-ink cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95] hover:-translate-y-0.5 shadow-elegant";

  const inner = (
    <>
      <ArrowUpRight className="absolute w-4 h-4 left-[-25%] stroke-[#111111] fill-none z-10 group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
      <span className="relative z-10 transition-all duration-[800ms] ease-out group-hover:translate-x-4">
        {children}
      </span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ink rounded-full opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
      <ArrowUpRight className="absolute w-4 h-4 right-4 stroke-[#111111] fill-none z-10 group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </>
  );

  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <Link to={to} params={params} className={cls}>
      {inner}
    </Link>
  );
}

export type _LinkLikeUnused = LinkLike;
export const _isInternalUnused = isInternal;
