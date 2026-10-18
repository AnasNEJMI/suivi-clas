import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'
import {
  SITE_URL, SITE_NAME, SITE_SHORT_NAME, SITE_TAGLINE, PUBLIC_PAGES, PRIVATE_PATHS,
} from './src/site.config'

const URL = 'http://localhost:3000';

function siteFiles(): Plugin {
  return {
    name: 'site-files',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html
        .replaceAll('__SITE_URL__', SITE_URL)
        .replaceAll('__SITE_NAME__', SITE_NAME),
    },

    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)   // lastmod = build date

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          ...PRIVATE_PATHS.map(p => `Disallow: ${p}`),
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n'),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...PUBLIC_PAGES.map(p => [
            '  <url>',
            `    <loc>${SITE_URL}${p.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            `    <changefreq>${p.changefreq}</changefreq>`,
            `    <priority>${p.priority.toFixed(1)}</priority>`,
            '  </url>',
          ].join('\n')),
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    siteFiles(),
     VitePWA({
      registerType: 'prompt', 
      injectRegister: false,

      manifest: {
        id:               '/',
        name:        SITE_NAME,
        short_name:  SITE_SHORT_NAME,
        description: SITE_TAGLINE,
        lang:             'fr',
        start_url:        '/',
        scope:            '/',
        display:          'standalone',
        background_color: '#ffffff',
        theme_color:      '#4338CA',
        categories:       ['education'],
        icons: [
          { src: 'pwa-64x64.png',             sizes: '64x64',   type: 'image/png' },
          { src: 'pwa-192x192.png',           sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png',           sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff2}'],
        globIgnores:  ['**/vendor-pdf-*.js'],

        navigateFallback:         '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/robots\.txt$/, /^\/sitemap\.xml$/],
        cleanupOutdatedCaches:    true,

        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/assets/'),
            handler:    'CacheFirst',
            options: {
              cacheName:           'lazy-assets',
              expiration:          { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse:   { statuses: [200] },
            },
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server : {
    proxy : {
      '/api' : {
        target : URL,
        changeOrigin : true,
      }
    }
  },
  build : {
    rollupOptions : {
      output : {
        manualChunks(id) {
          // React runtime — tiny, barely changes
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }

           // Routing
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          
          // Data fetching + state
          if (id.includes('node_modules/@tanstack/')) {
            return 'vendor-query'
          }

          // All Radix primitives (shadcn uses these)
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix'
          }

          // Form library
          if (id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform/') ||
              id.includes('node_modules/zod')) {
            return 'vendor-forms'
          }

          // Date utilities
          if (id.includes('node_modules/date-fns')) {
            return 'vendor-dates'
          }

          // Icons — lucide is well tree-shaken, keep separate for cache
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }

           // Charts — heavy, rarely changes
          if (id.includes('node_modules/recharts') ||
              id.includes('node_modules/d3-') ||
              id.includes('node_modules/victory')) {
            return 'vendor-charts'
          }

          // Sonner + small utilities
          if (id.includes('node_modules/sonner') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/tailwind-merge')) {
            return 'vendor-utils'
          }

          if (id.includes('node_modules/@react-pdf') ||
              id.includes('node_modules/fontkit') ||
              id.includes('node_modules/pdfkit') ||
              id.includes('node_modules/yoga-layout')) {
            return 'vendor-pdf'
          }
        }
      }
    }
  }
})
