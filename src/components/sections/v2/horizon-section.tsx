"use client";

import { useRef, useLayoutEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

export function HorizonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      line.style.transform = "scaleX(1)";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-8 md:px-16 lg:px-24"
    >
      <p
        className="text-center text-caption uppercase tracking-[0.18em]"
        style={{ color: "hsl(var(--accent))" }}
      >
        48+ projetos entregues. 7 anos de pratica.
      </p>

      <div
        ref={lineRef}
        className="mt-10 h-px w-full max-w-[800px]"
        style={{
          background: "hsl(var(--accent) / 0.4)",
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />
    </section>
  );
}
