// Real API data - connected to backend
import type { Product } from '../types';
import { api } from '../services/api';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.getProducts();
    return response.data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.sale_price || null,
      image: product.image,
      rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
      reviews: Math.floor(Math.random() * 300) + 50, // Random reviews 50-350
      category: product.category?.name || 'Uncategorized',
      weight: product.weight || 100,
      isNew: Math.random() > 0.7, // 30% chance of being new
      discount: product.sale_price ? Math.round((1 - product.sale_price / product.price) * 100) : 0
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.getProduct(id);
    const product = response.data;
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.sale_price || null,
      image: product.image,
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 300) + 50,
      category: product.category?.name || 'Uncategorized',
      weight: product.weight || 100,
      isNew: Math.random() > 0.7,
      discount: product.sale_price ? Math.round((1 - product.sale_price / product.price) * 100) : 0
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};