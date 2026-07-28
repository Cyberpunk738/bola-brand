import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground/80 transition-colors hover:text-accent font-medium"
                activeProps={{ className: "text-accent font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link
            to="/"
            className="font-display text-xl tracking-[0.28em] uppercase md:absolute md:left-1/2 md:-translate-x-1/2 text-foreground font-semibold"
          >
            Bola Brand
          </Link>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/80 transition-colors hover:text-accent p-1"
            >
              <Search className="size-5" />
            </button>

            <button
              type="button"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground/80 transition-colors hover:text-accent p-1"
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-border/60 px-5 py-4 md:hidden bg-background">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm tracking-wide font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
