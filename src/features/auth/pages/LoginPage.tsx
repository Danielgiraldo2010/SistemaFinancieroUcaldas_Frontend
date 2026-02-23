import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
// Importaciones limpias con Alias
import { loginSchema, type LoginDTO } from '@shared/validators/auth.validator';
import { loginRequest } from '../services/auth.service';
import { useAuthStore } from '@store/auth.store';
import bgUniversidad from '@assets/image/bg-universidad.png';
import logoUcaldas from '@assets/image/logo-u-caldas.png';
import logoCidt from '@assets/image/logo-cidtt.png';

export const LoginPage = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [zoom, setZoom] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  // Efecto de zoom periódico en el fondo
  useEffect(() => {
    const interval = setInterval(() => {
      setZoom(prev => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: LoginDTO) => {
    try {
      const response = await loginRequest(data);
      setToken(response.token);
      alert('¡Bienvenido al Sistema Financiero!');
    } catch (error) {
      alert('Error: Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo con animación de zoom */}
      <div
        className="absolute inset-0 transition-transform duration-[3000ms] ease-in-out"
        style={{
          backgroundImage: `url(${bgUniversidad})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: zoom ? 'scale(1.1)' : 'scale(1)',
        }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Logos - arriba en móvil, izquierda en desktop */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 py-8 md:py-0">
        <img
          src={logoUcaldas}
          alt="Universidad de Caldas"
          className="w-40 sm:w-56 md:w-72 drop-shadow-lg"
        />
        <img
          src={logoCidt}
          alt="CiDT²"
          className="w-24 sm:w-32 md:w-40 drop-shadow-lg"
        />
      </div>

      {/* Card de login - abajo en móvil, derecha en desktop */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center pb-8 md:pb-0">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2 text-[#002855]">SAPFIAI</h2>
            <p className="text-center text-gray-500 text-sm mb-8">Sistema Financiero - U. de Caldas</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002855] focus:border-transparent outline-none transition"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002855] focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#002855] text-white py-3 rounded-lg hover:bg-[#001d3f] transition font-semibold mt-6 disabled:opacity-50"
              >
                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              © 2026 Universidad de Caldas - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};