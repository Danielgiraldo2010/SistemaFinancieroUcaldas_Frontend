'use client';

import { useEffect } from 'react';
import { env } from '@/config';

export default function TestPage() {
  useEffect(() => {
    console.log('='.repeat(60));
    console.log('🔍 VERIFICACIÓN DE CONFIGURACIÓN');
    console.log('='.repeat(60));
    console.log('Backend URL:', env.backendUrl);
    console.log('Es Development:', env.isDevelopment);
    console.log('Es Production:', env.isProduction);
    console.log('='.repeat(60));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>🔍 Verificación de Configuración</h1>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <p><strong>Backend URL:</strong> {env.backendUrl}</p>
        <p><strong>Entorno:</strong> {env.isDevelopment ? 'Development' : 'Production'}</p>
        <p><strong>Protocolo:</strong> {env.backendUrl.startsWith('https') ? '✅ HTTPS' : '❌ HTTP'}</p>
      </div>
      <div style={{ marginTop: '20px', padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
        <h3>✅ Pasos completados:</h3>
        <ol>
          <li>Caché de Next.js limpiada</li>
          <li>Configuración verificada</li>
          <li>Servidor debe reiniciarse</li>
        </ol>
        <h3>📝 Siguiente paso:</h3>
        <p>Reinicia el servidor con: <code>npm run dev</code></p>
        <p>Luego ve a: <a href="/login">/login</a></p>
      </div>
    </div>
  );
}
