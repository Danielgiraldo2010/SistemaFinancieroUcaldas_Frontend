import { apiClient } from "../../http/ApiClient";
import { tokenManager } from "../../auth/TokenManager";
import { IAuthRepository } from "@/core/domain/interfaces";
import {
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
} from "@/core/domain/types";

/**
 * IMPORTANTE: Se usa "Authentication" con A mayúscula para coincidir
 * exactamente con la definición del controlador en el Swagger.
 */
const BASE = "/api/Authentication";

export class AuthService implements IAuthRepository {
  // --- AUTENTICACIÓN BÁSICA ---

  async login(command: LoginCommand): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      `${BASE}/login`,
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
    return apiClient.post<RegisterResponse>(`${BASE}/register`, command);
  }

  async verify2FA(
    command: ValidateTwoFactorCommand,
  ): Promise<ValidateTwoFactorResponse> {
    const response = await apiClient.post<ValidateTwoFactorResponse>(
      `${BASE}/verify-2fa`,
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
    // Forzamos un objeto limpio con la propiedad 'email' en minúscula
    // .NET es sensible a la estructura del JSON
    return apiClient.post<Result>(`${BASE}/forgot-password`, {
      email: command.email,
    });
  }

  async resetPassword(command: ResetPasswordCommand): Promise<Result> {
    // Envía { email, token, newPassword, confirmPassword }
    return apiClient.post<Result>(`${BASE}/reset-password`, command);
  }

  // --- GESTIÓN DE TOKENS ---

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

  // --- SEGURIDAD Y CONFIGURACIÓN ---

  async enable2FA(command: EnableTwoFactorCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/enable-2fa`, command);
  }

  // --- AUDITORÍA ---

  async getAuditLogs(
    pageNumber = 1,
    pageSize = 20,
    action?: string,
  ): Promise<AuditLogDto[]> {
    return apiClient.get<AuditLogDto[]>(`${BASE}/audit-logs`, {
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
    return apiClient.get<AuditLogDto[]>(`${BASE}/audit-logs/user/${userId}`, {
      pageNumber,
      pageSize,
    });
  }
}

export const authService = new AuthService();
