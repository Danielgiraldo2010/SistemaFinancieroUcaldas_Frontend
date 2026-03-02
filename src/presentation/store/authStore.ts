import { create } from "zustand";
import { UserDto } from "@/core/domain/types";
import { tokenManager } from "@/infrastructure/auth/TokenManager";
import { AuthStatus } from "@/core/domain/enums";

interface AuthState {
  user: UserDto | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingTwoFAToken: string | null;

  setUser: (user: UserDto | null) => void;
  setStatus: (status: AuthStatus) => void;
  setPendingTwoFAToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: AuthStatus.Idle,
  isAuthenticated: false,
  isLoading: false, // ✅ CAMBIADO: ya no bloquea si initialize() no se llama
  pendingTwoFAToken: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setStatus: (status) =>
    set({ status, isLoading: status === AuthStatus.Loading }),
  setPendingTwoFAToken: (token) => set({ pendingTwoFAToken: token }),

  logout: () => {
    tokenManager.clearTokens();
    set({
      user: null,
      status: AuthStatus.Unauthenticated,
      isAuthenticated: false,
      pendingTwoFAToken: null,
    });
  },

  initialize: () => {
    set({ isLoading: true }); // ✅ Solo loading mientras inicializa
    const token = tokenManager.getAccessToken();
    if (token && !tokenManager.isTokenExpired()) {
      set({
        status: AuthStatus.Authenticated,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      tokenManager.clearTokens();
      set({
        status: AuthStatus.Unauthenticated,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
