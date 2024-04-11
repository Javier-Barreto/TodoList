import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env.APIKEY': JSON.stringify(env.APIKEY),
      'process.env.GAK': JSON.stringify(env.GAK)
    },

    plugins: [react()],
    base: '/TodoList/',
    build: '/TodoList/',
  }
})
