import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { products, waLink, formatNaira } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetail,
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    return {
      meta: [
        { title: `${product ? product.name : "Product"} — The Bola Brand` },
        {
          name: "description",
          content: product ? product.description : "Premium fashion accessory by The Bola Brand.",
        },
      ],
    };
  },
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addItem, setIsCartOpen } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10">
        <h1 className="font-display text-4xl">Product Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          The item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "");
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground mb-8">
        <button
          onClick={() => navigate({ to: "/shop" })}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to Shop
        </button>
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/5] w-full">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-background/90 px-3 py-1 text-xs tracking-[0.2em] uppercase font-medium rounded-xs">
                {product.tag}
              </span>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative size-20 rounded-md overflow-hidden bg-muted border-2 transition-all shrink-0 ${
                    activeImage === img ? "border-accent shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="eyebrow text-accent font-medium">{product.category}</span>
            <div className="flex items-start justify-between gap-4 mt-2">
              <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                {product.name}
              </h1>
              <button
                onClick={handleShare}
                className="rounded-full p-2 text-muted-foreground hover:bg-sand hover:text-foreground transition-colors"
                title="Share product"
              >
                <Share2 className="size-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <span className="font-display text-2xl font-semibold text-foreground">
                {product.price}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-l border-border/80 pl-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-accent" />
                  ))}
                </div>
                <span className="font-medium text-foreground">{product.rating}</span>
                <span>({product.reviewsCount || 24} reviews)</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.fullDescription || product.description}
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs tracking-[0.15em] uppercase font-medium text-foreground">
                Select Color: <span className="text-accent">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs rounded-md border transition-all ${
                      selectedColor === color
                        ? "border-accent bg-accent/10 text-accent font-medium"
                        : "border-border/80 bg-background text-foreground/80 hover:border-accent"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs tracking-[0.15em] uppercase font-medium text-foreground">
                Select Size: <span className="text-accent">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs rounded-md border transition-all ${
                      selectedSize === size
                        ? "border-accent bg-accent/10 text-accent font-medium"
                        : "border-border/80 bg-background text-foreground/80 hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-md border border-border bg-background px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-muted-foreground hover:text-foreground font-medium"
                >
                  -
                </button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-muted-foreground hover:text-foreground font-medium"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                In Stock & Ready to Dispatch
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  addItem(product, quantity, selectedColor, selectedSize);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase hover:bg-accent hover:text-accent-foreground transition-colors font-medium shadow-md"
              >
                <ShoppingBag className="size-4" />
                Add to Bag — {formatNaira(product.numericPrice * quantity)}
              </button>

              <a
                href={waLink(
                  `Hi Bola Brand! I'd like to order ${quantity}x ${product.name} (${selectedColor || "Standard"}) for ${formatNaira(product.numericPrice * quantity)}.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-xs tracking-[0.15em] text-foreground uppercase hover:bg-accent/10 transition-colors font-medium"
              >
                Buy via WhatsApp
              </a>
            </div>
          </div>

          {/* Key Product Details */}
          {product.details && product.details.length > 0 && (
            <div className="border-t border-border/60 pt-6 space-y-3">
              <h4 className="eyebrow text-foreground">Craftsmanship & Details</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guarantees Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-border/60 py-6 text-center text-xs">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="size-5 text-accent" />
              <span className="font-medium text-foreground">Fast Dispatch</span>
              <span className="text-[10px] text-muted-foreground">Lagos & Nationwide</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="size-5 text-accent" />
              <span className="font-medium text-foreground">Guaranteed Quality</span>
              <span className="text-[10px] text-muted-foreground">100% Handpicked</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw className="size-5 text-accent" />
              <span className="font-medium text-foreground">Easy Exchange</span>
              <span className="text-[10px] text-muted-foreground">Hassle-free Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 border-t border-border/60 pt-16">
          <h2 className="font-display text-3xl">You May Also Love</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
