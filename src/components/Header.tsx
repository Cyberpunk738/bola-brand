import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/"
          className="font-display text-xl tracking-[0.28em] uppercase md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Bola Brand
        </Link>

        <a
          href="/shop"
          aria-label="Search products"
          className="text-foreground/70 transition-colors hover:text-accent"
        >
          <Search className="size-5" />
        </a>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
