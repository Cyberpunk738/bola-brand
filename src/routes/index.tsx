import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { collections, products, aboutText, waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Bola Brand — Nails, Bags & Statement Pieces" },
      {
        name: "description",
        content:
          "Premium handbags, elegant pouches and statement accessories for the modern woman. Order directly on WhatsApp.",
      },
      { property: "og:title", content: "The Bola Brand — Nails, Bags & Statement Pieces" },
      {
        property: "og:description",
        content:
          "Premium handbags, elegant pouches and statement accessories for the modern woman.",
      },
    ],
  }),
  component: Index,
});

const marquee = [
  "Premium Accessories",
  "Handpicked Quality",
  "Nationwide Delivery",
  "Made for Her",
  "Order on WhatsApp",
];

const perks = [
  { icon: Truck, title: "Nationwide delivery", copy: "Lagos & across Nigeria" },
  { icon: ShieldCheck, title: "Quality promise", copy: "Handpicked every piece" },
  { icon: Headphones, title: "Personal support", copy: "Chat with us anytime" },
  { icon: BadgeCheck, title: "Easy ordering", copy: "Checkout via WhatsApp" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-4 md:px-10">
        <div className="relative overflow-hidden">
          <img
            src="/asset/tote1.jpg"
            alt="Bola Brand glamour totebag styled for everyday elegance"
            className="h-[78vh] min-h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-ink/50" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
            <h1 className="rise-in max-w-5xl font-display text-[13vw] leading-[0.92] tracking-tight text-on-image uppercase md:text-[6.5vw]">
              Nails. Bags.
              <br />
              Statement pieces.
            </h1>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/shop"
                className="rounded-full bg-background px-7 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Shop collection
              </Link>
              <a
                href={waLink("Hi! I'd like to know more about The Bola Brand.")}
                className="text-sm tracking-wide text-on-image underline-offset-4 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro line */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <p className="max-w-3xl font-display text-2xl leading-snug md:text-4xl">
          Elevate your style with a curated collection of premium handbags, elegant pouches and
          statement accessories designed for the modern woman.
        </p>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">New Arrivals</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Shop the latest pieces joining the collection this season.
            </p>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
          >
            All products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mt-28 bg-blush py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="font-display text-3xl leading-snug md:text-5xl">
            “Every piece feels considered — the quality and the finish make my outfit.”
          </p>
          <p className="eyebrow mt-8">— Adenike, Lagos</p>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-5">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <span
                  key={m + dup}
                  className="eyebrow px-8 whitespace-nowrap text-foreground/70"
                >
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <section className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10">
        <h2 className="font-display text-4xl md:text-5xl">Our collections</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Inspire and let yourself be inspired — from one signature piece to another.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <a
            href={waLink(`Hi! I'm interested in the ${collections[0].name} collection`)}
            className="group relative block overflow-hidden"
          >
            <img
              src={collections[0].image}
              alt={`${collections[0].name} — ${collections[0].description}`}
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 lg:min-h-[640px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className="eyebrow text-on-image/80">{collections[0].tag}</p>
              <h3 className="mt-2 font-display text-3xl text-on-image">{collections[0].name}</h3>
              <p className="mt-1 text-sm text-on-image/85">{collections[0].price}</p>
            </div>
          </a>

          <div className="grid gap-6">
            {collections.slice(1).map((c) => (
              <a
                key={c.name}
                href={waLink(`Hi! I'm interested in the ${c.name} collection`)}
                className="group relative block overflow-hidden"
              >
                <img
                  src={c.image}
                  alt={`${c.name} — ${c.description}`}
                  loading="lazy"
                  className="h-[300px] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <p className="eyebrow text-on-image/80">{c.tag}</p>
                  <h3 className="mt-2 font-display text-3xl text-on-image">{c.name}</h3>
                  <p className="mt-1 text-sm text-on-image/85">{c.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto mt-28 grid max-w-[1400px] gap-12 px-5 md:grid-cols-2 md:px-10">
        <img
          src="/asset/essencepouch1.jpg"
          alt="Essence Pouch by The Bola Brand"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="eyebrow">About the brand</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Made to make a statement</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{aboutText}</p>
          <Link
            to="/about"
            className="mt-8 w-fit border-b border-foreground pb-1 text-sm tracking-wide"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-28 bg-sand py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-5xl">
            Join the list. Be first for new drops.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Early access to restocks, new pieces and seasonal offers.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="bg-primary px-8 py-3 text-sm tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Sign up
            </button>
          </form>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {perks.map((p) => (
          <div key={p.title}>
            <p.icon className="size-5 text-accent" />
            <h3 className="mt-4 text-sm tracking-[0.12em] uppercase">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </section>
    </>
  );
}
