"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/use-ui-store";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 24);

      if (isMobileMenuOpen) {
        setIsHidden(false);
        return;
      }

      const scrollingDown = currentY > lastY;
      setIsHidden(scrollingDown && currentY > 140);

      lastY = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto mt-3 w-[min(1280px,calc(100%-2rem))] transition-all duration-700 md:mt-4 ${
          isScrolled || isMobileMenuOpen
            ? "border border-border/60 bg-background/92 backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs">
          Site Well
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="h-9 px-3"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? (
              <>
                <X className="size-4" />
                <span className="text-[10px] uppercase tracking-[0.18em]">Close</span>
              </>
            ) : (
              <>
                <Menu className="size-4" />
                <span className="text-[10px] uppercase tracking-[0.18em]">Menu</span>
              </>
            )}
          </Button>
        </div>
      </div>
      </div>

      {isMobileMenuOpen ? (
        <nav className="mx-auto mt-3 grid min-h-[calc(100dvh-6.5rem)] w-[min(1280px,calc(100%-2rem))] grid-rows-[1fr_auto] border border-border/60 bg-background/98 p-8 backdrop-blur-xl md:mt-4 md:p-12">
          <ul className="flex flex-col justify-center gap-5 md:gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-2xl font-semibold tracking-[-0.01em] transition-opacity hover:opacity-60 md:text-4xl ${
                    pathname === link.href ? "text-foreground" : "text-foreground/86"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid gap-3 border-t border-border/70 pt-6 md:grid-cols-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              contact@sitewell.dev
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-foreground md:justify-self-end"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}