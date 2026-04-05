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
    const productsData = response.data ? response.data : response;

    // Safety check just in case
    if (!Array.isArray(productsData)) {
      throw new Error("Expected an array of products");
    }

    return productsData.map((product: any) => ({
      id: String(product.id),
      name: product.name,
      slug: product.slug,
      description: product.description || product.short_description,
      short_description: product.short_description,
      price: product.sale_price ? Number(product.sale_price) : Number(product.price),
      originalPrice: product.sale_price ? Number(product.price) : undefined,
      final_price: product.final_price || product.price,
      has_discount: product.has_discount || false,
      discount_percentage: product.discount_percentage,
      isFeatured: product.is_featured || false,
      in_stock: product.in_stock !== false,
      image: product.image || 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
      rating: product.rating || 4.5 + Math.random() * 0.5,
      reviews: product.reviews || Math.floor(Math.random() * 300) + 50,
      category: product.category, // Object {id, name}
      weight: product.weight || 100,
      isNew: Math.random() > 0.7,
      discount: product.discount_percentage || (product.sale_price ? Math.round((1 - product.sale_price / product.price) * 100) : 0),
      isOrganic: product.category?.name?.includes('Organic'),
      isPremium: product.category?.name?.includes('Premium'),
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