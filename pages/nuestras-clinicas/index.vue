<template>
    <main class="site-main nuestras-clinicas">
        <section class="clinicas section__hero pb-40" v-if="pages" aria-labelledby="page-title">
            <ElementsEncabezado
                class="flex flex-col justify-end items-start min-h-[60vh] xl:min-h-[100vh] overflow-hidden bg-nude-6 bg-center bg-cover"
                :data="pages" />

            <div class="clinicas__egos">
                <div class="clinicas__egos-list" v-if="pages" aria-label="Listado de clínicas Egos">
                    <article v-for="clinica in pages.acf.clinica" :key="clinica.id"
                        class="card clinicas__egos-card grid grid-cols-16 auto-rows-[60vh] lg:auto-rows-[70vh] gap-1 mt-20"
                        :id="'clinica-' + clinica.id" :aria-labelledby="'clinica-title-' + clinica.id">

                        <!-- Map -->
                        <LazyElementsSingleGoogleMap class="row-start-2 md:row-start-1" :locations="clinica.localizaciones" :zoom="14" />

                        <!-- Info -->
                        <div
                            class="bg-nude-8/80 backdrop-blur-sm rounded-3xl min-h-[50%] p-8 flex flex-col gap-4 justify-center col-[2/-2] lg:col-[7/13] xl:col-[7/11] row-start-1 self-end pointer-events-none z-10">
                            <div class="[&>*]:!text-blue-1 left-0 right-0 bottom-0 [&>p>span]:block  lg:[.card:nth-child(even)>&]:col-[5/11] xl:[.card:nth-child(even)>&]:col-[7/11] [&>*]:mb-3 [&>p]:leading-snug [&>ul]:list-none [&>ul>li]:mb-0 [&>ul>li]:leading-tight"
                                v-html="clinica.texto_clinica"></div>
                            <div v-for="item in clinica.link_relacionadas" class=" pointer-events-auto">
                                <h5 class="text-lg mb-2">Más información:</h5>
                                <UiButton v-if="item && item.texto_boton" class="blue text-xs" :to="cleanUrl(item.url)">
                                    {{ item.texto_boton }}
                                </UiButton>
                            </div>
                        </div>

                        <!-- Image -->
                        <div class="col-[2/-2] lg:col-[9/-2] xl:col-[7/-2] row-start-1 pointer-events-none rounded-3xl overflow-hidden lg:[.card:nth-child(even)>&]:col-[2/9] xl:[.card:nth-child(even)>&]:col-[2/11]"
                            :to="`/nuestras-clinicas/${clinica.slug}`"
                             @click.passive>
                            <img loading="lazy" v-if="clinica.imagen_clinica"
                                class="clinicas__egos-card-image h-full min-w-full object-cover object-center"
                                :src="clinica.imagen_clinica.url" :srcset="clinica.imagen_clinica.srcset"
                                :alt="clinica.imagen_clinica.alt" :aria-labelledby="'post-title-' + clinica.id" />
                        </div>
                    </article>
                </div>
            </div>

        </section>
    </main>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'
import { getPage, getClinicas } from '@/composables/useApi'

// Uso de useAsyncData para cargar la página por su ID
const { data: pages, error: pageError } = await useAsyncData(() => getPage(13618), { initialCache: true })

const baseUrl = 'https://clinicaegos.com';
function cleanUrl(url) {
    return url ? url.replace(baseUrl, '') : '';
}

const { generateYoastHead } = useYoastHead(pages);
const yoastHead = generateYoastHead();

useHead({
    ...yoastHead,
});
</script>

<style lang="scss" scoped>
// empty style
</style>
