import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      // Guarda el token y marca como autenticado
      setToken: (token: string) => 
        set({ token, isAuthenticated: true }),

      // Limpia todo al cerrar sesión
      logout: () => 
        set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Nombre de la "llave" en localStorage
    }
  )
);