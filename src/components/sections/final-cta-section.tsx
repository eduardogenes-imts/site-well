"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

export function FinalCtaSection() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="container grid gap-6 py-14 md:grid-cols-12 md:gap-8 md:py-20"
    >
      <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
        05 / Start a project
      </p>

      <div className="space-y-5 md:col-span-10 lg:col-span-8">
        <SplitText
          as="h2"
          className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl"
        >
          {`Planning a new space?\nLet's build the right direction\nfrom day one.`}
        </SplitText>
        <p className="js-blur-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Send your context, timeline and goals. We'll respond with a structured
          approach, estimated phases and next actions.
        </p>

        <Link
          href="/contact"
          className="js-blur-reveal inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70"
        >
          Contact the studio
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
