"use client";

import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

const phases = [
  {
    index: "01",
    title: "Discovery & brief alignment",
    description:
      "Workshops, context mapping and success criteria definition with stakeholders.",
    duration: "1–2 weeks",
  },
  {
    index: "02",
    title: "Concept & narrative direction",
    description:
      "Spatial concept, visual references and high-level design language for approval.",
    duration: "2–4 weeks",
  },
  {
    index: "03",
    title: "Design development",
    description:
      "Layout refinement, material strategy, technical coordination and cost framing.",
    duration: "4–8 weeks",
  },
  {
    index: "04",
    title: "Documentation & delivery",
    description:
      "Execution package, procurement support and quality control during implementation.",
    duration: "4–10 weeks",
  },
];

export default function ProcessPage() {
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
            Process
          </p>

          <div className="space-y-5 md:col-span-10 lg:col-span-8">
            <SplitText
              as="h1"
              className="max-w-4xl text-balance text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            >
              {`Context. Strategy.\nMateriality. Execution.`}
            </SplitText>
            <p className="js-blur-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Our process is intentionally structured to keep creative direction
              strong while maintaining delivery certainty through every phase.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          {phases.map((phase) => (
            <article
              key={phase.index}
              className="js-reveal grid gap-4 border-y border-border/70 py-5 md:grid-cols-12 md:items-start md:gap-8"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
                {phase.index}
              </p>

              <div className="space-y-2 md:col-span-7">
                <h2 className="text-xl font-semibold md:text-2xl">{phase.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {phase.description}
                </p>
              </div>

              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:col-span-3 md:text-right">
                {phase.duration}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 border-t border-border/70 pt-8 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Deliverables
          </p>

          <div className="grid gap-5 md:col-span-10 md:grid-cols-2">
            <article className="js-card space-y-2">
              <h3 className="text-base font-semibold">Strategy dossier</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Project intent, spatial principles, references and functional
                priorities.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h3 className="text-base font-semibold">Concept boards</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Material language, atmosphere studies and visual direction packs.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h3 className="text-base font-semibold">Technical package</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Drawings, specifications and coordination notes for execution.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h3 className="text-base font-semibold">Implementation oversight</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Milestone reviews and quality checks during procurement and site
                stages.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
