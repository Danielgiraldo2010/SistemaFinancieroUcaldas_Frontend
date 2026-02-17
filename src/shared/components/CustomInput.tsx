import React from 'react';

// Definimos las propiedades que acepta el componente
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // El texto que describe el campo (ej: "Correo Institucional")
}

export const CustomInput = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Etiqueta del campo con estilo seminegrita y color gris pizarra */}
      <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>

      {/* Input con estilos de Tailwind v4: bordes redondeados, sombra sutil y 
          anillo de enfoque con el color dorado oficial de la U. de Caldas */}
      <input
        {...props} // Permite pasar type="password", placeholder, etc., automáticamente
        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none 
                   focus:ring-2 focus:ring-ucaldas-gold/50 focus:border-ucaldas-gold 
                   transition-all bg-white shadow-sm placeholder:text-slate-400"
      />
    </div>
  );
};
