import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

const URL = 'http://localhost:3000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
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
        }
      }
    }
  }
})
