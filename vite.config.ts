import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3011,
    proxy: {
      '/api': {
        target: 'http://localhost:5011',
        changeOrigin: true,
      },
      '/public': {
        target: 'http://localhost:5011',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.scss";`,
      },
    },
  },
})
