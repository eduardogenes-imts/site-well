"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "@/lib/gsap";
import { useUiStore } from "@/store/use-ui-store";

const navItems = [
  { href: "/works", label: "Projetos", index: "01" },
  { href: "/process", label: "Processo", index: "02" },
  { href: "/studio", label: "Estudio", index: "03" },
  { href: "/contact", label: "Contato", index: "04" },
];

export function NavigationDrawer() {
  const pathname = usePathname();
  const isOpen = useUiStore((s) => s.isNavigationOpen);
  const setNavigationOpen = useUiStore((s) => s.setNavigationOpen);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Close on navigation
  useEffect(() => {
    setNavigationOpen(false);
  }, [pathname, setNavigationOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animate open/close
  useEffect(() => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    const links = linksRef.current;
    if (!backdrop || !content || !links) return;

    const items = links.querySelectorAll<HTMLElement>(".nav-link-item");

    if (isOpen) {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.set(backdrop, { display: "block" })
        .fromTo(
          backdrop,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.7 },
        )
        .fromTo(
          items,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3",
        );
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(backdrop, { display: "none" });
        },
      });
      tl.to(items, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      }).to(backdrop, { xPercent: 100, duration: 0.6 }, "-=0.1");
    }
  }, [isOpen]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9998] bg-foreground"
      style={{ display: "none" }}
      aria-hidden={!isOpen}
    >
      <div
        ref={contentRef}
        className="flex h-full flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <nav ref={linksRef} className="space-y-3 md:space-y-4">
          {navItems.map((item) => (
            <div key={item.href} className="nav-link-item flex items-baseline gap-5">
              <span
                className="text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                {item.index}
              </span>
              <Link
                href={item.href}
                className="font-extralight text-white transition-opacity hover:opacity-60"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: "1.1" }}
                onClick={() => setNavigationOpen(false)}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Footer info */}
        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-center md:gap-12">
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            contato@wviana.arq.br
          </span>
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.5)" }}
          >
            Instagram
          </span>
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.5)" }}
          >
            Behance
          </span>
        </div>
      </div>
    </div>
  );
}
