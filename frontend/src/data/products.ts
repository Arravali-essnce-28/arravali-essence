// Real API data - connected to backend
import type { Product } from '../types';
import { api } from '../services/api';

// Fallback data for when API is not available
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
    discount: 17
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
    discount: 23
  },
  {
    id: '7',
    name: 'Exotic Saffron Threads',
    description: 'Premium grade saffron threads with intense color and aroma.',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8bf?w=400',
    rating: 4.9,
    reviews: 67,
    category: 'Exotic Spices',
    weight: 5,
    isNew: false,
    discount: 25
  },
  {
    id: '8',
    name: 'Smoked Paprika',
    description: 'Rich, smoky paprika with vibrant red color.',
    price: 13.99,
    originalPrice: 16.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0ad1b2330c4?w=400',
    rating: 4.7,
    reviews: 203,
    category: 'Ground Spices',
    weight: 150,
    isNew: true,
    discount: 18
  }
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.getProducts();
    // Laravel API Resources wrap data in a 'data' key
    const productsData = response.data ? response.data : response;

    if (!Array.isArray(productsData)) {
      console.error("Expected array but got:", productsData);
      return fallbackProducts;
    }

    return productsData.map((product: any) => ({
      id: String(product.id),
      name: product.name,
      slug: product.slug,
      description: product.description || product.short_description,
      short_description: product.short_description,
      price: Number(product.price),
      originalPrice: product.sale_price ? Number(product.price) : undefined,
      final_price: Number(product.final_price),
      has_discount: Boolean(product.has_discount),
      discount_percentage: product.discount_percentage,
      isFeatured: Boolean(product.is_featured),
      in_stock: Boolean(product.in_stock),
      image: product.image || 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
      category: typeof product.category === 'object' ? product.category?.name : (product.category || 'Uncategorized'),
      weight: product.weight || 100,
      isNew: Boolean(product.isNew),
      discount: product.discount_percentage || 0,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return fallbackProducts;
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.getProduct(id);
    // Unpack from the 'data' wrapper
    const product = response.data ? response.data : response;

    if (!product || !product.id) return null;

    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: Number(product.price),
      originalPrice: product.sale_price ? Number(product.price) : undefined,
      image: product.image,
      rating: product.rating || 4.8,
      reviews: product.reviews || 120,
      category: typeof product.category === 'object' ? product.category?.name : (product.category || 'Uncategorized'),
      weight: product.weight || 100,
      isNew: Boolean(product.isNew),
      discount: product.discount_percentage || 0
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return fallbackProducts.find(p => p.id === id) || null;
  }
};