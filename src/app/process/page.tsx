"use client";

import { useRef, useLayoutEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Void } from "@/components/ui/void";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

const phases = [
  {
    index: "01",
    title: "Descoberta & Alinhamento",
    description:
      "Workshops com o cliente, mapeamento de contexto e definição de critérios de sucesso com todos os stakeholders.",
    duration: "1-2 semanas",
  },
  {
    index: "02",
    title: "Conceito & Direção Narrativa",
    description:
      "Conceito espacial, referências visuais e linguagem de design de alto nível para aprovação.",
    duration: "2-4 semanas",
  },
  {
    index: "03",
    title: "Desenvolvimento de Projeto",
    description:
      "Refinamento de layout, estratégia de materiais, coordenação técnica e enquadramento de custos.",
    duration: "4-8 semanas",
  },
  {
    index: "04",
    title: "Documentação & Entrega",
    description:
      "Pacote executivo, suporte de aquisições e controle de qualidade durante a implementação.",
    duration: "4-10 semanas",
  },
];

const deliverables = [
  {
    title: "Dossiê Estratégico",
    description: "Análise de contexto, referências e diretrizes de projeto.",
  },
  {
    title: "Pranchas Conceituais",
    description: "Linguagem visual, materialidade e volumetria aprovadas.",
  },
  {
    title: "Pacote Técnico",
    description: "Documentação executiva completa para construção.",
  },
  {
    title: "Supervisão de Obra",
    description: "Acompanhamento de qualidade até a entrega final.",
  },
];

const TOTAL_PHASES = String(phases.length).padStart(2, "0");

export default function ProcessPage() {
  const rootRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useArchitecturalReveal(rootRef);

  useLayoutEffect(() => {
    const container = horizontalRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!container || !track || !progress) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - container.offsetWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalScroll, ease: "none" }, 0);
      tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* Intro */}
        <section className="px-8 pt-36 pb-24 md:px-16 md:pt-44 md:pb-32 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Processo
            </span>
            <h1 className="reveal-rise mt-6 max-w-[1000px] text-architectural font-light leading-[1.05] text-foreground">
              Contexto. Estratégia. Materialidade. Execução.
            </h1>
            <p className="reveal-illuminate mt-8 max-w-[600px] text-body-lg text-muted-foreground">
              Nosso processo é intencionalmente estruturado para manter a direção
              criativa forte enquanto garante precisão de entrega em cada fase.
            </p>
            <div
              className="reveal-draw mt-12 h-px w-full"
              style={{ background: "hsl(var(--accent) / 0.3)" }}
            />
          </div>
        </section>

        <Void height="8vh" />

        {/* Horizontal scroll phases */}
        <section ref={horizontalRef} className="relative h-screen overflow-hidden">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute left-0 top-0 z-10 h-[2px] w-full"
            style={{
              background: "hsl(var(--accent))",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />

          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: `${phases.length * 100}vw` }}
          >
            {phases.map((phase, i) => (
              <div
                key={phase.index}
                className="relative flex h-full w-screen flex-col justify-center px-8 md:px-16 lg:px-24"
                style={{
                  borderRight:
                    i < phases.length - 1
                      ? "1px solid hsl(var(--accent) / 0.15)"
                      : "none",
                }}
              >
                {/* Watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 select-none font-extrabold leading-none md:left-16 lg:left-24"
                  style={{
                    fontSize: "clamp(6rem, 15vw, 20rem)",
                    color: "hsl(var(--accent) / 0.06)",
                  }}
                >
                  {phase.index}
                </span>

                <div className="relative ml-0 max-w-[500px] md:ml-[15%]">
                  <span
                    className="text-micro uppercase tracking-[0.22em]"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    Fase {phase.index} / {TOTAL_PHASES}
                  </span>

                  <div
                    className="mt-4 h-px w-16"
                    style={{ background: "hsl(var(--accent) / 0.3)" }}
                  />

                  <h2 className="mt-6 text-architectural font-light text-foreground">
                    {phase.title}
                  </h2>
                  <p className="mt-6 max-w-[440px] text-body-lg text-muted-foreground">
                    {phase.description}
                  </p>
                  <span
                    className="mt-8 inline-block border px-3 py-1 text-micro uppercase tracking-[0.22em]"
                    style={{
                      color: "hsl(var(--accent))",
                      borderColor: "hsl(var(--accent) / 0.25)",
                    }}
                  >
                    {phase.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Void height="15vh" />

        {/* Deliverables */}
        <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Entregáveis
            </span>
            <div className="mt-8">
              {deliverables.map((item, i) => (
                <div
                  key={item.title}
                  className="reveal-rise flex items-baseline gap-6 border-t py-6 md:gap-8 md:py-8"
                  style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
                >
                  <span
                    className="shrink-0 text-micro uppercase tracking-[0.22em]"
                    style={{ color: "hsl(var(--accent) / 0.5)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                    <span className="shrink-0 text-body-lg text-foreground md:w-[260px]">
                      {item.title}
                    </span>
                    <span className="text-caption text-muted-foreground md:text-body-lg">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: "hsl(var(--accent) / 0.15)" }} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
