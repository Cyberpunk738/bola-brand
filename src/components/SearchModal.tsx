import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { products, type Product, formatNaira } from "@/lib/site";
import { Search, X, Star, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { addItem } = useCart();

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative mx-auto mt-12 max-w-2xl px-4 animate-in zoom-in-95 duration-200">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-background shadow-2xl">
          {/* Search Bar Input */}
          <div className="flex items-center border-b border-border/60 px-5 py-4">
            <Search className="size-5 text-muted-foreground mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search totebags, pouches, purses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground mr-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border/40 bg-sand/30 px-5 py-3 text-xs">
            <span className="text-muted-foreground font-medium mr-1">Filter:</span>
            {["All", "Totebags", "Pouches", "Purses"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-background text-foreground/80 border border-border/60 hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-5 divide-y divide-border/40">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No products found matching "{query}"
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <Link
                    to="/products/$id"
                    params={{ id: product.id }}
                    onClick={onClose}
                    className="flex items-center gap-4 group flex-1 min-w-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-14 rounded-md object-cover bg-muted shrink-0 transition-transform group-hover:scale-105"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-base font-medium group-hover:text-accent transition-colors truncate">
                          {product.name}
                        </h4>
                        {product.tag && (
                          <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-accent uppercase shrink-0">
                            {product.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <span className="font-medium text-foreground">{product.price}</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="size-3 fill-accent text-accent" />
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      addItem(product);
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shrink-0"
                  >
                    + Add to Bag
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer view all link */}
          <div className="border-t border-border/60 bg-sand/30 px-5 py-3 text-center">
            <Link
              to="/shop"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent font-medium"
            >
              Browse complete shop collection <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
