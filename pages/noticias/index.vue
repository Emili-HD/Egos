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
                        <div class="noticias__image overflow-hidden w-full h-3/5">
                            <UiImage :data="noticia" class="cover" loading="lazy" />
                        </div>
                        <div
                            class="noticias__content p-6 text-center h-2/5 flex flex-col justify-between items-center">
                            <time :datetime="noticia.date_gmt" class="text-gray-400 italic">
                                {{ formatDate(noticia.date_gmt) }}
                            </time>
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

const formatDate = (date) => {
    const newDate = new Date(date)
    const day = newDate.getDate().toString().padStart(2, '0')
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0') // Meses comienzan en 0
    const year = newDate.getFullYear()
    return `${day}/${month}/${year}`
}

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


const { generateYoastHead } = useYoastHead(pages);
const yoastHead = generateYoastHead();

useHead({
    ...yoastHead,
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
