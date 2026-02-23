import { Link } from 'react-router-dom';
import { MenuItem } from '@shared/constants/navigation';

interface SidebarProps {
  menuItems: MenuItem[];
}

export const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <aside className="w-64 bg-[#002855] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1a4d7f]">
        <h1 className="text-2xl font-bold">SAPFIAI</h1>
        <p className="text-xs text-gray-300 mt-1">Sistema Financiero</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1a4d7f] transition-colors duration-200 text-sm font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1a4d7f]">
        <p className="text-xs text-gray-400 text-center">U. de Caldas © 2026</p>
      </div>
    </aside>
  );
};
