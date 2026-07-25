import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, waLink } from "@/lib/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Products — The Bola Brand" },
      {
        name: "description",
        content:
          "Browse totebags, essence pouches and digital purses from The Bola Brand. Order any piece straight from WhatsApp.",
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
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
      <p className="eyebrow">The collection</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl">Shop all products</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Every piece is handpicked for quality and finish. Tap any product to order on WhatsApp.
      </p>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>

      <h2 className="mt-24 border-t border-border pt-12 font-display text-4xl">
        Featured collections
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {collections.map((c) => (
          <a
            key={c.name}
            href={waLink(`Hi! I'm interested in the ${c.name} collection`)}
            className="group relative block overflow-hidden"
          >
            <img
              src={c.image}
              alt={`${c.name} — ${c.description}`}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <p className="eyebrow text-on-image/80">{c.tag}</p>
              <h3 className="mt-2 font-display text-2xl text-on-image">{c.name}</h3>
              <p className="text-sm text-on-image/85">{c.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
