import { apiClient } from '../../http/ApiClient';
import { tokenManager } from '../../auth/TokenManager';
import { IAuthRepository } from '@/core/domain/interfaces';
import {
  LoginCommand, LoginResponse,
  RegisterCommand, RegisterResponse,
  ValidateTwoFactorCommand, ValidateTwoFactorResponse,
  ForgotPasswordCommand, ResetPasswordCommand,
  RefreshTokenCommand, RevokeTokenCommand,
  EnableTwoFactorCommand, AuditLogDto, Result,
} from '@/core/domain/types';

const BASE = '/api/authentication';

export class AuthService implements IAuthRepository {
  async login(command: LoginCommand): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(`${BASE}/login`, command);
    if (response.success && response.token && response.refreshToken) {
      tokenManager.setTokens(response.token, response.refreshToken, response.refreshTokenExpiry ?? undefined);
    }
    return response;
  }

  async register(command: RegisterCommand): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>(`${BASE}/register`, command);
  }

  async verify2FA(command: ValidateTwoFactorCommand): Promise<ValidateTwoFactorResponse> {
    const response = await apiClient.post<ValidateTwoFactorResponse>(`${BASE}/verify-2fa`, command);
    if (response.success && response.token && response.refreshToken) {
      tokenManager.setTokens(response.token, response.refreshToken, response.refreshTokenExpiry ?? undefined);
    }
    return response;
  }

  async forgotPassword(command: ForgotPasswordCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/forgot-password`, command);
  }

  async resetPassword(command: ResetPasswordCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/reset-password`, command);
  }

  async refreshToken(command: RefreshTokenCommand): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(`${BASE}/refresh-token`, command);
  }

  async logout(): Promise<Result> {
    const result = await apiClient.post<Result>(`${BASE}/logout`);
    tokenManager.clearTokens();
    return result;
  }

  async revokeToken(command: RevokeTokenCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/revoke-token`, command);
  }

  async enable2FA(command: EnableTwoFactorCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/enable-2fa`, command);
  }

  async getAuditLogs(pageNumber = 1, pageSize = 20, action?: string): Promise<AuditLogDto[]> {
    return apiClient.get<AuditLogDto[]>(`${BASE}/audit-logs`, {
      pageNumber, pageSize, ...(action ? { action } : {}),
    });
  }

  async getUserAuditLogs(userId: string, pageNumber = 1, pageSize = 20): Promise<AuditLogDto[]> {
    return apiClient.get<AuditLogDto[]>(`${BASE}/audit-logs/user/${userId}`, { pageNumber, pageSize });
  }
}

export const authService = new AuthService();
