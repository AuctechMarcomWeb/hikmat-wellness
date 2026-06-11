// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  brand: string;
  type: "ayurveda" | "unani" | "herbal";
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  dosage: string;
  precautions: string[];
  sideEffects?: string[];
  manufacturer: string;
  packSize: string;
  formulation: string;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  badge?: string;
  healthConcern: string[];
  certifications: string[];
  expiryMonths: number;
  countryOfOrigin: string;
  weight: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  color: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  views: number;
}

export interface Author {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  rating: number;
  consultations: number;
  avatar: string;
  languages: string[];
  available: boolean;
  fee: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  address: Address;
  placedAt: string;
  expectedDelivery: string;
  trackingId?: string;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  addresses: Address[];
  createdAt: string;
}

export interface FilterState {
  type: string[];
  category: string[];
  brand: string[];
  priceRange: [number, number];
  rating: number | null;
  healthConcern: string[];
  inStock: boolean;
}

export interface SearchResult {
  products: Product[];
  blogs: BlogPost[];
  categories: Category[];
  total: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Notification {
  id: string;
  type: "order" | "offer" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
