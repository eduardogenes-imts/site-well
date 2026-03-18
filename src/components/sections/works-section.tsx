"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
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
    <section className="container space-y-8 py-12 md:space-y-10 md:py-16">
      <header className="grid gap-4 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          02 / Work Index
        </p>

        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <h1 className="text-balance text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1] tracking-[-0.02em]">
            Selected work
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A curated selection of completed and in-progress projects across
            residential, hospitality, workplace and retail typologies.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-x-5 gap-y-3 border-y border-border/70 py-4">
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
    </section>
  );
}
