// src/services/auth.service.ts
import axios, { AxiosError } from 'axios';
import { LoginCredentials, RegisterData, User, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> } | string>;
    const responseData = axiosError.response?.data;

    if (typeof responseData === 'string') {
      return responseData;
    }

    if (responseData && typeof responseData === 'object') {
      if (responseData.message) {
        return responseData.message;
      }

      const firstErrorKey = Object.keys(responseData.errors ?? {})[0];
      if (firstErrorKey) {
        const firstErrorMessage = responseData.errors?.[firstErrorKey]?.[0];
        if (firstErrorMessage) {
          return firstErrorMessage;
        }
      }
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  return 'Something went wrong. Please try again.';
};

export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Accept': 'application/json',
      }
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  } finally {
    localStorage.removeItem('user');
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/email/verify/${token}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/email/resend`,
      { email },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const getAuthData = (): AuthResponse | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getCurrentUser = (): User | null => {
  const authData = getAuthData();
  return authData?.user || null;
};

const getAuthToken = (): string | null => {
  const authData = getAuthData();
  return authData?.access_token || null;
};