import React from 'react';

// Definimos propiedades para el texto y estados de carga
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // Texto que muestra el botón
  isLoading?: boolean; // Si es true, el botón se bloquea y muestra un estado de espera
}

export const PrimaryButton = ({ label, isLoading, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled} // Se bloquea si está cargando
      className="w-full bg-ucaldas-gold hover:bg-[#b08d4a] text-white font-bold 
                 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] 
                 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
    >
      {/* Si está cargando muestra un mensaje, de lo contrario muestra el label */}
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-pulse">Cargando...</span>
        </span>
      ) : (
        label
      )}
    </button>
  );
};
