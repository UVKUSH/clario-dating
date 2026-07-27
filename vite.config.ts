import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The Worker API runs under `wrangler dev` on 8787. Proxying here means the
    // app always calls same-origin /api/* — matching how Pages routes to the
    // Worker in production — so there is no CORS handling and no per-environment
    // base URL to thread through the client.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})
