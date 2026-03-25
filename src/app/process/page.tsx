"use client";

import { useRef, useLayoutEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

const phases = [
  {
    index: "01",
    title: "Descoberta & Alinhamento",
    description:
      "Workshops com o cliente, mapeamento de contexto e definicao de criterios de sucesso com todos os stakeholders.",
    duration: "1-2 semanas",
  },
  {
    index: "02",
    title: "Conceito & Direcao Narrativa",
    description:
      "Conceito espacial, referencias visuais e linguagem de design de alto nivel para aprovacao.",
    duration: "2-4 semanas",
  },
  {
    index: "03",
    title: "Desenvolvimento de Projeto",
    description:
      "Refinamento de layout, estrategia de materiais, coordenacao tecnica e enquadramento de custos.",
    duration: "4-8 semanas",
  },
  {
    index: "04",
    title: "Documentacao & Entrega",
    description:
      "Pacote executivo, suporte de aquisicoes e controle de qualidade durante a implementacao.",
    duration: "4-10 semanas",
  },
];

const deliverables = [
  "Dossie Estrategico",
  "Pranchas Conceituais",
  "Pacote Tecnico",
  "Supervisao de Obra",
];

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
              Contexto. Estrategia. Materialidade. Execucao.
            </h1>
            <p className="reveal-illuminate mt-8 max-w-[600px] text-body-lg text-muted-foreground">
              Nosso processo e intencionalmente estruturado para manter a direcao
              criativa forte enquanto garante certeza de entrega em cada fase.
            </p>
          </div>
        </section>

        {/* Horizontal scroll phases */}
        <section ref={horizontalRef} className="relative h-screen overflow-hidden">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute left-0 top-0 z-10 h-px w-full"
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
                  className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 select-none font-bold leading-none md:left-16 lg:left-24"
                  style={{
                    fontSize: "clamp(6rem, 15vw, 20rem)",
                    color: "hsl(var(--accent) / 0.06)",
                  }}
                >
                  {phase.index}
                </span>

                <div className="relative max-w-[500px]">
                  <h2 className="text-architectural font-semibold text-foreground">
                    {phase.title}
                  </h2>
                  <p className="mt-6 text-body-lg text-muted-foreground">
                    {phase.description}
                  </p>
                  <span
                    className="mt-8 inline-block text-micro uppercase tracking-[0.22em]"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    {phase.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Entregaveis
            </span>
            <div className="mt-8">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="reveal-rise border-t py-5"
                  style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
                >
                  <span className="text-body-lg text-foreground">{item}</span>
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
