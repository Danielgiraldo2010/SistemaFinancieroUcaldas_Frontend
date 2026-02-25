'use client';
import { useState } from 'react';
import { authService } from '@/infrastructure/api/auth/AuthService';

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState('');
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Introduce tu email'); return; }
    setLoading(true); setError('');
    try {
      const res = await authService.forgotPassword({ email });
      if (res.succeeded) setSent(true);
      else setError(res.errors?.join(', ') || 'No se pudo enviar el correo');
    } catch { setError('Error de conexión'); }
    finally { setLoading(false); }
  };

  const card: React.CSSProperties = {
    backgroundColor: 'white', borderRadius: '20px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
    padding: '44px 40px 36px',
  };

  if (sent) return (
    <div style={card}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '52px', marginBottom: '16px' }}>📧</div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>Correo enviado</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px' }}>
          Si el email existe en el sistema, recibirás instrucciones de recuperación.
        </p>
        <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>← Volver al login</a>
      </div>
    </div>
  );

  return (
    <div style={card}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>🔑</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 6px' }}>Recuperar contraseña</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Introduce tu email y te enviaremos instrucciones</p>
      </div>
      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#dc2626', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
            Correo electrónico
          </label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={{ width: '100%', padding: '13px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '12px', outline: 'none', backgroundColor: '#fafafa', color: '#111827' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '14px', fontSize: '16px', fontWeight: '700', color: 'white',
          background: loading ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? '⏳ Enviando...' : '→ Enviar instrucciones'}
        </button>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>← Volver al login</a>
        </div>
      </form>
    </div>
  );
}
