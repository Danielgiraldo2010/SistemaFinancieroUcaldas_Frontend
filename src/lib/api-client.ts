import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { tokenManager } from './token-manager';

export class ApiClient {
  private static instance: ApiClient;
  private readonly client: AxiosInstance;
  private static readonly INTERNAL_PROXY_BASE_URL = '/api/backend';

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' },
    });

    // Interceptor de request: adjunta Bearer token
    this.client.interceptors.request.use(async (config) => {
      const token = tokenManager.getAccessToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Interceptor de response: refresca token en 401
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original: AxiosRequestConfig & { _retry?: boolean } = error.config;
        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            await tokenManager.refreshAccessToken();
            return this.client(original);
          } catch {
            tokenManager.clearTokens();
            if (typeof globalThis !== 'undefined') globalThis.location.href = '/login';
            throw error;
          }
        }
        throw error;
      }
    );
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      // Usar proxy interno evita CORS en el navegador.
      ApiClient.instance = new ApiClient(ApiClient.INTERNAL_PROXY_BASE_URL);
    }
    return ApiClient.instance;
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();
