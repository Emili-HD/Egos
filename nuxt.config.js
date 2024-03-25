// https://nuxt.com/docs/api/configuration/nuxt-config
// import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    '~/plugins/gtm.js', 
    '~/plugins/setHtmlLang.js',
    '~/plugins/scrollToTop.client.js',
  ],
  css: [
    '~/src/styles.css', 
    '~/assets/css/fonts.css', 
    '~/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {
        configPath: 'tailwind.config',
        exposeConfig: {
          level: 2,
        },
        config: {},
        viewer: true,
      },
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-delay-hydration',
    'nuxt-simple-robots',
    'nuxt-speedkit',
    'nuxt-swiper',
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
      'casos-reales',
    ],
  },
  speedkit: {
    detection: {
      performance: true,
      browserSupport: true,
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },

    fonts: [
      {
        family: 'Font A',
        locals: ['Font A'],
        fallback: ['Arial', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 100,
            sources: [
              {
                src: '@/assets/fonts/canela/CanelaDeck-light.woff2',
                type: 'woff2',
              },
            ],
          },
          {
            style: 'normal',
            weight: 600,
            sources: [
              {
                src: '@/assets/fonts/geomanist/geomanist-bold.woff',
                type: 'woff',
              },
              {
                src: '@/assets/fonts/geomanist/geomanist-bold.woff2',
                type: 'woff2',
              },
            ],
          },
        ],
      },
    ],

    targetFormats: ['avif', 'webp', 'jpg|jpeg|png|gif'],

    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%',
    },
  },
  image: {
    inject: true,
    // provider: "ipx",
    // Opciones de @nuxt/image
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    },
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

    fallbackBreakpoint: 'lg',
  },
  components: true,
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY,
      wordpressUrl: process.env.WP_URL,
      frontendSiteUrl: process.env.FRONTEND_DEV_URL || process.env.FRONTEND_STAGING_URL || process.env.FRONTEND_PROD_URL,
    },
    private: {
      FAUST_SECRET_KEY: process.env.FAUST_KEY,
    },
  },
  experimental: {
    watcher: 'chokidar',
  },
  hooks: {
    'pages:extend'(pages) {
      // add a route
      pages.push({
        name: 'tratamiento',
        path: '/:category/:slug',
        file: '~/pages/cirugia/[...slug].vue',
      })
      
      pages.push({
        name: 'aviso-legal',
        path: '/aviso-legal',
        file: '~/pages/legal.vue',
      });

      // Política de Cookies
      pages.push({
        name: 'politica-de-cookies',
        path: '/politica-de-cookies',
        file: '~/pages/legal.vue',
      });

      // Política de Privacidad
      pages.push({
        name: 'politica-de-privacidad',
        path: '/politica-de-privacidad',
        file: '~/pages/legal.vue',
      });
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/scss/abstracts/_abstracts-dir.scss";',
        },
      },
    },
  },
  // Configuración de nuxt-simple-robots
  robots: {
    // Opciones de configuración
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/',
    Sitemap: 'https://clinicaegos.com/sitemap.xml',
    // Puedes añadir más líneas según necesites
  },
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL,
    sitemaps: {
      posts: {
        sources: ['/api/sitemap/posts'],
      },
      pages: {
        sources: ['/api/sitemap/pages'],
      },
      clinicas: {
        sources: ['/api/sitemap/clinicas'],
      },
      equipo: {
        sources: ['/api/sitemap/equipo'],
      },
      cirugias: {
        sources: ['/api/sitemap/cirugias'],
      },
      testimonios: {
        sources: ['/api/sitemap/testimonios'],
      },
      landings: {
        sources: ['/api/sitemap/landings'],
      },
    },
  },
  nitro: {
    preset: 'node-server',
  },
})
