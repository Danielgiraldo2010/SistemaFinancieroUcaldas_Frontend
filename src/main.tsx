import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './pages/routes.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
