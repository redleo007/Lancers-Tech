import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { useAuth } from './useAuth';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const api = axios.create({
  baseURL: API,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface UseApiOptions<T> {
  initialData?: T;
}

export function useApi<T>(url: string, options: AxiosRequestConfig = {}, hookOptions: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(hookOptions.initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const { logout } = useAuth();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api({ url, ...options });
      setData(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(options), logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}