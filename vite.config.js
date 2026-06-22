import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        // Public site
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // Private V2 preview (full original dark site), served at /V2.html
        v2: fileURLToPath(new URL('./V2.html', import.meta.url)),
        // Private V3 preview (light Stripe/Apple-grade site), served at /V3.html
        v3: fileURLToPath(new URL('./V3.html', import.meta.url)),
      },
    },
  },
})
