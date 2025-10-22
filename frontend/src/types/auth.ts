export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
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