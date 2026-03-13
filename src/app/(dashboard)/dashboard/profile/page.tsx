'use client';
import { useAuthStore } from '@/store';
export default function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div style={{ padding: '36px 40px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>Mi perfil</h1>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', maxWidth: '500px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', color: 'white', fontWeight: '700' }}>
            {(user?.userName || user?.email || '?')[0].toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>{user?.userName || 'Sin nombre'}</p>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{user?.email}</p>
          </div>
        </div>
        <div style={{ fontSize: '14px', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div><strong style={{ color: '#111827' }}>ID: </strong>{user?.id}</div>
          <div><strong style={{ color: '#111827' }}>Teléfono: </strong>{user?.phoneNumber || '—'}</div>
          <div><strong style={{ color: '#111827' }}>2FA: </strong>{user?.twoFactorEnabled ? '✅ Habilitado' : '❌ Deshabilitado'}</div>
          <div><strong style={{ color: '#111827' }}>Última IP: </strong><span style={{ fontFamily: 'monospace' }}>{user?.lastLoginIp || '—'}</span></div>
        </div>
      </div>
    </div>
  );
}
