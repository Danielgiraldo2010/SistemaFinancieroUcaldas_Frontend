import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginDTO } from '@/shared/validators/auth.validator';
import { loginRequest } from '../services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export const useLogin = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const formMethods = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginDTO) => {
    setApiError(null);
    setLoading(true);
    try {
      const response = await loginRequest(data);
      // Guardamos el token en Zustand (Capa de Seguridad 5.1)
      setToken(response.token || response.accessToken); 
      navigate('/auth/verify'); 
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return {
    register: formMethods.register,
    handleSubmit: formMethods.handleSubmit(onSubmit),
    errors: formMethods.formState.errors,
    loading,
    apiError
  };
};