import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ColorThief from 'color-thief-browser';

export default defineConfig({
  base: 'https://felipe2910.github.io/mi-app/',
  plugins: [react(), tailwindcss(), ColorThief()],
})
