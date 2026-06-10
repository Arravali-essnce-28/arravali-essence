// frontend/src/types/index.ts
export interface Product {
  id: string | number;
  name: string;
  description: string;
  short_description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  back_image?: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  category: Category | string;
  weight?: number;
  isNew?: boolean;
  discount?: number;
  isOrganic?: boolean;
  isPremium?: boolean;
  isFeatured?: boolean;
  in_stock?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}