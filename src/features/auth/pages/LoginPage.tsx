<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { LoginView } from './LoginView';
import bgUniversidad from '@assets/image/bg-universidad.png';
import logoUcaldas from '@assets/image/logo-u-caldas.png';
import logoCidt from '@assets/image/logo-cidtt.png';
=======
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importaciones limpias con Alias
import { loginSchema, type LoginDTO } from '@shared/validators/auth.validator';
import { loginRequest } from '../services/auth.service'; // Este es relativo porque está en la misma feature
import { useAuthStore } from '@store/auth.store';
>>>>>>> main

export const LoginPage = () => {
  const { register, handleSubmit, loading, apiError, errors } = useLogin();
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setZoom(prev => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-[3000ms] ease-in-out"
        style={{
          backgroundImage: `url(${bgUniversidad})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: zoom ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      <div className="absolute inset-0 bg-blue-400/40" />
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 py-8 md:py-0">
        <img src={logoUcaldas} alt="Universidad de Caldas" className="w-40 sm:w-56 md:w-72" />
        <img src={logoCidt} alt="CiDT²" className="w-20 sm:w-24 md:w-32" />
      </div>
      <div className="relative w-full flex-1 flex items-center justify-center pb-8 md:pb-0">
        <div className="w-full max-w-md px-4 md:px-0">
          <LoginView
            register={register}
            onSubmit={handleSubmit}
            loading={loading}
            apiError={apiError}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};