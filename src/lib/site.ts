export const WHATSAPP = "https://wa.me/2347054437192";

export const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export type Product = {
  id: string;
  name: string;
  category: "Totebags" | "Pouches" | "Purses" | "Nails";
  description: string;
  fullDescription?: string;
  price: string;
  numericPrice: number;
  rating: string;
  reviewsCount?: number;
  tag?: string;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  details?: string[];
  inStock?: boolean;
};

export const collections = [
  {
    id: "essence-pouch",
    name: "Essence Pouch",
    category: "Pouches",
    description: "Premium fashion accessory for the modern woman",
    price: "From ₦4,000",
    tag: "Featured",
    image: "/asset/essencepouch1.jpg",
  },
  {
    id: "totebags",
    name: "Totebags",
    category: "Totebags",
    description: "Stylish and versatile bags for everyday use",
    price: "From ₦5,000",
    tag: "Bestseller",
    image: "/asset/newtote.jpg",
  },
  {
    id: "digital-purse",
    name: "Digital Purse",
    category: "Purses",
    description: "Modern and elegant design for tech-savvy women",
    price: "From ₦5,000",
    tag: "New",
    image: "/asset/purse.jpg",
  },
];

export const products: Product[] = [
  {
    id: "glamour-totebag",
    name: "Glamour Totebag",
    category: "Totebags",
    description: "Premium quality totebag crafted for everyday luxury and effortless style.",
    fullDescription:
      "Crafted with durable high-grade materials and reinforced leather handles, the Glamour Totebag effortlessly holds your daily essentials while elevating any ensemble. Features a spacious main compartment, inner zipper pocket, and magnetic snap closure.",
    price: "₦5,000",
    numericPrice: 5000,
    rating: "4.9",
    reviewsCount: 28,
    tag: "Hot",
    image: "/asset/tote1.jpg",
    images: ["/asset/tote1.jpg", "/asset/newtote.jpg", "/asset/tote3.jpg"],
    colors: ["Black", "Cream", "Tan"],
    sizes: ["Standard (14\" x 16\")", "Large (16\" x 18\")"],
    details: [
      "Heavyweight textured canvas with gold accents",
      "Internal laptop sleeve fits up to 15\" devices",
      "Water-resistant interior lining",
      "Reinforced base panel for structure",
    ],
    inStock: true,
  },
  {
    id: "chic-essence-pouch",
    name: "Chic Essence Pouch",
    category: "Pouches",
    description: "Compact and elegant pouch design for the sophisticated modern woman.",
    fullDescription:
      "The Chic Essence Pouch is designed for sleek organization. Perfectly proportioned to store your beauty products, jewelry, or tech accessories in luxury.",
    price: "₦4,000",
    numericPrice: 4000,
    rating: "4.7",
    reviewsCount: 19,
    tag: "Trending",
    image: "/asset/essencepouch2.jpg",
    images: ["/asset/essencepouch2.jpg", "/asset/essencepouch1.jpg"],
    colors: ["Blush Pink", "Sand", "Gold"],
    sizes: ["One Size"],
    details: [
      "Smooth vegan leather material",
      "Custom gold-tone zip puller",
      "Soft velvet protective interior lining",
    ],
    inStock: true,
  },
  {
    id: "everyday-tote",
    name: "Everyday Tote",
    category: "Totebags",
    description: "Versatile and lightweight tote designed for daily work & weekend adventures.",
    fullDescription:
      "Your new staple handbag. Built to withstand busy commutes and weekend getaways without sacrificing a single drop of chic aesthetic.",
    price: "₦5,000",
    numericPrice: 5000,
    rating: "5.0",
    reviewsCount: 42,
    image: "/asset/tote3.jpg",
    images: ["/asset/tote3.jpg", "/asset/tote1.jpg", "/asset/newtote.jpg"],
    colors: ["Beige", "Mocha", "Charcoal"],
    sizes: ["Standard"],
    details: [
      "Dual comfortable shoulder straps",
      "Side slip pocket for quick phone access",
      "Easy spot-clean exterior finish",
    ],
    inStock: true,
  },
  {
    id: "digital-purse",
    name: "Digital Purse",
    category: "Purses",
    description: "Modern, streamlined purse tailored for carrying essentials and mobile gadgets.",
    fullDescription:
      "A slim structure built for quick errands and evening outings. Fits large smartphones, cardholders, lipstick, and keys with dedicated organized slots.",
    price: "₦5,000",
    numericPrice: 5000,
    rating: "4.8",
    reviewsCount: 35,
    tag: "New",
    image: "/asset/purse2.jpg",
    images: ["/asset/purse2.jpg", "/asset/purse.jpg"],
    colors: ["Obsidian", "Rose Gold", "Pearl White"],
    sizes: ["Slim Compact"],
    details: [
      "Detachable gold chain shoulder strap",
      "RFID blocking internal card slots",
      "Secure magnetic clasp closure",
    ],
    inStock: true,
  },
];

export const aboutText =
  "The Bola Brand is a fashion and beauty destination dedicated to empowering women through stylish and high-quality accessories. Our curated collections of nails, handbags, and tote bags are designed to complement your unique style and make a statement. We believe every woman deserves to feel confident and beautiful with accessories that reflect her personality.";

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
