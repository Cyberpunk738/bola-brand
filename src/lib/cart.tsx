import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Product, formatNaira } from "@/lib/site";
import { toast } from "sonner";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  shippingMethod: "standard" | "express";
  setShippingMethod: (method: "standard" | "express") => void;
  shippingState: string;
  setShippingState: (state: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "bola_brand_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [shippingState, setShippingState] = useState("Lagos");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isInitialized]);

  const addItem = (product: Product, quantity = 1, color?: string, size?: string) => {
    const defaultColor = color || (product.colors && product.colors[0]) || "";
    const defaultSize = size || (product.sizes && product.sizes[0]) || "";

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === defaultColor &&
          item.selectedSize === defaultSize,
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: defaultColor,
          selectedSize: defaultSize,
        },
      ];
    });

    toast.success(`Added ${product.name} to cart`, {
      description: `${formatNaira(product.numericPrice)} · ${defaultColor || "Standard"}`,
      action: {
        label: "View Cart",
        onClick: () => setIsCartOpen(true),
      },
    });
  };

  const removeItem = (productId: string, color?: string, size?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!color || item.selectedColor === color) &&
            (!size || item.selectedSize === size)
          ),
      ),
    );
    toast.info("Item removed from cart");
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    size?: string,
  ) => {
    if (quantity <= 0) {
      removeItem(productId, color, size);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!color || item.selectedColor === color) &&
          (!size || item.selectedSize === size)
        ) {
          return { ...item, quantity };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === "BOLA10" || trimmed === "WELCOME10") {
      setPromoCode(trimmed);
      setDiscountPercent(10);
      toast.success("Promo code applied!", { description: "10% off your total order." });
      return true;
    } else if (trimmed === "BOLA20" || trimmed === "VIP20") {
      setPromoCode(trimmed);
      setDiscountPercent(20);
      toast.success("VIP Promo code applied!", { description: "20% off your total order." });
      return true;
    } else {
      toast.error("Invalid promo code", { description: "Try using code 'BOLA10' for 10% off!" });
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
    toast.info("Promo code removed");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.numericPrice * item.quantity,
    0,
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Dynamic shipping calculation based on state & method
  const baseShipping =
    shippingState.toLowerCase() === "lagos"
      ? 1500
      : shippingState.toLowerCase() === "abuja" || shippingState.toLowerCase() === "rivers"
        ? 2500
        : 3500;

  const shippingFee = items.length === 0 ? 0 : shippingMethod === "express" ? baseShipping + 1500 : baseShipping;

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        itemCount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        shippingMethod,
        setShippingMethod,
        shippingState,
        setShippingState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
