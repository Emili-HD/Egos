<template>
  <main class="site-main nuestras-clinicas">
    <section
      class="clinicas section__hero pb-40"
      v-if="pages"
      aria-labelledby="page-title"
    >
      <ElementsEncabezado
        class="flex flex-col justify-end items-start min-h-[60vh] xl:min-h-[100vh] overflow-hidden bg-nude-6 bg-center bg-cover"
        :data="pages"
      />

      <div class="clinicas__egos">
        <div
          class="clinicas__egos-list"
          v-if="featuredClinicasData"
          aria-label="Listado de clínicas Egos"
        >
          <article
            v-for="clinica in featuredClinicasData"
            :key="clinica.id"
            class="card clinicas__egos-card grid grid-cols-16 auto-rows-[60vh] lg:auto-rows-[70vh] gap-1 mt-20"
            :id="'clinica-' + clinica.id"
            :aria-labelledby="'clinica-title-' + clinica.id"
          >
            <LazyElementsSingleGoogleMap
              class="row-start-2 md:row-start-1"
              :lat="clinica.acf.lat"
              :lng="clinica.acf.lng"
              :zoom="17"
            />
            <div
              class="[&>*]:!text-blue-1 bg-nude-8/80 backdrop-blur-sm rounded-3xl 
                    flex flex-col justify-center 
                    left-0 right-0 bottom-0 min-h-[50%] p-8 
                    pointer-events-none z-10 
                    col-[2/-2] lg:col-[7/13] xl:col-[7/11] row-start-1 self-end
                    lg:[.card:nth-child(even)>&]:col-[5/11] xl:[.card:nth-child(even)>&]:col-[7/11] [&>*]:mb-3
                    [&>p]:leading-snug
                    [&>ul]:list-none [&>ul>li]:mb-0 [&>ul>li]:leading-tight"
              v-html="clinica.content.rendered"
            ></div>
            <div
              class="col-[2/-2] lg:col-[9/-2] xl:col-[7/-2] row-start-1 pointer-events-none rounded-3xl overflow-hidden lg:[.card:nth-child(even)>&]:col-[2/9] xl:[.card:nth-child(even)>&]:col-[2/11]"
              :to="`/nuestras-clinicas/${clinica.slug}`"
              :aria-label="'Leer más sobre ' + clinica.title.rendered"
              @click.passive
            >
              <img
                loading="lazy"
                v-if="clinica.featured_image_data"
                class="clinicas__egos-card-image h-full min-w-full object-cover object-center"
                :src="clinica.featured_image_data.url"
                :srcset="clinica.featured_image_data.srcset"
                :alt="clinica.featured_image_data.alt"
                :aria-labelledby="'post-title-' + clinica.id"
              />
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
const { data: pages, error: pageError } = await useAsyncData(() => getPage(13618), {initialCache: false})

// Uso de useAsyncData para cargar y procesar los posts destacados
const { data: featuredClinicasData, error } = await useAsyncData('featuredClinicas', async () => {
    const response = await getClinicas();
    const featuredClinicas = response.filter(
        clinica => clinica.acf && clinica.acf.destacar_post && clinica.acf.destacar_post.includes('Destacado')
    );
    // console.log('featured Clinica:', featuredClinicas);
    return featuredClinicas;
});

const { generateYoastHead } = useYoastHead(pages);
const yoastHead = generateYoastHead();

useHead({
    ...yoastHead,
});
</script>

<style lang="scss" scoped>
// empty style
</style>
