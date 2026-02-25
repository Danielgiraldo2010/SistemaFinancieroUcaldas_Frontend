'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/presentation/store/authStore';
import { authService } from '@/infrastructure/api/auth/AuthService';
import { AuthStatus } from '@/core/domain/enums';

export default function Verify2FAPage() {
  const router = useRouter();
  const { setUser, setStatus, pendingTwoFAToken } = useAuthStore();

  const [code, setCode]         = useState(['', '', '', '', '', '']);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const refs                    = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...code];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setCode(next);
    refs[Math.min(pasted.length, 5)].current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) { setError('Ingresa el código de 6 dígitos'); return; }
    setLoading(true);
    setError('');
    setStatus(AuthStatus.Loading);

    try {
      const response = await authService.verify2FA({
        code: fullCode,
        token: pendingTwoFAToken ?? undefined,
      });

      if (response.success && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.Authenticated);
        router.push('/dashboard');
      } else {
        setError(response.message || response.errors?.join(', ') || 'Código inválido o expirado');
        setStatus(AuthStatus.Unauthenticated);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de verificación';
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
  };

  return (
    <div style={card}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>🔐</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>
          Verificación en dos pasos
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
          Ingresa el código de 6 dígitos de tu aplicación autenticadora
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
          color: '#dc2626', fontSize: '14px',
        }}>⚠️ {error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '28px' }} onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i} ref={refs[i]} type="text" inputMode="numeric"
              maxLength={1} value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: '52px', height: '60px', textAlign: 'center',
                fontSize: '24px', fontWeight: '700',
                border: `2px solid ${digit ? '#667eea' : '#e5e7eb'}`,
                borderRadius: '12px', outline: 'none',
                color: '#111827', backgroundColor: digit ? '#f5f3ff' : '#fafafa',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
            />
          ))}
        </div>

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '14px', fontSize: '16px', fontWeight: '700',
          color: 'white',
          background: loading ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none', borderRadius: '12px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? '⏳ Verificando...' : '✓ Verificar código'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}
