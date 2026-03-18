"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";
import { cn } from "@/lib/utils";
import { getAllProjects } from "@/services/projects.service";

export function FeaturedCaseStudiesSection() {
  const featuredProjects = getAllProjects().slice(0, 2);
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="container space-y-8 py-12 md:space-y-10 md:py-16"
    >
      <div className="grid gap-4 md:grid-cols-12 md:gap-8">
        <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          04 / Case studies
        </p>

        <div className="space-y-3 md:col-span-10 lg:col-span-8">
          <SplitText
            as="h2"
            className="text-balance text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-5xl"
          >
            {`Two recent projects with\nmeasurable business impact.`}
          </SplitText>
          <p className="js-blur-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Strategic decisions in layout, circulation and material language
            improved engagement, perception and operational clarity.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <article
            key={project.slug}
            className={`space-y-3 border-t border-border/70 pt-4 ${
              index % 2 === 0 ? "js-slide-left" : "js-slide-right"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {project.typology} / {project.location}
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.01em]">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground/85 transition-colors hover:text-foreground"
            >
              View case
              <ArrowUpRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>

      <Link
        href="/works"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "js-blur-reveal w-fit gap-2 border-border/70 bg-transparent hover:bg-muted/40",
        )}
      >
        Explore all projects
        <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
