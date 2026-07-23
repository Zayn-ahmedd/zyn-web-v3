import { Link } from "@tanstack/react-router";
import logo from "@/assets/zynovax-logo.png";
import { Container } from "./primitives";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Youtube, ChevronDown, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo/seo-config";

// WhatsApp Premium Custom SVG Brand Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function SiteFooter() {
  const [footerShowcaseOpen, setFooterShowcaseOpen] = useState(true);
  const [footerFrontierOpen, setFooterFrontierOpen] = useState(true);
  const [footerResourcesOpen, setFooterResourcesOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setFooterShowcaseOpen(false);
      setFooterFrontierOpen(false);
      setFooterResourcesOpen(false);
    }
  }, []);

  return (
    <footer className="bg-surface border-t border-border">
      <Container className="py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Zynovax" className="h-8 w-auto" width={32} height={32} />
              <span className="text-lg font-semibold text-ink">Zynovax</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-soft leading-relaxed">
              Creative Branding & Digital Marketing. Visual identity, social media management, and
              performance marketing — engineered into one connected system.
            </p>
            <div className="mt-6 space-y-2 text-xs text-ink-soft">
              <div>
                <strong className="text-ink font-semibold">HQ:</strong> Chennai, India
              </div>
              <div>
                <strong className="text-ink font-semibold">Footprint:</strong> USA · Canada ·
                Australia · UK · UAE · India
              </div>
              <div className="pt-1 flex items-center gap-1.5 hover:text-ink transition-colors">
                <Mail className="size-3.5 text-ink" />
                <a href="mailto:info@zynovax.in">info@zynovax.in</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col items-start text-left w-full">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-5">
              Company
            </div>
            <ul className="w-full space-y-3.5 text-sm text-ink-soft flex flex-col items-start">
              <li className="w-full flex justify-start">
                <Link
                  to="/about"
                  className="hover:text-ink transition-colors py-1.5 block w-full text-left"
                >
                  About
                </Link>
              </li>

              <li className="w-full">
                <button
                  onClick={() => setFooterShowcaseOpen(!footerShowcaseOpen)}
                  className="w-full flex items-center justify-between gap-1.5 text-left hover:text-ink transition-colors focus:outline-none cursor-pointer py-1.5"
                >
                  <span>Showcase</span>
                  <ChevronDown
                    className={`size-3.5 text-ink-soft transition-transform duration-300 ${footerShowcaseOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-start gap-3 w-full pl-4 border-l border-border/40 ${
                    footerShowcaseOpen
                      ? "max-h-[200px] opacity-100 mt-2.5"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/success-stories"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Success Stories
                  </Link>
                  <Link
                    to="/works"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Works
                  </Link>
                  <Link
                    to="/testimonials"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Testimonials
                  </Link>
                </div>
              </li>

              <li className="w-full">
                <button
                  onClick={() => setFooterFrontierOpen(!footerFrontierOpen)}
                  className="w-full flex items-center justify-between gap-1.5 text-left hover:text-ink transition-colors focus:outline-none cursor-pointer py-1.5"
                >
                  <span>Frontier</span>
                  <ChevronDown
                    className={`size-3.5 text-ink-soft transition-transform duration-300 ${footerFrontierOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-start gap-3 w-full pl-4 border-l border-border/40 ${
                    footerFrontierOpen
                      ? "max-h-[200px] opacity-100 mt-2.5"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/industry"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Industry
                  </Link>
                  <Link
                    to="/markets"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Markets
                  </Link>
                  <Link
                    to="/growth-engine"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Growth Engine
                  </Link>
                </div>
              </li>

              <li className="w-full">
                <button
                  onClick={() => setFooterResourcesOpen(!footerResourcesOpen)}
                  className="w-full flex items-center justify-between gap-1.5 text-left hover:text-ink transition-colors focus:outline-none cursor-pointer py-1.5"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`size-3.5 text-ink-soft transition-transform duration-300 ${footerResourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-start gap-3 w-full pl-4 border-l border-border/40 ${
                    footerResourcesOpen
                      ? "max-h-[200px] opacity-100 mt-2.5"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/blogs"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Blogs
                  </Link>
                  <Link
                    to="/legal"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Legal Documents
                  </Link>
                  <Link
                    to="/insights"
                    className="text-sm text-ink-soft hover:text-ink transition-colors py-1 block w-full text-left"
                  >
                    Insights & Playbooks
                  </Link>
                </div>
              </li>

              <li className="w-full flex justify-start">
                <Link
                  to="/contact"
                  className="hover:text-ink transition-colors py-1.5 block w-full text-left"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col items-center text-center justify-center md:flex-row md:items-center md:justify-between md:text-left gap-6 text-xs text-ink-soft w-full">
          <div>© 2025-{new Date().getFullYear()} Zynovax. All rights reserved.</div>

          {/* Social Profiles List (Instagram, Facebook, LinkedIn, YouTube, WhatsApp) */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="YouTube"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href="https://wa.me/917338898638"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="size-4" />
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-6">
            <a href="#" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Security
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
