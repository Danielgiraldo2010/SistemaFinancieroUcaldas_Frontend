'use client';
import { useState, useEffect, useCallback } from 'react';
import { securityService } from '@/services';
import { IpBlackList, BlackListReason } from '@/core';
import { format } from 'date-fns';

export default function SecurityPage() {
  const [ips, setIps]           = useState<IpBlackList[]>([]);
  const [loading, setLoading]   = useState(true);
  const [unlocking, setUnlocking] = useState('');
  const [error, setError]       = useState<string | null>(null);

  const fetchIps = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setIps(await securityService.getBlockedIps(true)); }
    catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status;
      if (status === 403) setError('No tienes permisos para ver esta sección.');
      else if (status === 404) setError('El módulo de seguridad no está disponible en el servidor.');
      else setError('Error al cargar los datos. Intenta de nuevo.');
    }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchIps(); }, [fetchIps]);

  const handleUnblock = async (ip: string) => {
    setUnlocking(ip);
    try {
      await securityService.unblockIp({ ipAddress: ip });
      await fetchIps();
    } catch (e) { console.error(e); }
    finally { setUnlocking(''); }
  };

  const reasonLabel: Record<number, string> = {
    [BlackListReason.ManualBlock]: 'Bloqueo manual',
    [BlackListReason.TooManyAttempts]: 'Demasiados intentos',
    [BlackListReason.SuspiciousActivity]: 'Actividad sospechosa',
    [BlackListReason.ReportedAbuse]: 'Abuso reportado',
  };

  const renderContent = () => {
    if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>⏳ Cargando IPs bloqueadas...</div>;
    if (error) return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
        <p style={{ color: '#dc2626', fontWeight: '600', fontSize: '15px', margin: '0 0 4px' }}>{error}</p>
      </div>
    );
    if (ips.length === 0) return <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>✅ No hay IPs bloqueadas actualmente</div>;
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            {['IP', 'Razón', 'Bloqueado por', 'Vencimiento', 'Acción'].map((h) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ips.map((ip) => (
            <tr key={ip.ipAddress} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#111827', fontFamily: 'monospace' }}>{ip.ipAddress ?? '—'}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: '#fee2e2', color: '#991b1b' }}>
                  {ip.blackListReason !== undefined && reasonLabel[ip.blackListReason] !== undefined
                    ? reasonLabel[ip.blackListReason]
                    : ip.reason}
                </span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563' }}>{ip.blockedBy ?? '—'}</td>
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563' }}>
                {ip.expiryDate ? format(new Date(ip.expiryDate), 'dd/MM/yy HH:mm') : '∞ Permanente'}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button
                  onClick={() => ip.ipAddress && handleUnblock(ip.ipAddress)}
                  disabled={unlocking === ip.ipAddress || !ip.ipAddress}
                  style={{
                    padding: '6px 14px', backgroundColor: '#dcfce7', color: '#166534',
                    border: '1px solid #bbf7d0', borderRadius: '8px',
                    cursor: unlocking === ip.ipAddress ? 'not-allowed' : 'pointer',
                    fontSize: '13px', fontWeight: '600',
                  }}>
                  {unlocking === ip.ipAddress ? '⏳' : '🔓 Desbloquear'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 6px' }}>Gestión de IPs Bloqueadas</h1>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Administra las IPs en lista negra del sistema</p>
        </div>
        <button onClick={fetchIps} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
          🔄 Actualizar
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {renderContent()}
      </div>
    </div>
  );
}
