"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="relative z-10 mt-24 w-full overflow-hidden bg-transparent text-foreground"
    >
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 md:px-16 lg:px-24">
        <p
          className="text-micro uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--accent))" }}
        >
          Proximo passo
        </p>
        <h2 className="footer-primary-text mt-6 text-center text-monumental font-light" style={{ color: "hsl(var(--foreground))" }}>
          Vamos conversar.
        </h2>
        <Link
          href="mailto:contato@wviana.arq.br"
          className="footer-primary-text group mt-8 text-center text-architectural font-light opacity-80 transition-opacity hover:opacity-100"
          style={{ color: "hsl(var(--foreground))" }}
        >
          <span className="border-b border-[hsl(var(--accent)/0.4)] pb-2 transition-all group-hover:border-[hsl(var(--accent))]">
            contato@wviana.arq.br
          </span>
        </Link>
      </section>

      <section className="bg-transparent">
        <div
          className="mx-auto flex max-w-[1800px] flex-col gap-4 border-t px-8 py-6 md:flex-row md:items-center md:justify-between md:px-16 lg:px-24"
          style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
        >
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            W.VIANA
          </span>
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            Brasil / SP
          </span>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent))" }}
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent))" }}
            >
              Behance
            </Link>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-transparent pb-6 pt-8">
        <span
          className="footer-primary-text select-none font-bold leading-none opacity-5"
          style={{ color: "hsl(var(--foreground))", fontSize: "30vw", letterSpacing: "0.15em" }}
        >
          W.
        </span>
        <div className="mt-4 flex flex-col items-center gap-1">
          <p
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.6)" }}
          >
            &copy; 2026 W.VIANA Arquitetura | Interiores
          </p>
          <p
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.6)" }}
          >
            Site por IMTS
          </p>
        </div>
      </section>
    </footer>
  );
}
