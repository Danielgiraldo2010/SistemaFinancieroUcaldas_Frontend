import axios from 'axios';
// Usamos el alias profesional que acabas de configurar
import type { LoginDTO } from '@shared/validators/auth.validator';

// Cambiamos la URL a la de Swagger (Anytempurl) que vimos en tu Postman
const API_URL = 'https://practicascitd-001-site1.anytempurl.com/api';

export const loginRequest = async (data: LoginDTO) => {
  // El endpoint es /Authentication/login según tu imagen de Swagger
  const response = await axios.post(`${API_URL}/Authentication/login`, data);
  return response.data;
};
