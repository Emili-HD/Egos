<template>
    <main class="site-main noticia bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0 gap-4" v-if="noticia" >
        <UiBotonCita :data="noticia.acf.boton_cita" />
        <header class="noticia__heading pt-36 lg:pt-48 px-8 mb-10 col-span-full group"
            v-if="noticia.title && noticia.title.rendered">
            <p class="mb-0 leading-tight h1 max-sm:text-clamp-2xl font-lora">{{ noticia.acf.subtitulo }}:</p>
            <h1 class="max-sm:text-clamp-3xl">
                {{ noticia.title.rendered }}
            </h1>
            <div class="breadcrumbs flex gap-4 p-4 divide-x divide-blue-1/50 font-nunito rounded-xl shadow-lg w-full mx-auto mb-8">
                <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1024 165l941 942l-90 90l-83-82v805h-640v-640H896v640H256v-805l-83 82l-90-90zm640 1627V987l-640-640l-640 640v805h384v-640h512v640z"/></svg>
                </NuxtLink>
                <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/noticias/">Noticias</NuxtLink>
                <div class="pl-4 mb-0 leading-none italic opacity-50">{{ noticia.title.rendered }}</div>
            </div>
        </header>
        <!-- aside left -->
        <aside class="px-6 col-span-full lg:col-span-3">
            <h4 class="font-lora nav-content-title h6 bg-nude-4 p-4 rounded-xl">Tabla de contenidos</h4>
            <ul class="pl-6 list-decimal">
                <li class="py-2 cursor-pointer border-b border-x-0 border-t-0 border-solid border-b-blue-1/25"
                    v-for="(content, index) in noticia.acf.areas_de_contenido">
                    <a :href="`#area-${index}`"><span>{{content.titulo_area }}</span></a>
                </li>
            </ul>
        </aside>

        <!-- content -->
        <div class="noticia__content col-span-full lg:col-span-9 grid grid-cols-subgrid">

            <!-- header post -->
            <div class="noticia__heading col-span-full group px-8"
                v-if="noticia.title && noticia.title.rendered">
                <div class="noticias__image overflow-hidden w-full"
                    v-if="noticia.featured_image_data && noticia.featured_image_data.url">
                    <UiImage :data="noticia" class="contain" loading="lazy" />
                </div>
            </div>

            <!-- post content -->
            <section class="noticia__description col-span-full lg:col-span-9 row-start-3 p-8 lg:pb-20"
                v-if="noticia && noticia.content">
                <div v-html="noticia.content.rendered" class="pb-12"></div>
                <div class="post__content-text pb-4" v-for="(content, index) in noticia.acf.areas_de_contenido"
                    :id="`area-${index}`">
                    <h2 class="area-title font-lora max-sm:text-clamp-2xl">{{ content.titulo_area }}</h2>
                    <div class="[&_p]:font-nunito" v-html="content.contenido_area"></div>
                    <div class="post__content-image" v-for="imagen in content.imagen_area">
                        <img v-if="imagen && imagen.url" loading="lazy" :src="imagen.url" :srcset="imagen.srcset"
                            :width="imagen.width" :height="imagen.height"
                            :alt="imagen.alt" />
                    </div>
                </div>
                <div class="button-group flex justify-center gap-4 mt-10">
                    <UiButton v-for="enlace in noticia.acf.links" :to="enlace.link" class="gold" external target="_blank">Ver noticia {{ enlace.texto_link }}</UiButton>
                </div>
            </section>
        </div>

        <!-- aside right -->
        <aside class="form__wrapper bg-blue-2 col-span-full lg:col-span-4 px-12 py-12 lg:pt-40 lg:pb-20 h-full"
            v-if="noticia && noticia.acf">
            <FormsCustomForm :identificador="'formulario'" :portalId="String(noticia.acf.formulario.portalid)"
                :formId="noticia.acf.formulario.formid" />
        </aside>
    </main>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
import { getNoticias } from '@/composables/useApi';


const router = useRouter();
const route = useRoute();
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

// Utiliza `useAsyncData` para cargar la página basada en el slug de la ruta, incluyendo un `uniqueId`
const { data: noticia, refresh } = await useAsyncData(`noticia-${route.params.slug}`, () => {
    // Asegúrate de pasar un objeto con la propiedad `slug` a `getTestimonios`
    return getNoticias({ slug: route.params.slug });
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
    if (!noticia.value || !noticia.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
    const yoast = noticia.value.yoast_head_json;

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
        "@type": noticia.value.acf.datos.type,
        "name": noticia.value.acf.datos.name,
        "address": [
            {
                "@type": noticia.value.acf.datos.adress.type,
                // "streetAddress": noticia.value.acf.datos.adress.streetaddress,
                // "postalCode": noticia.value.acf.datos.adress.postalcode,
                // "addressLocality": noticia.value.acf.datos.adress.addresslocality,
                // "addressRegion": noticia.value.acf.datos.adress.addressregion,
                // "name": noticia.value.acf.datos.adress.addresscountry,
                "name": noticia.value.acf.datos.adress.addresscountry,
            }
        ],
        "aggregateRating": [
            {
                "@type": noticia.value.acf.datos.aggregaterating.type,
                "ratingValue": noticia.value.acf.datos.aggregaterating.ratingvalue,
                "reviewCount": noticia.value.acf.datos.aggregaterating.reviewcount,
            }
        ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}
</script>

<style lang="scss" scoped>
:target:before {
    content: "";
    display: block;
    height: 140px;
    margin: -140px 0 0;
}

.breadcrumbs {
    @apply lg:col-start-2 col-[2_/_span_14] lg:col-span-9 row-start-2 h-fit mt-12 mb-4;
}
</style>
