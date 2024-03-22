import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env.APIKEY': JSON.stringify(env.APIKEY)
    },

    plugins: [react(), VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script'
    })],
    base: '/TodoList/',
    build: '/TodoList/',
  }
})
