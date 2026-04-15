// Real API data - connected to backend
import type { Product } from '../types';
import { api } from '../services/api';

/**
 * Fallback data for when API is not available
 */
const fallbackProducts: Product[] = [
  {
    id: '5',
    name: 'Organic Cardamom Pods',
    description: 'Aromatic green cardamom pods with intense flavor and fragrance.',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1608142947417-5d0535b9e7c5?w=400',
    rating: 4.9,
    reviews: 189,
    category: 'Whole Spices',
    weight: 100,
    isNew: true,
    discount: 17,
    in_stock: true
  },
  {
    id: '6',
    name: 'Hot Red Chili Powder',
    description: 'Intensely hot chili powder made from premium dried red chilies.',
    price: 9.99,
    originalPrice: 12.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0ad1b2330c4?w=400',
    rating: 4.5,
    reviews: 267,
    category: 'Ground Spices',
    weight: 250,
    isNew: false,
    discount: 23,
    in_stock: true
  }
];

/**
 * Fetch all products
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const responseData = await api.getProducts();
    const products = responseData.data || [];

    if (!Array.isArray(products)) {
      return fallbackProducts;
    }

    return products.map((product: any) => ({
      ...product,
      category: typeof product.category === 'object' ? product.category?.name : (product.category || 'Uncategorized'),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return fallbackProducts;
  }
};

/**
 * Fetch a single product by ID
 */
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const responseData = await api.getProduct(id);
    const product = responseData.data || responseData;

    if (!product || !product.id) return null;

    return {
      ...product,
      category: typeof product.category === 'object' ? product.category?.name : (product.category || 'Uncategorized'),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return fallbackProducts.find(p => p.id === id) || null;
  }
};