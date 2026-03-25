"use client";

import { useRef, useLayoutEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

export function ThresholdHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !title || !subtitle) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Letter-by-letter reveal on load
      const chars = title.querySelectorAll<HTMLElement>(".hero-char");
      gsap.fromTo(
        chars,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        subtitle,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.0, ease: "power2.out", delay: 1.4 },
      );

      // Scroll-linked: fade out + slight scale
      gsap.to(section, {
        autoAlpha: 0,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const title = "W.VIANA";

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center bg-background"
      data-section="hero"
    >
      {/* Title */}
      <h1
        ref={titleRef}
        className="text-monumental font-light uppercase text-foreground"
        style={{ letterSpacing: "0.15em" }}
      >
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="hero-char inline-block"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="mt-5 text-micro uppercase tracking-[0.3em]"
        style={{ color: "hsl(var(--accent))", opacity: 0 }}
      >
        Arquitetura | Interiores
      </p>

      {/* Bottom-left: scroll indicator */}
      <div className="absolute bottom-10 left-8 flex flex-col items-center gap-2 md:left-16 lg:left-24">
        <div
          className="h-10 w-px animate-pulse"
          style={{ background: "hsl(var(--accent) / 0.5)" }}
        />
        <span
          className="text-micro uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--accent))" }}
        >
          Scroll
        </span>
      </div>

      {/* Bottom-right: location */}
      <span
        className="absolute bottom-10 right-8 text-micro uppercase tracking-[0.22em] md:right-16 lg:right-24"
        style={{ color: "hsl(var(--accent))" }}
      >
        Fortaleza, CE
      </span>
    </section>
  );
}
