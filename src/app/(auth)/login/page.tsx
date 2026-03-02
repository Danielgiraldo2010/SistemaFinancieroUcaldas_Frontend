'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/presentation/store/authStore';
import { authService } from '@/infrastructure/api/auth/AuthService';
import { AuthStatus } from '@/core/domain/enums';
import { GuestGuard } from '@/infrastructure/guards';

function LoginContent() {
  const router = useRouter();
  const { setUser, setStatus, setPendingTwoFAToken } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login({ email, password });
      if (response.requires2FA) {
        setPendingTwoFAToken(response.token ?? null);
        router.push('/verify-2fa');
        return;
      }
      if (response.success && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.Authenticated);
        router.push('/dashboard');
      } else {
        setError(response.message || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
      margin: 0, padding: 0, overflow: 'hidden', backgroundColor: 'white' 
    }}>
      
      {/* OCULTAR BOTÓN DE DESARROLLO Y DEFINIR ANIMACIÓN FUERTE */}
      <style>{`
        nextjs-portal, .nextjs-static-indicator { display: none !important; }
        @keyframes strongZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
      `}</style>
      
      {/* 1. IMAGEN DE FONDO CON MOVIMIENTO NOTORIO (1.1 scale) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: "url('/images/bg-universidad.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation: 'strongZoom 15s infinite alternate ease-in-out', // 15s para suavidad
        zIndex: 1
      }}></div>
{/* 2. CAPA DE OPACIDAD "EL TRIS FINAL" (AZUL ROYAL CRISTALINO) */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        backgroundColor: 'rgba(0, 86, 179, 0.32)', // El balance perfecto entre color y transparencia
        zIndex: 2
      }}></div>

      {/* 3. LOGOS */}
      <img 
        src="/images/logo1-u-caldas.png" 
        alt="U Caldas" 
        style={{ position: 'absolute', top: '50px', left: '60px', width: '280px', zIndex: 10, filter: 'brightness(0) invert(1)' }} 
        //filter: 'brightness(0) invert(1)' hace este logo blanco puro.
      />

      <img 
        src="/images/logo-cidt.png" 
        alt="CIDT" 
        style={{ position: 'absolute', bottom: '50px', left: '60px', width: '140px', zIndex: 10 }} 
        //CIDT se mantiene normal.
      />

      {/* 4. VENTANA DE LOGIN */}
      <div style={{
        position: 'relative', zIndex: 20, width: '380px', backgroundColor: 'white', 
        borderRadius: '24px', marginRight: '8%', padding: '40px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#003e70', margin: 0 }}>Acceso Seguro</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Sistema Financiero Sapfiai</p>
        </div>

        {error && <div style={{ color: '#dc2626', marginBottom: '15px', fontSize: '13px' }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '5px' }}>Correo Institucional</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="usuario@ucaldas.edu.co" 
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }} required 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '5px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }} required 
              />
              <button 
                type="button" onClick={() => setShowPass(!showPass)} 
                style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ 
            width: '100%', padding: '15px', background: '#003e70', color: 'white', 
            border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' 
          }}>
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>
            ¿Problemas de acceso? <br/>
            <span style={{ color: '#003e70', fontWeight: '700', cursor: 'pointer' }}>Soporte Técnico CIDT</span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <GuestGuard>
      <LoginContent />
    </GuestGuard>
  );
}