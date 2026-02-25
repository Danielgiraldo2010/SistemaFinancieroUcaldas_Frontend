'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/presentation/store/authStore';
import { AuthGuard } from '@/infrastructure/guards/AuthGuard';
import { Sidebar } from '@/presentation/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => { initialize(); }, [initialize]);

  return (
    <AuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
