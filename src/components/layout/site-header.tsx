"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useUiStore } from "@/store/use-ui-store";
import { WMonogram } from "@/components/ui/w-monogram";
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
          background: scrolled && !isNavigationOpen
            ? "hsl(var(--background) / 0.82)"
            : "transparent",
          backdropFilter: scrolled && !isNavigationOpen ? "blur(8px)" : "none",
          transition: "border-color 0.6s ease, background-color 0.6s ease, backdrop-filter 0.6s ease",
        }}
      >
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-8 md:h-16 md:px-16 lg:px-24">
          {/* Logo mark */}
          <Link
            href="/"
            className="-m-2 p-2 transition-opacity duration-500 hover:opacity-60"
            aria-label="W.VIANA — Início"
          >
            <WMonogram
              size={28}
              color={isNavigationOpen ? "hsl(0 0% 100%)" : "hsl(var(--accent))"}
            />
          </Link>

          {/* Menu trigger */}
          <button
            onClick={toggleNavigation}
            type="button"
            id="site-navigation-trigger"
            className="-m-2 p-2 text-micro uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: isNavigationOpen ? "hsl(0 0% 100%)" : "hsl(var(--accent))" }}
            aria-label={isNavigationOpen ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={isNavigationOpen}
            aria-controls="site-navigation-drawer"
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
