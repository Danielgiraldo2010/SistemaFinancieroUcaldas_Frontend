<<<<<<< HEAD
import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Bienvenido</h1>
        <p className="text-sm text-gray-500">Sistema de Gestión Financiera</p>
      </div>

      <UserMenu />
=======
import { useState } from 'react';
import { UserMenu } from './UserMenu.tsx';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex justify-between items-center relative">
      {/* Sección Izquierda: Breadcrumb */}
      <div className="flex items-center gap-4">
        <div className="text-slate-300">
          <span className="text-lg">🏠</span>
        </div>
        <span className="text-slate-300">/</span>
        <h2 className="text-sm font-semibold text-slate-500">Resumen Global</h2>
      </div>

      {/* Sección Derecha: Perfil y Rol */}
      <div className="flex items-center gap-6">
        {/* Selector de Rol (Estático por ahora como el mockup) */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Rol:
          </span>
          <span className="text-[10px] font-bold text-[#C5A059] uppercase">SuperAdmin</span>
        </div>

        {/* Info de Usuario y Botón de Menú */}
        <div className="flex items-center gap-3 relative">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800 leading-none">María González</p>
            <p className="text-[11px] text-slate-400 mt-1">secretaria@ucaldas.edu.co</p>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <span className="text-slate-600 font-bold text-xs">👤</span>
          </button>

          {/* Menú Desplegable (Capa de Seguridad) */}
          {isMenuOpen && <UserMenu closeMenu={() => setIsMenuOpen(false)} />}
        </div>
      </div>
>>>>>>> main
    </header>
  );
};
