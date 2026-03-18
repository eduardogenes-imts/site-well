import { Mail } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contato" className="mt-20 border-t border-border/70 bg-background">
      <div className="container grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="space-y-2 md:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Site Well
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Independent design studio creating architecture-led brand and
            digital experiences with editorial direction.
          </p>
        </div>

        <div className="space-y-3 md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Contact
          </p>
          <Link
            href="mailto:contato@sitewell.dev"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
            contato@sitewell.dev
          </Link>
          <p className="text-sm text-muted-foreground">Melbourne / Australia</p>
        </div>

        <div className="space-y-3 md:col-span-3 md:text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Follow
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
          <p>© 2026 Site Well. All rights reserved.</p>
          <Link href="#" className="transition-colors hover:text-foreground">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}