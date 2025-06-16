import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // ✅ required!
import path from 'path';

export default defineConfig({
  root: 'client',
  plugins: [react()], // ✅ enable React
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
