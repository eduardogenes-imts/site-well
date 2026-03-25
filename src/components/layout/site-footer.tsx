"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const main = document.querySelector("main");
      const backgrounds = Array.from(
        document.querySelectorAll<HTMLElement>(".bg-background"),
      );
      const bgTargets = [document.body, ...(main ? [main] : []), ...backgrounds];

      const primaryText = Array.from(
        footer.querySelectorAll<HTMLElement>(".footer-primary-text"),
      );

      const setProgress = (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const bgLightness = 97 * (1 - clamped);
        const textLightness = 100 * clamped;

        const bgColor = `hsl(0 0% ${bgLightness}%)`;
        const textColor = `hsl(0 0% ${textLightness}%)`;

        bgTargets.forEach((el) => {
          el.style.backgroundColor = bgColor;
        });

        primaryText.forEach((el) => {
          el.style.color = textColor;
        });
      };

      setProgress(0);

      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        end: "top 30%",
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
        onLeaveBack: () => setProgress(0),
        onLeave: () => setProgress(1),
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 mt-24 w-full bg-transparent text-foreground"
    >
      <section className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center px-8 md:px-16 lg:px-24">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col justify-between gap-16 md:flex-row md:items-end">
          <div className="flex flex-col">
            <p
              className="text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Próximo passo
            </p>
            <h2 className="footer-primary-text mt-6 text-monumental font-light" style={{ color: "hsl(var(--foreground))" }}>
              Vamos conversar.
            </h2>
            <Link
              href={`mailto:${BRAND.email}`}
              className="footer-primary-text group mt-8 text-architectural font-light opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "hsl(var(--foreground))" }}
            >
              <span className="border-b border-[hsl(var(--accent)/0.4)] pb-2 transition-all group-hover:border-[hsl(var(--accent))]">
                {BRAND.email}
              </span>
            </Link>
            <Link
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-primary-text group mt-4 text-architectural font-light opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "hsl(var(--foreground))" }}
            >
              <span className="border-b border-[hsl(var(--accent)/0.4)] pb-2 transition-all group-hover:border-[hsl(var(--accent))]">
                WhatsApp
              </span>
            </Link>
          </div>

          <span
            className="footer-primary-text select-none font-bold leading-none opacity-5"
            style={{ color: "hsl(var(--foreground))", fontSize: "clamp(8rem, 22vw, 26rem)", letterSpacing: "0.1em" }}
          >
            W.
          </span>
        </div>
      </section>

      <section className="relative flex flex-col overflow-hidden bg-transparent">
        <div
          className="mx-auto flex w-full max-w-[1800px] flex-col gap-4 border-t px-8 py-6 md:flex-row md:items-center md:justify-between md:px-16 lg:px-24"
          style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
        >
          <p
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.6)" }}
          >
            &copy; 2026 W.VIANA Arquitetura | Interiores
          </p>
          <div className="flex gap-6">
            <Link
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent) / 0.6)" }}
            >
              Instagram
            </Link>
            <Link
              href={BRAND.pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent) / 0.6)" }}
            >
              Pinterest
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
