'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/presentation/store/authStore';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => { initialize(); }, [initialize]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '440px', animation: 'fadeIn 0.4s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
            fontSize: '28px', marginBottom: '12px',
          }}>🛡️</div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '700', margin: '0' }}>SAPFIAI</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 0' }}>
            Sistema de Administración
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
