// request para verify-2fa
export interface TwoFactorVerifyRequest {
  code: string;
  token: string;
}

// response de verify-2fa
export interface TwoFactorVerifyResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  refreshTokenExpiry: string;
  message: string;
  errors: string[];
  user: {
    id: string;
    email: string;
    userName: string;
    phoneNumber: string;
    twoFactorEnabled: boolean;
    lastLoginDate: string;
    lastLoginIp: string;
  };
}

// response de enable-2fa
export interface EnableTwoFactorResponse {
  qrCodeUrl: string; // QR para app autenticadora
  secret: string; // secreto que genera backend
}
