import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Bola Brand" },
      {
        name: "description",
        content:
          "Reach The Bola Brand on WhatsApp at +234 705 443 7192 for orders, sizing questions and delivery details.",
      },
      { property: "og:title", content: "Contact — The Bola Brand" },
      {
        property: "og:description",
        content: "Message us on WhatsApp for orders and enquiries.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
      <p className="eyebrow">Get in touch</p>
      <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight md:text-6xl">
        Let's find your next statement piece
      </h1>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <a
            href={waLink("Hi! I have a question about The Bola Brand.")}
            className="flex items-start gap-4 border border-border p-6 transition-colors hover:border-accent"
          >
            <MessageCircle className="mt-1 size-5 text-accent" />
            <span>
              <span className="block text-sm tracking-[0.12em] uppercase">WhatsApp</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Fastest way to order — we usually reply within the hour.
              </span>
            </span>
          </a>
          <a
            href={WHATSAPP}
            className="flex items-start gap-4 border border-border p-6 transition-colors hover:border-accent"
          >
            <Phone className="mt-1 size-5 text-accent" />
            <span>
              <span className="block text-sm tracking-[0.12em] uppercase">Phone</span>
              <span className="mt-1 block text-sm text-muted-foreground">+234 705 443 7192</span>
            </span>
          </a>
        </div>

        <img
          src="/asset/purse2.jpg"
          alt="Digital purse from The Bola Brand"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
    </div>
  );
}
