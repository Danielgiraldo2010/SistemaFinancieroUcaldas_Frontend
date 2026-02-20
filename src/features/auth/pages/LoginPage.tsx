<<<<<<< HEAD
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importaciones limpias con Alias
import { loginSchema, type LoginDTO } from '@shared/validators/auth.validator';
import { loginRequest } from '../services/auth.service'; // Este es relativo porque está en la misma feature
import { useAuthStore } from '@store/auth.store';

export const LoginPage = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema), // Capa 2: Validación con Zod 
  });

  const onSubmit = async (data: LoginDTO) => {
    try {
      const response = await loginRequest(data); // Capa 3: Petición real 
      setToken(response.token); // Capa 6: Guardar en Zustand 
      alert('¡Bienvenido al Sistema Financiero!');
    } catch (error) {
      alert('Error: Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002855]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#002855]">U. Caldas - Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input {...register('email')} className="w-full p-2 border rounded mt-1" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" {...register('password')} className="w-full p-2 border rounded mt-1" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-[#b59a57] text-white py-2 rounded hover:bg-[#a0884a] transition">
            Ingresar
          </button>
        </form>
      </div>
=======
import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { LoginView } from './LoginView';
import bgUniversidad from '@assets/image/bg-universidad.png';
import logoUcaldas from '@assets/image/logo-u-caldas.png';
import logoCidt from '@assets/image/logo-cidtt.png';

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
      
      {/* Fondo con zoom */}
      <div
        className="absolute inset-0 transition-transform duration-[3000ms] ease-in-out"
        style={{
          backgroundImage: `url(${bgUniversidad})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: zoom ? 'scale(1.1)' : 'scale(1)',
        }}
      />

      {/* Overlay azul claro */}
      <div className="absolute inset-0 bg-blue-400/40" />

      {/* Logo - arriba en móvil, izquierda en desktop */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 py-8 md:py-0">
        <img
          src={logoUcaldas}
          alt="Universidad de Caldas"
          className="w-40 sm:w-56 md:w-72"
        />
        <img
          src={logoCidt}
          alt="CiDT²"
          className="w-20 sm:w-24 md:w-32"
        />
      </div>

      {/* Card - abajo en móvil, derecha en desktop */}
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

>>>>>>> 76b9cdc (feat(auth): merge login UI con rama feat/login)
    </div>
  );
};