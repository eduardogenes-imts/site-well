"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const sectionLabels: Record<string, { text: string; href: string }> = {
  hero: { text: "Explorar · Saiba mais +", href: "/works" },
  studio: { text: "Estúdio · Saiba mais +", href: "/studio" },
  vision: { text: "Visão · Saiba mais +", href: "/process" },
  gallery: { text: "Todos os Projetos +", href: "/works" },
  projects: { text: "Projetos · Saiba mais +", href: "/works" },
};

export function FloatingCta() {
  const [label, setLabel] = useState(sectionLabels.hero);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const detectSection = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      const viewportMiddle = window.innerHeight / 2;

      let closest: { name: string; distance: number } | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < viewportMiddle && rect.bottom > 0) {
          const distance = Math.abs(rect.top);
          if (!closest || distance < closest.distance) {
            closest = { name: section.dataset.section ?? "hero", distance };
          }
        }
      });

      if (closest) {
        const match = sectionLabels[(closest as { name: string; distance: number }).name];
        if (match) setLabel(match);
      }

      setVisible(window.scrollY > 100);
    };

    detectSection();
    window.addEventListener("scroll", detectSection, { passive: true });
    return () => window.removeEventListener("scroll", detectSection);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Link
      href={label.href}
      className={`fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-500 hover:bg-foreground/90 hover:shadow-xl ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {label.text}
    </Link>,
    document.body,
  );
}
