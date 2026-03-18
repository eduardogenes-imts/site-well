"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUiStore } from "@/store/use-ui-store";

const navLinks = [
  { href: "/works", label: "Projetos" },
  { href: "/process", label: "Processo" },
  { href: "/studio", label: "Estúdio" },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo",
      });
      setTime(formatted.toUpperCase());
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || "--:--"}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOverHero, setIsOverHero] = useState(true);
  const [mounted, setMounted] = useState(false);
  const isMobileMenuOpen = useUiStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleScroll = useCallback(() => {
    setIsOverHero(window.scrollY < window.innerHeight * 0.85);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isTransparent = isOverHero && !isMobileMenuOpen;

  const headerContent = (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/40 backdrop-blur-2xl backdrop-saturate-200 border-b border-white/30"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-6 md:h-20 md:px-10 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 md:text-xs ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
        >
          W.VIANA
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Clock + Location + Contact */}
        <div className="flex items-center gap-6">
          <div
            className={`hidden items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 lg:flex ${
              isTransparent ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            <LiveClock />
            <span>Brasil</span>
          </div>

          <Link
            href="/contact"
            className={`hidden text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 md:block ${
              isTransparent
                ? "text-white/80 hover:text-white"
                : "text-foreground hover:text-muted-foreground"
            }`}
          >
            Contato
          </Link>

          <button
            onClick={toggleMobileMenu}
            className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 md:hidden ${
              isTransparent ? "text-white" : "text-foreground"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="absolute inset-x-0 top-full min-h-[calc(100dvh-4rem)] bg-white p-8">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-3xl font-semibold tracking-[-0.01em] transition-opacity hover:opacity-60 ${
                    pathname === link.href ? "text-foreground" : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-3xl font-semibold tracking-[-0.01em] text-foreground/80 transition-opacity hover:opacity-60"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </li>
          </ul>

          <div className="mt-10 border-t border-border/50 pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <LiveClock /> &middot; Brasil
            </p>
          </div>
        </nav>
      )}
    </header>
  );

  if (!mounted) return null;

  return createPortal(headerContent, document.body);
}
