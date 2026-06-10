import httpClient from '../lib/httpClient';
import { getStorageUrl } from '../lib/imageUtils';

/**
 * Transforms product data from API to UI format
 */
const transformProduct = (product: any) => {
  if (!product) return null;
  return {
    ...product,
    id: String(product.id),
    image: getStorageUrl(product.image),
    back_image: product.back_image ? getStorageUrl(product.back_image) : undefined,
    gallery: Array.isArray(product.gallery)
      ? product.gallery.map((img: any) => getStorageUrl(img))
      : [],
    // Fallback for missing fields or formatting
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
  };
};

/**
 * Main API service for Arravali Essence
 */
export const api = {
  // Products
  getProducts: async () => {
    const response = await httpClient.get('/products');
    const data = response.data;
    if (data && Array.isArray(data.data)) {
      data.data = data.data.map(transformProduct);
    }
    return data;
  },

  getProduct: async (id: string | number) => {
    const response = await httpClient.get(`/products/${id}`);
    const data = response.data;
    if (data && data.data) {
      data.data = transformProduct(data.data);
    } else if (data && !data.data && data.id) {
      // Handle cases where data is at the root
      return transformProduct(data);
    }
    return data;
  },

  // Categories
  getCategories: async () => {
    const response = await httpClient.get('/categories');
    return response.data;
  },

  // Cart
  getCart: async () => {
    const response = await httpClient.get('/cart');
    return response.data;
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await httpClient.post('/cart', {
      product_id: productId,
      quantity: quantity,
    });
    return response.data;
  },

  updateCartItem: async (cartItemId: number, quantity: number) => {
    const response = await httpClient.put(`/cart/${cartItemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (cartItemId: number) => {
    const response = await httpClient.delete(`/cart/${cartItemId}`);
    return response.data;
  },

  // Payment
  processPayment: async (orderData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    payment_method: string;
  }) => {
    const response = await httpClient.post('/payment/process', orderData);
    return response.data;
  },

  createPaymentIntent: async (shippingData: any) => {
    const response = await httpClient.post('/payment/create-intent', shippingData);
    return response.data;
  },

  getOrder: async (orderNumber: string) => {
    const response = await httpClient.get(`/order/${orderNumber}`);
    return response.data;
  },

  // Auth (Proxying to auth service or keeping simple here)
  login: async (credentials: { email: string; password: string }) => {
    const response = await httpClient.post('/login', credentials);
    return response.data;
  },

  register: async (userData: any) => {
    const response = await httpClient.post('/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await httpClient.post('/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return response.data;
  },

  // Order Tracking
  getUserOrders: async () => {
    const response = await httpClient.get('/orders');
    return response.data;
  },

  trackOrder: async (orderNumber: string) => {
    const response = await httpClient.get(`/track/${orderNumber}`);
    return response.data;
  },

  getOrderTrackingTimeline: async (orderNumber: string) => {
    const response = await httpClient.get(`/track/${orderNumber}/timeline`);
    return response.data;
  },

  updateOrderTracking: async (orderNumber: string, trackingData: {
    status: string;
    description?: string;
    location?: string;
    estimated_delivery?: string;
    tracking_number?: string;
    carrier?: string;
  }) => {
    const response = await httpClient.put(`/track/${orderNumber}`, trackingData);
    return response.data;
  },

  // Admin
  getAdminStats: async () => {
    const response = await httpClient.get('/admin/dashboard');
    return response.data;
  },

  getAdminProducts: async (page: number = 1) => {
    const response = await httpClient.get('/admin/products', {
      params: { page }
    });
    return response.data;
  },

  storeProduct: async (productData: FormData) => {
    const response = await httpClient.post('/admin/products', productData);
    return response.data;
  },

  updateProduct: async (id: number, productData: FormData | any) => {
    const isFormData = productData instanceof FormData;
    
    if (isFormData) {
      // Laravel handles PUT with FormData by using POST + _method spoofing
      productData.append('_method', 'PUT');
    }

    const response = await httpClient.post(`/admin/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await httpClient.delete(`/admin/products/${id}`);
    return response.data;
  },

  getAdminOrders: async (page: number = 1) => {
    const response = await httpClient.get('/admin/orders', {
      params: { page }
    });
    return response.data;
  },

  updateOrderStatus: async (orderId: number, status: string) => {
    const response = await httpClient.put(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },

  // User Management
  getUsers: async (page: number = 1) => {
    const response = await httpClient.get('/admin/users', {
      params: { page }
    });
    return response.data;
  },

  getUserDetails: async (userId: number) => {
    const response = await httpClient.get(`/admin/users/${userId}`);
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const response = await httpClient.delete(`/admin/users/${userId}`);
    return response.data;
  },
};

export default api;