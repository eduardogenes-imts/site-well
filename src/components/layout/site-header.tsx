"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useUiStore } from "@/store/use-ui-store";
import { NavigationDrawer } from "./navigation-drawer";

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isNavigationOpen = useUiStore((s) => s.isNavigationOpen);
  const toggleNavigation = useUiStore((s) => s.toggleNavigation);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const headerContent = (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[9999]"
        style={{
          borderBottom: scrolled && !isNavigationOpen
            ? "1px solid hsl(var(--accent) / 0.2)"
            : "1px solid transparent",
          transition: "border-color 0.6s ease",
        }}
      >
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-8 md:h-16 md:px-16 lg:px-24">
          {/* Logo mark */}
          <Link
            href="/"
            className="text-micro uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: "hsl(var(--accent))" }}
          >
            W.
          </Link>

          {/* Menu trigger */}
          <button
            onClick={toggleNavigation}
            className="text-micro uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: "hsl(var(--accent))" }}
            aria-label={isNavigationOpen ? "Fechar navegacao" : "Abrir navegacao"}
          >
            {isNavigationOpen ? "[Fechar]" : "[Index]"}
          </button>
        </div>
      </header>

      <NavigationDrawer />
    </>
  );

  if (!mounted) return null;

  return createPortal(headerContent, document.body);
}
