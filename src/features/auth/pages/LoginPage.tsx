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
    </div>
  );
};