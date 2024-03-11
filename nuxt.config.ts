// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  devtools: { enabled: true },
  plugins: [
    '~/plugins/gtm.js',
    '~/plugins/setHtmlLang.js',
  ],
  css: [
    '~/src/styles.css', 
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    'nuxt-delay-hydration',
  ],
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
    mode: 'init'
  },
  components: true,
  runtimeConfig: {
    public: {
        wordpressUrl: process.env.WP_URL,
        frontendSiteUrl: process.env.FRONTEND_DEV_URL || process.env.FRONTEND_PROD_URL
    },
    private: {
      FAUST_SECRET_KEY: process.env.FAUST_KEY
    }
  },
  experimental: {
    watcher: "chokidar",
  },
  hooks: {
    'pages:extend' (pages) {
      // add a route
      pages.push({
        name: 'tratamiento',
        path: '/:category/:slug',
        // file: './cirugia/[...slug].vue'
        file: resolve(__dirname, 'pages/cirugia/[...slug].vue'),
      })
    }
  },
  nitro: {
    preset: 'node-server',
  }
})
