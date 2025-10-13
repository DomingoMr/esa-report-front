import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Necesario para `vite preview` en Koyeb
  preview: {
    host: true, // 0.0.0.0
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    // Permite el dominio de Koyeb (y añade el tuyo si usas custom domain)
    allowedHosts: [
      '.koyeb.app',
      // 'tu-dominio.com',
      // 'inappropriate-janka-etree-0dc60fad.koyeb.app' // opcionalmente el exacto
    ],
  },
})
