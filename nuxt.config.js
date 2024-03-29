// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    '~/plugins/gtm.js', 
    '~/plugins/setHtmlLang.js',
    '~/plugins/scrollToTop.client.js',
  ],
  css: [
    '~/src/styles.css', 
    // '~/assets/css/fonts.css', 
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

    // fonts: [
    //   {
    //     family: 'Canela',
    //     locals: ['Canela'],
    //     fallback: ['Garamond', 'serif'],
    //     variances: [
    //       {
    //         style: 'normal',
    //         weight: 200,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/canela/Canela-Thin.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/canela/Canela-Thin.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 300,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/canela/Canela-Light.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/canela/Canela-Light.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 400,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/canela/Canela-Regular.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/canela/Canela-Regular.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 600,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/canela/Canela-Bold.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/canela/Canela-Bold.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     family: 'Geomanist',
    //     locals: ['Geomanist'],
    //     fallback: ['Arial', 'serif'],
    //     variances: [
    //       {
    //         style: 'normal',
    //         weight: 300,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Light.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Light.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 400,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Book.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Book.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 500,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Bold.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Bold.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //       {
    //         style: 'normal',
    //         weight: 600,
    //         sources: [
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Black.woff',
    //             type: 'woff',
    //           },
    //           {
    //             src: '@/assets/fonts/geomanist/hinted-Geomanist-Black.woff2',
    //             type: 'woff2',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],

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
    },
    private: {
      wordpressUrl: process.env.WP_URL,
      frontendSiteUrl: process.env.FRONTEND_DEV_URL || process.env.FRONTEND_PROD_URL,
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
    },
  },
  router: {
    middleware: [
      '~/middleware/apiProxy.js',
      '~/middleware/force-slash.global.js',
      '~/middleware/force-cirugias.global.js',
    ]
  },
  routeRules:{
    '/estetica-facial/rinoplastia/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/blog/page/**': { redirect: { to:'/blog/', statusCode: 308 } }, 
    '/category/uncategorized/**': { redirect: { to:'/blog/', statusCode: 308 } }, 
    '/centros/**': { redirect: { to:'/nuestras-clinicas/', statusCode: 308 } }, 

    // Añadir nuevas reglas aquí
    '/inicio': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-en-girona-clinica-egos/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-en-sant-cugat/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-dermatologica/': { redirect: { to: '/', statusCode: 308 } },
    '/promocion-verano-hombre/': { redirect: { to: '/', statusCode: 308 } },
    '/promocion-1/': { redirect: { to: '/', statusCode: 308 } },
    '/landings/index.html': { redirect: { to: '/', statusCode: 308 } },
    '/servicios-maresme/': { redirect: { to: '/', statusCode: 308 } },
    '/equipo/': { redirect: { to: '/nuestro-equipo', statusCode: 308 } },
    '/servicios/': { redirect: { to: '/', statusCode: 308 } },
    '/testimonios/': { redirect: { to: '/casos-reales/', statusCode: 308 } },
    '/cirugia-capilar/injerto-capilar-en-madrid/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 308 } },
    '/todo-lo-que-debes-saber-la-cirugia-capilar/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 308 } },
    '/cirugia-capilar/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 308 } },
    '/microinjertos-cejas/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 308 } },

    // Redirecciones a /cirugia-de-pechos/aumento-de-pecho/
    '/precio-aumento-de-pecho/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/postoperatorio-de-aumento-de-mamas/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/badalona/aumento-pecho.html': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/cirugia-mamaria/aumento-de-pecho-con-grasa/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/cirugia-mamaria/aumento-de-pecho-en-barcelona/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/cirugia-mamaria/aumento-de-pecho-en-madrid/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/pechos/aumento-de-mamas-con-grasa-propia/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },
    '/pechos/aumento-de-pecho-en-barcelona/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 308 } },

    // Redirecciones específicas dentro de /cirugia-mamaria/
    '/cirugia-mamaria/ginecomastia/': { redirect: { to: '/cirugia-de-pechos/ginecomastia/', statusCode: 308 } },
    '/cirugia-mamaria/extraccion-de-implantes-mamarios/': { redirect: { to: '/cirugia-de-pechos/cambio-implantes-mamarios/', statusCode: 308 } },
    '/cirugia-mamaria/reduccion-de-pecho/': { redirect: { to: '/cirugia-de-pechos/reduccion-de-pecho/', statusCode: 308 } },
    '/cirugia-mamaria/elevacion-de-mamas/': { redirect: { to: '/cirugia-de-pechos/mastopexia/', statusCode: 308 } },
    '/cirugia-mamaria/reduccion-de-areolas/': { redirect: { to: '/cirugia-de-pechos/reduccion-de-areolas-o-pezon/', statusCode: 308 } },
    '/cirugia-mamaria/cirugia-reconstructiva-diep/': { redirect: { to: '/cirugia-de-pechos/reconstruccion-mamaria/', statusCode: 308 } },
    '/cirugia-mamaria/cirugia-reconstruccion-mamaria/': { redirect: { to: '/cirugia-de-pechos/reconstruccion-mamaria/', statusCode: 308 } },
    '/pechos/extraccion-de-implantes-mamarios/': { redirect: { to: '/cirugia-de-pechos/quitar-implantes-de-pecho/', statusCode: 308 } },

    // Redirecciones específicas para tratamientos y promociones
    '/remedios-para-las-estrias/': { redirect: { to: '/cirugia-de-pechos/eliminar-cicatrices/', statusCode: 308 } },
    '/cirugia-dermatologica/tratamientos-de-las-manchas/': { redirect: { to: '/cirugia-de-pechos/eliminar-cicatrices/', statusCode: 308 } },
    '/mejorar-cicatriz-de-un-aumento-de-pecho/': { redirect: { to: '/cirugia-de-pechos/correccion-de-la-cicatriz-de-aumento-de-pecho/', statusCode: 308 } },

    // Redirecciones para URLs que no siguen un patrón específico de cirugía mamaria
    '/cirugia-estetica-corporal/lifting-de-piernas-y-gluteos-en-madrid/': { redirect: { to: '/promocion/cirugia-de-pechos-madrid', statusCode: 308 } },
    '/cirugia-mamaria/elevacion-de-pechos-madrid/': { redirect: { to: '/promocion/cirugia-de-pechos-madrid/', statusCode: 308 } },

    // Redirecciones generales al inicio
    '/cirugia-estetica-en-girona-clinica-egos/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-en-sant-cugat/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-dermatologica/': { redirect: { to: '/', statusCode: 308 } },
    '/promocion-verano-hombre/': { redirect: { to: '/', statusCode: 308 } },
    '/promocion-1/': { redirect: { to: '/', statusCode: 308 } },
    '/landings/index.html': { redirect: { to: '/', statusCode: 308 } },
    '/servicios-maresme/': { redirect: { to: '/', statusCode: 308 } },
    '/servicios/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugias-mamarias-2022/': { redirect: { to: '/cirugia-de-pechos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/aumento-pectorales/': { redirect: { to: '/cirugia-de-pechos/ginecomastia/', statusCode: 308 } },

    // Redirecciones para cirugía mamaria y promociones específicas
    '/ginecomastia-en-madrid/': { redirect: { to: '/promocion/cirugia-intima-madrid/', statusCode: 308 } },
    '/cirugia-mamaria/reconstruccion-de-pecho-madrid/': { redirect: { to: '/promocion/aumento-de-gluteos-madrid/', statusCode: 308 } },

    // Redirecciones para cirugía íntima
    '/cirugia-intima/vaginoplastia-en-madrid/': { redirect: { to: '/cirugia-intima/', statusCode: 308 } },
    '/cirugia-intima/himenoplastia/': { redirect: { to: '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/', statusCode: 308 } },
    '/cirugia-intima/reduccion-de-labios-mayores/': { redirect: { to: '/cirugia-intima/labioplastia-o-ninfoplastia/', statusCode: 308 } },
    '/cirugia-intima/rejuvenecimiento-vaginal/': { redirect: { to: '/cirugia-intima/vaginoplastia/', statusCode: 308 } },
    '/servicio/tratamiento-de-mesoplastia/': { redirect: { to: '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/', statusCode: 308 } },

    // Redirecciones a la página de inicio
    '/teletrabajo-una-de-las-causas-del-aumento-de-las-cirugias-esteticas-en-2020/': { redirect: { to: '/', statusCode: 308 } },
    '/formulario-de-registro/': { redirect: { to: '/', statusCode: 308 } },
    '/contacto/': { redirect: { to: '/', statusCode: 308 } },
    '/servicios-2/': { redirect: { to: '/', statusCode: 308 } },
    '/medicina-estetica/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-badalona/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-en-tarragona/': { redirect: { to: '/', statusCode: 308 } },
    '/servicios-sabadell-y-sant-cugat/': { redirect: { to: '/', statusCode: 308 } },
    '/clinica-cirugia-estetica-en-sabadell/': { redirect: { to: '/', statusCode: 308 } },
    '/paniculectomia/': { redirect: { to: '/', statusCode: 308 } },

    // Redirecciones al equipo
    '/equipo/dr-tiago-gomes-cirujano/': { redirect: { to: '/nuestro-equipo/', statusCode: 308 } },
    '/dr-santiago-elvira-cirujano-plastico/': { redirect: { to: '/nuestro-equipo/', statusCode: 308 } },

    // Redirección a nuestras clínicas
    '/donde-estamos/': { redirect: { to: '/nuestras-clinicas/', statusCode: 308 } },

    // Redirecciones específicas para cirugía bariátrica y tratamientos para la obesidad
    '/cirugia-estetica-corporal/cirugia-bariatrica/': { redirect: { to: '/obesidad/sleeve-gastrico/', statusCode: 308 } },
    '/corporal/cirugia-bariatrica/': { redirect: { to: '/obesidad/sleeve-gastrico/', statusCode: 308 } },
    '/tratamientos-para-la-obesidad/': { redirect: { to: '/obesidad/', statusCode: 308 } },
    '/adelgazar-con-tratamiento-obesidad/': { redirect: { to: '/obesidad/', statusCode: 308 } },
    '/tratamientos-obesidad/': { redirect: { to: '/obesidad/sleeve-gastrico/', statusCode: 308 } },
    '/tratamientos-obesidad/endomanga-en-madrid/': { redirect: { to: '/promocion/perdida-de-peso-madrid', statusCode: 308 } },
    '/cirugia-bariatrica-en-madrid/': { redirect: { to: '/obesidad/', statusCode: 308 } },
    '/tratamientos-obesidad/endomanga-en-barcelona/': { redirect: { to: '/obesidad/endomanga-reduccion-de-estomago-sin-cirugia/', statusCode: 308 } },
    '/perdida-de-peso-despues-del-verano/': { redirect: { to: '/obesidad/', statusCode: 308 } },
    '/promocion-verano-mujer/': { redirect: { to: '/obesidad/', statusCode: 308 } },
    '/dudas-balon-gastrico/': { redirect: { to: '/obesidad/balon-gastrico/', statusCode: 308 } },
    '/alimentacion-despues-de-la-cirugia-bariatrica/': { redirect: { to: '/obesidad/sleeve-gastrico/', statusCode: 308 } },
    '/balon-gastrico/': { redirect: { to: '/obesidad/balon-gastrico/', statusCode: 308 } },

    // Redirecciones para entradas específicas del blog y categorías
    '/5-beneficios-de-la-blefaroplastia/': { redirect: { to: '/blog/5-beneficios-de-la-blefaroplastia', statusCode: 308 } },
    '/morpheus-8-medicina-estetica-revolucionaria/': { redirect: { to: '/blog/morpheus-8-medicina-estetica-revolucionaria', statusCode: 308 } },
    '/cuanto-cuesta-un-injerto-de-pelo/': { redirect: { to: '/blog/paciente-ideal-de-la-cirugia-capilar', statusCode: 308 } },
    '/menopausia/': { redirect: { to: '/blog/', statusCode: 308 } },
    '/mejorar-cicatriz-de-una-abdominoplastia/': { redirect: { to: '/blog/mejorar-cicatriz-de-una-abdominoplastia', statusCode: 308 } },
    '/category/noticias/': { redirect: { to: '/blog/', statusCode: 308 } },
    '/compatible-el-embarazo-con-implantes-mamarios/': { redirect: { to: '/blog/protesis-mamarias-opcion-segura', statusCode: 308 } },
    '/ejercicio-despues-aumento-pecho/': { redirect: { to: '/blog/tipos-de-operaciones-de-pecho', statusCode: 308 } },
    '/5-trucos-prevenir-la-aparicion-de-arrugas/': { redirect: { to: '/blog/5-trucos-prevenir-la-aparicion-de-arrugas', statusCode: 308 } },
    '/la-otoplastia-esta-recomendada-para-ninos/': { redirect: { to: '/blog/cuanto-cuesta-una-otoplastia', statusCode: 308 } },
    '/pecho-mas-hinchado-despues-de-aumento/': { redirect: { to: '/blog/pecho-mas-hinchado-despues-de-aumento/', statusCode: 308 } },
    '/paciente-ideal-de-la-cirugia-capilar/': { redirect: { to: '/blog/paciente-ideal-de-la-cirugia-capilar', statusCode: 308 } },
    '/cuanto-cuesta-una-otoplastia/': { redirect: { to: '/blog/cuanto-cuesta-una-otoplastia/', statusCode: 308 } },
    '/tratamientos-para-el-sobrepeso/': { redirect: { to: '/blog/tratamientos-para-el-sobrepeso/', statusCode: 308 } },
    '/allurion-que-es/': { redirect: { to: '/blog/allurion-que-es/', statusCode: 308 } },
    '/que-es-un-peeling-facial/': { redirect: { to: '/blog/que-es-un-peeling-facial/', statusCode: 308 } },
    '/lifting-facial-todo-lo-que-debes-saber/': { redirect: { to: '/blog/lifting-facial-todo-lo-que-debes-saber/', statusCode: 308 } },
    '/como-conseguir-un-vientre-plano/': { redirect: { to: '/blog/como-conseguir-un-vientre-plano/', statusCode: 308 } },
    '/mar-regueras-visita-clinica-egos/': { redirect: { to: '/blog/mar-regueras-visita-clinica-egos/', statusCode: 308 } },
    '/tipos-de-liposuccion/': { redirect: { to: '/blog/tipos-de-liposuccion/', statusCode: 308 } },
    '/tipos-de-operaciones-de-pecho/': { redirect: { to: '/blog/tipos-de-operaciones-de-pecho/', statusCode: 308 } },
    '/clinica-egos-aumenta-presencia-grupo-quiron/': { redirect: { to: '/blog/clinica-egos-aumenta-presencia-grupo-quiron/', statusCode: 308 } },

    // Redirecciones para tratamientos y cirugías estéticas corporales
    '/tratamientos-para-tonificar-el-abdomen/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 308 } },
    '/recuperacion-de-una-liposuccion/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 308 } },
    '/lipo-vaser-que-es-y-beneficios/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 308 } },
    '/aumento-de-gluteos-opciones/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 308 } },
    '/que-es-el-mommy-makeover/': { redirect: { to: '/estetica-corporal/cirugia-mommy-makeover/', statusCode: 308 } },
    '/cirugia-estetica-corporal/': { redirect: { to: '/estetica-corporal/', statusCode: 308 } },
    '/cirugia-estetica-corporal/aumento-de-pectorales-en-madrid/': { redirect: { to: '/', statusCode: 308 } },
    '/cirugia-estetica-corporal/lifting-de-brazos-en-madrid/': { redirect: { to: '/promocion/cirugias-corporales-madrid/', statusCode: 308 } },
    '/cirugia-estetica-corporal/lifting-de-piernas/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/lipoescultura/': { redirect: { to: '/estetica-corporal/lipoescultura/', statusCode: 308 } },
    '/servicio/tratamiento-de-mesoterapia/': { redirect: { to: '/estetica-corporal/tratamiento-varices-sin-cirugia/', statusCode: 308 } },
    '/cirugia-estetica-corporal/abdominoplastia/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 308 } },
    '/cirugia-estetica-corporal/aumento-de-gluteos-barcelona/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/liposuccion-de-muslos/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/liposuccion/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 308 } },
    '/cirugia-correccion-juanetes/': { redirect: { to: '/estetica-corporal/', statusCode: 308 } },
    '/servicio/hilos-tensores/': { redirect: { to: '/estetica-corporal/', statusCode: 308 } },
    '/servicio/tratamiento-de-peeling/': { redirect: { to: '/estetica-corporal/', statusCode: 308 } },
    '/servicio/tratamiento-para-eliminar-varices/': { redirect: { to: '/estetica-corporal/eliminar-varices/', statusCode: 308 } },
    '/braquioplastia-lifting-de-brazos/': { redirect: { to: '/estetica-corporal/lifting-de-brazos-braquioplastia/', statusCode: 308 } },
    '/servicio/tratamiento-de-morpheus-8/': { redirect: { to: '/estetica-corporal/tratamiento-de-morpheus-8/', statusCode: 308 } },
    '/cirugia-capilar/injertos-capilares/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 308 } },
    '/abdominoplastia-en-madrid/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 308 } },
    '/mommy-makeover/': { redirect: { to: '/estetica-corporal/cirugia-mommy-makeover/', statusCode: 308 } },
    '/dermolipectomia-en-madrid/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 308 } },
    '/como-eliminar-las-cartucheras/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 308 } },
    '/corporal/aumento-de-gluteos-barcelona/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 308 } },
    '/aumento-de-gluteos-en-madrid/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/eliminacion-de-cicatrices-en-madrid/': { redirect: { to: '/', statusCode: 308 } },
    '/lifting-de-muslos-en-madrid/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 308 } },
    '/cirugia-estetica-corporal/estrias/': { redirect: { to: '/estetica-corporal/tratamiento-varices-sin-cirugia/', statusCode: 308 } },
    '/cirugia-estetica-corporal/lifting-de-brazos-en-barcelona/': { redirect: { to: '/estetica-corporal/lifting-de-brazos-braquioplastia/', statusCode: 308 } },

    // Redirecciones para tratamientos estéticos faciales
    '/tratamientos-signos-de-la-edad/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 308 } },
    '/la-mirada-cansada-causas-y-como-prevenir/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 308 } },
    '/recuperacion-de-una-rinoplastia/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/rinoplastia-de-nariz-ancha/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/rinomodelacion-sin-cirugia/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 308 } },
    '/rinoplastia-ultrasonica/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/rinomodelacion-con-el-acido-hialuronico/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 308 } },
    '/cirugia-estetica-facial/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/cirugia-estetica-facial/lifting-facial-en-barcelona/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/cirugia-de-papada-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/lobuloplastia-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/aumento-de-pomulos-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/badalona/cirugia-intima.html': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/blefaroplastia-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/landings/index2.html': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 308 } },
    '/servicio/rinomodelacion-con-acido-hialuronico/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 308 } },
    '/servicio/tratamiento-de-hidratacion-de-labios/': { redirect: { to: '/estetica-facial/aumento-de-labios/', statusCode: 308 } },
    '/rinoplastia-sin-cirugia/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/medicina-estetica-facial/arrugas-faciales/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 308 } },
    '/cirugia-estetica-facial/sonrisa-gingival/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/cirugia-estetica-facial/aumento-de-pomulos/': { redirect: { to: '/estetica-facial/aumento-de-pomulos/', statusCode: 308 } },
    '/cirugia-estetica-facial/lobuloplastia/': { redirect: { to: '/estetica-facial/lobuloplastia/', statusCode: 308 } },
    '/cirugia-estetica-facial/liposuccion-de-papada/': { redirect: { to: '/estetica-facial/eliminar-papada/', statusCode: 308 } },
    '/servicio/bioestimulacion-facial-barcelona/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/servicio/tratamiento-de-definicion-ovalo-facial/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/servicio/relleno-de-surcos-nasogenianos/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 308 } },
    '/servicio/tratamiento-de-ojeras/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 308 } },
    '/otoplastia-en-clinica-egos/': { redirect: { to: '/estetica-facial/otoplastia/', statusCode: 308 } },
    '/servicio/relleno-de-labios/': { redirect: { to: '/estetica-facial/aumento-de-labios/', statusCode: 308 } },
    '/servicio/elimincacion-de-arrugas-de-la-expresion/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 308 } },
    '/medicina-estetica-facial/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/cirugia-estetica-facial/mentoplastia-en-barcelona/': { redirect: { to: '/estetica-facial/mentoplastia/', statusCode: 308 } },
    '/medicina-estetica-facial/bioestimulacion-facial/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/parpados-caidos/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 308 } },
    '/servicio/limpieza-facial/': { redirect: { to: '/estetica-facial/', statusCode: 308 } },
    '/medicina-estetica-facial/rejuvenecimiento-facial/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 308 } },
    '/cirugia-estetica-facial/rinoplastia-ultrasonica/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 308 } },
    '/cirugia-estetica-facial/bichectomia-barcelona/': { redirect: { to: '/estetica-facial/bichectomia/', statusCode: 308 } },
    '/cirugia-estetica-facial/cirugia-de-papada/': { redirect: { to: '/estetica-facial/eliminar-papada/', statusCode: 308 } },
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
    Sitemap: 'https://www.clinicaegos.com/sitemap.xml',
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
    prerender: {
      routes: [
        // Listado de páginas
        '/',
        '/nuestras-clinicas/',
        '/nuestro-equipo/',
        '/aviso-legal/',
        '/politica-de-cookies/',
        '/politica-de-privacidad/',

        // // Listado de estetica corporal
        '/estetica-corporal/',
        '/estetica-corporal/abdominoplastia/',
        '/estetica-corporal/aumento-de-gluteos/',
        '/estetica-corporal/lifting-de-brazos-braquioplastia/',
        '/estetica-corporal/lifting-de-muslos/',
        '/estetica-corporal/lipoescultura/',
        '/estetica-corporal/liposuccion/',
        '/estetica-corporal/cirugia-mommy-makeover/',
        '/estetica-corporal/tratamiento-de-morpheus-8/',
        '/estetica-corporal/tratamiento-varices-sin-cirugia/',
        '/estetica-corporal/hip-dips/',

        '/injerto-capilar/injerto-capilar/',

        // // Listado de cirugia de pechos
        '/cirugia-de-pechos/',
        '/cirugia-de-pechos/aumento-de-pecho/',
        '/cirugia-de-pechos/cambio-implantes-mamarios/',
        '/cirugia-de-pechos/correccion-de-la-cicatriz-de-aumento-de-pecho/',
        '/cirugia-de-pechos/eliminar-cicatrices/',
        '/cirugia-de-pechos/ginecomastia/',
        '/cirugia-de-pechos/mamas-tuberosas/',
        '/cirugia-de-pechos/mastopexia/',
        '/cirugia-de-pechos/reconstruccion-mamaria/',
        '/cirugia-de-pechos/reduccion-de-areolas-o-pezon/',
        '/cirugia-de-pechos/reduccion-de-pecho/',

        // // Listado de obesidad
        '/obesidad/',
        '/obesidad/balon-gastrico/',
        '/obesidad/sleeve-gastrico/',
        '/obesidad/endomanga-reduccion-de-estomago-sin-cirugia/',
        '/obesidad/bypass-gastrico/',
        '/obesidad/tratamiento-farmacologico-obesidad/',

        // // Listado de estetica facial
        '/estetica-facial/',
        '/estetica-facial/aumento-de-labios/',
        '/estetica-facial/aumento-de-pomulos/',
        '/estetica-facial/bichectomia/',
        '/estetica-facial/blefaroplastia/',
        '/estetica-facial/eliminar-papada/',
        '/estetica-facial/lifting-facial/',
        '/estetica-facial/lobuloplastia/',
        '/estetica-facial/mentoplastia/',
        '/estetica-facial/otoplastia/',
        '/estetica-facial/rinomodelacion/',
        '/estetica-facial/rinoplastia-ultrasonica/',
        '/estetica-facial/tratamiento-antiarrugas/',

        // // Listado de cirugia íntima
        '/cirugia-intima/',
        '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/',
        '/cirugia-intima/labioplastia-o-ninfoplastia/',
        '/cirugia-intima/vaginoplastia/',

        // // Listado de Blog
        '/blog/',
        '/blog/tratamientos-signos-de-la-edad/',
        '/blog/tipos-de-liposuccion/',
        '/blog/rinomodelacion-con-el-acido-hialuronico/',
        '/blog/tipos-de-operaciones-de-pecho/',
        '/blog/protesis-mamarias-opcion-segura/',
        '/blog/mejorar-cicatriz-de-una-abdominoplastia/',
        '/blog/postoperatorio-de-aumento-de-mamas/',
        '/blog/ejercicio-despues-aumento-pecho/',
        '/blog/mejorar-cicatriz-de-un-aumento-de-pecho/',
        '/blog/todo-lo-que-debes-saber-la-cirugia-capilar/',
        '/blog/cuanto-cuesta-un-injerto-de-pelo/',
        '/blog/precio-aumento-de-pecho/',
        '/blog/rinoplastia-de-nariz-ancha/',
        '/blog/paniculectomia/',
        '/blog/braquioplastia-lifting-de-brazos/',
        '/blog/cuanto-cuesta-una-otoplastia/',
        '/blog/lifting-facial-todo-lo-que-debes-saber/',
        '/blog/la-mirada-cansada-causas-y-como-prevenir/',
        '/blog/cicatriz-de-mastopexia-1-a-6-meses/',
        '/blog/tratamientos-para-tonificar-el-abdomen/',
        '/blog/que-es-una-liposcultura/',
        '/blog/mar-regueras-visita-clinica-egos/',
        '/blog/rinoplastia-sin-cirugia/',
        '/blog/como-conseguir-un-vientre-plano/',
        '/blog/aumento-de-gluteos-opciones/',
        '/blog/es-compatible-el-embarazo-si-llevo-implantes-mamarios/',
        '/blog/que-es-un-peeling-facial/',
        '/blog/pecho-mas-hinchado-despues-de-aumento/',
        '/blog/lipo-vaser-que-es-y-beneficios/',
        '/blog/recuperacion-de-una-liposuccion/',
        '/blog/5-trucos-prevenir-la-aparicion-de-arrugas/',
        '/blog/mommy-makeover/',
      ]
    }
  },
})
