"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/types/project";

const allFilter = "All";

function countByTypology(projects: Project[]) {
  const counts = new Map<string, number>();

  projects.forEach((project) => {
    counts.set(project.typology, (counts.get(project.typology) ?? 0) + 1);
  });

  return counts;
}

export function WorksSection() {
  const { data, isLoading, isError } = useProjects();
  const rootRef = useRef<HTMLElement>(null);
  const [activeTypology, setActiveTypology] = useState<string>(allFilter);

  const typologies = useMemo(() => {
    if (!data) {
      return [allFilter];
    }

    return [allFilter, ...Array.from(new Set(data.map((project) => project.typology)))];
  }, [data]);

  const typologyCount = useMemo(() => countByTypology(data ?? []), [data]);

  const filteredProjects = useMemo(() => {
    if (!data || activeTypology === allFilter) {
      return data ?? [];
    }

    return data.filter((project) => project.typology === activeTypology);
  }, [activeTypology, data]);

  useScrollDrivenReveal(
    rootRef,
    `${activeTypology}-${filteredProjects.length}`,
  );

  if (isLoading) {
    return (
      <section className="container py-16">
        <p className="text-sm text-muted-foreground">Loading selected work...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="container py-16">
        <p className="text-sm text-red-600">Unable to load projects.</p>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="container space-y-8 py-12 md:space-y-10 md:py-16">
      <header className="grid gap-4 md:grid-cols-12 md:gap-8">
        <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          02 / Work Index
        </p>

        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <h1 className="js-reveal text-balance text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1] tracking-[-0.02em]">
            Selected work
          </h1>
          <p className="js-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A curated selection of completed and in-progress projects across
            residential, hospitality, workplace and retail typologies.
          </p>
        </div>
      </header>

      <div className="js-reveal flex flex-wrap gap-x-5 gap-y-3 border-y border-border/70 py-4">
        {typologies.map((typology) => {
          const isActive = typology === activeTypology;
          const count =
            typology === allFilter
              ? data.length
              : (typologyCount.get(typology) ?? 0);

          return (
            <button
              key={typology}
              type="button"
              onClick={() => setActiveTypology(typology)}
              className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={isActive}
            >
              <span>{typology}</span>
              <span className="text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:gap-7">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <section className="js-reveal grid gap-6 border-t border-border/70 pt-8 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          03 / Editorial note
        </p>

        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
            Our portfolio combines completed outcomes and active directions.
            Each project reflects a specific response to context, function,
            audience and material constraints.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            We favour long-term design value over short-term trends, with
            emphasis on coherence, clarity and execution quality.
          </p>
        </div>
      </section>

      <section className="js-reveal grid gap-6 border-y border-border/70 py-8 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          04 / Capabilities
        </p>

        <div className="grid gap-5 md:col-span-10 md:grid-cols-2">
          <article className="space-y-2">
            <h2 className="text-base font-semibold">Spatial strategy</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Strategic frameworks for architecture and interiors based on brand
              and user behaviour.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-base font-semibold">Concept to detail</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Continuity from concept direction to technical decisions and
              material resolution.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-base font-semibold">Cross-team coordination</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Integration with consultants, suppliers and delivery stakeholders.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-base font-semibold">Quality supervision</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Review cycles and quality gates to protect design intent during
              implementation.
            </p>
          </article>
        </div>
      </section>

      <section className="js-reveal grid gap-6 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          05 / Start
        </p>

        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
            Looking for a partner on your next project?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Share your brief and we will respond with a clear structure, scope
            recommendation and timeline guidance.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-70"
          >
            Contact the studio
          </Link>
        </div>
      </section>
    </section>
  );
}
