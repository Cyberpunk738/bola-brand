import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag } from "lucide-react";
import { type Product } from "@/lib/site";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group relative block">
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative overflow-hidden bg-muted rounded-lg">
          <img
            src={product.image}
            alt={`${product.name} — ${product.description}`}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-background/90 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase rounded-xs font-medium">
              {product.tag}
            </span>
          )}

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary py-2.5 text-center text-[11px] font-medium tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors rounded-xs shadow-md"
            >
              <ShoppingBag className="size-3.5" />
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="font-display text-lg leading-tight hover:text-accent transition-colors font-medium"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.description}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-medium">{product.price}</p>
          <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" />
            {product.rating}
          </p>
        </div>
      </div>
    </div>
  );
}
