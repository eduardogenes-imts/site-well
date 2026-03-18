"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/use-ui-store";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em]">
          Site Well
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="md:hidden" aria-label="Abrir menu">
          {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {isMobileMenuOpen ? (
        <nav className="border-t px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}