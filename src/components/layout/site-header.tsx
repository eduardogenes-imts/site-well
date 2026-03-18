"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/use-ui-store";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/92 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs">
          Site Well
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="md:hidden"
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {isMobileMenuOpen ? (
        <nav className="border-t border-border/70 px-6 py-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
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