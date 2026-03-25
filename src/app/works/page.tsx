"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Void } from "@/components/ui/void";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";
import {
  getAllProjects,
  getProjectTypologies,
} from "@/services/projects.service";
import type { Project } from "@/types/project";

export default function WorksPage() {
  const rootRef = useRef<HTMLElement>(null);
  const allProjects = getAllProjects();
  const typologies = getProjectTypologies();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? allProjects.filter((p) => p.typology === filter)
    : allProjects;

  useArchitecturalReveal(rootRef, filter ?? "all");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* Hero */}
        <section className="px-8 pt-36 pb-12 md:px-16 md:pt-44 md:pb-16 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Arquivo
            </span>
            <h1 className="reveal-rise mt-4 text-monumental font-extralight text-foreground">
              Projetos
            </h1>
            <p
              className="reveal-illuminate mt-4 text-caption uppercase tracking-[0.18em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Selecionados 2018—2026
            </p>
            <div
              className="reveal-draw mt-8 h-px w-full"
              style={{ background: "hsl(var(--accent) / 0.3)" }}
            />
          </div>
        </section>

        {/* Filters */}
        <section className="px-8 pb-16 md:px-16 lg:px-24">
          <div className="mx-auto flex max-w-[1800px] flex-wrap gap-6">
            <button
              onClick={() => setFilter(null)}
              className={`text-caption uppercase tracking-[0.18em] transition-colors ${
                !filter ? "text-foreground underline underline-offset-4" : ""
              }`}
              style={{ color: filter ? "hsl(var(--accent))" : undefined }}
            >
              Todos
              <span className="ml-1 text-micro" style={{ color: "hsl(var(--accent) / 0.5)" }}>
                ({allProjects.length})
              </span>
            </button>
            {typologies.map((typ) => {
              const count = allProjects.filter((p) => p.typology === typ).length;
              return (
                <button
                  key={typ}
                  onClick={() => setFilter(typ)}
                  className={`text-caption uppercase tracking-[0.18em] transition-colors ${
                    filter === typ ? "text-foreground underline underline-offset-4" : ""
                  }`}
                  style={{ color: filter !== typ ? "hsl(var(--accent))" : undefined }}
                >
                  {typ}
                  <span className="ml-1 text-micro" style={{ color: "hsl(var(--accent) / 0.5)" }}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Project listing */}
        <section className="px-8 pb-32 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            {filtered.map((project, i) =>
              i % 2 === 0 ? (
                <CinematicCard key={project.slug} project={project} index={i} />
              ) : (
                <SplitCard key={project.slug} project={project} index={i} />
              ),
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-8 pb-24 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1800px] text-center">
            <p className="text-architectural font-light text-foreground/40">
              Tem um projeto?
            </p>
            <Link
              href="mailto:contato@wviana.arq.br"
              className="mt-2 inline-block text-architectural font-light text-foreground underline decoration-1 underline-offset-8 transition-opacity hover:opacity-60"
            >
              contato@wviana.arq.br
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function CinematicCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="mb-16 md:mb-24">
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="reveal-curtain relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-6 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
          <h2 className="reveal-rise text-architectural font-semibold text-foreground transition-opacity group-hover:opacity-60">
            {project.title}
          </h2>
          <div className="flex gap-4">
            <span className="text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent))" }}>
              {project.typology}
            </span>
            <span className="text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent) / 0.5)" }}>
              {project.location}
            </span>
            <span className="text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent) / 0.5)" }}>
              {project.year}
            </span>
          </div>
        </div>
      </Link>
      <Void height="4vh" />
    </div>
  );
}

function SplitCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="mb-16 md:mb-24">
      <Link href={`/projects/${project.slug}`} className="group flex flex-col gap-8 md:flex-row md:items-start">
        {/* Left: Info */}
        <div className="flex flex-col gap-3 md:w-[40%] md:pt-4">
          <span className="reveal-illuminate text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent) / 0.5)" }}>
            {num}
          </span>
          <h2 className="reveal-rise text-architectural font-semibold text-foreground transition-opacity group-hover:opacity-60">
            {project.title}
          </h2>
          <p className="reveal-illuminate max-w-[400px] text-body-lg text-muted-foreground">
            {project.summary}
          </p>
          <span className="reveal-illuminate mt-2 text-caption uppercase tracking-[0.18em] text-foreground">
            Ver projeto →
          </span>
        </div>
        {/* Right: Image */}
        <div className="reveal-curtain relative aspect-[4/5] overflow-hidden md:w-[55%] md:ml-auto">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </Link>
      <Void height="4vh" />
    </div>
  );
}
