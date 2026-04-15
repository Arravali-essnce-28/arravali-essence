const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'https://arravali-ess.onrender.com/storage';

/**
 * Resolves a backend storage path to a full URL.
 * 
 * @param path The relative storage path (e.g., 'products/image.jpg' or '/storage/products/image.jpg')
 * @returns The full URL to the image or a fallback image
 */
export const getStorageUrl = (path: string | null | undefined): string => {
  if (!path) {
    return '/images/placeholder.jpg'; // Fallback to local placeholder
  }

  // If path is already a full URL, return it
  if (path.startsWith('http')) {
    return path;
  }

  // Clean the path (remove '/storage/' if it exists to avoid duplication)
  let cleanPath = path;
  if (cleanPath.startsWith('/storage/')) {
    cleanPath = cleanPath.replace('/storage/', '');
  } else if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.replace('storage/', '');
  }

  // Ensure leading slash is removed before joining
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  return `${STORAGE_URL}/${cleanPath}`;
};

/**
 * Common fallback for product images
 */
export const PRODUCT_PLACEHOLDER = 'https://via.placeholder.com/600x400?text=Arravali+Essence';
