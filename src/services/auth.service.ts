import { apiClient, tokenManager } from '@/lib';
import { endpoints } from '@/config';
import {
  IAuthRepository,
  LoginCommand,
  LoginResponse,
  RegisterCommand,
  RegisterResponse,
  ValidateTwoFactorCommand,
  ValidateTwoFactorResponse,
  ForgotPasswordCommand,
  ResetPasswordCommand,
  RefreshTokenCommand,
  RevokeTokenCommand,
  EnableTwoFactorCommand,
  AuditLogDto,
  Result,
} from '@/core';

export class AuthService implements IAuthRepository {
  // --- AUTENTICACIÓN BÁSICA ---

  async login(command: LoginCommand): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      endpoints.auth.login,
      command,
    );
    if (response.success && response.token && response.refreshToken) {
      tokenManager.setTokens(
        response.token,
        response.refreshToken,
        response.refreshTokenExpiry ?? undefined,
      );
    }
    return response;
  }

  async register(command: RegisterCommand): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>(endpoints.auth.register, command);
  }

  async verify2FA(
    command: ValidateTwoFactorCommand,
  ): Promise<ValidateTwoFactorResponse> {
    const response = await apiClient.post<ValidateTwoFactorResponse>(
      endpoints.auth.verify2FA,
      command,
    );
    if (response.success && response.token && response.refreshToken) {
      tokenManager.setTokens(
        response.token,
        response.refreshToken,
        response.refreshTokenExpiry ?? undefined,
      );
    }
    return response;
  }

  // --- GESTIÓN DE CONTRASEÑA ---

  async forgotPassword(command: ForgotPasswordCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.auth.forgotPassword, {
      email: command.email,
    });
  }

  async resetPassword(command: ResetPasswordCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.auth.resetPassword, command);
  }

  // --- GESTIÓN DE TOKENS ---

  async refreshToken(command: RefreshTokenCommand): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(endpoints.auth.refreshToken, command);
  }

  async logout(): Promise<Result> {
    const result = await apiClient.post<Result>(endpoints.auth.logout);
    tokenManager.clearTokens();
    return result;
  }

  async revokeToken(command: RevokeTokenCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.auth.revokeToken, command);
  }

  // --- SEGURIDAD Y CONFIGURACIÓN ---

  async enable2FA(command: EnableTwoFactorCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.auth.enable2FA, command);
  }

  // --- AUDITORÍA ---

  async getAuditLogs(
    pageNumber = 1,
    pageSize = 20,
    action?: string,
  ): Promise<AuditLogDto[]> {
    return apiClient.get<AuditLogDto[]>(endpoints.auth.auditLogs, {
      pageNumber,
      pageSize,
      ...(action ? { action } : {}),
    });
  }

  async getUserAuditLogs(
    userId: string,
    pageNumber = 1,
    pageSize = 20,
  ): Promise<AuditLogDto[]> {
    return apiClient.get<AuditLogDto[]>(endpoints.auth.userAuditLogs(userId), {
      pageNumber,
      pageSize,
    });
  }
}

export const authService = new AuthService();
