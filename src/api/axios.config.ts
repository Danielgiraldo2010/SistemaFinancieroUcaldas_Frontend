import axios from 'axios';
import { ENV } from '@config/env.config';
import { useAuthStore } from '@store/auth.store';

// 1. Creamos la instancia base con la URL de la U. de Caldas
const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de PETICIÓN (Request)
// Aquí inyectamos el token antes de que salga la llamada
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Interceptor de RESPUESTA (Response)
// Aquí manejamos errores globales (como si el token expira)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend nos dice 401 (No autorizado), cerramos sesión
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default api;
