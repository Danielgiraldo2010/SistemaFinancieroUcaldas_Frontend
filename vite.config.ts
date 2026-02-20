import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@store': path.resolve(__dirname, './src/store'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  server: {
    proxy: {
      // Esto soluciona el "CORS error" que viste en el Network
      '/api': {
        target: 'https://practicascitd-001-site1.anytempurl.com',
        changeOrigin: true,
        secure: false,
        // Reescribimos la ruta para que coincida con lo que espera el servidor
        rewrite: (path) => path.replace(/^\/api/, '/api') 
      }
    }
  }
});