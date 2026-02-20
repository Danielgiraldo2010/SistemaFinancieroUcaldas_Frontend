import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';

// Nota: Cuando tu compañera termine su componente, lo importaremos aquí.
// Por ahora, dejamos el espacio preparado.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Ruta de Inicio de Sesión (Tu parte) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. Ruta de Verificación (La puerta para tu compañera) */}
        <Route 
          path="/auth/verify" 
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
              <div className="p-8 bg-white shadow-xl rounded-lg text-center">
                <h2 className="text-2xl font-bold text-[#002855] mb-4">
                  Verificación de Seguridad
                </h2>
                <p className="text-gray-600">
                  Por favor, ingresa el código de verificación.
                </p>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-blue-700 text-sm italic">
                  (Esperando el componente de verificación de la compañera...)
                </div>
              </div>
            </div>
          } 
        />

        {/* 3. Ruta del Dashboard (El destino final del sistema) */}
        <Route 
          path="/dashboard" 
          element={
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold">Panel de Control Principal</h1>
              <p className="text-green-600 mt-2">¡Sesión iniciada con éxito!</p>
            </div>
          } 
        />

        {/* 4. Redirección por defecto: Si la ruta no existe, vuelve al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;