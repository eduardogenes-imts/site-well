"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="js-section-fade container grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-28 lg:py-32"
    >
      <div className="md:col-span-8 space-y-5">
        <p className="js-reveal text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Site Well / Creative Direction Studio
        </p>
        <SplitText
          as="h1"
          className="js-scrub-title max-w-5xl text-balance text-[clamp(2rem,5.4vw,6rem)] font-semibold leading-[0.98] tracking-[-0.02em]"
        >
          {`We craft built environments\nwith editorial clarity and\ncontemporary restraint.`}
        </SplitText>
        <p className="js-blur-reveal max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Boutique studio focused on brand-sensitive architecture and spatial
          storytelling across residential, hospitality and commercial contexts.
        </p>
      </div>

      <div className="md:col-span-4 md:pt-16 lg:pt-20 space-y-6">
        <div className="js-blur-reveal space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Selected projects
          </p>
          <p className="text-sm leading-relaxed text-foreground/86">
            Architecture, interiors and brand spaces delivered with detail-led
            execution.
          </p>
        </div>

        <Link
          href="/works"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "js-blur-reveal w-fit gap-2 border-border/70 bg-transparent hover:bg-muted/40",
          )}
        >
          Explore work
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
