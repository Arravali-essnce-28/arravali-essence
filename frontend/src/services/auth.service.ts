// src/services/auth.service.ts
import httpClient, { extractErrorMessage } from '../lib/httpClient';
import { LoginCredentials, RegisterData, User, AuthResponse } from '../types/auth';

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<any> => {
  try {
    const response = await httpClient.post('/register', data);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await httpClient.post('/login', credentials);

    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    await httpClient.post('/logout');
  } catch (error) {
    console.error('Logout error:', extractErrorMessage(error));
  } finally {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  }
};

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<any> => {
  try {
    const response = await httpClient.get(`/email/verify/${token}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (email: string): Promise<any> => {
  try {
    const response = await httpClient.post('/email/resend', { email });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Get stored auth data
 */
export const getAuthData = (): AuthResponse | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Hook-like function for auth store access
 */
export const useAuthStore = () => {
  const authData = getAuthData();
  return {
    user: authData?.user || null,
    logout: logout
  };
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  const authData = getAuthData();
  return authData?.user || null;
};

/**
 * Social Auth: Google
 */
export const loginWithGoogle = async (): Promise<void> => {
  try {
    const response = await httpClient.get('/auth/google');
    const authUrl = response.data.url;
    if (authUrl) {
      window.location.href = authUrl;
    }
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Handle Google callback
 */
export const handleGoogleCallback = async (searchParams: string): Promise<AuthResponse> => {
  try {
    const response = await httpClient.get(`/auth/google/callback${searchParams}`);

    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};