import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Bienvenido</h1>
        <p className="text-sm text-gray-500">Sistema de Gestión Financiera</p>
      </div>

      <UserMenu />
    </header>
  );
};
