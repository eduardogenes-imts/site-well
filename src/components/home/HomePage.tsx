"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/lib/projects";

export function HomePage() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".js-reveal, .js-card", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".js-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".js-card", {
        opacity: 0,
        y: 80,
        duration: 0.9,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".js-grid",
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".js-insight", {
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".js-insights",
          start: "top 84%",
          once: true,
        },
      });
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <header className="hero">
        <p className="hero__eyebrow js-reveal">Site Well / Portfólio Premium</p>
        <h1 className="hero__title js-reveal">
          Design editorial com motion sutil e direção visual premium.
        </h1>
        <p className="hero__description js-reveal">
          Base de implementação das fases 1 a 3: grid responsivo, tipografia,
          componentes reutilizáveis, GSAP + ScrollTrigger e scroll fluido com
          Lenis.
        </p>
      </header>

      <section className="projects js-grid" aria-label="Projetos em destaque">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <section className="portfolio-insights js-insights" aria-label="Indicadores de direção criativa">
        <article className="insight-card js-insight">
          <p className="insight-card__value">+42%</p>
          <p className="insight-card__label">Engajamento médio pós-rebrand</p>
        </article>
        <article className="insight-card js-insight">
          <p className="insight-card__value">3.2x</p>
          <p className="insight-card__label">Tempo de permanência em páginas editoriais</p>
        </article>
        <article className="insight-card js-insight">
          <p className="insight-card__value">18</p>
          <p className="insight-card__label">Projetos digitais entregues em 24 meses</p>
        </article>
      </section>

      <footer className="portfolio-footer js-reveal">
        <p>Menos animação, mais direção. Construído com Next.js, GSAP e Lenis.</p>
      </footer>
    </main>
  );
}
