import { defineConfig } from 'vite'

export default defineConfig({
  root: 'client',              // source folder
  build: {
    outDir: 'dist',            // output folder relative to root
    emptyOutDir: true
  }
})
