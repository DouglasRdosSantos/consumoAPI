import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Consumo de APIs',
        short_name: 'ConsumoAPI',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Imagens: vem primeiro para valer também para as da dragonball-api
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'imagens',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) => url.hostname === 'www.omdbapi.com',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'omdb',
              networkTimeoutSeconds: 5,
              // Sem isto, as respostas da OMDb ficam no cache mas não são encontradas offline
              matchOptions: { ignoreVary: true },
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: ({ url }) =>
              ['pokeapi.co', 'dragonball-api.com'].includes(url.hostname) ||
              url.hostname.endsWith('.mockapi.io'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'apis' },
          },
        ],
      },
    }),
  ],
})
