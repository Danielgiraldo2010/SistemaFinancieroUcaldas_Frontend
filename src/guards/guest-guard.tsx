'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { LoadingOverlay } from '@/components/ui/loading-overlay';

interface GuestGuardProps {
  children: ReactNode;
}

/**
 * Guard de invitado — para páginas públicas (login, 2fa, etc.).
 * Redirige al dashboard si ya existe sesión.
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Mientras está cargando, muestra un loader
  if (isLoading) return <LoadingOverlay />;

  // Si el usuario ya está autenticado, no muestra nada (se redirige)
  if (isAuthenticated) return null;

  // Si no está autenticado y no está cargando, muestra el contenido
  return <>{children}</>;
}
