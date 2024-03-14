<template>
  <main class="site-main" v-if="home">
      <HomeWellcome critical :data="home" />
      <DelayHydration>
        <LazyHomeCategories :data="home" />
      </DelayHydration>
      <DelayHydration>
        <LazyHomeTestimonios />
      </DelayHydration>
      <DelayHydration>
        <LazyFormsPiceCita :portalId="String(home.acf.formulario.portalid)" :formId="home.acf.formulario.formid"/>
      </DelayHydration>
      <DelayHydration>
        <LazyHomeAcordeon :data="home.acf.acordeon_cirugias" />
      </DelayHydration>
      <DelayHydration>
        <LazyHomeBlog />
      </DelayHydration>
      <DelayHydration>
        <LazyHomeSocial />
      </DelayHydration>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSinglePage } from '@/composables/useApi';

// Estado reactivo para el contenido de la página
const home = ref(null);

// Obtener datos de la API al crear el componente
const fetchData = async (id) => {
    const { data } = await getSinglePage(id);
    home.value = data; 
};

// Datos YOAST SEO
useHead(() => {
  if (!home.value || !home.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = home.value.yoast_head_json;

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

await fetchData(8)
onMounted(() => {
  injectStructuredData()
})

</script>
