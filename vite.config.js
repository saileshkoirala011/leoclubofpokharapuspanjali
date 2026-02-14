import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 // adjust based on your deploy path
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.json'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('react-router')) return 'react-router-vendor'
            if (id.includes('react-icons')) return 'icons-vendor'
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  },
})
