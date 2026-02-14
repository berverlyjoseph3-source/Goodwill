export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inventory: number;
  description: string;
  deliveryEstimate: string;
  warranty: string;
  features?: string[];
  specifications?: Array<{ name: string; value: string }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface SearchResult {
  products: Product[];
  categories: any[];
  total: number;
}