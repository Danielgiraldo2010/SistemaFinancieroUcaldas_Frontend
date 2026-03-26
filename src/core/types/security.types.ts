
// ============================================================
// MODELOS DE SEGURIDAD — generados desde swagger.json
// ============================================================
import type { BaseEntity } from './common.types';

export interface IpBlackList extends BaseEntity {
  ipAddress?: string;
  reason?: string;
  blockedDate?: string;
  expiryDate?: string | null;
  blockedBy?: string | null;
  isActive?: boolean;
  notes?: string | null;
  blackListReason?: BlackListReason;
}

export enum BlackListReason {
  ManualBlock = 0,
  TooManyAttempts = 1,
  SuspiciousActivity = 2,
  ReportedAbuse = 3,
}

export interface BlockIpCommand {
  ipAddress?: string;
  reason?: string;
  blackListReason?: BlackListReason;
  expiryDate?: string | null;
  notes?: string | null;
}

export interface UnblockIpCommand {
  ipAddress?: string;
}

export interface UnlockAccountCommand {
  userId?: string;
}

export interface ChangePasswordCommand {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
