import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@store': path.resolve(__dirname, './src/store'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
});
