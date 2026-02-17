import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos qué datos queremos guardar del usuario
interface User {
  id: string;
  nombre: string;
  rol: 'ADMIN' | 'USER' | 'AUDITOR';
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuth: boolean;
  // Acciones para modificar el estado
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuth: false,

      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: !!token,
        })),

      setUser: (user: User) =>
        set(() => ({
          user,
        })),

      logout: () =>
        set(() => ({
          token: null,
          user: null,
          isAuth: false,
        })),
    }),
    {
      name: 'auth-storage', // Nombre de la llave en LocalStorage
    },
  ),
);
