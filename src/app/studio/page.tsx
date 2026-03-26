"use client";

import { useRef } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Void } from "@/components/ui/void";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

const timeline = [
  {
    year: "2018",
    title: "Fundação",
    description:
      "Nasce a W.VIANA em Fortaleza, CE — com a premissa de criar espaços que traduzem a identidade de quem os habita.",
  },
  {
    year: "2019",
    title: "Primeiro projeto residencial",
    description:
      "Entrega da primeira residência completa, consolidando a linguagem de contenção e materialidade que define a prática.",
  },
  {
    year: "2021",
    title: "Expansão de atuação",
    description:
      "Entrada nos segmentos comercial e de hospitalidade, aplicando a mesma disciplina projetual em escalas maiores.",
  },
  {
    year: "2023",
    title: "30+ projetos concluídos",
    description:
      "Marco de três dezenas de projetos entregues, com atuação em diversas tipologias e regiões do Brasil.",
  },
  {
    year: "2025",
    title: "Referência em interiores",
    description:
      "Consolidação como referência em arquitetura de interiores no Ceará, com reconhecimento em publicações e premiações.",
  },
];

const capabilities = [
  "Projeto Arquitetônico",
  "Interiores & Materialidade",
  "Integração Marca-Espaço",
  "Supervisão de Obra",
];

export default function StudioPage() {
  const rootRef = useRef<HTMLElement>(null);
  useArchitecturalReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* 1. Hero — cabe em 100svh (menos header); foto + texto sem estourar a dobra */}
        <section className="relative flex h-[var(--svh)] min-h-0 flex-col overflow-hidden pt-12 md:pt-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] top-[48%] z-0 hidden -translate-y-1/2 select-none font-extrabold leading-none md:block"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontSize: "clamp(10rem, 22vw, 32rem)",
              color: "hsl(var(--accent) / 0.045)",
            }}
          >
            W
          </span>

          <div className="relative z-10 grid min-h-0 flex-1 grid-rows-[minmax(0,38vh)_minmax(0,1fr)] md:grid-cols-2 md:grid-rows-1">
            <div className="reveal-curtain relative min-h-0 w-full overflow-hidden md:h-full">
              <Image
                src="/images/team/wellington-viana/retrato.png"
                alt="Wellington Viana"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-left"
              />
            </div>

            <div className="relative z-10 flex min-h-0 flex-col justify-center overflow-y-auto overscroll-contain px-6 py-4 md:px-12 md:py-6 lg:px-16">
              <span
                className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                Quem somos
              </span>
              <h1 className="reveal-rise mt-2 text-2xl font-extralight leading-tight tracking-tight text-foreground md:mt-3 md:text-3xl lg:text-[clamp(1.75rem,2.5vw,2.75rem)]">
                Wellington Viana
              </h1>
              <p
                className="reveal-illuminate mt-2 text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                Arquiteto & Urbanista / Fundador
              </p>
              <div
                className="reveal-draw mt-4 h-px w-full md:mt-5"
                style={{ background: "hsl(var(--accent) / 0.3)" }}
              />
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                <p className="reveal-illuminate text-sm leading-snug text-muted-foreground md:text-base md:leading-relaxed">
                  Formado em Arquitetura e Urbanismo, Wellington Viana fundou a
                  W.VIANA com a convicção de que cada espaço deve ser uma
                  resposta precisa ao contexto — humano, material e emocional —
                  de quem o habita.
                </p>
                <p className="reveal-illuminate text-sm leading-snug text-muted-foreground md:text-base md:leading-relaxed">
                  A prática prioriza contenção, detalhe e clareza acima do ruído
                  visual. Cada decisão projetual é avaliada pela função,
                  longevidade e relevância emocional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Void height="8vh" />

        {/* 3. Timeline */}
        <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Trajetória
            </span>

            <div className="mt-12">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="reveal-rise relative border-t py-8 md:py-10"
                  style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-12">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-bold leading-none md:w-[180px]"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        color: "hsl(var(--accent) / 0.2)",
                      }}
                    >
                      {item.year}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-body-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="max-w-[520px] text-body-lg text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="border-t"
                style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
              />
            </div>
          </div>
        </section>

        <Void height="8vh" />

        {/* 4. Números */}
        <section className="px-8 py-16 md:px-16 md:py-24 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Números
            </span>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                { value: "2018", label: "Fundação" },
                { value: "48+", label: "Projetos" },
                { value: "Brasil", label: "Atuação" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`reveal-rise flex flex-col items-start gap-2 ${i > 0 ? "md:border-l md:pl-8" : ""}`}
                  style={
                    i > 0
                      ? { borderColor: "hsl(var(--accent) / 0.2)" }
                      : undefined
                  }
                >
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 8rem)",
                      color: "hsl(var(--accent) / 0.2)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-micro uppercase tracking-[0.22em] text-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Void height="8vh" />

        {/* 5. Competências */}
        <section className="px-8 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Competências
            </span>
            <div className="mt-8">
              {capabilities.map((cap) => (
                <div
                  key={cap}
                  className="reveal-rise border-t py-5"
                  style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
                >
                  <span className="text-body-lg text-foreground">{cap}</span>
                </div>
              ))}
              <div
                className="border-t"
                style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
              />
            </div>
          </div>
        </section>

        <Void height="8vh" />

        {/* 6. Endereço */}
        <section className="px-8 pb-32 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span
              className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
              style={{ color: "hsl(var(--accent))" }}
            >
              Endereço
            </span>
            <div className="reveal-rise mt-6">
              <p className="text-architectural font-light leading-[1.15] text-foreground">
                Rua Vicente Linhares, 521
              </p>
              <p className="mt-2 text-body-lg text-muted-foreground">
                Ed. Humberto Santana Business — Fortaleza, CE
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
