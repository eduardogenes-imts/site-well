import { Mail } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contato" className="mt-20 border-t border-border/70 bg-background">
      <div className="container grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="space-y-2 md:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            W.VIANA
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Escritório de arquitetura e interiores especializado em soluções
            personalizadas que unem criatividade e funcionalidade para criar
            espaços transformadores.
          </p>
        </div>

        <div className="space-y-3 md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Contato
          </p>
          <Link
            href="mailto:contato@wviana.arq.br"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
            contato@wviana.arq.br
          </Link>
          <p className="text-sm text-muted-foreground">Brasil</p>
        </div>

        <div className="space-y-3 md:col-span-3 md:text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Redes
          </p>
          <div className="flex gap-4 md:justify-end">
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Behance
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container flex flex-col gap-2 py-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 W.VIANA Arquitetura e Interiores. Todos os direitos reservados.</p>
          <Link href="#" className="transition-colors hover:text-foreground">
            Voltar ao topo
          </Link>
        </div>
      </div>
    </footer>
  );
}
