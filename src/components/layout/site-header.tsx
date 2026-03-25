"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useUiStore } from "@/store/use-ui-store";
import { WMonogram } from "@/components/ui/w-monogram";
import { NavigationDrawer } from "./navigation-drawer";

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerDarkProgress, setFooterDarkProgress] = useState(0);
  const isNavigationOpen = useUiStore((s) => s.isNavigationOpen);
  const toggleNavigation = useUiStore((s) => s.toggleNavigation);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const readInitialProgress = () => {
      const initialProgress = Number(
        getComputedStyle(document.documentElement).getPropertyValue("--footer-dark-progress") ||
          "0",
      );
      if (!Number.isNaN(initialProgress)) {
        setFooterDarkProgress(initialProgress);
      }
    };

    readInitialProgress();

    const onFooterThemeProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ progress: number }>;
      const progress = customEvent.detail?.progress ?? 0;
      setFooterDarkProgress(progress);
    };

    window.addEventListener("footer-theme-progress", onFooterThemeProgress as EventListener);

    return () => {
      window.removeEventListener("footer-theme-progress", onFooterThemeProgress as EventListener);
    };
  }, []);

  const useLightForeground = isNavigationOpen || footerDarkProgress > 0.01;
  const interactiveColor = useLightForeground ? "hsl(0 0% 100%)" : "hsl(var(--accent))";

  const headerContent = (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[9999]"
        style={{
          borderBottom: scrolled && !isNavigationOpen
            ? useLightForeground
              ? "1px solid hsl(0 0% 100% / 0.18)"
              : "1px solid hsl(var(--accent) / 0.2)"
            : "1px solid transparent",
          background: scrolled && !isNavigationOpen
            ? useLightForeground
              ? "hsl(var(--foreground) / 0.72)"
              : "hsl(var(--background) / 0.82)"
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
              color={interactiveColor}
            />
          </Link>

          {/* Menu trigger */}
          <button
            onClick={toggleNavigation}
            type="button"
            id="site-navigation-trigger"
            className="-m-2 p-2 text-micro uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: interactiveColor }}
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
