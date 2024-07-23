<template>

  <main class="site-main doctor bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0">
    <div class="doctor__content col-[1/-1] lg:col-span-12 grid grid-cols-subgrid w-fit min-h-fit">
      <header class="doctor__heading pt-32 lg:col-start-2 col-[2_/_span_14] lg:col-span-10 group" v-if="doctor && doctor.title">
        <h1 class="">{{ doctor.title.rendered }}</h1>
        <div v-if="doctor.featured_image_data"
          class="doctor__media col-start-2 col-span-10 flex flex-row justify-center items-start">
          <div class="w-full bg-nude-5 h-[max(400px,_65vh)] rounded-2xl overflow-hidden">
            <img 
            :src="doctor.featured_image_data.url" 
            :srcset="doctor.featured_image_data.srcset" 
            :alt="doctor.featured_image_data.alt" 
            :width="doctor.featured_image_data.width" 
            :height="doctor.featured_image_data.height" 
            class="object-cover object-center size-full absolute" />
          </div>
        </div>
      </header>
      <section class="doctor__description lg:col-start-2 col-[2_/_span_14] lg:col-span-10 row-start-2 py-8 lg:py-20"  v-if="doctor && doctor.content">
        <div v-html="doctor.content.rendered"></div>
      </section>
      <section class="col-[2/-2] lg:col-start-2 lg:col-span-10 bg-transparent min-h-max">
        <DoctorResenas :data="reviews" :name="doctor.title.rendered" />
      </section>
      <NuxtLazyHydrate when-idle>
        <LazyElementsReviews :ruta="route.params.slug[1]" />
      </NuxtLazyHydrate>
    </div>
    <aside class="form__wrapper bg-blue-1 col-[1_/_span_16] lg:col-span-4 px-12 py-12 lg:pt-40 lg:pb-20" v-if="doctor && doctor.acf">
      <!-- <FormsCirugia :identificador="'formulario'" :portalId="String(doctor.acf.portalid)" :formId="doctor.acf.formid" /> -->
      <FormsCustomForm :identificador="'formulario'" :portalId="String(doctor.acf.portalid)" :formId="doctor.acf.formid" />
    </aside>
  </main>
</template>

<script setup>
import { watch, onMounted, nextTick } from 'vue';
import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
import { getEquipo, getReviews } from '@/composables/useFetch';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/stores/scrollStore';

const router = useRouter();
const route = useRoute();
const { $gsap: gsap, $lenis: lenis, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

// Utiliza `useAsyncData` para cargar la página basada en el slug de la ruta, incluyendo un `uniqueId`
const { data: doctor, refresh: refreshDoctor } = await useAsyncData(`doctor-${route.params.slug}`, () => {
  // Asegúrate de pasar un objeto con la propiedad `slug` a `getTestimonios`
  return getEquipo({ slug: route.params.slug });
}, { watch: [() => route.params.slug] });

// Carga las reseñas del doctor basado en el mismo slug
const { data: reviews, refresh: refreshReviews } = useAsyncData(`reviews-${route.params.slug[1]}`, () => getReviews({ slug: route.params.slug[1] }), {
  watch: [() => route.params.slug[1]]
});


// Refresca tanto los datos del doctor como las reseñas si cambia el slug
watch(
  () => route.params.slug,
  async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      await Promise.all([refreshDoctor(), refreshReviews()]);
    }
  },
  { immediate: true }
);   

const stickyForm = async () => {
  gsap.registerPlugin(ScrollTrigger)

  let mm = gsap.matchMedia()
  mm.add("(min-width: 1025px)", () => {
    const form = document.querySelector('.form-landing')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".form__wrapper",
        pin: form,
        start: "top 5%",
        //scrub: 0.5,
        end: "top bottom",
        endTrigger: "footer.footer",
        pinSpacing: false,
        toggleActions: "restart none none reverse",
        // markers: true,
      }
    });
  })

}


// Ciclo de vida Mounted
onMounted(async () => {
  await stickyForm()
  await injectStructuredData()
  // Utilizar nextTick para asegurarse de que todas las mutaciones DOM y el estado Vue estén actualizados
  nextTick(async () => {
    const { $lenis } = useNuxtApp();
    const scrollStore = useScrollStore(); // Asegúrate de que el store se inicialice correctamente aquí

    if (scrollStore.scrollToForm) {
      $lenis.scrollTo('#formulario', { offset: -20 });
      scrollStore.setScrollToForm(false); // Resetea el estado
    }
  });
});

// Datos YOAST SEO
useHead(() => {
  // Verifica si el post está cargado y tiene la estructura esperada
  if (!doctor.value || !doctor.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
  const yoast = doctor.value.yoast_head_json;

  const link = [
    { 
      rel: 'canonical',
      href: (() => {
        // Añadir "www." si no está presente y no es una subdominio diferente
        let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                        yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
        // Asegurar que la URL termina con "/"
        canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
        return canonical;
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
    const structuredData = {
      "@context": "http://schema.org",
      "@type": doctor.value.acf.datos.type,
      "name": doctor.value.acf.datos.name,
      "address": [
        {
          "@type": doctor.value.acf.datos.adress.type,
          // "streetAddress": doctor.value.acf.datos.adress.streetaddress,
          // "postalCode": doctor.value.acf.datos.adress.postalcode,
          // "addressLocality": doctor.value.acf.datos.adress.addresslocality,
          // "addressRegion": doctor.value.acf.datos.adress.addressregion,
          // "name": doctor.value.acf.datos.adress.addresscountry,
          "name": doctor.value.acf.datos.adress.addresscountry,
        }
      ],
      "aggregateRating": [
        {
          "@type": doctor.value.acf.datos.aggregaterating.type,
          "ratingValue": doctor.value.acf.datos.aggregaterating.ratingvalue,
          "reviewCount": doctor.value.acf.datos.aggregaterating.reviewcount,
        }
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}
</script>

<style lang="scss">
// empty style
</style>
