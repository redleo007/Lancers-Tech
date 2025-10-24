export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
  error?: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}