"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
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
    <main
      ref={rootRef}
      className="mx-auto w-full max-w-5xl space-y-10 px-6 py-12 md:space-y-14 md:py-16"
    >
      <Link
        href="/works"
        className="js-reveal inline-flex text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        Back to all works
      </Link>

      <header className="max-w-3xl space-y-4">
        <div className="js-reveal flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>{project.typology}</span>
          <span>{project.status}</span>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <h1 className="js-reveal text-balance text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="js-reveal text-lg text-muted-foreground">{project.summary}</p>
      </header>

      <Card className="js-card js-image-reveal relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-0 p-0">
        <div className="js-parallax-media relative h-[78vh] w-full md:h-[92vh]">
          <Image
            src={project.imageSrc}
            alt={`Capa do projeto ${project.title}`}
            fill
            sizes="100vw"
            className="js-parallax-image object-cover"
            priority
          />
        </div>
      </Card>

      <Card className="js-card space-y-6 p-6 md:p-8" aria-label="Escopo do projeto">
        <div className="grid gap-6 border-b border-border/70 pb-6 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Client</p>
            <p className="text-sm">{project.client}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Type</p>
            <p className="text-sm">{project.category}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Country</p>
            <p className="text-sm">{project.country}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold md:text-2xl">Project scope</h2>
        <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          {project.scope.map((item) => (
            <li key={item} className="list-inside list-disc">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Completion year: {project.year}
        </p>
      </Card>

      <section className="js-reveal grid gap-6 border-y border-border/70 py-8 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          01 / Narrative
        </p>

        <div className="space-y-6 md:col-span-10">
          {project.chapters.map((chapter, index) => (
            <article key={chapter.title} className="grid gap-3 border-t border-border/70 pt-4 md:grid-cols-12 md:gap-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:col-span-2">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div className="space-y-2 md:col-span-10">
                <h2 className="js-scrub-title text-2xl font-semibold tracking-[-0.01em]">
                  {chapter.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {chapter.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="js-reveal grid gap-6 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          02 / Results
        </p>

        <div className="grid gap-4 md:col-span-10 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <Card key={metric.label} className="space-y-2 border-border/70 bg-transparent p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="text-3xl font-semibold tracking-[-0.02em]">{metric.value}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="js-reveal grid gap-6 border-y border-border/70 py-8 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          Client note
        </p>

        <blockquote className="space-y-4 md:col-span-10 lg:col-span-8">
          <p className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] md:text-3xl">
            “{project.testimonial.quote}”
          </p>
          <footer className="text-sm text-muted-foreground">
            {project.testimonial.author} — {project.testimonial.role}
          </footer>
        </blockquote>
      </section>

      <section className="space-y-5">
        <div className="js-reveal grid gap-4 md:grid-cols-12 md:gap-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            03 / Gallery
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:col-span-10 md:text-base">
            A curated sequence of project visuals highlighting atmosphere,
            materiality and narrative rhythm.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          {project.gallery.map((item, index) => (
            <div
              key={`${project.slug}-${item.src}-${index}`}
              className={`js-card js-image-reveal js-parallax-media relative overflow-hidden ${
                index % 3 === 0
                  ? "left-1/2 h-[74vh] w-screen -translate-x-1/2 md:col-span-12 md:h-[92vh]"
                  : "aspect-[4/3] md:col-span-6"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                className="js-parallax-image object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="js-reveal grid gap-6 border-t border-border/70 pt-8 md:grid-cols-12 md:gap-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
          04 / Related
        </p>

        <div className="grid gap-5 md:col-span-10 md:grid-cols-2">
          {relatedProjects.map((related) => (
            <article key={related.slug} className="space-y-2 border-t border-border/70 pt-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {related.typology} / {related.location}
              </p>
              <h3 className="text-xl font-semibold tracking-[-0.01em]">
                {related.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {related.summary}
              </p>
              <Link
                href={`/projects/${related.slug}`}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-70"
              >
                Open project
              </Link>
            </article>
          ))}
        </div>
      </section>

      {nextProject ? (
        <section className="js-reveal grid gap-6 border-t border-border/70 pt-8 md:grid-cols-12 md:gap-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Next project
          </p>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block space-y-2 md:col-span-10 lg:col-span-8"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {nextProject.typology} / {nextProject.location}
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] transition-opacity group-hover:opacity-70 md:text-4xl">
              {nextProject.title}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {nextProject.summary}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-foreground">
              Open next project
            </p>
          </Link>
        </section>
      ) : null}
    </main>
  );
}
