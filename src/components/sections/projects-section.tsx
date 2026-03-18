"use client";

import { ProjectCard } from "@/components/project/ProjectCard";
import { useProjects } from "@/hooks/use-projects";

export function ProjectsSection() {
  const { data, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <section id="projetos" className="container py-10 md:py-14" aria-label="Projetos em destaque">
        <p className="text-sm text-muted-foreground">Carregando projetos...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section id="projetos" className="container py-10 md:py-14" aria-label="Projetos em destaque">
        <p className="text-sm text-red-600">Não foi possível carregar os projetos.</p>
      </section>
    );
  }

  return (
    <section id="projetos" className="container space-y-8 py-10 md:space-y-10 md:py-16" aria-label="Projetos em destaque">
      <div className="grid gap-4 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          01 / Works
        </p>

        <div className="space-y-3 md:col-span-10 lg:col-span-8">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-5xl">
            Selected projects built with precision, tone and architectural calm.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Every project is shaped through context-led design thinking,
            strategic planning and meticulous execution.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:gap-7 md:grid-cols-2">
        {data.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}