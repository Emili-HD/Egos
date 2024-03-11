<template>
  <main class="site-main" v-if="home">
      <HomeWellcome :data="home" />
      <DelayHydration>
        <LazyHomeCategories :data="home" />
      </DelayHydration>
      <DelayHydration>
        <LazyHomeTestimonios />
      </DelayHydration>
      <FormsPiceCita :portalId="String(home.acf.formulario.portalid)" :formId="home.acf.formulario.formid"/>
      <HomeAcordeon :data="home.acf.acordeon_cirugias" />
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

  // Preparar las meta tags basándose en los datos de yoast_head_json
  const metaTags = [
    { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
    { property: 'og:title', content: yoast.og_title },
    { property: 'og:description', content: yoast.og_description },
    { property: 'og:url', content: yoast.og_url },
    { property: 'og:type', content: yoast.og_type },
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
