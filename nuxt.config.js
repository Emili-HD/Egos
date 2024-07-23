// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: false },
    
    site: {
        url: 'https://www.clinicaegos.com/',
        trailingSlash: true,
    },

    plugins: [
        '~/plugins/gtm.js',
        '~/plugins/setHtmlLang.js',
        '~/plugins/scrollToTop.client.js',
        '~/plugins/intersect.js',
        '~/plugins/device-classes.js',
    ],

    device: {
        refreshOnResize: true
    },

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
        'nuxt-lazy-hydrate',
        '@nuxtjs/robots',
        'nuxt-booster',
        'nuxt-swiper',
        "@ambitiondev/nuxt-cookiebot",
    ],

    cookiebot: {
        cookieBotId: import.meta.env.COOKIEBOT_ID,
    },

    gsap: {
        extraPlugins: {
            scrollTrigger: true,
            scrollTo: true,
            splitText: true,
        }
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

        // fonts: [{
        //     family: 'Font A',
        //     locals: ['Font A'],
        //     fallback: ['Arial', 'sans-serif'],
        //     variances: [
        //         {
        //         style: 'normal',
        //         weight: 400,
        //         sources: [
        //             { src: '@/assets/fonts/font-a-regular.woff', type:'woff' },
        //             { src: '@/assets/fonts/font-a-regular.woff2', type:'woff2' }
        //         ]
        //         }, {
        //         style: 'italic',
        //         weight: 400,
        //         sources: [
        //             { src: '@/assets/fonts/font-a-regularItalic.woff', type:'woff' },
        //             { src: '@/assets/fonts/font-a-regularItalic.woff2', type:'woff2' }
        //         ]
        //         }, {
        //         style: 'normal',
        //         weight: 700,
        //         sources: [
        //             { src: '@/assets/fonts/font-a-700.woff', type:'woff' },
        //             { src: '@/assets/fonts/font-a-700.woff2', type:'woff2' }
        //         ]
        //         }
        //     ]
        // }],

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
        disableNuxtFontaine: true,
        disableNuxtImage: true,
        optimizePreloads: true,
    },

    image: {
        inject: true,
        provider: 'ipx',
        domains: ['test.clinicaegos.com', 'images.sociablekit.com'],
        ipx: {
            maxAge: 3600
        },
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
            googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
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
            // add a route
            pages.push({
                name: 'tratamiento',
                path: '/:category/:slug',
                file: '~/pages/cirugia/[...slug].vue',
            })
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
        ]
    },

    // Configuración de nuxt-simple-robots
    robots: {
        // Opciones de configuración
        UserAgent: '*',
        Disallow: '/admin',
        Allow: '/',
        Sitemap: 'https://www.clinicaegos.com/sitemap_index.xml',
    },

    sitemap: {
        cacheMaxAgeSeconds: 3600, // 1 hour
        exclude: [
            // '/doctor/**',
            '/clinica/**',
            '/**/&amp;',
            '/**/&',
            '/inicio',
            '/error',
        ],
        sitemaps: {
            pages: {
                sources: [
                    '/api/sitemap/pages',
                ],
                defaults: { changefreq: 'weekly', priority: 1.0 },
            },
            cirugias: {
                sources: [
                    '/api/sitemap/cirugias',
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

                '/equipo-egos/cirugia-estetica/dr-adriano-hug/',
                '/equipo-egos/cirugia-estetica/dr-francisco-mora/',
                '/equipo-egos/cirugia-estetica/dr-holidey-cano/',
                '/equipo-egos/cirugia-estetica/dr-javier-paez/',
                '/equipo-egos/cirugia-estetica/dr-jose-sarria/',
                '/equipo-egos/cirugia-estetica/dr-munoz-del-olmo/',
                '/equipo-egos/cirugia-estetica/dr-santiago-elvira/',
                '/equipo-egos/cirugia-estetica/dr-tiago-gomes/',
                '/equipo-egos/cirugia-estetica/dra-lorena-vives/',
                '/equipo-egos/medicina-estetica/tenille-ferreira/',
                '/equipo-egos/unidad-obesidad/dr-carlos-rodriguez/',
                '/equipo-egos/unidad-obesidad/dr-ricard-sorio/',

                '/promocion/aumento-de-gluteos/',
                '/promocion/blefaroplastia/',
                '/promocion/cirugia-de-pechos/',
                '/promocion/cirugia-facial/',
                '/promocion/cirugia-intima/',
                '/promocion/cirugias-corporales/',
                '/promocion/ginecomastia/',
                '/promocion/perdida-de-peso/',
                '/promocion/rinoplastia/',

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
                '/estetica-facial/queiloplastia/',
                '/estetica-facial/sonrisa-gingival/',
                '/estetica-facial/hidratacion-de-labios/',
                '/estetica-facial/relleno-de-ojeras/',
                '/injerto-capilar/injerto-capilar/',
                '/obesidad/balon-gastrico/',
                '/obesidad/bypass-gastrico/',
                '/obesidad/endomanga-reduccion-de-estomago-sin-cirugia/',
                '/obesidad/sleeve-gastrico/',
                '/obesidad/tratamiento-farmacologico-obesidad/',
                '/obesidad/metodo-endomanga-mega/',
            ]
        },
        render: {
            asyncScripts: true,
            http2: {
                push: true
            }
        }
    },

    app: {
        head: {
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
                    rel: 'preload',
                    as: 'script',
                    href: 'https://consent.cookiebot.com/uc.js?cbid=784911a0-4196-4f66-bcbd-407e3ced0201'
                }
            ],
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

    compatibilityDate: '2024-07-07'
})
