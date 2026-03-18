"use client";

import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

export default function StudioPage() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main
        ref={rootRef}
        className="container space-y-16 py-16 pt-24 md:space-y-24 md:py-24 md:pt-28"
      >
        <section className="grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Studio
          </p>

          <div className="space-y-5 md:col-span-10 lg:col-span-8">
            <SplitText
              as="h1"
              className="max-w-5xl text-balance text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            >
              {`We design timeless spaces\nwith strategy, precision\nand emotional clarity.`}
            </SplitText>
            <p className="js-blur-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Site Well is an independent studio working across architecture,
              interiors and brand environments. We translate context into clear
              spatial systems that feel contemporary and human.
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-y border-border/70 py-10 md:grid-cols-3 md:py-12">
          <article className="js-card space-y-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Founded
            </p>
            <p className="text-3xl font-semibold tracking-[-0.02em]">2018</p>
            <p className="text-sm text-muted-foreground">
              Established in Melbourne with an interdisciplinary team.
            </p>
          </article>

          <article className="js-card space-y-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Projects delivered
            </p>
            <p className="text-3xl font-semibold tracking-[-0.02em]">48+</p>
            <p className="text-sm text-muted-foreground">
              Residential, hospitality, workplace and selective retail.
            </p>
          </article>

          <article className="js-card space-y-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Active countries
            </p>
            <p className="text-3xl font-semibold tracking-[-0.02em]">3</p>
            <p className="text-sm text-muted-foreground">
              Australia, New Zealand and Singapore (advisory scope).
            </p>
          </article>
        </section>

        <section className="grid gap-8 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Capabilities
          </p>

          <div className="grid gap-6 md:col-span-10 md:grid-cols-2">
            <article className="js-slide-left space-y-3 border-t border-border/70 pt-4">
              <h2 className="text-xl font-semibold">Architecture direction</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Concept strategy, feasibility guidance and detailed design
                alignment across planning and delivery phases.
              </p>
            </article>

            <article className="js-slide-right space-y-3 border-t border-border/70 pt-4">
              <h2 className="text-xl font-semibold">Interiors & materiality</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Interior systems, FF&E coordination and material curation for
                cohesive sensory outcomes.
              </p>
            </article>

            <article className="js-slide-left space-y-3 border-t border-border/70 pt-4">
              <h2 className="text-xl font-semibold">Brand-space integration</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Translating brand narrative into spatial touchpoints, signage and
                experiential moments.
              </p>
            </article>

            <article className="js-slide-right space-y-3 border-t border-border/70 pt-4">
              <h2 className="text-xl font-semibold">Delivery supervision</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Design governance, supplier alignment and quality reviews during
                documentation and construction.
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 border-t border-border/70 pt-8 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Studio values
          </p>
          <div className="space-y-4 md:col-span-10 lg:col-span-8">
            <p className="js-blur-reveal text-base leading-relaxed text-foreground/90 md:text-lg">
              We prioritize restraint, detail and clarity over visual noise.
              Every decision is evaluated by function, longevity and emotional
              relevance.
            </p>
            <p className="js-blur-reveal text-sm leading-relaxed text-muted-foreground md:text-base">
              Our process is collaborative and transparent, balancing design
              ambition with project realities, timeline and budget.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
