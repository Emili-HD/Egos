// https://nuxt.com/docs/api/configuration/nuxt-config
// import { resolve } from 'path'

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
    '@nuxt/image',
    'nuxt-speedkit',
    'nuxt-swiper',
    'nuxt-delay-hydration',
    'nuxt-viewport',
  ],
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
    mode: 'init',
    include: [
      '/blog/**',
      '/opinion/**',
      'nuestra-clinicas',
      'nuestro-equipo',
      'casos-reales'
    ]
  },
  speedkit: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },

    fonts: [{
      family: 'Font A',
      locals: ['Font A'],
      fallback: ['Arial', 'sans-serif'],
      variances: [
        {
          style: 'normal',
          weight: 100,
          sources: [
            { src: '@/assets/fonts/canela/CanelaDeck-light.woff2', type: 'woff2' },
          ]
        }, {
          style: 'normal',
          weight: 600,
          sources: [
            { src: '@/assets/fonts/geomanist/geomanist-bold.woff', type: 'woff' },
            { src: '@/assets/fonts/geomanist/geomanist-bold.woff2', type: 'woff2' }
          ]
        }
      ]
    }],

    targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],

    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%'
    }

  },
  image: {
    // Opciones de @nuxt/image
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    },
    providers: {
      customProvider: {
        name: 'customProvider',
        provider: '~/providers/customProvider.js', // Ruta al archivo del proveedor personalizado
        options: {
          baseURL: 'https://test.clinicaegos.com', // URL base de tu proveedor de imágenes
        },
      },
    },
    // Configuración predeterminada del proveedor
    defaultProvider: 'customProvider',
  },
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg'
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
    'pages:extend'(pages) {
      // add a route
      pages.push({
        name: 'tratamiento',
        path: '/:category/:slug',
        file: '~/pages/cirugia/[...slug].vue',
        // file: resolve(__dirname, 'pages/cirugia/[...slug].vue'),
      })
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/abstracts/_abstracts-dir.scss";',
        },
      },
    },
  },
  nitro: {
    preset: 'node-server',
  }
})
