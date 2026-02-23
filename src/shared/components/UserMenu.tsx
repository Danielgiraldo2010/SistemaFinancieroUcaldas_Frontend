import { useAuthStore } from '@store/auth.store';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
