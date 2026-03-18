"use client";

import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

const phases = [
  {
    index: "01",
    title: "Descoberta & Alinhamento",
    description:
      "Workshops com o cliente, mapeamento de contexto e definição de critérios de sucesso com todos os stakeholders.",
    duration: "1–2 semanas",
  },
  {
    index: "02",
    title: "Conceito & Direção Narrativa",
    description:
      "Conceito espacial, referências visuais e linguagem de design de alto nível para aprovação.",
    duration: "2–4 semanas",
  },
  {
    index: "03",
    title: "Desenvolvimento de Projeto",
    description:
      "Refinamento de layout, estratégia de materiais, coordenação técnica e enquadramento de custos.",
    duration: "4–8 semanas",
  },
  {
    index: "04",
    title: "Documentação & Entrega",
    description:
      "Pacote executivo, suporte de aquisições e controle de qualidade durante a implementação.",
    duration: "4–10 semanas",
  },
];

const deliverables = [
  {
    title: "Dossiê Estratégico",
    description: "Intenção do projeto, princípios espaciais, referências e prioridades funcionais.",
  },
  {
    title: "Pranchas Conceituais",
    description: "Linguagem material, estudos de atmosfera e pacotes de direção visual.",
  },
  {
    title: "Pacote Técnico",
    description: "Desenhos, especificações e notas de coordenação para execução.",
  },
  {
    title: "Supervisão de Obra",
    description: "Revisões de marcos e verificações de qualidade durante aquisição e obra.",
  },
];

export default function ProcessPage() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollDrivenReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* Hero */}
        <section className="mx-auto max-w-[1800px] px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:px-14">
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              Processo
            </p>
            <div className="space-y-6 md:col-span-10 lg:col-span-8">
              <h1 className="js-reveal text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                Contexto. Estratégia. Materialidade. Execução.
              </h1>
              <p className="js-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Nosso processo é intencionalmente estruturado para manter a direção
                criativa forte enquanto garante certeza de entrega em cada fase.
              </p>
            </div>
          </div>
        </section>

        {/* Phases */}
        <section className="mx-auto max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
          <div className="space-y-0">
            {phases.map((phase) => (
              <article
                key={phase.index}
                className="js-reveal grid gap-4 border-t border-border/40 py-8 md:grid-cols-12 md:items-start md:gap-10 md:py-10"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-1">
                  {phase.index}
                </p>
                <div className="space-y-3 md:col-span-7">
                  <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-semibold leading-tight tracking-[-0.01em]">
                    {phase.title}
                  </h2>
                  <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                    {phase.description}
                  </p>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:col-span-4 md:text-right">
                  {phase.duration}
                </p>
              </article>
            ))}
            <div className="border-t border-border/40" />
          </div>
        </section>

        {/* Deliverables */}
        <section className="mx-auto max-w-[1800px] px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              Entregáveis
            </p>
            <div className="grid gap-6 md:col-span-10 md:grid-cols-2">
              {deliverables.map((item) => (
                <article key={item.title} className="js-reveal space-y-2">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
