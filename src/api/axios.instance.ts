import axios from 'axios';
import { useAuthStore } from '@store/auth.store';
import { API_CONFIG } from '@config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Este "policía" revisa cada salida y pone el Token si existe
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;