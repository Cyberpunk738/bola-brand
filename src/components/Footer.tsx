import { Link } from "@tanstack/react-router";
import { WHATSAPP } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-sand/60">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.28em] uppercase">Bola</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Nails. Bags. Statement pieces. Premium accessories for the modern woman.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:text-accent">
                Shop all
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Order</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={WHATSAPP} className="hover:text-accent">
                WhatsApp
              </a>
            </li>
            <li className="text-muted-foreground">+234 705 443 7192</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground md:px-10">
        © {new Date().getFullYear()} The Bola Brand. All rights reserved.
      </div>
    </footer>
  );
}
