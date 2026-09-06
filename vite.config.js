import { defineConfig } from 'vite';

export default defineConfig({
  // Vercel sirve en /, GitHub Pages en /Portafolio/
  base: process.env.VERCEL ? '/' : '/Portafolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    open: true
  }
});
