'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { LoadingOverlay } from '@/components/ui/loading-overlay';

interface GuestGuardProps {
  readonly children: ReactNode;
}

/**
 * Guard de invitado — para páginas públicas (login, 2fa, etc.).
 * Redirige al dashboard si ya existe sesión.
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, pendingTwoFAToken } = useAuthStore();
  const isVerify2FA = pathname === '/verify-2fa';

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
      return;
    }
    if (!isLoading && isVerify2FA && !pendingTwoFAToken) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router, isVerify2FA, pendingTwoFAToken]);

  if (isLoading) return <LoadingOverlay />;
  if (isAuthenticated) return null;
  if (isVerify2FA && !pendingTwoFAToken) return null;
  return <>{children}</>;
}
