import { Mail } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contato" className="mt-20 border-t bg-muted/40">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2026 Site Well. Portfólio premium em Next.js + Tailwind.</p>
        <Link href="mailto:contato@sitewell.dev" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <Mail className="size-4" />
          contato@sitewell.dev
        </Link>
      </div>
    </footer>
  );
}