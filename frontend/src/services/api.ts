const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Generate session ID for guest users
const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Common headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Session-ID': getSessionId(),
  'Accept': 'application/json',
});

export const api = {
  // Products
  getProducts: async () => {
    try {
      console.log('Fetching products from:', API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: getHeaders(),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
      }),
    });
    return response.json();
  },

  updateCartItem: async (cartItemId: number, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  },

  removeFromCart: async (cartItemId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/payment/process`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getOrder: async (orderNumber: string) => {
    const response = await fetch(`${API_BASE_URL}/order/${orderNumber}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Auth
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  logout: async () => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Authorization': `Bearer ${token}`,
      },
    });
    localStorage.removeItem('auth_token');
    return response.json();
  },

  // Order Tracking
  getUserOrders: async () => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        ...getHeaders(),
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  trackOrder: async (orderNumber: string) => {
    const response = await fetch(`${API_BASE_URL}/track/${orderNumber}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getOrderTrackingTimeline: async (orderNumber: string) => {
    const response = await fetch(`${API_BASE_URL}/track/${orderNumber}/timeline`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateOrderTracking: async (orderNumber: string, trackingData: {
    status: string;
    description?: string;
    location?: string;
    estimated_delivery?: string;
    tracking_number?: string;
    carrier?: string;
  }) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/track/${orderNumber}`, {
      method: 'PUT',
      headers: {
        ...getHeaders(),
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(trackingData),
    });
    return response.json();
  },
};

export default api;