import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">404</p>
      <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">Página não encontrada</h1>
      <p className="max-w-xl text-base text-muted-foreground md:text-lg">
        O conteúdo que você tentou acessar não está disponível no momento.
      </p>
      <Link href="/" className={cn(buttonVariants(), "w-fit")}>
        Voltar para a home
      </Link>
    </main>
  );
}
