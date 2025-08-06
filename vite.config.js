import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ColorThief from 'color-thief-browser';

export default defineConfig({
  plugins: [react(), tailwindcss(), ColorThief()],
    server: {
    host: true, // permite conexiones desde otras IPs (no solo localhost)
    port: 5173, // puedes cambiar el puerto si lo deseas
  },
})
