import React from 'react';
import { TwoFactorForm } from '../components/TwoFactorForm';
import bgImage from '@/assets/image/bg-universidad.jpg';
import logo from '@/assets/image/logo-u-caldas.png';
import cidtt from '@/assets/image/logo-cidtt.png';

export const TwoFactorPage: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/40 bg-blue-400/30"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between px-8">
        {/* Formulario izquierda */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Autenticación en Dos Pasos
          </h2>

          <p className="text-gray-500 text-sm text-center mt-2">
            Ingrese el código de 6 dígitos enviado a su correo
          </p>

          <div className="mt-8">
            <TwoFactorForm />
          </div>
        </div>

        {/* Logo derecha */}
        <div className="hidden lg:flex flex-col items-center">
          <img src={logo} alt="Universidad" className="w-80 opacity-90" />
          <img src={cidtt} alt="Cidt" className="w-40 opacity-90 mt-4" />
        </div>
      </div>
    </div>
  );
};
