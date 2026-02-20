import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TwoFactorPage } from '@features/auth/pages/TwoFactorPage';
import { LoginPage } from '@features/auth/pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-ucaldas-blue p-4">
        <Routes>
          {/* Login normal */}
          <Route path="/login" element={<LoginPage />} />

          {/* Pantalla 2FA */}
          <Route path="/2fa" element={<TwoFactorPage />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
