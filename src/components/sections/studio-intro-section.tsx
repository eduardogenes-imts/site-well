"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

export function StudioIntroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="container grid gap-6 border-y border-border/70 py-12 md:grid-cols-12 md:gap-8 md:py-16"
    >
      <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
        00 / Studio
      </p>

      <div className="space-y-4 md:col-span-10 lg:col-span-8">
        <SplitText
          as="h2"
          className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl"
        >
          {`Our approach combines\narchitecture, narrative and\nmaterial intelligence.`}
        </SplitText>
        <p className="js-blur-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          We work at the intersection of spatial design and brand expression,
          shaping experiences that feel precise, warm and context-aware.
        </p>
      </div>
    </section>
  );
}
