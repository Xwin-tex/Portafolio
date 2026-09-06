import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Portafolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    open: true
  }
});
