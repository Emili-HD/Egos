<template>
  <main class="site-main nuestras-clinicas">
    <section class="clinicas section__hero pb-40" v-if="pages" aria-labelledby="page-title">
      <ElementsEncabezado
        class="flex flex-col justify-end items-start min-h-[60vh] xl:min-h-[100vh] overflow-hidden bg-nude8 bg-center bg-cover"
        :data="pages" />

      <div class="clinicas__egos">
        <div class="clinicas__egos-list" v-if="clinicas" aria-label="Listado de clínicas Egos">
          <article v-for="clinica in clinicas" :key="clinica.id" class="card clinicas__egos-card"
            :id="'clinica-' + clinica.id" :aria-labelledby="'clinica-title-' + clinica.id">
            <ElementsSingleGoogleMap :lat="clinica.acf.lat" :lng="clinica.acf.lng" :zoom="17" />
            <!-- align-items: flex-start;
      bottom: 0;
      bottom: var(--gap);
      display: flex;
      flex-direction: column;
      grid-column: 7/10;
      height: 50%;
      justify-content: center;
      left: var(--gap);
      overflow: hidden;
      padding: 2rem;
      pointer-events: none;
      position: absolute;
      width: 100%;
      z-index: 1;

      @media (max-width: 767px) {
        grid-column: 2/-2;
        grid-row: 1;
        top: calc(35vh - var(--gap));
        height: 25vh;
        left: var(--gap);
        width: calc(100% - (var(--gap) * 2));
        backdrop-filter: blur(3px);
      } -->
            <div class="clinicas__egos-content rounded-xl flex flex-col" v-html="clinica.content.rendered"></div>
            <!--  -->
            <div class="clinicas__egos-poster col-[2/-2] xl:col-[7/-2] grid-rows-1 pointer-events-none rounded-xl" :to="`/nuestras-clinicas/${clinica.slug}`"
              :aria-label="'Leer más sobre ' + clinica.title.rendered" @click.prevent>
              <NuxtImg loading="lazy" v-if="clinica.featured_image_data" :src="clinica.featured_image_data.src"
                class="clinicas__egos-card-image" :alt="clinica.featured_image_data.alt"
                :aria-labelledby="'post-title-' + clinica.id" />
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, inject, onMounted, nextTick } from 'vue'
import { getSinglePage, getClinicas } from '@/composables/useApi';

// Estados reactivos
const pages = ref(null)
const clinicas = ref(null)

const loadPage = async (id) => {
  try {
    const pageResponse = await getSinglePage(id)
    pages.value = pageResponse.data // Asignar a pages.value
  } catch (error) {
    console.error(error)
  }
}

const loadClinicas = async () => {
  try {
    const postsResponse = await getClinicas()
    clinicas.value = postsResponse.data // Asignar a clinicas.value
  } catch (error) {
    console.error(error)
  }
}

// Datos YOAST SEO
useHead(() => {
  if (!pages.value || !pages.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = pages.value.yoast_head_json;

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
    // Canonical
    { rel: 'canonical', href: yoast.canonical },
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
    meta: metaTags,
  };
});


// Ciclo de vida
await loadPage(13618)
await loadClinicas()

</script>

<style lang="scss" scoped>
.clinica__header {
  align-items: center;
  background-color: var(--blue-1);
  background-position: center;
  background-size: cover;
  border-radius: var(--radius-xxl);
  color: var(--nude-8);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
  justify-content: center;
  min-height: calc(100vh - var(--gap) * 2);
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.clinicas {

  @media (max-width: 767px) {
    .header {
      min-height: 60vh;
    }
  }

  &__egos {

    // padding: var(--gap);
    &-content {
      align-items: flex-start;
      bottom: 0;
      bottom: var(--gap);
      display: flex;
      flex-direction: column;
      grid-column: 7/10;
      height: 50%;
      justify-content: center;
      left: var(--gap);
      overflow: hidden;
      padding: 2rem;
      pointer-events: none;
      position: absolute;
      width: 100%;
      z-index: 1;

      @media (max-width: 767px) {
        grid-column: 2/-2;
        grid-row: 1;
        top: calc(35vh - var(--gap));
        height: 25vh;
        left: var(--gap);
        width: calc(100% - (var(--gap) * 2));
        backdrop-filter: blur(3px);
      }

      &::after {
        content: "";
        // -webkit-backdrop-filter: blur(.5rem);
        // backdrop-filter: blur(.25rem);
        background: rgba(var(--nude-6-rgb), 0.95);
        height: 100%;
        left: 0;
        position: absolute;
        width: 100%;
        z-index: -1;
        border-radius: var(--radius-xl);
        overflow: hidden;
      }

      &>* {
        pointer-events: all;
      }
    }


    &-card {
      aspect-ratio: unset;
      display: grid;
      gap: var(--gap);
      grid-auto-rows: 60vh;
      grid-column: 1/3;
      grid-template-columns: repeat(16, 1fr);
      margin-top: 5rem;

      &:nth-child(even) {
        .clinicas__egos-content {
          grid-column: 8/11;
          grid-row: 1;
          left: unset;
          right: var(--gap);

          @media (max-width: 767px) {
            grid-column: 2/-2;
            grid-row: 1;
            top: calc(35vh - var(--gap));
            height: 25vh;
            left: var(--gap);
            width: calc(100% - (var(--gap) * 2));
            backdrop-filter: blur(3px);
          }
        }

        .clinicas__egos-poster {
          grid-column: 2/11;
          grid-row: 1;

          @media (max-width: 767px) {
            grid-column: 2/-2;
            grid-row: 1;
          }
        }
      }

      &-image {
        background-color: var(--nude-7);
        border-radius: var(--radius-xxl);
        height: 100%;
        min-width: 100%;
        object-fit: cover;
        object-position: center;
        overflow: hidden;
      }
    }
  }
}
</style>
