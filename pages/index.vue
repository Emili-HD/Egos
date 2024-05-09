<template>
  <div v-if="pending">Cargando...</div>
  <div v-else-if="error">Error al cargar los datos: {{ error }}</div>
  <main v-else class="site-main" v-if="home">
      <HomeWellcome critical :data="home" />
      <DelayHydration>
        <LazyHomeCategories :data="home" />
      </DelayHydration>
      <HomeTestimonios />
      <DelayHydration>
        <LazyFormsPiceCita :portalId="String(home.acf.formulario.portalid)" :formId="home.acf.formulario.formid"/>
      </DelayHydration>
      <DelayHydration>
        <LazyHomeAcordeon :data="home.acf.acordeon_cirugias" />
      </DelayHydration>
      <DelayHydration>
        <LazyHomeEspecialists />
      </DelayHydration>
      <DelayHydration>
        <HomeTiktok />
        <ElementsInfluencers />
      </DelayHydration>
  </main>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useAsyncData } from 'nuxt/app'
import { getPage } from '@/composables/useFetch';

const { data: home, error, pending } = await useAsyncData(() => getPage(8), {initialCache: false})
// console.log(home.value.acf.tratamientos_home.categorias_home);

const categoriasHome = computed(() => home?.acf?.tratamientos_home?.categorias_home || []);


// Datos YOAST SEO
useHead(() => {
  if (!home.value || !home.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = home.value.yoast_head_json;

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
    title: yoast.title,
    link: link,
    meta: metaTags,
  };
});

const injectStructuredData = () => {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "name": "Egos",
    "description": "Egos es una empresa dedicada a la cirugía plástica y medicina estética",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Barcelona, Tarragona, Badalona, castelldefels, granollers, sabadell, sant cugat, Madrid",
      "city": "Barcelona, Tarragona, Badalona, castelldefels, granollers, sabadell, sant cugat, Madrid",
      "country": "Spain"
    },
    "email": "info@clinicaegos.com",
    "sameAs": [
      "https://www.instagram.com/clinicaegos/",
      "https://www.tiktok.com/@clinicaegos",
      "https://www.pinterest.es/egosclinicas/",
      "https://www.youtube.com/@clinicaegos",
      "https://www.facebook.com/clinicaegos"
    ],
    "logo": "https://www.clinicaegos.com/images/logo.svg"
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

onMounted(() => {
  injectStructuredData()
})

</script>
