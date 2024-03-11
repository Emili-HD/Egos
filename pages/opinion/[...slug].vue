<template>
  <main class="site-main caso-real" v-if="casoreal">
     <section class="caso-real__heading" ref="casoreal">
        <div v-if="casoreal[0].acf.vimeo_video" class="caso-real__heading--video video__player">
         <ClientOnly>
           <vue-plyr>
              <div data-plyr-provider="vimeo" :data-plyr-embed-id="casoreal[0].acf.vimeo_video"></div>
           </vue-plyr>
         </ClientOnly>
        </div>
       <div class="caso-real__heading--text">
         <h1>{{ casoreal[0].title.rendered }}</h1>
         <div v-html="casoreal[0].content.rendered"></div>
       </div>
       <div class="form__wrapper p-4 p-xs-12">
         <FormsCirugia :identificador="'topPage'" :portalId="String(casoreal[0].acf.formulario.portalid)" :formId="casoreal[0].acf.formulario.formid" />
       </div>
     </section>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { getSingleTestimonioBySlug } from '@/composables/useApi';
import { useRoute } from 'vue-router';

// Estado reactivo para el post
const casoreal = ref(null);

// Acceder a los parámetros de la ruta
const route = useRoute();
const slug = route.params.slug;

const getCasoReal = async () => {
  try {
    const response = await getSingleTestimonioBySlug(slug)
    casoreal.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

watch(() => route.params.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    // console.log("Cambiando slug de", oldSlug, "a", newSlug);
    await getCasoReal();
  }
}, { immediate: true });

// Ciclo de vida Mounted
onMounted( async () => {
  await getCasoReal()
});

// Datos YOAST SEO
useHead(() => {
  // Verifica si el post está cargado y tiene la estructura esperada
  if (!casoreal.value || casoreal.value.length === 0 || !casoreal.value[0].yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
  const yoast = casoreal.value[0].yoast_head_json;

  // Prepara las meta tags basándose en los datos de yoast_head_json del primer post
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
    title: yoast.title || 'Título del Post',
    meta: metaTags,
  };
});

</script>

<style lang="scss">
.caso-real {
   background-color: var(--nude-8);
   
   &__heading {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      min-height: 100vh;
      margin-bottom: 0;
      
      &--video {
         min-height: 60vh;
         // aspect-ratio: 16/9;
         position: relative;
         display: flex;
         flex-direction: column;
         justify-content: flex-start;
         align-items: center;
         grid-column: 1/5;
   
         .plyr {
            height: 80vh;
            width: auto;
            border-radius: var(--radius-m);
         }
      }

      &--text {
        grid-column: 6/11;
      }

      .form__wrapper {
          grid-column: 12/-1;
          background: var(--blue-1);
      }
   }

}
</style>
