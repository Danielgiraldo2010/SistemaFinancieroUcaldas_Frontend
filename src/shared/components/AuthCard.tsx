import React from 'react';

interface AuthCardProps {
  children: React.ReactNode; // El contenido que irá dentro (inputs y botones)
  title: string; // Título principal (ej: "Acceso Seguro")
  subtitle: string; // Subtítulo explicativo
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    /* Contenedor con fondo blanco semitransparente para dejar ver el fondo institucional,
       bordes muy redondeados y sombra profunda para dar efecto de elevación */
    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white">
      <div className="text-center mb-8">
        {/* Título con fuente extranegrita para jerarquía visual */}
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{title}</h2>
        {/* Subtítulo informativo */}
        <p className="text-slate-500 text-sm">{subtitle}</p>
      </div>

      {/* Aquí es donde tus compañeras inyectarán sus formularios */}
      {children}
    </div>
  );
};
