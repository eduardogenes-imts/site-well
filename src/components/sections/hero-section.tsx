import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="container space-y-8 py-16 md:py-24">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Site Well / Portfólio Premium
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight md:text-6xl">
          Design editorial com motion sutil e base moderna para escala.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          UI em Tailwind, componentes reutilizáveis, cache de dados com TanStack Query e estado global com Zustand.
        </p>
      </div>

      <Link href="#projetos" className={cn(buttonVariants({ size: "lg" }), "w-fit gap-2")}>
        Ver projetos
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}