import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatNaira, waLink } from "@/lib/site";
import { CheckCircle2, Package, Printer, ArrowRight, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — The Bola Brand" },
      { name: "description", content: "Thank you for your order from The Bola Brand." },
    ],
  }),
  component: OrderSuccessPage,
});

export function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("last_bola_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const fallbackOrderId = `BOLA-${Math.floor(100000 + Math.random() * 900000)}`;

  const orderId = order?.orderId || fallbackOrderId;
  const dateStr = order?.date || new Date().toLocaleDateString("en-NG", { dateStyle: "medium" });

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
      <div className="rounded-2xl border border-border/80 bg-background p-8 md:p-12 shadow-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
          <CheckCircle2 className="size-10" />
        </div>

        <span className="eyebrow text-accent font-medium">Order Confirmed</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
          We’ve received your order <strong>#{orderId}</strong> placed on {dateStr}. We're preparing your luxury pieces for dispatch.
        </p>

        {/* Order Status Tracker */}
        <div className="mt-10 rounded-xl border border-border/60 bg-sand/30 p-6 text-left space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-3">
            <span>Order Progress</span>
            <span className="text-accent font-bold">Status: Processing</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="space-y-2">
              <div className="mx-auto size-3 rounded-full bg-accent ring-4 ring-accent/20" />
              <span className="font-medium text-foreground block">1. Confirmed</span>
            </div>
            <div className="space-y-2">
              <div className="mx-auto size-3 rounded-full bg-accent ring-4 ring-accent/20" />
              <span className="font-medium text-foreground block">2. Packaging</span>
            </div>
            <div className="space-y-2">
              <div className="mx-auto size-3 rounded-full bg-border" />
              <span className="text-muted-foreground block">3. Dispatched</span>
            </div>
          </div>
        </div>

        {/* Order Details Receipt */}
        {order && (
          <div className="mt-8 rounded-xl border border-border/60 bg-background p-6 text-left space-y-4 text-xs">
            <h3 className="font-display text-lg font-semibold border-b border-border/60 pb-3">
              Receipt Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Customer Info:</p>
                <p>{order.customer?.fullName}</p>
                <p>{order.customer?.phone}</p>
                <p>{order.customer?.email}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Shipping Address:</p>
                <p>{order.customer?.address}</p>
                <p>{order.customer?.city}</p>
              </div>
            </div>

            {/* Line items */}
            <div className="border-t border-border/60 pt-3 space-y-2">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-muted-foreground">
                  <span>
                    {item.product?.name} ({item.selectedColor || "Standard"}) x{item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatNaira(item.product?.numericPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/60 pt-3 space-y-1.5 text-right font-medium">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatNaira(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Discount</span>
                  <span>-{formatNaira(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping Fee</span>
                <span>{formatNaira(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border/60">
                <span>Total Paid</span>
                <span className="font-display text-lg">{formatNaira(order.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs tracking-[0.15em] text-foreground uppercase hover:bg-sand transition-colors font-medium"
          >
            <Printer className="size-4" />
            Print Receipt
          </button>

          <a
            href={waLink(`Hi Bola Brand! I'm checking up on order #${orderId}`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-xs tracking-[0.15em] text-secondary-foreground uppercase hover:bg-secondary/80 transition-colors font-medium"
          >
            <MessageCircle className="size-4" />
            Track on WhatsApp
          </a>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
          >
            Continue Shopping
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
