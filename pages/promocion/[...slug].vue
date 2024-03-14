<template>
   <div class="fixed-button fixed top-full w-full py-3 px-6 z-[998]">
      <ElementsButton class="gold pedircita" href="#hubspotLanding" @click.prevent="handleClick">Cita con el cirujano
      </ElementsButton>
   </div>
   <main class="site-main landing-main" v-if="landing && landing[0].acf">
      <section class="hero m-0">
         <LandingsHeader :data="landing[0]" />
         <div id="formulario" class="hero__form p-8 xl:p-16">
            <div class="insignia mb-8 flex flex-row justify-center">
               <NuxtImg loading="lazy" :src="landing[0].acf.insignia.url" alt="" />
            </div>
            <FormsLanding :portalId="String(landing[0].acf.form[0].portalid)" :formId="landing[0].acf.form[0].formid" />
         </div>
      </section>

      <LandingsDetalles :data="landing[0].acf" />
      <LandingsAntesDespues :data="landing[0].acf" />
      <LandingsDestacado :data="landing[0].acf" />
      <LandingsPromociones :data="landing[0].acf" />
      <LandingsFinanciacion :data="landing[0].acf" />
      <LandingsPasos :data="landing[0].acf" />
      <LandingsInformacion :data="landing[0].acf" />
      <LandingsTestimonios :data="landing[0].acf" />
      <LandingsResenas :data="landing[0].acf" />
   </main>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { getLanding } from '@/composables/useApi';
import { useRoute } from 'vue-router';

// Estado reactivo
const landing = ref(null);
const route = useRoute();

function handleClick() {
   const { $lenis: lenis } = useNuxtApp();
   console.log('lenis on click', lenis);
   lenis.scrollTo('#hubspotLanding', { offset: -20 });
}

const loadLanding = async () => {
   try {
      const slug = route.params.slug;
      const landingResponse = await getLanding(slug);
      landing.value = landingResponse.data;
   } catch (error) {
      console.error("Error loading landing:", error);
   }
}

await loadLanding()

// Datos YOAST SEO
useHead(() => {
   // Verifica si el post está cargado y tiene la estructura esperada
   if (!landing.value || landing.value.length === 0 || !landing.value[0].yoast_head_json) {
      return {
         title: 'Cargando...', // Título temporal mientras se cargan los datos
      };
   }

   // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
   const yoast = landing.value[0].yoast_head_json;

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
      title: yoast.title || 'Título del Post',
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
