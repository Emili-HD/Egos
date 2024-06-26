<template>
  <div v-if="landingError">Error al cargar la Promoción.</div>
   <main v-else class="site-main landing-main" v-if="landing && landing.acf">
      <div class="fixed-button fixed top-full w-full py-3 px-6 z-[998]">
         <a class="gold" href="#hubspotLanding" @click.passive="handleClick">Cita con el cirujano
         </a>
      </div>
      <section class="hero m-0 p-0 min-h-screen flex flex-col lg:flex-row justify-between items-stretch">
         <LandingsHeader :data="landing" />
         <div id="formulario" class="hero__form bg-blue-1 p-12 w-full lg:w-1/2 flex flex-col justify-around">
            <div class="insignia mb-8 flex flex-row justify-center text-center">
               <NuxtImg class="max-w-[19rem]" loading="lazy" :src="landing.acf.insignia.url" alt="" />
            </div>
            <!-- <FormsLanding :portalId="String(landing.acf.form[0].portalid)" :formId="landing.acf.form[0].formid" /> -->
            <FormsCustomForm :portalId="String(landing.acf.form[0].portalid)" :formId="landing.acf.form[0].formid" />
         </div>
      </section>

      <LandingsDetalles :data="landing.acf" />
      <LandingsAntesDespues :data="landing.acf" />
      <LandingsDestacado :data="landing.acf" />
      <LandingsPromociones :data="landing.acf" />
      <LandingsFinanciacion :data="landing.acf" />
      <LandingsPasos :data="landing.acf" />
      <LandingsInformacion :data="landing.acf" />
      <LandingsTestimonios :data="landing.acf" />
      <LandingsResenas :data="landing.acf" />
   </main>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useAsyncData, useRouter, useRoute } from 'nuxt/app';
import { getLanding } from '@/composables/useFetch';

const router = useRouter();
const route = useRoute();

const loadData = () => {
  const slug = route.params.slug;
  return getLanding(slug); // Modificado para pasar solo el slug
};

// Función para cargar los datos
const { data: landing, error: landingError, refresh } = await useAsyncData(`landing-${route.params.slug}`, loadData, { initialCache: false });


// watch(
//    () => route.params.slug,
//    async (newSlug, oldSlug) => {
//       if (newSlug !== oldSlug) {
//          await refresh();
//       }
//    },
//    { immediate: true }
// );
// console.log(landing.value);
   
function handleClick() {
   const { $lenis: lenis } = useNuxtApp();
   lenis.scrollTo('#hubspotLanding', { offset: -20 });
}

// Datos YOAST SEO
useHead(() => {
   // Verifica si el post está cargado y tiene la estructura esperada
   if (!landing.value || !landing.value.yoast_head_json) {
      return {
         title: 'Cargando...', // Título temporal mientras se cargan los datos
      };
   }

   // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
   const yoast = landing.value.yoast_head_json;

   const link = [
      { 
         rel: 'canonical',
         href: (() => {
            // Asegurar que `yoast` y `yoast.canonical` están definidos
            if (yoast && yoast.canonical) {
            // Añadir "www." si no está presente y no es una subdominio diferente
            let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                              yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
            // Asegurar que la URL termina con "/"
            canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
            return canonical;
            } else {
            // Devolver un valor por defecto o manejar el caso de que `yoast` o `yoast.canonical` no estén definidos
            // Esto podría ser una URL genérica o manejar el error de manera adecuada
            return 'https://www.clinicaegos.com/';
            }
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
      title: yoast.title || 'Título del Post',
      link: link,
      meta: metaTags,
   };
});

const injectStructuredData = async () => {
   if (landing.value && landing.value.acf && landing.value.acf.datos) {}
    const structuredData = {
      "@context": "http://schema.org",
      "@type": landing.value.acf.datos.type,
      "name": landing.value.acf.datos.name,
      "address": [
        {
          "@type": landing.value.acf.datos.adress.type,
         //  "streetAddress": landing.value.acf.datos.adress.streetaddress,
         //  "postalCode": landing.value.acf.datos.adress.postalcode,
         //  "addressLocality": landing.value.acf.datos.adress.addresslocality,
         //  "addressRegion": landing.value.acf.datos.adress.addressregion,
         //  "addressCountry": landing.value.acf.datos.adress.addresscountry,
          "name": landing.value.acf.datos.adress.addresscountry,
        }
      ],
      "offers": [
        {
          "@type": landing.value.acf.datos.offers.type,
          "price": landing.value.acf.datos.offers.price,
          "priceCurrency": landing.value.acf.datos.offers.pricecurrency,
          "availability": landing.value.acf.datos.offers.availability,
        }
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

onMounted(async () => {
   await injectStructuredData()
})
</script>

<style lang="scss" scoped>
// empty style
</style>
