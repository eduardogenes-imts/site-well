"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sectionLabels: Record<string, { text: string; href: string }> = {
  hero: { text: "Explore · Discover +", href: "/works" },
  studio: { text: "Studio · Discover +", href: "/studio" },
  vision: { text: "Vision · Discover +", href: "/process" },
  gallery: { text: "All Work · Discover +", href: "/works" },
  projects: { text: "Projects · Discover +", href: "/works" },
};

export function FloatingCta() {
  const [label, setLabel] = useState(sectionLabels.hero);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = (entry.target as HTMLElement).dataset.section ?? "hero";
            const match = sectionLabels[name];
            if (match) setLabel(match);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));

    // Show after scrolling past hero
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link
      href={label.href}
      className={`fixed bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-500 hover:bg-foreground/90 hover:shadow-xl ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {label.text}
    </Link>
  );
}
