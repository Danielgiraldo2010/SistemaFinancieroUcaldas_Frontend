import {
  LoginCommand, LoginResponse,
  RegisterCommand, RegisterResponse,
  ValidateTwoFactorCommand, ValidateTwoFactorResponse,
  ForgotPasswordCommand, ResetPasswordCommand,
  RefreshTokenCommand, RevokeTokenCommand,
  EnableTwoFactorCommand, AuditLogDto, Result,
} from '../types';

export interface IAuthRepository {
  login(command: LoginCommand): Promise<LoginResponse>;
  register(command: RegisterCommand): Promise<RegisterResponse>;
  verify2FA(command: ValidateTwoFactorCommand): Promise<ValidateTwoFactorResponse>;
  forgotPassword(command: ForgotPasswordCommand): Promise<Result>;
  resetPassword(command: ResetPasswordCommand): Promise<Result>;
  refreshToken(command: RefreshTokenCommand): Promise<LoginResponse>;
  logout(): Promise<Result>;
  revokeToken(command: RevokeTokenCommand): Promise<Result>;
  enable2FA(command: EnableTwoFactorCommand): Promise<Result>;
  getAuditLogs(pageNumber?: number, pageSize?: number, action?: string): Promise<AuditLogDto[]>;
  getUserAuditLogs(userId: string, pageNumber?: number, pageSize?: number): Promise<AuditLogDto[]>;
}
