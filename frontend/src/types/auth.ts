export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  role?: 'admin' | 'employee' | 'customer' | string;
  is_admin?: boolean;
  permissions?: string[] | null;
  status?: 'active' | 'inactive' | string;
  email_verified_at: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PermissionCapability {
  id: string;
  label: string;
  description: string;
}

export interface PermissionModule {
  group: string;
  description: string;
  permissions: PermissionCapability[];
}

export interface RolePreset {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role?: 'employee' | 'admin';
  permissions: string[];
  status: 'active' | 'inactive';
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
  expires_in?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}