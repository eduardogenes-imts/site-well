"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "@/lib/gsap";
import { useProjects } from "@/hooks/use-projects";

export function ProjectsSection() {
  const { data, isLoading, isError } = useProjects();
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !data?.length) return;

    let ctx: gsap.Context | null = null;

    const initAnimations = () => {
      ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>(".pw-project").forEach((project) => {
          const bracket1 = project.querySelector<HTMLElement>(".pw-bracket-l");
          const bracket2 = project.querySelector<HTMLElement>(".pw-bracket-r");
          const title = project.querySelector<HTMLElement>(".pw-title");
          const image = project.querySelector<HTMLElement>(".pw-image");
          const meta = project.querySelectorAll<HTMLElement>(".pw-meta");

          if (title) {
            gsap.fromTo(
              title,
              { scale: 0.7, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: project,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 0.8,
                },
              },
            );
          }

          if (bracket1 && bracket2) {
            gsap.fromTo(
              bracket1,
              { x: 40, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: project,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 0.8,
                },
              },
            );
            gsap.fromTo(
              bracket2,
              { x: -40, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: project,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 0.8,
                },
              },
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { clipPath: "inset(15% 5% 15% 5%)", autoAlpha: 0 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: { trigger: image, start: "top 85%", once: true },
              },
            );
          }

          if (meta.length) {
            gsap.fromTo(
              meta,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: project, start: "top 50%", once: true },
              },
            );
          }
        });
      }, root);
    };

    // Wait for Vision pin to be established before measuring positions
    window.addEventListener("vision-pin-ready", initAnimations, { once: true });
    const fallback = setTimeout(initAnimations, 300);

    return () => {
      window.removeEventListener("vision-pin-ready", initAnimations);
      clearTimeout(fallback);
      ctx?.revert();
    };
  }, [data]);

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
    <section ref={rootRef} data-section="projects" className="bg-white">
      {/* Section header */}
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-8 md:px-10 lg:px-14">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Projetos Selecionados
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">02</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          18–26&apos;
        </p>
      </div>

      {/* Projects */}
      {data.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="pw-project group block border-t border-border/40"
        >
          <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col items-center justify-center px-6 py-16 md:px-10 lg:px-14">
            {/* Title with [ brackets ] */}
            <div className="flex items-center gap-3 md:gap-6">
              <span className="pw-bracket-l text-[clamp(3rem,10vw,10rem)] font-extralight leading-none tracking-[-0.05em] text-foreground/30">
                [
              </span>
              <h3 className="pw-title text-center text-[clamp(2rem,8vw,8rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground transition-colors duration-500 group-hover:text-foreground/70">
                {project.title}
              </h3>
              <span className="pw-bracket-r text-[clamp(3rem,10vw,10rem)] font-extralight leading-none tracking-[-0.05em] text-foreground/30">
                ]
              </span>
            </div>

            {/* Project image */}
            <div className="pw-image relative mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden md:mt-14">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Metadata */}
            <div className="mt-6 flex w-full max-w-4xl items-center justify-between md:mt-8">
              <p className="pw-meta text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {project.typology}
              </p>
              <p className="pw-meta text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {project.year}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
