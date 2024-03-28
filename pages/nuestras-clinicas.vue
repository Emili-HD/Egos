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
          v-if="clinicasData"
          aria-label="Listado de clínicas Egos"
        >
          <article
            v-for="clinica in clinicasData"
            :key="clinica.id"
            class="card clinicas__egos-card 
                  grid grid-cols-16 auto-rows-[60vh] gap-1 mt-20"
            :id="'clinica-' + clinica.id"
            :aria-labelledby="'clinica-title-' + clinica.id"
          >
            <ElementsSingleGoogleMap
              class="row-start-2 md:row-start-1"
              :lat="clinica.acf.lat"
              :lng="clinica.acf.lng"
              :zoom="17"
            />
            <div
              class="[&>*]:!text-blue-1 bg-nude-8/80 backdrop-blur-sm rounded-3xl 
                    flex flex-col justify-center 
                    left-0 right-0 bottom-0 h-1/2 p-8 
                    pointer-events-none z-10 
                    col-[2/-2] lg:col-[7/10] row-start-1 self-end
                    lg:[.card:nth-child(even)>&]:col-[8/11]"
              v-html="clinica.content.rendered"
            ></div>
            <div
              class="col-[2/-2] lg:col-[7/-2] row-start-1 pointer-events-none rounded-3xl overflow-hidden lg:[.card:nth-child(even)>&]:col-[2/11]"
              :to="`/nuestras-clinicas/${clinica.slug}`"
              :aria-label="'Leer más sobre ' + clinica.title.rendered"
              @click.prevent
            >
              <NuxtImg
                loading="lazy"
                v-if="clinica.featured_image_data"
                :src="clinica.featured_image_data.src"
                class="clinicas__egos-card-image h-full min-w-full object-cover object-center"
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
import { getPage, getClinicas } from '@/composables/useFetch'

// Uso de useAsyncData para cargar la página por su ID
const { data: pages, error: pageError, pending: pagePending } = await useAsyncData(() => getPage(13618), {initialCache: false})

// Uso de useAsyncData para cargar clínicas sin parámetros adicionales
const { data: clinicasData, error: clinicasError, pending: clinicasPending } = await useAsyncData(() => getClinicas(), {initialCache: false})

// Datos YOAST SEO
useHead(() => {
  if (!pages.value || !pages.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    }
  }

  const yoast = pages.value.yoast_head_json

  const link = [{ rel: 'canonical', href: yoast.canonical }]
  const metaTags = [
    {
      name: 'description',
      content:
        yoast.og_description || 'Egos | Clínica de cirugía y medicina estética',
    },
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
    // Canonical
    // { rel: 'canonical', href: yoast.canonical },
    // Robots
    {
      name: 'robots',
      content: `index=${yoast.robots.index}, follow=${yoast.robots.follow}, max-snippet=${yoast.robots['max-snippet']}, max-image-preview=${yoast.robots['max-image-preview']}, max-video-preview=${yoast.robots['max-video-preview']}`,
    },
    // Añadir más tags según sean necesarios
  ]

  // Añadir las imágenes de Open Graph si están disponibles
  if (yoast.og_image && yoast.og_image.length > 0) {
    yoast.og_image.forEach((image) => {
      metaTags.push({ property: 'og:image', content: image.url })
      metaTags.push({
        property: 'og:image:width',
        content: image.width.toString(),
      })
      metaTags.push({
        property: 'og:image:height',
        content: image.height.toString(),
      })
    })
  }

  return {
    title: yoast.title,
    link: link,
    meta: metaTags,
  }
})


</script>

<style lang="scss" scoped>
// empty style
</style>
