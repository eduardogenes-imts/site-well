"use client";

import { useRef, useLayoutEffect, useMemo } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

const MANIFESTO =
  "Projetamos a pausa. O silencio entre as paredes. O vazio que da sentido ao espaco.";

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = useMemo(() => MANIFESTO.split(" "), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || wordsRef.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      wordsRef.current.forEach((w) => {
        if (w) w.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Pin section while words illuminate one by one
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      wordsRef.current.forEach((wordEl) => {
        if (!wordEl) return;
        tl.to(wordEl, { opacity: 1, duration: 1 }, "+=0.2");
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-center"
      style={{ background: "hsl(var(--background-warm))" }}
    >
      <div className="mx-auto w-full max-w-[1800px] px-8 md:px-16 lg:px-24">
        <div className="ml-0 max-w-[1200px] md:ml-[15%]">
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            Manifesto
          </span>

          <p
            className="mt-8 text-architectural font-light leading-[1.1] text-foreground"
            aria-label={MANIFESTO}
          >
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block mr-[0.3em]"
                style={{ opacity: 0.08 }}
                aria-hidden="true"
              >
                {word}
              </span>
            ))}
          </p>

          <p
            className="mt-16 text-caption uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            Wellington Viana, Fundador
          </p>
        </div>
      </div>
    </section>
  );
}
