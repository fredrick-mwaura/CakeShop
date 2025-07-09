import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: "dist", // You can change 'build' to any folder name
    sourcemap: false,  // Disable source maps for production builds
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },  
  server: {
    sourcemap: true, // Enable source maps during development
    headers: {
      // 'Content-Type': 'text/css',
    }
  },
});
