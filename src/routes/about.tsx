import { createFileRoute } from "@tanstack/react-router";
import { aboutText } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Bola Brand" },
      {
        name: "description",
        content:
          "The Bola Brand empowers women through stylish, high-quality nails, handbags and tote bags made to make a statement.",
      },
      { property: "og:title", content: "About — The Bola Brand" },
      {
        property: "og:description",
        content: "A fashion and beauty brand built around confidence, quality and personality.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
        Accessories that reflect her personality
      </h1>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <img
          src="/asset/newtote.jpg"
          alt="Bola Brand tote bag styled on a table"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="flex flex-col justify-center gap-6 text-sm leading-relaxed text-muted-foreground">
          <p>{aboutText}</p>
          <p>
            From the first sketch to the final stitch, each collection is chosen with the same
            question in mind: will this make her feel like the best version of herself? That is the
            only standard we design to.
          </p>
          <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8 text-foreground">
            <div>
              <dt className="font-display text-3xl">4.8★</dt>
              <dd className="eyebrow mt-1">Average rating</dd>
            </div>
            <div>
              <dt className="font-display text-3xl">3</dt>
              <dd className="eyebrow mt-1">Core collections</dd>
            </div>
            <div>
              <dt className="font-display text-3xl">₦4k</dt>
              <dd className="eyebrow mt-1">Starting price</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
