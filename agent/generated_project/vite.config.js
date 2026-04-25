import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
  },
  // Enable CSS code splitting and ensure assets (e.g., lazy‑loaded images) are emitted as separate files
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 0,
  },
});
