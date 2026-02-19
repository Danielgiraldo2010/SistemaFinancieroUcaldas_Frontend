import React from 'react';
import { Sidebar } from '@shared/components/Sidebar';
import { Header } from '@shared/components/Header';
// 1. Importamos la lista de navegación específica para el rol
import { SECRETARY_MENU } from '@shared/constants/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* 2. Inyectamos los items del menú al Sidebar vía props */}
      <Sidebar menuItems={SECRETARY_MENU} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
