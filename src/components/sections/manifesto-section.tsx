"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

export function ManifestoSection() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="container grid gap-6 border-y border-border/70 py-12 md:grid-cols-12 md:gap-8 md:py-16"
    >
      <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
        03 / Manifesto
      </p>

      <div className="space-y-4 md:col-span-10 lg:col-span-8">
        <SplitText
          as="h2"
          className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl"
        >
          {`We believe premium spaces\ncome from restraint,\nnot excess.`}
        </SplitText>
        <p className="js-blur-reveal max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Our work balances architecture, materiality and brand narrative to
          create spaces that are clear, calm and emotionally resonant. Every
          line, surface and transition is designed to support function and leave
          a lasting impression.
        </p>
        <p className="js-blur-reveal max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          We collaborate closely with clients, consultants and builders to keep
          design quality intact from concept to delivery, with strong control of
          detail, timeline and budget.
        </p>
      </div>
    </section>
  );
}
