/**
 * Endpoints del Backend API
 * Punto único de definición de todos los endpoints de la aplicación
 */

export const endpoints = {
  /**
   * Endpoints de Autenticación
   */
  auth: {
    login: '/api/Authentication/login',
    register: '/api/Authentication/register',
    verify2FA: '/api/Authentication/verify-2fa',
    forgotPassword: '/api/Authentication/forgot-password',
    resetPassword: '/api/Authentication/reset-password',
    refreshToken: '/api/Authentication/refresh-token',
    logout: '/api/Authentication/logout',
    revokeToken: '/api/Authentication/revoke-token',
    enable2FA: '/api/Authentication/enable-2fa',
    auditLogs: '/api/Authentication/audit-logs',
    userAuditLogs: (userId: string) => `/api/Authentication/audit-logs/user/${userId}`,
  },

  /**
   * Endpoints de Seguridad
   */
  security: {
    blockedIps: '/api/Security/blocked-ips',
    blockIp: '/api/Security/block-ip',
    unblockIp: '/api/Security/unblock-ip',
    unlockAccount: '/api/Security/unlock-account',
    changePassword: '/api/Security/change-password',
    getUserSessions: '/api/Security/sessions',
    revokeSession: (sessionId: string) => `/api/Security/sessions/${sessionId}`,
    getSecuritySettings: '/api/Security/settings',
    updateSecuritySettings: '/api/Security/settings',
  },
} as const;
