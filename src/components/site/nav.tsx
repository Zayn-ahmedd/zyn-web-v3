import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Megaphone,
  Target,
  Award,
  Briefcase,
  MessageSquare,
  Landmark,
  Globe,
  Rocket,
  BookOpen,
  FileText,
  Download,
} from "lucide-react";
import logo from "@/assets/zynovax-logo.png";
import { Container, PrimaryButton } from "./primitives";
import { cn } from "@/lib/utils";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

interface SubLink {
  title: string;
  subtitle: string;
  to: string;
  params?: Record<string, string>;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  to?: string;
  hasDropdown?: boolean;
  subLinks?: SubLink[];
}

const navigationData: NavItem[] = [
  {
    name: "Our Services",
    hasDropdown: true,
    subLinks: [
      {
        title: "Visual Identity",
        subtitle: "Identity systems that earn premium perception.",
        to: "/services/$slug",
        params: { slug: "visual-identity" },
        icon: Sparkles,
      },
      {
        title: "Social Media Management",
        subtitle: "Social as a growth channel, not a chore.",
        to: "/services/$slug",
        params: { slug: "social-media-management" },
        icon: Megaphone,
      },
      {
        title: "Performance Marketing",
        subtitle: "Predictable leads and revenue, on tap.",
        to: "/services/$slug",
        params: { slug: "performance-marketing" },
        icon: Target,
      },
    ],
  },
  {
    name: "Showcase",
    hasDropdown: true,
    subLinks: [
      {
        title: "Success Stories",
        subtitle: "Deep-dive business transformations",
        to: "/success-stories",
        icon: Award,
      },
      {
        title: "Works",
        subtitle: "Explore our global client rollouts",
        to: "/works",
        icon: Briefcase,
      },
      {
        title: "Testimonials",
        subtitle: "What ambitious founders say about us",
        to: "/testimonials",
        icon: MessageSquare,
      },
    ],
  },
  {
    name: "Frontier",
    hasDropdown: true,
    subLinks: [
      {
        title: "Industry",
        subtitle: "Sectors we disrupt and scale",
        to: "/industry",
        icon: Landmark,
      },
      {
        title: "Markets",
        subtitle: "Global target market cross-sections",
        to: "/markets",
        icon: Globe,
      },
      {
        title: "Growth Engine",
        subtitle: "Proprietary digital scale mechanics",
        to: "/growth-engine",
        icon: Rocket,
      },
    ],
  },
  {
    name: "Resources",
    hasDropdown: true,
    subLinks: [
      {
        title: "Blogs",
        subtitle: "Editorial digital growth context",
        to: "/blogs",
        icon: BookOpen,
      },
      {
        title: "Legal Documents",
        subtitle: "Compliance, privacy & terms of service",
        to: "/legal",
        icon: FileText,
      },
      {
        title: "Insights & Playbooks",
        subtitle: "Performance optimization playbooks",
        to: "/insights",
        icon: Download,
      },
    ],
  },
  {
    name: "About",
    to: "/about",
  },
];

