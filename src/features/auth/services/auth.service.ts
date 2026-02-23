import axios from 'axios';
import type { LoginDTO } from '@shared/validators/auth.validator';

const API_URL = import.meta.env.VITE_API_URL || 'https://practicascitd-001-site1.anytempurl.com/api';

export const loginRequest = async (data: LoginDTO) => {
  const response = await axios.post(`${API_URL}/Authentication/login`, data);
  return response.data;
};

import { LoginDTO } from '@shared/validators/auth.validator';

const API_URL = '/api/Authentication';

export const loginRequest = async (data: LoginDTO) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
>>>>>>> 90bb156 (fix(auth): corrige service y validator en feat/login)
