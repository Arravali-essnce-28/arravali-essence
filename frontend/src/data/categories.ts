// Real API data - connected to backend
import type { Category } from '../types';
import { api } from '../services/api';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.getCategories();
    return response.data.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      productCount: Math.floor(Math.random() * 20) + 5, // Random product count
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategory = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.getCategories();
    const category = response.data.find((c: any) => c.slug === slug);
    if (!category) return null;
    
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      productCount: Math.floor(Math.random() * 20) + 5,
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};