function DropdownPanel({ subLinks, onClose }: { subLinks: SubLink[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-full max-w-4xl px-4 z-50"
    >
      <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-neutral-100 dark:border-neutral-800/40 shadow-xl rounded-3xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ring/30 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {subLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  to={link.to}
                  params={link.params}
                  onClick={onClose}
                  className="group relative flex items-start gap-4 p-5 rounded-2xl hover:bg-surface/70 dark:hover:bg-zinc-800/70 transition-all duration-300 border border-transparent hover:border-border hover:shadow-elegant"
                >
                  <div className="size-10 rounded-xl bg-gradient-brand-soft flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="size-5 text-ink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1 group-hover:text-ring transition-colors flex items-center gap-2 text-[15px]">
                      {link.title}
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-ring text-sm"
                      >
                        →
                      </motion.span>
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed text-left">
                      {link.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function SiteNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTabFromPath = (path: string): string | null => {
    if (path.startsWith("/services")) return "Our Services";
    if (path === "/about") return "About";
    if (path === "/contact") return "Contact";
    if (path === "/success-stories" || path === "/works" || path === "/testimonials")
      return "Showcase";
    if (path === "/industry" || path === "/markets" || path === "/growth-engine") return "Frontier";
    if (path === "/blogs" || path === "/legal" || path === "/insights") return "Resources";
    return null;
  };

  const initialActiveTab = getActiveTabFromPath(currentPath);
  const [activeTab, setActiveTab] = useState<string | null>(initialActiveTab);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (isMobileMenuOpen) return;
    if (latest > previous && latest > 120) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(currentPath));
  }, [currentPath]);

  const handleMouseEnter = (name: string, hasDropdown?: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveTab(name);
    if (hasDropdown) {
      setOpenDropdown(name);
    } else {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setActiveTab(getActiveTabFromPath(currentPath));
    }, 150) as unknown as number;
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Framer Motion staggered variants for mobile drawer links
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: 15 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 26 },
    },
  } as const;

  // Helper check if root item is active based on path
  const isRootLinkActive = (item: NavItem) => {
    if (item.hasDropdown) {
      return item.subLinks?.some((link) => {
        if (link.params) {
          return currentPath.includes(link.params.slug);
        }
        return currentPath === link.to;
      });
    }
    return currentPath === item.to;
  };

  // Helper check if submenu link is active based on path
  const isSublinkActive = (link: SubLink) => {
    if (link.params) {
      return currentPath.includes(link.params.slug);
    }
    return currentPath === link.to;
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-110%", opacity: 0 },
      }}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1280px] flex flex-col gap-4 pointer-events-none"
    >
      <div className="pointer-events-auto w-full flex flex-col gap-4">
        {/* Desktop Navigation */}
        <header className="hidden lg:block bg-black/[0.06] dark:bg-black/25 backdrop-blur-xl rounded-full border-none shadow-none w-full">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-16">
            {/* SECTION A: Left Logo */}
            <div className="w-[240px] flex-shrink-0 flex items-center justify-start">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src={logo}
                  alt="Zynovax"
                  className="h-8 w-auto transition-transform group-hover:scale-105"
                  width={32}
                  height={32}
                />
                <span className="text-[17px] font-semibold tracking-tight text-ink group-hover:text-ink/80 transition-colors">
                  Zynovax
                </span>
              </Link>
            </div>

            {/* SECTION B: Centered Navigation */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative">
                <nav
                  aria-label="Main"
                  className="flex items-center gap-x-5 lg:gap-x-6 bg-white/70 dark:bg-zinc-900/70 border border-border/40 backdrop-blur-md py-1.5 px-3 rounded-full shadow-elegant hover:shadow-glow transition-shadow duration-300"
                  onMouseLeave={handleMouseLeave}
                >
                  {navigationData.map((item) => {
                    const isActive = activeTab === item.name;
                    const isCurrent = isRootLinkActive(item);

                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown)}
                        className="relative"
                      >
                        {item.hasDropdown ? (
                          <button
                            aria-haspopup="true"
                            aria-expanded={openDropdown === item.name}
                            className={cn(
                              "relative cursor-pointer whitespace-nowrap text-[13px] font-medium tracking-wide text-neutral-800 dark:text-neutral-200 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 focus:outline-none",
                              "hover:text-black dark:hover:text-white",
                              isActive && "text-ink font-semibold",
                            )}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <ChevronDown
                              size={14}
                              className={cn(
                                "relative z-10 transition-transform duration-300",
                                openDropdown === item.name && "rotate-180",
                              )}
                            />
                            {isActive && (
                              <motion.div
                                layoutId="navbar-indicator"
                                className="absolute inset-0 w-full bg-ink/5 rounded-full"
                                initial={false}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 32,
                                }}
                              >
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-brand rounded-t-full">
                                  <div className="absolute w-16 h-8 bg-gradient-brand/20 rounded-full blur-lg -top-3 -left-3" />
                                  <div className="absolute w-10 h-6 bg-gradient-brand/20 rounded-full blur-md -top-2 -left-1" />
                                </div>
                              </motion.div>
                            )}
                          </button>
                        ) : (
                          <Link
                            to={item.to!}
                            aria-current={isCurrent ? "page" : undefined}
                            className={cn(
                              "relative cursor-pointer whitespace-nowrap text-[13px] font-medium tracking-wide text-neutral-800 dark:text-neutral-200 px-3 py-1.5 rounded-full transition-colors block",
                              "hover:text-black dark:hover:text-white",
                              isActive && "text-ink font-semibold",
                            )}
                          >
                            <span className="relative z-10">{item.name}</span>
                            {isActive && (
                              <motion.div
                                layoutId="navbar-indicator"
                                className="absolute inset-0 w-full bg-ink/5 rounded-full"
                                initial={false}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 32,
                                }}
                              >
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-brand rounded-t-full">
                                  <div className="absolute w-16 h-8 bg-gradient-brand/20 rounded-full blur-lg -top-3 -left-3" />
                                  <div className="absolute w-10 h-6 bg-gradient-brand/20 rounded-full blur-md -top-2 -left-1" />
                                </div>
                              </motion.div>
                            )}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                <AnimatePresence>
                  {openDropdown && (
                    <div onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleMouseLeave}>
                      <DropdownPanel
                        subLinks={
                          navigationData.find((item) => item.name === openDropdown)?.subLinks || []
                        }
                        onClose={() => setOpenDropdown(null)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SECTION C: Right CTA Buttons */}
            <div className="w-[310px] flex-shrink-0 flex items-center justify-end gap-x-2">
              {/* Enquiry Call — triggers phone dialer */}
              <LiquidMetalButton
                label="Enquiry Call"
                width={134}
                onClick={() => {
                  window.location.href = "tel:+917338898638";
                }}
              />
              {/* Book Strategy Call — navigates to contact form */}
              <LiquidMetalButton
                label="Book Strategy Call"
                width={162}
                onClick={() => {
                  window.location.href = "/contact";
                }}
              />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Header */}
        <header className="lg:hidden bg-black/[0.06] dark:bg-black/25 backdrop-blur-xl rounded-2xl border-none shadow-none">
          <div className="flex items-center justify-between px-6 py-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Zynovax" className="h-8 w-auto" width={32} height={32} />
              <span className="text-[17px] font-semibold tracking-tight text-ink">Zynovax</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-surface border border-transparent hover:border-border transition-colors text-ink focus:outline-none z-50 relative flex items-center justify-center size-10"
              aria-label="Toggle Menu"
            >
              {/* Morphing Hamburger Menu Animation using Framer Motion */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-ink">
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={isMobileMenuOpen ? { d: "M 3 17 L 17 3" } : { d: "M 3 5 L 17 5" }}
                  transition={{ duration: 0.25 }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  d="M 3 10 L 17 10"
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={isMobileMenuOpen ? { d: "M 3 3 L 17 17" } : { d: "M 3 15 L 17 15" }}
                  transition={{ duration: 0.25 }}
                />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Fullscreen Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Premium Right-Side Slide-in Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 280 }}
                  className="fixed top-0 right-0 z-40 h-screen w-full max-w-[340px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-l border-border shadow-glow flex flex-col"
                >
                  {/* Header padding space inside drawer to align with header bar */}
                  <div className="h-[72px] shrink-0 border-b border-border/40 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={logo} alt="Zynovax" className="h-8 w-auto" width={32} height={32} />
                      <span className="text-[17px] font-semibold tracking-tight text-ink">
                        Zynovax
                      </span>
                    </div>
                  </div>

                  {/* Staggered items container */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex-1 overflow-y-auto px-6 py-6 space-y-1.5"
                  >
                    {navigationData.map((item) => {
                      const isGroupActive = isRootLinkActive(item);

                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          className="text-left border-b border-border/40 pb-3 last:border-0 last:pb-0"
                        >
                          {item.hasDropdown ? (
                            <div>
                              <button
                                onClick={() =>
                                  setMobileActiveAccordion(
                                    mobileActiveAccordion === item.name ? null : item.name,
                                  )
                                }
                                className="w-full flex items-center justify-between py-2.5 text-ink font-medium text-[15px] focus:outline-none group"
                              >
                                <div className="flex items-center gap-2">
                                  {isGroupActive && (
                                    <span className="size-1.5 rounded-full bg-gradient-brand shrink-0" />
                                  )}
                                  <span
                                    className={cn(
                                      "transition-colors",
                                      isGroupActive
                                        ? "text-ink font-semibold"
                                        : "text-ink-soft group-hover:text-ink",
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                                <ChevronDown
                                  size={16}
                                  className={cn(
                                    "text-ink-soft transition-transform duration-300",
                                    mobileActiveAccordion === item.name && "rotate-180",
                                  )}
                                />
                              </button>

                              <AnimatePresence>
                                {mobileActiveAccordion === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden pl-3.5 space-y-1 mt-1 flex flex-col border-l border-border/50"
                                  >
                                    {item.subLinks?.map((link) => {
                                      const SubIcon = link.icon;
                                      const isActive = isSublinkActive(link);

                                      return (
                                        <Link
                                          key={link.title}
                                          to={link.to}
                                          params={link.params}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={cn(
                                            "flex items-start gap-3 rounded-xl p-2.5 transition-colors border border-transparent",
                                            isActive
                                              ? "bg-surface/80 border-border/60 shadow-elegant"
                                              : "hover:bg-surface",
                                          )}
                                        >
                                          <div className="size-8 rounded-lg bg-gradient-brand-soft flex items-center justify-center shrink-0">
                                            <SubIcon className="size-3.5 text-ink" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                                              {link.title}
                                              {isActive && (
                                                <span className="size-1.5 rounded-full bg-gradient-brand shrink-0" />
                                              )}
                                            </div>
                                            <div className="text-xs text-ink-soft mt-0.5 leading-snug">
                                              {link.subtitle}
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              to={item.to!}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2.5 text-ink font-medium text-[15px] group"
                            >
                              {isGroupActive && (
                                <span className="size-1.5 rounded-full bg-gradient-brand shrink-0" />
                              )}
                              <span
                                className={cn(
                                  "transition-colors",
                                  isGroupActive
                                    ? "text-ink font-semibold"
                                    : "text-ink-soft group-hover:text-ink",
                                )}
                              >
                                {item.name}
                              </span>
                            </Link>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Mobile CTA Buttons inside Stagger List */}
                    <motion.div
                      variants={itemVariants}
                      className="pt-4 flex flex-col gap-3 items-stretch"
                    >
                      {/* Enquiry Call */}
                      <div className="flex justify-center">
                        <LiquidMetalButton
                          label="Enquiry Call"
                          width={160}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.location.href = "tel:+917338898638";
                          }}
                        />
                      </div>
                      {/* Book Strategy Call */}
                      <div className="flex justify-center">
                        <LiquidMetalButton
                          label="Book Strategy Call"
                          width={180}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.location.href = "/contact";
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Footer inside Stagger List */}
                    <motion.div
                      variants={itemVariants}
                      className="pt-6 mt-6 border-t border-border/40 text-center"
                    >
                      <p className="text-[11px] text-ink-soft font-medium">
                        Borders are imaginary; your scale is absolute.
                      </p>
                      <p className="text-[10px] text-ink-soft/75 mt-1.5">
                        © 2025-2026 Zynovax. All rights reserved.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </header>
      </div>
    </motion.div>
  );
}
