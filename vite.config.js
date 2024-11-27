import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: "dist", // You can change 'build' to any folder name
    sourcemap: false,  // Disable source maps for production builds
  },  
  server: {
    sourcemap: true, // Enable source maps during development
  },
  // server: {
  //   proxy: {
  //     '/cake-backend': {
  //       target: 'http://localhost',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/cake-backend/, ''),
  //     },
  //   },
  // },

});

