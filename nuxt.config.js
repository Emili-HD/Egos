// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4
    },
    
    devtools: { enabled: false },

    site: {
        url: 'https://www.clinicaegos.com/',
        trailingSlash: true,
    },

    plugins: [
        '~/plugins/setHtmlLang.js',
        '~/plugins/scrollToTop.client.js',
        '~/plugins/intersect.js',
        '~/plugins/device-classes.js',
    ],

    css: [
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
        '@nuxtjs/device',
        '@pinia/nuxt',
        '@nuxtjs/robots',
        "@nuxt/scripts",
        // '@nuxtjs/partytown',
        "@ambitiondev/nuxt-cookiebot",
        'nuxt-lazy-hydrate',
        'nuxt-booster',
        'nuxt-swiper',
        'nuxt-mail',
        'nuxt-viewport',
        '@vite-pwa/nuxt',
        ['@nuxtjs/google-fonts', {
            families: {
                Nunito: true,
                Lora: true,
            }
        }]
    ],

    mail: {
        message: {
            to: 'rrhh@clinicaegos.com',
        },
        smtp: {
            host: "mail.clinicaegos.com",
            port: 465,
        },
    },

    googleFonts: {
        // base64: true,
        display: 'swap',
        download: false
    },

    cookiebot: {
        cookieBotId: import.meta.env.COOKIEBOT_ID,
    },

    // partytown: {
    //     // Configuración de Partytown
    //     debug: false,  // Cambia a true si necesitas depuración
    //     lib: '/~partytown/',  // Ruta donde se almacenarán los archivos del Worker
    // },

    gsap: {
        extraPlugins: {
            scrollTrigger: true,
            scrollTo: true,
            splitText: true,
        }
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

    booster: {
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
        optimizeSSR: {
            cleanPreloads: true,
            cleanPrefetches: true,
            inlineStyles: true
        }
    },

    image: {
        inject: true,
        provider: 'ipx',
        domains: ['test.clinicaegos.com', 'images.sociablekit.com'],
        ipx: {
            maxAge: 3600
        },

        providers: {
            // Configuración para manejar imágenes de WordPress
            wp: {
                // Nombre del proveedor personalizado
                name: 'wp',
                // URL base de la API de WordPress, reemplaza con la URL de tu dominio
                provider: 'ipx',
                options: {
                    baseURL: 'https://test.clinicaegos.com/wp-content/uploads/',
                },
            },
        },
        // Define el proveedor por defecto que quieres usar
        domains: ['test.clinicaegos.com'],
        // Configura el proveedor por defecto si es necesario
        provider: 'wp',

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

    ogImage: {
        defaults: {
            cacheMaxAgeSeconds: 60 * 60 * 24 * 7 * 1000 // 7 days
        }
    },

    components: true,

    runtimeConfig: {
        public: {
            googleMaps: {
                apiKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY,
                defer: true
            },
            // googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
            youtubeApiKey: process.env.NUXT_YOUTUBE_API_KEY,
        },
        private: {
            wordpressUrl: process.env.NUXT_API_WP_URL,
            frontendSiteUrl: process.env.NUXT_PUBLIC_DEV_URL || process.env.NUXT_PUBLIC_SITE_URL,
            FAUST_SECRET_KEY: process.env.FAUST_SECRET_KEY,
        },
    },

    experimental: {
        watcher: 'chokidar',
        payloadExtraction: true
    },

    hooks: {
        'pages:extend'(pages) {
            // Asegúrate de que las rutas dinámicas se manejan correctamente
            pages.push({
                name: 'tratamiento',
                path: '/:category/:slug',
                file: '@/pages/cirugia/[...slug].vue',
            });

            pages.push({
                name: 'tratamiento-hijo',
                path: '/:parentCategory/:category/:slug',
                file: '@/pages/cirugia/[...slug].vue',
            });

            pages.push({
                name: 'tratamiento-subhijo',
                path: '/:parentCategory/:category/:categoryChild/:slug',
                file: '@/pages/cirugia/[...slug].vue',
            });

            pages.push({
                name: 'doctor',
                path: '/equipo-egos/:category/:slug',
                file: '@/pages/equipo-egos/[category]/[...slug].vue', // Ruta dinámica que coincide con el doctor
            });
        },
    },

    router: {
        options: {
            mode: 'history',
        },
        middleware: [
            '~/middleware/apiProxy.js',
            '~/middleware/force-slash.global.js',
            '~/middleware/force-cirugias.global.js',
            '~/middleware/cleanQueryParams.js',
            '~/middleware/validate-url.js',
        ]
    },

    routeRules: {
        '/cirugia-de-pechos/mastopexia/https://www.clinicaegos.com/cirugia-de-pechos/mastopexia/': { redirect: { to: '/cirugia-de-pechos/mastopexia/', statusCode: 301 } },
        '/doctor/dr-edgar-carmona/': { redirect: { to: '/equipo-egos/cirugia-estetica/dr-edgar-carmona/', statusCode: 301 } },

        '/estetica-facial/rinoplastia-ultrasonica/': { redirect: { to: '/estetica-facial/rinoplastia/rinoplastia-ultrasonica/', statusCode: 301 } },
        '/blog/page/**': { redirect: { to: '/blog/', statusCode: 301 } },
        '/category/uncategorized/**': { redirect: { to: '/blog/', statusCode: 301 } },
        '/centros/**': { redirect: { to: '/nuestras-clinicas/', statusCode: 301 } },

        // Añadir nuevas reglas aquí
        '/inicio': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-en-girona-clinica-egos/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-en-sant-cugat/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-dermatologica/': { redirect: { to: '/', statusCode: 301 } },
        '/promocion-verano-hombre/': { redirect: { to: '/', statusCode: 301 } },
        '/promocion-1/': { redirect: { to: '/', statusCode: 301 } },
        '/landings/index.html': { redirect: { to: '/', statusCode: 301 } },
        '/servicios-maresme/': { redirect: { to: '/', statusCode: 301 } },
        '/equipo/': { redirect: { to: '/nuestro-equipo', statusCode: 301 } },
        '/servicios/': { redirect: { to: '/', statusCode: 301 } },
        '/testimonios/': { redirect: { to: '/casos-reales/', statusCode: 301 } },
        '/cirugia-capilar/injerto-capilar-en-madrid/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },
        '/todo-lo-que-debes-saber-la-cirugia-capilar/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },
        '/cirugia-capilar/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },
        '/microinjertos-cejas/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },

        // Redirecciones a /cirugia-de-pechos/aumento-de-pecho/
        '/precio-aumento-de-pecho/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/postoperatorio-de-aumento-de-mamas/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/badalona/aumento-pecho.html': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/cirugia-mamaria/aumento-de-pecho-con-grasa/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/cirugia-mamaria/aumento-de-pecho-en-barcelona/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/cirugia-mamaria/aumento-de-pecho-en-madrid/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/pechos/aumento-de-mamas-con-grasa-propia/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/cirugia-de-pechos/aumento-de-mamas-con-grasa-propia/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/pechos/aumento-de-pecho-en-barcelona/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/cirugia-mamaria/aumento-mamas/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },

        // Redirecciones específicas dentro de /cirugia-mamaria/
        '/cirugia-mamaria/ginecomastia/': { redirect: { to: '/cirugia-de-pechos/ginecomastia/', statusCode: 301 } },
        '/cirugia-mamaria/extraccion-de-implantes-mamarios/': { redirect: { to: '/cirugia-de-pechos/cambio-implantes-mamarios/', statusCode: 301 } },
        '/cirugia-mamaria/reduccion-de-pecho/': { redirect: { to: '/cirugia-de-pechos/reduccion-de-pecho/', statusCode: 301 } },
        '/cirugia-mamaria/elevacion-de-mamas/': { redirect: { to: '/cirugia-de-pechos/mastopexia/', statusCode: 301 } },
        '/cirugia-mamaria/reduccion-de-areolas/': { redirect: { to: '/cirugia-de-pechos/reduccion-de-areolas-o-pezon/', statusCode: 301 } },
        '/cirugia-mamaria/cirugia-reconstructiva-diep/': { redirect: { to: '/cirugia-de-pechos/reconstruccion-mamaria/', statusCode: 301 } },
        '/cirugia-mamaria/cirugia-reconstruccion-mamaria/': { redirect: { to: '/cirugia-de-pechos/reconstruccion-mamaria/', statusCode: 301 } },
        '/pechos/extraccion-de-implantes-mamarios/': { redirect: { to: '/cirugia-de-pechos/quitar-implantes-de-pecho/', statusCode: 301 } },

        // Redirecciones específicas para tratamientos y promociones
        '/remedios-para-las-estrias/': { redirect: { to: '/cirugia-de-pechos/eliminar-cicatrices/', statusCode: 301 } },
        '/cirugia-dermatologica/tratamientos-de-las-manchas/': { redirect: { to: '/cirugia-de-pechos/eliminar-cicatrices/', statusCode: 301 } },
        '/mejorar-cicatriz-de-un-aumento-de-pecho/': { redirect: { to: '/cirugia-de-pechos/correccion-de-la-cicatriz-de-aumento-de-pecho/', statusCode: 301 } },

        // Redirecciones para URLs que no siguen un patrón específico de cirugía mamaria
        '/cirugia-estetica-corporal/lifting-de-piernas-y-gluteos-en-madrid/': { redirect: { to: '/promocion/cirugia-de-pechos-madrid', statusCode: 301 } },
        '/cirugia-mamaria/elevacion-de-pechos-madrid/': { redirect: { to: '/promocion/cirugia-de-pechos-madrid/', statusCode: 301 } },

        // Redirecciones generales al inicio
        '/cirugia-estetica-en-girona-clinica-egos/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-en-sant-cugat/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-dermatologica/': { redirect: { to: '/', statusCode: 301 } },
        '/promocion-verano-hombre/': { redirect: { to: '/', statusCode: 301 } },
        '/promocion-1/': { redirect: { to: '/', statusCode: 301 } },
        '/landings/index.html': { redirect: { to: '/', statusCode: 301 } },
        '/servicios-maresme/': { redirect: { to: '/', statusCode: 301 } },
        '/servicios/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugias-mamarias-2022/': { redirect: { to: '/cirugia-de-pechos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/aumento-pectorales/': { redirect: { to: '/cirugia-de-pechos/ginecomastia/', statusCode: 301 } },

        // Redirecciones para cirugía mamaria y promociones específicas
        '/ginecomastia-en-madrid/': { redirect: { to: '/promocion/cirugia-intima-madrid/', statusCode: 301 } },
        '/cirugia-mamaria/reconstruccion-de-pecho-madrid/': { redirect: { to: '/promocion/aumento-de-gluteos-madrid/', statusCode: 301 } },

        // Redirecciones para cirugía íntima
        '/cirugia-intima/vaginoplastia-en-madrid/': { redirect: { to: '/cirugia-intima/', statusCode: 301 } },
        '/cirugia-intima/himenoplastia/': { redirect: { to: '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/', statusCode: 301 } },
        '/cirugia-intima/reduccion-de-labios-mayores/': { redirect: { to: '/cirugia-intima/labioplastia-o-ninfoplastia/', statusCode: 301 } },
        '/cirugia-intima/rejuvenecimiento-vaginal/': { redirect: { to: '/cirugia-intima/vaginoplastia/', statusCode: 301 } },
        '/servicio/tratamiento-de-mesoplastia/': { redirect: { to: '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/', statusCode: 301 } },

        // Redirecciones a la página de inicio
        '/teletrabajo-una-de-las-causas-del-aumento-de-las-cirugias-esteticas-en-2020/': { redirect: { to: '/', statusCode: 301 } },
        '/formulario-de-registro/': { redirect: { to: '/', statusCode: 301 } },
        '/contacto/': { redirect: { to: '/', statusCode: 301 } },
        '/servicios-2/': { redirect: { to: '/', statusCode: 301 } },
        // '/medicina-estetica/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-badalona/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-en-tarragona/': { redirect: { to: '/', statusCode: 301 } },
        '/servicios-sabadell-y-sant-cugat/': { redirect: { to: '/', statusCode: 301 } },
        '/clinica-cirugia-estetica-en-sabadell/': { redirect: { to: '/', statusCode: 301 } },
        '/paniculectomia/': { redirect: { to: '/', statusCode: 301 } },

        // Redirecciones al equipo
        '/equipo/dr-tiago-gomes-cirujano/': { redirect: { to: '/nuestro-equipo/', statusCode: 301 } },
        '/dr-santiago-elvira-cirujano-plastico/': { redirect: { to: '/nuestro-equipo/', statusCode: 301 } },

        // Redirección a nuestras clínicas
        '/donde-estamos/': { redirect: { to: '/nuestras-clinicas/', statusCode: 301 } },

        // Redirecciones específicas para cirugía bariátrica y tratamientos para la obesidad
        '/obesidad/obesidad/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/cirugia-estetica-corporal/cirugia-bariatrica/': { redirect: { to: '/perdida-de-peso/sleeve-gastrico/', statusCode: 301 } },
        '/corporal/cirugia-bariatrica/': { redirect: { to: '/perdida-de-peso/sleeve-gastrico/', statusCode: 301 } },
        '/tratamientos-para-la-obesidad/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/adelgazar-con-tratamiento-obesidad/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/tratamientos-obesidad/': { redirect: { to: '/perdida-de-peso/sleeve-gastrico/', statusCode: 301 } },
        '/tratamientos-obesidad/endomanga-en-madrid/': { redirect: { to: '/promocion/perdida-de-peso-madrid', statusCode: 301 } },
        '/cirugia-bariatrica-en-madrid/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/tratamientos-obesidad/endomanga-en-barcelona/': { redirect: { to: '/perdida-de-peso/endomanga-reduccion-de-estomago-sin-cirugia/', statusCode: 301 } },
        '/perdida-de-peso-despues-del-verano/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/promocion-verano-mujer/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/dudas-balon-gastrico/': { redirect: { to: '/perdida-de-peso/balon-gastrico/', statusCode: 301 } },
        '/alimentacion-despues-de-la-cirugia-bariatrica/': { redirect: { to: '/perdida-de-peso/sleeve-gastrico/', statusCode: 301 } },
        '/balon-gastrico/': { redirect: { to: '/perdida-de-peso/balon-gastrico/', statusCode: 301 } },

        // Redirecciones para entradas específicas del blog y categorías
        '/5-beneficios-de-la-blefaroplastia/': { redirect: { to: '/blog/5-beneficios-de-la-blefaroplastia', statusCode: 301 } },
        '/morpheus-8-medicina-estetica-revolucionaria/': { redirect: { to: '/blog/morpheus-8-medicina-estetica-revolucionaria', statusCode: 301 } },
        '/cuanto-cuesta-un-injerto-de-pelo/': { redirect: { to: '/blog/paciente-ideal-de-la-cirugia-capilar', statusCode: 301 } },
        '/menopausia/': { redirect: { to: '/blog/', statusCode: 301 } },
        '/mejorar-cicatriz-de-una-abdominoplastia/': { redirect: { to: '/blog/mejorar-cicatriz-de-una-abdominoplastia', statusCode: 301 } },
        '/category/noticias/': { redirect: { to: '/blog/', statusCode: 301 } },
        '/compatible-el-embarazo-con-implantes-mamarios/': { redirect: { to: '/blog/protesis-mamarias-opcion-segura', statusCode: 301 } },
        '/ejercicio-despues-aumento-pecho/': { redirect: { to: '/blog/tipos-de-operaciones-de-pecho', statusCode: 301 } },
        '/5-trucos-prevenir-la-aparicion-de-arrugas/': { redirect: { to: '/blog/5-trucos-prevenir-la-aparicion-de-arrugas', statusCode: 301 } },
        '/la-otoplastia-esta-recomendada-para-ninos/': { redirect: { to: '/blog/cuanto-cuesta-una-otoplastia', statusCode: 301 } },
        '/pecho-mas-hinchado-despues-de-aumento/': { redirect: { to: '/blog/pecho-mas-hinchado-despues-de-aumento/', statusCode: 301 } },
        '/paciente-ideal-de-la-cirugia-capilar/': { redirect: { to: '/blog/paciente-ideal-de-la-cirugia-capilar', statusCode: 301 } },
        '/cuanto-cuesta-una-otoplastia/': { redirect: { to: '/blog/cuanto-cuesta-una-otoplastia/', statusCode: 301 } },
        '/tratamientos-para-el-sobrepeso/': { redirect: { to: '/blog/tratamientos-para-el-sobrepeso/', statusCode: 301 } },
        '/allurion-que-es/': { redirect: { to: '/blog/allurion-que-es/', statusCode: 301 } },
        '/que-es-un-peeling-facial/': { redirect: { to: '/blog/que-es-un-peeling-facial/', statusCode: 301 } },
        '/lifting-facial-todo-lo-que-debes-saber/': { redirect: { to: '/blog/lifting-facial-todo-lo-que-debes-saber/', statusCode: 301 } },
        '/como-conseguir-un-vientre-plano/': { redirect: { to: '/blog/como-conseguir-un-vientre-plano/', statusCode: 301 } },
        '/mar-regueras-visita-clinica-egos/': { redirect: { to: '/blog/mar-regueras-visita-clinica-egos/', statusCode: 301 } },
        // '/tipos-de-liposuccion/': { redirect: { to: '/blog/tipos-de-liposuccion/', statusCode: 301 } },
        '/tipos-de-operaciones-de-pecho/': { redirect: { to: '/blog/tipos-de-operaciones-de-pecho/', statusCode: 301 } },
        '/clinica-egos-aumenta-presencia-grupo-quiron/': { redirect: { to: '/blog/clinica-egos-aumenta-presencia-grupo-quiron/', statusCode: 301 } },

        // Redirecciones para tratamientos y cirugías estéticas corporales
        '/tratamientos-para-tonificar-el-abdomen/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 301 } },
        '/recuperacion-de-una-liposuccion/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 301 } },
        '/lipo-vaser-que-es-y-beneficios/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 301 } },
        '/aumento-de-gluteos-opciones/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 301 } },
        '/que-es-el-mommy-makeover/': { redirect: { to: '/estetica-corporal/cirugia-mommy-makeover/', statusCode: 301 } },
        '/cirugia-estetica-corporal/': { redirect: { to: '/estetica-corporal/', statusCode: 301 } },
        '/cirugia-estetica-corporal/aumento-de-pectorales-en-madrid/': { redirect: { to: '/', statusCode: 301 } },
        '/cirugia-estetica-corporal/lifting-de-brazos-en-madrid/': { redirect: { to: '/promocion/cirugias-corporales-madrid/', statusCode: 301 } },
        '/cirugia-estetica-corporal/lifting-de-piernas/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/lipoescultura/': { redirect: { to: '/estetica-corporal/lipoescultura/', statusCode: 301 } },
        '/servicio/tratamiento-de-mesoterapia/': { redirect: { to: '/estetica-corporal/tratamiento-varices-sin-cirugia/', statusCode: 301 } },
        '/cirugia-estetica-corporal/abdominoplastia/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 301 } },
        '/cirugia-estetica-corporal/aumento-de-gluteos-barcelona/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/liposuccion-de-muslos/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/liposuccion/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 301 } },
        '/cirugia-correccion-juanetes/': { redirect: { to: '/estetica-corporal/', statusCode: 301 } },
        '/servicio/hilos-tensores/': { redirect: { to: '/estetica-corporal/', statusCode: 301 } },
        '/servicio/tratamiento-de-peeling/': { redirect: { to: '/estetica-corporal/', statusCode: 301 } },
        '/servicio/tratamiento-para-eliminar-varices/': { redirect: { to: '/estetica-corporal/eliminar-varices/', statusCode: 301 } },
        '/braquioplastia-lifting-de-brazos/': { redirect: { to: '/estetica-corporal/lifting-de-brazos-braquioplastia/', statusCode: 301 } },
        '/servicio/tratamiento-de-morpheus-8/': { redirect: { to: '/estetica-corporal/tratamiento-de-morpheus-8/', statusCode: 301 } },
        '/cirugia-capilar/injertos-capilares/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },
        '/abdominoplastia-en-madrid/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 301 } },
        '/mommy-makeover/': { redirect: { to: '/estetica-corporal/cirugia-mommy-makeover/', statusCode: 301 } },
        '/dermolipectomia-en-madrid/': { redirect: { to: '/estetica-corporal/liposuccion/', statusCode: 301 } },
        '/como-eliminar-las-cartucheras/': { redirect: { to: '/estetica-corporal/lifting-de-muslos/', statusCode: 301 } },
        '/corporal/aumento-de-gluteos-barcelona/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 301 } },
        '/aumento-de-gluteos-en-madrid/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/eliminacion-de-cicatrices-en-madrid/': { redirect: { to: '/', statusCode: 301 } },
        '/lifting-de-muslos-en-madrid/': { redirect: { to: '/estetica-corporal/aumento-de-gluteos/', statusCode: 301 } },
        '/cirugia-estetica-corporal/estrias/': { redirect: { to: '/estetica-corporal/tratamiento-varices-sin-cirugia/', statusCode: 301 } },
        '/cirugia-estetica-corporal/lifting-de-brazos-en-barcelona/': { redirect: { to: '/estetica-corporal/lifting-de-brazos-braquioplastia/', statusCode: 301 } },

        // Redirecciones para tratamientos estéticos faciales
        // '/tratamientos-signos-de-la-edad/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/la-mirada-cansada-causas-y-como-prevenir/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 301 } },
        '/rinomodelacion-sin-cirugia/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 301 } },
        '/rinomodelacion-con-el-acido-hialuronico/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 301 } },
        '/cirugia-estetica-facial/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/cirugia-estetica-facial/lifting-facial-en-barcelona/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/cirugia-de-papada-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/lobuloplastia-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/aumento-de-pomulos-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/badalona/cirugia-intima.html': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/blefaroplastia-en-madrid/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/landings/index2.html': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 301 } },
        '/servicio/rinomodelacion-con-acido-hialuronico/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 301 } },
        '/servicio/tratamiento-de-hidratacion-de-labios/': { redirect: { to: '/estetica-facial/aumento-de-labios/', statusCode: 301 } },
        '/medicina-estetica-facial/arrugas-faciales/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/cirugia-estetica-facial/sonrisa-gingival/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/cirugia-estetica-facial/aumento-de-pomulos/': { redirect: { to: '/estetica-facial/aumento-de-pomulos/', statusCode: 301 } },
        '/cirugia-estetica-facial/lobuloplastia/': { redirect: { to: '/estetica-facial/lobuloplastia/', statusCode: 301 } },
        '/cirugia-estetica-facial/liposuccion-de-papada/': { redirect: { to: '/estetica-facial/eliminar-papada/', statusCode: 301 } },
        '/servicio/bioestimulacion-facial-barcelona/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/servicio/tratamiento-de-definicion-ovalo-facial/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/servicio/relleno-de-surcos-nasogenianos/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/servicio/tratamiento-de-ojeras/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 301 } },
        '/otoplastia-en-clinica-egos/': { redirect: { to: '/estetica-facial/otoplastia/', statusCode: 301 } },
        '/servicio/relleno-de-labios/': { redirect: { to: '/estetica-facial/aumento-de-labios/', statusCode: 301 } },
        '/servicio/elimincacion-de-arrugas-de-la-expresion/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/estetica-facial/eliminar-arrugas-de-expresio/': { redirect: { to: '/estetica-facial/eliminar-arrugas-de-expresion/', statusCode: 301 } },
        '/medicina-estetica-facial/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/cirugia-estetica-facial/mentoplastia-en-barcelona/': { redirect: { to: '/estetica-facial/mentoplastia/', statusCode: 301 } },
        '/medicina-estetica-facial/bioestimulacion-facial/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/parpados-caidos/': { redirect: { to: '/estetica-facial/blefaroplastia/', statusCode: 301 } },
        '/servicio/limpieza-facial/': { redirect: { to: '/estetica-facial/', statusCode: 301 } },
        '/medicina-estetica-facial/rejuvenecimiento-facial/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/cirugia-estetica-facial/bichectomia-barcelona/': { redirect: { to: '/estetica-facial/bichectomia/', statusCode: 301 } },
        '/cirugia-estetica-facial/cirugia-de-papada/': { redirect: { to: '/estetica-facial/eliminar-papada/', statusCode: 301 } },
        '/recuperacion-de-una-rinoplastia/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 301 } },
        '/rinoplastia-de-nariz-ancha/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 301 } },
        '/rinoplastia-sin-cirugia/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 301 } },
        '/cirugia-estetica-facial/rinoplastia-ultrasonica/': { redirect: { to: '/estetica-facial/rinoplastia-ultrasonica/', statusCode: 301 } },

        '/obesidad/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/obesidad/balon-gastrico/': { redirect: { to: '/perdida-de-peso/balon-gastrico/', statusCode: 301 } },
        '/obesidad/metodo-endomanga-mega/': { redirect: { to: '/perdida-de-peso/metodo-endomanga-mega/', statusCode: 301 } },
        '/obesidad/endomanga-reduccion-de-estomago-sin-cirugia/': { redirect: { to: '/perdida-de-peso/endomanga-reduccion-de-estomago-sin-cirugia/', statusCode: 301 } },
        '/obesidad/sleeve-gastrico/': { redirect: { to: '/perdida-de-peso/sleeve-gastrico/', statusCode: 301 } },
        '/obesidad/bypass-gastrico/': { redirect: { to: '/perdida-de-peso/bypass-gastrico/', statusCode: 301 } },
        '/obesidad/tratamiento-farmacologico-obesidad/': { redirect: { to: '/perdida-de-peso/tratamiento-farmacologico-obesidad/', statusCode: 301 } },

        // Blog
        '/blog/cuanto-cuesta-una-rinoplastia/': { redirect: { to: '/estetica-facial/rinoplastia/', statusCode: 301 } },
        '/blog/clinica-egos-manresa-cirugia-plastica-medicina-estetica/': { redirect: { to: '/nuestras-clinicas/egos-manresa-cirugia-plastica/', statusCode: 301 } },
        '/blog/presoterpia-secreto-piernas-mas-bonitas/': { redirect: { to: '/estetica-corporal/presoterapia/', statusCode: 301 } },
        '/blog/todo-lo-que-tienes-que-saber-rinoplastia/': { redirect: { to: '/estetica-facial/rinoplastia/', statusCode: 301 } },
        '/blog/calcular-aumento-de-pecho/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/blog/aumento-de-pecho-sin-cicatrices/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/blog/guia-labios-bonitos/': { redirect: { to: '/estetica-facial/aumento-de-labios/', statusCode: 301 } },
        '/blog/tendencias-medicina-estetica/': { redirect: { to: '/medicina-estetica/', statusCode: 301 } },
        '/blog/egos-abre-en-mataro/': { redirect: { to: '/nuestras-clinicas/egos-mataro-cirugia-plastica/', statusCode: 301 } },
        '/blog/precio-del-aumento-de-labios-permanente/': { redirect: { to: '/estetica-facial/queiloplastia/', statusCode: 301 } },
        '/blog/rejuvenecimiento-facial-con-medicina-estetica/': { redirect: { to: '/estetica-facial/tratamiento-antiarrugas/', statusCode: 301 } },
        '/blog/protesis-mamarias-opcion-segura/': { redirect: { to: '/cirugia-de-pechos/aumento-de-pecho/', statusCode: 301 } },
        '/blog/braquioplastia-lifting-de-brazos/': { redirect: { to: '/estetica-corporal/lifting-de-brazos-braquioplastia/', statusCode: 301 } },
        '/blog/rinoplastia-ultrasonica/': { redirect: { to: '/estetica-facial/rinoplastia/rinoplastia-ultrasonica/', statusCode: 301 } },
        '/blog/paciente-ideal-de-la-cirugia-capilar/': { redirect: { to: '/injerto-capilar/injerto-capilar/', statusCode: 301 } },
        '/blog/como-conseguir-un-vientre-plano/': { redirect: { to: '/estetica-corporal/abdominoplastia/', statusCode: 301 } },
        '/blog/lifting-facial-todo-lo-que-debes-saber/': { redirect: { to: '/estetica-facial/lifting-facial/', statusCode: 301 } },
        '/blog/cuanto-cuesta-una-otoplastia/': { redirect: { to: '/estetica-facial/otoplastia/', statusCode: 301 } },
        '/blog/rinomodelacion-sin-cirugia/': { redirect: { to: '/estetica-facial/rinomodelacion/', statusCode: 301 } },

        '/blog/causas-pechos-tuberosos/': { redirect: { to: '/cirugia-de-pechos/mamas-tuberosas/', statusCode: 301 } },
        '/blog/perder-peso-rapido-guia-definitiva/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },
        '/blog/perdida-de-peso-despues-del-verano/': { redirect: { to: '/perdida-de-peso/', statusCode: 301 } },

        // Clínicas
        '/nuestras-clinicas/egos-reus/': { redirect: { to: 	'/nuestras-clinicas/egos-reus-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-girona/': { redirect: { to: 	'/nuestras-clinicas/nuestras-clinicas-egos-girona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/barcelona-balmes/': { redirect: { to: 	'/nuestras-clinicas/egos-barcelona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/barcelona-aribau/': { redirect: { to: 	'/nuestras-clinicas/egos-barcelona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/barcelona-gracia/': { redirect: { to: 	'/nuestras-clinicas/egos-barcelona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-madrid/': { redirect: { to: 	'/nuestras-clinicas/egos-madrid-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/badalona-2/': { redirect: { to: 	'/nuestras-clinicas/egos-badalona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-hospitalet/': { redirect: { to: 	'/nuestras-clinicas/egos-hospitalet-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-mataro/': { redirect: { to: 	'/nuestras-clinicas/egos-mataro-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/granollers/': { redirect: { to: 	'/nuestras-clinicas/egos-mataro-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-granollers-cirugia-plastica/': { redirect: { to: 	'/nuestras-clinicas/egos-mataro-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/sabadell/': { redirect: { to: 	'/nuestras-clinicas/egos-sabadell-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-girona/': { redirect: { to: 	'/nuestras-clinicas/nuestras-clinicas-egos-girona-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/egos-terrassa/': { redirect: { to: 	'https://www.clinicaegos.com/', statusCode: 301 } },
        '/nuestras-clinicas/egos-manresa/': { redirect: { to: 	'/nuestras-clinicas/egos-manresa-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/tarragona/': { redirect: { to: 	'https://www.clinicaegos.com/', statusCode: 301 } },
        '/nuestras-clinicas/lleida/': { redirect: { to: 	'/nuestras-clinicas/egos-lleida-cirugia-plastica/', statusCode: 301 } },
        '/nuestras-clinicas/andorra/': { redirect: { to: 	'/nuestras-clinicas/egos-andorra-cirugia-plastica/', statusCode: 301 } },

        '/estetica-facial/marcacion-mandibular-medicina-estetica/': { redirect: { to: 	'/medicina-estetica/marcacion-mandibular-medicina-estetica/', statusCode: 301 } },
        '/estetica-facial/relleno-de-ojeras/': { redirect: { to: 	'/medicina-estetica/relleno-de-ojeras/', statusCode: 301 } },
        '/estetica-corporal/presoterapia/': { redirect: { to: 	'/medicina-estetica/presoterapia/', statusCode: 301 } },
        '/estetica-corporal/mesoterapia/': { redirect: { to: 	'/medicina-estetica/mesoterapia/', statusCode: 301 } },
        '/estetica-corporal/carboxiterapia/': { redirect: { to: 	'/medicina-estetica/carboxiterapia/', statusCode: 301 } },
        '/estetica-corporal/tratamiento-de-morpheus-8/': { redirect: { to: 	'/medicina-estetica/tratamiento-de-morpheus-8/', statusCode: 301 } },
        '/estetica-corporal/tratamiento-varices-sin-cirugia/': { redirect: { to: 	'/medicina-estetica/tratamiento-varices-sin-cirugia/', statusCode: 301 } },
        '/estetica-facial/hilos-tensores/': { redirect: { to: 	'/medicina-estetica/hilos-tensores/', statusCode: 301 } },
        '/estetica-facial/eliminar-arrugas-de-expresion/': { redirect: { to: 	'/medicina-estetica/eliminar-arrugas-de-expresion/', statusCode: 301 } },
        '/estetica-facial/hidratacion-de-labios/': { redirect: { to: 	'/medicina-estetica/hidratacion-de-labios/', statusCode: 301 } },
        '/estetica-facial/hidratacion-de-labios/': { redirect: { to: 	'/medicina-estetica/hidratacion-de-labios/', statusCode: 301 } },
        '/estetica-facial/sonrisa-gingival/': { redirect: { to: 	'/medicina-estetica/sonrisa-gingival/', statusCode: 301 } },
        '/estetica-facial/tratamiento-antiarrugas/': { redirect: { to: 	'/medicina-estetica/tratamiento-antiarrugas/', statusCode: 301 } },
        '/estetica-facial/rinomodelacion/': { redirect: { to: 	'/medicina-estetica/rinomodelacion/', statusCode: 301 } },
        '/estetica-facial/aumento-de-labios/': { redirect: { to: 	'/medicina-estetica/aumento-de-labios/', statusCode: 301 } },
        '/cirugia-de-pechos/eliminar-cicatrices/': { redirect: { to: 	'/medicina-estetica/eliminar-cicatrices/', statusCode: 301 } },
    },

    // Configuración de nuxt-simple-robots
    // robots: {
    //     // Opciones de configuración
    //     UserAgent: '*',
    //     Disallow: '/admin',
    //     Allow: '/',
    //     Sitemap: 'https://www.clinicaegos.com/sitemap_index.xml',
    // },

    sitemap: {
        cacheMaxAgeSeconds: 3600, // 1 hour
        excludeAppSources: ['nuxt:pages'],
        sitemaps: {
            pages: {
                sources: [
                    '/api/sitemap/pages',
                ],
                urls() {
                    return ['/']
                },
                exclude: [
                    '/**/&amp;',
                    '/**/&',
                    '/inicio',
                    '/error',
                    '/aviso-legal/',
                    '/politica-de-cookies/',
                    '/politica-de-privacidad/'
                ],
                defaults: { changefreq: 'weekly', priority: 1.0 },
            },
            cirugias: {
                sources: [
                    '/api/sitemap/cirugias',
                ],

                exclude: [

                ],
                defaults: { changefreq: 'weekly', priority: 0.9 },
            },
            testimonios: {
                sources: [
                    '/api/sitemap/testimonios',
                ],
                defaults: { changefreq: 'weekly', priority: 0.9 },
            },
            landings: {
                sources: [
                    '/api/sitemap/landings',
                ],
                defaults: { changefreq: 'weekly', priority: 0.8 },
            },
            posts: {
                sources: [
                    '/api/sitemap/posts',
                ],
                defaults: { changefreq: 'weekly', priority: 0.7 },
            },
            equipo: {
                sources: [
                    '/api/sitemap/equipo',
                ],
                defaults: { changefreq: 'weekly', priority: 0.7 },
            },
            clinicas: {
                sources: [
                    '/api/sitemap/clinicas',
                ],
                exclude: [
                    '/clinica/andorra/',
                    '/clinica/badalona-2/',
                    '/clinica/barcelona-aribau/',
                    '/clinica/barcelona-balmes/',
                    '/clinica/barcelona-gracia/',
                    '/clinica/egos-madrid/',
                    '/clinica/granollers/',
                    '/clinica/lleida/',
                    '/clinica/egos-girona/',
                    '/clinica/sabadell/',
                ],
                defaults: { changefreq: 'weekly', priority: 0.7 },
            },
        },
    },

    nitro: {
        preset: 'node-server',
        prerender: {
            routes: [
                '/sitemap_index.xml',
                '/pages-sitemap.xml',
                '/cirugias-sitemap.xml',
                '/posts-sitemap.xml',
                '/testimonios-sitemap.xml',
                '/landings-sitemap.xml',
                '/',
                '/aviso-legal/',
                '/cirugia-de-pechos/',
                '/cirugia-intima/',
                '/estetica-corporal/',
                '/estetica-facial/',
                '/medicina-estetica/',
                '/obesidad/',
                '/politica-de-cookies/',
                '/politica-de-privacidad/',
                '/trabaja-con-nosotros/',
                '/colaboraciones/',

                '/equipo-egos/cirugia-estetica/dr-adriano-hug/',
                '/equipo-egos/cirugia-estetica/dr-francisco-mora/',
                '/equipo-egos/cirugia-estetica/dr-holidey-cano/',
                '/equipo-egos/cirugia-estetica/dr-javier-paez/',
                '/equipo-egos/cirugia-estetica/dr-jose-sarria/',
                // '/equipo-egos/cirugia-estetica/dr-munoz-del-olmo/',
                '/equipo-egos/cirugia-estetica/dr-santiago-elvira/',
                '/equipo-egos/cirugia-estetica/dr-tiago-gomes/',
                '/equipo-egos/cirugia-estetica/dra-lorena-vives/',
                // '/equipo-egos/medicina-estetica/tenille-ferreira/',
                // '/equipo-egos/unidad-obesidad/dr-carlos-rodriguez/',
                '/equipo-egos/unidad-obesidad/dr-ricard-sorio/',

                // '/promocion/aumento-de-gluteos/',
                // '/promocion/blefaroplastia/',
                // '/promocion/cirugia-de-pechos/',
                // '/promocion/cirugia-facial/',
                // '/promocion/cirugia-intima/',
                // '/promocion/cirugias-corporales/',
                // '/promocion/ginecomastia/',
                // '/promocion/perdida-de-peso/',
                // '/promocion/rinoplastia/',

                '/cirugia-de-pechos/aumento-de-pecho/',
                '/cirugia-de-pechos/cambio-implantes-mamarios/',
                '/cirugia-de-pechos/correccion-de-la-cicatriz-de-aumento-de-pecho/',
                '/cirugia-de-pechos/eliminar-cicatrices/',
                '/cirugia-de-pechos/ginecomastia/',
                '/cirugia-de-pechos/mamas-tuberosas/',
                '/cirugia-de-pechos/mastopexia/',
                '/cirugia-de-pechos/quitar-implantes-de-pecho/',
                '/cirugia-de-pechos/reconstruccion-mamaria/',
                '/cirugia-intima/vaginoplastia/',
                '/cirugia-de-pechos/reduccion-de-areolas-o-pezon/',
                '/cirugia-de-pechos/reduccion-de-pecho/',
                '/cirugia-intima/himenoplastia-cirugia-de-reconstruccion-el-himen/',
                '/cirugia-intima/labioplastia-o-ninfoplastia/',
                '/estetica-corporal/abdominoplastia/',
                '/estetica-corporal/aumento-de-gluteos/',
                '/estetica-corporal/cirugia-mommy-makeover/',
                '/estetica-corporal/hip-dips/',
                '/estetica-corporal/lifting-de-brazos-braquioplastia/',
                '/estetica-corporal/lifting-de-muslos/',
                '/estetica-corporal/lipoescultura/',
                '/estetica-corporal/liposuccion/',
                '/estetica-corporal/tratamiento-de-morpheus-8/',
                '/estetica-corporal/tratamiento-varices-sin-cirugia/',
                '/estetica-corporal/carboxiterapia/',
                '/estetica-corporal/mesoterapia/',
                '/estetica-corporal/presoterapia/',
                '/estetica-corporal/cintura-de-avispa/',
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
                '/estetica-facial/rinoplastia/rinoplastia-ultrasonica/',
                '/estetica-facial/rinoplastia/rinoplastia-secundaria/',
                '/estetica-facial/rinoplastia/',
                '/estetica-facial/tratamiento-antiarrugas/',
                '/estetica-facial/queiloplastia/',
                '/estetica-facial/sonrisa-gingival/',
                '/estetica-facial/hidratacion-de-labios/',
                '/estetica-facial/relleno-de-ojeras/',
                '/estetica-facial/hilos-tensores/',
                '/estetica-facial/marcacion-mandibular-medicina-estetica/',
                '/estetica-facial/micropigmentacion-de-cejas-sombreadas/',
                '/estetica-facial/micropigmentacion-para-estrias-y-cicatrices/',
                '/estetica-facial/micropigmentacion-eyeliner/',
                '/estetica-facial/micropigmentacion-de-ojeras/',
                '/estetica-facial/micropigmentaciion-de-labios/',
                '/estetica-facial/microblading-tecnica-pelo-a-pelo/',
                '/estetica-facial/nanoblading/',
                '/injerto-capilar/injerto-capilar/',
                '/perdida-de-peso/',
                '/perdida-de-peso/balon-gastrico/',
                '/perdida-de-peso/bypass-gastrico/',
                '/perdida-de-peso/endomanga-reduccion-de-estomago-sin-cirugia/',
                '/perdida-de-peso/sleeve-gastrico/',
                '/perdida-de-peso/tratamiento-farmacologico-obesidad/',
                '/perdida-de-peso/metodo-endomanga-mega/',
            ]
        },
        render: {
            asyncScripts: true,
            http2: {
                push: true
            }
        }
    },

    // proxy: {
    //     // Define la ruta del proxy
    //     '/cookiebot-proxy/': {
    //         target: 'https://consent.cookiebot.com',
    //         pathRewrite: { '^/cookiebot-proxy/': '' },
    //         changeOrigin: true,
    //         secure: false,
    //     },
    // },

    app: {
        head: {
            // script: [
            //     {
            //         id: 'Cookiebot',
            //         src: '/cookiebot-proxy/uc.js', // Utiliza el proxy en vez del URL directo
            //         'data-cbid': '784911a0-4196-4f66-bcbd-407e3ced0201',
            //         'data-blockingmode': 'auto',
            //         type: 'text/partytown',
            //     },
            // ],
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://test.clinicaegos.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://consent.cookiebot.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://www.googletagmanager.com',
                },
            ],
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                }
            }
        }
    },

    render: {
        csp: {
            hashAlgorithm: 'sha256',
            policies: {
                'script-src': ["'self'", "'unsafe-inline'"],
                'img-src': ["'self'", "https://www.facebook.com"]
            }
        }
    },

    pwa: {
        registerType: 'autoUpdate', // Actualiza el Service Worker automáticamente
        manifest: {
            name: 'Egos App',
            short_name: 'Egos',
            description: 'Clínica de cirugía plástica y estética',
            theme_color: '#ffffff', // Color del tema
            background_color: '#ffffff', // Color de fondo
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        client: {
            installPrompt: true, // Habilita la captura del evento beforeinstallprompt
        },
        workbox: {
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MiB
            runtimeCaching: [
                {
                    urlPattern: ({ url }) => url.origin === self.location.origin,
                    handler: 'CacheFirst', // Prioriza la caché para recursos estáticos
                    options: {
                        cacheName: 'static-assets',
                        expiration: {
                            maxEntries: 50, // Máximo de archivos en la caché
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
                        },
                    },
                },
                {
                    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
                    handler: 'StaleWhileRevalidate', // Carga desde la caché pero actualiza en segundo plano
                    options: {
                        cacheName: 'google-fonts',
                        expiration: {
                            maxEntries: 20,
                            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
                        },
                    },
                },
                {
                    urlPattern: /^https:\/\/test\.clinicaegos\.com\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        networkTimeoutSeconds: 10, // Tiempo antes de usar la caché
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
                        },
                    },
                },
            ],
        },
    },

    compatibilityDate: '2024-07-07'
})
