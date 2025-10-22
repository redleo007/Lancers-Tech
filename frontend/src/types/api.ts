export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export type ApiRequestHandler<T> = () => Promise<ApiResponse<T>>;