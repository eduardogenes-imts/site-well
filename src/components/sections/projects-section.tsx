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
    <section id="projetos" className="container space-y-6 py-10 md:space-y-8 md:py-14" aria-label="Projetos em destaque">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold md:text-3xl">Projetos em destaque</h2>
        <p className="text-muted-foreground">Mock data local em src/data com serviço tipado e cache em cliente.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}