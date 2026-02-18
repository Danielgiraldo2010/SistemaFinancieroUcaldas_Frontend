import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import { MainLayout } from '@/layouts/MainLayout';
import { SecretaryDashboard } from '@features/dashboard/pages/SecretaryDashboard';

// Página de Login temporal con diseño para que no cargue en blanco
const LoginPage = () => (
  <div className="flex items-center justify-center h-screen bg-[#002D57]">
    <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-4">
      <h1 className="text-3xl font-black text-[#002D57] mb-2">SAPFIAI</h1>
      <p className="text-slate-400 text-sm mb-8 font-medium">U. de Caldas - Gestión Financiera</p>

      <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl">
        <p className="text-slate-500 text-sm italic">
          Esperando integración de formulario de Login y 2FA...
        </p>
      </div>

      <p className="mt-8 text-[10px] text-slate-300 uppercase tracking-widest font-bold">
        Capa 5 y 6 en desarrollo
      </p>
    </div>
  </div>
);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  // Si no está logueado (false), lo manda a /login automáticamente
  return isAuth ? children : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <SecretaryDashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};
