'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/presentation/store/authStore';
import { authService } from '@/infrastructure/api/auth/AuthService';
import { AuthStatus } from '@/core/domain/enums';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px', fontSize: '15px',
  border: '2px solid #e5e7eb', borderRadius: '12px',
  outline: 'none', backgroundColor: '#fafafa', color: '#111827',
  transition: 'border-color 0.2s',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: '600',
  color: '#374151', marginBottom: '6px',
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setStatus, setPendingTwoFAToken } = useAuthStore();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError('Completa todos los campos'); return; }
    setLoading(true);
    setError('');
    setStatus(AuthStatus.Loading);

    try {
      const response = await authService.login({ email, password });

      if (response.requires2FA) {
        // El backend requiere 2FA — guardamos el token temporal y redirigimos
        setPendingTwoFAToken(response.token ?? null);
        router.push('/verify-2fa');
        return;
      }

      if (response.success && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.Authenticated);
        router.push('/dashboard');
      } else {
        setError(response.message || response.errors?.join(', ') || 'Credenciales incorrectas');
        setStatus(AuthStatus.Unauthenticated);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de conexión con el servidor';
      setError(message);
      setStatus(AuthStatus.Unauthenticated);
    } finally {
      setLoading(false);
    }
  };

  const card: React.CSSProperties = {
    backgroundColor: 'white', borderRadius: '20px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
    padding: '44px 40px 36px',
    border: '1px solid rgba(255,255,255,0.3)',
  };

  return (
    <div style={card}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 6px' }}>
          Iniciar sesión
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
          color: '#dc2626', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'flex-start',
        }}>
          <span>⚠️</span><span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>Correo electrónico</label>
          <input
            type="email" required value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@empresa.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'} required value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ ...inputStyle, paddingRight: '46px' }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '18px',
            }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '14px', fontSize: '16px', fontWeight: '700',
          color: 'white',
          background: loading ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none', borderRadius: '12px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
        }}>
          {loading ? '⏳ Verificando...' : '→ Ingresar'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/forgot-password" style={{ color: '#667eea', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}
