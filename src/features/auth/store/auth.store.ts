import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  tempToken: string | null;
  is2FARequired: boolean;
  user: User | null;

  // Props para enable2FA
  twoFAQr: string | null;
  twoFASecret: string | null;

  setToken: (token: string) => void;
  setTempToken: (tempToken: string) => void;
  set2FARequired: (flag: boolean) => void;
  setUser: (user: User | null) => void;
  setTwoFAQr: (qr: string | null) => void;
  setTwoFASecret: (secret: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  tempToken: null,
  is2FARequired: false,
  user: null,

  twoFAQr: null,
  twoFASecret: null,

  setToken: (token) => set({ token }),
  setTempToken: (tempToken) => set({ tempToken }),
  set2FARequired: (flag) => set({ is2FARequired: flag }),
  setUser: (user) => set({ user }),
  setTwoFAQr: (qr) => set({ twoFAQr: qr }),
  setTwoFASecret: (secret) => set({ twoFASecret: secret }),
}));
