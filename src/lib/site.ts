export const WHATSAPP = "https://wa.me/2347054437192";

export const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export type Product = {
  name: string;
  description: string;
  price: string;
  rating: string;
  tag?: string;
  image: string;
};

export const collections = [
  {
    name: "Essence Pouch",
    description: "Premium fashion accessory for the modern woman",
    price: "From ₦4,000",
    tag: "Featured",
    image: "/asset/essencepouch1.jpg",
  },
  {
    name: "Totebags",
    description: "Stylish and versatile bags for everyday use",
    price: "From ₦5,000",
    tag: "Bestseller",
    image: "/asset/newtote.jpg",
  },
  {
    name: "Digital Purse",
    description: "Modern and elegant design for tech-savvy women",
    price: "From ₦5,000",
    tag: "New",
    image: "/asset/purse.jpg",
  },
];

export const products: Product[] = [
  {
    name: "Glamour Totebag",
    description: "Premium quality totebag for everyday elegance",
    price: "₦5,000",
    rating: "4.9",
    tag: "Hot",
    image: "/asset/tote1.jpg",
  },
  {
    name: "Chic Essence Pouch",
    description: "Elegant design for the sophisticated woman",
    price: "₦4,000",
    rating: "4.7",
    tag: "Trending",
    image: "/asset/essencepouch2.jpg",
  },
  {
    name: "Everyday Tote",
    description: "Versatile and stylish for daily adventures",
    price: "₦5,000",
    rating: "5.0",
    image: "/asset/tote3.jpg",
  },
  {
    name: "Digital Purse",
    description: "Modern accessory for the tech-savvy woman",
    price: "₦5,000",
    rating: "4.8",
    tag: "New",
    image: "/asset/purse2.jpg",
  },
];

export const aboutText =
  "Bola Brand is a fashion and beauty brand dedicated to empowering women through stylish and high-quality accessories. Our curated collections of nails, handbags, and tote bags are designed to complement your unique style and make a statement. We believe every woman deserves to feel confident and beautiful with accessories that reflect her personality.";
