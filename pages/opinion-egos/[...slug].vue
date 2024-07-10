<template>

    <main class="site-main caso-real bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0">
        <div class="caso-real__content col-[1/-1] lg:col-span-12 grid grid-cols-subgrid">
            <header class="caso-real__heading pt-32 lg:col-start-2 col-[2_/_span_14] lg:col-span-10 group"
                v-if="casoreal && casoreal.title">
                <h1 class="">{{ casoreal.title.rendered }}</h1>
                <div v-if="casoreal.acf.vimeo_video"
                    class="caso-real__video video__player col-start-2 col-span-10 flex flex-row justify-center items-start">
                    <div class="w-full bg-nude-5 h-[max(400px,_65vh)] rounded-2xl">
                        <VimeoPlayer :videoId="casoreal.acf.vimeo_video" />
                    </div>
                </div>
            </header>
            <section
                class="caso-real__description lg:col-start-2 col-[2_/_span_14] lg:col-span-10 row-start-2 py-8 lg:py-20"
                v-if="casoreal && casoreal.content">
                <div v-html="casoreal.content.rendered"></div>
            </section>
        </div>
        <aside class="form__wrapper bg-blue-1 col-[1_/_span_16] lg:col-span-4 px-12 py-12 lg:pt-40 lg:pb-20 h-full"
            v-if="casoreal && casoreal.acf">
            <FormsCustomForm :identificador="'formulario'" :portalId="String(casoreal.acf.formulario.portalid)"
                :formId="casoreal.acf.formulario.formid" />
        </aside>
    </main>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
import { getTestimonios } from '@/composables/useFetch';
import ScrollTrigger from 'gsap/ScrollTrigger';

const router = useRouter();
const route = useRoute();
const { $gsap: gsap, $lenis: lenis } = useNuxtApp();

// Utiliza `useAsyncData` para cargar la página basada en el slug de la ruta, incluyendo un `uniqueId`
const { data: casoreal, refresh } = await useAsyncData(`casoreal-${route.params.slug}`, () => {
    // Asegúrate de pasar un objeto con la propiedad `slug` a `getTestimonios`
    return getTestimonios({ slug: route.params.slug });
}, { watch: [() => route.params.slug], initialCache: false });


watch(
    () => route.params.slug,
    async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            await refresh();
        }
    },
    { immediate: true }
);

const waitForElement = (selector, timeout = 10000) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(interval);
                reject(new Error(`Element ${selector} not found within timeout`));
            }
        }, 100);
    });
};

const stickyForm = async () => {
    await nextTick(); // Espera a la próxima renderización
    gsap.registerPlugin(ScrollTrigger);

    try {
        const form = await waitForElement('.form-landing');
        // console.log('Form:', form);

        if (form) {
            let mm = gsap.matchMedia();
            mm.add("(min-width: 1025px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".form__wrapper",
                        pin: form,
                        start: "top 0%",
                        end: "top bottom",
                        endTrigger: "footer.footer",
                        pinSpacing: false,
                        toggleActions: "restart none none reverse",
                        // markers: true,
                    }
                });
            });
        }
    } catch (error) {
        console.error(error.message);
    }
};

// Ciclo de vida Mounted
onMounted(async () => {
    await nextTick(); // Espera a la próxima renderización
    await stickyForm();
    await injectStructuredData(); // Asegúrate de que esta función también se ejecute después de la renderización
});

// Datos YOAST SEO
useHead(() => {
    // Verifica si el post está cargado y tiene la estructura esperada
    if (!casoreal.value || !casoreal.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
    const yoast = casoreal.value.yoast_head_json;

    const link = [
        {
            rel: 'canonical',
            href: (() => {
                // Añadir "www." si no está presente y no es una subdominio diferente
                let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                    yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
                // Asegurar que la URL termina con "/"
                canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
                return canonical;
            })()
        }
    ];
    const metaTags = [
        { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
        { property: 'og:title', content: yoast.og_title },
        { property: 'og:description', content: yoast.og_description },
        { property: 'og:url', content: yoast.og_url },
        { property: 'og:type', content: yoast.og_type },
        { property: 'og:locale', content: yoast.og_locale },
        { property: 'og:site_name', content: yoast.og_site_name },
        { property: 'article:publisher', content: yoast.article_publisher },
        // Twitter Card
        { name: 'twitter:card', content: yoast.twitter_card },
        // Tiempo de lectura de Twitter (Personalizado, considerar adecuación a estándares)
        { name: 'twitter:data1', content: yoast.twitter_misc['Tiempo de lectura'] },
        // Robots
        {
            name: 'robots',
            content: `index=${yoast.robots.index}, follow=${yoast.robots.follow}, max-snippet=${yoast.robots['max-snippet']}, max-image-preview=${yoast.robots['max-image-preview']}, max-video-preview=${yoast.robots['max-video-preview']}`
        },
        // Añadir más tags según sean necesarios
    ];

    // Añadir las imágenes de Open Graph si están disponibles
    if (yoast.og_image && yoast.og_image.length > 0) {
        yoast.og_image.forEach((image) => {
            metaTags.push({ property: 'og:image', content: image.url });
            metaTags.push({ property: 'og:image:width', content: image.width.toString() });
            metaTags.push({ property: 'og:image:height', content: image.height.toString() });
        });
    }

    return {
        title: yoast.title || 'Título del Post',
        link: link,
        meta: metaTags,
    };
});

const injectStructuredData = async () => {
    const structuredData = {
        "@context": "http://schema.org",
        "@type": casoreal.value.acf.datos.type,
        "name": casoreal.value.acf.datos.name,
        "address": [
            {
                "@type": casoreal.value.acf.datos.adress.type,
                // "streetAddress": casoreal.value.acf.datos.adress.streetaddress,
                // "postalCode": casoreal.value.acf.datos.adress.postalcode,
                // "addressLocality": casoreal.value.acf.datos.adress.addresslocality,
                // "addressRegion": casoreal.value.acf.datos.adress.addressregion,
                // "name": casoreal.value.acf.datos.adress.addresscountry,
                "name": casoreal.value.acf.datos.adress.addresscountry,
            }
        ],
        "aggregateRating": [
            {
                "@type": casoreal.value.acf.datos.aggregaterating.type,
                "ratingValue": casoreal.value.acf.datos.aggregaterating.ratingvalue,
                "reviewCount": casoreal.value.acf.datos.aggregaterating.reviewcount,
            }
        ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}
</script>

<style lang="scss">
// empty style
</style>
