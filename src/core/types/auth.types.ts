// ============================================================
// MODELOS DE AUTENTICACIÓN — generados desde swagger.json
// ============================================================

export interface RegisterResponse {
  success?: boolean;
  userId?: string | null;
  message?: string | null;
  errors?: string[] | null;
}

export interface RegisterCommand {
  email?: string;
  password?: string;
  confirmPassword?: string;
  userName?: string | null;
  phoneNumber?: string | null;
}

export interface LoginResponse {
  success?: boolean;
  token?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
  user?: UserDto | null;
  message?: string | null;
  errors?: string[] | null;
  requires2FA?: boolean;
}

export interface UserDto {
  id?: string;
  email?: string;
  userName?: string | null;
  phoneNumber?: string | null;
  twoFactorEnabled?: boolean;
  lastLoginDate?: string | null;
  lastLoginIp?: string | null;
}

export interface LoginCommand {
  email?: string;
  password?: string;
}

export interface ValidateTwoFactorResponse {
  success?: boolean;
  token?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
  user?: UserDto | null;
  message?: string | null;
  errors?: string[] | null;
}

export interface ValidateTwoFactorCommand {
  code?: string;
  token?: string | null;
}

export interface ForgotPasswordCommand {
  email?: string;
}

export interface ResetPasswordCommand {
  email?: string;
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface RefreshTokenCommand {
  refreshToken?: string;
}

export interface RevokeTokenCommand {
  refreshToken?: string;
  reason?: string;
}

export interface EnableTwoFactorCommand {
  email?: string;
  password?: string;
  enable?: boolean;
}

export interface AuditLogDto {
  id?: number;
  userId?: string | null;
  userEmail?: string | null;
  action?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  timestamp?: string;
  details?: string | null;
  status?: string | null;
  errorMessage?: string | null;
  resourceId?: string | null;
  resourceType?: string | null;
}
