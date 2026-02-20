import axios from 'axios';
import type {
  TwoFactorVerifyRequest,
  TwoFactorVerifyResponse,
  EnableTwoFactorResponse,
} from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const verify2FA = async (data: TwoFactorVerifyRequest): Promise<TwoFactorVerifyResponse> => {
  const response = await axios.post<TwoFactorVerifyResponse>(
    `${API_BASE_URL}/Authentication/verify-2fa`,
    data,
  );

  return response.data;
};

export const enable2FA = async (): Promise<EnableTwoFactorResponse> => {
  const response = await axios.post<EnableTwoFactorResponse>(
    `${API_BASE_URL}/Authentication/enable-2fa`,
  );

  return response.data;
};
