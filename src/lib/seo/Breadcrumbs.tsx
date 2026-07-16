/**
 * Zynovax — Breadcrumbs Component
 * Accessible semantic <nav> with BreadcrumbList JSON-LD schema.
 */

import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "./schemas";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Renders visual breadcrumbs + BreadcrumbList JSON-LD schema.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[
 *   { name: "Home", path: "/" },
 *   { name: "Services", path: "/services" },
 *   { name: "Visual Identity", path: "/services/visual-identity" },
 * ]} />
 * ```
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-ink-soft ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-ink font-medium">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      to={item.path}
                      className="hover:text-ink transition-colors"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="size-3 text-ink-soft/50" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
