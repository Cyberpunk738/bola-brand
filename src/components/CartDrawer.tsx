import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatNaira, waLink } from "@/lib/site";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    itemCount,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  if (!isCartOpen) return null;

  const buildWhatsAppOrderMessage = () => {
    let msg = `Hi Bola Brand! I'd like to place an order from the website:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (${item.selectedColor || "Standard"}) x${item.quantity} — ${formatNaira(item.product.numericPrice * item.quantity)}\n`;
    });
    if (promoCode) {
      msg += `\nPromo Code: ${promoCode} (-${formatNaira(discountAmount)})`;
    }
    msg += `\nSubtotal: ${formatNaira(subtotal)}`;
    msg += `\nEstimated Delivery: ${formatNaira(shippingFee)}`;
    msg += `\nTotal: ${formatNaira(total)}\n\nPlease advise on payment details!`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-background shadow-2xl transition-transform animate-in slide-in-from-right duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="size-5 text-foreground" />
              <h2 className="font-display text-xl tracking-wide uppercase">Your Shopping Bag</h2>
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                {itemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close cart"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-sand/60">
                <ShoppingBag className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-display text-2xl">Your bag is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Explore our luxury collection of handbags, pouches, and accessories.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full bg-primary px-7 py-3 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border/60">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 py-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-20 rounded-md object-cover bg-muted"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display text-base font-medium leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.selectedColor, item.selectedSize)
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedColor} {item.selectedSize ? `· ${item.selectedSize}` : ""}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center rounded-md border border-border/80 bg-background">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize,
                              )
                            }
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="px-2 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize,
                              )
                            }
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-base font-medium">
                          {formatNaira(item.product.numericPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="border-t border-border/60 bg-sand/30 px-6 py-3">
                {promoCode ? (
                  <div className="flex items-center justify-between text-xs text-accent font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="size-3.5" />
                      Promo Code <strong>{promoCode}</strong> applied (-{formatNaira(discountAmount)})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="underline text-muted-foreground hover:text-foreground"
                    >
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
                      placeholder="Promo code (e.g. BOLA10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-accent uppercase"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Footer Summary & Checkout CTA */}
              <div className="border-t border-border/60 p-6 space-y-3 bg-background">
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-foreground">{formatNaira(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>Discount</span>
                      <span>-{formatNaira(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-foreground">{formatNaira(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/60 text-sm font-semibold text-foreground">
                    <span>Total</span>
                    <span className="font-display text-lg text-foreground">{formatNaira(total)}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground font-medium"
                  >
                    Proceed to Checkout
                    <ArrowRight className="size-4" />
                  </Link>

                  <a
                    href={waLink(buildWhatsAppOrderMessage())}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs tracking-[0.15em] text-foreground uppercase transition-colors hover:bg-accent/10"
                  >
                    Order via WhatsApp
                  </a>
                </div>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center pt-1">
                  <ShieldCheck className="size-3.5 text-accent" />
                  Free returns & nationwide express delivery available.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
