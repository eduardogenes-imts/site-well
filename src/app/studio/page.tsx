"use client";

import { useRef } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

export default function StudioPage() {
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
              Estúdio
            </p>
            <div className="space-y-6 md:col-span-10 lg:col-span-8">
              <h1 className="js-reveal text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                Projetamos espaços atemporais com estratégia, precisão e clareza emocional.
              </h1>
              <p className="js-reveal max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Fundada pelo arquiteto e urbanista Wellington Viana, a W.VIANA é um
                estúdio independente que atua em arquitetura, interiores e ambientes
                de marca. Traduzimos contexto em sistemas espaciais claros que se
                sentem contemporâneos e humanos.
              </p>
            </div>
          </div>
        </section>

        {/* Portrait image */}
        <section className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-14">
          <div className="js-reveal relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/studio-portrait.jpg"
              alt="W.VIANA Estúdio"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <div className="grid gap-8 border-y border-border/40 py-10 md:grid-cols-3 md:py-14">
            <article className="js-card space-y-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Fundação
              </p>
              <p className="text-3xl font-semibold tracking-[-0.02em]">2018</p>
              <p className="text-sm text-muted-foreground">
                Sete anos de atuação em projetos transformadores.
              </p>
            </article>
            <article className="js-card space-y-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Projetos entregues
              </p>
              <p className="text-3xl font-semibold tracking-[-0.02em]">48+</p>
              <p className="text-sm text-muted-foreground">
                Residencial, comercial, hospitalidade e corporativo.
              </p>
            </article>
            <article className="js-card space-y-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Atuação
              </p>
              <p className="text-3xl font-semibold tracking-[-0.02em]">Brasil</p>
              <p className="text-sm text-muted-foreground">
                São Paulo, Rio de Janeiro, Brasília e Curitiba.
              </p>
            </article>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              Competências
            </p>
            <div className="grid gap-6 md:col-span-10 md:grid-cols-2">
              <article className="js-reveal space-y-3 border-t border-border/40 pt-4">
                <h2 className="text-xl font-semibold">Projeto Arquitetônico</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Estratégia conceitual, orientação de viabilidade e alinhamento
                  detalhado do projeto nas fases de planejamento e execução.
                </p>
              </article>
              <article className="js-reveal space-y-3 border-t border-border/40 pt-4">
                <h2 className="text-xl font-semibold">Interiores & Materialidade</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sistemas de interiores, coordenação de mobiliário e curadoria
                  de materiais para resultados sensoriais coesos.
                </p>
              </article>
              <article className="js-reveal space-y-3 border-t border-border/40 pt-4">
                <h2 className="text-xl font-semibold">Integração Marca-Espaço</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tradução da narrativa da marca em pontos de contato espaciais,
                  sinalização e momentos experienciais.
                </p>
              </article>
              <article className="js-reveal space-y-3 border-t border-border/40 pt-4">
                <h2 className="text-xl font-semibold">Supervisão de Obra</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Governança de design, alinhamento com fornecedores e revisões de
                  qualidade durante documentação e construção.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-[1800px] px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="grid gap-6 border-t border-border/40 pt-10 md:grid-cols-12 md:gap-10">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              Valores
            </p>
            <div className="space-y-4 md:col-span-10 lg:col-span-8">
              <p className="js-reveal text-base leading-relaxed text-foreground/90 md:text-lg">
                Priorizamos contenção, detalhe e clareza acima do ruído visual. Cada
                decisão é avaliada pela função, longevidade e relevância emocional.
              </p>
              <p className="js-reveal text-sm leading-relaxed text-muted-foreground md:text-base">
                Nosso processo é colaborativo e transparente, equilibrando ambição
                projetual com as realidades do projeto, cronograma e orçamento.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
