import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

// Componentes temporales (Luego los moverás a sus propias carpetas)
const LoginPage = () => (
  <div style={{ padding: '50px' }}>
    <h1>Página de Login</h1>
    <p>U. de Caldas</p>
  </div>
);
const Dashboard = () => (
  <div style={{ padding: '50px' }}>
    <h1>Panel Financiero</h1>
    <p>Bienvenido al sistema</p>
  </div>
);

// Protector de rutas: Si no hay token, manda al Login
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return isAuth ? children : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Privadas (Protegidas) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};
