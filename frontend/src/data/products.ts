// Real API data - connected to backend
import type { Product } from '../types';
import { api } from '../services/api';

// Fallback data for when API is not available
const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Turmeric Powder',
    description: 'Pure, organic turmeric powder with vibrant color and authentic flavor. Perfect for curries and golden milk.',
    price: 8.99,
    originalPrice: 12.99,
    image: '/images/products/turmeric.jpg',
    rating: 4.8,
    reviews: 234,
    category: 'Ground Spices',
    weight: 100,
    isNew: true,
    discount: 31
  },
  {
    id: '2',
    name: 'Whole Cinnamon Sticks',
    description: 'Premium quality cinnamon sticks from Sri Lanka. Sweet, warm aroma perfect for baking and beverages.',
    price: 6.99,
    originalPrice: undefined,
    image: '/images/products/cinnamon.jpg',
    rating: 4.6,
    reviews: 189,
    category: 'Whole Spices',
    weight: 50,
    isNew: false,
    discount: 0
  },
  {
    id: '3',
    name: 'Garam Masala Blend',
    description: 'Traditional Indian spice blend with aromatic flavors. A perfect mix for authentic Indian cuisine.',
    price: 5.99,
    originalPrice: 7.99,
    image: '/images/products/garam-masala.jpg',
    rating: 4.7,
    reviews: 312,
    category: 'Spice Blends',
    weight: 100,
    isNew: true,
    discount: 25
  },
  {
    id: '4',
    name: 'Organic Cumin Seeds',
    description: 'Whole cumin seeds with intense, earthy flavor. Essential for Indian and Middle Eastern dishes.',
    price: 4.99,
    originalPrice: undefined,
    image: '/images/products/cumin.jpg',
    rating: 4.5,
    reviews: 156,
    category: 'Whole Spices',
    weight: 100,
    isNew: false,
    discount: 0
  }
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.getProducts();
    return response.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.sale_price || undefined,
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
    // Return fallback data when API fails
    console.log('Using fallback products data');
    return fallbackProducts;
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.getProduct(id);
    const product = response;
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.sale_price || undefined,
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
    // Return fallback product if available
    return fallbackProducts.find(p => p.id === id) || null;
  }
};