import React from 'react';

interface UserMenuProps {
  closeMenu: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
  return (
    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
      <div className="px-4 py-3 border-b border-slate-50">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Sesión activa
        </p>
        <p className="text-sm font-bold text-slate-800">María González</p>
      </div>

      <div className="py-2">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 transition-colors group">
          <span className="group-hover:scale-110 transition-transform">🛡️</span>
          <div className="text-left">
            <p className="text-xs font-bold">Gestión de 2FA</p>
            <p className="text-[10px] text-slate-400">Autenticación en dos pasos</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 transition-colors group">
          <span className="group-hover:scale-110 transition-transform">🔑</span>
          <div className="text-left">
            <p className="text-xs font-bold">Cambio de Contraseña</p>
            <p className="text-[10px] text-slate-400">Actualizar credenciales</p>
          </div>
        </button>
      </div>

      <div className="border-t border-slate-50 mt-1 pt-1">
        <button
          onClick={closeMenu}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-rose-50 text-rose-500 transition-colors"
        >
          <span>🚪</span>
          <p className="text-xs font-bold uppercase tracking-wider">Cerrar Sesión</p>
        </button>
      </div>
    </div>
  );
};
