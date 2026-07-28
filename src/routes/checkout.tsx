import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatNaira, waLink } from "@/lib/site";
import { ShieldCheck, Truck, CreditCard, ArrowLeft, Tag, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — The Bola Brand" },
      { name: "description", content: "Complete your order with secure checkout or direct WhatsApp ordering." },
    ],
  }),
  component: CheckoutPage,
});

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers (Port Harcourt)",
  "Ogun",
  "Oyo (Ibadan)",
  "Enugu",
  "Kano",
  "Delta",
  "Edo",
  "Kaduna",
  "Anambra",
  "Other State",
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    shippingMethod,
    setShippingMethod,
    shippingState,
    setShippingState,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "whatsapp">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10">
        <h1 className="font-display text-4xl">Your Bag is Empty</h1>
        <p className="mt-3 text-muted-foreground">Add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill in all required shipping details.");
      return;
    }

    setIsSubmitting(true);

    if (paymentMethod === "whatsapp") {
      let msg = `Hi Bola Brand! I'd like to place an order:\n\n`;
      msg += `*Customer:* ${formData.fullName}\n`;
      msg += `*Phone:* ${formData.phone}\n`;
      msg += `*Address:* ${formData.address}, ${shippingState}\n\n`;
      msg += `*Items Ordered:*\n`;
      items.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.product.name} (${item.selectedColor || "Standard"}) x${item.quantity} — ${formatNaira(item.product.numericPrice * item.quantity)}\n`;
      });
      if (promoCode) msg += `\n*Promo:* ${promoCode} (-${formatNaira(discountAmount)})`;
      msg += `\n*Subtotal:* ${formatNaira(subtotal)}`;
      msg += `\n*Shipping:* ${formatNaira(shippingFee)}`;
      msg += `\n*Total Amount:* ${formatNaira(total)}`;

      window.open(waLink(msg), "_blank");
      setIsSubmitting(false);
      return;
    }

    // Direct Simulated Checkout Flow
    setTimeout(() => {
      const orderId = `BOLA-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDetails = {
        orderId,
        date: new Date().toLocaleDateString("en-NG", { dateStyle: "medium" }),
        customer: formData,
        items: [...items],
        subtotal,
        discountAmount,
        shippingFee,
        total,
        paymentMethod,
      };

      // Store order details in session for confirmation page
      try {
        sessionStorage.setItem("last_bola_order", JSON.stringify(orderDetails));
      } catch (e) {}

      clearCart();
      setIsSubmitting(false);
      navigate({ to: "/order-success" });
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-3.5" />
        Return to Shop
      </Link>

      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-8">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Form Steps */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-10">
          {/* Step 1: Customer Details */}
          <div className="space-y-4 rounded-xl border border-border/80 bg-background p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/60 pb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              <h2 className="font-display text-xl font-medium">Customer & Shipping Information</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Adenike Adebayo"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="08012345678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="adenike@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Delivery Address <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Street address, house number..."
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">City / Town</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Lekki, Ikeja, Garki..."
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Delivery State</label>
                <select
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-accent cursor-pointer"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Option */}
          <div className="space-y-4 rounded-xl border border-border/80 bg-background p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/60 pb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              <h2 className="font-display text-xl font-medium">Shipping Speed</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-start justify-between rounded-lg border p-4 transition-all ${
                  shippingMethod === "standard"
                    ? "border-accent bg-accent/5 ring-1 ring-accent"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="mt-0.5 accent-accent"
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">Standard Delivery</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">2 - 4 Business Days</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {formatNaira(shippingState.toLowerCase() === "lagos" ? 1500 : 2500)}
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start justify-between rounded-lg border p-4 transition-all ${
                  shippingMethod === "express"
                    ? "border-accent bg-accent/5 ring-1 ring-accent"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="mt-0.5 accent-accent"
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">Express Priority Dispatch</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Same-day / Next-day</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {formatNaira((shippingState.toLowerCase() === "lagos" ? 1500 : 2500) + 1500)}
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="space-y-4 rounded-xl border border-border/80 bg-background p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/60 pb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              <h2 className="font-display text-xl font-medium">Payment Option</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                  paymentMethod === "card"
                    ? "border-accent bg-accent/5 ring-1 ring-accent"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-accent"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">
                      Instant Debit Card / Bank Transfer Checkout
                    </span>
                  </div>
                </div>
                <span className="text-[11px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                  Instant Demo
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                  paymentMethod === "whatsapp"
                    ? "border-accent bg-accent/5 ring-1 ring-accent"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "whatsapp"}
                    onChange={() => setPaymentMethod("whatsapp")}
                    className="accent-accent"
                  />
                  <span className="text-xs font-medium text-foreground">
                    Checkout & Confirm directly via WhatsApp
                  </span>
                </div>
                <span className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                  WhatsApp Direct
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors font-medium shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <Lock className="size-4" />
                <span>Place Order — {formatNaira(total)}</span>
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 rounded-xl border border-border/80 bg-sand/30 p-6 space-y-6">
          <h3 className="font-display text-xl font-semibold border-b border-border/60 pb-4">
            Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </h3>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 divide-y divide-border/40">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-4 pt-3 first:pt-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-16 rounded-md object-cover bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm font-medium leading-tight truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ""}
                  </p>
                  <p className="text-xs font-medium text-foreground mt-1">
                    {formatNaira(item.product.numericPrice * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code form */}
          <div className="border-t border-b border-border/60 py-4">
            {promoCode ? (
              <div className="flex items-center justify-between text-xs text-accent font-medium">
                <span className="flex items-center gap-1">
                  <Tag className="size-3.5" />
                  Promo <strong>{promoCode}</strong> applied
                </span>
                <button onClick={removePromoCode} className="underline text-muted-foreground">
                  Remove
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputCode) {
                    applyPromoCode(inputCode);
                    setInputCode("");
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Promo code (BOLA10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent uppercase"
                />
                <button
                  type="submit"
                  className="rounded-md bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-foreground">{formatNaira(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Discount ({promoCode})</span>
                <span>-{formatNaira(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery ({shippingState})</span>
              <span className="text-foreground">{formatNaira(shippingFee)}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-border/60 text-base font-semibold text-foreground">
              <span>Total Amount</span>
              <span className="font-display text-xl text-foreground">{formatNaira(total)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground text-center pt-2">
            <ShieldCheck className="size-4 text-accent" />
            <span>Encrypted payment connection & nationwide delivery.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
