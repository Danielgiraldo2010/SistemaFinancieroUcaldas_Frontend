import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export const PrivateRoute = ({ children }: { children: any }) => {
  // Cambiamos 'isAuth' por 'isAuthenticated' que es el nombre real en tu Store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};