import { useState, useEffect } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { products, collections } from "@/lib/site";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";

const shopSearchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Products — The Bola Brand" },
      {
        name: "description",
        content:
          "Browse totebags, essence pouches and digital purses from The Bola Brand. Add to bag or order straight from WhatsApp.",
      },
      { property: "og:title", content: "Shop All Products — The Bola Brand" },
      {
        property: "og:description",
        content: "Totebags, essence pouches and digital purses, priced from ₦4,000.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const searchParams = useSearch({ from: "/shop" });
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchParams.category) {
      setSelectedCategory(searchParams.category);
    }
  }, [searchParams.category]);

  const categories = ["All", "Totebags", "Pouches", "Purses"];

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.numericPrice - b.numericPrice;
      if (sortBy === "price-desc") return b.numericPrice - a.numericPrice;
      if (sortBy === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
      return 0; // featured default
    });

  const handleCollectionClick = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-10">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl font-semibold">Shop all products</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Every piece is handpicked for quality and finish. Select any product to customize and order.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/80 bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Toolbar: Category Chips + Sort Select */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs transition-all font-medium cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-background text-foreground/80 border border-border/80 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="size-3.5 text-foreground" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-none font-medium text-foreground outline-none cursor-pointer pr-2"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-10">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-display text-2xl">No products found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your category filter or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full bg-secondary px-6 py-2.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Featured Collections Highlight */}
      <h2 className="mt-24 border-t border-border pt-12 font-display text-4xl font-semibold">
        Featured collections
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Select a collection to filter products instantly.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {collections.map((c) => (
          <button
            key={c.name}
            onClick={() => handleCollectionClick(c.category)}
            className="group relative block overflow-hidden rounded-xl text-left cursor-pointer border border-border/60"
          >
            <img
              src={c.image}
              alt={`${c.name} — ${c.description}`}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 p-6 flex items-end justify-between w-full">
              <div>
                <p className="eyebrow text-on-image/80">{c.tag}</p>
                <h3 className="mt-1 font-display text-2xl text-on-image font-medium">{c.name}</h3>
                <p className="text-xs text-on-image/85 mt-0.5">{c.price}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform group-hover:scale-110">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
