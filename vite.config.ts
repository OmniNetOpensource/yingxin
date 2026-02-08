import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/anthropic': {
        target: 'https://www.right.codes/claude-aws',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
        headers: {
          'x-api-key': 'sk-65bde8d974b144fb828067de100d9629',
          'anthropic-version': '2023-06-01',
        },
      },
    },
  },
})
