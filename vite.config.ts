import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Two real pages rather than a client-side router: GitHub Pages serves /about/
    // directly, so there is no 404.html SPA-fallback hack to maintain.
    rollupOptions: {
      input: { main: 'index.html', about: 'about/index.html' },
    },
  },
  // strictPort so a busy 3001 fails loudly instead of silently moving the dev URL.
  server: { port: 3001, host: true, strictPort: true },
  preview: { port: 3001, strictPort: true },
});
