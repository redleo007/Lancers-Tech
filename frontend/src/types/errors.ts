export interface ApiErrorResponse {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

export interface APIError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}