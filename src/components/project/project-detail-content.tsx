"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";
import { getNextProject, getRelatedProjects } from "@/services/projects.service";
import type { Project } from "@/types/project";

type ProjectDetailContentProps = {
  project: Project;
};

export function ProjectDetailContent({ project }: Readonly<ProjectDetailContentProps>) {
  const rootRef = useRef<HTMLElement>(null);
  const relatedProjects = getRelatedProjects(project.slug, 2);
  const nextProject = getNextProject(project.slug);

  useScrollDrivenReveal(rootRef, project.slug);

  return (
    <main ref={rootRef}>
      {/* Header */}
      <section className="mx-auto max-w-[1800px] px-6 pt-28 pb-10 md:px-10 md:pt-36 md:pb-16 lg:px-14">
        <Link
          href="/works"
          className="js-reveal inline-flex text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Voltar aos projetos
        </Link>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <div className="js-reveal flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>{project.typology}</span>
              <span>{project.status}</span>
              <span>{project.location}</span>
              <span>{project.year}</span>
            </div>
            <h1 className="js-reveal mt-4 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              {project.title}
            </h1>
            <p className="js-reveal mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.summary}
            </p>
          </div>

          {/* Scope */}
          <div className="js-reveal space-y-4 md:col-span-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Cliente</p>
              <p className="text-sm">{project.client}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Tipo</p>
              <p className="text-sm">{project.category}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Escopo</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image full-width */}
      <section className="js-reveal relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
        <Image
          src={project.imageSrc}
          alt={`Capa do projeto ${project.title}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Narrativa
          </p>
          <div className="space-y-8 md:col-span-10">
            {project.chapters.map((chapter, index) => (
              <article key={chapter.title} className="js-reveal border-t border-border/40 pt-6">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-[clamp(1.3rem,2.5vw,2rem)] font-semibold tracking-[-0.01em]">
                  {chapter.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {chapter.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Resultados
          </p>
          <div className="grid gap-6 md:col-span-10 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="js-reveal space-y-2 border-t border-border/40 pt-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </p>
                <p className="text-3xl font-semibold tracking-[-0.02em]">{metric.value}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
        <div className="js-reveal border-y border-border/40 py-12 md:py-16">
          <blockquote className="mx-auto max-w-4xl space-y-4 text-center">
            <p className="text-[clamp(1.3rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.01em]">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">
              {project.testimonial.author} — {project.testimonial.role}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
        <div className="js-reveal mb-8 grid gap-4 md:grid-cols-12 md:gap-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Galeria
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:col-span-10 md:text-base">
            Sequência curada de visuais do projeto destacando atmosfera,
            materialidade e ritmo narrativo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {project.gallery.map((item, index) => (
            <div
              key={`${project.slug}-gallery-${index}`}
              className={`js-reveal relative overflow-hidden ${
                index === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Related + Next */}
      <section className="mx-auto max-w-[1800px] px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
        <div className="grid gap-8 border-t border-border/40 pt-12 md:grid-cols-12 md:gap-10">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Relacionados
          </p>
          <div className="grid gap-8 md:col-span-10 md:grid-cols-2">
            {relatedProjects.map((related) => (
              <Link
                key={related.slug}
                href={`/projects/${related.slug}`}
                className="js-reveal group block space-y-2 border-t border-border/40 pt-4"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {related.typology} / {related.location}
                </p>
                <h3 className="text-xl font-semibold tracking-[-0.01em] transition-opacity group-hover:opacity-70">
                  {related.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {related.summary}
                </p>
                <span className="inline-flex text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Ver projeto →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {nextProject && (
          <div className="mt-16 border-t border-border/40 pt-10">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="js-reveal group block"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Próximo projeto
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] transition-opacity group-hover:opacity-70">
                {nextProject.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {nextProject.summary}
              </p>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
