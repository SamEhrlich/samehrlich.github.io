import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // strictPort so a busy 3001 fails loudly instead of silently moving the dev URL.
  server: { port: 3001, host: true, strictPort: true },
  preview: { port: 3001, strictPort: true },
});
