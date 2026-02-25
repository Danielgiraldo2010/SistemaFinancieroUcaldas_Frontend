'use client';
import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/infrastructure/api/auth/AuthService';
import { AuditLogDto } from '@/core/domain/types';
import { format } from 'date-fns';

export default function AuditLogsPage() {
  const [logs, setLogs]     = useState<AuditLogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]     = useState(1);
  const [action, setAction] = useState('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await authService.getAuditLogs(page, 20, action || undefined);
      setLogs(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, action]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 6px' }}>Audit Logs</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Registro de actividad del sistema</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input
          type="text" placeholder="Filtrar por acción..." value={action}
          onChange={(e) => { setAction(e.target.value); setPage(1); }}
          style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', color: '#111827', outline: 'none', flex: 1, maxWidth: '300px' }}
        />
        <button onClick={fetchLogs} style={{
          padding: '10px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px',
        }}>
          🔄 Actualizar
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>⏳ Cargando logs...</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>📭 Sin registros encontrados</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                  {['Acción', 'Usuario', 'IP', 'Estado', 'Fecha'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{log.action ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563' }}>{log.userEmail ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563', fontFamily: 'monospace' }}>{log.ipAddress ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                        backgroundColor: log.status === 'Success' ? '#dcfce7' : '#fee2e2',
                        color: log.status === 'Success' ? '#166534' : '#991b1b',
                      }}>{log.status ?? '—'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>
                      {log.timestamp ? format(new Date(log.timestamp), 'dd/MM/yy HH:mm') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: page === 1 ? 'not-allowed' : 'pointer', color: '#374151', backgroundColor: 'white', fontSize: '14px' }}>← Anterior</button>
        <span style={{ padding: '8px 16px', fontSize: '14px', color: '#6b7280' }}>Página {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={logs.length < 20} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: logs.length < 20 ? 'not-allowed' : 'pointer', color: '#374151', backgroundColor: 'white', fontSize: '14px' }}>Siguiente →</button>
      </div>
    </div>
  );
}
