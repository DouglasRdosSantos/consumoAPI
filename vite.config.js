import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon_io/favicon.ico',
        'favicon_io/favicon-16x16.png',
        'favicon_io/favicon-32x32.png',
        'favicon_io/apple-touch-icon.png',
        'icons.svg',
      ],
      manifest: {
        id: '/',
        name: 'Consumo de APIs',
        short_name: 'ConsumoAPI',
        description:
          'Busca de filmes na OMDb, Pokémon e personagens de Dragon Ball, funcionando até sem internet.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          { src: 'favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'favicon_io/maskable_icon.png', sizes: '487x487', type: 'image/png', purpose: 'maskable' },
        ],
        // Permitem a janela de instalação "rica", com prévia do app
        screenshots: [
          {
            src: 'screenshots/desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Busca de filmes no computador',
          },
          {
            src: 'screenshots/celular.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Busca de filmes no celular',
          },
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
            options: {
              cacheName: 'apis',
              // Sem limite, este cache cresceria para sempre
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
