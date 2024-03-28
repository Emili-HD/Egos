<template>
   <div class="fixed-button fixed top-full w-full py-3 px-6 z-[998]">
      <ElementsButton class="gold" href="#hubspotLanding" @click.prevent="handleClick">Cita con el cirujano
      </ElementsButton>
   </div>
   <main class="site-main landing-main" v-if="landingData && landingData.value && landingData.value.acf">
      <section class="hero m-0">
         <LandingsHeader :data="landingData.value" />
         <div id="formulario" class="hero__form p-12 xl:p-16">
            <div class="insignia mb-8 flex flex-row justify-center">
               <NuxtImg loading="lazy" :src="landingData.value.acf.insignia.url" alt="" />
            </div>
            <FormsLanding :portalId="String(landingData.value.acf.form[0].portalid)" :formId="landingData.value.acf.form[0].formid" />
         </div>
      </section>

      <LandingsDetalles :data="landingData.value.acf" />
      <LandingsAntesDespues :data="landingData.value.acf" />
      <LandingsDestacado :data="landingData.value.acf" />
      <LandingsPromociones :data="landingData.value.acf" />
      <LandingsFinanciacion :data="landingData.value.acf" />
      <LandingsPasos :data="landingData.value.acf" />
      <LandingsInformacion :data="landingData.value.acf" />
      <LandingsTestimonios :data="landingData.value.acf" />
      <LandingsResenas :data="landingData.value.acf" />
   </main>
</template>

<script setup>
import { watch } from 'vue';
import { useAsyncData, useRoute } from 'nuxt/app';
import { getLanding } from '@/composables/useFetch';

const route = useRoute();

// Estado reactivo para almacenar los datos de la página de aterrizaje
let landingData = ref(null);

// Función para cargar los datos
async function loadLandingData(slug) {
  const { data: landing, error: landingError, pending: landingPending } = await useAsyncData(`landing-${slug}`, () => getLanding(slug), { initialCache: false });

  // Asignar los datos cargados al estado reactivo
  landingData.value = landing;
}

// Iniciar la carga de datos basados en el slug actual de la ruta
loadLandingData(route.params.slug);

// Observar cambios en el parámetro de la ruta y recargar los datos cuando cambie
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadLandingData(newSlug);
  }
}, { immediate: true });

function handleClick() {
   const { $lenis: lenis } = useNuxtApp();
   lenis.scrollTo('#hubspotLanding', { offset: -20 });
}

// Datos YOAST SEO
useHead(() => {
   // Verifica si el post está cargado y tiene la estructura esperada
   if (!landingData.value || !landingData.value.yoast_head_json) {
      return {
         title: 'Cargando...', // Título temporal mientras se cargan los datos
      };
   }

   // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
   const yoast = landingData.value.yoast_head_json;

   const link = [{ rel: 'canonical', href: yoast.canonical }]
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
      // { rel: 'canonical', href: yoast.canonical },
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
</script>

<style lang="scss" scoped>
.hero {
   min-height: 100vh;
   padding: 0;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: stretch;

   @media (max-width: 767px) {
      flex-direction: column;
   }

   &__form {
      width: 50%;
      background-color: var(--blue-1);
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      @media (max-width: 767px) {
         width: 100%;
      }

      .insignia {
         text-align: center;

         img {
            max-width: 19rem;
         }
      }
   }
}
</style>
