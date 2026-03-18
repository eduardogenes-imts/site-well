"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/types/project";

const allFilter = "Todos";

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
    if (!data) return [allFilter];
    return [allFilter, ...Array.from(new Set(data.map((p) => p.typology)))];
  }, [data]);

  const typologyCount = useMemo(() => countByTypology(data ?? []), [data]);

  const filteredProjects = useMemo(() => {
    if (!data || activeTypology === allFilter) return data ?? [];
    return data.filter((p) => p.typology === activeTypology);
  }, [activeTypology, data]);

  useScrollDrivenReveal(rootRef, `${activeTypology}-${filteredProjects.length}`);

  if (isLoading) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando projetos...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-red-600">Não foi possível carregar os projetos.</p>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="mx-auto max-w-[1800px] px-6 py-12 md:px-10 md:py-16 lg:px-14">
      {/* Header */}
      <header className="grid gap-6 md:grid-cols-12 md:gap-10">
        <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          Projetos
        </p>
        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <h1 className="js-reveal text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1] tracking-[-0.02em]">
            Trabalhos selecionados
          </h1>
          <p className="js-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Uma seleção de projetos concluídos e em andamento nas tipologias
            residencial, comercial, hospitalidade e corporativo.
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="js-reveal mt-8 flex flex-wrap gap-x-5 gap-y-3 border-y border-border/40 py-4">
        {typologies.map((typology) => {
          const isActive = typology === activeTypology;
          const count = typology === allFilter ? data.length : (typologyCount.get(typology) ?? 0);

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

      {/* Projects grid */}
      <div className="mt-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* CTA */}
      <section className="js-reveal mt-16 grid gap-6 border-t border-border/40 pt-12 md:grid-cols-12 md:gap-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          Contato
        </p>
        <div className="space-y-4 md:col-span-10 lg:col-span-8">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            Tem um projeto em mente?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Compartilhe seu briefing e responderemos com uma estrutura clara,
            recomendação de escopo e orientação de cronograma.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-70"
          >
            Fale com o estúdio →
          </Link>
        </div>
      </section>
    </section>
  );
}
