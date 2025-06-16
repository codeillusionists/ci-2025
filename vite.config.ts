import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'client',
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
