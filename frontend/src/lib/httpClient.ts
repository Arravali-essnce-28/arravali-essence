import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://arravali-ess.onrender.com/api';

/**
 * Interface for API error response
 */
export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Get session ID for guest tracking
 */
const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

/**
 * Get auth token from local storage
 * Note: Consolidating to check both 'auth_token' and 'user' object for backward compatibility
 */
const getAuthToken = (): string | null => {
  const token = localStorage.getItem('auth_token');
  if (token) return token;

  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const userData = JSON.parse(userStr);
      return userData.access_token || null;
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Create Axios instance
 */
const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['X-Session-ID'] = getSessionId();
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Global error handling
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect if necessary
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      
      // We don't necessarily want to redirect automatically on every 401 
      // as some APIs might be called in the background or for guest users.
      // But we clear the tokens to be safe.
    }

    // Extract detailed error message
    const message = extractErrorMessage(error);
    
    // Attach the clean message to the error object for services to use
    error.message = message;

    return Promise.reject(error);
  }
);

/**
 * Utility to extract clean error message from Axios error
 */
export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse | string>;
    const responseData = axiosError.response?.data;

    if (typeof responseData === 'string') {
      return responseData;
    }

    if (responseData && typeof responseData === 'object') {
      if (responseData.message) {
        return responseData.message;
      }

      const errors = responseData.errors;
      if (errors) {
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          const firstErrorMessage = errors[firstErrorKey]?.[0];
          if (firstErrorMessage) {
            return firstErrorMessage;
          }
        }
      }
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  return 'Something went wrong. Please try again.';
};

export default httpClient;
