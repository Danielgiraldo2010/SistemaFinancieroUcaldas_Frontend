// Enums de dominio alineados con swagger.json
export { BlackListReason } from '../types/security.types';

export enum AuthStatus {
  Idle = 'idle',
  Loading = 'loading',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Requires2FA = 'requires_2fa',
}

export enum TokenStatus {
  Valid = 'valid',
  Expired = 'expired',
  Refreshing = 'refreshing',
}
