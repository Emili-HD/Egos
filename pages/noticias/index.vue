<template>
    <main class="site-main noticias" v-if="noticias">
        <section class="noticias section__hero gap-x-1 lg:gap-x-4 lg:gap-y-8">
            <div
                v-if="pages && pages.title"
                class="noticias__header min-h-[30vh] flex flex-col justify-center align-center p-8 lg:px-40 lg:pt-40 text-center">
                <h1 class="mb-0">{{ pages.title.rendered }}</h1>

                <div
                    class="noticias__header flex flex-col justify-center align-center p-8 lg:px-40 text-center">
                    <div v-html="pages.content.rendered"></div>
                </div>
            </div>
            <div class="noticias__list max-w-full p-8 lg:px-20 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4"
                v-if="noticias">
                <article v-for="noticia in noticias" :key="noticia.id"
                    class="card item rounded-3xl overflow-hidden flex flex-col justify-between items-center gap-2 lg:gap-8 bg-nude-6 p-0"
                    >
                    <nuxt-link :to="`/noticias/${noticia.slug}`" class="size-full">
                        <div class="noticias__image overflow-hidden w-full h-3/5"
                            v-if="noticia.featured_image_data && noticia.featured_image_data.url">
                            <img class="object-cover object-top w-full min-h-full" :src="noticia.featured_image_data.url"
                                :srcset="noticia.featured_image_data.srcset"
                                :width="noticia.featured_image_data.width"
                                :height="noticia.featured_image_data.height"
                                :alt="noticia.featured_image_data.alt" />
                        </div>
                        <div
                            class="noticias__content p-6 text-center h-2/5 flex flex-col justify-between items-center">
                            <h3 class="h6 text-clamp-base font-medium">
                                <span class="">{{ noticia.acf.subtitulo }}</span>:<br>
                                {{ noticia.title.rendered }}
                            </h3>
                            <div
                                class="button py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-3xl">
                                Leer Noticia
                            </div>
                        </div>
                    </nuxt-link>
                </article>
            </div>

            <section class="bg-blue-1 p-12 xl:p-24 mb-0" v-if="pages.acf">
                <FormsCustomForm :identificador="'formulario'" :portalId="String(pages.acf.portalid)"
                    :formId="pages.acf.formid" />
            </section>

        </section>
    </main>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getNoticias, getPage, egosSettings } from '@/composables/useApi';
import { Flip } from 'gsap/Flip';


const { $gsap: gsap } = useNuxtApp();
const categoriasSeleccionadas = ref({});

// Cargar noticias
const { data: noticias, error: noticiasError } = await useAsyncData(
    'noticias',
    async () => {
        try {
            const response = await getNoticias({ page: 1, perPage: 100 });
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error('Error fetching noticias:', error);
            return {}; // En caso de error, retornar un objeto vacío
        }
    }
);

console.log('Noticia:', noticias.value[1].slug);

// Cargar página específica (p.ej., la información de la página de noticias)
const pageId = 18848; // ID página de noticias
const { data: pages, error: pagesError } = await useAsyncData(
    `page-${pageId}`,
    async () => {
        try {
            const response = await getPage(pageId);
            return response || {};
        } catch (error) {
            console.error(`Error fetching page ${pageId}:`, error);
            return {}; // En caso de error, retornar un objeto vacío
        }
    },
    { initialCache: false }
);


// Datos YOAST SEO
useHead(() => {
    if (!pages.value || !pages.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    const yoast = pages.value.yoast_head_json;

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
        title: yoast.title,
        link: link,
        meta: metaTags,
    };
});


</script>

<style>
:root {
    --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

h1,
h2,
h3 {
    @apply font-lora;
}

.button {
    @apply font-nunito;
}

.checkboxes {
    .path {
        @apply fill-none stroke-gold-3 stroke-0;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-dasharray var(--transition), stroke-dashoffset var(--transition), stroke var(--transition), stroke-width var(--transition);
        stroke-dasharray: 241 9999999;
        stroke-dashoffset: 0;
    }

    input:checked~svg .path {
        @apply stroke-nude-8;
        stroke-width: 5;
        stroke-dasharray: 70.5096664428711 9999999;
        stroke-dashoffset: -262.2723388671875;
    }

}
</style>
