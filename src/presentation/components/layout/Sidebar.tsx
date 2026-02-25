'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/presentation/store/authStore';
import { authService } from '@/infrastructure/api/auth/AuthService';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: '📊', label: 'Dashboard',      href: '/dashboard' },
  { icon: '📋', label: 'Audit Logs',     href: '/dashboard/audit-logs' },
  { icon: '🛡️',  label: 'Seguridad IPs', href: '/dashboard/security' },
  { icon: '👤', label: 'Perfil',         href: '/dashboard/profile' },
  { icon: '⚙️', label: 'Configuración',  href: '/dashboard/settings' },
];

export function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [logingOut, setLogingOut] = useState(false);

  const handleLogout = async () => {
    setLogingOut(true);
    try { await authService.logout(); } finally {
      logout();
      router.push('/login');
    }
  };

  const W = collapsed ? '72px' : '260px';

  return (
    <aside style={{
      width: W, minHeight: '100vh',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s ease', overflow: 'hidden',
      flexShrink: 0, position: 'sticky', top: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: collapsed ? '20px 12px' : '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', gap: '12px',
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        {!collapsed && (
          <div>
            <p style={{ color: 'white', fontWeight: '700', fontSize: '17px', margin: 0 }}>SAPFIAI</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>Administración</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px',
          color: 'white', cursor: 'pointer', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
          flexShrink: 0,
        }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px' }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <button key={item.href} onClick={() => router.push(item.href)} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', padding: collapsed ? '12px 0' : '12px 16px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: '10px', border: 'none', cursor: 'pointer',
              backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: active ? 'white' : 'rgba(255,255,255,0.6)',
              fontSize: collapsed ? '20px' : '14px', fontWeight: active ? '600' : '400',
              marginBottom: '4px', transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && (
                <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a5b4fc' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{
        padding: collapsed ? '16px 8px' : '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        {!collapsed && user && (
          <div style={{ marginBottom: '12px' }}>
            <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: '0 0 2px' }}>
              {user.userName || user.email}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: 0 }}>{user.email}</p>
          </div>
        )}
        <button onClick={handleLogout} disabled={logingOut} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          width: '100%', padding: collapsed ? '10px 0' : '10px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          backgroundColor: 'rgba(239,68,68,0.15)',
          color: '#fca5a5', fontSize: '14px', fontWeight: '500',
        }}>
          <span>🚪</span>
          {!collapsed && <span>{logingOut ? 'Cerrando...' : 'Cerrar sesión'}</span>}
        </button>
      </div>
    </aside>
  );
}
