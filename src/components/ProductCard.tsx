import { Star } from "lucide-react";
import { waLink, type Product } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={waLink(`Hi! I'm interested in the ${product.name} for ${product.price}`)}
      className="group block"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={`${product.name} — ${product.description}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-background/90 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase">
            {product.tag}
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 translate-y-3 bg-primary py-2.5 text-center text-[11px] tracking-[0.2em] text-primary-foreground uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Order on WhatsApp
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{product.price}</p>
          <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" />
            {product.rating}
          </p>
        </div>
      </div>
    </a>
  );
}
