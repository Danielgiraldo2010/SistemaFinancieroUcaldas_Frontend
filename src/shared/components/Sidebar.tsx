import React from 'react';
import type { MenuItem } from '@shared/constants/navigation';

interface SidebarProps {
  // ✅ Recibimos el array como prop
  menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  return (
    <aside className="w-72 bg-[#002D57] text-white flex flex-col h-screen shadow-2xl transition-all">
      {/* Logo y Nombre de la Universidad */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xl">☀️</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">SAPFIAI</h1>
            <p className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest mt-1">
              Universidad de Caldas
            </p>
          </div>
        </div>
      </div>

      {/* Navegación Principal Dinámica */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
              item.active
                ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-lg ${item.active ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
              >
                {item.icon}
              </span>
              {item.label}
            </div>
            {item.active && <span className="text-[10px]">▶</span>}
          </button>
        ))}
      </nav>

      {/* Perfil de Usuario */}
      <div className="p-6 bg-black/10 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-sm font-bold text-[#002D57]">
            MG
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">María González</p>
            <p className="text-[10px] text-white/40 truncate italic">Secretaría</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
