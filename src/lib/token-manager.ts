import Cookies from 'js-cookie';
import { env } from '@/config';

const ACCESS_TOKEN_KEY  = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? 'sapfiai_access_token';
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? 'sapfiai_refresh_token';
const TOKEN_EXPIRY_KEY  = process.env.NEXT_PUBLIC_TOKEN_EXPIRY_KEY  ?? 'sapfiai_token_expiry';

export class TokenManager {
  private static instance: TokenManager;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) TokenManager.instance = new TokenManager();
    return TokenManager.instance;
  }

  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken: string, expiry?: string): void {
    const cookieOptions = { secure: true, sameSite: 'strict' as const };
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { ...cookieOptions, expires: 1 });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { ...cookieOptions, expires: 30 });
    if (expiry) Cookies.set(TOKEN_EXPIRY_KEY, expiry, cookieOptions);
  }

  clearTokens(): void {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(TOKEN_EXPIRY_KEY);
  }

  isTokenExpired(): boolean {
    const expiry = Cookies.get(TOKEN_EXPIRY_KEY);
    if (!expiry) return !this.getAccessToken();
    return new Date(expiry) <= new Date();
  }

  decodeToken(token?: string): Record<string, unknown> | null {
    const t = token ?? this.getAccessToken();
    if (!t) return null;
    try {
      return JSON.parse(atob(t.split('.')[1]));
    } catch {
      return null;
    }
  }

  getRolesFromToken(): string[] {
    const payload = this.decodeToken();
    if (!payload) return [];
    const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const roles = payload[roleKey] ?? payload['role'] ?? payload['roles'] ?? [];
    return Array.isArray(roles) ? roles : [roles as string];
  }

  is2FAPending(): boolean {
    const payload = this.decodeToken();
    return payload?.['2fa_pending'] === 'true';
  }

  async refreshAccessToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(
      `${env.backendUrl}/api/Authentication/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();
    if (data.token && data.refreshToken) {
      this.setTokens(data.token, data.refreshToken, data.refreshTokenExpiry);
    }
  }
}

export const tokenManager = TokenManager.getInstance();
