<template>
  <main class="site-main blog">
    <section class="clinicas section__hero pb-40" v-if="pages" aria-labelledby="page-title">
      <ElementsEncabezado class="flex flex-col justify-end items-start min-h-[60vh] xl:min-h-[100vh] overflow-hidden bg-nude8 bg-center bg-cover" :data="pages" />

      <div class="clinicas__egos">
        <div
          class="clinicas__egos-list"
          v-if="clinicas"
          aria-label="Listado de clínicas Egos"
        >
          <article
            v-for="clinica in clinicas"
            :key="clinica.id"
            class="card clinicas__egos-card"
            :id="'clinica-' + clinica.id"
            :aria-labelledby="'clinica-title-' + clinica.id"
          >
            <ElementsSingleGoogleMap
              :lat="clinica.acf.lat"
              :lng="clinica.acf.lng"
              :zoom="17"
            />
            <div
              class="clinicas__egos-content"
              v-html="clinica.content.rendered"
            ></div>
            <div
              class="clinicas__egos-poster"
              :to="`/nuestras-clinicas/${clinica.slug}`"
              :aria-label="'Leer más sobre ' + clinica.title.rendered"
              @click.prevent
            >
              <img
                v-if="clinica.featured_image_data"
                :src="clinica.featured_image_data.src"
                class="clinicas__egos-card-image"
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

  // Preparar las meta tags basándose en los datos de yoast_head_json
  const metaTags = [
    { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
    { property: 'og:title', content: yoast.og_title },
    { property: 'og:description', content: yoast.og_description },
    { property: 'og:url', content: yoast.og_url },
    { property: 'og:type', content: yoast.og_type },
    // Añadir más tags según sean necesarios
  ];

  // Añadir las imágenes de Open Graph si están disponibles
  if (yoast.og_image && yoast.og_image.length > 0) {
    yoast.og_image.forEach((image) => {
      metaTags.push({ property: 'og:image', content: image.url });
      // Agregar también las dimensiones si se desea
      metaTags.push({ property: 'og:image:width', content: image.width.toString() });
      metaTags.push({ property: 'og:image:height', content: image.height.toString() });
    });
  }

  // Añadir la meta tag de robots si está disponible
  if (yoast.robots) {
    const robotsContent = `${yoast.robots.index}, ${yoast.robots.follow}`;
    metaTags.push({ name: 'robots', content: robotsContent });
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
      // background: rgba(var(--nude-6-rgb), 0.85);
      align-items: flex-start;
      border-radius: var(--radius-xl);
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
      
      & > * {
        pointer-events: all;
      }
    }
    
    &-map {
      grid-column: 2/7;
      
      @media (max-width: 767px) {
        grid-column: 2/-2;
        grid-row: 2;
      }
    }
    
    &-poster {
      grid-column: 7/-2;
      pointer-events: none;
      
      @media (max-width: 767px) {
        grid-column: 2/-2;
        grid-row: 1;
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
        .clinicas__egos-map {
          grid-column: 11/-2;
          grid-row: 1;
          @media (max-width: 767px) {
            grid-column: 2/-2;
            grid-row: 2;
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
