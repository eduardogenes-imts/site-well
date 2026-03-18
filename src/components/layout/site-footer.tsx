"use client";

import Link from "next/link";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contato" className="relative bg-white">
      {/* CTA Section */}
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Contato
          </p>
          <h2 className="mt-6 text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground/40">
            Fale sobre seu projeto
          </h2>
          <Link
            href="mailto:contato@wviana.arq.br"
            className="mt-2 inline-block text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground underline decoration-1 underline-offset-8 transition-colors hover:text-foreground/70"
          >
            Fale conosco
          </Link>
        </div>
      </div>

      {/* Footer grid */}
      <div className="border-t border-border/40">
        <div className="mx-auto grid max-w-[1800px] gap-10 px-6 py-12 md:grid-cols-12 md:gap-8 md:px-10 md:py-16 lg:px-14">
          {/* Navigation */}
          <div className="space-y-4 md:col-span-3">
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Home
              </Link>
              <Link href="/works" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Projetos
              </Link>
              <Link href="/studio" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Estúdio
              </Link>
              <Link href="/process" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Processo
              </Link>
              <Link href="/contact" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Contato
              </Link>
            </nav>
          </div>

          {/* Address */}
          <div className="space-y-4 md:col-span-4">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">L</p>
              <p className="text-sm text-foreground">Brasil</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">C</p>
              <Link
                href="mailto:contato@wviana.arq.br"
                className="text-sm text-foreground transition-colors hover:text-foreground/60"
              >
                contato@wviana.arq.br
              </Link>
            </div>
          </div>

          {/* Social + Back to top */}
          <div className="flex flex-col justify-between md:col-span-5">
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                Behance
              </Link>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-8 self-start text-sm text-foreground transition-colors hover:text-foreground/60 md:mt-0 md:self-end"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </div>

      {/* Giant brand name — dark bg */}
      <div className="bg-foreground px-6 pt-4 pb-2 md:px-10 lg:px-14">
        <p className="w-full select-none text-center font-bold leading-none text-white" style={{ fontSize: "13vw", letterSpacing: "0.25em" }}>
          W.VIANA
        </p>
      </div>

      {/* Bottom bar */}
      <div className="bg-foreground border-t border-white/10">
        <div className="mx-auto flex flex-col gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-white/50 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p>&copy; 2026 W.VIANA Arquitetura e Interiores. Todos os direitos reservados.</p>
          <p>Site por IMTS</p>
        </div>
      </div>
    </footer>
  );
}
